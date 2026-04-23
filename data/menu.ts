
import { MenuItem, Branch } from '../types';

const ASSETS_BASE_URL = "https://raw.githubusercontent.com/Waisbein/Waisbein/main/public/menu";
const NEWS_FOLDER = "1.%D0%9D%D0%BE%D0%B2%D0%B8%D0%BD%D0%BA%D0%B8";
const IMG_BASE = '/menu';

export const menuItems: MenuItem[] = [
  // 1. НОВИНКИ
  {
    id: `news-1`,
    name: { ru: 'Салат с говядиной', uz: 'Mol go\'shtli salat' },
    longDescription: {
      ru: 'Нежные ломтики говядины, запечённая свёкла, спелые томаты и микс салат. Подаётся под лёгким имбирным соусом и оливковым маслом.',
      uz: 'Yumshoq mol go\'shti bo\'laklari, pishirilgan lavlagi, pishgan pomidor va miks salat. Yengil zanjabil sousi va zaytun moyi bilan tortiladi.'
    },
    allergens: { ru: 'Горчица, соя', uz: 'Xantal, soya' },
    price: 76000,
    category: 'news',
    section: '1. Новинки',
    image: `${ASSETS_BASE_URL}/${NEWS_FOLDER}/SalatSGovyadinoy.png`
  },
  {
    id: `news-2`,
    name: { ru: 'Фруктовый салат', uz: 'Mevali salat' },
    longDescription: {
      ru: 'Свежие фрукты: банан, киви, яблоко, апельсин, голубика, клубника. Подаётся под соусом на основе свежего сока апельсина, глюкозы, острого соуса "Шрирача", растительного и оливкового масла "Цитронет" и украшается сахарной пудрой.',
      uz: 'Yangi mevalar: banan, kivi, olma, apelsin, ko\'k meva, qulupnay. Yangi apelsin sharbati, glyukoza, "Shriracha" achchiq sousi, o\'simlik va zaytun moyi asosidagi "Sitronet" sousi bilan tortiladi va shakar upasi bilan bezatiladi.'
    },
    allergens: { ru: 'Цитрус, клубника, киви', uz: 'Sitrus, qulupnay, kivi' },
    price: 45000,
    category: 'news',
    section: '1. Новинки',
    image: `${ASSETS_BASE_URL}/${NEWS_FOLDER}/FruktoviySalat.png`
  },
  {
    id: `news-3`,
    name: { ru: 'Салат со свеклой', uz: 'Lavlagili salat' },
    longDescription: {
      ru: 'Нежная запечённая свёкла, свежие дольки апельсина, козий сыр микс салат, крутоны, кедровые орехи. Подаётся под заправкой на основе свежевыжатого апельсинового сока "Цитронет" и оливковым маслом.',
      uz: 'Yumshoq pishirilgan lavlagi, yangi аpelsin bo\'laklari, echki pishlog\'i miks salat, krutonlar, kedr yong\'oqlari. Yangi siqilgan аpelsin sharbati asosidagi "Sitronet" sousi va zaytun moyi bilan tortiladi.'
    },
    allergens: { ru: 'Лактоза, глютен, орехи, цитрус', uz: 'Laktosa, glyuten, yong\'oqlar, sitrus' },
    price: 65000,
    category: 'news',
    section: '1. Новинки',
    image: `${ASSETS_BASE_URL}/${NEWS_FOLDER}/SalatSoSvekloy.png`
  },
  {
    id: `news-4`,
    name: { ru: 'Луковый суп', uz: 'Piyozli sho\'rva' },
    longDescription: {
      ru: 'Карамелизированный лук, томлённый в насыщенном курином бульоне. Подаётся под гренкой с расплавленным сыром «Гауда», пармезаном и зелёным маслом из укропа.',
      uz: 'To\'yingan tovuq bulyonida dimlangan karamellangan piyoz. Erigan "Gauda" pishlog\'i, parmezan va shivitli yashil moyли grenka bilan tortiladi.'
    },
    allergens: { ru: 'лактоза, орех', uz: 'laktosa, yong\'oq' },
    price: 35000,
    category: 'news',
    section: '1. Новинки',
    image: `${ASSETS_BASE_URL}/${NEWS_FOLDER}/LukoviySup.png`
  },
  {
    id: `news-5`,
    name: { ru: 'Круассан с риетом из лосося', uz: 'Lososli риetli круассан' },
    longDescription: {
      ru: 'Французский круассан, наполненный нежным риетом (паштетом) из лосося и пикантным соусом тар-тар.',
      uz: 'Lososdan tayyorlangan mayin riet (pashtet) va pikant tar-tar sousi bilan to\'ldirilgan frantsuz kruassani.'
    },
    allergens: { ru: 'Глютен, рыба, яйцо, лактоза, горчица', uz: 'Glyuten, baliq, tuxum, laktosa, xantal' },
    price: 45000,
    category: 'news',
    section: '1. Новинки',
    image: `${ASSETS_BASE_URL}/${NEWS_FOLDER}/KruassanSRietomIzLososya.png`
  },

  // ЗАВТРАКИ
  {
    id: 'br-1',
    name: { ru: 'Чиа-пудинг с сезонными ягодами и фруктами', uz: 'Mavsumiy rezavorlar va mevalar bilan chia-puding' },
    longDescription: { ru: 'Семена чиа на кокосовом молоке, пюре манго, сезонные ягоды и фрукты.', uz: 'Kokos sutidagi chia urug\'lari, mango pyuresi, mavsumiy rezavorlar va mevalar.' },
    allergens: { ru: 'цитрус', uz: 'sitrus' },
    price: 42000,
    category: 'breakfast',
    image: `${IMG_BASE}/3. Завтраки/ChiaPuding.webp`
  },
  {
    id: 'br-2',
    name: { ru: 'Гранола классическая', uz: 'Klassik granola' },
    longDescription: { ru: 'Хрустящая гранола with сухофруктами и орехами. Подается с натуральным йогуртом.', uz: 'Quritilgan mevalar va yong\'oqlar bilan karsillaydigan granola. Tabiiy yogurt bilan tortiladi.' },
    allergens: { ru: 'лактоза, орехи, мед, глютен', uz: 'laktosa, yong\'oqlar, asal, glyuten' },
    price: 45000,
    category: 'breakfast',
    image: `${IMG_BASE}/3. Завтраки/GranolaKlassicheskaya.webp`
  },
  {
    id: 'br-3',
    name: { ru: 'Каша 5 злаков на кокосовом молоке', uz: 'Kokos sutida 5 xil yormadan tayyorlangan bo\'tqa' },
    longDescription: { ru: 'Каша из 5 злаков (состоят из смеси резаных круп овсяной, пшеничной, ячменной, ржаной и кукурузной) на кокосовом молоке with сезонными ягодами.', uz: '5 xil yormadan (suli, bug\'doy, arpa, javdar va makkajo\'xori) kokos sutida tayyorlangan bo\'tqa, mavsumiy rezavorlar bilan.' },
    allergens: { ru: 'глютен', uz: 'glyuten' },
    price: 45000,
    category: 'breakfast',
    image: `${IMG_BASE}/3. Завтраки/Kasha5ZlakovNaKokosovom.webp`
  },
  {
    id: 'br-4',
    name: { ru: 'Каша 5 злаков с фруктами на молоке', uz: 'Sutda mevalar билан 5 xil yormadan tayyorlangan bo\'tqa' },
    longDescription: { ru: 'Каша из 5 злаков (состоят из смеси резаных круп овсяной, пшеничной, ячменной, ржаной и кукурузной) на молоке с фруктами и с сезонными ягодами.', uz: '5 xil yormadan (suli, bug\'doy, arpa, javdar va makkajo\'xori) sutda tayyorlangan bo\'tqa, mevalar va mavsumiy rezavorlar bilan.' },
    allergens: { ru: 'глютен, лактоза и цитрус', uz: 'glyuten, laktosa va sitrus' },
    price: 40000,
    category: 'breakfast',
    image: `${IMG_BASE}/3. Завтраки/Kasha5ZlakovNaMoloke.webp`
  },
  {
    id: 'br-5',
    name: { ru: 'Французский тост с ванильным мороженым', uz: 'Vanilli muzqaymoq bilan frantsuz tosti' },
    longDescription: { ru: 'Хлеб «Бриошь», пропитанный французской заправкой, обжаренный на сливочном масле. Подаётся с ягодным джемом и ванильным мороженым.', uz: 'Frantsuzcha sousga botirilgan va sariyog\'da qovurilgan "Briosh" noni. Rezavorli jem va vanilli muzqaymoq bilan tortiladi.' },
    allergens: { ru: 'яйцо, лактоза, глютен, мед', uz: 'tuxum, laktosa, glyuten, asal' },
    price: 33000,
    category: 'breakfast',
    image: `${IMG_BASE}/3. Завтраки/FrantsuzskiyTostSVanilnym.webp`
  },
  {
    id: 'br-6',
    name: { ru: 'Французский тост с карамелизированным яблоком и ванильным мороженым', uz: 'Karamellangan olma va vanilli muzqaymoq bilan frantsuz tosti' },
    longDescription: { ru: 'Хлеб «Бриошь», пропитанный французской заправкой, обжаренный на сливочном масле. Подаётся с карамелизированными яблоками, голубикой и ванильным мороженым.', uz: 'Frantsuzcha sousga botirilgan va sariyog\'da qovurilgan "Briosh" noni. Karamellangan olmalar, ko\'k mevalar va vanilli muzqaymoq bilan tortiladi.' },
    allergens: { ru: 'яйцо, лактоза, глютен', uz: 'tuxum, laktosa, glyuten' },
    price: 33000,
    category: 'breakfast',
    image: `${IMG_BASE}/3. Завтраки/FrantsuzskiyTostSYablokom.webp`
  },
  {
    id: 'br-7',
    name: { ru: 'Классический завтрак Bon! с говяжьей ветчиной', uz: 'Mol go\'shti vetchinasi bilan Bon! klassik nonushtasi' },
    longDescription: { ru: 'Два жареных яйца, артизанский льняной хлеб, запечённые томаты и грибы. Подаётся с микс-салатом под зелёным маслом из укропа.', uz: 'Ikkita qovurilgan tuxum, artizan zig\'ir noni, pishirilgan pomidor va qo\'ziqorinlar. Shivitli yashil moy bilan miks-salat hamrohligida tortiladi.' },
    allergens: { ru: 'яйцо, семечки подсолнечника, грибы, глютен', uz: 'tuxum, kungaboqar urug\'lari, qo\'ziqorinlar, glyuten' },
    price: 50000,
    category: 'breakfast',
    image: `${IMG_BASE}/3. Завтраки/KlassicheskiyZavtrakVetchina.webp`
  },
  {
    id: 'br-8',
    name: { ru: 'Классический завтрак Bon! с говяжьими колбасками', uz: 'Mol go\'shtli kolbasalar bilan Bon! klassik nonushtasi' },
    longDescription: { ru: 'Два жареных яйца, артизанский льняной хлеб, запечённые томаты и грибы. Подаётся с микс-салатом под зелёным маслом из укропа.', uz: 'Ikkita qovurilgan tuxum, artizan zig\'ir noni, pishirilgan pomidor va qo\'ziqorinlar. Shivitli yashil moy bilan miks-salat hamrohligida tortiladi.' },
    allergens: { ru: 'яйцо, семечки подсолнечника, грибы, глютен', uz: 'tuxum, kungaboqar urug\'lari, qo\'ziqorinlar, glyuten' },
    price: 50000,
    category: 'breakfast',
    image: `${IMG_BASE}/3. Завтраки/KlassicheskiyZavtrakKolbaski.webp`
  },
  {
    id: 'br-9',
    name: { ru: 'Классический завтрак Bon! с куриным филе', uz: 'Tovuq filesi bilan Bon! klassik nonushtasi' },
    longDescription: { ru: 'Два жареных яйца, артизанский льняной хлеб, запечённые томаты и грибы. Подаётся with микс-салатом под зелёным маслом из укропа.', uz: 'Ikkita qovurilgan tuxum, artizan zig\'ir noni, pishirilgan pomidor va qo\'ziqorinlar. Shivitli yashil moy bilan miks-salat hamrohligida tortiladi.' },
    allergens: { ru: 'яйцо, семечки подсолнечника, грибы, глютен', uz: 'tuxum, kungaboqar urug\'lari, qo\'ziqorinlar, glyuten' },
    price: 50000,
    category: 'breakfast',
    image: `${IMG_BASE}/3. Завтраки/KlassicheskiyZavtrakKuritsa.webp`
  },
  {
    id: 'br-10',
    name: { ru: 'Континентальный завтрак', uz: 'Kontinental nonushta' },
    longDescription: { ru: 'Круассан, авокадо, копчёный лосось, сыр «Бри», томаты черри, скрэмбл. Подаётся с микс-салатом под зелёным маслом из укропа.', uz: 'Kruassan, avokado, dudlangan losos, "Bri" pishlog\'i, cherri pomidorlari, skrembl. Shivitli yashil moy bilan miks-salat hamrohligida tortiladi.' },
    allergens: { ru: 'лактоза, глютен, горчица, лосось', uz: 'laktosa, glyuten, xantal, losos' },
    price: 80000,
    category: 'breakfast',
    image: `${IMG_BASE}/3. Завтраки/KontinentalniyZavtrak.webp`
  },

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
    image: `${IMG_BASE}/2.Новая подача/SkremblSLososemVKruassane.webp`
  },
  {
    id: 's2',
    name: { ru: 'Салат "Niçoise"', uz: '"Niçoise" salati' },
    description: { ru: 'Легендарный французский салат с тунцом', uz: 'Tyunets bilan afsonaviy frantsuz salati' },
    longDescription: {
      ru: 'Легендарный французский салат с тунцом, отварными перепелиными яйцами, картофелем в мундире, фасолью, помидорами черри, красным луком, каперсами и маслинами. Подаётся на подушке из микс-салата под оливковым маслом, с соусом из анчоусов и зернистой горчицей.',
      uz: 'Tyunets, qaynatilgan bedana tuxumlari, po\'stlog\'i bilan qaynatilgan batches, loviya, cherri pomidorlari, qizil piyoz, kaperslar va zaytun com afsonaviy frantsuz salati. Zaytun moyi, anchous sousi va donador xantal bilan miks-salat ustida tortiladi.'
    },
    allergens: { ru: 'Тунец, яйцо', uz: 'Tyunets, tuxum' },
    price: 69000,
    category: 'serving',
    image: `${IMG_BASE}/2.Новая подача/SalatNicoise.webp`
  },
  {
    id: 's3',
    name: { ru: 'Рикотник с мороженым', uz: 'Muzqaymoqli rikotnik' },
    description: { ru: 'Тёплые рикотники с ванильным мороженым', uz: 'Vanilli muzqaymoq билан issiq rikotnikлар' },
    longDescription: {
      ru: 'Тёплые рикотники на основе сыра "Рикотта" и манной крупы. Подаются с ванильным мороженым, ягодным джемом, гранолой и голубикой.',
      uz: '"Rikotta" pishlog\'i va manniy yormasi asosidagi issiq rikotniklar. Vanilli muzqaymoq, rezavorli jem, granola va ko\'k meva com tortiladi.'
    },
    allergens: { ru: 'Лактоза, яйцо, ягоды', uz: 'Laktosa, tuxum, rezavorlar' },
    price: 55000,
    category: 'serving',
    image: `${IMG_BASE}/2.Новая подача/RikotnikSMorozhenym.webp`
  },

  // КОФЕ
  {
    id: 'c1',
    name: { ru: 'Эспрессо', uz: 'Espresso' },
    price: { 'Petit': 20000, 'Grand': 23000 },
    volumes: { 'Petit': '30 мл', 'Grand': '60 мл' },
    category: 'coffee',
    image: `${IMG_BASE}/Кофе/espresso.webp`
  },
  {
    id: 'c2',
    name: { ru: 'Американо', uz: 'Amerikano' },
    price: { 'Petit': 21000, 'Grand': 24000 },
    volumes: { 'Petit': '200 мл', 'Grand': '300 мл' },
    category: 'coffee',
    image: `${IMG_BASE}/Кофе/amerikano.webp`
  },
  {
    id: 'c3',
    name: { ru: 'Капучино', uz: 'Kapuchino' },
    price: { 'Petit': 25000, 'Grand': 31000, 'Extra Grand': 39000 },
    volumes: { 'Petit': '200 мл', 'Grand': '300 мл', 'Extra Grand': '450 мл' },
    category: 'coffee',
    image: `${IMG_BASE}/Кофе/kapuchino.webp`
  },
  {
    id: 'c4',
    name: { ru: 'Латте', uz: 'Latte' },
    price: { 'Grand': 27000, 'Extra Grand': 37000 },
    volumes: { 'Grand': '300 мл', 'Extra Grand': '450 мл' },
    category: 'coffee',
    image: `${IMG_BASE}/Кофе/latte.webp`
  },
  {
    id: 'c5',
    name: { ru: 'Флэт уайт', uz: 'Flet uayt' },
    price: { 'Petit': 29000 },
    volumes: { 'Petit': '200 мл' },
    category: 'coffee',
    image: `${IMG_BASE}/Кофе/fletuayt.webp`
  },
  {
    id: 'c6',
    name: { ru: 'Раф', uz: 'Raf' },
    description: { ru: 'карамельный / ванильный / лесной орех', uz: 'karamelli / vanilli / o\'rmon yong\'og\'i' },
    price: { 'Grand': 42000 },
    volumes: { 'Grand': '300 мл' },
    category: 'coffee',
    image: `${IMG_BASE}/Кофе/raf.webp`
  },
  {
    id: 'c7',
    name: { ru: 'Сироп на выбор', uz: 'Tanlov bo\'yicha sirop' },
    description: { ru: 'фисташковый, ванильный, малиновый, ореховый, карамельный', uz: 'pistashkali, vanilli, malinali, yong\'oqli, karamelli' },
    longDescription: { 
      ru: 'Ванильный, малиновый, ореховый, карамельный, фисташковый.', 
      uz: 'Vanilli, malinali, yong\'oqli, karamelli, pistali.' 
    },
    price: 7000,
    category: 'coffee',
    image: `${IMG_BASE}/Кофе/sirop.webp`
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

export const branches: Branch[] = [
  // ТАШКЕНТ
  { id: 't1', name: { ru: 'Bon! Фидокор', uz: 'Bon! Fidokor' }, address: { ru: 'Ташкент, ул. Фидокор, 40', uz: 'Toshkent, Fidokor ko\'chasi, 40' }, workingHours: { ru: '07:30 - 22:00', uz: '07:30 - 22:00' }, phone: '+998 78 150 18 34', coordinates: { lat: 41.2995, lng: 69.2825 } },
  { id: 't2', name: { ru: 'Bon! Укчи', uz: 'Bon! Ukchi' }, address: { ru: 'Ташкент, ул. Укчи, 5', uz: 'Toshkent, O\'qchi ko\'chasi, 5' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 855 01 59', coordinates: { lat: 41.3111, lng: 69.2522 } },
  { id: 't3', name: { ru: 'Bon! Шота Руставели', uz: 'Bon! Shota Rustaveli' }, address: { ru: 'Ташкент, ул. Шота Руставели, 63', uz: 'Toshkent, Shota Rustaveli ko\'chasi, 63' }, workingHours: { ru: '07:30 - 22:00', uz: '07:30 - 22:00' }, phone: '+998 99 444 18 01', coordinates: { lat: 41.2842, lng: 69.2621 } },
  { id: 't4', name: { ru: 'Bon! Беруни', uz: 'Bon! Beruniy' }, address: { ru: 'Ташкент, Проспект Беруни, 12', uz: 'Toshkent, Beruniy ko\'chasi, 12' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 99 444 38 98', coordinates: { lat: 41.3402, lng: 69.2085 } },
  { id: 't5', name: { ru: 'Bon! Тараса Шевченко', uz: 'Bon! Tarasa Shevchenko' }, address: { ru: 'Ташкент, ул. Тараса Шевченко, 28', uz: 'Toshkent, Taras Shevchenko ko\'chasi, 28' }, workingHours: { ru: '07:30 - 22:00', uz: '07:30 - 22:00' }, phone: '+998 71 252 56 94', coordinates: { lat: 41.3001, lng: 69.2785 } },
  { id: 't6', name: { ru: 'Bon! Глинки', uz: 'Bon! Glinka' }, address: { ru: 'Ташкент, ул. Глинки, 46', uz: 'Toshkent, Glinka ko\'chasi, 46' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 77 391 58 50', coordinates: { lat: 41.2885, lng: 69.2612 } },
  { id: 't7', name: { ru: 'Bon! Буюк Ипак Йули', uz: 'Bon! Buyuk Ipak Yo\'li' }, address: { ru: 'Ташкент, Массив Буюк Ипак Йули, 44', uz: 'Toshkent, Buyuk Ipak Yo\'li, 44' }, workingHours: { ru: '07:30 - 22:00', uz: '07:30 - 22:00' }, phone: '+998 71 232 00 08', coordinates: { lat: 41.3265, lng: 69.3285 } },
  { id: 't8', name: { ru: 'Bon! Тимура Малика', uz: 'Bon! Temur Malik' }, address: { ru: 'Ташкент, ул. Тимура Малика, 3', uz: 'Toshkent, Temur Malik ko\'chasi, 3' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 99 444 38 09', coordinates: { lat: 41.3412, lng: 69.3456 } },
  { id: 't9', name: { ru: 'Bon! Малая Кольцевая', uz: 'Bon! Kichik halqa yo\'li' }, address: { ru: 'Ташкент, Малая кольцевая, 26', uz: 'Toshkent, Kichik halqa yo\'li, 26' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 77 448-01-91', coordinates: { lat: 41.2856, lng: 69.2145 } },
  { id: 't10', name: { ru: 'Bon! Катартал', uz: 'Bon! Qatortol' }, address: { ru: 'Ташкент, ул. Катартал, 28', uz: 'Toshkent, Qatortol ko\'chasi, 28' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 144-00-54', coordinates: { lat: 41.2912, lng: 69.2148 } },
  { id: 't11', name: { ru: 'Bon! Саёхат', uz: 'Bon! Sayohat' }, address: { ru: 'Ташкент, ул. Саёхат, 2', uz: 'Toshkent, Sayohat ko\'chasi, 2' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 99 370-11-01', coordinates: { lat: 41.3245, lng: 69.3142 } },
  { id: 't12', name: { ru: 'Bon! Аккурган (14А)', uz: 'Bon! Oqqo\'rg\'on (14A)' }, address: { ru: 'Ташкент, ул. Аккурган, 14А', uz: 'Toshkent, Oqqo\'rg\'on ko\'chasi, 14A' }, workingHours: { ru: '07:30 - 22:00', uz: '07:30 - 22:00' }, phone: '+998 99 444 18 04', coordinates: { lat: 41.3285, lng: 69.2942 } },
  { id: 't13', name: { ru: 'Bon! Чимкент', uz: 'Bon! Chimkent' }, address: { ru: 'Ташкент, ул. Чимкент, 21', uz: 'Toshkent, Chimkent ko\'chasi, 21' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 99 444-18-02', coordinates: { lat: 41.3045, lng: 69.2712 } },
  { id: 't14', name: { ru: 'Bon! Тепамасжид', uz: 'Bon! Tepamasjid' }, address: { ru: 'Ташкент, ул. Тепамасжид, 1', uz: 'Toshkent, Tepamasjid ko\'chasi, 1' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 134-13-83', coordinates: { lat: 41.3412, lng: 69.3112 } },
  { id: 't15', name: { ru: 'Bon! Амир Темур (72А)', uz: 'Bon! Amir Temur (72A)' }, address: { ru: 'Ташкент, Проспект Амира Темура, 72А', uz: 'Toshkent, Amir Temur shoh-ko\'chasi, 72A' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 017-30-30', coordinates: { lat: 41.3212, lng: 69.2812 } },
  { id: 't16', name: { ru: 'Bon! Истикбол', uz: 'Bon! Istiqlol' }, address: { ru: 'Ташкент, ул. Истикбол, 18', uz: 'Toshkent, Istiqlol ko\'chasi, 18' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 992-95-15', coordinates: { lat: 41.3112, lng: 69.2842 } },
  { id: 't17', name: { ru: 'Bon! Навои (22)', uz: 'Bon! Navoiy (22)' }, address: { ru: 'Ташкент, Проспект Алишера Навои, 22', uz: 'Toshkent, Alisher Navoiy shoh ko\'chasi, 22' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 71 241-20-67', coordinates: { lat: 41.3185, lng: 69.2512 } },
  { id: 't18', name: { ru: 'Bon! Бабура (6)', uz: 'Bon! Bobur (6)' }, address: { ru: 'Ташкент, ул. Бабура, 6', uz: 'Toshkent, Bobur ko\'chasi, 6' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 670-39-89', coordinates: { lat: 41.2912, lng: 69.2512 } },
  { id: 't19', name: { ru: 'Bon! Ахмада Дониша', uz: 'Bon! Ahmad Donish' }, address: { ru: 'Ташкент, ул. Ахмада Дониша, 80', uz: 'Toshkent, Ahmad Donish ko\'chasi, 80' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 99 010-74-59', coordinates: { lat: 41.3612, lng: 69.2912 } },
  { id: 't20', name: { ru: 'Bon! Сайрам', uz: 'Bon! Sayram' }, address: { ru: 'Ташкент, ул. Сайрам, 26/14', uz: 'Toshkent, Sayram ko\'chasi, 26/14' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 974-99-22', coordinates: { lat: 41.3345, lng: 69.3112 } },
  { id: 't21', name: { ru: 'Bon! Нуронийлар', uz: 'Bon! Nuroniylar' }, address: { ru: 'Ташкент, ул. Нуронийлар, 2', uz: 'Toshkent, Nuroniylar ko\'chasi, 2' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 77 311-82-82', coordinates: { lat: 41.3142, lng: 69.3012 } },
  { id: 't22', name: { ru: 'Bon! Амир Темур (118А)', uz: 'Bon! Amir Temur (118A)' }, address: { ru: 'Ташкент, Проспект Амира Темура, 118А', uz: 'Toshkent, Amir Temur shoh ko\'chasi, 118A' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 77 311-82-84', coordinates: { lat: 41.3412, lng: 69.2812 } },
  { id: 't23', name: { ru: 'Bon! Бабура (174)', uz: 'Bon! Bobur (174)' }, address: { ru: 'Ташкент, ул. Бабура, 174', uz: 'Toshkent, Bobur ko\'chasi, 174' }, workingHours: { ru: '10:00 - 22:00', uz: '10:00 - 22:00' }, phone: '+998 95 845-17-19', coordinates: { lat: 41.2585, lng: 69.2412 } },
  { id: 't24', name: { ru: 'Bon! Заргалик', uz: 'Bon! Zargarlik' }, address: { ru: 'Ташкент, ул. Заргалик, 10А', uz: 'Toshkent, Zargarlik ko\'chasi, 10A' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 124-43-41', coordinates: { lat: 41.2612, lng: 69.2112 } },
  { id: 't25', name: { ru: 'Bon! Кичик Бешагач', uz: 'Bon! Kichik Beshyog\'och' }, address: { ru: 'Ташкент, ул. Кичик Бешагач, 124/1', uz: 'Toshkent, Kichik Beshyog\'och ko\'chasi, 124/1' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 77 798-88-97', coordinates: { lat: 41.2842, lng: 69.2412 } },
  { id: 't26', name: { ru: 'Bon! Аккурган (33)', uz: 'Bon! Oqqo\'rg\'on (33)' }, address: { ru: 'Ташкент, ул. Аккурган, 33', uz: 'Toshkent, Oqqo\'rg\'on ko\'chasi, 33' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 150-15-50', coordinates: { lat: 41.3312, lng: 69.2942 } },

  // РЕГИОНЫ
  { id: 'r1', name: { ru: 'Bon! Бухара', uz: 'Bon! Buxoro' }, address: { ru: 'Бухара, ул. Бахауддина Накшбанда, 4', uz: 'Buxoro, Baxauddin Naqshaband ko\'chasi, 4' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 795-25-21', coordinates: { lat: 39.7747, lng: 64.4286 } },
  { id: 'r2', name: { ru: 'Bon! Андижан', uz: 'Bon! Andijon' }, address: { ru: 'Андижан, ул. Машраба, 62В', uz: 'Andijon, Mashrab ko\'chasi, 62B' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 95 959-50-91', coordinates: { lat: 40.7821, lng: 72.3442 } },
  { id: 'r3', name: { ru: 'Bon! Самарканд', uz: 'Bon! Samarqand' }, address: { ru: 'Самарканд, ул. Амира Темура, 24', uz: 'Samarqand, Amir Temur ko\'chasi, 24' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 77 736-36-87', coordinates: { lat: 39.6542, lng: 66.9597 } },
  { id: 'r4', name: { ru: 'Bon! Чирчик', uz: 'Bon! Chirchiq' }, address: { ru: 'Чирчик, ул. Амира Тимура, 69', uz: 'Chirchiq, Amir Temur ko\'chasi, 69' }, workingHours: { ru: '08:00 - 22:00', uz: '08:00 - 22:00' }, phone: '+998 77 798-88-79', coordinates: { lat: 41.4689, lng: 69.5822 } }
];
