
export type Language = 'ru' | 'uz';

export interface MenuItem {
  id: string;
  name: { ru: string; uz: string };
  description?: { ru: string; uz: string };
  longDescription?: { ru: string; uz: string }; // Состав или подробное описание
  allergens?: { ru: string; uz: string }; // Аллергены
  volumes?: { [size: string]: string }; // Объемы (напр. Petit: 200мл)
  price: number | { [size: string]: number };
  category: 'coffee' | 'bakery' | 'breakfast' | 'dessert' | 'decaf' | 'news' | 'serving';
  section?: string; // Поле для специфического именования раздела
  image: string;
}

export interface Branch {
  id: string;
  name: { ru: string; uz: string };
  address: { ru: string; uz: string };
  workingHours: { ru: string; uz: string };
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export type View = 'home' | 'menu' | 'branches';
