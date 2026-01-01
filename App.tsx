
import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Logo } from './components/Logo';
import { MenuDetail } from './components/MenuDetail';
import { BranchesDetail } from './components/BranchesDetail';
import { View, Language } from './types';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        colorScheme: 'light' | 'dark';
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
        };
        themeParams: {
          bg_color?: string;
          header_bg_color?: string;
        };
        onEvent: (eventType: string, eventHandler: () => void) => void;
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
  const [isDark, setIsDark] = useState(false);

  // ФУНКЦИЯ ЛОГИРОВАНИЯ В GOOGLE ТАБЛИЦЫ (ОБНОВЛЕННАЯ)
  const logToGoogleSheets = (userData: any) => {
    if (!userData) return;
    const url = 'https://script.google.com/macros/s/AKfycbzBGC7VWzrGwEEAZAz2wM0dx4ELe4ejc7ye_m1Ruu_X9R8bik-LJVv2pDweQDEGyfuJXg/exec';
    
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        ...userData,
        timestamp: new Date().toISOString(),
        source: 'Telegram Mini App'
      })
    });
  };

  // ФУНКЦИЯ ОТПРАВКИ СТАТИСТИКИ В ТЕЛЕГРАМ БОТ
  const sendUserStats = (userData: any) => {
    const TOKEN = '8488822343:AAEUJqso4VvTgy-Jq34HDi7PCciJ4LS5js';
    const CHAT_ID = '467914417';
    
    const message = `🔔 *Новый вход в Bon! App*\n\n` +
      `👤 Имя: ${userData.first_name} ${userData.last_name || ''}\n` +
      `🆔 ID: \`${userData.id}\`\n` +
      `🔗 Username: ${userData.username !== 'no_username' ? '@' + userData.username : 'отсутствует'}\n` +
      `⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

    const params = new URLSearchParams();
    params.append('chat_id', CHAT_ID);
    params.append('text', message);
    params.append('parse_mode', 'Markdown');

    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      mode: 'no-cors',
      body: params
    }).then(() => {
      console.log('📊 Статистика входа отправлена в Telegram');
    }).catch(err => {
      console.error('❌ Ошибка при отправке статистики:', err);
    });
  };

  const handleInitialEntry = () => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      const user = tg.initDataUnsafe.user;
      const userData = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name || '',
        username: user.username || 'no_username',
      };
      
      // Отправляем данные в обе системы
      sendUserStats(userData);
      logToGoogleSheets(userData);
    } else {
      console.warn('⚠️ Данные пользователя недоступны (запуск вне Telegram)');
    }
  };

  const applyTheme = (dark: boolean) => {
    setIsDark(dark);
    const bgColor = dark ? '#121212' : '#faf9f6';
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');

    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.setHeaderColor(bgColor);
      window.Telegram.WebApp.setBackgroundColor(bgColor);
    }
  };

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      
      handleInitialEntry();
      
      applyTheme(tg.colorScheme === 'dark');
      tg.onEvent('themeChanged', () => applyTheme(tg.colorScheme === 'dark'));
    }

    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen />;

  const translations = {
    ru: { slogan: 'Истинное удовольствие в каждом глотке и кусочке свежей выпечки', menu: 'Меню', branches: 'Филиалы' },
    uz: { slogan: 'Har bir qultum va yangi pishiriq bo\'lagida haqiqiy rohat', menu: 'Menyu', branches: 'Filiallar' }
  };
  const t = translations[lang];

  const handleImpact = (style: 'light' | 'medium' = 'light') => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(style);
  };

  const changeView = (view: View) => {
    handleImpact();
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto relative bg-[#faf9f6] dark:bg-[#121212] transition-colors duration-500">
      {/* Кнопка темы */}
      <div className="absolute top-4 left-4 z-50">
        <button onClick={() => applyTheme(!isDark)} className="p-2 rounded-full bg-white/50 dark:bg-black/30 backdrop-blur border border-[#9a644d]/10 text-[#9a644d] dark:text-[#b8866b] shadow-sm active:scale-90">
          {isDark ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66a8,8,0,0,0,11.32-11.32l-16-16a8,8,0,0,0-11.32,11.32Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM197.66,69.66l16-16a8,8,0,0,0-11.32-11.32l-16,16a8,8,0,0,0,11.32,11.32ZM240,120H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16ZM40,120H16a8,8,0,0,0,0,16H40a8,8,0,0,0,0-16Zm157.66,77.66a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32Zm-77.66,18.34a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V224A8,8,0,0,0,120,216Z"></path></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.07,104.07,0,1,0,129.8,129.8A8,8,0,0,0,233.54,142.23ZM128,216a88.13,88.13,0,0,1-72.76-137.66,104.17,104.17,0,0,0,126.42,126.42A87.57,87.57,0,0,1,128,216Z"></path></svg>
          )}
        </button>
      </div>

      {/* Переключатель языков */}
      <div className="absolute top-4 right-4 z-50 flex bg-white/50 dark:bg-black/30 backdrop-blur rounded-full p-1 border border-[#9a644d]/10">
        <button onClick={() => { handleImpact(); setLang('ru'); }} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'ru' ? 'bg-[#9a644d] text-white' : 'text-[#9a644d] dark:text-[#b8866b] opacity-60'}`}>RU</button>
        <button onClick={() => { handleImpact(); setLang('uz'); }} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'uz' ? 'bg-[#9a644d] text-white' : 'text-[#9a644d] dark:text-[#b8866b] opacity-60'}`}>UZ</button>
      </div>

      {currentView !== 'home' && (
        <header className="px-4 py-3 bg-white dark:bg-[#1c1c1c] flex items-center justify-between border-b border-[#9a644d]/10 dark:border-[#b8866b]/20 sticky top-0 z-20 transition-colors">
          <button onClick={() => changeView('home')} className="text-[#9a644d] dark:text-[#b8866b] p-1 -ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path></svg>
          </button>
          <div className="scale-75 origin-center"><Logo className="w-24" /></div>
          <div className="w-12"></div>
        </header>
      )}

      <main className="flex-grow overflow-y-auto overflow-x-hidden">
        {currentView === 'home' && (
          <div className="min-h-screen flex flex-col justify-between p-8 bg-gradient-to-b from-[#faf9f6] to-white dark:from-[#121212] dark:to-[#1a1a1a] animate-fadeIn">
            <div className="flex-1 flex flex-col items-center justify-center space-y-10">
              <div className="transform scale-125 transition-transform duration-1000 mt-8"><Logo className="w-full" /></div>
              <p className="text-[#9a644d] dark:text-[#b8866b] text-center max-w-[260px] font-serif italic text-lg opacity-80 leading-relaxed min-h-[60px]">{t.slogan}</p>
            </div>
            <div className="space-y-4 mb-8">
              <button onClick={() => changeView('menu')} className="w-full bg-[#9a644d] dark:bg-[#b8866b] text-white py-5 rounded-2xl font-semibold text-lg shadow-lg flex items-center justify-center gap-3 active:scale-[0.97]">
                {t.menu}
              </button>
              <button onClick={() => changeView('branches')} className="w-full bg-white dark:bg-[#2a2a2a] text-[#9a644d] dark:text-[#e5e5e5] border-2 border-[#9a644d]/20 py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 active:scale-[0.97]">
                {t.branches}
              </button>
            </div>
          </div>
        )}
        {currentView === 'menu' && <MenuDetail lang={lang} />}
        {currentView === 'branches' && <BranchesDetail lang={lang} />}
      </main>

      {currentView !== 'home' && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/80 dark:bg-[#1c1c1c]/90 backdrop-blur-md border-t border-[#9a644d]/10 px-8 py-4 flex justify-around items-center z-30 transition-colors">
          <button onClick={() => changeView('menu')} className={`flex flex-col items-center gap-1 ${currentView === 'menu' ? 'text-[#9a644d] dark:text-[#b8866b]' : 'text-gray-400'}`}>
            <span className="text-[10px] font-bold uppercase tracking-wider">{t.menu}</span>
          </button>
          <button onClick={() => changeView('home')} className="bg-[#9a644d] dark:bg-[#b8866b] text-white p-3 rounded-full -mt-10 shadow-lg border-4 border-[#faf9f6] dark:border-[#121212] active:scale-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a16,16,0,0,0,16,16h160a16,16,0,0,0,16-16V120A15.87,15.87,0,0,0,219.31,108.68ZM208,216H48V120l80-80,80,80Z"></path></svg>
          </button>
          <button onClick={() => changeView('branches')} className={`flex flex-col items-center gap-1 ${currentView === 'branches' ? 'text-[#9a644d] dark:text-[#b8866b]' : 'text-gray-400'}`}>
            <span className="text-[10px] font-bold uppercase tracking-wider">{t.branches}</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
