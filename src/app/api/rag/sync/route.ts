import { NextResponse } from 'next/server';
import { syncAndReindexRag } from '@/lib/rag';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const result = await syncAndReindexRag(true);
    return NextResponse.json({ status: 'ok', ...result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Sync failed';
    return NextResponse.json({ status: 'error', error: message }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}
