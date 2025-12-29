
import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Logo } from './components/Logo';
import { MenuDetail } from './components/MenuDetail';
import { BranchesDetail } from './components/BranchesDetail';
import { View, Language } from './types';

// Расширяем интерфейс Window для работы с Telegram SDK
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
      };
    };
  }
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<View>('home');
  const [lang, setLang] = useState<Language>('ru');

  useEffect(() => {
    // Уведомляем Telegram, что приложение готово
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand(); // Разворачиваем на весь экран
      
      // Устанавливаем цвета интерфейса Telegram под цвет нашего приложения
      // Это уберет резкую границу сверху
      window.Telegram.WebApp.setHeaderColor('#faf9f6');
      window.Telegram.WebApp.setBackgroundColor('#faf9f6');
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const translations = {
    ru: {
      slogan: 'Истинное удовольствие в каждом глотке и кусочке свежей выпечки',
      menu: 'Меню',
      branches: 'Филиалы',
    },
    uz: {
      slogan: 'Har bir qultum va yangi pishiriq bo\'lagida haqiqiy rohat',
      menu: 'Menyu',
      branches: 'Filiallar',
    }
  };

  const t = translations[lang];

  const handleImpact = () => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
  };

  const changeView = (view: View) => {
    handleImpact();
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto relative bg-[#faf9f6]">
      {/* Переключатель языка всегда вверху */}
      <div className="absolute top-4 right-4 z-50 flex bg-white/50 backdrop-blur rounded-full p-1 border border-[#9a644d]/10">
        <button 
          onClick={() => { handleImpact(); setLang('ru'); }}
          className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'ru' ? 'bg-[#9a644d] text-white shadow-sm' : 'text-[#9a644d] opacity-60'}`}
        >
          RU
        </button>
        <button 
          onClick={() => { handleImpact(); setLang('uz'); }}
          className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'uz' ? 'bg-[#9a644d] text-white shadow-sm' : 'text-[#9a644d] opacity-60'}`}
        >
          UZ
        </button>
      </div>

      {currentView !== 'home' && (
        <header className="px-4 py-3 bg-white flex items-center justify-between border-b border-[#9a644d]/10 sticky top-0 z-20">
          <button 
            onClick={() => changeView('home')}
            className="text-[#9a644d] p-1 -ml-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256">
              <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
            </svg>
          </button>
          <div className="scale-75 origin-center">
             <Logo className="w-24" />
          </div>
          <div className="w-12"></div>
        </header>
      )}

      <main className="flex-grow overflow-y-auto overflow-x-hidden">
        {currentView === 'home' && (
          <div className="min-h-screen flex flex-col justify-between p-8 bg-gradient-to-b from-[#faf9f6] to-white animate-in fade-in duration-700">
            <div className="flex-1 flex flex-col items-center justify-center space-y-10">
              <div className="transform scale-125 transition-transform duration-1000 mt-8">
                <Logo className="w-full" />
              </div>
              <p className="text-[#9a644d] text-center max-w-[260px] font-serif italic text-lg opacity-80 leading-relaxed min-h-[60px]">
                {t.slogan}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <button 
                onClick={() => changeView('menu')}
                className="w-full bg-[#9a644d] text-white py-5 rounded-2xl font-semibold text-lg shadow-lg shadow-[#9a644d]/20 flex items-center justify-center gap-3 transition-all active:scale-[0.97] hover:bg-[#85543f]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,120v72a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V120a8,8,0,0,1,16,0v72H208V120a8,8,0,0,1,16,0ZM40,88H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Zm176-48H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
                </svg>
                {t.menu}
              </button>
              
              <button 
                onClick={() => changeView('branches')}
                className="w-full bg-white text-[#9a644d] border-2 border-[#9a644d]/20 py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.97] hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>
                </svg>
                {t.branches}
              </button>
            </div>
          </div>
        )}

        {currentView === 'menu' && <MenuDetail lang={lang} />}
        {currentView === 'branches' && <BranchesDetail lang={lang} />}
      </main>

      {currentView !== 'home' && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/80 backdrop-blur-md border-t border-[#9a644d]/10 px-8 py-4 flex justify-around items-center z-30">
          <button 
            onClick={() => changeView('menu')}
            className={`flex flex-col items-center gap-1 ${currentView === 'menu' ? 'text-[#9a644d]' : 'text-gray-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
               <path d="M224,120v72a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V120a8,8,0,0,1,16,0v72H208V120a8,8,0,0,1,16,0ZM40,88H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Zm176-48H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wider">{t.menu}</span>
          </button>
          
          <button 
            onClick={() => changeView('home')}
            className="bg-[#9a644d] text-white p-3 rounded-full -mt-10 shadow-lg shadow-[#9a644d]/30 border-4 border-[#faf9f6]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a16,16,0,0,0,16,16h160a16,16,0,0,0,16-16V120A15.87,15.87,0,0,0,219.31,108.68ZM208,216H48V120l80-80,80,80Z"></path>
            </svg>
          </button>

          <button 
            onClick={() => changeView('branches')}
            className={`flex flex-col items-center gap-1 ${currentView === 'branches' ? 'text-[#9a644d]' : 'text-gray-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wider">{t.branches}</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
