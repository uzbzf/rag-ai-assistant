'use client';

import React from 'react';
import { centerInfo } from '@/data/mockData';
import { Language, translations } from '@/data/translations';
import { GraduationCap, ArrowUp, Send, Video } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center text-white shadow-md shadow-brand-red/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                    INTER
                  </span>
                  <span className="bg-brand-red text-white text-xs font-bold px-1.5 py-0.5 rounded">
                    ACADEMY
                  </span>
                </div>
                <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Education Center
                </span>
              </div>
            </a>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-6">
              {t.desc}
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://t.me/inter_nation_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-brand-red text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-brand-red text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-brand-red text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Col 1: Курсы */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">
              {t.coursesCol}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#courses" className="hover:text-white transition-colors">IELTS Intensive 7.5+</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">SAT Math 800 Prep</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Python Pro Backend & AI</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Frontend Web Development</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Олимпиадная математика</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">C++ & Алгоритмы</a></li>
            </ul>
          </div>

          {/* Navigation Col 2: Центр */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">
              {t.aboutCol}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#about" className="hover:text-white transition-colors">О нас и миссия</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Инфраструктура кампусов</a></li>
              <li><a href="#teachers" className="hover:text-white transition-colors">Наши преподаватели</a></li>
              <li><a href="#results" className="hover:text-white transition-colors">Результаты выпускников</a></li>
              <li><a href="#geo" className="hover:text-white transition-colors">Филиалы на карте</a></li>
              <li><a href="#contacts" className="hover:text-white transition-colors">Контакты и вакансии</a></li>
            </ul>
          </div>

          {/* Navigation Col 3: Контакты */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">
              {t.contactsCol}
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div>
                <span className="block text-[11px] text-slate-500 uppercase">Телефон</span>
                <span className="font-bold text-white text-sm">{centerInfo.phone}</span>
              </div>
              <div>
                <span className="block text-[11px] text-slate-500 uppercase">Почта</span>
                <span className="font-bold text-white">{centerInfo.email}</span>
              </div>
              <div>
                <span className="block text-[11px] text-slate-500 uppercase">Адрес</span>
                <span>Центральный кампус, БЦ «Пойтахт»</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {t.copyright}
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <span>{t.toTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
