import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Logo } from './components/Logo';
import { MenuDetail } from './components/MenuDetail';
import { BranchesDetail } from './components/BranchesDetail';
import { VacanciesDetail } from './components/VacanciesDetail';
import { View, Language } from './types';
import { menuItems } from './data/menu';

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
  const [lang, setLang] = useState<Language>('uz');
  const [isDark, setIsDark] = useState(false);
  const [menuTargetCategory, setMenuTargetCategory] = useState<string>('coffee');
  
  // Состояния для сторис-баннера
  const [showStory, setShowStory] = useState(true);
  const [storyProgress, setStoryProgress] = useState(0);

  // ФУНКЦИЯ ЛОГИРОВАНИЯ В GOOGLE ТАБЛИЦЫ
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

  // Логика таймера для сторис
  useEffect(() => {
    if (!isLoading && showStory && currentView === 'home') {
      // Запускаем прогресс бар
      const progressTimer = setTimeout(() => {
        setStoryProgress(100);
      }, 100);

      // Закрываем через 6 секунд
      const closeTimer = setTimeout(() => {
        setShowStory(false);
      }, 6000);

      return () => {
        clearTimeout(progressTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [isLoading, showStory, currentView]);

  if (isLoading) return <LoadingScreen />;

  const translations = {
    ru: { 
      slogan: 'Истинное удовольствие в каждом глотке и кусочке свежей выпечки', 
      menu: 'Меню', 
      branches: 'Филиалы',
      promotions: 'Акции',
      vacancies: 'Вакансии'
    },
    uz: { 
      slogan: 'Har bir qultum va yangi pishiriq bo\'lagida haqiqiy rohat', 
      menu: 'Menyu', 
      branches: 'Filiallar',
      promotions: 'Aksiyalar',
      vacancies: 'Vakansiyalar'
    }
  };
  const t = translations[lang];

  const handleImpact = (style: 'light' | 'medium' = 'light') => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(style);
  };

  const changeView = (view: View) => {
    handleImpact();
    // Сбрасываем категорию на 'coffee', если переходим в меню через навигацию
    if (view === 'menu') {
      setMenuTargetCategory('coffee');
    }
    setCurrentView(view);
  };

  const handleStoryClick = () => {
    handleImpact('medium');
    setShowStory(false);
    setMenuTargetCategory('bakery'); // Устанавливаем категорию выпечки
    setCurrentView('menu'); // Открываем меню
  };

  const handleCloseStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleImpact('light');
    setShowStory(false);
  };

  const PlaceholderView = ({ title, icon }: { title: string, icon: React.ReactNode }) => (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn text-center space-y-6">
      <div className="p-8 bg-white dark:bg-[#1c1c1c] rounded-full shadow-lg border border-[#9a644d]/10 text-[#9a644d] dark:text-[#b8866b]">
        {icon}
      </div>
      <h2 className="text-3xl font-serif text-[#3d2721] dark:text-[#b8866b]">{title}</h2>
      <p className="text-gray-500 dark:text-gray-400 font-light">
        {lang === 'ru' ? 'Раздел находится в разработке' : 'Bo\'lim ishlab chiqilmoqda'}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto relative bg-[#faf9f6] dark:bg-[#121212] transition-colors duration-500">
      {/* Кнопка темы */}
      <div className="absolute top-4 left-4 z-50">
        <button onClick={() => applyTheme(!isDark)} className="p-2 rounded-full bg-white/50 dark:bg-black/30 backdrop-blur border border-[#9a644d]/10 text-[#9a644d] dark:text-[#b8866b] shadow-sm active:scale-90">
          {isDark ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66a8,8,0,0,0,11.32-11.32l-16-16a8,8,0,0,0-11.32,11.32Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM197.66,69.66l16-16a8,8,0,0,0-11.32-11.32l-16,16a8,8,0,0,0,11.32,11.32ZM240,120H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16ZM40,120H16a8,8,0,0,0,0,16H40a8,8,0,0,0,0-16Zm157.66,77.66a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,11.32Zm-77.66,18.34a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V224A8,8,0,0,0,120,216Z"></path></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.07,104.07,0,1,0,129.8,129.8A8,8,0,0,0,233.54,142.23ZM128,216a88.13,88.13,0,0,1-72.76-137.66,104.17,104.17,0,0,0,126.42,126.42A87.57,87.57,0,0,1,128,216Z"></path></svg>
          )}
        </button>
      </div>

      {/* Переключатель языков */}
      <div className="absolute top-4 right-4 z-50 flex bg-white/50 dark:bg-black/30 backdrop-blur rounded-full p-1 border border-[#9a644d]/10">
        <button onClick={() => { handleImpact(); setLang('uz'); }} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'uz' ? 'bg-[#9a644d] text-white' : 'text-[#9a644d] dark:text-[#b8866b] opacity-60'}`}>UZ</button>
        <button onClick={() => { handleImpact(); setLang('ru'); }} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'ru' ? 'bg-[#9a644d] text-white' : 'text-[#9a644d] dark:text-[#b8866b] opacity-60'}`}>RU</button>
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
            
            {/* Story Banner */}
            <div className={`w-full relative transition-all duration-700 ease-in-out overflow-hidden ${showStory ? 'max-h-[220px] opacity-100 mb-6 mt-10' : 'max-h-0 opacity-0 mb-0 mt-0'}`}>
              <div 
                className="relative w-full h-48 rounded-2xl overflow-hidden shadow-xl shadow-[#9a644d]/20 dark:shadow-black/50 cursor-pointer group transform transition-transform active:scale-[0.98]"
                onClick={handleStoryClick}
              >
                {/* Image */}
                <img 
                  src="/menu/Promos/evening.webp" 
                  alt="Special Offer" 
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 z-20">
                    <div 
                      className="h-full bg-white transition-all ease-linear"
                      style={{ 
                        width: `${storyProgress}%`, 
                        transitionDuration: '6000ms'
                      }}
                    ></div>
                </div>

                {/* Close Button */}
                <button 
                    onClick={handleCloseStory}
                    className="absolute top-3 right-3 z-30 p-1.5 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                    </svg>
                </button>
                
                {/* Text Label */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                   <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/20">
                     <span className="text-white text-xs font-bold tracking-wide uppercase">
                        {lang === 'ru' ? 'Акция' : 'Aksiya'}
                     </span>
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 256 256">
                       <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                     </svg>
                   </div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center space-y-10">
              <div className="transform scale-125 transition-transform duration-1000 mt-4"><Logo className="w-full" /></div>
              <p className="text-[#9a644d] dark:text-[#b8866b] text-center max-w-[260px] font-serif italic text-lg opacity-80 leading-relaxed min-h-[60px]">{t.slogan}</p>
            </div>
            
            <div className="w-full max-w-[320px] mx-auto space-y-4 mb-8">
              {/* Developer Contact Link */}
<a 
  href="https://t.me/kh_a87" 
  target="_blank" 
  rel="noopener noreferrer"
  className="flex items-center justify-center gap-2 py-2 text-[#9a644d] dark:text-[#b8866b] text-sm font-semibold hover:opacity-80 transition-opacity"
>
  {/* Исправленный SVG с правильным viewBox 512x512 */}
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 512 512" 
    width="20" 
    height="20" 
    fill="currentColor" 
    className="flex-shrink-0"
  >
    <path d="M477,43.86,13.32,223.29a5.86,5.86,0,0,0-.8.38c-3.76,2.13-30,18.18,7,32.57l.38.14,110.41,35.67a6.08,6.08,0,0,0,5.09-.62L409.25,120.57a6,6,0,0,1,2.2-.83c3.81-.63,14.78-1.81,7.84,7-7.85,10-194.9,177.62-215.66,196.21a6.3,6.3,0,0,0-2.07,4.17l-9.06,108a7.08,7.08,0,0,0,2.83,5.67,6.88,6.88,0,0,0,8.17-.62l65.6-58.63a6.09,6.09,0,0,1,7.63-.39l114.45,83.1.37.25c2.77,1.71,32.69,19.12,41.33-19.76l79-375.65c.11-1.19,1.18-14.27-8.17-22-9.82-8.08-23.72-4-25.81-3.56A6,6,0,0,0,477,43.86Z"/>
  </svg>
  {lang === 'ru' ? 'Связь с разработчиком' : 'Dasturchi bilan aloqa'}
</a>

              <button onClick={() => changeView('menu')} className="w-full bg-[#9a644d] dark:bg-[#b8866b] text-white py-5 rounded-2xl font-semibold text-lg shadow-lg flex items-center justify-center gap-3 active:scale-[0.97]">
                {t.menu}
              </button>
              <button onClick={() => changeView('branches')} className="w-full bg-white dark:bg-[#2a2a2a] text-[#9a644d] dark:text-[#e5e5e5] border-2 border-[#9a644d]/20 py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 active:scale-[0.97]">
                {t.branches}
              </button>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => changeView('promotions')} className="w-full bg-white dark:bg-[#2a2a2a] text-[#9a644d] dark:text-[#e5e5e5] border-2 border-[#9a644d]/20 py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 active:scale-[0.97]">
                  {t.promotions}
                </button>
                <button onClick={() => changeView('vacancies')} className="w-full bg-white dark:bg-[#2a2a2a] text-[#9a644d] dark:text-[#e5e5e5] border-2 border-[#9a644d]/20 py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 active:scale-[0.97]">
                  {t.vacancies}
                </button>
              </div>
            </div>
          </div>
        )}
        {currentView === 'menu' && <MenuDetail lang={lang} initialCategory={menuTargetCategory} />}
        {currentView === 'branches' && <BranchesDetail lang={lang} />}
        {currentView === 'promotions' && <PlaceholderView title={t.promotions} icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm5.5 11a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" /></svg>
        } />}
        {currentView === 'vacancies' && <VacanciesDetail lang={lang} />}
      </main>

      {currentView !== 'home' && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/95 dark:bg-[#1c1c1c]/95 backdrop-blur-md border-t border-[#9a644d]/10 px-4 py-3 flex justify-between items-center z-30 transition-colors shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
          
          {/* Menu Button - Cloche Icon */}
          <button onClick={() => changeView('menu')} className={`flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all ${currentView === 'menu' ? 'bg-[#9a644d]/10 text-[#9a644d] dark:text-[#b8866b]' : 'text-gray-400 hover:text-[#9a644d]/60'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3a9 9 0 0 0-9 9v1h18v-1a9 9 0 0 0-9-9zm0-2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
              <rect x="2" y="13" width="20" height="2"/>
            </svg>
          </button>

          {/* Promotions Button - Percent Icon */}
          <button onClick={() => changeView('promotions')} className={`flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all ${currentView === 'promotions' ? 'bg-[#9a644d]/10 text-[#9a644d] dark:text-[#b8866b]' : 'text-gray-400 hover:text-[#9a644d]/60'}`}>
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm5.5 11a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" /></svg>
          </button>

          {/* Home Button */}
          <button onClick={() => changeView('home')} className="bg-[#9a644d] dark:bg-[#b8866b] text-white p-3.5 rounded-full -mt-8 shadow-xl border-4 border-[#faf9f6] dark:border-[#121212] active:scale-90 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a16,16,0,0,0,16,16h160a16,16,0,0,0,16-16V120A15.87,15.87,0,0,0,219.31,108.68ZM208,216H48V120l80-80,80,80Z"></path></svg>
          </button>

          {/* Vacancies Button - Briefcase Icon */}
          <button onClick={() => changeView('vacancies')} className={`flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all ${currentView === 'vacancies' ? 'bg-[#9a644d]/10 text-[#9a644d] dark:text-[#b8866b]' : 'text-gray-400 hover:text-[#9a644d]/60'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-8-2h4v2h-4V4zM4 8h16v11H4V8z"/></svg>
          </button>

          {/* Branches Button - Location Icon */}
          <button onClick={() => changeView('branches')} className={`flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all ${currentView === 'branches' ? 'bg-[#9a644d]/10 text-[#9a644d] dark:text-[#b8866b]' : 'text-gray-400 hover:text-[#9a644d]/60'}`}>
             <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          </button>

        </nav>
      )}
    </div>
  );
};

export default App;
