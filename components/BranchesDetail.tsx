
import React from 'react';
import { branches } from '../data/menu'; // Изменен путь и название
import { Language, Branch } from '../types';

interface BranchesDetailProps {
  lang: Language;
}

export const BranchesDetail: React.FC<BranchesDetailProps> = ({ lang }) => {
  const t = {
    title: lang === 'ru' ? 'Наши Филиалы' : 'Bizning Filiallar',
    regions: lang === 'ru' ? 'Регионы' : 'Viloyatlar',
    tashkent: lang === 'ru' ? 'Ташкент' : 'Toshkent',
    open: lang === 'ru' ? 'ОТКРЫТО' : 'OCHIQ',
    call: lang === 'ru' ? 'Позвонить' : 'Qo\'ng\'iroq qilish',
    map: lang === 'ru' ? 'На карте' : 'Xaritada'
  };

  const handleImpact = (style: 'light' | 'medium' = 'light') => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(style);
  };

  const openMap = (branch: Branch) => {
    handleImpact('medium');
    const searchQuery = `${branch.name[lang]} ${branch.address[lang]}`;
    const url = `https://yandex.uz/maps/?text=${encodeURIComponent(searchQuery)}`;
    window.open(url, '_blank');
  };

  const makeCall = (phone: string) => {
    handleImpact('medium');
    window.location.href = `tel:${phone.replace(/\s/g, '')}`;
  };

  // Используем branches вместо BRANCHES
  const tashkentBranches = branches.filter(b => b.id.startsWith('t'));
  const regionalBranches = branches.filter(b => b.id.startsWith('r'));

  const renderBranchCard = (branch: Branch) => (
    <div key={branch.id} className="bg-white dark:bg-[#1c1c1c] p-6 rounded-[1.5rem] shadow-md border border-[#9a644d]/20 dark:border-white/10 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-xl text-[#3d2721] dark:text-[#f0f0f0] tracking-tight">{branch.name[lang]}</h3>
        <div className="bg-[#e8f5e9] dark:bg-green-900/40 text-[#1b5e20] dark:text-green-300 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-widest border border-[#1b5e20]/20">
          {t.open}
        </div>
      </div>
      
      <div className="space-y-3.5 text-[14px] text-[#2d2d2d] dark:text-gray-100 mb-6 font-sans">
        <div className="flex items-start gap-3">
          <svg className="mt-0.5 shrink-0 text-[#9a644d]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="leading-tight font-semibold">{branch.address[lang]}</span>
        </div>
        <div className="flex items-center gap-3">
          <svg className="shrink-0 text-[#9a644d]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="font-medium">{branch.workingHours[lang]}</span>
        </div>
        <div className="flex items-center gap-3">
          <svg className="shrink-0 text-[#9a644d]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
          </svg>
          <span className="font-black text-[#9a644d] dark:text-[#b8866b]">{branch.phone}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={() => makeCall(branch.phone)}
          className="flex-1 bg-[#845642] dark:bg-[#9a644d] text-white py-4 rounded-xl text-sm font-black shadow-lg shadow-[#845642]/20 transition-all active:scale-[0.97]"
        >
          {t.call}
        </button>
        <button 
          onClick={() => openMap(branch)}
          className="flex-1 bg-white dark:bg-[#2a2a2a] border-2 border-[#845642] dark:border-[#9a644d] text-[#845642] dark:text-[#b8866b] py-4 rounded-xl text-sm font-black transition-all active:scale-[0.97]"
        >
          {t.map}
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 animate-fadeIn pb-32 space-y-12">
      <section>
        <h2 className="text-2xl font-serif text-[#3d2721] dark:text-[#b8866b] mb-6 flex items-center gap-4 px-1">
          <span className="whitespace-nowrap font-bold uppercase tracking-wider">{t.tashkent}</span>
          <div className="h-0.5 w-full bg-[#9a644d]/30 dark:bg-[#b8866b]/40"></div>
        </h2>
        <div className="space-y-6">
          {tashkentBranches.map(renderBranchCard)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-serif text-[#3d2721] dark:text-[#b8866b] mb-6 flex items-center gap-4 px-1">
          <span className="whitespace-nowrap font-bold uppercase tracking-wider">{t.regions}</span>
          <div className="h-0.5 w-full bg-[#9a644d]/30 dark:bg-[#b8866b]/40"></div>
        </h2>
        <div className="space-y-6">
          {regionalBranches.map(renderBranchCard)}
        </div>
      </section>
    </div>
  );
};
