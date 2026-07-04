'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LangToggle from '@/components/LangToggle';
import SpeechButton from '@/components/SpeechButton';
import { useI18n } from '@/lib/i18n-provider';

export default function DashboardPage() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [streak, setStreak] = useState(0);
  const [wordsDue, setWordsDue] = useState(0);
  const [lessonsDone, setLessonsDone] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setMounted(true);
    setStreak(Math.floor(Math.random() * 7) + 1);
    setWordsDue(Math.floor(Math.random() * 12) + 1);
    setLessonsDone(Math.floor(Math.random() * 20) + 3);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {/* ── NAV ── */}
      <nav style={{
        background:'rgba(255,255,255,0.88)', backdropFilter:'blur(12px)',
        borderBottom:'1px solid rgba(249,168,184,0.12)',
        position:'sticky', top:0, zIndex:50, padding:'0.75rem 1.5rem'
      }}>
        <div style={{maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <span style={{fontSize:'1.5rem'}}>🌸</span>
            <span style={{fontWeight:800,fontSize:'1.15rem',color:'#44403c'}}>
              Eng<span style={{color:'#e91e63'}}>Fluent</span>
            </span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
            <LangToggle />
            <div style={{width:36,height:36,borderRadius:'50%',background:'linear-gradient(135deg,#f9a8b8,#e91e63)',
              display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:'0.85rem'}}>
              А
            </div>
          </div>
        </div>
      </nav>

      <main className="container-app animate-in" style={{padding:'2rem 1rem'}}>
        {/* ── GREETING ── */}
        <div style={{marginBottom:'2rem'}}>
          <h1 style={{fontSize:'1.75rem',fontWeight:800,margin:0,color:'#44403c'}}>
            {lang === 'ru' ? '🌸 ' : '🌸 '}{t('dashboard_title')}
          </h1>
          <p style={{color:'#78716c',marginTop:'0.25rem',fontSize:'1.05rem'}}>
            {t('dashboard_subtitle')}
          </p>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="grid-cards" style={{marginBottom:'2rem'}}>
          {/* Streak */}
          <div className="card streak-card" style={{textAlign:'center'}}>
            <div style={{fontSize:'2.5rem',marginBottom:'0.25rem'}}>🔥</div>
            <div style={{fontSize:'2rem',fontWeight:800,color:'#f59e0b'}}>{streak}</div>
            <div style={{color:'#78716c',fontSize:'0.9rem'}}>{t('dashboard_streak')}</div>
          </div>

          {/* Words due */}
          <div className="card" style={{textAlign:'center'}} onClick={() => router.push('/vocabulary')} 
            onMouseEnter={e => (e.currentTarget.style.cursor='pointer')}>
            <div style={{fontSize:'2.5rem',marginBottom:'0.25rem'}}>📝</div>
            <div style={{fontSize:'2rem',fontWeight:800,color:'#e91e63'}}>{wordsDue}</div>
            <div style={{color:'#78716c',fontSize:'0.9rem'}}>{t('dashboard_words_review')}</div>
          </div>

          {/* Lessons done */}
          <div className="card" style={{textAlign:'center'}} onClick={() => router.push('/lessons')}
            onMouseEnter={e => (e.currentTarget.style.cursor='pointer')}>
            <div style={{fontSize:'2.5rem',marginBottom:'0.25rem'}}>📚</div>
            <div style={{fontSize:'2rem',fontWeight:800,color:'#5b8c5a'}}>{lessonsDone}</div>
            <div style={{color:'#78716c',fontSize:'0.9rem'}}>{t('progress_lessons_done')}</div>
          </div>
        </div>

        {/* ── TODAY'S LESSON ── */}
        <div className="card" style={{marginBottom:'1.5rem',background:'linear-gradient(135deg,#fff,#fce4ec)',border:'1.5px solid rgba(249,168,184,0.2)'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
            <div>
              <span className="badge badge-rose" style={{marginBottom:'0.5rem',display:'inline-block'}}>
                {t('lessons_category_speaking')}
              </span>
              <h3 style={{margin:'0.5rem 0 0.25rem',fontSize:'1.2rem'}}>
                {lang === 'ru' ? 'Как заказать кофе ☕' : 'How to Order Coffee ☕'}
              </h3>
              <p style={{color:'#78716c',margin:0,fontSize:'0.9rem'}}>
                {lang === 'ru' ? 'Практика разговора • 5 мин • Простой' : 'Speaking practice • 5 min • Easy'}
              </p>
            </div>
            <button className="btn-primary" onClick={() => router.push('/lessons/coffee')}>
              {t('dashboard_start')} →
            </button>
          </div>
        </div>

        {/* ── PRONUNCIATION PRACTICE ── */}
        <div className="card" style={{marginBottom:'1.5rem'}}>
          <h3 style={{margin:'0 0 0.5rem'}}>🗣️ {t('phonetics_title')}</h3>
          <p style={{color:'#78716c',fontSize:'0.9rem',marginBottom:'1rem'}}>{t('phonetics_subtitle')}</p>
          <div style={{display:'flex',alignItems:'center',gap:'2rem',flexWrap:'wrap',justifyContent:'center'}}>
            <div style={{textAlign:'center'}}>
              <div style={{fontWeight:600,fontSize:'1.3rem',marginBottom:'0.5rem',color:'#44403c'}}>thought</div>
              <SpeechButton word="thought" />
            </div>
            <div style={{textAlign:'center'}}>
              <div style={{fontWeight:600,fontSize:'1.3rem',marginBottom:'0.5rem',color:'#44403c'}}>through</div>
              <SpeechButton word="through" />
            </div>
            <div style={{textAlign:'center'}}>
              <div style={{fontWeight:600,fontSize:'1.3rem',marginBottom:'0.5rem',color:'#44403c'}}>comfortable</div>
              <SpeechButton word="comfortable" />
            </div>
          </div>
        </div>

        {/* ── QUICK LINKS ── */}
        <div className="grid-cards">
          {[
            { emoji:'📖', label:lang==='ru'?'Уроки':'Lessons', desc:lang==='ru'?'По категориям':'By category', href:'/lessons', color:'#5b8c5a' },
            { emoji:'📊', label:lang==='ru'?'Прогресс':'Progress', desc:lang==='ru'?'Твоя статистика':'Your stats', href:'/progress', color:'#7c3aed' },
            { emoji:'🏆', label:lang==='ru'?'Достижения':'Achievements', desc:lang==='ru'?'Твои победы':'Your wins', href:'/achievements', color:'#f59e0b' },
          ].map(link => (
            <div key={link.href} className="card" onClick={() => router.push(link.href)}
              style={{cursor:'pointer',display:'flex',alignItems:'center',gap:'1rem'}}
              onMouseEnter={e => (e.currentTarget.style.borderColor=link.color)}
              onMouseLeave={e => (e.currentTarget.style.borderColor='rgba(249,168,184,0.1)')}>
              <div style={{fontSize:'2rem'}}>{link.emoji}</div>
              <div>
                <div style={{fontWeight:600,color:'#44403c'}}>{link.label}</div>
                <div style={{fontSize:'0.85rem',color:'#78716c'}}>{link.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{textAlign:'center',padding:'2rem',color:'#78716c',fontSize:'0.85rem'}}>
        🌸 {t('footer_tagline')}
      </footer>
    </div>
  );
}
