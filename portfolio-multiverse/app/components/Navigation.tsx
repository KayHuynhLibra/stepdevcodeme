 'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Lang = 'en' | 'vi';

const LABELS: Record<Lang, { home: string; minimal: string; dark: string; terminal: string }> = {
  en: {
    home: 'Home',
    minimal: 'Minimal',
    dark: 'Dark',
    terminal: 'Terminal',
  },
  vi: {
    home: 'Trang chủ',
    minimal: 'Tối giản',
    dark: 'Dự án',
    terminal: 'Giới thiệu',
  },
};

export default function Navigation() {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('pm_lang');
    if (stored === 'vi' || stored === 'en') {
      setLang(stored);
    }
  }, []);

  const t = LABELS[lang];

  const navItems = [
    { href: '/', label: t.home },
    { href: '/minimal', label: t.minimal },
    { href: '/dark', label: t.dark },
    { href: '/terminal', label: t.terminal },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Portfolio Multiverse
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <button
                type="button"
                className={`px-1 ${lang === 'en' ? 'font-semibold text-gray-900' : ''}`}
                onClick={() => {
                  setLang('en');
                  if (typeof window !== 'undefined') window.localStorage.setItem('pm_lang', 'en');
                }}
              >
                EN
              </button>
              <span>/</span>
              <button
                type="button"
                className={`px-1 ${lang === 'vi' ? 'font-semibold text-gray-900' : ''}`}
                onClick={() => {
                  setLang('vi');
                  if (typeof window !== 'undefined') window.localStorage.setItem('pm_lang', 'vi');
                }}
              >
                VI
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

