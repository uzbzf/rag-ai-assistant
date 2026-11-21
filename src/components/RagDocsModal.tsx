'use client';

import React, { useState } from 'react';
import { X, FileText, HelpCircle, Calendar, Sparkles, Download, Check, ShieldCheck, CreditCard, Clock } from 'lucide-react';
import { Language, translations } from '@/data/translations';

interface RagDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const RagDocsModal: React.FC<RagDocsModalProps> = ({ isOpen, onClose, lang }) => {
  const [activeTab, setActiveTab] = useState<'price' | 'faq' | 'schedule'>('price');
  const [copied, setCopied] = useState(false);

  const t = translations[lang].docsModal;

  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 z-10 overflow-hidden animate-fadeIn">
        
        {/* Top Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/50">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/50 text-brand-red text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RAG Knowledge Base</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {t.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-950 px-6 gap-2 pt-3">
          <button
            onClick={() => setActiveTab('price')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'price'
                ? 'border-brand-red text-brand-red bg-white dark:bg-slate-900 rounded-t-xl shadow-sm'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t.tabPrice}</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'faq'
                ? 'border-brand-red text-brand-red bg-white dark:bg-slate-900 rounded-t-xl shadow-sm'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{t.tabFaq}</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'schedule'
                ? 'border-brand-red text-brand-red bg-white dark:bg-slate-900 rounded-t-xl shadow-sm'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{t.tabSchedule}</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700 dark:text-slate-300">
          
          {/* TAB 1: PRICE LIST */}
          {activeTab === 'price' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                  <strong className="text-brand-red">Пометка о рассрочке:</strong> Для курсов от 4 000 000 сум доступна беспроцентная рассрочка 0-0-6 и 0-0-12 через Uzum Nasiya, Anorbank, Zoodpay или внутренняя помесячная оплата без переплат.
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold uppercase">
                    <tr>
                      <th className="p-3.5 border-b border-slate-200 dark:border-slate-700">№</th>
                      <th className="p-3.5 border-b border-slate-200 dark:border-slate-700">Курс</th>
                      <th className="p-3.5 border-b border-slate-200 dark:border-slate-700">Длительность</th>
                      <th className="p-3.5 border-b border-slate-200 dark:border-slate-700">В месяц (UZS)</th>
                      <th className="p-3.5 border-b border-slate-200 dark:border-slate-700">Рассрочка / Опции</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold">1</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">IELTS Intensive 7.5+</td>
                      <td className="p-3">4 мес (4 раза/нед + Mock)</td>
                      <td className="p-3 font-extrabold text-brand-red">1 100 000 сум</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded font-semibold text-[11px]">Рассрочка 0-0-6</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold">2</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">General English (A1-C1)</td>
                      <td className="p-3">от 3 мес / уровень</td>
                      <td className="p-3 font-extrabold text-brand-red">750 000 сум</td>
                      <td className="p-3">Скидка 10% за весь уровень</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold">3</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">English for Kids & Teens</td>
                      <td className="p-3">9 месяцев (3 р/нед)</td>
                      <td className="p-3 font-extrabold text-brand-red">700 000 сум</td>
                      <td className="p-3">Cambridge книги включены</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold">4</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">IELTS Sprint (Экспресс)</td>
                      <td className="p-3">6 недель (будни)</td>
                      <td className="p-3 font-extrabold text-brand-red">1 800 000 сум</td>
                      <td className="p-3">Рассрочка на 2 платежа (50/50)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold">5</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">SAT Math 800 Prep</td>
                      <td className="p-3">4 месяца (2 р/нед)</td>
                      <td className="p-3 font-extrabold text-brand-red">1 200 000 сум</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded font-semibold text-[11px]">Рассрочка 0-0-4 / 0-0-6</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold">6</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">Подготовка к ВУЗам (ЕГЭ / ДТМ)</td>
                      <td className="p-3">9 месяцев (3 р/нед)</td>
                      <td className="p-3 font-extrabold text-brand-red">950 000 сум</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded font-semibold text-[11px]">Рассрочка 0-0-9</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold">7</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">Олимпиадная математика & Логика</td>
                      <td className="p-3">9 месяцев (3 р/нед)</td>
                      <td className="p-3 font-extrabold text-brand-red">850 000 сум</td>
                      <td className="p-3">Регистрация на IMO/SASMO</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold">8</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">Python Pro: Backend & AI</td>
                      <td className="p-3">6 месяцев (3 р/нед)</td>
                      <td className="p-3 font-extrabold text-brand-red">1 150 000 сум</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded font-semibold text-[11px]">Рассрочка 0-0-12</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold">9</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">Frontend Web Dev (React/Next)</td>
                      <td className="p-3">5 месяцев (3 р/нед)</td>
                      <td className="p-3 font-extrabold text-brand-red">1 050 000 сум</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded font-semibold text-[11px]">Рассрочка 0-0-6 / 0-0-12</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold">10</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">Олимпиадное программирование C++</td>
                      <td className="p-3">8 месяцев (3 р/нед)</td>
                      <td className="p-3 font-extrabold text-brand-red">1 250 000 сум</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded font-semibold text-[11px]">Рассрочка до 12 мес</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold">11</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">Data Science & SQL Analytics</td>
                      <td className="p-3">4 месяца (3 р/нед)</td>
                      <td className="p-3 font-extrabold text-brand-red">1 300 000 сум</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded font-semibold text-[11px]">Рассрочка 0-0-6</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold">12</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">IT-Старт для школьников</td>
                      <td className="p-3">4 месяца (2 р/нед)</td>
                      <td className="p-3 font-extrabold text-brand-red">650 000 сум</td>
                      <td className="p-3">Помесячная оплата</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              {[
                {
                  q: '1. Как записаться на обучение и нужно ли бронировать место заранее?',
                  a: 'Записаться можно на сайте через форму, по номеру +998 (71) 200-55-44 или в Telegram @inter_academy_bot. Перед стартом каждый студент проходит бесплатное входное тестирование (30-45 минут). Группы формируются строго до 10 человек, поэтому рекомендуем бронировать место за 3-7 дней.'
                },
                {
                  q: '2. Какие способы оплаты вы принимаете и есть ли рассрочка?',
                  a: 'Принимаются Payme, Click, Uzum Bank, пластиковые карты (Uzcard, Humo, Visa, Mastercard) и безналичный расчет для юридических лиц. На все комплексные курсы действует беспроцентная банковская рассрочка 0-0-6 и 0-0-12 (Uzum Nasiya, Anorbank).'
                },
                {
                  q: '3. Что происходит при пропуске занятия? Можно ли отменить или перенести урок?',
                  a: 'Абонемент можно заморозить на срок до 14 дней по справке или предупреждению за 24 часа. Пропущенную тему можно отработать в параллельной группе, получить консультацию куратора (20-30 мин) или просмотреть запись урока в личном кабинете.'
                },
                {
                  q: '4. Предоставляете ли вы гарантию результата и как подтверждается качество?',
                  a: 'На флагманских курсах (IELTS, SAT, ВУЗы) гарантия прописана в договоре: при посещаемости от 95% и выполнении 90% ДЗ мы гарантируем достижение целевого балла. Если балл не набран — центр предоставляет бесплатный повторный курс.'
                },
                {
                  q: '5. Что нужно взять с собой на первое занятие и как подготовиться?',
                  a: 'Тетрадь, ручку и документ для оформления пропуска. Все учебные пособия и материалы центр предоставляет бесплатно. Для IT-курсов классы оборудованы мощными ПК, но можно приносить и собственный ноутбук.'
                },
                {
                  q: '6. С какого возраста принимаются ученики и как формируются группы?',
                  a: 'Принимаем детей от 7 лет, подростков и взрослых. Группы формируются строго с учетом возраста и входного тестирования — взрослые и дети никогда не занимаются вместе.'
                },
                {
                  q: '7. Проводятся ли пробные экзамены (Mock Exams) и как отслеживать прогресс?',
                  a: 'Каждую субботу проводятся бесплатные полноформатные Mock-экзамены по стандартам IELTS и SAT. Родители получают доступ к цифровому журналу и ежемесячные отчеты куратора.'
                },
                {
                  q: '8. Можно ли совмещать офлайн и онлайн форматы или сменить филиал?',
                  a: 'Да, в центре действует гибридная модель: при отъезде можно подключиться онлайн через Zoom, а при смене места жительства — бесплатно перевестись в другой наш филиал.'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5 flex items-start gap-2">
                    <span className="text-brand-red font-black">Q:</span>
                    <span>{item.q}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-5">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Teacher 1 */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Азиз Каримов (Математика / SAT)</h4>
                  </div>
                  <div className="text-xs text-slate-500 mb-2">Центральный кампус (ауд. 402) / Чиланзар</div>
                  <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                    <li><strong>Пн / Ср / Пт:</strong> 09:00–11:00 (SAT Math), 15:30–17:30 (ВУЗы 90+), 18:00–20:00 (Олимпиады)</li>
                    <li><strong>Вт / Чт (Чиланзар):</strong> 16:00–18:00 (Лицеи), 18:30–20:00 (5-7 классы)</li>
                    <li><strong>Суббота:</strong> 10:00–13:00 (Mock SAT Math & Входные тесты)</li>
                    <li><strong>Воскресенье:</strong> Выходной день</li>
                  </ul>
                </div>

                {/* Teacher 2 */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Сара Дженкинс (IELTS / English)</h4>
                  </div>
                  <div className="text-xs text-slate-500 mb-2">Центральный кампус (ауд. 405) / Юнусабад</div>
                  <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                    <li><strong>Пн / Ср / Пт:</strong> 09:30–11:00 (IELTS Morning), 14:30–16:00 (Writing Task 2), 16:30–18:00 (Intensive), 18:30–20:00 (Evening)</li>
                    <li><strong>Вт / Чт (Юнусабад):</strong> 15:00–16:30 (C1 Advanced), 17:00–18:30 (Speaking Bootcamp), 19:00–20:30 (Debate Club)</li>
                    <li><strong>Суббота:</strong> 09:30–13:00 (Mock IELTS 1-on-1 Interview), 14:00–15:30 (Open Speaking Club)</li>
                    <li><strong>Воскресенье:</strong> Выходной день</li>
                  </ul>
                </div>

                {/* Teacher 3 */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Фаррух Рахимов (Python & Backend)</h4>
                  </div>
                  <div className="text-xs text-slate-500 mb-2">IT-лаборатория (ауд. 410) / Чиланзар</div>
                  <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                    <li><strong>Вт / Чт / Сб:</strong> 10:00–12:00 (Python с нуля), 15:00–17:00 (PostgreSQL & FastAPI), 17:30–19:30 (Telegram боты)</li>
                    <li><strong>Пн / Ср (Чиланзар):</strong> 16:00–18:00 (IT-Старт), 18:30–20:30 (Frontend React)</li>
                    <li><strong>Пятница:</strong> 16:00–19:00 (Хакатон-клуб и GitHub код-ревью)</li>
                    <li><strong>Воскресенье:</strong> Выходной день</li>
                  </ul>
                </div>

                {/* Teacher 4 */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Елена Смирнова (C++ & Алгоритмы)</h4>
                  </div>
                  <div className="text-xs text-slate-500 mb-2">Кампус «Юнусабад» (ауд. 308) / Центр</div>
                  <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                    <li><strong>Пн / Ср / Пт:</strong> 15:00–17:00 (Алгоритмы и STL C++), 17:30–19:30 (ДП и Графы), 19:30–20:30 (Codeforces разбор)</li>
                    <li><strong>Вт / Чт (Центр):</strong> 16:30–18:30 (Подготовка к Республиканским олимпиадам), 18:45–20:15 (Индивидуальные сессии)</li>
                    <li><strong>Суббота:</strong> 14:00–18:00 (Тренировочный 4-часовой контест IOI/ICPC)</li>
                    <li><strong>Воскресенье:</strong> Выходной день</li>
                  </ul>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{t.downloadNote}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard(window.location.origin + '/rag-docs/price_list.md')}
              className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Download className="w-3.5 h-3.5" />}
              <span>{copied ? 'Скопировано!' : 'Скопировать ссылку'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-brand-red text-white font-bold hover:bg-brand-red-700 transition-colors shadow-red"
            >
              {t.closeBtn}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
