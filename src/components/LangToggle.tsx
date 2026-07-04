'use client';

import { useI18n } from '@/lib/i18n-provider';

export default function LangToggle() {
  const { lang, switchLang } = useI18n();
  
  return (
    <div className="flex bg-white/40 backdrop-blur-md p-1 rounded-full shadow-inner border border-white/50 transition-all">
      <button 
        onClick={() => switchLang('en')}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          lang === 'en' 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        🇺🇸 English
      </button>
      <button 
        onClick={() => switchLang('ru')}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          lang === 'ru' 
            ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg scale-105' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        🇷🇺 Русский
      </button>
    </div>
  );
}
