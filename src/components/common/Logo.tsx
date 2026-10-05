import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  compact?: boolean;
  className?: string;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ compact = false, className = '', light = false }) => {
  if (compact) {
    return (
      <Link to="/" className={`inline-flex items-center gap-2 group ${className}`}>
        <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center text-white font-headline font-black text-xl shadow-xs group-hover:bg-brand-dark transition-colors">
          झ
        </div>
        <div className="flex flex-col">
          <span className={`font-headline font-bold text-lg leading-tight tracking-tight ${light ? 'text-white' : 'text-brand'}`}>
            स्वतंत्र खबर
          </span>
          <span className={`text-[10px] font-sans font-medium tracking-wider -mt-0.5 ${light ? 'text-zinc-300' : 'text-zinc-500'}`}>
            सच के साथ, आपके साथ
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/" className={`inline-flex flex-col items-center group py-1 ${className}`}>
      <div className="flex items-center gap-2.5">
        <svg
          className="w-8 h-8 text-brand flex-shrink-0 group-hover:scale-105 transition-transform"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="14" r="7" fill="#F28C28" />
          <path d="M20 12L12 32H28L20 12Z" fill="#B3121A" />
          <path d="M20 22V32" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="20" cy="20" r="1.5" fill="#FFFFFF" />
        </svg>

        <div className="flex flex-col text-center sm:text-left">
          <div className="flex items-baseline gap-1.5">
            <span className={`font-headline font-black text-2xl sm:text-3xl tracking-tight leading-none ${light ? 'text-white' : 'text-brand'}`}>
              झारखंड स्वतंत्र खबर
            </span>
          </div>
          <div className="flex items-center justify-between w-full mt-0.5">
            <span className="h-[1px] bg-brand/30 flex-grow mr-2"></span>
            <span className={`text-[11px] sm:text-xs font-semibold tracking-wider ${light ? 'text-amber-300' : 'text-amber-800 dark:text-amber-400'}`}>
              सच के साथ, आपके साथ
            </span>
            <span className="h-[1px] bg-brand/30 flex-grow ml-2"></span>
          </div>
        </div>
      </div>
    </Link>
  );
};
