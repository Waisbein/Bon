import React, { useState } from 'react';
import { Language, MenuItem } from '../types';

interface MenuDetailProps {
  lang: Language;
  initialCategory?: string;
  unavailableItems: string[];
  logEvent: (type: string, details: string) => void;
  selectedBranch: string | null;
  onChangeBranch: () => void;
  items: MenuItem[];
}

export const MenuDetail: React.FC<MenuDetailProps> = ({ 
  lang, 
  initialCategory = 'coffee', 
  unavailableItems = [], 
  logEvent,
  selectedBranch,
  onChangeBranch,
  items
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const t = {
    title: lang === 'ru' ? 'Наше Меню' : 'Bizning Menyu',
    serving: lang === 'ru' ? 'Новая подача' : 'Yangi tortiq',
    news: lang === 'ru' ? 'Новинки' : 'Yangiliklar',
    coffee: lang === 'ru' ? 'Кофе' : 'Qahva',
    decaf: lang === 'ru' ? 'Без кофеина' : 'Kofeinsiz',
    bakery: lang === 'ru' ? 'Выпечка' : 'Pishiriqlar',
    breakfast: lang === 'ru' ? 'Завтраки' : 'Nonushtalar',
    dessert: lang === 'ru' ? 'Десерты' : 'Desertlar',
    currency: lang === 'ru' ? 'сум' : 'so\'m',
    altMilk: lang === 'ru' 
      ? 'Любой из видов кофе доступен на альтернативном молоке: кокосовое, миндальное, овсяное' 
      : 'Har qanday turdagi qahva muqobil sutda tayyorlanishi mumkin: kokos, bodom, suli suti',
    composition: lang === 'ru' ? 'Описание и состав' : 'Tavsif va tarkibi',
    allergens: lang === 'ru' ? 'Аллергены' : 'Allergenlar',
    volume: lang === 'ru' ? 'Объем' : 'Hajmi',
    back: lang === 'ru' ? 'Назад' : 'Orqaga',
    search: lang === 'ru' ? 'Поиск...' : 'Qidirish...',
    nothingFound: lang === 'ru' ? 'Ничего не найдено' : 'Hech narsa topilmadi',
    changeBranch: lang === 'ru' ? '(изменить)' : '(o\'zgartirish)'
  };

  const categories = [
    { id: 'coffee', name: t.coffee },
    { id: 'breakfast', name: t.breakfast },
    { id: 'serving', name: t.serving },
    { id: 'news', name: t.news },
    { id: 'decaf', name: t.decaf },
    { id: 'bakery', name: t.bakery },
    { id: 'dessert', name: t.dessert },
  ];

  const filteredItems = items.filter(item => {
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      // Ищем совпадение в названии блюда
      const matchesName = item.name[lang].toLowerCase().includes(query);
      
      // Ищем совпадение в названии категории (например, по запросу "Кофе" выдаем весь раздел)
      const categoryObj = categories.find(c => c.id === item.category);
      const matchesCategory = categoryObj ? categoryObj.name.toLowerCase().includes(query) : false;

      return matchesName || matchesCategory;
    }
    return item.category === activeCategory;
  });

  const renderPrice = (price: number | { [size: string]: number }) => {
    if (typeof price === 'number') {
      return (
        <span className="text-[#9a644d] dark:text-[#b8866b] font-bold text-sm">
          {price.toLocaleString()} {t.currency}
        </span>
      );
    }
    
    return (
      <div className="flex flex-col gap-0.5">
        {Object.entries(price).map(([size, value]) => (
          <div key={size} className="flex justify-between items-center gap-2">
            <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-tighter">{size}</span>
            <span className="text-[#9a644d] dark:text-[#b8866b] font-bold text-[13px]">
              {value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const handleOpenItem = (item: MenuItem) => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
    logEvent('view_item', item.name[lang]);
    setSelectedItem(item);
  };

  const handleCloseItem = () => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
    setSelectedItem(null);
  };

  const isItemUnavailable = (item: MenuItem) => {
    // Проверяем наличие по имени (в любом языке для надежности)
    return unavailableItems.some(unavailable => 
      unavailable === item.name['ru'] || unavailable === item.name['uz']
    );
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn relative">
      <div className="sticky top-0 z-10 bg-[#faf9f6] dark:bg-[#121212] pt-4 px-4 shadow-sm border-b border-[#9a644d]/5 dark:border-white/5 transition-colors">
        
        {/* Branch Selector Button */}
        {selectedBranch && (
          <button 
            onClick={onChangeBranch}
            className="w-full py-2 bg-[#9a644d]/10 dark:bg-[#b8866b]/10 text-[#9a644d] dark:text-[#b8866b] text-center font-bold text-xs rounded-lg mb-2 uppercase tracking-widest hover:bg-[#9a644d]/20 transition-colors"
          >
            📍 {selectedBranch} <span className="opacity-70 normal-case">{t.changeBranch}</span>
          </button>
        )}

        {/* Search Input */}
        <div className="relative mb-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search}
            className="w-full bg-white dark:bg-[#1c1c1c] border border-[#9a644d]/20 dark:border-white/10 rounded-xl py-3 pl-10 pr-10 text-sm text-[#2d2d2d] dark:text-[#f0f0f0] placeholder-gray-400 focus:outline-none focus:border-[#9a644d] transition-all"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#9a644d] p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        {/* Categories (hidden when searching) */}
        {!searchQuery && (
          <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar animate-fadeIn">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#9a644d] dark:bg-[#b8866b] text-white'
                    : 'bg-white dark:bg-[#2a2a2a] border border-[#9a644d]/20 dark:border-white/10 text-[#9a644d] dark:text-[#e5e5e5]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 p-4 pb-32">
        {!searchQuery && (activeCategory === 'coffee' || activeCategory === 'decaf') && (
          <div className="bg-[#9a644d]/5 dark:bg-[#b8866b]/10 p-3 rounded-xl border border-[#9a644d]/10 dark:border-[#b8866b]/20 mb-2">
            <p className="text-[11px] italic text-[#9a644d] dark:text-[#b8866b] leading-tight text-center">
              {t.altMilk}
            </p>
          </div>
        )}

        {searchQuery && filteredItems.length === 0 && (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            {t.nothingFound}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isUnavailable = isItemUnavailable(item);
            return (
              <div 
                key={item.id} 
                onClick={() => !isUnavailable && handleOpenItem(item)}
                className={`bg-white dark:bg-[#1c1c1c] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer flex min-h-[110px] border border-transparent dark:border-white/5 relative ${isUnavailable ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <div className="w-1/3 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name[lang]} 
                    className="w-full h-full object-cover grayscale-[20%] dark:grayscale-0"
                  />
                  {isUnavailable && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                      <span className="text-white font-bold text-[10px] md:text-xs bg-red-600/90 px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
                        {lang === 'ru' ? 'Закончилось' : 'Tugadi'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="w-2/3 p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-[#2d2d2d] dark:text-[#f0f0f0] text-base leading-tight">{item.name[lang]}</h3>
                    {item.description && (
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5 italic">{item.description[lang]}</p>
                    )}
                  </div>
                  <div className="flex justify-end items-end mt-1">
                    {renderPrice(item.price)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#1c1c1c] w-full max-w-lg rounded-t-[2.5rem] overflow-hidden animate-slideUp max-h-[92vh] flex flex-col shadow-2xl">
            <div className="relative h-64 flex-shrink-0">
              <img src={selectedItem.image} alt={selectedItem.name[lang]} className="w-full h-full object-cover" />
              <button 
                onClick={handleCloseItem}
                className="absolute top-6 left-6 bg-black/40 backdrop-blur-md text-white p-2.5 rounded-full hover:bg-black/60 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-[#1c1c1c] to-transparent"></div>
            </div>
            
            <div className="p-6 pt-0 overflow-y-auto overscroll-contain flex-grow custom-scrollbar">
              <div className="flex justify-between items-start mb-6 pt-2">
                <h3 className="text-3xl font-serif text-[#9a644d] dark:text-[#b8866b] leading-tight">{selectedItem.name[lang]}</h3>
              </div>

              {selectedItem.longDescription && (
                <div className="mb-4">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 font-bold mb-3">{t.composition}</h4>
                  <p className="text-[#2d2d2d] dark:text-[#e5e5e5] text-base leading-relaxed opacity-90 font-light italic font-serif">
                    {selectedItem.longDescription[lang]}
                  </p>
                </div>
              )}

              {selectedItem.allergens && (
                <div className="mb-8">
                  <p className="text-[11px] italic text-[#6ca081] dark:text-[#8fc4a3] leading-relaxed">
                    {t.allergens}: {selectedItem.allergens[lang]}
                  </p>
                </div>
              )}

              {selectedItem.volumes && (
                <div className="mb-8">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 font-bold mb-3">{t.volume}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(selectedItem.volumes).map(([size, vol]) => (
                      <div key={size} className="flex flex-col p-3.5 bg-[#faf9f6] dark:bg-[#2a2a2a] rounded-2xl border border-[#9a644d]/10 dark:border-white/5">
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">{size}</span>
                        <span className="text-sm font-bold text-[#9a644d] dark:text-[#b8866b]">{vol}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8 pb-4 border-t border-[#9a644d]/10 dark:border-white/5 pt-6">
                <h4 className="text-[11px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 font-bold mb-4">Цена</h4>
                <div className="flex flex-col gap-3">
                  {typeof selectedItem.price === 'number' ? (
                    <div className="flex justify-between items-center bg-[#9a644d]/5 dark:bg-[#b8866b]/5 p-4 rounded-2xl">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">Стандарт</span>
                      <span className="text-2xl font-bold text-[#9a644d] dark:text-[#b8866b]">{selectedItem.price.toLocaleString()} {t.currency}</span>
                    </div>
                  ) : (
                    Object.entries(selectedItem.price).map(([size, val]) => (
                      <div key={size} className="flex justify-between items-center bg-[#9a644d]/5 dark:bg-[#b8866b]/5 p-4 rounded-2xl">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">{size}</span>
                        <span className="text-xl font-bold text-[#9a644d] dark:text-[#b8866b]">{val.toLocaleString()} {t.currency}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pb-12">
                <button 
                  onClick={handleCloseItem}
                  className="w-full bg-[#9a644d] dark:bg-[#b8866b] text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-[#9a644d]/20 dark:shadow-black/40 hover:opacity-90 transition-all active:scale-[0.97]"
                >
                  {t.back}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
