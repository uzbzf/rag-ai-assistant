export type Language = 'ru' | 'uz' | 'en';

export interface Translations {
  nav: {
    about: string;
    courses: string;
    teachers: string;
    results: string;
    geo: string;
    contacts: string;
    docs: string;
    enrollBtn: string;
    callNow: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    math: string;
    english: string;
    cs: string;
    check1: string;
    check2: string;
    check3: string;
    check4: string;
    enrollBtn: string;
    selectCourseBtn: string;
    ratingText: string;
    reviewsText: string;
    badgeRecognition: string;
    badgeTopCenter: string;
    badgeAwards: string;
    badgeResultTitle: string;
    badgeGrantPct: string;
    badgeGrantDesc: string;
    campusTitle: string;
    campusDesc: string;
  };
  stats: {
    stat1: string;
    stat1Label: string;
    stat2: string;
    stat2Label: string;
    stat3: string;
    stat3Label: string;
    stat4: string;
    stat4Label: string;
  };
  about: {
    badge: string;
    title: string;
    titleHighlight: string;
    desc: string;
    f1Title: string;
    f1Desc: string;
    f2Title: string;
    f2Desc: string;
    f3Title: string;
    f3Desc: string;
    f4Title: string;
    f4Desc: string;
    campusHeadingBadge: string;
    campusHeadingTitle: string;
    campusHeadingDesc: string;
  };
  courses: {
    badge: string;
    title: string;
    titleHighlight: string;
    desc: string;
    filterAll: string;
    filterMath: string;
    filterEnglish: string;
    filterCs: string;
    durationLabel: string;
    intensityLabel: string;
    formatLabel: string;
    priceLabel: string;
    enrollBtn: string;
    hitBadge: string;
    trialBannerBadge: string;
    trialBannerTitle: string;
    trialBannerDesc: string;
    trialBannerBtn: string;
  };
  teachers: {
    badge: string;
    title: string;
    titleHighlight: string;
    desc: string;
    expPrefix: string;
    expSuffix: string;
    credentialsTitle: string;
    achievementsTitle: string;
    studentResultsTitle: string;
  };
  results: {
    badge: string;
    title: string;
    titleHighlight: string;
    desc: string;
    officialScore: string;
    banner1Value: string;
    banner1Desc: string;
    banner2Value: string;
    banner2Desc: string;
    banner3Value: string;
    banner3Desc: string;
  };
  form: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    desc: string;
    bonusTitle: string;
    bonus1: string;
    bonus2: string;
    bonus3: string;
    phoneLabel: string;
    callNow: string;
    formTitle: string;
    formDesc: string;
    nameField: string;
    namePlaceholder: string;
    phoneField: string;
    phonePlaceholder: string;
    courseField: string;
    branchField: string;
    formatField: string;
    formatOffline: string;
    formatOnline: string;
    formatGroup: string;
    submitBtn: string;
    submittingBtn: string;
    privacy: string;
    successTitle: string;
    successDesc: string;
    successPromoTitle: string;
    resetBtn: string;
    errorName: string;
    errorPhone: string;
  };
  geo: {
    badge: string;
    title: string;
    titleHighlight: string;
    desc: string;
    campusInfoBadge: string;
    addressLabel: string;
    hoursLabel: string;
    hoursNote: string;
    phoneLabel: string;
    phoneNote: string;
    callBranchBtn: string;
    routeBtn: string;
  };
  contacts: {
    badge: string;
    title: string;
    titleHighlight: string;
    desc: string;
    hotlineBadge: string;
    hotlineTitle: string;
    hotlineNote: string;
    socialsBadge: string;
    socialsTitle: string;
    emailBadge: string;
    emailTitle: string;
    emailDesc: string;
    hoursBadge: string;
    hoursTitle: string;
    coworkingBadge: string;
  };
  footer: {
    desc: string;
    coursesCol: string;
    aboutCol: string;
    contactsCol: string;
    toTop: string;
    copyright: string;
  };
  docsModal: {
    title: string;
    subtitle: string;
    tabPrice: string;
    tabFaq: string;
    tabSchedule: string;
    closeBtn: string;
    downloadNote: string;
  };
}

export const translations: Record<Language, Translations> = {
  ru: {
    nav: {
      about: 'О нас',
      courses: 'Курсы',
      teachers: 'Преподаватели',
      results: 'Результаты',
      geo: 'Геолокация',
      contacts: 'Контакты',
      docs: 'База знаний (RAG)',
      enrollBtn: 'Записаться',
      callNow: 'Позвонить',
    },
    hero: {
      badge: 'Набор на новый сезон 2025/2026 открыт',
      titleStart: 'Твой максимум на экзаменах и поступление в ',
      titleHighlight: 'топ-ВУЗы',
      titleEnd: '',
      subtitle: 'Интенсивные курсы по Математике, Английскому языку и Информатике. Преподаватели со стажем более 10 лет, персональные трекеры прогресса и юридическая гарантия результата.',
      math: 'Математике',
      english: 'Английскому языку',
      cs: 'Информатике',
      check1: 'Бесплатное тестирование уровня знаний',
      check2: 'Группы до 12 человек',
      check3: 'Еженедельные пробные Mock-экзамены',
      check4: 'Современные кампусы и коворкинг 24/7',
      enrollBtn: 'Записаться на пробный урок',
      selectCourseBtn: 'Выбрать программу курса',
      ratingText: '4.9 / 5',
      reviewsText: 'Более 3 200 честных отзывов родителей и студентов',
      badgeRecognition: 'Признание',
      badgeTopCenter: '№1 Образовательный Центр',
      badgeAwards: 'По версии EdTech Awards 2024',
      badgeResultTitle: 'Результативность',
      badgeGrantPct: '96.4%',
      badgeGrantDesc: 'Поступили на грант и бюджет',
      campusTitle: 'Современные аудитории & IT-лаборатории',
      campusDesc: 'Оборудованы всем необходимым для результативной учебы',
    },
    stats: {
      stat1: '14 500+',
      stat1Label: 'Выпускников центра',
      stat2: '96.4%',
      stat2Label: 'Поступление на грант и бюджет',
      stat3: '8.0+',
      stat3Label: 'Средний балл IELTS выпускников',
      stat4: '10 лет',
      stat4Label: 'Успешной работы на рынке',
    },
    about: {
      badge: 'О нашем образовательном центре',
      title: 'Мы не просто учим — мы приводим к ',
      titleHighlight: 'реальным победам',
      desc: 'Inter-Academy — это инновационная экосистема подготовки школьников и студентов. С 2014 года мы помогли тысячам ребят поступить в топ-университеты мира и найти свое призвание в науке и IT.',
      f1Title: 'Аккредитованные эксперты',
      f1Desc: 'Преподаватели со средним стажем 10+ лет, сертифицированные CELTA/DELTA и кандидаты физ.-мат. наук.',
      f2Title: 'Персональный трекинг',
      f2Desc: 'У каждого студента есть цифровой личный кабинет с графиком успеваемости, посещаемости и записями лекций.',
      f3Title: 'Бесплатные Mock-экзамены',
      f3Desc: 'Каждую субботу проводим симуляции реального экзамена в условиях жесткого тайминга для снятия стресса.',
      f4Title: 'Гарантия результата в договоре',
      f4Desc: 'Если студент посещает 95% уроков и выполняет ДЗ, мы юридически гарантируем достижение целевого балла.',
      campusHeadingBadge: 'Инфраструктура кампусов',
      campusHeadingTitle: 'Пространство, вдохновляющее учиться',
      campusHeadingDesc: 'Все филиалы спроектированы по европейским стандартам образовательной среды: максимум естественного света, технологичное оборудование и комфортные зоны отдыха.',
    },
    courses: {
      badge: 'Программы обучения',
      title: 'Выбери курс для своего ',
      titleHighlight: 'прорыва',
      desc: 'Каждая программа разработана ведущими методистами с учетом стандартов международных экзаменов и вступительных требований топовых ВУЗов.',
      filterAll: 'Все курсы',
      filterMath: 'Математика',
      filterEnglish: 'Английский язык',
      filterCs: 'Информатика & IT',
      durationLabel: 'Срок обучения:',
      intensityLabel: 'Интенсивность:',
      formatLabel: 'Формат:',
      priceLabel: 'Стоимость',
      enrollBtn: 'Записаться',
      hitBadge: 'Хит набора',
      trialBannerBadge: 'Спецпредложение',
      trialBannerTitle: 'Сомневаетесь в выборе курса или уровня?',
      trialBannerDesc: 'Пройдите бесплатное диагностическое тестирование знаний с нашим экспертом. Мы определим сильные и слабые стороны и составим персональный план подготовки.',
      trialBannerBtn: 'Записаться на диагностику',
    },
    teachers: {
      badge: 'Команда профессионалов',
      title: 'Преподаватели, которые доводят до ',
      titleHighlight: 'результата',
      desc: 'Только практики с международными сертификатами, учеными степенями и победами в престижных олимпиадах. Каждый преподаватель ежегодно подтверждает свою квалификацию.',
      expPrefix: 'Стаж ',
      expSuffix: ' лет',
      credentialsTitle: 'Квалификация & Дипломы',
      achievementsTitle: 'Достижения преподавателя',
      studentResultsTitle: 'Результаты учеников',
    },
    results: {
      badge: 'Зал славы выпускников',
      title: 'Лучшие результаты наших ',
      titleHighlight: 'учеников',
      desc: 'Мы гордимся каждым нашим студентом. Их высокие баллы, выигранные гранты и поступления в мировые университеты — главное доказательство эффективности методики.',
      officialScore: 'Официальный балл',
      banner1Value: '$2.8M+',
      banner1Desc: 'Суммарно выигранных грантов нашими выпускниками',
      banner2Value: '450+',
      banner2Desc: 'Студентов поступили в зарубежные ВУЗы в 2024 году',
      banner3Value: '8.0 / 8.5',
      banner3Desc: 'Сдали более 180 учеников курса IELTS Intensive',
    },
    form: {
      badge: 'Бонус при записи онлайн',
      titleStart: 'Запишись на ',
      titleHighlight: 'бесплатный',
      desc: 'Познакомьтесь с преподавателем, оцените атмосферу наших современных классов и пройдите диагностику уровня без каких-либо обязательств.',
      bonusTitle: 'Что вы получаете на первом занятии:',
      bonus1: 'Полное тестирование текущих знаний по стандартам экзаменов',
      bonus2: 'Индивидуальный план подготовки к целевому баллу или ВУЗу',
      bonus3: 'Авторский гайд & словарь полезных терминов в подарок',
      phoneLabel: 'Или позвоните прямо сейчас:',
      callNow: '+998 (71) 200-55-44',
      formTitle: 'Запись на курс со скидкой 15%',
      formDesc: 'Заполните поля ниже, менеджер забронирует место в мини-группе',
      nameField: 'Ваше имя и фамилия',
      namePlaceholder: 'Например: Алишер Усманов',
      phoneField: 'Номер телефона',
      phonePlaceholder: '+998 (__) ___-__-__',
      courseField: 'Направление обучения',
      branchField: 'Удобный филиал',
      formatField: 'Формат занятий',
      formatOffline: 'Офлайн (группа до 12 чел.)',
      formatOnline: 'Онлайн с куратором',
      formatGroup: 'Групповое обучение (до 12 чел.)',
      submitBtn: 'Записаться на бесплатный урок',
      submittingBtn: 'Обработка заявки...',
      privacy: 'Мы гарантируем конфиденциальность персональных данных',
      successTitle: 'Заявка успешно принята!',
      successDesc: 'Наш координатор свяжется с вами в течение 10 минут для подтверждения времени урока.',
      successPromoTitle: 'Ваш промокод на бонус:',
      resetBtn: 'Отправить еще одну заявку',
      errorName: 'Пожалуйста, введите ваше имя',
      errorPhone: 'Пожалуйста, укажите корректный номер телефона',
    },
    geo: {
      badge: 'География и филиалы',
      title: 'Удобные локации в шаговой доступности от ',
      titleHighlight: 'метро',
      desc: '3 современных кампуса в ключевых районах города. Выбирайте ближайший филиал для комфортного обучения без траты времени в пробках.',
      campusInfoBadge: 'Информация о кампусе',
      addressLabel: 'Адрес филиала',
      hoursLabel: 'Время работы',
      hoursNote: 'Администрация работает без перерыва на обед',
      phoneLabel: 'Прямой телефон филиала',
      phoneNote: 'Звонок бесплатный для всех мобильных операторов',
      callBranchBtn: 'Позвонить в филиал',
      routeBtn: 'Построить маршрут',
    },
    contacts: {
      badge: 'Связь с нами',
      title: 'Всегда на связи и готовы ',
      titleHighlight: 'помочь',
      desc: 'Наши кураторы и академические консультанты ответят на любые вопросы по программам обучения, расписанию и форматам оплаты.',
      hotlineBadge: 'Горячая линия',
      hotlineTitle: 'Единый колл-центр',
      hotlineNote: 'Без выходных с 08:30 до 21:00',
      socialsBadge: 'Мессенджеры',
      socialsTitle: 'Онлайн поддержка',
      emailBadge: 'Электронная почта',
      emailTitle: 'Официальные запросы',
      emailDesc: 'Для резюме преподавателей и корпоративных программ обучения',
      hoursBadge: 'График приема',
      hoursTitle: 'Часы работы',
      coworkingBadge: 'Коворкинг для студентов открыт ежедневно',
    },
    footer: {
      desc: 'Ведущий учебный центр подготовки к вступительным экзаменам, олимпиадам и международным тестам. Лицензия Министерства дошкольного и школьного образования № 048291.',
      coursesCol: 'Направления',
      aboutCol: 'О центре',
      contactsCol: 'Быстрая связь',
      toTop: 'Наверх',
      copyright: 'INTER-ACADEMY. Все права защищены. Дизайн вдохновлен стилем inter-nation.uz.',
    },
    docsModal: {
      title: 'Документы и база знаний RAG',
      subtitle: 'Официальный прайс-лист, справочник FAQ и детальный график работы преподавателей',
      tabPrice: 'Прайс-лист курсов',
      tabFaq: 'Частые вопросы (FAQ)',
      tabSchedule: 'График преподавателей',
      closeBtn: 'Закрыть',
      downloadNote: 'Все данные синхронизированы с базой знаний образовательного центра',
    },
  },
  uz: {
    nav: {
      about: 'Biz haqimizda',
      courses: 'Kurslar',
      teachers: 'O‘qituvchilar',
      results: 'Natijalar',
      geo: 'Manzillar',
      contacts: 'Aloqa',
      docs: 'Bilimlar bazasi (RAG)',
      enrollBtn: 'Yozilish',
      callNow: 'Qo‘ng‘iroq',
    },
    hero: {
      badge: 'Yangi 2025/2026 mavsumi uchun qabul ochiq',
      titleStart: 'Imtihonlarda eng yuqori ball va ',
      titleHighlight: 'top OTMlarga',
      titleEnd: ' kirish',
      subtitle: 'Matematika, Ingliz tili va Informatika bo‘yicha intensiv kurslar. 10 yildan ortiq tajribaga ega ustozlar, individual o‘sish ko‘rsatkichlari va shartnomaviy natija kafolati.',
      math: 'Matematika',
      english: 'Ingliz tili',
      cs: 'Informatika',
      check1: 'Bepul bilim darajasini tekshirish',
      check2: '12 nafargacha bo‘lgan guruhlar',
      check3: 'Har shanba bepul Mock-imtihonlar',
      check4: 'Zamonaviy kampuslar va 24/7 kovorking',
      enrollBtn: 'Sinov darsiga yozilish',
      selectCourseBtn: 'Kurs dasturini tanlash',
      ratingText: '4.9 / 5',
      reviewsText: 'Ota-onalar va o‘quvchilarning 3 200 dan ortiq xolis sharhlari',
      badgeRecognition: 'E’tirof',
      badgeTopCenter: '№1 O‘quv markazi',
      badgeAwards: 'EdTech Awards 2024 talqini bo‘yicha',
      badgeResultTitle: 'Natijadorlik',
      badgeGrantPct: '96.4%',
      badgeGrantDesc: 'Davlat granti va byudjetga kirdilar',
      campusTitle: 'Zamonaviy auditoriyalar & IT-laboratoriyalar',
      campusDesc: 'Samarali ta’lim uchun barcha qulayliklar bilan jihozlangan',
    },
    stats: {
      stat1: '14 500+',
      stat1Label: 'Markaz bitiruvchilari',
      stat2: '96.4%',
      stat2Label: 'Grant va byudjetga kirish ko‘rsatkichi',
      stat3: '8.0+',
      stat3Label: 'Bitiruvchilarning o‘rtacha IELTS bali',
      stat4: '10 yil',
      stat4Label: 'Bozorda muvaffaqiyatli faoliyat',
    },
    about: {
      badge: 'O‘quv markazimiz haqida',
      title: 'Biz faqat dars bermaymiz — biz ',
      titleHighlight: 'haqiqiy g‘alabalarga',
      desc: 'Inter-Academy — maktab o‘quvchilari va abituriyentlarni tayyorlashning innovatsion ekotizimidir. 2014-yildan beri minglab yoshlarga dunyoning nufuzli universitetlariga kirishda yordam berib kelmoqdamiz.',
      f1Title: 'Akkreditatsiyadan o‘tgan ekspertlar',
      f1Desc: 'O‘rtacha 10+ yillik tajribaga ega, CELTA/DELTA sertifikatlari va fan nomzodlari bo‘lgan ustozlar.',
      f2Title: 'Individual monitoring',
      f2Desc: 'Har bir o‘quvchining shaxsiy raqamli kabineti orqali o‘zlashtirish va davomat nazorat qilinadi.',
      f3Title: 'Bepul Mock imtihonlar',
      f3Desc: 'Har shanba kuni stressni yengish uchun qat’iy vaqt me’yori asosida haqiqiy imtihon simulyatsiyasi.',
      f4Title: 'Shartnomada natija kafolati',
      f4Desc: 'Agar o‘quvchi 95% darslarga qatnashib, vazifalarni bajarsa, belgilangan ballga erishishini qonunan kafolatlaymiz.',
      campusHeadingBadge: 'Kampuslar infratuzilmasi',
      campusHeadingTitle: 'Ilm olishga ilhomlantiruvchi makon',
      campusHeadingDesc: 'Barcha filiallar Yevropa ta’lim standartlari asosida loyihalashtirilgan: ko‘p tabiiy yorug‘lik, ilg‘or uskunalar va qulay dam olish hududlari.',
    },
    courses: {
      badge: 'O‘quv dasturlari',
      title: 'O‘z kelajagingiz uchun ',
      titleHighlight: 'kursni tanlang',
      desc: 'Har bir dastur xalqaro imtihonlar va nufuzli OTMlarning kirish talablariga mos holda yetakchi metodistlar tomonidan ishlab chiqilgan.',
      filterAll: 'Barcha kurslar',
      filterMath: 'Matematika',
      filterEnglish: 'Ingliz tili',
      filterCs: 'Informatika & IT',
      durationLabel: 'O‘qish muddati:',
      intensityLabel: 'Darslar soni:',
      formatLabel: 'Format:',
      priceLabel: 'Narxi',
      enrollBtn: 'Yozilish',
      hitBadge: 'Eng talabgir',
      trialBannerBadge: 'Maxsus taklif',
      trialBannerTitle: 'Kurs yoki darajani tanlashda ikkilanyapsizmi?',
      trialBannerDesc: 'Bizning ekspertimiz bilan bepul diagnostik sinovdan o‘ting. Kuchli va zaif tomonlaringizni aniqlab, individual tayyorgarlik rejasini tuzib beramiz.',
      trialBannerBtn: 'Diagnostikaga yozilish',
    },
    teachers: {
      badge: 'Professional jamoa',
      title: 'Sizni natijaga yetaklovchi ',
      titleHighlight: 'ustozlar',
      desc: 'Faqat xalqaro sertifikatlar, ilmiy darajalar va olimpiada g‘olibliklariga ega amaliyotchilar. Har bir o‘qituvchi yillik malaka attestatsiyasidan o‘tadi.',
      expPrefix: 'Tajriba: ',
      expSuffix: ' yil',
      credentialsTitle: 'Malaka & Diplomlar',
      achievementsTitle: 'O‘qituvchi yutuqlari',
      studentResultsTitle: 'O‘quvchilar natijalari',
    },
    results: {
      badge: 'Bitiruvchilar faxr zali',
      title: 'O‘quvchilarimizning eng yaxshi ',
      titleHighlight: 'natijalari',
      desc: 'Har bir shogirdimiz bilan faxrlanamiz. Ularning yuqori ballari, qo‘lga kiritgan grantlari va jahon universitetlariga kirishi metodikamizning yorqin isbotidir.',
      officialScore: 'Rasmiy ball',
      banner1Value: '$2.8M+',
      banner1Desc: 'Bitiruvchilarimiz tomonidan yutilgan jami grantlar',
      banner2Value: '450+',
      banner2Desc: '2024-yilda xorijiy OTMlarga qabul qilingan talabalar',
      banner3Value: '8.0 / 8.5',
      banner3Desc: 'IELTS Intensive kursining 180 dan ortiq bitiruvchisi',
    },
    form: {
      badge: 'Onlayn yozilishda maxsus bonus',
      titleStart: 'Birinchi ',
      titleHighlight: 'bepul',
      desc: 'Ustoz bilan tanishing, zamonaviy auditoriyalarimiz muhitini his qiling va hech qanday majburiyatsiz darajangizni aniqlang.',
      bonusTitle: 'Birinchi bepul darsda nimalarga ega bo‘lasiz:',
      bonus1: 'Imtihon standartlari bo‘yicha to‘liq diagnostik test',
      bonus2: 'Maqsadli ball yoki OTM uchun individual o‘quv rejasi',
      bonus3: 'Mualliflik qo‘llanmasi va foydali atamalar lug‘ati sovg‘aga',
      phoneLabel: 'Yoki to‘g‘ridan-to‘g‘ri qo‘ng‘iroq qiling:',
      callNow: '+998 (71) 200-55-44',
      formTitle: '15% chegirma bilan kursga yozilish',
      formDesc: 'Ma’lumotlarni to‘ldiring, menejerimiz guruhda joyingizni band qiladi',
      nameField: 'Ism va familiyangiz',
      namePlaceholder: 'Masalan: Alisher Usmonov',
      phoneField: 'Telefon raqamingiz',
      phonePlaceholder: '+998 (__) ___-__-__',
      courseField: 'Ta’lim yo‘nalishi',
      branchField: 'Qulay filial',
      formatField: 'Dars formati',
      formatOffline: 'Oflayn (12 kishigacha guruh)',
      formatOnline: 'Kurator bilan onlayn',
      formatGroup: 'Guruhda o‘qish (12 kishigacha)',
      submitBtn: 'Bepul darsga yozilish',
      submittingBtn: 'Ariza yuborilmoqda...',
      privacy: 'Shaxsiy ma’lumotlarning maxfiyligi kafolatlanadi',
      successTitle: 'Arizangiz muvaffaqiyatli qabul qilindi!',
      successDesc: 'Dars vaqtini tasdiqlash uchun 10 daqiqa ichida siz bilan bog‘lanamiz.',
      successPromoTitle: 'Sizning sovg‘a promokodingiz:',
      resetBtn: 'Yana bir ariza yuborish',
      errorName: 'Iltimos, ismingizni kiriting',
      errorPhone: 'Iltimos, to‘g‘ri telefon raqamini kiriting',
    },
    geo: {
      badge: 'Geografiya va filiallar',
      title: 'Metrogacha piyoda boriladigan ',
      titleHighlight: 'qulay manzillar',
      desc: 'Shaharning asosiy tumanlarida joylashgan 3 ta zamonaviy kampus. Tirbandliklarda vaqt yo‘qotmaslik uchun eng yaqin filialni tanlang.',
      campusInfoBadge: 'Kampus ma’lumotlari',
      addressLabel: 'Filial manzili',
      hoursLabel: 'Ish vaqti',
      hoursNote: 'Ma’muriyat tushlik tanaffusisiz xizmat ko‘rsatadi',
      phoneLabel: 'Filial to‘g‘ridan-to‘g‘ri telefoni',
      phoneNote: 'Barcha mobil operatorlar uchun qo‘ng‘iroq bepul',
      callBranchBtn: 'Filialga qo‘ng‘iroq',
      routeBtn: 'Yo‘nalishni ko‘rish',
    },
    contacts: {
      badge: 'Biz bilan aloqa',
      title: 'Har doim aloqadamiz va ',
      titleHighlight: 'yordamga tayyormiz',
      desc: 'Kuratorlarimiz o‘quv dasturlari, dars jadvallari va to‘lov shartlari bo‘yicha barcha savollaringizga mamnuniyat bilan javob berishadi.',
      hotlineBadge: 'Qaynoq liniya',
      hotlineTitle: 'Yagona koll-markaz',
      hotlineNote: 'Dam olish kunlarisiz 08:30 dan 21:00 gacha',
      socialsBadge: 'Ijtimoiy tarmoqlar',
      socialsTitle: 'Onlayn qo‘llab-quvvatlash',
      emailBadge: 'Elektron pochta',
      emailTitle: 'Rasmiy murojaatlar',
      emailDesc: 'Ustozlar rezyumesi va korporativ ta’lim takliflari uchun',
      hoursBadge: 'Qabul jadvali',
      hoursTitle: 'Ish soatlari',
      coworkingBadge: 'O‘quvchilar uchun kovorking har kuni ochiq',
    },
    footer: {
      desc: 'Kirish imtihonlari, fan olimpiadalari va xalqaro testlarga tayyorlovchi yetakchi ta’lim markazi. Maktabgacha va maktab ta’limi vazirligi litsenziyasi № 048291.',
      coursesCol: 'Yo‘nalishlar',
      aboutCol: 'Markaz haqida',
      contactsCol: 'Tezkor aloqa',
      toTop: 'Yuqoriga',
      copyright: 'INTER-ACADEMY. Barcha huquqlar himoyalangan. Inter-nation.uz uslubi asosida yaratilgan.',
    },
    docsModal: {
      title: 'Hujjatlar va RAG bilimlar bazasi',
      subtitle: 'Rasmiy narxlar ro‘yxati, FAQ qo‘llanmasi va o‘qituvchilarning batafsil ish jadvali',
      tabPrice: 'Kurslar narxlari (Prays-list)',
      tabFaq: 'Ko‘p beriladigan savollar (FAQ)',
      tabSchedule: 'O‘qituvchilar jadvali',
      closeBtn: 'Yopish',
      downloadNote: 'Barcha ma’lumotlar ta’lim markazining RAG bilimlar bazasi bilan to‘liq mos keladi',
    },
  },
  en: {
    nav: {
      about: 'About Us',
      courses: 'Courses',
      teachers: 'Faculty',
      results: 'Results',
      geo: 'Campuses',
      contacts: 'Contacts',
      docs: 'Knowledge Base (RAG)',
      enrollBtn: 'Enroll Now',
      callNow: 'Call Us',
    },
    hero: {
      badge: 'Enrollment Open for New 2025/2026 Academic Season',
      titleStart: 'Unlock Your Highest Potential & Enter ',
      titleHighlight: 'Top Universities',
      titleEnd: '',
      subtitle: 'Intensive courses in Mathematics, English (IELTS) and Computer Science. Teachers with 10+ years experience, individual progress metrics and guaranteed exam score in contract.',
      math: 'Mathematics',
      english: 'English Language',
      cs: 'Computer Science',
      check1: 'Free comprehensive diagnostic test',
      check2: 'Group cohorts up to 12 students',
      check3: 'Weekly full-format Mock Exams',
      check4: 'Modern high-tech campuses & 24/7 coworking',
      enrollBtn: 'Book Free Trial Class',
      selectCourseBtn: 'Explore Programs',
      ratingText: '4.9 / 5',
      reviewsText: 'Over 3,200 verified reviews from parents and students',
      badgeRecognition: 'Recognition',
      badgeTopCenter: 'Top-1 Education Center',
      badgeAwards: 'By EdTech Awards 2024',
      badgeResultTitle: 'Track Record',
      badgeGrantPct: '96.4%',
      badgeGrantDesc: 'Admitted with scholarships and grants',
      campusTitle: 'Modern Smart Classrooms & IT Labs',
      campusDesc: 'Equipped with 4K panels and high-speed infrastructure',
    },
    stats: {
      stat1: '14,500+',
      stat1Label: 'Alumni Graduates',
      stat2: '96.4%',
      stat2Label: 'Full Scholarship & Grant Rate',
      stat3: '8.0+',
      stat3Label: 'Average Graduate IELTS Score',
      stat4: '10 Years',
      stat4Label: 'Of Excellence in Education',
    },
    about: {
      badge: 'About Our Education Center',
      title: 'We do not just teach — we guide you to ',
      titleHighlight: 'real victories',
      desc: 'Inter-Academy is an innovative educational ecosystem for school students and university applicants. Since 2014, we have helped thousands of students achieve admission to world-class universities and embark on careers in STEM and IT.',
      f1Title: 'Accredited Experts',
      f1Desc: 'Instructors with 10+ years average experience, CELTA/DELTA diplomas and PhD degrees.',
      f2Title: 'Personalized Progress Tracking',
      f2Desc: 'Every student receives a digital dashboard monitoring grades, attendance, and recorded lectures.',
      f3Title: 'Free Full-Length Mock Exams',
      f3Desc: 'Weekly Saturday test simulations under strict timing to eliminate exam anxiety.',
      f4Title: 'Contractual Score Guarantee',
      f4Desc: 'Students maintaining 95% attendance and homework completion receive a legally backed score guarantee.',
      campusHeadingBadge: 'Campus Facilities',
      campusHeadingTitle: 'Spaces Designed to Inspire Learning',
      campusHeadingDesc: 'All campuses adhere to European educational standards: abundant natural light, ergonomic furniture, and quiet study areas.',
    },
    courses: {
      badge: 'Study Programs',
      title: 'Choose the Course for Your ',
      titleHighlight: 'Breakthrough',
      desc: 'Curricula developed by top academic experts aligned with international examinations and admissions standards of premier universities.',
      filterAll: 'All Courses',
      filterMath: 'Mathematics',
      filterEnglish: 'English & IELTS',
      filterCs: 'Computer Science & IT',
      durationLabel: 'Duration:',
      intensityLabel: 'Intensity:',
      formatLabel: 'Format:',
      priceLabel: 'Tuition Fee',
      enrollBtn: 'Enroll Now',
      hitBadge: 'Most Popular',
      trialBannerBadge: 'Special Offer',
      trialBannerTitle: 'Not sure which course or level suits you best?',
      trialBannerDesc: 'Take a free diagnostic assessment with our academic coordinator. We will diagnose strengths, identify gaps, and design your custom roadmap.',
      trialBannerBtn: 'Book Free Assessment',
    },
    teachers: {
      badge: 'Elite Faculty',
      title: 'Mentors Who Deliver Measurable ',
      titleHighlight: 'Results',
      desc: 'Practitioners with international credentials, degrees, and olympiad awards. Each faculty member passes annual qualification audits.',
      expPrefix: 'Experience: ',
      expSuffix: ' years',
      credentialsTitle: 'Degrees & Credentials',
      achievementsTitle: 'Teacher Achievements',
      studentResultsTitle: 'Student Outcomes',
    },
    results: {
      badge: 'Hall of Fame',
      title: 'Top Achievements of Our ',
      titleHighlight: 'Students',
      desc: 'We take pride in every student. Their top percentiles, won scholarships, and admissions to Ivy League and global universities validate our approach.',
      officialScore: 'Certified Score',
      banner1Value: '$2.8M+',
      banner1Desc: 'Cumulative scholarships won by our graduates',
      banner2Value: '450+',
      banner2Desc: 'Students admitted to prestigious foreign universities in 2024',
      banner3Value: '8.0 / 8.5',
      banner3Desc: 'Achieved by 180+ IELTS Intensive alumni',
    },
    form: {
      badge: 'Special Bonus When Booking Online',
      titleStart: 'Sign Up for a ',
      titleHighlight: 'Free',
      desc: 'Meet the mentor, experience our smart classrooms, and test your current proficiency with zero obligation.',
      bonusTitle: 'What you receive during the first free session:',
      bonus1: 'Full diagnostic testing matching official exam formats',
      bonus2: 'Customized prep roadmap tailored to your target university',
      bonus3: 'Complimentary handbook & curated academic vocabulary guide',
      phoneLabel: 'Or call directly right now:',
      callNow: '+998 (71) 200-55-44',
      formTitle: 'Enroll with 15% Early Bird Discount',
      formDesc: 'Submit your details, and our coordinator will reserve your seat',
      nameField: 'Full Name',
      namePlaceholder: 'e.g. John Doe',
      phoneField: 'Phone Number',
      phonePlaceholder: '+998 (__) ___-__-__',
      courseField: 'Program of Interest',
      branchField: 'Preferred Campus',
      formatField: 'Study Format',
      formatOffline: 'In-person (group up to 12)',
      formatOnline: 'Online with Live Mentor',
      formatGroup: 'Group Study (up to 12 students)',
      submitBtn: 'Claim Free Lesson',
      submittingBtn: 'Processing Application...',
      privacy: 'We guarantee full confidentiality of your personal information',
      successTitle: 'Application Successfully Received!',
      successDesc: 'Our academic manager will call you within 10 minutes to confirm your trial lesson schedule.',
      successPromoTitle: 'Your gift promo code:',
      resetBtn: 'Submit Another Application',
      errorName: 'Please enter your full name',
      errorPhone: 'Please provide a valid phone number',
    },
    geo: {
      badge: 'Campuses & Geography',
      title: 'Convenient Locations Walking Distance from ',
      titleHighlight: 'Metro',
      desc: '3 state-of-the-art campuses across key city hubs. Pick the nearest campus for seamless commuting without traffic hassles.',
      campusInfoBadge: 'Campus Overview',
      addressLabel: 'Address',
      hoursLabel: 'Working Hours',
      hoursNote: 'Admissions desk operates without lunch break',
      phoneLabel: 'Direct Line',
      phoneNote: 'Toll-free across all mobile carriers',
      callBranchBtn: 'Call Campus',
      routeBtn: 'Get Directions',
    },
    contacts: {
      badge: 'Get in Touch',
      title: 'Always Connected & Ready to ',
      titleHighlight: 'Assist You',
      desc: 'Our academic coordinators are here to answer inquiries regarding curriculum, cohorts, and payment schedules.',
      hotlineBadge: 'Hotline',
      hotlineTitle: 'Unified Call Center',
      hotlineNote: 'Mon-Sun: 08:30 AM to 09:00 PM',
      socialsBadge: 'Instant Messaging',
      socialsTitle: 'Online Support',
      emailBadge: 'Email Inquiries',
      emailTitle: 'Official Correspondence',
      emailDesc: 'For teacher recruitment and corporate training programs',
      hoursBadge: 'Office Hours',
      hoursTitle: 'Visiting Schedule',
      coworkingBadge: 'Student study lounge open daily',
    },
    footer: {
      desc: 'Premier education center for university admissions, olympiad math, and international certifications. Ministry of Preschool and School Education License № 048291.',
      coursesCol: 'Academic Programs',
      aboutCol: 'Our Center',
      contactsCol: 'Direct Contacts',
      toTop: 'Back to Top',
      copyright: 'INTER-ACADEMY. All rights reserved. Design inspired by inter-nation.uz.',
    },
    docsModal: {
      title: 'Documents & RAG Knowledge Base',
      subtitle: 'Official price list, comprehensive FAQ, and detailed teacher working hours',
      tabPrice: 'Course Tuition (Price List)',
      tabFaq: 'Frequently Asked Questions (FAQ)',
      tabSchedule: 'Faculty Working Schedule',
      closeBtn: 'Close',
      downloadNote: 'All information is synchronized with our academic RAG vector knowledge base',
    },
  },
};
