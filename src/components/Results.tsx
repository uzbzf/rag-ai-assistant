'use client';

import React from 'react';
import { resultsData } from '@/data/mockData';
import { Language, translations } from '@/data/translations';
import { Trophy, Star, Sparkles, GraduationCap, Quote } from 'lucide-react';

interface ResultsProps {
  lang: Language;
}

export const Results: React.FC<ResultsProps> = ({ lang }) => {
  const t = translations[lang].results;

  return (
    <section id="results" className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.title}
            <span className="text-brand-red">{t.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {t.desc}
          </p>
        </div>

        {/* Results Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {resultsData.map((res) => (
            <div
              key={res.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-cardHover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 relative overflow-hidden"
            >
              {/* Corner badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-extrabold uppercase tracking-wider bg-rose-50 dark:bg-rose-950/50 text-brand-red px-2.5 py-1 rounded-md">
                  {res.badge}
                </span>
                <div className="flex items-center gap-0.5 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>

              <div>
                {/* Student Avatar & Basic Info */}
                <div className="flex items-center gap-3.5 mb-4">
                  <img
                    src={res.photo}
                    alt={res.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-rose-100 dark:ring-slate-700 flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-brand-red transition-colors">
                      {res.name}
                    </h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {res.course}
                    </div>
                  </div>
                </div>

                {/* Main Score Highlight */}
                <div className="bg-slate-900 text-white rounded-2xl p-4 mb-4 text-center border border-slate-800">
                  <div className="text-xs uppercase tracking-wider text-rose-300 font-bold">
                    {t.officialScore}
                  </div>
                  <div className="text-2xl font-black text-white mt-0.5 tracking-tight">
                    {res.score}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 line-clamp-1">
                    {res.achievement}
                  </div>
                </div>

                {/* University acceptance */}
                <div className="flex items-start gap-2 text-xs text-slate-800 dark:text-emerald-200 font-semibold mb-4 bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800">
                  <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{res.university}</span>
                </div>

                {/* Quote */}
                <div className="relative text-xs text-slate-600 dark:text-slate-300 italic bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <Quote className="w-4 h-4 text-slate-300 dark:text-slate-600 absolute top-2 right-2 -rotate-180" />
                  <p className="relative z-10">{res.feedback}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Global Metric Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-around gap-8 text-center border border-slate-800">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-brand-red">{t.banner1Value}</div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">{t.banner1Desc}</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-slate-800" />
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white">{t.banner2Value}</div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">{t.banner2Desc}</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-slate-800" />
          <div>
            <div className="text-3xl sm:text-4xl font-black text-brand-red">{t.banner3Value}</div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">{t.banner3Desc}</div>
          </div>
        </div>

      </div>
    </section>
  );
};
