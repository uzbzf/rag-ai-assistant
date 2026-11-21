'use client';

import React, { useState } from 'react';
import { coursesData } from '@/data/mockData';
import { Language, translations } from '@/data/translations';
import { 
  Calculator, 
  Languages, 
  Code2, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Flame,
  FileText
} from 'lucide-react';

interface CoursesProps {
  onOpenEnrollModal: (courseTitle?: string) => void;
  onOpenDocsModal?: () => void;
  lang: Language;
}

export const Courses: React.FC<CoursesProps> = ({ onOpenEnrollModal, onOpenDocsModal, lang }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'math' | 'english' | 'cs'>('all');

  const t = translations[lang].courses;

  const filteredCourses = activeCategory === 'all'
    ? coursesData
    : coursesData.filter(c => c.category === activeCategory);

  const categories = [
    { id: 'all', label: t.filterAll, icon: Sparkles },
    { id: 'math', label: t.filterMath, icon: Calculator },
    { id: 'english', label: t.filterEnglish, icon: Languages },
    { id: 'cs', label: t.filterCs, icon: Code2 },
  ];

  return (
    <section id="courses" className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/40 text-brand-red text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
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

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-red text-white shadow-red shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-brand-red hover:bg-rose-50/50 dark:hover:bg-slate-750 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-brand-red'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`bg-white dark:bg-slate-900 rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1.5 hover:shadow-cardHover ${
                course.popular
                  ? 'border-brand-red ring-1 ring-brand-red/20 shadow-lg'
                  : 'border-slate-200/80 dark:border-slate-800 shadow-card hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Popular badge */}
              {course.popular && (
                <div className="absolute -top-3.5 right-6 bg-brand-red text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{t.hitBadge}</span>
                </div>
              )}

              {/* Top part */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-block text-xs font-bold text-brand-red bg-rose-50 dark:bg-rose-950/40 px-3 py-1 rounded-lg">
                    {course.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {course.category === 'math' ? t.filterMath : course.category === 'english' ? t.filterEnglish : t.filterCs}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-brand-red transition-colors mb-3 leading-snug">
                  {course.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                {/* Key metadata pills */}
                <div className="space-y-2 py-4 border-y border-slate-100 dark:border-slate-800 mb-6 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-red" />
                    <span>{t.durationLabel} <strong className="text-slate-800 dark:text-white">{course.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-red" />
                    <span>{t.intensityLabel} <strong className="text-slate-800 dark:text-white">{course.lessonsPerWeek}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{t.formatLabel} <strong className="text-slate-800 dark:text-white">{course.format}</strong></span>
                  </div>
                </div>

                {/* Bullet points */}
                <div className="space-y-2 mb-8">
                  {course.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Price & Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase">{t.priceLabel}</div>
                  <div className="text-lg font-black text-slate-900 dark:text-white">{course.price}</div>
                </div>

                <button
                  onClick={() => onOpenEnrollModal(course.title)}
                  className="inline-flex items-center gap-1.5 bg-slate-900 dark:bg-slate-800 hover:bg-brand-red dark:hover:bg-brand-red text-white text-xs font-bold px-4 py-3 rounded-xl transition-all group-hover:shadow-md"
                >
                  <span>{t.enrollBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Free trial callout banner & Full RAG Price list button */}
        <div className="mt-14 bg-gradient-to-r from-brand-red to-rose-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
              {t.trialBannerBadge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-3">
              {t.trialBannerTitle}
            </h3>
            <p className="text-rose-100 text-sm mt-2">
              {t.trialBannerDesc}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {onOpenDocsModal && (
              <button
                onClick={onOpenDocsModal}
                className="flex-shrink-0 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm px-6 py-4 rounded-2xl transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Полный прайс-лист RAG</span>
              </button>
            )}

            <button
              onClick={() => onOpenEnrollModal('Бесплатная диагностика уровня')}
              className="flex-shrink-0 bg-white hover:bg-rose-50 text-brand-red font-black text-sm px-8 py-4 rounded-2xl shadow-lg transition-transform hover:scale-105"
            >
              {t.trialBannerBtn}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
