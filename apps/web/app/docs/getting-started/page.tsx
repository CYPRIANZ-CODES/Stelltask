import { Wallet, Search, FileCode, Shield, ArrowRight, CheckCircle2, Globe } from 'lucide-react';

export default function GettingStarted() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--text-muted)] mb-2">Getting Started</p>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Introduction</h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          Stelltask is a Stellar-native open work platform that connects contributors, maintainers, and funders 
          through fast, low-cost, trustless transactions. Built on the Stellar network, it enables transparent 
          funding for open-source development.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">How Stelltask works</h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          The platform revolves around three key participant groups, each with a clear role:
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Search, title: 'Contributors',
              desc: 'Developers who complete tasks and earn crypto rewards. Browse open bounties, claim tasks matching your skills, submit work, and get paid automatically when approved.',
              highlights: ['Browse open bounties', 'Claim tasks by skill match', 'Earn XLM or USDC'],
            },
            {
              icon: FileCode, title: 'Maintainers',
              desc: 'Project maintainers who create bounties for their repositories. Fund issues from your GitHub repo, set rewards, review submissions, and grow your contributor community.',
              highlights: ['Fund GitHub issues', 'Set task rewards', 'Review & approve work'],
            },
            {
              icon: Globe, title: 'Funders',
              desc: 'Organizations and individuals funding open source. Fund individual tasks, run RetroPGF rounds, or set up continuous streams for ongoing maintainer support.',
              highlights: ['Fund tasks directly', 'Run RetroPGF rounds', 'Set up payment streams'],
            },
          ].map((role) => (
            <div key={role.title} className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
              <role.icon size={22} className="text-violet-400 mb-3" />
              <h3 className="text-sm font-semibold mb-2">{role.title}</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">{role.desc}</p>
              <ul className="space-y-1">
                {role.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                    <CheckCircle2 size={10} className="text-emerald-400 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">How funds flow</h2>
        <div className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Every task on Stelltask uses a dedicated Stellar escrow account. Funds flow through a secure, 
            transparent pipeline:
          </p>
          <div className="grid gap-3 sm:grid-cols-4">
            {[
              { step: '01', title: 'Fund', desc: 'Creator sends XLM or USDC to a unique escrow wallet generated per task.' },
              { step: '02', title: 'Work', desc: 'Contributor claims the task and completes the work according to acceptance criteria.' },
              { step: '03', title: 'Review', desc: 'Maintainer reviews the submission and approves or requests revisions.' },
              { step: '04', title: 'Release', desc: 'On approval, funds are released from escrow to the contributor. Settles in 3-5 seconds.' },
            ].map((f) => (
              <div key={f.step} className="text-center p-3 rounded-lg bg-[var(--text-main)]/5">
                <div className="text-lg font-bold text-violet-400 mb-1">{f.step}</div>
                <h4 className="text-xs font-semibold mb-1">{f.title}</h4>
                <p className="text-[11px] text-[var(--text-muted)]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Key features</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: Shield, title: 'Escrow-protected payments', desc: 'Funds are held in smart contract escrow and released only on verified completion. No trust required.' },
            { icon: Globe, title: 'Stellar speed & low fees', desc: 'Transactions settle in 3-5 seconds at fractions of a cent. Ideal for micro-tasks and recurring payments.' },
            { icon: Wallet, title: 'Multi-asset support', desc: 'Fund and get paid in XLM, USDC, or any Stellar-issued asset. Full flexibility for global contributors.' },
            { icon: Search, title: 'Reputation system', desc: 'Trust scores (0-100) govern task access levels. Build your reputation through consistent, quality work.' },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3 rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-4">
              <f.icon size={18} className="text-[var(--text-muted)] mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold mb-0.5">{f.title}</h3>
                <p className="text-xs text-[var(--text-muted)]">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick start for contributors</h2>
        <div className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <ol className="space-y-3 text-sm">
            {[
              { title: 'Install a Stellar wallet', desc: 'Get the Freighter browser extension or Rabe wallet to interact with the Stellar network.' },
              { title: 'Connect to Stelltask', desc: 'Link your wallet in your profile settings. Sign the verification challenge to prove ownership.' },
              { title: 'Browse open tasks', desc: 'Explore tasks filtered by category, difficulty, reward, and required skills.' },
              { title: 'Claim and work', desc: 'Claim a task that matches your expertise. Complete the work and submit for review.' },
              { title: 'Get paid', desc: 'Once approved, funds are released directly to your Stellar wallet. No withdrawal delays.' },
            ].map((step, i) => (
              <li key={step.title} className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-500/15 text-violet-400 text-[10px] font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <h4 className="text-xs font-semibold">{step.title}</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Next steps</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: '/docs/contributors', label: 'Contributor guide' },
            { href: '/docs/maintainers', label: 'Maintainer guide' },
            { href: '/docs/funders', label: 'Funder guide' },
            { href: '/docs/platform', label: 'Platform deep dive' },
            { href: '/docs/api', label: 'API reference' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--text-main)]/10 px-4 py-2 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)]/20 transition"
            >
              {link.label} <ArrowRight size={12} />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
