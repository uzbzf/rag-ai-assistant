'use client';

import React, { useState } from 'react';
import { coursesData, branchesData } from '@/data/mockData';
import { Language, translations } from '@/data/translations';
import { 
  CheckCircle2, 
  Sparkles, 
  Gift, 
  Send, 
  PhoneCall, 
  User, 
  BookOpen, 
  MapPin, 
  Loader2, 
  ShieldCheck 
} from 'lucide-react';

interface EnrollmentFormProps {
  initialCourse?: string;
  onSuccess?: () => void;
  lang: Language;
}

export const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ initialCourse, onSuccess, lang }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(initialCourse || 'eng-ielts');
  const [selectedBranch, setSelectedBranch] = useState(branchesData[0].id);
  const [format, setFormat] = useState<'offline' | 'online'>('offline');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const t = translations[lang].form;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage(t.errorName);
      return;
    }
    if (!phone.trim() || phone.trim().length < 9) {
      setErrorMessage(t.errorPhone);
      return;
    }

    const courseObj = coursesData.find((c) => c.id === selectedCourse);
    const branchObj = branchesData.find((b) => b.id === selectedBranch);

    setIsLoading(true);
    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          course: courseObj?.title || selectedCourse,
          branch: branchObj?.name || selectedBranch,
          format: format === 'offline' ? 'Групповое обучение (до 12 чел.)' : 'Онлайн с куратором',
          source: 'website-form',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Не удалось сохранить заявку в Google Таблицу.');
      } else {
        setBookingId(data.booking?.id || '');
        setIsSubmitted(true);
        if (onSuccess) onSuccess();
      }
    } catch {
      setErrorMessage('Ошибка соединения с сервером записи.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setIsSubmitted(false);
    setErrorMessage('');
  };

  return (
    <section id="enroll" className="py-20 md:py-28 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
      {/* Decorative background shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-100/50 dark:bg-rose-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-red/10 dark:bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Special Offers */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-brand-red text-xs font-bold tracking-wider uppercase mb-4">
              <Gift className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {t.titleStart}
              <span className="text-brand-red">{t.titleHighlight}</span>
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              {t.desc}
            </p>

            {/* Bonus Box */}
            <div className="mt-8 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/80 border border-rose-100 dark:border-slate-700 rounded-3xl p-6 sm:p-7 shadow-sm">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-red" />
                <span>{t.bonusTitle}</span>
              </h3>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" />
                  <span>{t.bonus1}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" />
                  <span>{t.bonus2}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" />
                  <span>{t.bonus3}</span>
                </li>
              </ul>
            </div>

            {/* Quick Helpline */}
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-200">
                <PhoneCall className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{t.phoneLabel}</div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white">{t.callNow}</div>
              </div>
            </div>

          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 dark:bg-slate-800/90 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 dark:border-slate-700 relative">
              
              {isSubmitted ? (
                /* Success Confirmation State */
                <div className="py-10 text-center animate-fadeIn">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    {t.successTitle}
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
                    {t.successDesc}
                  </p>
                  
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-sm mx-auto mb-8 text-xs text-slate-300 text-left">
                    <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-red" />
                      <span>{t.successPromoTitle}</span>
                    </div>
                    <div className="text-brand-red font-mono font-black text-base">
                      {bookingId ? `${bookingId} • INTER-2025-GIFT` : 'INTER-2025-GIFT'}
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                  >
                    {t.resetBtn}
                  </button>
                </div>
              ) : (
                /* The Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-800 dark:border-slate-700 pb-4 mb-6">
                    <h3 className="text-2xl font-black text-white">
                      {t.formTitle}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {t.formDesc}
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-200 text-xs font-semibold">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-brand-red" />
                      <span>{t.nameField}</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-800/90 dark:bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-brand-red" />
                      <span>{t.phoneField}</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.phonePlaceholder}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-800/90 dark:bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                    />
                  </div>

                  {/* Course Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-brand-red" />
                        <span>{t.courseField}</span>
                      </label>
                      <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-800/90 dark:bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                      >
                        <optgroup label="Математика">
                          {coursesData.filter(c => c.category === 'math').map(c => (
                            <option key={c.id} value={c.id}>{c.title}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Английский язык">
                          {coursesData.filter(c => c.category === 'english').map(c => (
                            <option key={c.id} value={c.id}>{c.title}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Информатика & IT">
                          {coursesData.filter(c => c.category === 'cs').map(c => (
                            <option key={c.id} value={c.id}>{c.title}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    {/* Branch Selector */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-red" />
                        <span>{t.branchField}</span>
                      </label>
                      <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-800/90 dark:bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                      >
                        {branchesData.map((branch) => (
                          <option key={branch.id} value={branch.id}>
                            {branch.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Study Format Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      {t.formatField}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormat('offline')}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                          format === 'offline'
                            ? 'bg-brand-red text-white border-brand-red shadow-md'
                            : 'bg-slate-800 dark:bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {t.formatOffline}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormat('online')}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                          format === 'online'
                            ? 'bg-brand-red text-white border-brand-red shadow-md'
                            : 'bg-slate-800 dark:bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {t.formatOnline}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 rounded-2xl bg-brand-red hover:bg-brand-red-700 text-white font-black text-base shadow-red transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-60"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{t.submittingBtn}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.submitBtn}</span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Privacy guarantee */}
                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{t.privacy}</span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
