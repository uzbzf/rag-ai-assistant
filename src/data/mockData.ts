export interface Course {
  id: string;
  category: 'math' | 'english' | 'cs';
  title: string;
  badge: string;
  description: string;
  duration: string;
  lessonsPerWeek: string;
  level: string;
  format: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  category: 'math' | 'english' | 'cs';
  photo: string;
  experienceYears: number;
  credentials: string[];
  achievements: string;
  studentResults: string;
}

export interface StudentResult {
  id: string;
  name: string;
  photo: string;
  course: string;
  score: string;
  achievement: string;
  university: string;
  feedback: string;
  badge: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  landmark: string;
  phone: string;
  hours: string;
  mapEmbedUrl: string;
}

export interface Facility {
  title: string;
  desc: string;
  image: string;
}

export const centerInfo = {
  name: "INTER-ACADEMY",
  slogan: "Ведущий образовательный центр подготовки к топовым ВУЗам и экзаменам",
  description: "Мы готовим будущих лидеров, олимпиадников и студентов престижных мировых университетов. Современная методика, международные стандарты и нацеленность на 100% результат.",
  heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  secondaryImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
  phone: "+998 (71) 200-55-44",
  secondaryPhone: "+998 (90) 123-45-67",
  email: "info@inter-academy.uz",
  workHours: "Пн — Сб: 08:30 — 21:00, Вс: 09:00 — 18:00",
  stats: [
    { value: "14 500+", label: "Выпускников центра" },
    { value: "96.4%", label: "Поступление на грант и бюджет" },
    { value: "8.0+", label: "Средний балл IELTS выпускников" },
    { value: "10 лет", label: "Успешной работы на рынке" },
  ]
};

export const coursesData: Course[] = [
  {
    id: "math-olympiad",
    category: "math",
    title: "Олимпиадная математика & Логика",
    badge: "Для 5–9 классов",
    description: "Развитие нестандартного мышления, подготовка к городским, республиканским и международным олимпиадам (IMO, Kangaroo).",
    duration: "9 месяцев",
    lessonsPerWeek: "3 урока по 90 мин",
    level: "Продвинутый",
    format: "Офлайн в малых группах (до 8 чел)",
    price: "850 000 сум / мес",
    features: [
      "Разбор олимпиадных задач прошлых лет",
      "Теория чисел, комбинаторика и геометрия",
      "Ежемесячные олимпиадные симуляции",
      "Персональный разбор ошибок с ментором"
    ]
  },
  {
    id: "math-exams",
    category: "math",
    title: "Подготовка к ЕГЭ, ОГЭ и Лицеям",
    badge: "Хит поступления",
    popular: true,
    description: "Интенсивная программа с гарантией высокого балла для поступления в академические лицеи и ВУЗы (МГУ, ВШЭ, филиалы в Ташкенте).",
    duration: "10 месяцев",
    lessonsPerWeek: "3 урока по 120 мин",
    level: "Базовый → Профиль 90+",
    format: "Офлайн / Онлайн",
    price: "950 000 сум / мес",
    features: [
      "Полный охват всех тем кодификатора",
      "Авторские методички и схемы быстрого счета",
      "Еженедельные пробные тестирования в формате реального экзамена",
      "Психологическая подготовка к стрессу на экзамене"
    ]
  },
  {
    id: "math-sat",
    category: "math",
    title: "SAT Math 800 Prep",
    badge: "Международный стандарт",
    description: "Подготовка к математической секции Digital SAT на английском языке для поступления в ВУЗы США, Европы и Азии.",
    duration: "4 месяца",
    lessonsPerWeek: "2 урока по 120 мин",
    level: "Уверенный английский + алгебра",
    format: "Офлайн / Онлайн",
    price: "1 200 000 сум / мес",
    features: [
      "Изучение математической терминологии на английском",
      "Тактики решения задач через Desmos калькулятор",
      "12 полных официальных мок-тестов Bluebook",
      "Гарантия результата 750+ баллов"
    ]
  },
  {
    id: "eng-ielts",
    category: "english",
    title: "IELTS Intensive 7.5+",
    badge: "Флагманский курс",
    popular: true,
    description: "Система Inter-Nation подготовки к IELTS с носителями языка и сертифицированными тренерами CELTA/DELTA.",
    duration: "3–6 месяцев",
    lessonsPerWeek: "4 урока по 90 мин",
    level: "B1 → C1",
    format: "Офлайн / Онлайн",
    price: "1 100 000 сум / мес",
    features: [
      "Проверка Writing от экспертов-экзаменаторов",
      "Ежедневные Speaking Sessions с носителями",
      "Каждую субботу — бесплатный Mock Exam",
      "Доступ к премиум-библиотеке и коворкингу 24/7"
    ]
  },
  {
    id: "eng-general",
    category: "english",
    title: "General English (Starter to Advanced)",
    badge: "Все уровни",
    description: "Комплексное погружение в живой английский язык: преодоление языкового барьера, грамматика в контексте и богатый словарный запас.",
    duration: "от 3 месяцев / уровень",
    lessonsPerWeek: "3 урока по 90 мин",
    level: "A1 – C1",
    format: "Офлайн / Онлайн",
    price: "750 000 сум / мес",
    features: [
      "Коммуникативная методика без скучной зубрежки",
      "Разговорные клубы, кино-вечера и дебаты",
      "Мобильное приложение для закрепления лексики",
      "Международный сертификат по окончании уровня"
    ]
  },
  {
    id: "eng-kids",
    category: "english",
    title: "English for Kids & Teens",
    badge: "Для школьников 7–14 лет",
    description: "Увлекательный английский через интерактивные проекты, игры и развитие навыков 21 века (критическое мышление, презентации).",
    duration: "Учебный год",
    lessonsPerWeek: "3 урока по 80 мин",
    level: "Начальный / Средний",
    format: "Офлайн в интерактивных классах",
    price: "700 000 сум / мес",
    features: [
      "Геймифицированное обучение с подарками за успехи",
      "Подготовка к Cambridge Young Learners (Starters, Movers, Flyers)",
      "Отчет родителям каждые 2 недели",
      "Дружелюбные и внимательные педагоги"
    ]
  },
  {
    id: "cs-python",
    category: "cs",
    title: "Python Pro: от Основ до Backend & AI",
    badge: "Хит IT",
    popular: true,
    description: "Практический курс программирования на самом востребованном языке мира: алгоритмы, ООП, создание ботов, парсинг данных и веб-сервисов.",
    duration: "6 месяцев",
    lessonsPerWeek: "3 урока по 120 мин",
    level: "С нуля до Junior",
    format: "Офлайн в компьютерном классе / Онлайн",
    price: "1 150 000 сум / мес",
    features: [
      "Портфолио из 5 реальных коммерческих проектов на GitHub",
      "Основы баз данных SQL, Django / FastAPI, Telegram API",
      "Введение в Machine Learning и работу с LLM",
      "Помощь с резюме и подготовка к собеседованию"
    ]
  },
  {
    id: "cs-frontend",
    category: "cs",
    title: "Frontend Web Development (HTML/CSS, JS, React)",
    badge: "Быстрый старт",
    description: "Создание красивых, интерактивных веб-сайтов и приложений с нуля. Современные технологии, верстка и реактивность.",
    duration: "5 месяцев",
    lessonsPerWeek: "3 урока по 120 мин",
    level: "С нуля",
    format: "Офлайн / Онлайн",
    price: "1 050 000 сум / мес",
    features: [
      "Адаптивная верстка, анимации, Tailwind CSS",
      "Глубокий JavaScript ES6+, работа с REST API",
      "Разработка SPA-приложений на React & Next.js",
      "Дипломный проект с реальным заказчиком"
    ]
  },
  {
    id: "cs-olympiad",
    category: "cs",
    title: "Олимпиадное программирование & C++",
    badge: "Для побед в олимпиадах",
    description: "Подготовка к Всероссийским, Республиканским олимпиадам по информатике и отборам в мировые IT-вузы (Inha, ITMO, ШАД).",
    duration: "8 месяцев",
    lessonsPerWeek: "3 урока по 120 мин",
    level: "Базовые знания кода обязательны",
    format: "Офлайн / Онлайн",
    price: "1 250 000 сум / мес",
    features: [
      "Сложные алгоритмы и структуры данных (деревья, графы, ДП)",
      "Решение 500+ задач на Codeforces и LeetCode",
      "Тренировки по регламенту ICPC и IOI",
      "Прямое наставничество от призеров олимпиад"
    ]
  }
];

export const teachersData: Teacher[] = [
  {
    id: "t-1",
    name: "Азиз Каримов",
    role: "Главный ментор по математике и SAT Math",
    category: "math",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    experienceYears: 12,
    credentials: [
      "Магистр механико-математического факультета МГУ",
      "Победитель Республиканской олимпиады по математике",
      "Сертификат SAT Math Subject Test: 800/800"
    ],
    achievements: "Подготовил более 450 учеников с результатом ЕГЭ 90+ и SAT Math 760+. 94% его выпускников поступили на бюджетные гранты.",
    studentResults: "Рекорд подопечных: 18 стобалльников по профильной математике в 2024 году."
  },
  {
    id: "t-2",
    name: "Сара Дженкинс",
    role: "Lead IELTS & Academic English Trainer",
    category: "english",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    experienceYears: 11,
    credentials: [
      "Native speaker (Великобритания / Манчестер)",
      "Cambridge CELTA & DELTA дипломы высшей категории",
      "Бывший официальный экзаменатор устной части IELTS"
    ],
    achievements: "Обучила свыше 1 200 студентов. Её методика скоростного написания эссе Task 2 признана лучшей в сети наших центров.",
    studentResults: "Более 85 учеников сдали экзамен на балл 8.0 и 8.5 в 2023–2024 годах."
  },
  {
    id: "t-3",
    name: "Фаррух Рахимов",
    role: "Senior Software Engineer & Ментор по Python",
    category: "cs",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    experienceYears: 9,
    credentials: [
      "Выпускник Inha University in Tashkent (Computer Science)",
      "Senior Backend Архитектор в финтех-компании",
      "Top-rated ментор на IT-платформах"
    ],
    achievements: "Автор практического курса по микросервисам и телеграм-ботам. 78% его выпускников трудоустроились джуниор-разработчиками в течение 3 месяцев.",
    studentResults: "Его подопечные разработали 23 коммерческих проекта и выиграли 3 республиканских хакатона."
  },
  {
    id: "t-4",
    name: "Елена Смирнова",
    role: "Преподаватель олимпиадного программирования & C++",
    category: "cs",
    photo: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80",
    experienceYears: 8,
    credentials: [
      "Призер полуфинала ICPC Northern Eurasia",
      "Кандидат физико-математических наук",
      "Эксперт жюри олимпиад по алгоритмическому кодингу"
    ],
    achievements: "Разработала уникальный тренажер структур данных, сокращающий время решения задач на 40%.",
    studentResults: "14 призеров всероссийских олимпиад и поступления учеников в ИТМО, МФТИ и Innopolis."
  }
];

export const resultsData: StudentResult[] = [
  {
    id: "res-1",
    name: "Шахзод Умаров",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80",
    course: "IELTS Intensive 7.5+",
    score: "IELTS 8.5",
    achievement: "Listening: 9.0, Reading: 9.0, Writing: 8.0, Speaking: 8.0",
    university: "Поступил в University of Toronto с полным грантом $45,000",
    feedback: "«Пришел с уровнем 6.0 за 4 месяца до дедлайна. Благодаря Саре и еженедельным субботним мок-тестам я перестал бояться Speaking и научился писать Task 2 на максимум!»",
    badge: "Топ результат года"
  },
  {
    id: "res-2",
    name: "Малика Абдуллаева",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
    course: "SAT Math 800 Prep & Математика",
    score: "SAT 1550 (Math 800)",
    achievement: "Абсолютный максимум по математике и 750 по вербальной части",
    university: "Приглашена в NYU Abu Dhabi (Full Ride Scholarship)",
    feedback: "«Азиз Каримов научил меня не просто формулам, а глубокому видению структуры задач. Разбор на калькуляторе Desmos сэкономил мне 15 минут на реальном экзамене!»",
    badge: "100% грант"
  },
  {
    id: "res-3",
    name: "Жавохир Рустамов",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    course: "Python Pro & Алгоритмы",
    score: "Junior Python Dev",
    achievement: "Создал платформу автоматизации заказов, победитель хакатона AI 2024",
    university: "Поступил в Inha University (Computer Science) на 100% грант",
    feedback: "«Учился с нуля! Фаррух объяснял даже сложнейшие алгоритмы на понятных жизненных примерах. Через 5 месяцев я написал свой первый работающий стартап.»",
    badge: "IT Прорыв"
  },
  {
    id: "res-4",
    name: "Диана Ким",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    course: "Олимпиадная математика",
    score: "Золотая медаль",
    achievement: "1 место на Международной Жаутыковской олимпиаде по математике",
    university: "Победитель олимпиадного отбора в МФТИ",
    feedback: "«Атмосфера в центре заряжает на победы! Здесь я нашла друзей-единомышленников и наставника, который верил в меня даже в самые сложные моменты подготовки.»",
    badge: "Международный призер"
  }
];

export const facilitiesData: Facility[] = [
  {
    title: "Интерактивные смарт-аудитории",
    desc: "Каждый класс оборудован сенсорными экранами 4K, системой климат-контроля и эргономичными партами.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "IT-лаборатория с мощными ПК",
    desc: "Высокоскоростной интернет, лицензионный софт, графические станции и стенды для тестирования кода.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Коворкинг и библиотека 24/7",
    desc: "Уютное тихое пространство для самоподготовки, тысячи оригинальных учебников Cambridge и уютные пуфы.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Лаунж-зона & Coffee Point",
    desc: "Зона отдыха, бесплатный чай, кофе и полезные перекусы для перезагрузки между интенсивными уроками.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
  }
];

export const branchesData: Branch[] = [
  {
    id: "branch-central",
    name: "Центральный кампус (Inter-Nation Headquarter)",
    address: "ул. Амира Темура, 107Б (БЦ «Пойтахт», 4 этаж)",
    landmark: "Ориентир: ст. метро «Амир Темур Хиёбони», гостиница Wyndham",
    phone: "+998 (71) 200-55-44",
    hours: "Пн–Сб: 08:30 – 21:30, Вс: 09:00 – 18:00",
    mapEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=69.2700%2C41.3100%2C69.2950%2C41.3250&layer=mapnik&marker=41.3175%2C69.2825"
  },
  {
    id: "branch-west",
    name: "Кампус «Чиланзар»",
    address: "проспект Бунёдкор, 42А (напротив ТРЦ «Parus»)",
    landmark: "Ориентир: ст. метро «Мирзо Улугбек», стадион «Бунёдкор»",
    phone: "+998 (71) 200-55-45",
    hours: "Пн–Сб: 08:30 – 21:00, Вс: 09:00 – 18:00",
    mapEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=69.2000%2C41.2750%2C69.2250%2C41.2900&layer=mapnik&marker=41.2825%2C69.2125"
  },
  {
    id: "branch-north",
    name: "Кампус «Юнусабад»",
    address: "ул. Ахмада Дониша, 26 (ТРЦ «Mega Planet», 3 этаж)",
    landmark: "Ориентир: ст. метро «Юнусабад», Универсам",
    phone: "+998 (71) 200-55-46",
    hours: "Пн–Сб: 08:30 – 21:00, Вс: 09:00 – 18:00",
    mapEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=69.2800%2C41.3600%2C69.3050%2C41.3750&layer=mapnik&marker=41.3675%2C69.2925"
  }
];

export const aboutFeatures = [
  {
    title: "Аккредитованные эксперты",
    desc: "Преподаватели со средним стажем 10+ лет, сертифицированные CELTA/DELTA и кандидаты физ.-мат. наук."
  },
  {
    title: "Персональный трекинг",
    desc: "У каждого студента есть цифровой личный кабинет с графиком успеваемости, посещаемости и записями лекций."
  },
  {
    title: "Бесплатные Mock-экзамены",
    desc: "Каждую субботу проводим симуляции реального экзамена в условиях жесткого тайминга для снятия стресса."
  },
  {
    title: "Гарантия результата в договоре",
    desc: "Если студент посещает 95% уроков и выполняет ДЗ, мы юридически гарантируем достижение целевого балла."
  }
];
