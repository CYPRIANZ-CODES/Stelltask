'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isExplore = pathname?.startsWith('/explore');
  if (pathname?.startsWith('/docs')) return null;

  const features = [
    { name: 'Projects', href: '/explore' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Teams', href: '/teams' },
    { name: 'Achievements', href: '/achievements' },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4">
      <header className="flex h-16 w-full max-w-6xl items-center justify-between rounded-tl-[2rem] rounded-tr-none rounded-br-[2rem] rounded-bl-none border border-[var(--text-main)]/10 bg-[var(--bg-page)]/80 px-8 backdrop-blur-xl shadow-2xl transition-all hover:bg-[var(--bg-page)]/90">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-violet-500 font-bold text-xs">S</div>
            <span className="hidden text-sm font-bold uppercase tracking-[0.3em] text-[var(--text-main)]/90 sm:block">stelltask</span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] md:flex">
            <a href="/" className={`transition hover:text-[var(--text-main)] ${pathname === '/' ? 'text-[var(--text-main)]' : ''}`}>Home</a>
            
            {/* Findings Dropdown */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="flex items-center gap-1 transition hover:text-[var(--text-main)]">
                Findings
                <ChevronDown size={14} />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="rounded-lg border border-[var(--text-main)]/10 bg-[var(--bg-page)]/95 backdrop-blur-xl shadow-2xl p-2" sideOffset={8}>
                {features.map((feature) => (
                  <DropdownMenu.Item key={feature.href} asChild>
                    <a href={feature.href} className="block px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--text-muted)] hover:text-[var(--text-main)] transition cursor-pointer rounded">
                      {feature.name}
                    </a>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>

            <a href="/tasks" className="transition hover:text-[var(--text-main)]">Tasks</a>
          </nav>
          
          <div className="h-4 w-[1px] bg-[var(--text-main)]/10 mx-2 hidden md:block" />

          <div className="flex items-center gap-3">
            {!isExplore && (
              <a 
                href="/explore" 
                className="hidden items-center justify-center rounded-tl-[1rem] rounded-tr-none rounded-br-[1rem] rounded-bl-none bg-[var(--text-main)] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[var(--bg-page)] transition hover:opacity-90 md:flex"
              >
                Explore
              </a>
            )}
            <ThemeToggle />
            
            {/* Mobile Menu Icon */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[var(--text-main)] hover:bg-[var(--text-main)]/10 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 md:hidden">
          <nav className="rounded-tl-[1.5rem] rounded-tr-none rounded-br-[1.5rem] rounded-bl-none border border-[var(--text-main)]/10 bg-[var(--bg-page)]/95 backdrop-blur-xl shadow-2xl p-6 space-y-4">
            <a 
              href="/" 
              className={`block text-xs font-bold uppercase tracking-[0.2em] transition py-2 ${pathname === '/' ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            
            {/* Mobile Findings Dropdown */}
            <details className="group">
              <summary className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] transition cursor-pointer py-2 flex items-center gap-2">
                Findings
                <ChevronDown size={14} className="group-open:rotate-180 transition" />
              </summary>
              <div className="pl-4 space-y-2 mt-2">
                {features.map((feature) => (
                  <a 
                    key={feature.href}
                    href={feature.href} 
                    className="block text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] transition py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {feature.name}
                  </a>
                ))}
              </div>
            </details>

            <a 
              href="/tasks" 
              className="block text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tasks
            </a>
            
            {!isExplore && (
              <a 
                href="/explore" 
                className="block items-center justify-center rounded-tl-[1rem] rounded-tr-none rounded-br-[1rem] rounded-bl-none bg-[var(--text-main)] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[var(--bg-page)] transition hover:opacity-90 text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore
              </a>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
