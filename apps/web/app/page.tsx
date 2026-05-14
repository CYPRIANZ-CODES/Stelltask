import { ArrowRight } from 'lucide-react';
import AboutSlider from '@/components/AboutSlider';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
      {/* Fixed dimming overlay behind header */}
      <div className="fixed top-0 left-0 right-0 h-28 z-[90] pointer-events-none bg-gradient-to-b from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent" />

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[var(--bg-page)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(88,79,255,0.18),transparent_28%)] pointer-events-none dark-only" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.12),transparent_25%)] pointer-events-none dark-only" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.2),transparent_42%)] pointer-events-none dark-only" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-8 lg:px-8">
          <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="max-w-2xl space-y-8">
              <div className="inline-flex items-center gap-2 rounded-tl-[1.5rem] rounded-tr-none rounded-br-[1.5rem] rounded-bl-none border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 px-5 py-3 text-xs font-bold uppercase tracking-[0.3em] text-[var(--text-main)]/80 backdrop-blur-sm transition hover:bg-[var(--text-main)]/10">
                <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                Stellar-native public goods funding
              </div>

              <h1 className="text-5xl font-semibold leading-tight tracking-tight text-[var(--text-main)] sm:text-6xl xl:text-7xl">
                The fastest on-chain route from wallet to open-source funding.
              </h1>

              <p className="max-w-xl text-lg leading-8 text-[var(--text-muted)] sm:text-xl">
                Discover and support tasks, RetroPGF rounds, and dependency funding on Stellar using a sleek, modern interface that feels effortless.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="/explore" className="inline-flex items-center justify-center rounded-tl-[1.5rem] rounded-tr-none rounded-br-[1.5rem] rounded-bl-none bg-[var(--text-main)] px-6 py-4 text-sm font-semibold text-[var(--bg-page)] transition hover:opacity-90">
                  Explore opportunities
                  <ArrowRight className="ml-3 h-4 w-4" />
                </a>
                <a href="#trusted" className="rounded-tl-[1.5rem] rounded-tr-none rounded-br-[1.5rem] rounded-bl-none border border-[var(--text-main)]/10 px-6 py-4 text-sm text-[var(--text-muted)] transition hover:border-[var(--text-main)]/20 hover:text-[var(--text-main)]">
                  Built for public goods
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { title: 'Instant setup', subtitle: 'Connect a wallet and start funding.' },
                  { title: 'Low fees', subtitle: 'Stellar costs cents per transaction.' },
                  { title: 'Open growth', subtitle: 'Fund dependencies and communities.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 p-5">
                    <p className="text-xl font-semibold text-[var(--text-main)]">{item.title}</p>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex flex-col overflow-hidden rounded-[2rem] border border-[var(--text-main)]/10 bg-[var(--bg-page)]/90 shadow-2xl shadow-violet-900/20 min-h-[400px] md:min-h-[480px]">
              <div className="absolute inset-0 bg-[var(--text-main)]/10" />
              <div className="flex-1 flex items-center">
                <AboutSlider />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/95 to-transparent px-6 py-5 pointer-events-none">
                <div className="text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">About Stelltask</div>
                <p className="mt-1 text-sm md:text-base font-semibold text-[var(--text-main)]">The open-source funding layer on Stellar.</p>
              </div>
            </div>
          </div>

          <div id="trusted" className="rounded-[2rem] border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 p-6 text-[var(--text-muted)] md:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">Trusted by</p>
                <p className="mt-2 text-2xl font-semibold text-[var(--text-main)]">Open-source teams and DAO builders.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {['ens', 'Stellar', 'Filecoin', 'Unicef'].map((name) => (
                  <div key={name} className="rounded-3xl bg-[var(--bg-page)] border border-[var(--text-main)]/5 px-4 py-3 text-center text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--text-main)]/10 bg-[var(--bg-page)] px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {[
            { title: 'Stream payments', text: 'Create continuous on-chain flows with a few clicks.' },
            { title: 'Fund contributors', text: 'Reward open-source work and dependencies directly.' },
            { title: 'Run RetroPGF', text: 'Launch rounds that distribute funding transparently.' },
          ].map((card) => (
            <div key={card.title} className="rounded-[1.75rem] border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 p-8 text-[var(--text-muted)] shadow-xl shadow-black/20">
              <h3 className="text-2xl font-semibold text-[var(--text-main)]">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--text-main)]/10 bg-[var(--bg-page)] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-[var(--text-main)]/10 bg-gradient-to-br from-[var(--text-main)]/5 to-[var(--text-main)]/2 p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-tl-[1.5rem] rounded-tr-none rounded-br-[1.5rem] rounded-bl-none border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 px-5 py-3 text-xs font-bold uppercase tracking-[0.3em] text-[var(--text-main)]/80">
                  <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
                  Mini tasks ecosystem
                </div>

                <h2 className="text-4xl font-semibold leading-tight text-[var(--text-main)] lg:text-5xl">
                  Launch micro-projects for developers
                </h2>

                <p className="text-lg leading-8 text-[var(--text-muted)]">
                  Individuals and organizations can post mini-tasks and instantly connect with developers. Set your budget, define requirements, and pay directly through Stellar with transparent, secure transactions.
                </p>

                <ul className="space-y-4 text-[var(--text-muted)]">
                  <li className="flex gap-3 items-start">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-violet-500 flex-shrink-0" />
                    <span className="text-sm">Post mini-tasks with clear deliverables</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-violet-500 flex-shrink-0" />
                    <span className="text-sm">Browse skilled developers and their portfolios</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-violet-500 flex-shrink-0" />
                    <span className="text-sm">Pay securely with blockchain escrow</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-violet-500 flex-shrink-0" />
                    <span className="text-sm">Build your reputation as a task creator or developer</span>
                  </li>
                </ul>

                <a href="/tasks" className="inline-flex items-center justify-center rounded-tl-[1.5rem] rounded-tr-none rounded-br-[1.5rem] rounded-bl-none bg-[var(--text-main)] px-6 py-3 text-sm font-semibold text-[var(--bg-page)] transition hover:opacity-90">
                  Post your first task
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>

              <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--text-main)]/10 bg-[var(--bg-page)]/50 p-8 shadow-xl shadow-black/10">
                <div className="space-y-6">
                  <div className="rounded-[1.25rem] border border-[var(--text-main)]/10 bg-[var(--bg-page)]/80 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] font-semibold mb-2">For Task Creators</p>
                    <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                      <li>✓ Define scope and budget</li>
                      <li>✓ Review proposals</li>
                      <li>✓ Track progress in real-time</li>
                      <li>✓ Release payment on completion</li>
                    </ul>
                  </div>

                  <div className="rounded-[1.25rem] border border-[var(--text-main)]/10 bg-[var(--bg-page)]/80 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] font-semibold mb-2">For Developers</p>
                    <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                      <li>✓ Browse verified opportunities</li>
                      <li>✓ Bid on tasks that match your skills</li>
                      <li>✓ Earn crypto directly</li>
                      <li>✓ Build your on-chain portfolio</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
