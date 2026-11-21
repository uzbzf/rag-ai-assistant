import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { retrieveWithGoogleRAG } from '@/lib/rag';
import { appendStudentEnrollment, findAvailableSlots } from '@/lib/googleSheetsEnroll';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const MODEL_NAME = process.env.GEMINI_CHAT_MODEL || 'gemini-3.5-flash-lite';

const LANGUAGE_NAMES: Record<string, string> = {
  ru: 'Russian (Русский)',
  uz: 'Uzbek (O‘zbekcha)',
  en: 'English',
};

const AGENT_TOOLS = [
  {
    type: 'function' as const,
    name: 'find_free_slots',
    description:
      'Find available / free time slots (свободные окна) for students by checking the live teacher schedule and existing student bookings in Google Sheets. Use this whenever a user asks about free slots, available times, or when a teacher/course has open spots.',
    parameters: {
      type: 'object',
      properties: {
        teacher: {
          type: 'string',
          description: 'Optional teacher name filter (e.g. "Азиз", "Сара", "Фаррух", "Елена", "Иван", "Петр").',
        },
        day: {
          type: 'string',
          description: 'Optional day of week filter (e.g. "Понедельник", "Вторник", "Суббота").',
        },
        course: {
          type: 'string',
          description: 'Optional course or subject keyword (e.g. "IELTS", "SAT", "Python", "C++", "Математика").',
        },
        branch: {
          type: 'string',
          description: 'Optional campus/branch filter (e.g. "Центральный", "Чиланзар", "Юнусабад").',
        },
      },
    },
  },
  {
    type: 'function' as const,
    name: 'enroll_student',
    description:
      'Enroll / register a student into the official Google Spreadsheet. Only call this when you have the student full name, phone number, and desired course/subject. If name or phone is missing, ask the user for them first.',
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Student full name.' },
        phone: { type: 'string', description: 'Student phone number.' },
        course: { type: 'string', description: 'Course or subject name.' },
        teacher: { type: 'string', description: 'Selected teacher name, if specified.' },
        branch: { type: 'string', description: 'Preferred campus (Центральный кампус, Чиланзар, Юнусабад).' },
        format: { type: 'string', description: 'Study format: Групповое (до 12 чел.), Онлайн, or Индивидуально.' },
        day: { type: 'string', description: 'Preferred day of week for the class/slot.' },
        time: { type: 'string', description: 'Preferred time slot (e.g. "16:30 – 18:30").' },
      },
      required: ['name', 'phone', 'course'],
    },
  },
];

async function executeToolCall(
  name: string,
  args: Record<string, unknown>
): Promise<{ output: unknown; isError?: boolean }> {
  try {
    if (name === 'find_free_slots') {
      const result = await findAvailableSlots({
        teacher: typeof args.teacher === 'string' ? args.teacher : undefined,
        day: typeof args.day === 'string' ? args.day : undefined,
        course: typeof args.course === 'string' ? args.course : undefined,
        branch: typeof args.branch === 'string' ? args.branch : undefined,
      });
      return { output: result };
    }

    if (name === 'enroll_student') {
      const studentName = typeof args.name === 'string' ? args.name.trim() : '';
      const phone = typeof args.phone === 'string' ? args.phone.trim() : '';
      const course = typeof args.course === 'string' ? args.course.trim() : '';

      if (!studentName || !phone || !course) {
        return {
          output: { error: 'Нужны имя, телефон и курс для записи студента.' },
          isError: true,
        };
      }

      const booking = await appendStudentEnrollment({
        name: studentName,
        phone,
        course,
        teacher: typeof args.teacher === 'string' ? args.teacher : undefined,
        branch: typeof args.branch === 'string' ? args.branch : undefined,
        format: typeof args.format === 'string' ? args.format : undefined,
        day: typeof args.day === 'string' ? args.day : undefined,
        time: typeof args.time === 'string' ? args.time : undefined,
        source: 'ai-assistant',
      });
      return { output: { success: true, booking } };
    }

    return { output: { error: `Unknown tool: ${name}` }, isError: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { output: { error: msg }, isError: true };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = typeof body?.message === 'string' ? body.message.trim() : '';
    const language = typeof body?.language === 'string' && LANGUAGE_NAMES[body.language] ? body.language : 'ru';
    const previousInteractionId =
      typeof body?.previousInteractionId === 'string' && body.previousInteractionId
        ? body.previousInteractionId
        : undefined;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 1. Retrieve relevant RAG chunks using Google AI Studio Vector Embeddings (gemini-embedding-001)
    const {
      results: retrieved,
      method: retrievalMethod,
      embeddingModel,
      anyDocChanged,
      documentsMeta,
    } = await retrieveWithGoogleRAG(message, 10);

    const contextText = retrieved
      .map((item, idx) => {
        const rel = item.similarityPercent !== undefined ? ` | Relevance: ${item.similarityPercent}%` : '';
        return `[Source ${idx + 1}: ${item.chunk.sourceLabel} (${item.chunk.source}) — ${item.chunk.title}${rel}]\n${item.chunk.content}`;
      })
      .join('\n\n---\n\n');

    const uniqueSources = Array.from(
      new Map(
        retrieved.map((r) => [
          r.chunk.source,
          {
            source: r.chunk.source,
            label: r.chunk.sourceLabel,
            origin: r.chunk.origin,
            title: r.chunk.title,
            similarityPercent: r.similarityPercent,
          },
        ])
      ).values()
    );

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json(
        {
          needsApiKey: true,
          model: MODEL_NAME,
          embeddingModel,
          retrievalMethod,
          sources: uniqueSources,
          retrievedPreview: retrieved.slice(0, 2).map((r) => ({
            source: r.chunk.sourceLabel,
            title: r.chunk.title,
            excerpt: r.chunk.content.slice(0, 280) + (r.chunk.content.length > 280 ? '...' : ''),
          })),
          error:
            language === 'uz'
              ? 'GEMINI_API_KEY sozlanmagan. Google AI Studio Vector RAG (gemini-embedding-001) va gemini-3.5-flash-lite ishlashi uchun .env.local fayliga GEMINI_API_KEY qo‘shing.'
              : language === 'en'
              ? 'GEMINI_API_KEY is not configured. Add GEMINI_API_KEY to .env.local to enable Google AI Studio Vector RAG (gemini-embedding-001) and gemini-3.5-flash-lite.'
              : 'GEMINI_API_KEY не настроен. Добавьте GEMINI_API_KEY в файл .env.local для работы Google AI Studio Vector RAG (gemini-embedding-001) и модели gemini-3.5-flash-lite.',
        },
        { status: 503 }
      );
    }

    // 2. Call Gemini 3.5 Flash-Lite via @google/genai Interactions API with Function Calling tools
    const client = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are the official AI Assistant for the educational center "INTER-ACADEMY" (Tashkent, Uzbekistan).
Always respond in ${LANGUAGE_NAMES[language]}.
Your answers MUST be grounded strictly in the provided RAG Knowledge Base context (Price List, FAQ, and Teacher Schedule) and live tool results.

Tools available:
1. "find_free_slots": Call this whenever the user asks about free windows (свободные окна), available times, or open seats for a teacher, day, course, or branch. Note: standard group capacity is up to 12 students per group (maxCapacity: 12).
2. "enroll_student": Call this to register a student into the official Google Spreadsheet once you have their name, phone number, and course (plus optional teacher/day/time/branch/format — default format is "Групповое обучение (до 12 чел.)"). If any required field (name, phone, course) is missing, politely ask for it first.
- If a tool returns a Google Sheets API permission/disabled error, explain the exact error and activation link clearly to the user.

Rules:
- Be polite, concise, structured, and helpful. Use bullet points when listing prices, schedules, or free slots.
- Mention exact prices in UZS (сум) and installment options (рассрочка 0-0-6 / 0-0-12) when relevant.
- Never invent prices, discounts, schedules, or booking IDs.

RAG KNOWLEDGE BASE CONTEXT:
${contextText}`;

    let interaction = await client.interactions.create({
      model: MODEL_NAME,
      input: message,
      system_instruction: systemInstruction,
      tools: AGENT_TOOLS,
      ...(previousInteractionId && !anyDocChanged
        ? { previous_interaction_id: previousInteractionId }
        : {}),
    });

    const toolActions: Array<{ tool: string; result: unknown }> = [];
    const handledCallIds = new Set<string>();

    // Handle up to 4 tool-calling turns
    for (let stepIdx = 0; stepIdx < 4; stepIdx++) {
      const steps = interaction.steps || [];
      const functionCalls = steps.filter(
        (s): s is Extract<(typeof steps)[number], { type: 'function_call' }> =>
          s.type === 'function_call' && Boolean(s.id) && Boolean(s.name) && !handledCallIds.has(s.id)
      );
      if (functionCalls.length === 0) break;

      const functionResults = await Promise.all(
        functionCalls.map(async (fc) => {
          handledCallIds.add(fc.id);
          const res = await executeToolCall(fc.name, (fc.arguments || {}) as Record<string, unknown>);
          toolActions.push({ tool: fc.name, result: res.output });
          return {
            type: 'function_result' as const,
            call_id: fc.id,
            name: fc.name,
            result: JSON.stringify(res.output),
            ...(res.isError ? { is_error: true } : {}),
          };
        })
      );

      interaction = await client.interactions.create({
        model: MODEL_NAME,
        input: functionResults,
        previous_interaction_id: interaction.id,
        system_instruction: systemInstruction,
        tools: AGENT_TOOLS,
      });
    }

    const reply =
      interaction.output_text ||
      (language === 'uz'
        ? 'Kechirasiz, javob shakllantirib bo‘lmadi.'
        : language === 'en'
        ? 'Sorry, I could not generate a response.'
        : 'Извините, не удалось сформировать ответ.');

    return NextResponse.json({
      reply,
      interactionId: interaction.id,
      model: MODEL_NAME,
      embeddingModel,
      retrievalMethod,
      anyDocChanged,
      documentsMeta,
      toolActions,
      sources: uniqueSources,
    });
  } catch (err: unknown) {
    console.error('RAG Chat API error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
