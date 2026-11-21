import {
  VectorChunk,
  ScoredVectorChunk,
  retrieveVectorChunks,
  getEmbeddingModelName,
} from './googleRagEngine';
import { loadFreshDocuments } from './googleDocsLoader';

export interface RagChunk extends VectorChunk {
  content: string;
  tokens: string[];
}

export interface RetrievalResult {
  chunk: RagChunk;
  score: number;
  similarityPercent?: number;
}

export interface RagRetrievalResponse {
  results: RetrievalResult[];
  method: 'google-vector-embeddings' | 'keyword-fallback';
  embeddingModel: string;
  anyDocChanged: boolean;
  documentsMeta: Array<{
    source: string;
    origin: string;
    versionTag: string;
    changed: boolean;
    sectionsCount: number;
  }>;
}

const SYNONYM_MAP: Record<string, string[]> = {
  price: ['цена', 'стоимость', 'прайс', 'стоит', 'сум', 'uzs', 'оплата', 'рассрочка'],
  cost: ['цена', 'стоимость', 'прайс', 'стоит', 'сум'],
  narx: ['цена', 'стоимость', 'прайс', 'сум'],
  narxi: ['цена', 'стоимость', 'прайс', 'сум'],
  qancha: ['сколько', 'цена', 'стоимость', 'сум'],
  installment: ['рассрочка', 'платеж', 'uzum', 'anorbank'],
  muddatli: ['рассрочка', 'платеж', 'uzum', 'anorbank'],
  schedule: ['график', 'расписание', 'часы', 'время', 'дни', 'неделя', 'преподаватель'],
  jadval: ['график', 'расписание', 'часы', 'время', 'дни'],
  vaqt: ['время', 'часы', 'график'],
  teacher: ['преподаватель', 'ментор', 'учитель', 'азиз', 'сара', 'фаррух', 'елена', 'иван'],
  ustoz: ['преподаватель', 'ментор', 'азиз', 'сара', 'фаррух', 'елена', 'иван'],
  address: ['адрес', 'филиал', 'кампус', 'метро', 'ориентир'],
  manzil: ['адрес', 'филиал', 'кампус', 'метро'],
  phone: ['телефон', 'номер', 'позвонить', 'telegram', 'instagram'],
  raqam: ['телефон', 'номер', 'telegram'],
  cancel: ['отмена', 'перенос', 'пропуск', 'заморозка'],
  refund: ['отмена', 'перенос', 'гарантия', 'возврат'],
  guarantee: ['гарантия', 'договор', 'качество', 'балл'],
  kafolat: ['гарантия', 'договор', 'качество'],
  enroll: ['запись', 'записаться', 'бронь', 'бронирование', 'тестирование'],
  yozilish: ['запись', 'записаться', 'бронь'],
  ielts: ['ielts', 'английский', 'english'],
  sat: ['sat', 'математика', 'math'],
  python: ['python', 'информатика', 'программирование', 'it'],
  math: ['математика', 'олимпиадная', 'sat', 'егэ'],
};

function tokenize(text: string): string[] {
  const matches = text.toLowerCase().match(/[a-zа-яё0-9]+/g);
  if (!matches) return [];
  return matches.filter((t) => t.length >= 2);
}

/**
 * Loads fresh chunks from Google Docs (.docx) & Google Sheets/Excel (.xlsx) on every request.
 */
export async function loadFreshRagChunks(forceRefresh = false) {
  const docs = await loadFreshDocuments(forceRefresh);
  const chunks: RagChunk[] = [];
  let anyDocChanged = false;

  const documentsMeta = docs.map((doc) => {
    if (doc.changed) anyDocChanged = true;
    doc.sections.forEach((sec, idx) => {
      const enrichedText = `${doc.sourceLabel} — ${sec.title}\n${sec.content}`;
      chunks.push({
        id: `${doc.source}#${idx}`,
        source: doc.source,
        sourceLabel: doc.sourceLabel,
        origin: doc.origin,
        title: sec.title,
        text: enrichedText,
        content: sec.content,
        tokens: tokenize(sec.content),
      });
    });

    return {
      source: doc.source,
      origin: doc.origin,
      versionTag: doc.versionTag,
      changed: doc.changed,
      sectionsCount: doc.sections.length,
    };
  });

  return { chunks, anyDocChanged, documentsMeta };
}

function expandQueryTokens(tokens: string[]): string[] {
  const expanded = new Set<string>(tokens);
  for (const token of tokens) {
    if (SYNONYM_MAP[token]) {
      for (const syn of SYNONYM_MAP[token]) {
        expanded.add(syn);
      }
    }
  }
  return Array.from(expanded);
}

export function retrieveKeywordChunks(
  chunks: RagChunk[],
  query: string,
  topK = 10
): RetrievalResult[] {
  const rawTokens = tokenize(query);
  const queryTokens = expandQueryTokens(rawTokens);

  if (queryTokens.length === 0) {
    return chunks.slice(0, topK).map((chunk) => ({ chunk, score: 1 }));
  }

  const scored: RetrievalResult[] = chunks.map((chunk) => {
    let score = 0;
    const chunkTextLower = chunk.content.toLowerCase();
    const titleLower = chunk.title.toLowerCase();

    for (const qToken of queryTokens) {
      const isOriginal = rawTokens.includes(qToken);
      const weight = isOriginal ? 2.0 : 1.0;

      if (titleLower.includes(qToken)) {
        score += 4.0 * weight;
      }

      let termHits = 0;
      const stem = qToken.length > 4 ? qToken.slice(0, Math.min(qToken.length - 1, 6)) : qToken;
      for (const cToken of chunk.tokens) {
        if (cToken === qToken) {
          termHits += 1.5;
        } else if (stem.length >= 4 && cToken.startsWith(stem)) {
          termHits += 0.9;
        }
      }

      if (termHits === 0 && chunkTextLower.includes(qToken)) {
        termHits = 1;
      }

      score += Math.min(termHits, 5) * weight;
    }

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const nonZero = scored.filter((item) => item.score > 0).slice(0, topK);
  if (nonZero.length > 0) {
    return nonZero;
  }

  return chunks.slice(0, Math.min(3, chunks.length)).map((chunk) => ({ chunk, score: 0.1 }));
}

/**
 * Primary RAG retrieval using fresh Google Docs (.docx) & Excel (.xlsx) + Google AI Studio Vector Embeddings (gemini-embedding-001).
 */
export async function retrieveWithGoogleRAG(
  query: string,
  topK = 10
): Promise<RagRetrievalResponse> {
  const { chunks, anyDocChanged, documentsMeta } = await loadFreshRagChunks(false);
  const apiKey = process.env.GEMINI_API_KEY || '';
  const embeddingModel = getEmbeddingModelName();

  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    try {
      const allScored: ScoredVectorChunk<RagChunk>[] = await retrieveVectorChunks(
        query,
        chunks,
        chunks.length,
        apiKey
      );
      if (allScored.length > 0) {
        const selected = new Map<string, ScoredVectorChunk<RagChunk>>();
        for (const item of allScored.slice(0, topK)) {
          selected.set(item.id, item);
        }

        // If schedule.xlsx is in top hits, include all teacher schedule chunks
        const hasScheduleHit = allScored
          .slice(0, 5)
          .some((item) => item.source === 'schedule.xlsx');
        if (hasScheduleHit) {
          for (const item of allScored) {
            if (item.source === 'schedule.xlsx' && item.title.includes('Преподаватель')) {
              selected.set(item.id, item);
            }
          }
        }

        // If price_list.docx is in top hits, include all numbered course sections
        const hasPriceHit = allScored
          .slice(0, 5)
          .some((item) => item.source === 'price_list.docx');
        if (hasPriceHit) {
          for (const item of allScored) {
            if (item.source === 'price_list.docx' && /^[1-5]\./.test(item.title)) {
              selected.set(item.id, item);
            }
          }
        }

        const merged = Array.from(selected.values()).sort(
          (a, b) => b.similarity - a.similarity
        );

        return {
          results: merged.map((vr) => ({
            chunk: vr,
            score: vr.similarity,
            similarityPercent: vr.similarityPercent,
          })),
          method: 'google-vector-embeddings',
          embeddingModel,
          anyDocChanged,
          documentsMeta,
        };
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn('[Google RAG] Falling back to keyword retrieval:', msg);
    }
  }

  return {
    results: retrieveKeywordChunks(chunks, query, topK),
    method: 'keyword-fallback',
    embeddingModel,
    anyDocChanged,
    documentsMeta,
  };
}

/**
 * Forces a fresh check/download from Google Drive and precomputes embeddings for all chunks.
 */
export async function syncAndReindexRag(forceRefresh = true) {
  const { indexKnowledgeChunks } = await import('./googleRagEngine');
  const { chunks, anyDocChanged, documentsMeta } = await loadFreshRagChunks(forceRefresh);
  const apiKey = process.env.GEMINI_API_KEY || '';
  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    await indexKnowledgeChunks(chunks, apiKey);
  }
  return {
    totalChunks: chunks.length,
    anyDocChanged,
    documentsMeta,
    embeddingModel: getEmbeddingModelName(),
  };
}
