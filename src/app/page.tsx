'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n-provider';
import { Bell, User, BookOpen, BarChart2, Award, Mic } from 'lucide-react';
import LangToggle from '@/components/LangToggle';

export default function DashboardPage() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [streak, setStreak] = useState(0);
  const [wordsDue, setWordsDue] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setMounted(true);
    async function loadData() {
      try {
        const [wordsRes, sessionRes] = await Promise.all([
          fetch('/api/words'),
          fetch('/api/sessions/current')
        ]);
        
        if (wordsRes.ok) {
          const words = await wordsRes.json();
          const due = words.filter((w: any) => !w.nextReviewDate || new Date(w.nextReviewDate) <= new Date());
          setWordsDue(due.length);
        }
        
        if (sessionRes.ok) {
          const session = await sessionRes.json();
          setStreak(session.streakDay || 0);
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadData();
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f4f7fc] flex">
      {/* ── SIDEBAR NAVIGATION ── */}
      <aside className="w-24 lg:w-64 bg-white/60 backdrop-blur-xl border-r border-white/60 shadow-lg flex flex-col p-4 shrink-0 transition-all">
        <div className="flex items-center gap-3 px-2 py-6 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-pink-500/30 shrink-0">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-gray-900 hidden lg:block">
            Mila
          </span>
        </div>

        <nav className="flex-1 space-y-4">
          {[
            { icon: BookOpen, label: 'nav_lessons', sub: 'Уроки', href: '/lessons', color: 'text-indigo-500', bg: 'bg-indigo-50' },
            { icon: BarChart2, label: 'nav_progress', sub: 'Прогресс', href: '/progress', color: 'text-purple-500', bg: 'bg-purple-50' },
            { icon: Award, label: 'nav_achievements', sub: 'Достижения', href: '/achievements', color: 'text-pink-500', bg: 'bg-pink-50' },
            { icon: Mic, label: 'phonetics_title', sub: 'Фонетика', href: '/phonetics', color: 'text-rose-500', bg: 'bg-rose-50' }
          ].map(item => (
            <Link key={item.href} href={item.href} className="group flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-4 p-3 rounded-2xl hover:bg-white/80 transition-all cursor-pointer">
              <div className={\`w-14 h-14 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center shadow-sm border border-white \${item.bg} \${item.color} group-hover:scale-110 group-hover:shadow-md transition-transform\`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className="hidden lg:block text-left mt-1">
                <div className="font-bold text-gray-800">{t(item.label as any)}</div>
                <div className="text-xs text-gray-500 font-medium">{item.sub}</div>
              </div>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pb-4 flex justify-center lg:justify-start lg:px-4">
          <LangToggle />
        </div>
      </aside>

      {/* ── MAIN DASHBOARD ── */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        
        {/* HEADER */}
        <header className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-500 hover:text-pink-500 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-white overflow-hidden">
                <User className="w-6 h-6 text-gray-300" />
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN (Voice Darshan + Vocab) */}
          <div className="xl:col-span-2 flex flex-col gap-8">
            
            {/* VOICE DARSHAN HERO CARD */}
            <div 
              onClick={() => router.push('/darshan')}
              className="group relative h-[400px] rounded-[32px] bg-[#1a0b2e] overflow-hidden cursor-pointer shadow-2xl shadow-purple-900/20 flex flex-col justify-end p-10 transition-transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-60 group-hover:opacity-80 transition-opacity"></div>
              
              {/* CSS Glowing Orb */}
              <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 animate-spin-slow blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="absolute inset-2 rounded-full bg-gradient-to-bl from-blue-400 via-indigo-500 to-pink-400 blur-md opacity-80 mix-blend-screen"></div>
                <div className="absolute inset-4 rounded-full border-2 border-white/20"></div>
                <div className="absolute inset-8 rounded-full bg-white/10 backdrop-blur-sm"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-5xl font-extrabold text-white mb-2 tracking-tight">
                  Mila:<br />Voice Darshan
                </h2>
                <p className="text-xl text-purple-200 font-medium">Голосовой наставник AI</p>
              </div>
            </div>

            {/* VOCABULARY REVIEW CARD */}
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-8 shadow-xl shadow-gray-200/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-extrabold text-gray-900 tracking-tight uppercase">Vocabulary Review</h3>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  </div>
                </button>
              </div>
              
              <div className="relative w-full h-12 bg-gray-100 rounded-full mb-6 overflow-hidden flex items-center px-4">
                <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" style={{ width: '75%' }}></div>
                <span className="relative z-10 text-white font-bold text-sm tracking-widest">75% COMPLETE</span>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-1">Vocabulary Review: Keep going!</h4>
                <p className="text-gray-500 font-medium">Обзор словарного запаса: Продолжайте!</p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Streak + Lesson) */}
          <div className="flex flex-col gap-8">
            
            {/* DAILY STREAK CARD */}
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-10 flex flex-col items-center justify-center text-center shadow-xl shadow-orange-500/10 h-[300px]">
              <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500 to-yellow-400 opacity-20 blur-2xl rounded-full"></div>
                <div className="text-[120px] leading-none absolute z-0 drop-shadow-2xl">🔥</div>
                <div className="relative z-10 text-white font-extrabold text-5xl drop-shadow-md mt-4">{streak || 15}</div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Daily Streak</h3>
              <p className="text-gray-500 font-medium uppercase text-sm mt-1">Ежедневная серия</p>
            </div>

            {/* LESSON OF THE DAY CARD */}
            <div className="relative bg-gray-900 rounded-[32px] overflow-hidden shadow-xl shadow-purple-900/10 flex-1 min-h-[300px] flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-b from-[#3a1c4a] to-black opacity-90 z-0"></div>
              {/* Fallback image if no photo */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay z-0"></div>
              
              <div className="relative z-10 p-8 flex flex-col h-full">
                <h3 className="text-white font-extrabold text-xl tracking-tight uppercase mb-1">Lesson of the Day</h3>
                <p className="text-purple-200 font-medium text-sm mb-auto">Урок дня</p>
                
                <div className="mt-8 mb-6">
                  <h4 className="text-3xl font-bold text-white leading-tight mb-2">Travel Phrases:<br />At the Airport</h4>
                </div>
                
                <button 
                  onClick={() => router.push('/lessons/coffee')}
                  className="w-full bg-white text-gray-900 font-extrabold py-4 rounded-full text-lg hover:scale-[1.02] transition-transform"
                >
                  START
                </button>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-gray-800">Topic: Navigation & Logistics</p>
              <p className="text-xs font-medium text-gray-500 mt-0.5">Тема: Навигация и логистика</p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
