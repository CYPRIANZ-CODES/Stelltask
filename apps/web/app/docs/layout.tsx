'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Menu, BookOpen, Compass, Shield, Users, Handshake,
  Landmark, FileText, Terminal, ChevronRight, ExternalLink, Search,
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import DocsSearch from '@/components/docs/DocsSearch';

const nav = [
  { section: 'Getting Started', icon: Compass, items: [
    { href: '/docs/getting-started', label: 'Introduction' },
  ]},
  { section: 'Platform', icon: BookOpen, items: [
    { href: '/docs/architecture', label: 'Architecture' },
    { href: '/docs/platform', label: 'Platform Guide' },
  ]},
  { section: 'Community', icon: Users, items: [
    { href: '/docs/contributors', label: 'Contributors' },
    { href: '/docs/maintainers', label: 'Maintainers' },
    { href: '/docs/funders', label: 'Funders' },
  ]},
  { section: 'Reference', icon: FileText, items: [
    { href: '/docs/api', label: 'API Reference' },
    { href: '/docs/privacy', label: 'Privacy Policy' },
    { href: '/docs/terms', label: 'Terms & Conditions' },
  ]},
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <DocsSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
        {/* Docs Header */}
        <header className="sticky top-0 z-50 border-b border-[var(--text-main)]/10 bg-[var(--bg-page)]/95 backdrop-blur-xl">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition rounded-lg hover:bg-[var(--text-main)]/5"
                aria-label="Open sidebar"
              >
                <Menu size={20} />
              </button>
              <a href="/docs" className="flex items-center gap-2.5 group">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15 text-violet-500 font-bold text-[10px] group-hover:bg-violet-500/20 transition">S</div>
                <span className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--text-main)]/80 hidden sm:block">Stelltask Docs</span>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 rounded-lg border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 px-3 py-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)]/20 transition mr-2"
              >
                <Search size={14} />
                Search docs
                <kbd className="hidden md:inline-flex items-center gap-0.5 rounded border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-muted)]">
                  <span className="text-[9px]">&#8984;</span>K
                </kbd>
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="sm:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition rounded-lg hover:bg-[var(--text-main)]/5"
                aria-label="Search docs"
              >
                <Search size={18} />
              </button>
              <a href="/" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] transition hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-[var(--text-main)]/5">
                Main Site <ExternalLink size={12} />
              </a>
              <div className="h-4 w-px bg-[var(--text-main)]/10 mx-1 hidden sm:block" />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl flex">
          {/* Sidebar Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside className={`
            fixed lg:sticky top-14 z-50 lg:z-auto
            h-[calc(100vh-3.5rem)] w-64 lg:w-56 xl:w-64
            border-r border-[var(--text-main)]/10 bg-[var(--bg-page)] overflow-y-auto
            transition-transform duration-300 ease-in-out lg:translate-x-0
            ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
          `}>
            <div className="p-4 lg:p-3 xl:p-4">
              {/* Mobile search */}
              <button
                onClick={() => { setSidebarOpen(false); setSearchOpen(true); }}
                className="w-full lg:hidden flex items-center gap-2 rounded-lg border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 px-3 py-2.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)]/20 transition mb-4"
              >
                <Search size={14} />
                Search docs...
              </button>

              {nav.map((group) => (
                <div key={group.section} className="mb-3">
                  <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--text-muted)]/50">
                    <group.icon size={12} />
                    {group.section}
                  </div>
                  {group.items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition ${
                        isActive(item.href)
                          ? 'bg-violet-500/10 text-violet-400 font-medium'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--text-main)]/5'
                      }`}
                    >
                      <ChevronRight size={12} className={`shrink-0 transition ${isActive(item.href) ? 'opacity-100 text-violet-400' : 'opacity-30'}`} />
                      {item.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8 lg:py-10 max-w-4xl">
            {children}

            {/* Docs Footer */}
            <div className="mt-16 pt-8 border-t border-[var(--text-main)]/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
                <p>&copy; 2026 Stelltask. All rights reserved.</p>
                <div className="flex gap-6">
                  <a href="/docs/privacy" className="hover:text-[var(--text-main)] transition">Privacy</a>
                  <a href="/docs/terms" className="hover:text-[var(--text-main)] transition">Terms</a>
                  <a href="https://github.com/stelltask" className="hover:text-[var(--text-main)] transition">GitHub</a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
