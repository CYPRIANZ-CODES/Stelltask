import { Landmark, TrendingUp, Shield, Globe, PiggyBank, ArrowRight, BarChart3, ExternalLink, DollarSign, Zap } from 'lucide-react';

export default function Funders() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--text-muted)] mb-2">Community</p>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Funder Guide</h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          Support open-source development with precision and transparency. Fund individual tasks, 
          run RetroPGF rounds, or set up continuous payment streams — all on the Stellar network.
        </p>
      </div>

      {/* Funding Models */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Landmark size={18} className="text-violet-400" />
          Funding Models
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--text-main)]/10 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--text-main)]/10 bg-[var(--text-main)]/3">
                <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-[0.1em]">Model</th>
                <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-[0.1em]">Best For</th>
                <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-[0.1em]">Payout</th>
                <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-[0.1em]">Fee</th>
              </tr>
            </thead>
            <tbody className="text-xs text-[var(--text-muted)]">
              {[
                ['Task Funding', 'Specific features or fixes', 'On completion', '2.5%'],
                ['RetroPGF Rounds', 'Recognizing past impact', 'At round end', '2.5%'],
                ['Continuous Streams', 'Ongoing maintainer support', 'Real-time per second', '2.5%'],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-[var(--text-main)]/5">
                  <td className="py-2.5 px-4 font-medium text-[var(--text-main)]">{row[0]}</td>
                  <td className="py-2.5 px-4">{row[1]}</td>
                  <td className="py-2.5 px-4">{row[2]}</td>
                  <td className="py-2.5 px-4">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Detailed Models */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">How Each Model Works</h2>
        <div className="grid gap-4">
          {[
            {
              icon: TrendingUp, title: 'Task Funding',
              body: 'Browse open tasks on the platform and fund them directly. Your contribution goes into a secure Stellar escrow account and is released only when the work is completed and approved by the maintainer. You can fund tasks partially or fully.',
              features: ['Fixed-price bounties', 'Escrow-protected funds', 'Pay only for completed work', 'Full transparency on-chain'],
            },
            {
              icon: PiggyBank, title: 'RetroPGF Rounds',
              body: 'Launch Retroactive Public Goods Funding rounds. Define criteria, invite projects to apply, have judges review submissions, and distribute funds to projects that have delivered measurable impact. Winners are paid automatically via Stellar.',
              features: ['Custom judging criteria', 'Weighted scoring system', 'Automatic prize distribution', 'On-chain payout records'],
            },
            {
              icon: DollarSign, title: 'Continuous Streams',
              desc: 'Create ongoing payment streams to support maintainers and contributors over time. Funds flow every second — recipients see their balance growing in real-time. Cancel anytime, unspent funds return to you.',
              features: ['Real-time streaming', 'Per-second accrual', 'Cancel anytime', 'Unspent funds refunded'],
            },
          ].map((model) => (
            <div key={model.title} className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
              <div className="flex gap-4">
                <model.icon size={20} className="text-[var(--text-muted)] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold mb-2">{model.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">{model.body || model.desc}</p>
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {model.features.map((f) => (
                      <div key={f} className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                        <div className="h-1 w-1 rounded-full bg-emerald-400/60" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Stellar */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Globe size={18} className="text-emerald-400" />
          Why Fund on Stellar?
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { metric: '3-5 seconds', label: 'Transaction settlement', icon: Zap },
            { metric: 'Fractions of a cent', label: 'Per transaction cost', icon: DollarSign },
            { metric: '100% on-chain', label: 'Transparent and verifiable', icon: Shield },
            { metric: '2.5%', label: 'Platform fee (lowest in class)', icon: TrendingUp },
          ].map((stat) => (
            <div key={stat.metric} className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-4 text-center">
              <stat.icon size={18} className="mx-auto mb-2 text-emerald-400" />
              <p className="text-base font-bold text-emerald-400">{stat.metric}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Multi Asset */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Multi-Asset Support</h2>
        <div className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <p className="text-sm text-[var(--text-muted)] mb-3">
            Beyond native XLM, you can fund tasks and streams using any Stellar-issued asset:
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { asset: 'XLM', note: 'Native Stellar token — always available' },
              { asset: 'USDC', note: 'Stablecoin — popular for fixed-price tasks' },
              { asset: 'Custom Assets', note: 'Any asset issued on Stellar network' },
            ].map((a) => (
              <div key={a.asset} className="rounded-lg border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 p-3 text-center">
                <p className="text-sm font-semibold text-[var(--text-main)]">{a.asset}</p>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{a.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 p-5">
          <h3 className="text-sm font-semibold mb-2">Start funding open source</h3>
          <p className="text-xs text-[var(--text-muted)] mb-4">Connect your wallet and make your first contribution.</p>
          <a href="/explore" className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-600 transition">
            Browse Tasks to Fund <ArrowRight size={12} />
          </a>
        </div>
      </section>
    </div>
  );
}
