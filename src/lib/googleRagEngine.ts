/**
 * Standalone Google AI Studio Vector RAG Engine (Zero External Dependencies)
 * Based on google-ai-studio-rag skill (gemini-embedding-001 + Cosine Similarity)
 */

export type EmbeddingTaskType = 'RETRIEVAL_QUERY' | 'RETRIEVAL_DOCUMENT' | 'SEMANTIC_SIMILARITY';

export interface VectorChunk {
  id: string;
  source: string;
  sourceLabel: string;
  origin?: string;
  title: string;
  text: string;
  vector?: number[];
}

export type ScoredVectorChunk<T extends VectorChunk = VectorChunk> = T & {
  similarity: number;
  similarityPercent: number;
};

const EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL || 'gemini-embedding-001';

// In-memory embedding cache keyed by `${taskType}:${text}`
const vectorCache = new Map<string, number[]>();

/**
 * 1. Vector Math: Cosine Similarity
 * Cos(θ) = (A · B) / (||A|| * ||B||)
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * 2. Generate Vector Embedding via Google AI Studio API
 */
export async function getEmbedding(
  text: string,
  taskType: EmbeddingTaskType = 'RETRIEVAL_DOCUMENT',
  apiKey = process.env.GEMINI_API_KEY || ''
): Promise<number[]> {
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('GEMINI_API_KEY is not defined.');
  }

  const cacheKey = `${taskType}:${text}`;
  const cached = vectorCache.get(cacheKey);
  if (cached) return cached;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:embedContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: `models/${EMBEDDING_MODEL}`,
      content: { parts: [{ text }] },
      taskType,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google AI Studio Embedding Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const vector = data?.embedding?.values;
  if (!vector || !Array.isArray(vector)) {
    throw new Error('Invalid embedding vector structure received from Google AI Studio.');
  }

  vectorCache.set(cacheKey, vector);
  return vector;
}

/**
 * 3. Batch Embed Knowledge Base Chunks (Precomputes & Caches Vectors)
 */
export async function indexKnowledgeChunks(
  chunks: VectorChunk[],
  apiKey = process.env.GEMINI_API_KEY || ''
): Promise<VectorChunk[]> {
  const missing = chunks.filter((c) => !c.vector);
  if (missing.length === 0) return chunks;

  const BATCH_SIZE = 10;
  for (let i = 0; i < missing.length; i += BATCH_SIZE) {
    const batch = missing.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (chunk) => {
        try {
          chunk.vector = await getEmbedding(chunk.text, 'RETRIEVAL_DOCUMENT', apiKey);
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn(`[Google RAG] Failed to embed chunk ${chunk.id}:`, msg);
        }
      })
    );
  }
  return chunks;
}

/**
 * 4. Retrieve Top-K Most Relevant Chunks by Cosine Similarity
 */
export async function retrieveVectorChunks<T extends VectorChunk>(
  userQuery: string,
  chunks: T[],
  topK = 5,
  apiKey = process.env.GEMINI_API_KEY || ''
): Promise<ScoredVectorChunk<T>[]> {
  await indexKnowledgeChunks(chunks, apiKey);

  const queryVector = await getEmbedding(userQuery, 'RETRIEVAL_QUERY', apiKey);

  const scored: ScoredVectorChunk<T>[] = chunks
    .filter((c) => c.vector && Array.isArray(c.vector))
    .map((chunk) => {
      const similarity = cosineSimilarity(queryVector, chunk.vector!);
      return {
        ...chunk,
        similarity,
        similarityPercent: Math.round(similarity * 100),
      };
    });

  scored.sort((a, b) => b.similarity - a.similarity);
  return scored.slice(0, topK);
}

export function getEmbeddingModelName(): string {
  return EMBEDDING_MODEL;
}
