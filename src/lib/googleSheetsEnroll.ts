import crypto from 'crypto';
import * as XLSX from 'xlsx';
import { extractGoogleFileId, loadFreshDocuments } from './googleDocsLoader';

const DEFAULT_ENROLLMENT_SHEET_ID = '1D2BtzLvH9qRFAJye1Gig6PetrTIJgUbvIVlt8B-oE_8';
const MAX_GROUP_SIZE = 12;

const HEADERS = [
  'ID записи',
  'Дата и время',
  'Имя студента',
  'Телефон',
  'Курс',
  'Преподаватель',
  'Филиал',
  'Формат',
  'День недели',
  'Время (слот)',
  'Статус',
  'Источник',
];

export interface EnrollmentInput {
  name: string;
  phone: string;
  course: string;
  teacher?: string;
  branch?: string;
  format?: string;
  day?: string;
  time?: string;
  source?: 'website-form' | 'ai-assistant';
}

export interface BookingRecord {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  course: string;
  teacher: string;
  branch: string;
  format: string;
  day: string;
  time: string;
  status: string;
  source: string;
}

export interface AvailableSlot {
  teacher: string;
  direction: string;
  location: string;
  day: string;
  time: string;
  groupInfo: string;
  bookedCount: number;
  maxCapacity: number;
  freeSpots: number;
  isCompletelyFree: boolean;
}

interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

let sheetsTokenCache: TokenCache | null = null;

function base64UrlEncode(input: Buffer | string): string {
  const buf = typeof input === 'string' ? Buffer.from(input, 'utf-8') : input;
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function getEnrollmentSheetId(): string {
  return extractGoogleFileId(process.env.ENROLLMENT_SHEET_ID) || DEFAULT_ENROLLMENT_SHEET_ID;
}

async function getSheetsAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const rawKey = process.env.GOOGLE_PRIVATE_KEY?.trim();
  if (!email || !rawKey) {
    throw new Error(
      'Не настроены GOOGLE_SERVICE_ACCOUNT_EMAIL и GOOGLE_PRIVATE_KEY в .env.local для записи в Google Таблицу.'
    );
  }

  if (sheetsTokenCache && Date.now() < sheetsTokenCache.expiresAt - 60_000) {
    return sheetsTokenCache.accessToken;
  }

  const privateKey = rawKey.replace(/\\n/g, '\n');
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64UrlEncode(
    JSON.stringify({
      iss: email,
      scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    })
  );

  const signingInput = `${header}.${claim}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signingInput);
  const signature = base64UrlEncode(signer.sign(privateKey));
  const jwt = `${signingInput}.${signature}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
    cache: 'no-store',
  });

  if (!tokenRes.ok) {
    const errText = await tokenRes.text();
    throw new Error(`Google OAuth2 failed (${tokenRes.status}): ${errText}`);
  }

  const tokenData = await tokenRes.json();
  sheetsTokenCache = {
    accessToken: tokenData.access_token,
    expiresAt: Date.now() + (tokenData.expires_in || 3600) * 1000,
  };
  return sheetsTokenCache.accessToken;
}

function parseGoogleSheetsApiError(status: number, bodyText: string): Error {
  if (bodyText.includes('SERVICE_DISABLED') || bodyText.includes('sheets.googleapis.com')) {
    const match = bodyText.match(/https:\/\/console\.developers\.google\.com\/apis\/api\/sheets\.googleapis\.com\/overview\?project=\d+/);
    const url = match ? match[0] : 'https://console.cloud.google.com/apis/library/sheets.googleapis.com';
    return new Error(
      `Google Sheets API отключён в Google Cloud Console. Включите его по ссылке (1 клик) и повторите запрос: ${url}`
    );
  }
  if (status === 403 || bodyText.includes('PERMISSION_DENIED')) {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 'сервисному аккаунту';
    return new Error(
      `Нет прав на запись в таблицу. Откройте таблицу в Google Sheets → «Поделиться» → выдайте права «Редактор» (Editor) для ${email}.`
    );
  }
  return new Error(`Google Sheets API error (${status}): ${bodyText}`);
}

async function getFirstSheetTitle(sheetId: string, token: string): Promise<string> {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets.properties.title`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw parseGoogleSheetsApiError(res.status, await res.text());
  }
  const data = await res.json();
  return data?.sheets?.[0]?.properties?.title || 'Лист1';
}

/**
 * Reads all existing student bookings from the Google Spreadsheet.
 */
export async function getBookings(): Promise<BookingRecord[]> {
  const sheetId = getEnrollmentSheetId();
  const token = await getSheetsAccessToken();

  try {
    const sheetTitle = await getFirstSheetTitle(sheetId, token);
    const valRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetTitle)}!A1:L1000`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }
    );

    if (valRes.ok) {
      const data = await valRes.json();
      const rows: string[][] = data.values || [];
      if (rows.length <= 1) return [];
      return rows.slice(1).map((r) => ({
        id: r[0] || '',
        createdAt: r[1] || '',
        name: r[2] || '',
        phone: r[3] || '',
        course: r[4] || '',
        teacher: r[5] || '',
        branch: r[6] || '',
        format: r[7] || '',
        day: r[8] || '',
        time: r[9] || '',
        status: r[10] || '',
        source: r[11] || '',
      }));
    }
  } catch {
    // Fallback to Drive export for read-only inspection if Sheets API is still being enabled
  }

  const expRes = await fetch(
    `https://www.googleapis.com/drive/v3/files/${sheetId}/export?mimeType=${encodeURIComponent(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    }
  );

  if (!expRes.ok) return [];
  const wb = XLSX.read(Buffer.from(await expRes.arrayBuffer()), { type: 'buffer' });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: '' });
  return rows.map((r) => ({
    id: String(r['ID записи'] || ''),
    createdAt: String(r['Дата и время'] || ''),
    name: String(r['Имя студента'] || ''),
    phone: String(r['Телефон'] || ''),
    course: String(r['Курс'] || ''),
    teacher: String(r['Преподаватель'] || ''),
    branch: String(r['Филиал'] || ''),
    format: String(r['Формат'] || ''),
    day: String(r['День недели'] || ''),
    time: String(r['Время (слот)'] || ''),
    status: String(r['Статус'] || ''),
    source: String(r['Источник'] || ''),
  }));
}

/**
 * Appends a new student enrollment row to the Google Spreadsheet.
 */
export async function appendStudentEnrollment(input: EnrollmentInput): Promise<BookingRecord> {
  const sheetId = getEnrollmentSheetId();
  const token = await getSheetsAccessToken();
  const sheetTitle = await getFirstSheetTitle(sheetId, token);

  // Check if header row exists
  const headerCheck = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetTitle)}!A1:L1`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    }
  );
  if (!headerCheck.ok) {
    throw parseGoogleSheetsApiError(headerCheck.status, await headerCheck.text());
  }
  const headerData = await headerCheck.json();
  if (!headerData.values || headerData.values.length === 0) {
    const putHeader = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetTitle)}!A1:L1?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [HEADERS] }),
      }
    );
    if (!putHeader.ok) {
      throw parseGoogleSheetsApiError(putHeader.status, await putHeader.text());
    }
  }

  const bookingId = `ENR-${Math.floor(1000 + Math.random() * 9000)}`;
  const nowStr = new Date().toLocaleString('ru-RU', {
    timeZone: 'Asia/Tashkent',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Check group capacity (max 12) when a specific teacher/day/time slot is chosen
  if (input.teacher && input.day && input.time) {
    const existing = await getBookings();
    const sameSlotCount = existing.filter((b) => {
      const sameT = b.teacher.toLowerCase().includes(input.teacher!.toLowerCase().split(' ')[0]);
      const sameD = b.day.toLowerCase().includes(input.day!.toLowerCase().slice(0, 4));
      const sameTime = b.time.includes(input.time!.slice(0, 5)) || input.time!.includes(b.time.slice(0, 5));
      return sameT && sameD && sameTime;
    }).length;

    if (sameSlotCount >= MAX_GROUP_SIZE) {
      throw new Error(
        `Группа у преподавателя ${input.teacher} (${input.day}, ${input.time}) уже заполнена (${MAX_GROUP_SIZE}/${MAX_GROUP_SIZE} мест). Выберите другое свободное окно.`
      );
    }
  }

  const record: BookingRecord = {
    id: bookingId,
    createdAt: nowStr,
    name: input.name.trim(),
    phone: input.phone.trim(),
    course: input.course.trim(),
    teacher: (input.teacher || 'Подберёт координатор').trim(),
    branch: (input.branch || 'Центральный кампус').trim(),
    format: (input.format || 'Групповой (до 12 чел.)').trim(),
    day: (input.day || 'По согласованию').trim(),
    time: (input.time || 'По согласованию').trim(),
    status: 'Новая заявка',
    source: input.source || 'website-form',
  };

  const appendRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetTitle)}!A:L:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [
          [
            record.id,
            record.createdAt,
            record.name,
            record.phone,
            record.course,
            record.teacher,
            record.branch,
            record.format,
            record.day,
            record.time,
            record.status,
            record.source,
          ],
        ],
      }),
    }
  );

  if (!appendRes.ok) {
    throw parseGoogleSheetsApiError(appendRes.status, await appendRes.text());
  }

  return record;
}

/**
 * Finds free time slots by cross-referencing the live teacher schedule (schedule.xlsx)
 * with current student bookings in the enrollment Google Spreadsheet.
 */
export async function findAvailableSlots(filters?: {
  teacher?: string;
  day?: string;
  course?: string;
  branch?: string;
}): Promise<{ slots: AvailableSlot[]; totalBookings: number }> {
  const [docs, bookings] = await Promise.all([loadFreshDocuments(false), getBookings()]);
  const scheduleDoc = docs.find((d) => d.source === 'schedule.xlsx');
  if (!scheduleDoc) {
    return { slots: [], totalBookings: bookings.length };
  }

  const teacherSections = scheduleDoc.sections.filter((s) =>
    s.title.startsWith('Преподаватель:')
  );

  const slots: AvailableSlot[] = [];

  for (const sec of teacherSections) {
    const teacherName = sec.title.replace(/^Преподаватель:\s*/i, '').trim();
    const lines = sec.content.split('\n').slice(1);

    for (const line of lines) {
      const parts = Object.fromEntries(
        line.split(' | ').map((kv) => {
          const idx = kv.indexOf(':');
          return idx > -1
            ? [kv.slice(0, idx).trim(), kv.slice(idx + 1).trim()]
            : [kv.trim(), ''];
        })
      );

      const direction = parts['Направление'] || '';
      const location = parts['Локация'] || '';
      const day = parts['День недели'] || '';
      const timeRaw = parts['Время'] || '';
      const groupInfo = parts['Группа / Описание'] || '';

      // Split multi-slot cells like "09:00 – 11:00 / 15:30 – 17:30" into individual windows if needed
      const timeSlots = timeRaw.includes('/')
        ? timeRaw.split('/').map((t) => t.trim()).filter(Boolean)
        : [timeRaw];

      for (const time of timeSlots) {
        if (!day || !time) continue;

        const matchingBookings = bookings.filter((b) => {
          const sameTeacher =
            b.teacher &&
            teacherName.toLowerCase().includes(b.teacher.toLowerCase().split(' ')[0]);
          const sameDay =
            b.day &&
            day.toLowerCase().includes(b.day.toLowerCase().slice(0, 4));
          const sameTime =
            b.time &&
            (b.time.includes(time.slice(0, 5)) || time.includes(b.time.slice(0, 5)));
          return sameTeacher && sameDay && sameTime;
        });

        const bookedCount = matchingBookings.length;
        const freeSpots = Math.max(0, MAX_GROUP_SIZE - bookedCount);

        slots.push({
          teacher: teacherName,
          direction,
          location,
          day,
          time,
          groupInfo,
          bookedCount,
          maxCapacity: MAX_GROUP_SIZE,
          freeSpots,
          isCompletelyFree: bookedCount === 0,
        });
      }
    }
  }

  const filtered = slots.filter((slot) => {
    if (filters?.teacher) {
      const q = filters.teacher.toLowerCase();
      if (!slot.teacher.toLowerCase().includes(q)) return false;
    }
    if (filters?.day) {
      const q = filters.day.toLowerCase().slice(0, 4);
      if (!slot.day.toLowerCase().includes(q)) return false;
    }
    if (filters?.course) {
      const q = filters.course.toLowerCase();
      const hay = `${slot.direction} ${slot.groupInfo}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filters?.branch) {
      const q = filters.branch.toLowerCase();
      if (!slot.location.toLowerCase().includes(q)) return false;
    }
    return slot.freeSpots > 0;
  });

  return { slots: filtered, totalBookings: bookings.length };
}
