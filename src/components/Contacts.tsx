'use client';

import React from 'react';
import { centerInfo } from '@/data/mockData';
import { Language, translations } from '@/data/translations';
import { 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  Headphones,
  Video
} from 'lucide-react';

interface ContactsProps {
  lang: Language;
}

export const Contacts: React.FC<ContactsProps> = ({ lang }) => {
  const t = translations[lang].contacts;

  return (
    <section id="contacts" className="py-20 md:py-28 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-brand-red text-xs font-bold tracking-wider uppercase mb-3">
            <Headphones className="w-3.5 h-3.5" />
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

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Box 1: Hotlines */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-7 border border-slate-200/80 dark:border-slate-700 hover:border-brand-red/40 transition-all hover:shadow-cardHover">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-brand-red mb-5">
              <Phone className="w-6 h-6" />
            </div>
            <div className="text-xs uppercase text-slate-400 font-bold tracking-wider">{t.hotlineBadge}</div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1 mb-2">{t.hotlineTitle}</h3>
            <div className="space-y-1">
              <a href={`tel:${centerInfo.phone.replace(/[^0-9+]/g, '')}`} className="block text-sm font-extrabold text-brand-red hover:underline">
                {centerInfo.phone}
              </a>
              <a href={`tel:${centerInfo.secondaryPhone.replace(/[^0-9+]/g, '')}`} className="block text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-red">
                {centerInfo.secondaryPhone}
              </a>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">{t.hotlineNote}</p>
          </div>

          {/* Box 2: Messengers & Socials */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-7 border border-slate-200/80 dark:border-slate-700 hover:border-brand-red/40 transition-all hover:shadow-cardHover">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-brand-red mb-5">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="text-xs uppercase text-slate-400 font-bold tracking-wider">{t.socialsBadge}</div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1 mb-2">{t.socialsTitle}</h3>
            <div className="space-y-2">
              <a
                href="https://t.me/inter_nation_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram: @inter_academy_bot</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram: @inter_academy_uz</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
              >
                <Video className="w-3.5 h-3.5" />
                <span>YouTube: InterAcademy Education</span>
              </a>
            </div>
          </div>

          {/* Box 3: Email */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-7 border border-slate-200/80 dark:border-slate-700 hover:border-brand-red/40 transition-all hover:shadow-cardHover">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-brand-red mb-5">
              <Mail className="w-6 h-6" />
            </div>
            <div className="text-xs uppercase text-slate-400 font-bold tracking-wider">{t.emailBadge}</div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1 mb-2">{t.emailTitle}</h3>
            <a href={`mailto:${centerInfo.email}`} className="text-sm font-bold text-brand-red hover:underline block">
              {centerInfo.email}
            </a>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              {t.emailDesc}
            </div>
          </div>

          {/* Box 4: Working Hours */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-7 border border-slate-200/80 dark:border-slate-700 hover:border-brand-red/40 transition-all hover:shadow-cardHover">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-brand-red mb-5">
              <Clock className="w-6 h-6" />
            </div>
            <div className="text-xs uppercase text-slate-400 font-bold tracking-wider">{t.hoursBadge}</div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1 mb-2">{t.hoursTitle}</h3>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
              {centerInfo.workHours}
            </p>
            <div className="mt-3 inline-block px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold rounded-lg">
              {t.coworkingBadge}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
