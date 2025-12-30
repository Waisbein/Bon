
import { MenuItem, Branch } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'c1',
    name: { ru: 'Эспрессо', uz: 'Espresso' },
    price: { 'Petit': 20000, 'Grand': 23000 },
    volumes: { 'Petit': '30 мл', 'Grand': '60 мл' },
    longDescription: {
      ru: 'Классический крепкий черный кофе, приготовленный под давлением.',
      uz: 'Bosim ostida tayyorlangan klassik kuchli qora qahva.'
    },
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'c2',
    name: { ru: 'Американо', uz: 'Amerikano' },
    price: { 'Petit': 21000, 'Grand': 24000 },
    volumes: { 'Petit': '200 мл', 'Grand': '300 мл' },
    longDescription: {
      ru: 'Эспрессо с добавлением горячей воды. Более мягкий вкус черного кофе.',
      uz: 'Issiq suv qo\'shilgan espresso. Qora qahvaning yumshoqroq ta\'mi.'
    },
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'c3',
    name: { ru: 'Капучино', uz: 'Kapuchino' },
    price: { 'Petit': 25000, 'Grand': 31000, 'Extra Grand': 39000 },
    volumes: { 'Petit': '200 мл', 'Grand': '300 мл', 'Extra Grand': '450 мл' },
    longDescription: {
      ru: 'Идеальный баланс эспрессо, молока и нежной молочной пены.',
      uz: 'Espresso, sut va mayin sut ko\'pigining ideal balansi.'
    },
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'c4',
    name: { ru: 'Латте', uz: 'Latte' },
    price: { 'Grand': 27000, 'Extra Grand': 37000 },
    volumes: { 'Grand': '300 мл', 'Extra Grand': '450 мл' },
    longDescription: {
      ru: 'Нежный кофейный напиток с преобладанием молока.',
      uz: 'Sut ko\'p bo\'lgan mayin qahva ichimligi.'
    },
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'c5',
    name: { ru: 'Флэт уайт', uz: 'Flet uayt' },
    price: 29000,
    volumes: { 'Standard': '200 мл' },
    longDescription: {
      ru: 'Двойная порция эспрессо с тонким слоем молочной пены. Насыщенный кофейно-молочный вкус.',
      uz: 'Yupqa sut ko\'pigi bilan ikki hissa espresso. To\'yingan qahva va sut ta\'mi.'
    },
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'c6',
    name: { ru: 'Раф', uz: 'Raf' },
    description: { 
      ru: 'карамельный / ванильный / лесной орех', 
      uz: 'karamelli / vanilli / o\'rmon yong\'og\'i' 
    },
    longDescription: {
      ru: 'Сливочный десертный кофе. Готовится путем взбивания эспрессо вместе со сливками и сахаром.',
      uz: 'Qaymoqli desert qahvasi. Espresso, qaymoq va shakar bilan birga ko\'pirtiriladi.'
    },
    price: 42000,
    volumes: { 'Standard': '300 мл' },
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'b1',
    name: { ru: 'Круассан классический', uz: 'Klassik kruassan' },
    description: {
      ru: 'Хрустящая французская выпечка на натуральном сливочном масле.',
      uz: 'Tabiiy sariyog\'da tayyorlangan qarsildoq frantsuz pishirig\'i.'
    },
    longDescription: {
      ru: 'Состав: мука высшего сорта, натуральное сливочное масло, сахар, дрожжи, соль.',
      uz: 'Tarkibi: oliy navli un, tabiiy sariyog\', shakar, xamirturush, tuz.'
    },
    price: 15000,
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400&auto=format&fit=crop'
  }
];

export const BRANCHES: Branch[] = [
  // Ташкент - Список 1
  { id: 't1', name: { ru: 'Bon! Фидокор', uz: 'Bon! Fidokor' }, address: { ru: 'ул. Фидокор, 40', uz: 'Fidokor ko\'chasi, 40' }, workingHours: { ru: '07:30 - 22:00', uz: '07:30 - 22:00' }, phone: '+998 78 150 18 34', coordinates: { lat: 41.2995, lng: 69.2825 } },
  { id: 't2', name: { ru: 'Bon! Укчи', uz: 'Bon! Ukchi' }, address: { ru: 'ул. Укчи, 5', uz: 'O\'qchi ko\'chasi, 5' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 855 01 59', coordinates: { lat: 41.3111, lng: 69.2522 } },
  { id: 't3', name: { ru: 'Bon! Шота Руставели 63', uz: 'Bon! Shota Rustaveli 63' }, address: { ru: 'ул. Шота Руставели, 63', uz: 'Shota Rustaveli ko\'chasi, 63' }, workingHours: { ru: '07:30 - 22:00', uz: '07:30 - 22:00' }, phone: '+998 99 444 18 01', coordinates: { lat: 41.2815, lng: 69.2515 } },
  { id: 't4', name: { ru: 'Bon! Беруни', uz: 'Bon! Beruniy' }, address: { ru: 'пр-т Беруни, 12', uz: 'Beruniy shoh ko\'chasi, 12' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 99 444 38 98', coordinates: { lat: 41.3411, lng: 69.2122 } },
  { id: 't5', name: { ru: 'Bon! Шевченко', uz: 'Bon! Shevchenko' }, address: { ru: 'ул. Тараса Шевченко, 28', uz: 'Tarasa Shevchenko ko\'chasi, 28' }, workingHours: { ru: '07:30 - 22:00', uz: '07:30 - 22:00' }, phone: '+998 71 252 56 94', coordinates: { lat: 41.3015, lng: 69.2715 } },
  { id: 't6', name: { ru: 'Bon! Глинки', uz: 'Bon! Glinka' }, address: { ru: 'ул. Глинки, 46', uz: 'Glinka ko\'chasi, 46' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 77 391 58 50', coordinates: { lat: 41.2915, lng: 69.2615 } },
  { id: 't7', name: { ru: 'Bon! БИЙ', uz: 'Bon! BIY' }, address: { ru: 'м-в Буюк Ипак Йули, 44', uz: 'Buyuk Ipak Yo\'li mavzesi, 44' }, workingHours: { ru: '07:30 - 22:00', uz: '07:30 - 22:00' }, phone: '+998 71 232 00 08', coordinates: { lat: 41.3255, lng: 69.3255 } },
  { id: 't8', name: { ru: 'Bon! Тимура Малика', uz: 'Bon! Temur Malik' }, address: { ru: 'ул. Тимура Малика, 3', uz: 'Temur Malik ko\'chasi, 3' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 99 444 38 09', coordinates: { lat: 41.3515, lng: 69.3415 } },
  { id: 't9', name: { ru: 'Bon! МКАД 26', uz: 'Bon! MKAD 26' }, address: { ru: 'Малая кольцевая, 26', uz: 'Kichik halqa yo\'li, 26' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 77 448 01 91', coordinates: { lat: 41.2715, lng: 69.2315 } },
  { id: 't10', name: { ru: 'Bon! Катартал', uz: 'Bon! Qatortol' }, address: { ru: 'ул. Катартал, 28', uz: 'Qatortol ko\'chasi, 28' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 144 00 54', coordinates: { lat: 41.2855, lng: 69.2115 } },
  { id: 't11', name: { ru: 'Bon! Саёхат', uz: 'Bon! Sayohat' }, address: { ru: 'ул. Саёхат, 2', uz: 'Sayohat ko\'chasi, 2' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 99 370 11 01', coordinates: { lat: 41.3315, lng: 69.3315 } },
  { id: 't12', name: { ru: 'Bon! Аккурган 14А', uz: 'Bon! Oqqo\'rg\'on 14A' }, address: { ru: 'ул. Аккурган, 14А', uz: 'Oqqo\'rg\'on ko\'chasi, 14A' }, workingHours: { ru: '07:30 - 22:00', uz: '07:30 - 22:00' }, phone: '+998 99 444 18 04', coordinates: { lat: 41.3215, lng: 69.2915 } },
  { id: 't13', name: { ru: 'Bon! Чимкент', uz: 'Bon! Chimkent' }, address: { ru: 'ул. Чимкент, 21', uz: 'Chimkent ko\'chasi, 21' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 99 444 18 02', coordinates: { lat: 41.3055, lng: 69.2755 } },
  { id: 't14', name: { ru: 'Bon! Тепамасжид', uz: 'Bon! Tepamasjid' }, address: { ru: 'ул. Тепамасжид, 1', uz: 'Tepamasjid ko\'chasi, 1' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 134 13 83', coordinates: { lat: 41.3555, lng: 69.3555 } },
  { id: 't15', name: { ru: 'Bon! А.Темура 72А', uz: 'Bon! A.Temur 72A' }, address: { ru: 'пр-т Амира Темура, 72А', uz: 'Amir Temur shoh ko\'chasi, 72A' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 017 30 30', coordinates: { lat: 41.3355, lng: 69.2855 } },
  { id: 't16', name: { ru: 'Bon! Истикбол', uz: 'Bon! Istiqbol' }, address: { ru: 'ул. Истикбол, 18', uz: 'Istiqbol ko\'chasi, 18' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 992 95 15', coordinates: { lat: 41.3075, lng: 69.2875 } },

  // Ташкент - Список 2
  { id: 't17', name: { ru: 'Bon! Навои', uz: 'Bon! Navoiy' }, address: { ru: 'пр-т Алишера Навои, 22', uz: 'Alisher Navoiy shoh ko\'chasi, 22' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 71 241 20 67', coordinates: { lat: 41.3155, lng: 69.2455 } },
  { id: 't18', name: { ru: 'Bon! Бабура 6', uz: 'Bon! Bobur 6' }, address: { ru: 'ул. Бабура, 6', uz: 'Bobur ko\'chasi, 6' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 670 39 89', coordinates: { lat: 41.2955, lng: 69.2555 } },
  { id: 't19', name: { ru: 'Bon! А.Дониша', uz: 'Bon! A.Donish' }, address: { ru: 'ул. Ахмада Дониша, 80', uz: 'Axmad Donish ko\'chasi, 80' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 99 010 74 59', coordinates: { lat: 41.3655, lng: 69.2855 } },
  { id: 't20', name: { ru: 'Bon! Сайрам', uz: 'Bon! Sayram' }, address: { ru: 'ул. Сайрам, 26/14', uz: 'Sayram ko\'chasi, 26/14' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 974 99 22', coordinates: { lat: 41.3255, lng: 69.3155 } },
  { id: 't21', name: { ru: 'Bon! Нуронийлар', uz: 'Bon! Nuroniylar' }, address: { ru: 'ул. Нуронийлар, 2', uz: 'Nuroniylar ko\'chasi, 2' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 77 311 82 82', coordinates: { lat: 41.3055, lng: 69.2655 } },
  { id: 't22', name: { ru: 'Bon! А.Темура 118А', uz: 'Bon! A.Temur 118A' }, address: { ru: 'пр-т Амира Темура, 118А', uz: 'Amir Temur shoh ko\'chasi, 118A' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 77 311 82 84', coordinates: { lat: 41.3455, lng: 69.2855 } },
  { id: 't23', name: { ru: 'Bon! Бабура 174', uz: 'Bon! Bobur 174' }, address: { ru: 'ул. Бабура, 174', uz: 'Bobur ko\'chasi, 174' }, workingHours: { ru: '10:00 - 22:00', uz: '10:00 - 22:00' }, phone: '+998 95 845 17 19', coordinates: { lat: 41.2655, lng: 69.2455 } },
  { id: 't24', name: { ru: 'Bon! Заргалик', uz: 'Bon! Zargarlik' }, address: { ru: 'ул. Заргалик, 10А', uz: 'Zargarlik ko\'chasi, 10A' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 124 43 41', coordinates: { lat: 41.2555, lng: 69.2055 } },
  { id: 't25', name: { ru: 'Bon! Кичик Бешагач', uz: 'Bon! Kichik Beshog\'och' }, address: { ru: 'ул. Кичик Бешагач, 124/1', uz: 'Kichik Beshog\'och ko\'chasi, 124/1' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 77 798 88 97', coordinates: { lat: 41.2855, lng: 69.2655 } },
  { id: 't26', name: { ru: 'Bon! Аккурган 33', uz: 'Bon! Oqqo\'rg\'on 33' }, address: { ru: 'ул. Аккурган, 33', uz: 'Oqqo\'rg\'on ko\'chasi, 33' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 150 15 50', coordinates: { lat: 41.3255, lng: 69.2955 } },

  // Регионы
  { id: 'r1', name: { ru: 'Bon! Бухара', uz: 'Bon! Buxoro' }, address: { ru: 'Бухара, ул. Б. Накшбанда, 4', uz: 'Buxoro, B. Naqshband ko\'chasi, 4' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 795 25 21', coordinates: { lat: 39.7747, lng: 64.4286 } },
  { id: 'r2', name: { ru: 'Bon! Андижан', uz: 'Bon! Andijon' }, address: { ru: 'Андижан, ул. Машраба, 62В', uz: 'Andijon, Mashrab ko\'chasi, 62V' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 959 50 91', coordinates: { lat: 40.7821, lng: 72.3442 } },
  { id: 'r3', name: { ru: 'Bon! Самарканд', uz: 'Bon! Samarqand' }, address: { ru: 'Самарканд, ул. Амира Темура, 24', uz: 'Samarqand, Amir Temur ko\'chasi, 24' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 77 736 36 87', coordinates: { lat: 39.6542, lng: 66.9597 } },
  { id: 'r4', name: { ru: 'Bon! Чирчик', uz: 'Bon! Chirchiq' }, address: { ru: 'Чирчик, ул. Амира Тимура, 69', uz: 'Chirchiq, Amir Temur ko\'chasi, 69' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 77 798 88 79', coordinates: { lat: 41.4689, lng: 69.5822 } }
];
