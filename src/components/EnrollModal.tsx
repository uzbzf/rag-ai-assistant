'use client';

import React, { useEffect, useState } from 'react';
import { X, Sparkles, CheckCircle2, User, PhoneCall, BookOpen, MapPin, Loader2, Send } from 'lucide-react';
import { coursesData, branchesData } from '@/data/mockData';
import { Language, translations } from '@/data/translations';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourse?: string;
  lang: Language;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({
  isOpen,
  onClose,
  preselectedCourse,
  lang,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(branchesData[0].id);
  const [format, setFormat] = useState<'group' | 'online'>('group');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const t = translations[lang].form;

  useEffect(() => {
    if (preselectedCourse) {
      const match = coursesData.find((c) => c.title.toLowerCase().includes(preselectedCourse.toLowerCase()));
      if (match) {
        setSelectedCourse(match.id);
      } else {
        setSelectedCourse(coursesData[0].id);
      }
    } else {
      setSelectedCourse(coursesData[0].id);
    }
  }, [preselectedCourse, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError(t.errorName);
      return;
    }
    if (!phone.trim() || phone.trim().length < 9) {
      setError(t.errorPhone);
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
          format: format === 'group' ? 'Групповое обучение (до 12 чел.)' : 'Онлайн с куратором',
          source: 'website-form',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Не удалось сохранить заявку в Google Таблицу.');
      } else {
        setIsSuccess(true);
      }
    } catch {
      setError('Ошибка соединения с сервером записи.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setName('');
    setPhone('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-slate-900 dark:bg-slate-800 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-800 dark:border-slate-700 z-10 overflow-hidden animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-5">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              {t.successTitle}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-6">
              {t.successDesc}
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-3 bg-brand-red hover:bg-brand-red-700 text-white font-bold text-xs rounded-xl shadow-red"
            >
              OK
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-slate-800 dark:border-slate-700 pb-3 pr-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-bold mb-2">
                <Sparkles className="w-3 h-3" />
                <span>{t.badge}</span>
              </div>
              <h3 className="text-xl font-black text-white">
                {t.formTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.formDesc}
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-200 text-xs font-semibold">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-brand-red" />
                <span>{t.nameField}</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-red"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-brand-red" />
                <span>{t.phoneField}</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.phonePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-red"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-brand-red" />
                <span>{t.courseField}</span>
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-red"
              >
                {coursesData.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-red" />
                <span>{t.branchField}</span>
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-red"
              >
                {branchesData.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                {t.formatField}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormat('group')}
                  className={`py-2 px-3 rounded-xl text-[11px] font-bold border transition-all ${
                    format === 'group'
                      ? 'bg-brand-red text-white border-brand-red'
                      : 'bg-slate-800 dark:bg-slate-900 text-slate-300 border-slate-700'
                  }`}
                >
                  {t.formatOffline}
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('online')}
                  className={`py-2 px-3 rounded-xl text-[11px] font-bold border transition-all ${
                    format === 'online'
                      ? 'bg-brand-red text-white border-brand-red'
                      : 'bg-slate-800 dark:bg-slate-900 text-slate-300 border-slate-700'
                  }`}
                >
                  {t.formatOnline}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-brand-red hover:bg-brand-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-red flex items-center justify-center gap-2 mt-4 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t.submittingBtn}</span>
                </>
              ) : (
                <>
                  <span>{t.submitBtn}</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
