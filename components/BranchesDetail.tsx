
import React from 'react';
import { BRANCHES } from '../data/mockData';
import { Language } from '../types';

interface BranchesDetailProps {
  lang: Language;
}

export const BranchesDetail: React.FC<BranchesDetailProps> = ({ lang }) => {
  const t = {
    title: lang === 'ru' ? 'Наши Филиалы' : 'Bizning Filiallar',
    open: lang === 'ru' ? 'Открыто' : 'Ochiq',
    call: lang === 'ru' ? 'Позвонить' : 'Qo\'ng\'iroq qilish',
    map: lang === 'ru' ? 'На карте' : 'Xaritada'
  };

  return (
    <div className="p-4 animate-fadeIn pb-24">
      <h2 className="text-2xl font-serif text-[#9a644d] dark:text-[#b8866b] mb-6">{t.title}</h2>
      <div className="space-y-4">
        {BRANCHES.map((branch) => (
          <div key={branch.id} className="bg-white dark:bg-[#1c1c1c] p-5 rounded-2xl shadow-sm border border-[#9a644d]/10 dark:border-white/10">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-[#2d2d2d] dark:text-[#f0f0f0]">{branch.name[lang]}</h3>
              <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                {t.open}
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{branch.address[lang]}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{branch.workingHours[lang]}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>{branch.phone}</span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-[#9a644d] dark:bg-[#b8866b] text-white py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                {t.call}
              </button>
              <button className="flex-1 border border-[#9a644d] dark:border-[#b8866b] text-[#9a644d] dark:text-[#b8866b] py-2 rounded-xl text-sm font-semibold hover:bg-[#9a644d]/5 transition-colors">
                {t.map}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
