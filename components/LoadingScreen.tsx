
import React from 'react';
import { Logo } from './Logo';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#121212] animate-pulse">
      <Logo className="w-64" />
      <div className="mt-12 flex space-x-2">
        <div className="h-2 w-2 bg-[#9a644d] dark:bg-[#b8866b] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-[#9a644d] dark:bg-[#b8866b] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-[#9a644d] dark:bg-[#b8866b] rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};
