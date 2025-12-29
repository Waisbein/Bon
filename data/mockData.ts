
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
  {
    id: 'b1',
    name: { ru: 'Bon! Мирабад', uz: 'Bon! Mirobod' },
    address: { ru: 'ул. Мирабад, 21', uz: 'Mirabod ko\'chasi, 21' },
    workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' },
    phone: '+998 71 200 03 44',
    coordinates: { lat: 41.2985, lng: 69.2745 }
  },
  {
    id: 'b2',
    name: { ru: 'Bon! Шота Руставели', uz: 'Bon! Shota Rustaveli' },
    address: { ru: 'ул. Шота Руставели, 15', uz: 'Shota Rustaveli ko\'chasi, 15' },
    workingHours: { ru: '08:00 - 23:00', uz: '08:00 - 23:00' },
    phone: '+998 71 200 03 45',
    coordinates: { lat: 41.2855, lng: 69.2555 }
  }
];
