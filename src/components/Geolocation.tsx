'use client';

import React, { useState } from 'react';
import { branchesData } from '@/data/mockData';
import { Language, translations } from '@/data/translations';
import { MapPin, Navigation, Phone, Clock } from 'lucide-react';

interface GeolocationProps {
  lang: Language;
}

export const Geolocation: React.FC<GeolocationProps> = ({ lang }) => {
  const [activeBranchId, setActiveBranchId] = useState(branchesData[0].id);

  const t = translations[lang].geo;
  const activeBranch = branchesData.find((b) => b.id === activeBranchId) || branchesData[0];

  return (
    <section id="geo" className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-brand-red text-xs font-bold tracking-wider uppercase mb-3">
            <MapPin className="w-3.5 h-3.5" />
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

        {/* Branch Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {branchesData.map((branch) => {
            const isActive = branch.id === activeBranchId;
            return (
              <button
                key={branch.id}
                onClick={() => setActiveBranchId(branch.id)}
                className={`px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-brand-red text-white shadow-red shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-brand-red hover:bg-rose-50/50 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <MapPin className={`w-4 h-4 ${isActive ? 'text-white' : 'text-brand-red'}`} />
                <span>{branch.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content Box with Details & Map */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Info Panel */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-red bg-rose-50 dark:bg-rose-950/40 px-3 py-1 rounded-md mb-3">
                  {t.campusInfoBadge}
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
                  {activeBranch.name}
                </h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-brand-red" />
                    </div>
                    <div>
                      <div className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                        {t.addressLabel}
                      </div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                        {activeBranch.address}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                        <Navigation className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                        <span>{activeBranch.landmark}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 flex-shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-brand-red" />
                    </div>
                    <div>
                      <div className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                        {t.hoursLabel}
                      </div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                        {activeBranch.hours}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {t.hoursNote}
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 flex-shrink-0 mt-0.5">
                      <Phone className="w-5 h-5 text-brand-red" />
                    </div>
                    <div>
                      <div className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                        {t.phoneLabel}
                      </div>
                      <a
                        href={`tel:${activeBranch.phone.replace(/[^0-9+]/g, '')}`}
                        className="text-base font-extrabold text-brand-red hover:underline mt-0.5 block"
                      >
                        {activeBranch.phone}
                      </a>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {t.phoneNote}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${activeBranch.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 py-3.5 px-4 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.callBranchBtn}</span>
                </a>
                <a
                  href={`https://yandex.ru/maps/?text=${encodeURIComponent(activeBranch.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-4 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-brand-red rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{t.routeBtn}</span>
                </a>
              </div>

            </div>

            {/* Right Map View */}
            <div className="lg:col-span-7 h-[400px] lg:h-[480px] bg-slate-200 dark:bg-slate-800 relative">
              <iframe
                title={activeBranch.name}
                src={activeBranch.mapEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3.5 py-2 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-ping" />
                <span>{activeBranch.name}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
