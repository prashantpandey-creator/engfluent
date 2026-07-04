'use client';

import { useI18n } from '@/lib/i18n-provider';

export default function LangToggle() {
  const { lang, switchLang } = useI18n();
  return (
    <div className="lang-toggle">
      <button className={lang === 'ru' ? 'active' : ''} onClick={() => switchLang('ru')}>РУ</button>
      <button className={lang === 'en' ? 'active' : ''} onClick={() => switchLang('en')}>EN</button>
    </div>
  );
}
