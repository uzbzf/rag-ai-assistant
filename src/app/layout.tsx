import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'INTER-ACADEMY | Образовательный центр подготовки к ВУЗам и экзаменам',
  description: 'Курсы по математике, английскому языку (IELTS) и информатике в Ташкенте. Преподаватели со стажем более 10 лет, современные аудитории и гарантия высоких результатов.',
  keywords: 'учебный центр, курсы математики, курсы английского, IELTS Ташкент, SAT Math, курсы программирования, Python, Inter-Nation',
  openGraph: {
    title: 'INTER-ACADEMY | Ведущий учебный центр',
    description: 'Интенсивные курсы по Математике, Английскому и IT с гарантией результата.',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
