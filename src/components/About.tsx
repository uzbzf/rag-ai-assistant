'use client';

import React, { useState } from 'react';
import { facilitiesData } from '@/data/mockData';
import { Language, translations } from '@/data/translations';
import { ShieldCheck, Target, Award, Sparkles, BookOpen } from 'lucide-react';

interface AboutProps {
  lang: Language;
}

export const About: React.FC<AboutProps> = ({ lang }) => {
  const [activeFacilityIndex, setActiveFacilityIndex] = useState(0);

  const t = translations[lang].about;

  const features = [
    { title: t.f1Title, desc: t.f1Desc, icon: <Award className="w-6 h-6 text-brand-red" /> },
    { title: t.f2Title, desc: t.f2Desc, icon: <Target className="w-6 h-6 text-brand-red" /> },
    { title: t.f3Title, desc: t.f3Desc, icon: <BookOpen className="w-6 h-6 text-brand-red" /> },
    { title: t.f4Title, desc: t.f4Desc, icon: <ShieldCheck className="w-6 h-6 text-brand-red" /> },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-brand-red text-xs font-bold tracking-wider uppercase mb-3">
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

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feat, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-750 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 hover:border-brand-red/30 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center mb-5 group-hover:bg-rose-50 dark:group-hover:bg-rose-950/50 group-hover:scale-110 transition-all">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-red transition-colors">
                {feat.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Campus & Facilities Showcase */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl relative border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left list of spaces */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-brand-red font-bold text-xs uppercase tracking-widest">
                  {t.campusHeadingBadge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-4">
                  {t.campusHeadingTitle}
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                  {t.campusHeadingDesc}
                </p>
              </div>

              {/* Selector buttons */}
              <div className="space-y-3">
                {facilitiesData.map((facility, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveFacilityIndex(idx)}
                    className={`w-full text-left p-4 rounded-xl transition-all flex items-start gap-3 border ${
                      activeFacilityIndex === idx
                        ? 'bg-white/10 border-brand-red shadow-lg text-white'
                        : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-slate-200'
                    }`}
                  >
                    <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${activeFacilityIndex === idx ? 'bg-brand-red' : 'bg-slate-600'}`} />
                    <div>
                      <div className="font-bold text-sm text-white">{facility.title}</div>
                      <div className="text-xs text-slate-400 mt-1 line-clamp-2">{facility.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right preview image */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-white/10 shadow-2xl group">
                <img
                  src={facilitiesData[activeFacilityIndex].image}
                  alt={facilitiesData[activeFacilityIndex].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-brand-red font-bold text-xs uppercase">
                    Инфраструктура
                  </span>
                  <h4 className="text-xl font-bold text-white mt-1">
                    {facilitiesData[activeFacilityIndex].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
                    {facilitiesData[activeFacilityIndex].desc}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
