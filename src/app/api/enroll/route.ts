import { NextRequest, NextResponse } from 'next/server';
import { appendStudentEnrollment, findAvailableSlots } from '@/lib/googleSheetsEnroll';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const result = await findAvailableSlots({
      teacher: searchParams.get('teacher') || undefined,
      day: searchParams.get('day') || undefined,
      course: searchParams.get('course') || undefined,
      branch: searchParams.get('branch') || undefined,
    });
    return NextResponse.json({ status: 'ok', ...result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch available slots';
    return NextResponse.json({ status: 'error', error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
    const course = typeof body?.course === 'string' ? body.course.trim() : '';

    if (!name || !phone || !course) {
      return NextResponse.json(
        { error: 'Имя, телефон и курс обязательны для записи.' },
        { status: 400 }
      );
    }

    const record = await appendStudentEnrollment({
      name,
      phone,
      course,
      teacher: typeof body?.teacher === 'string' ? body.teacher : undefined,
      branch: typeof body?.branch === 'string' ? body.branch : undefined,
      format: typeof body?.format === 'string' ? body.format : undefined,
      day: typeof body?.day === 'string' ? body.day : undefined,
      time: typeof body?.time === 'string' ? body.time : undefined,
      source: body?.source === 'ai-assistant' ? 'ai-assistant' : 'website-form',
    });

    return NextResponse.json({ success: true, booking: record });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Enrollment failed';
    const status = message.includes('Google Sheets API отключён') || message.includes('Нет прав') ? 403 : 500;
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
