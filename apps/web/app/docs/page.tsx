'use client';

import { useState } from 'react';
import {
  BookOpen, Compass, Shield, Users, Handshake,
  Landmark, FileText, Terminal, ArrowRight, Code,
  Globe, Zap, Search, ChevronRight, Sparkles, Layers,
} from 'lucide-react';
import DocsSearch from '@/components/docs/DocsSearch';

const sections = [
  {
    icon: Compass, title: 'Introduction',
    desc: 'Learn how Stelltask works — from connecting your wallet to earning your first crypto reward.',
    href: '/docs/getting-started',
    gradient: 'from-violet-500 to-purple-500',
    tag: 'Quickstart',
  },
  {
    icon: Layers, title: 'Architecture',
    desc: 'Understand the system design, backend modules, and how Stellar integrates with the platform.',
    href: '/docs/architecture',
    gradient: 'from-cyan-500 to-blue-500',
    tag: 'Deep dive',
  },
  {
    icon: BookOpen, title: 'Platform Guide',
    desc: 'Task lifecycle, escrow system, reputation scoring, deadlines, and fair assignment.',
    href: '/docs/platform',
    gradient: 'from-emerald-500 to-teal-500',
    tag: 'Core concepts',
  },
  {
    icon: Terminal, title: 'API Reference',
    desc: 'Complete REST API documentation with authentication flows, endpoints, and error codes.',
    href: '/docs/api',
    gradient: 'from-amber-500 to-orange-500',
    tag: 'Reference',
  },
];

const quickLinks = [
  { icon: Users, label: 'Contributors', desc: 'Earn crypto for open-source contributions', href: '/docs/contributors' },
  { icon: Handshake, label: 'Maintainers', desc: 'Manage repos, bounties, and contributors', href: '/docs/maintainers' },
  { icon: Landmark, label: 'Funders', desc: 'Fund open source effectively on Stellar', href: '/docs/funders' },
  { icon: Shield, label: 'Privacy', desc: 'Data handling and security practices', href: '/docs/privacy' },
  { icon: FileText, label: 'Terms', desc: 'Platform terms and conditions', href: '/docs/terms' },
];

const popularTags = [
  { label: 'Getting Started', href: '/docs/getting-started' },
  { label: 'API Reference', href: '/docs/api' },
  { label: 'Architecture', href: '/docs/architecture' },
  { label: 'Contributors', href: '/docs/contributors' },
];

export default function DocsHome() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <DocsSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <div>
        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 mb-10 sm:mb-14">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-cyan-500/8 rounded-full blur-3xl" />
          <div className="relative px-6 sm:px-8 py-10 sm:py-12 lg:py-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 px-3.5 py-1.5 mb-5">
              <div className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--text-muted)]">Documentation v0.1</span>
              <span className="text-[10px] text-[var(--text-muted)]/40 mx-1">&bull;</span>
              <span className="text-[10px] text-emerald-400/70">Stellar-native</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-2xl">
              Everything you need to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
                build on Stellar
              </span>
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl leading-relaxed mb-6">
              Complete documentation for building, funding, and contributing on Stelltask — 
              the Stellar-native open work platform. From architecture deep-dives to API references.
            </p>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full max-w-lg flex items-center gap-3 rounded-xl border border-[var(--text-main)]/10 bg-[var(--bg-page)] px-4 py-3.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)]/20 transition group"
            >
              <Search size={18} className="text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition" />
              <span className="flex-1 text-left">Search documentation...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-muted)]">
                <span className="text-[9px]">&#8984;</span>K
              </kbd>
            </button>

            {/* Popular tags */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[var(--text-muted)]/50 mr-1">Popular:</span>
              {popularTags.map((tag) => (
                <a
                  key={tag.href}
                  href={tag.href}
                  className="inline-flex items-center gap-1 rounded-full border border-[var(--text-main)]/10 px-3 py-1 text-[11px] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)]/20 transition"
                >
                  {tag.label} <ChevronRight size={10} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Section Cards */}
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen size={18} className="text-violet-400" />
          Explore the docs
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="group relative overflow-hidden rounded-2xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5 sm:p-6 hover:border-[var(--text-main)]/20 transition"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${s.gradient} opacity-[0.04] rounded-bl-full transition group-hover:opacity-[0.08]`} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${s.gradient} bg-opacity-10`}>
                    <s.icon size={18} className="text-white" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[var(--text-muted)]/50">{s.tag}</span>
                </div>
                <h3 className="font-semibold text-sm mb-1.5">{s.title}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">{s.desc}</p>
                <div className="flex items-center gap-1 text-xs text-violet-400 opacity-0 group-hover:opacity-100 transition">
                  Read more <ArrowRight size={12} />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Quick Links */}
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users size={18} className="text-cyan-400" />
          Community & Legal
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {quickLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="flex items-start gap-3 rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-4 hover:bg-[var(--text-main)]/5 transition"
            >
              <l.icon size={18} className="text-[var(--text-muted)] mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium mb-0.5 truncate">{l.label}</p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">{l.desc}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Stats */}
        <div className="grid gap-3 sm:grid-cols-4 mb-10">
          {[
            { icon: FileText, label: 'Pages', value: '10+' },
            { icon: Code, label: 'License', value: 'MIT' },
            { icon: Globe, label: 'Network', value: 'Stellar + Soroban' },
            { icon: Zap, label: 'Speed', value: '3-5s Settlement' },
          ].map((s) => (
            <div key={s.label} className="text-center rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-4">
              <s.icon size={18} className="mx-auto mb-2 text-[var(--text-muted)]" />
              <p className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] mb-0.5">{s.label}</p>
              <p className="text-sm font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-purple-500/5 p-6 sm:p-8 text-center">
          <Sparkles size={24} className="mx-auto mb-3 text-violet-400" />
          <h3 className="text-lg font-semibold mb-2">Ready to start building?</h3>
          <p className="text-sm text-[var(--text-muted)] mb-5 max-w-md mx-auto">
            Connect your Stellar wallet and explore open tasks, or dive into the API docs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/explore" className="inline-flex items-center gap-1.5 rounded-lg bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-600 transition">
              Browse Tasks <ArrowRight size={14} />
            </a>
            <a href="/docs/getting-started" className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--text-main)]/10 px-5 py-2.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)]/20 transition">
              Read Getting Started <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
