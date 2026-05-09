'use client';

import { ArrowRight, Shield, Trophy, Wallet, Users } from 'lucide-react';
import WalletConnect from '@/components/wallet/WalletConnect';

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-[#05050a] text-white">
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle at top left,_rgba(79,70,229,0.2),transparent_35%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#04040a] to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Wallet connect is available in the top bar.
              </p>
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
                Explore funded work, bounties, and community streams on Stellar.
              </h1>
              <p className="mt-6 text-lg text-white/60 max-w-2xl leading-8">
                Discover active opportunities, review trusted RetroPGF rounds, and connect your Stellar wallet to claim, contribute, or fund projects instantly.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 px-3 py-2 shadow-inner">
                  <WalletConnect />
                </div>
                <a href="#discover" className="text-sm text-white/70 hover:text-white transition">
                  Browse live opportunities
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl max-w-md">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm text-white/50">Connected wallet</p>
                  <p className="text-xl font-semibold">Freighter / Stellar</p>
                </div>
                <div className="rounded-2xl bg-violet-500/10 px-3 py-2 text-violet-300 text-sm font-medium">
                  Ready
                </div>
              </div>
              <div className="space-y-3 text-sm text-white/60">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Public key</span>
                  <span className="text-white/80">GABR...WZJF</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Network</span>
                  <span className="text-white/80">Stellar Testnet</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span>Balance</span>
                  <span className="font-semibold text-white">1,032.75 XLM</span>
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                <button className="w-full rounded-tl-[1.5rem] rounded-tr-none rounded-br-[1.5rem] rounded-bl-none bg-white/10 px-4 py-3 text-sm font-medium text-white hover:bg-white/15 transition">
                  View wallet details
                </button>
                <button className="w-full rounded-tl-[1.5rem] rounded-tr-none rounded-br-[1.5rem] rounded-bl-none border border-white/10 px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/5 transition">
                  Switch account
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-16">
            {[
              { title: 'Live tasks', value: '312', accent: 'from-blue-500 to-cyan-500' },
              { title: 'Open bounties', value: '89', accent: 'from-violet-500 to-fuchsia-500' },
              { title: 'RetroPGF rounds', value: '14', accent: 'from-emerald-500 to-teal-500' },
              { title: 'Active streams', value: '76', accent: 'from-orange-500 to-rose-500' },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-white/50 uppercase tracking-[0.3em] mb-3">{item.title}</div>
                <div className={`text-4xl font-semibold bg-gradient-to-r ${item.accent} bg-clip-text text-transparent`}>{item.value}</div>
              </div>
            ))}
          </div>

          <section id="discover" className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-white/50 text-sm uppercase tracking-[0.3em]">Trending work</p>
                    <h2 className="mt-3 text-3xl font-semibold">Hot opportunities right now</h2>
                  </div>
                  <span className="rounded-full bg-white/5 px-3 py-2 text-xs text-white/60">Explore</span>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: 'RetroPGF: Public Goods Review',
                      badge: 'RetroPGF',
                      reward: '3,200 XLM',
                      description: 'Vote on 18 projects and distribute funding across the Stellar ecosystem.',
                    },
                    {
                      title: 'Wallet integration sprint',
                      badge: 'DevOps',
                      reward: '1,800 XLM',
                      description: 'Build Stellar wallet support for community portals and dashboards.',
                    },
                    {
                      title: 'Dependency security audit',
                      badge: 'Audit',
                      reward: '2,500 XLM',
                      description: 'Review repo dependencies and earn a stream-based payout.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="group rounded-3xl border border-white/10 bg-[#0b0b13] p-6 transition hover:border-violet-500/30 hover:bg-white/5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/60">{item.badge}</span>
                          <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-white/50">Reward</div>
                          <div className="text-lg font-semibold text-white">{item.reward}</div>
                        </div>
                      </div>
                      <p className="mt-4 text-white/55 leading-7">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-300">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50 uppercase tracking-[0.3em]">Secure on-chain</p>
                      <h3 className="text-xl font-semibold">Verified wallet flows</h3>
                    </div>
                  </div>
                  <p className="text-white/60 leading-7">Use your Stellar wallet to sign transactions, manage streams, and receive payouts securely with Freighter and native Stellar support.</p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-[#09090f] p-8 shadow-2xl backdrop-blur-xl">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50 uppercase tracking-[0.3em]">Community first</p>
                      <h3 className="text-xl font-semibold">Earn from open work</h3>
                    </div>
                  </div>
                  <p className="text-white/60 leading-7">Browse open tasks, claim work, and get paid in XLM through the same platform that funds public goods and repo dependency support.</p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-300">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50 uppercase tracking-[0.3em]">Fast discovery</p>
                      <h3 className="text-xl font-semibold">Connect & claim</h3>
                    </div>
                  </div>
                  <p className="text-white/60 leading-7">Connect your wallet from the header, then join the next available round or start funding a task with a single click.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-16 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 shadow-2xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm text-white/50 uppercase tracking-[0.3em] mb-3">Trusted by the Stellar ecosystem</p>
                <h2 className="text-3xl font-semibold">Funding rails built for builders</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {['ens', 'stellar', 'filecoin', 'unicef'].map((name) => (
                  <div key={name} className="rounded-3xl bg-white/5 p-4 text-center text-xs uppercase tracking-[0.25em] text-white/50">{name}</div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
