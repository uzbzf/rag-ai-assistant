'use client';

import React from 'react';
import { teachersData } from '@/data/mockData';
import { Language, translations } from '@/data/translations';
import { Award, Briefcase, GraduationCap, Trophy, Sparkles } from 'lucide-react';

interface TeachersProps {
  lang: Language;
}

export const Teachers: React.FC<TeachersProps> = ({ lang }) => {
  const t = translations[lang].teachers;

  return (
    <section id="teachers" className="py-20 md:py-28 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-brand-red text-xs font-bold tracking-wider uppercase mb-3">
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

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachersData.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-750 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-700 hover:border-brand-red/30 shadow-card hover:shadow-cardHover transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
            >
              {/* Photo & Badges */}
              <div className="relative aspect-[4/4.5] overflow-hidden bg-slate-200 dark:bg-slate-700">
                <img
                  src={teacher.photo}
                  alt={teacher.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                {/* Experience Badge */}
                <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-slate-900 dark:text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-brand-red" />
                  <span>{t.expPrefix}{teacher.experienceYears}{t.expSuffix}</span>
                </div>

                {/* Subject badge bottom overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                    {teacher.category === 'math' ? 'Математика' : teacher.category === 'english' ? 'English' : 'IT & Coding'}
                  </span>
                  <h3 className="text-xl font-black text-white leading-tight mt-0.5">
                    {teacher.name}
                  </h3>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-brand-red mb-4">
                    {teacher.role}
                  </p>

                  {/* Credentials */}
                  <div className="space-y-2 mb-4">
                    <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                      <span>{t.credentialsTitle}</span>
                    </div>
                    {teacher.credentials.map((cred, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <span className="text-brand-red font-bold mt-0.5">•</span>
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700 mb-4">
                    <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1 mb-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>{t.achievementsTitle}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {teacher.achievements}
                    </p>
                  </div>
                </div>

                {/* Student Outcomes Box */}
                <div className="mt-4 p-3.5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-red uppercase mb-1">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{t.studentResultsTitle}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                    {teacher.studentResults}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
