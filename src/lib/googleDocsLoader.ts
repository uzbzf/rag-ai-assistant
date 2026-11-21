import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';

export interface LoadedDocument {
  source: 'price_list.docx' | 'faq.docx' | 'schedule.xlsx';
  sourceLabel: string;
  origin: 'google-docs' | 'google-sheets' | 'local-file';
  versionTag: string;
  changed: boolean;
  sections: Array<{ title: string; content: string }>;
}

interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

interface DriveMeta {
  id: string;
  name?: string;
  mimeType?: string;
  modifiedTime?: string;
  version?: string;
}

interface DocCacheEntry {
  versionTag: string;
  doc: LoadedDocument;
}

let serviceTokenCache: TokenCache | null = null;
const docCache = new Map<string, DocCacheEntry>();

/**
 * Extracts Google File ID from a Google Docs/Sheets/Drive URL or returns the raw ID.
 */
export function extractGoogleFileId(input?: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  if (!trimmed || trimmed.startsWith('your_')) return '';

  const match = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) return match[1];
  return trimmed;
}

function base64UrlEncode(input: Buffer | string): string {
  const buf = typeof input === 'string' ? Buffer.from(input, 'utf-8') : input;
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Obtains a Google OAuth2 Access Token using a Service Account (no external packages needed).
 */
async function getGoogleServiceAccessToken(): Promise<string | null> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const rawKey = process.env.GOOGLE_PRIVATE_KEY?.trim();
  if (!email || !rawKey) return null;

  if (serviceTokenCache && Date.now() < serviceTokenCache.expiresAt - 60_000) {
    return serviceTokenCache.accessToken;
  }

  const privateKey = rawKey.replace(/\\n/g, '\n');
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64UrlEncode(
    JSON.stringify({
      iss: email,
      scope: 'https://www.googleapis.com/auth/drive.readonly',
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
    throw new Error(`Google Service Account auth failed (${tokenRes.status}): ${errText}`);
  }

  const tokenData = await tokenRes.json();
  serviceTokenCache = {
    accessToken: tokenData.access_token,
    expiresAt: Date.now() + (tokenData.expires_in || 3600) * 1000,
  };
  return serviceTokenCache.accessToken;
}

async function fetchDriveMetadata(fileId: string, accessToken: string): Promise<DriveMeta | null> {
  const metaUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?fields=id,name,mimeType,modifiedTime,version`;
  const res = await fetch(metaUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return (await res.json()) as DriveMeta;
}

/**
 * Downloads a fresh binary Buffer (.docx or .xlsx) from Google Docs/Sheets/Drive.
 */
async function fetchGoogleFileBuffer(
  fileId: string,
  kind: 'docx' | 'xlsx',
  accessToken: string | null,
  mimeType?: string
): Promise<Buffer> {
  const exportMime =
    kind === 'docx'
      ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  if (accessToken) {
    const isNativeGoogleApp =
      mimeType === 'application/vnd.google-apps.document' ||
      mimeType === 'application/vnd.google-apps.spreadsheet';

    if (isNativeGoogleApp || !mimeType) {
      const exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=${encodeURIComponent(exportMime)}`;
      const exportRes = await fetch(exportUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: 'no-store',
      });
      if (exportRes.ok) {
        return Buffer.from(await exportRes.arrayBuffer());
      }
    }

    // Direct media download for uploaded .docx / .xlsx files on Google Drive
    const mediaUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
    const mediaRes = await fetch(mediaUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });
    if (mediaRes.ok) {
      return Buffer.from(await mediaRes.arrayBuffer());
    }

    throw new Error(`Google Drive API download error (${mediaRes.status}) for file ${fileId}`);
  }

  // Public / "Anyone with the link" export URL
  const publicUrl =
    kind === 'docx'
      ? `https://docs.google.com/document/d/${fileId}/export?format=docx`
      : `https://docs.google.com/spreadsheets/d/${fileId}/export?format=xlsx`;

  const res = await fetch(publicUrl, { cache: 'no-store' });
  if (res.ok) {
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return Buffer.from(await res.arrayBuffer());
    }
  }

  // Fallback for raw .docx/.xlsx uploaded to Google Drive with link sharing
  const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  const driveRes = await fetch(driveUrl, { cache: 'no-store' });
  if (driveRes.ok) {
    const contentType = driveRes.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return Buffer.from(await driveRes.arrayBuffer());
    }
  }

  throw new Error(
    `Failed to download ${kind} from Google (${fileId}). Ensure the document is shared or Service Account has access.`
  );
}

function splitDocxTextIntoSections(
  rawText: string,
  defaultTitle: string
): Array<{ title: string; content: string }> {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const sections: Array<{ title: string; content: string }> = [];
  let currentTitle = defaultTitle;
  let currentLines: string[] = [];

  const isHeading = (line: string) =>
    /^\d+\.\s+[А-ЯA-ZЁ]/.test(line) ||
    /^Вопрос\s+\d+:/i.test(line) ||
    /^ПРАЙС-ЛИСТ/i.test(line) ||
    /^ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ/i.test(line);

  for (const line of lines) {
    if (isHeading(line) && currentLines.length > 0) {
      sections.push({
        title: currentTitle,
        content: currentLines.join('\n'),
      });
      currentTitle = line;
      currentLines = [line];
    } else {
      if (currentLines.length === 0 && isHeading(line)) {
        currentTitle = line;
      }
      currentLines.push(line);
    }
  }

  if (currentLines.length > 0) {
    sections.push({
      title: currentTitle,
      content: currentLines.join('\n'),
    });
  }

  return sections;
}

function parseExcelScheduleSections(
  buffer: Buffer
): Array<{ title: string; content: string }> {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sections: Array<{ title: string; content: string }> = [];

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });
    if (rows.length === 0) continue;

    const firstRowKeys = Object.keys(rows[0]);
    const teacherKey = firstRowKeys.find((k) =>
      /преподавател|учител|teacher|ustoz|фио/i.test(k)
    );

    if (teacherKey) {
      const grouped = new Map<string, Record<string, unknown>[]>();
      for (const row of rows) {
        const teacherName = String(row[teacherKey] || '').trim();
        if (!teacherName) continue;
        if (!grouped.has(teacherName)) grouped.set(teacherName, []);
        grouped.get(teacherName)!.push(row);
      }

      for (const [teacherName, tRows] of Array.from(grouped.entries())) {
        const formattedRows = tRows.map((r) =>
          Object.entries(r)
            .filter(([k]) => k !== teacherKey)
            .map(([k, v]) => `${k}: ${String(v).trim()}`)
            .join(' | ')
        );

        sections.push({
          title: `Преподаватель: ${teacherName}`,
          content: `Преподаватель: ${teacherName}\n${formattedRows.join('\n')}`,
        });
      }
    } else {
      const formatted = rows.map((r) =>
        Object.entries(r)
          .map(([k, v]) => `${k}: ${String(v).trim()}`)
          .join(' | ')
      );
      sections.push({
        title: sheetName,
        content: `${sheetName}\n${formatted.join('\n')}`,
      });
    }
  }

  return sections;
}

/**
 * Checks Google Drive modifiedTime/version on every call.
 * Whenever any source file on Google Drive changes, immediately downloads, re-parses, and flags `changed: true`.
 */
export async function loadFreshDocuments(forceRefresh = false): Promise<LoadedDocument[]> {
  const docsDir = path.join(process.cwd(), 'rag-docs');
  const accessToken = await getGoogleServiceAccessToken().catch(() => null);

  const specs: Array<{
    source: 'price_list.docx' | 'faq.docx' | 'schedule.xlsx';
    sourceLabel: string;
    kind: 'docx' | 'xlsx';
    envId: string | undefined;
  }> = [
    {
      source: 'price_list.docx',
      sourceLabel: 'Прайс-лист',
      kind: 'docx',
      envId: process.env.RAG_PRICE_LIST_DOC_ID,
    },
    {
      source: 'faq.docx',
      sourceLabel: 'FAQ',
      kind: 'docx',
      envId: process.env.RAG_FAQ_DOC_ID,
    },
    {
      source: 'schedule.xlsx',
      sourceLabel: 'График работы (Excel)',
      kind: 'xlsx',
      envId: process.env.RAG_SCHEDULE_SHEET_ID,
    },
  ];

  const loaded = await Promise.all(
    specs.map(async (spec): Promise<LoadedDocument> => {
      const fileId = extractGoogleFileId(spec.envId);
      let buffer: Buffer;
      let origin: LoadedDocument['origin'] = 'local-file';
      let versionTag = 'local';

      if (fileId) {
        try {
          const meta = accessToken ? await fetchDriveMetadata(fileId, accessToken) : null;
          if (meta) {
            versionTag = `${meta.version || ''}:${meta.modifiedTime || ''}`;
            const cached = docCache.get(spec.source);
            if (!forceRefresh && cached && cached.versionTag === versionTag) {
              return { ...cached.doc, changed: false };
            }
          }

          buffer = await fetchGoogleFileBuffer(fileId, spec.kind, accessToken, meta?.mimeType);
          origin = spec.kind === 'docx' ? 'google-docs' : 'google-sheets';

          if (!meta) {
            versionTag = crypto.createHash('sha1').update(buffer).digest('hex');
            const cached = docCache.get(spec.source);
            if (!forceRefresh && cached && cached.versionTag === versionTag) {
              return { ...cached.doc, changed: false };
            }
          }
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn(
            `[Google Docs Loader] Failed to fetch ${spec.source} (${fileId}), falling back to local file:`,
            msg
          );
          const localPath = path.join(docsDir, spec.source);
          buffer = fs.readFileSync(localPath);
          versionTag = `local:${fs.statSync(localPath).mtimeMs}`;
        }
      } else {
        const localPath = path.join(docsDir, spec.source);
        buffer = fs.readFileSync(localPath);
        versionTag = `local:${fs.statSync(localPath).mtimeMs}`;
        const cached = docCache.get(spec.source);
        if (!forceRefresh && cached && cached.versionTag === versionTag) {
          return { ...cached.doc, changed: false };
        }
      }

      const sections =
        spec.kind === 'docx'
          ? splitDocxTextIntoSections((await mammoth.extractRawText({ buffer })).value, spec.sourceLabel)
          : parseExcelScheduleSections(buffer);

      const doc: LoadedDocument = {
        source: spec.source,
        sourceLabel: spec.sourceLabel,
        origin,
        versionTag,
        changed: true,
        sections,
      };

      docCache.set(spec.source, { versionTag, doc });
      return doc;
    })
  );

  return loaded;
}
