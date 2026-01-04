
import { MenuItem, Branch } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // НОВАЯ ПОДАЧА
  {
    id: 's1',
    name: { ru: 'Скрэмбл с лососем в круассане', uz: 'Kruassandagi lososli skrembl' },
    description: { ru: 'Круассан, копчёный лосось, скрэмбл, соус песто', uz: 'Kruassan, dudlangan losos, skrembl, pesto sousi' },
    longDescription: {
      ru: 'Круассан, копчёный лосось, скрэмбл, соус песто. Подаётся с микс-салатом под зеленым маслом из укропа.',
      uz: 'Kruassan, dudlangan losos, skrembl, pesto sousi. Shivitli yashil moy bilan miks-salat hamrohligida tortiladi.'
    },
    allergens: { ru: 'Яйцо, лосось, глютен, орех', uz: 'Tuxum, losos, glyuten, yong\'oq' },
    price: 82000,
    category: 'serving',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 's2',
    name: { ru: 'Салат "Niçoise"', uz: '"Niçoise" salati' },
    description: { ru: 'Легендарный французский салат с тунцом', uz: 'Tyunets bilan afsonaviy frantsuz salati' },
    longDescription: {
      ru: 'Легендарный французский салат с тунцом, отварными перепелиными яйцами, картофелем в мундире, фасолью, помидорами черри, красным луком, каперсами и маслинами. Подаётся на подушке из микс-салата под оливковым маслом, с соусом из анчоусов и зернистой горчицей.',
      uz: 'Tyunets, qaynatilgan bedana tuxumlari, po\'stlog\'i bilan qaynatilgan batches, loviya, cherri pomidorlari, qizil piyoz, kaperslar va zaytun bilan afsonaviy frantsuz salati. Zaytun moyi, anchous sousi va donador xantal bilan miks-salat ustida tortiladi.'
    },
    allergens: { ru: 'Тунец, яйцо', uz: 'Tyunets, tuxum' },
    price: 69000,
    category: 'serving',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 's3',
    name: { ru: 'Рикотник с мороженым', uz: 'Muzqaymoqli rikotnik' },
    description: { ru: 'Тёплые рикотники с ванильным мороженым', uz: 'Vanilli muzqaymoq bilan issiq rikotniklar' },
    longDescription: {
      ru: 'Тёплые рикотники на основе сыра "Рикотта" и манной крупы. Подаются с ванильным мороженым, ягодным джемом, гранолой и голубикой.',
      uz: '"Rikotta" pishlog\'i va manniy yormasi asosidagi issiq rikotniklar. Vanilli muzqaymoq, rezavorli jem, granola va ko\'k meva bilan tortiladi.'
    },
    allergens: { ru: 'Лактоза, яйцо, ягоды', uz: 'Laktosa, tuxum, rezavorlar' },
    price: 55000,
    category: 'serving',
    image: 'https://images.unsplash.com/photo-1541512416146-3cf58d6b27cc?q=80&w=400&auto=format&fit=crop'
  },

  // ЗАВТРАКИ
  {
    id: 'br1',
    name: { ru: 'Чиа-пудинг с сезонными ягодами и фруктами', uz: 'Mavsumiy rezavorlar va mevalar bilan chia-puding' },
    description: { ru: 'Семена чиа на кокосовом молоке с манго', uz: 'Mango bilan kokos sutidagi chia urug\'lari' },
    longDescription: { ru: 'Семена чиа на кокосовом молоке, пюре манго, сезонные ягоды и фрукты.', uz: 'Kokos sutidagi chia urug\'lari, mango pyuresi, mavsumiy rezavorlar va mevalar.' },
    allergens: { ru: 'цитрус', uz: 'sitrus' },
    price: 42000,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'br10',
    name: { ru: 'Континентальный завтрак', uz: 'Kontinental nonushta' },
    description: { ru: 'Круассан, авокадо, лосось, сыр Бри и скрэмбл', uz: 'Kruassan, avokado, losos, Bri pishlog\'i va skrembl' },
    longDescription: { ru: 'Круассан, авокадо, копчёный лосось, сыр «Бри», томаты черри, скрэмбл. Подаётся с микс-салатом под зелёным маслом из укропа.', uz: 'Kruassan, avokado, dudlangan losos, "Bri" pishlog\'i, cherri pomidorlari, skrembl. Shivitli yashil moy bilan miks-salat hamrohligida tortiladi.' },
    allergens: { ru: 'лактоза, глютен, горчица, лосось', uz: 'laktosa, glyuten, xantal, losos' },
    price: 80000,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=400&auto=format&fit=crop'
  },

  // КОФЕ (ОБНОВЛЕНО ПО СКРИНШОТУ)
  {
    id: 'c1',
    name: { ru: 'Эспрессо', uz: 'Espresso' },
    price: { 'Petit': 20000, 'Grand': 23000 },
    volumes: { 'Petit': '30 мл', 'Grand': '60 мл' },
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'c2',
    name: { ru: 'Американо', uz: 'Amerikano' },
    price: { 'Petit': 21000, 'Grand': 24000 },
    volumes: { 'Petit': '200 мл', 'Grand': '300 мл' },
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'c3',
    name: { ru: 'Капучино', uz: 'Kapuchino' },
    price: { 'Petit': 25000, 'Grand': 31000, 'Extra Grand': 39000 },
    volumes: { 'Petit': '200 мл', 'Grand': '300 мл', 'Extra Grand': '450 мл' },
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'c4',
    name: { ru: 'Латте', uz: 'Latte' },
    price: { 'Grand': 27000, 'Extra Grand': 37000 },
    volumes: { 'Grand': '300 мл', 'Extra Grand': '450 мл' },
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'c5',
    name: { ru: 'Флэт уайт', uz: 'Flet uayt' },
    price: { 'Petit': 29000 },
    volumes: { 'Petit': '200 мл' },
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1577968897866-be5025bc3992?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'c6',
    name: { ru: 'Раф', uz: 'Raf' },
    description: { ru: 'карамельный / ванильный / лесной орех', uz: 'karamelli / vanilli / o\'rmon yong\'og\'i' },
    price: { 'Grand': 42000 },
    volumes: { 'Grand': '300 мл' },
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'c7',
    name: { ru: 'Сироп на выбор', uz: 'Tanlov bo\'yicha sirop' },
    price: 7000,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=400&auto=format&fit=crop'
  },

  // БЕЗ КОФЕИНА
  {
    id: 'dc1',
    name: { ru: 'Эспрессо (Без кофеина)', uz: 'Espresso (Kofeinsiz)' },
    price: { 'Petit': 21000, 'Grand': 24000 },
    volumes: { 'Petit': '30 мл', 'Grand': '60 мл' },
    category: 'decaf',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=400&auto=format&fit=crop'
  },

  // ВЫПЕЧКА
  {
    id: 'b1',
    name: { ru: 'Круассан классический', uz: 'Klassik kruassan' },
    price: 15000,
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400&auto=format&fit=crop'
  }
];

export const BRANCHES: Branch[] = [
  { id: 't1', name: { ru: 'Bon! Фидокор', uz: 'Bon! Fidokor' }, address: { ru: 'ул. Фидокор, 40', uz: 'Fidokor ko\'chasi, 40' }, workingHours: { ru: '07:30 - 22:00', uz: '07:30 - 22:00' }, phone: '+998 78 150 18 34', coordinates: { lat: 41.2995, lng: 69.2825 } },
  { id: 't2', name: { ru: 'Bon! Укчи', uz: 'Bon! Ukchi' }, address: { ru: 'ул. Укчи, 5', uz: 'O\'qchi ko\'chasi, 5' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 855 01 59', coordinates: { lat: 41.3111, lng: 69.2522 } }
];
