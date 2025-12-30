
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-48" }) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <h1 className="font-serif text-6xl md:text-8xl tracking-tight text-[#9a644d] dark:text-[#b8866b]">
        Bon!
      </h1>
      <div className="mt-2 flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#9a644d] dark:text-[#b8866b] opacity-80">
        <span>Boulangerie</span>
        <span className="text-lg leading-none">•</span>
        <span>Pâtisserie</span>
      </div>
    </div>
  );
};
