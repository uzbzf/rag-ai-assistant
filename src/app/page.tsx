'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Courses } from '@/components/Courses';
import { Teachers } from '@/components/Teachers';
import { Results } from '@/components/Results';
import { EnrollmentForm } from '@/components/EnrollmentForm';
import { Geolocation } from '@/components/Geolocation';
import { Contacts } from '@/components/Contacts';
import { Footer } from '@/components/Footer';
import { EnrollModal } from '@/components/EnrollModal';
import { RagDocsModal } from '@/components/RagDocsModal';
import { AiAssistantWidget } from '@/components/AiAssistantWidget';
import { Language } from '@/data/translations';

export default function Home() {
  const [lang, setLang] = useState<Language>('ru');
  const [isDark, setIsDark] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCourse, setModalCourse] = useState<string | undefined>(undefined);
  const [docsModalOpen, setDocsModalOpen] = useState(false);

  // Sync theme with document class and localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang && ['ru', 'uz', 'en'].includes(savedLang)) {
      setLang(savedLang);
    }
  }, []);

  const handleToggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const handleOpenEnrollModal = (courseTitle?: string) => {
    setModalCourse(courseTitle);
    setModalOpen(true);
  };

  const handleCloseEnrollModal = () => {
    setModalOpen(false);
    setModalCourse(undefined);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col font-sans transition-colors duration-300">
      {/* Fixed Sticky Header Navigation */}
      <Navbar
        onOpenEnrollModal={handleOpenEnrollModal}
        onOpenDocsModal={() => setDocsModalOpen(true)}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Hero Section with Parallax Effect */}
      <Hero
        onOpenEnrollModal={handleOpenEnrollModal}
        lang={lang}
      />

      {/* About Us Section */}
      <About lang={lang} />

      {/* Courses Section (Math, English, CS) with RAG docs trigger */}
      <Courses
        onOpenEnrollModal={handleOpenEnrollModal}
        onOpenDocsModal={() => setDocsModalOpen(true)}
        lang={lang}
      />

      {/* Teachers Section */}
      <Teachers lang={lang} />

      {/* Best Student Results Section */}
      <Results lang={lang} />

      {/* Enrollment Form Section */}
      <EnrollmentForm lang={lang} />

      {/* Geolocation & Branches Section */}
      <Geolocation lang={lang} />

      {/* Contacts Section */}
      <Contacts lang={lang} />

      {/* Footer */}
      <Footer lang={lang} />

      {/* Global Quick Enrollment Modal */}
      <EnrollModal
        isOpen={modalOpen}
        onClose={handleCloseEnrollModal}
        preselectedCourse={modalCourse}
        lang={lang}
      />

      {/* RAG Knowledge Base Modal (Price List, FAQ, Schedule) */}
      <RagDocsModal
        isOpen={docsModalOpen}
        onClose={() => setDocsModalOpen(false)}
        lang={lang}
      />

      {/* AI Assistant Chat Widget (gemini-3.5-flash-lite + RAG) */}
      <AiAssistantWidget lang={lang} />
    </main>
  );
}
