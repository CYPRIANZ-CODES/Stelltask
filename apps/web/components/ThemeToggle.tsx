'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme === 'light' ? 'light' : savedTheme === 'dark' ? 'dark' : prefersDark ? 'dark' : 'light';

    setIsDark(initialTheme === 'dark');
    document.documentElement.classList.toggle('light', initialTheme === 'light');
  }, []);

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    window.localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('light', nextTheme === 'light');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 items-center justify-center rounded-tl-[1.5rem] rounded-tr-none rounded-br-[1.5rem] rounded-bl-none border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 px-4 text-[var(--text-main)]/80 transition hover:border-[var(--text-main)]/20 hover:bg-[var(--text-main)]/10"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
