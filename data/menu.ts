import { MenuItem, Branch } from '../types';

const ASSETS_BASE_URL = "https://raw.githubusercontent.com/Waisbein/Waisbein/main/public/menu";
const NEWS_FOLDER = "1.%D0%9D%D0%BE%D0%B2%D0%B8%D0%BD%D0%BA%D0%B8";
const IMG_BASE = '/menu';

export const menuItems: MenuItem[] = [
  ${newItemString},
  ${newItemString},
  ${newItemString},
  ${newItemString},
  ${newItemString},
  ${newItemString},
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
    description: { ru: 'Тёплые рикотники с ванильным мороженым', uz: 'Vanilli muzqaymoq bilan issiq rikotniklar' },
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

export const branches: Branch[] = [];
