'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, GraduationCap, ChevronRight, Sun, Moon, Globe, BookOpen } from 'lucide-react';
import { centerInfo } from '@/data/mockData';
import { Language, translations } from '@/data/translations';

interface NavbarProps {
  onOpenEnrollModal: (courseTitle?: string) => void;
  onOpenDocsModal: () => void;
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEnrollModal,
  onOpenDocsModal,
  lang,
  onLanguageChange,
  isDark,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.about, href: '#about' },
    { name: t.courses, href: '#courses' },
    { name: t.teachers, href: '#teachers' },
    { name: t.results, href: '#results' },
    { name: t.geo, href: '#geo' },
    { name: t.contacts, href: '#contacts' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100 dark:border-slate-800'
          : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-4.5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center text-white shadow-md shadow-brand-red/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-sans">
                  INTER
                </span>
                <span className="bg-brand-red text-white text-xs font-bold px-1.5 py-0.5 rounded">
                  ACADEMY
                </span>
              </div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                Education Center
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-red dark:hover:text-brand-red transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-red hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}

            {/* RAG Knowledge base pill */}
            <button
              onClick={onOpenDocsModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-slate-800 text-brand-red dark:text-rose-300 text-xs font-bold hover:bg-rose-100 dark:hover:bg-slate-700 transition-colors border border-rose-200/60 dark:border-slate-700"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.docs}</span>
            </button>
          </nav>

          {/* Actions & Switches */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 text-xs font-extrabold uppercase"
                aria-label="Сменить язык"
              >
                <Globe className="w-3.5 h-3.5 text-brand-red" />
                <span>{lang}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden py-1 z-50">
                  {(['ru', 'uz', 'en'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        onLanguageChange(l);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-xs font-bold flex items-center justify-between transition-colors ${
                        lang === l
                          ? 'bg-rose-50 dark:bg-slate-800 text-brand-red'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{l === 'ru' ? 'Русский' : l === 'uz' ? 'O‘zbekcha' : 'English'}</span>
                      <span className="uppercase text-[10px] text-slate-400 font-semibold">{l}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              aria-label="Переключить тему"
              title={isDark ? 'Включить светлую тему' : 'Включить темную тему'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Direct Phone Call */}
            <a
              href={`tel:${centerInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="hidden md:flex items-center gap-2 text-slate-800 dark:text-slate-200 hover:text-brand-red dark:hover:text-brand-red transition-colors text-xs font-bold"
            >
              <div className="w-7 h-7 rounded-full bg-rose-50 dark:bg-slate-800 flex items-center justify-center text-brand-red">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="hidden lg:inline">{centerInfo.phone}</span>
            </a>

            {/* Primary CTA */}
            <button
              onClick={() => onOpenEnrollModal()}
              className="relative group overflow-hidden bg-brand-red hover:bg-brand-red-700 text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 rounded-xl shadow-red transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                {t.enrollBtn}
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-brand-red hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[68px] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl p-6 transition-all duration-300 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-base font-semibold text-slate-800 dark:text-slate-100 hover:text-brand-red py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDocsModal();
              }}
              className="py-3 px-4 rounded-xl bg-rose-50 dark:bg-slate-800 text-brand-red dark:text-rose-300 text-sm font-bold flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {t.docs}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="pt-3 flex flex-col gap-3">
              <a
                href={`tel:${centerInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-800 dark:text-slate-200 text-sm"
              >
                <Phone className="w-4 h-4 text-brand-red" />
                <span>{centerInfo.phone}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnrollModal();
                }}
                className="w-full py-3.5 bg-brand-red text-white font-bold text-sm rounded-xl shadow-red flex items-center justify-center gap-2"
              >
                <span>{t.enrollBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
