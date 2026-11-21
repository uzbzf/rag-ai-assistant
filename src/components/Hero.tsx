'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Award, Users, Star, Sparkles } from 'lucide-react';
import { Language, translations } from '@/data/translations';
import { centerInfo } from '@/data/mockData';

interface HeroProps {
  onOpenEnrollModal: (courseTitle?: string) => void;
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnrollModal, lang }) => {
  const [scrollY, setScrollY] = useState(0);

  const t = translations[lang].hero;
  const tStats = translations[lang].stats;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCourses = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.querySelector('#courses');
    if (elem) {
      const navHeight = 80;
      const elementPosition = elem.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-rose-50/40 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      
      {/* Decorative Parallax Background Elements */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200/30 dark:bg-rose-900/10 rounded-full blur-3xl pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.25}px))` }}
      />
      <div
        className="absolute -top-10 right-0 w-80 h-80 bg-brand-red/10 dark:bg-brand-red/5 rounded-full blur-2xl pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Season Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-rose-100 dark:border-slate-700 shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-red" />
                {t.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12] mb-6">
              {t.titleStart}
              <span className="relative inline-block text-brand-red">
                {t.titleHighlight}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 250 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9C55 3 195 3 247 9" stroke="#E11D48" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
              {t.titleEnd}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
              {t.subtitle}
            </p>

            {/* Bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 w-full max-w-xl">
              {[t.check1, t.check2, t.check3, t.check4].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => onOpenEnrollModal()}
                className="inline-flex items-center justify-center gap-2.5 bg-brand-red hover:bg-brand-red-700 text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-red transition-all duration-300 hover:shadow-xl hover:shadow-brand-red/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t.enrollBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={scrollToCourses}
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-white font-bold text-base px-7 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:border-slate-300"
              >
                <span>{t.selectCourseBtn}</span>
              </button>
            </div>

            {/* Social Trust */}
            <div className="mt-8 flex items-center gap-3 pt-6 border-t border-slate-200/80 dark:border-slate-800 w-full">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-800 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Student" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-800 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Student" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-800 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" alt="Student" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-800 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" alt="Student" />
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-slate-900 dark:text-white ml-1">{t.ratingText}</span>
                </div>
                <span>{t.reviewsText}</span>
              </div>
            </div>

          </div>

          {/* Right Hero Image & Parallax Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 aspect-[4/5] sm:aspect-[4/4.5]">
                <img
                  src={centerInfo.heroImage}
                  alt="Учебный центр Inter-Academy"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                
                {/* Overlay Text in photo */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block bg-brand-red text-white text-xs font-black uppercase px-2.5 py-1 rounded-md mb-2">
                    Inter-Academy
                  </span>
                  <h3 className="text-lg font-bold">{t.campusTitle}</h3>
                  <p className="text-xs text-slate-200 mt-1">{t.campusDesc}</p>
                </div>
              </div>

              {/* Floating Badge 1: Top Rated Center (Parallax effect) */}
              <div
                className="absolute -top-4 -left-4 sm:-left-6 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 transition-transform duration-150 ease-out"
                style={{ transform: `translateY(${scrollY * -0.08}px)` }}
              >
                <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-brand-red">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-brand-red tracking-wider">{t.badgeRecognition}</div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">{t.badgeTopCenter}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{t.badgeAwards}</div>
                </div>
              </div>

              {/* Floating Badge 2: Success Metric (Parallax effect) */}
              <div
                className="absolute -bottom-6 -right-4 sm:-right-6 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 transition-transform duration-150 ease-out"
                style={{ transform: `translateY(${scrollY * 0.08}px)` }}
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">{t.badgeResultTitle}</div>
                  <div className="text-xl font-black text-slate-900 dark:text-white">{t.badgeGrantPct}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{t.badgeGrantDesc}</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Counter Ribbon */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 dark:border-slate-700">
          {[
            { val: tStats.stat1, label: tStats.stat1Label },
            { val: tStats.stat2, label: tStats.stat2Label },
            { val: tStats.stat3, label: tStats.stat3Label },
            { val: tStats.stat4, label: tStats.stat4Label },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center sm:items-start p-3 border-r last:border-r-0 border-slate-100 dark:border-slate-700">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-sans">
                <span className="text-brand-red">{stat.val.slice(0, 2)}</span>
                {stat.val.slice(2)}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1 text-center sm:text-left">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
