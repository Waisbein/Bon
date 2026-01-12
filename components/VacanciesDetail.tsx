
import React from 'react';
import { Language } from '../types';

interface VacanciesDetailProps {
  lang: Language;
}

export const VacanciesDetail: React.FC<VacanciesDetailProps> = ({ lang }) => {
  const t = {
    title: lang === 'ru' ? 'ВАКАНСИИ:' : 'VAKANSIYALAR:',
    roles: lang === 'ru' ? 'Бариста, Кассир, Продавец, Официант.' : 'Barista, Kassir, Sotuvchi, Ofitsiant.',
    info: lang === 'ru' ? 'За дополнительной информацией звоните:' : 'Qo\'shimcha ma\'lumot uchun qo\'ng\'iroq qiling:',
  };

  const phones = [
    '+998 93 555 07 60',
    '+998 93 555 07 68',
    '+998 93 555 07 83'
  ];

  const handleImpact = () => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn pb-32">
       {/* Header Image Section */}
       <div className="relative h-72 md:h-80 w-full overflow-hidden rounded-b-[2rem] shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=800&auto=format&fit=crop"
            alt="Bon Staff"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 pb-10">
            <h2 className="text-white font-serif text-3xl font-bold tracking-wider mb-3">
              {t.title}
            </h2>
            <p className="text-white/95 text-xl font-medium leading-relaxed font-serif">
              {t.roles}
            </p>
          </div>
       </div>

       <div className="p-6 pt-8 space-y-8 bg-[#faf9f6] dark:bg-[#121212] flex-grow transition-colors">
          <div className="space-y-4">
            <p className="text-[#9a644d] dark:text-[#b8866b] font-serif italic text-xl text-center leading-relaxed">
              {t.info}
            </p>
            <div className="w-16 h-0.5 bg-[#9a644d]/20 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-4 max-w-sm mx-auto w-full">
            {phones.map((phone, index) => (
              <a
                key={index}
                href={`tel:${phone.replace(/\s/g, '')}`}
                onClick={handleImpact}
                className="flex items-center justify-between p-5 bg-white dark:bg-[#1c1c1c] rounded-2xl shadow-sm border border-[#9a644d]/10 active:scale-[0.98] active:bg-[#9a644d]/5 transition-all group"
              >
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-[#9a644d]/10 dark:bg-[#b8866b]/10 flex items-center justify-center text-[#9a644d] dark:text-[#b8866b]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                   </div>
                   <span className="font-bold text-lg text-[#2d2d2d] dark:text-[#f0f0f0] tracking-wider font-mono">
                     {phone}
                   </span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-gray-300 dark:text-gray-600 group-hover:text-[#9a644d] dark:group-hover:text-[#b8866b] transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
       </div>
    </div>
  );
};
