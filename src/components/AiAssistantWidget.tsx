'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Loader2,
  RotateCcw,
  FileText,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import { Language } from '@/data/translations';

interface SourceBadge {
  source: string;
  label: string;
  title: string;
  similarityPercent?: number;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'error';
  text: string;
  sources?: SourceBadge[];
  retrievedPreview?: Array<{ source: string; title: string; excerpt: string }>;
}

interface AiAssistantWidgetProps {
  lang: Language;
}

const UI_COPY: Record<
  Language,
  {
    fabLabel: string;
    title: string;
    subtitle: string;
    welcome: string;
    placeholder: string;
    prompts: string[];
    sourcesLabel: string;
    resetTitle: string;
    thinking: string;
  }
> = {
  ru: {
    fabLabel: 'AI Консультант',
    title: 'AI Ассистент INTER-ACADEMY',
    subtitle: 'gemini-3.5-flash-lite • gemini-embedding-001 RAG',
    welcome:
      'Здравствуйте! Я AI-консультант учебного центра INTER-ACADEMY. Спросите меня о ценах, рассрочке, расписании преподавателей, записи или правилах обучения.',
    placeholder: 'Задайте вопрос о курсах, ценах или графике...',
    prompts: [
      'Какие свободные окна есть у Петра Петровича?',
      'Запиши меня на IELTS: Алишер, +998901112233',
      'Сколько стоит IELTS и есть ли рассрочка?',
      'Что делать, если я пропустил урок?',
    ],
    sourcesLabel: 'Источники RAG:',
    resetTitle: 'Новый диалог',
    thinking: 'Ищу в базе знаний...',
  },
  uz: {
    fabLabel: 'AI Maslahatchi',
    title: 'INTER-ACADEMY AI Yordamchisi',
    subtitle: 'gemini-3.5-flash-lite • RAG bilimlar bazasi',
    welcome:
      'Assalomu alaykum! Men INTER-ACADEMY o‘quv markazining AI maslahatchisiman. Kurs narxlari, muddatli to‘lov, o‘qituvchilar jadvali yoki yozilish shartlari haqida so‘rang.',
    placeholder: 'Kurslar, narxlar yoki jadval haqida yozing...',
    prompts: [
      'IELTS kursi narxi qancha va muddatli to‘lov bormi?',
      'Aziz Karimov qaysi kunlari dars beradi?',
      'Dars qoldirsam nima bo‘ladi?',
      'Filiallar manzili va telefon raqami?',
    ],
    sourcesLabel: 'RAG manbalari:',
    resetTitle: 'Yangi suhbat',
    thinking: 'Bilimlar bazasidan qidiryapman...',
  },
  en: {
    fabLabel: 'AI Assistant',
    title: 'INTER-ACADEMY AI Assistant',
    subtitle: 'gemini-3.5-flash-lite • RAG Knowledge Base',
    welcome:
      'Hello! I am the AI consultant for INTER-ACADEMY. Ask me anything about course tuition, installment plans, teacher schedules, enrollment, or policies.',
    placeholder: 'Ask about courses, prices, or schedule...',
    prompts: [
      'How much is IELTS Intensive and is installment available?',
      'What is Aziz Karimov’s schedule?',
      'What happens if I miss a class?',
      'Where are your campuses located?',
    ],
    sourcesLabel: 'RAG Sources:',
    resetTitle: 'New chat',
    thinking: 'Searching knowledge base...',
  },
};

export const AiAssistantWidget: React.FC<AiAssistantWidgetProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [interactionId, setInteractionId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const copy = UI_COPY[lang];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language: lang,
          previousInteractionId: interactionId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: `e-${Date.now()}`,
            role: 'error',
            text: data.error || 'Error communicating with AI assistant',
            sources: data.sources,
            retrievedPreview: data.retrievedPreview,
          },
        ]);
      } else {
        if (data.interactionId) {
          setInteractionId(data.interactionId);
        }
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            text: data.reply,
            sources: data.sources,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: 'error',
          text:
            lang === 'uz'
              ? 'Server bilan bog‘lanishda xatolik yuz berdi.'
              : lang === 'en'
              ? 'Failed to connect to the chat server.'
              : 'Не удалось подключиться к серверу чата.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInteractionId(undefined);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[410px] h-[560px] max-h-[78vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-slate-900 dark:bg-slate-950 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-red flex items-center justify-center shadow-red flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold leading-tight">{copy.title}</h3>
                <div className="flex items-center gap-1.5 text-[11px] text-rose-300 font-semibold mt-0.5">
                  <Sparkles className="w-3 h-3" />
                  <span>{copy.subtitle}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title={copy.resetTitle}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label={copy.resetTitle}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/60">
            {/* Welcome Bubble */}
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl rounded-tl-sm p-3.5 text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 leading-relaxed shadow-sm">
                {copy.welcome}
              </div>
            </div>

            {/* Starter Prompts when chat is empty */}
            {messages.length === 0 && (
              <div className="pl-9 flex flex-wrap gap-1.5">
                {copy.prompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(prompt)}
                    className="text-left text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-rose-200/70 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-brand-red hover:text-brand-red transition-colors shadow-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Message History */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'items-start gap-2.5'}`}
              >
                {msg.role !== 'user' && (
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      msg.role === 'error'
                        ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-600'
                        : 'bg-brand-red/10 text-brand-red'
                    }`}
                  >
                    {msg.role === 'error' ? (
                      <AlertCircle className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-brand-red text-white rounded-tr-sm font-medium'
                      : msg.role === 'error'
                      ? 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 rounded-tl-sm'
                      : 'bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-sm whitespace-pre-wrap'
                  }`}
                >
                  <div>{msg.text}</div>

                  {/* Retrieved Preview when API key is missing */}
                  {msg.retrievedPreview && msg.retrievedPreview.length > 0 && (
                    <div className="mt-2.5 pt-2.5 border-t border-amber-200/70 dark:border-amber-800/70 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                        Найденный контекст RAG:
                      </div>
                      {msg.retrievedPreview.map((p, i) => (
                        <div
                          key={i}
                          className="p-2 rounded-lg bg-white/70 dark:bg-slate-900/70 text-[11px] text-slate-700 dark:text-slate-300"
                        >
                          <div className="font-bold text-brand-red">
                            {p.source} — {p.title}
                          </div>
                          <div className="line-clamp-3 mt-0.5">{p.excerpt}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* RAG Source Badges */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/70 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {copy.sourcesLabel}
                      </span>
                      {msg.sources.map((src, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/50 text-brand-red"
                          title={src.title}
                        >
                          <FileText className="w-2.5 h-2.5" />
                          {src.label}
                          {src.similarityPercent !== undefined ? ` (${src.similarityPercent}%)` : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center flex-shrink-0">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {copy.thinking}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={copy.placeholder}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-xl bg-brand-red hover:bg-brand-red-700 disabled:opacity-50 text-white shadow-red transition-all flex-shrink-0"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center gap-2.5 bg-brand-red hover:bg-brand-red-700 text-white font-extrabold text-sm px-5 py-3.5 rounded-full shadow-2xl shadow-brand-red/40 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label={copy.fabLabel}
      >
        <div className="relative">
          {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-brand-red animate-pulse" />
          )}
        </div>
        <span>{copy.fabLabel}</span>
      </button>
    </div>
  );
};
