
import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/mockData';
import { Language, MenuItem } from '../types';

interface MenuDetailProps {
  lang: Language;
}

export const MenuDetail: React.FC<MenuDetailProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const t = {
    title: lang === 'ru' ? 'Наше Меню' : 'Bizning Menyu',
    all: lang === 'ru' ? 'Все' : 'Hammasi',
    coffee: lang === 'ru' ? 'Кофе' : 'Qahva',
    bakery: lang === 'ru' ? 'Выпечка' : 'Pishiriqlar',
    breakfast: lang === 'ru' ? 'Завтраки' : 'Nonushtalar',
    dessert: lang === 'ru' ? 'Десерты' : 'Desertlar',
    currency: lang === 'ru' ? 'сум' : 'so\'m',
    altMilk: lang === 'ru' 
      ? 'Любой из видов кофе доступен на альтернативном молоке: кокосовое, миндальное, овсяное' 
      : 'Har qanday turdagi qahva muqobil sutda tayyorlanishi mumkin: kokos, bodom, suli suti',
    composition: lang === 'ru' ? 'Описание и состав' : 'Tavsif va tarkibi',
    volume: lang === 'ru' ? 'Объем' : 'Hajmi',
    back: lang === 'ru' ? 'Назад' : 'Orqaga'
  };

  const categories = [
    { id: 'all', name: t.all },
    { id: 'coffee', name: t.coffee },
    { id: 'bakery', name: t.bakery },
    { id: 'breakfast', name: t.breakfast },
    { id: 'dessert', name: t.dessert },
  ];

  const filteredItems = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const renderPrice = (price: number | { [size: string]: number }) => {
    if (typeof price === 'number') {
      return (
        <span className="text-[#9a644d] font-bold text-sm">
          {price.toLocaleString()} {t.currency}
        </span>
      );
    }
    
    return (
      <div className="flex flex-col gap-0.5">
        {Object.entries(price).map(([size, value]) => (
          <div key={size} className="flex justify-between items-center gap-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-tighter">{size}</span>
            <span className="text-[#9a644d] font-bold text-[13px]">
              {value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn relative">
      <div className="sticky top-0 z-10 bg-[#faf9f6] pt-4 pb-2 px-4 shadow-sm">
        <h2 className="text-2xl font-serif text-[#9a644d] mb-4">{t.title}</h2>
        <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#9a644d] text-white'
                  : 'bg-white border border-[#9a644d]/20 text-[#9a644d]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 pb-24">
        {activeCategory === 'coffee' && (
          <div className="bg-[#9a644d]/5 p-3 rounded-xl border border-[#9a644d]/10 mb-2">
            <p className="text-[11px] italic text-[#9a644d] leading-tight text-center">
              {t.altMilk}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer flex min-h-[110px]"
            >
              <div className="w-1/3 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name[lang]} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-[#2d2d2d] text-base leading-tight">{item.name[lang]}</h3>
                  {item.description && (
                    <p className="text-[10px] text-gray-500 line-clamp-2 mt-0.5 italic">{item.description[lang]}</p>
                  )}
                </div>
                <div className="flex justify-end items-end mt-1">
                  {renderPrice(item.price)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно деталей товара */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-t-3xl overflow-hidden animate-slideUp max-h-[90vh] flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img src={selectedItem.image} alt={selectedItem.name[lang]} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 left-4 bg-black/20 backdrop-blur text-white p-2 rounded-full hover:bg-black/40 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-serif text-[#9a644d]">{selectedItem.name[lang]}</h3>
              </div>

              {selectedItem.longDescription && (
                <div className="mb-6">
                  <h4 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">{t.composition}</h4>
                  <p className="text-[#2d2d2d] text-sm leading-relaxed opacity-80">
                    {selectedItem.longDescription[lang]}
                  </p>
                </div>
              )}

              {selectedItem.volumes && (
                <div className="mb-6">
                  <h4 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">{t.volume}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedItem.volumes).map(([size, vol]) => (
                      <div key={size} className="flex items-center justify-between p-3 bg-[#faf9f6] rounded-xl border border-[#9a644d]/10">
                        <span className="text-xs font-semibold text-gray-500">{size}</span>
                        <span className="text-sm font-bold text-[#9a644d]">{vol}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-[#9a644d]/10">
                <div className="flex flex-col gap-2">
                  {typeof selectedItem.price === 'number' ? (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm font-medium">Цена:</span>
                      <span className="text-xl font-bold text-[#9a644d]">{selectedItem.price.toLocaleString()} {t.currency}</span>
                    </div>
                  ) : (
                    Object.entries(selectedItem.price).map(([size, val]) => (
                      <div key={size} className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm font-medium">{size}:</span>
                        <span className="text-lg font-bold text-[#9a644d]">{val.toLocaleString()} {t.currency}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button 
                onClick={() => setSelectedItem(null)}
                className="w-full mt-8 bg-[#9a644d] text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity active:scale-[0.98]"
              >
                {t.back}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
