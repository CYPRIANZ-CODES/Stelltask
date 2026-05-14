'use client';

import { motion } from 'framer-motion';

export default function Architecture() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--text-muted)] mb-2">Platform</p>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Architecture</h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          Stelltask connects contributors, maintainers, and funders through the Stellar network.
          Funds flow through secure escrow wallets — the platform never holds your money.
        </p>
      </div>

      {/* Flow Diagram */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">How funds flow</h2>
        <div className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-4 sm:p-6">
          <svg viewBox="0 0 800 280" className="w-full h-auto max-w-3xl mx-auto" fill="none">
            <defs>
              <linearGradient id="arrowGrad1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="arrowGrad2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="arrowGrad3" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="glowGrad" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background glow */}
            <ellipse cx="400" cy="140" rx="320" ry="100" fill="url(#glowGrad)" />

            {/* Nodes */}
            {/* Creator */}
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <rect x="20" y="90" width="140" height="60" rx="16" className="fill-[var(--bg-page)] stroke-violet-500/30" strokeWidth="1.5" />
              <rect x="20" y="90" width="140" height="60" rx="16" fill="url(#glowGrad)" opacity="0.3" />
              <text x="90" y="115" textAnchor="middle" className="fill-[var(--text-main)] text-[13px] font-semibold">Creator</text>
              <text x="90" y="135" textAnchor="middle" className="fill-[var(--text-muted)] text-[10px]">Funds a task</text>
            </motion.g>

            {/* Escrow */}
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            >
              <rect x="330" y="70" width="140" height="100" rx="16" className="fill-[var(--bg-page)] stroke-violet-500/30" strokeWidth="1.5" />
              <rect x="330" y="70" width="140" height="100" rx="16" fill="url(#glowGrad)" opacity="0.3" />
              <text x="400" y="100" textAnchor="middle" className="fill-[var(--text-main)] text-[13px] font-semibold">Escrow</text>
              <text x="400" y="118" textAnchor="middle" className="fill-[var(--text-muted)] text-[10px]">On-chain wallet</text>
              <text x="400" y="135" textAnchor="middle" className="fill-[var(--text-muted)] text-[10px]">Holds funds</text>
              <text x="400" y="152" textAnchor="middle" className="fill-[var(--text-muted)] text-[10px]">until approval</text>

              {/* Stellar indicator */}
              <rect x="350" y="148" width="100" height="14" rx="7" className="fill-emerald-500/10" />
              <text x="400" y="158" textAnchor="middle" className="fill-emerald-400 text-[8px] font-medium">Stellar network</text>
            </motion.g>

            {/* Contributor */}
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            >
              <rect x="640" y="90" width="140" height="60" rx="16" className="fill-[var(--bg-page)] stroke-emerald-500/30" strokeWidth="1.5" />
              <rect x="640" y="90" width="140" height="60" rx="16" fill="url(#glowGrad)" opacity="0.15" />
              <text x="710" y="115" textAnchor="middle" className="fill-[var(--text-main)] text-[13px] font-semibold">Contributor</text>
              <text x="710" y="135" textAnchor="middle" className="fill-[var(--text-muted)] text-[10px]">Gets paid</text>
            </motion.g>

            {/* Curved arrows */}
            {/* Creator → Escrow */}
            <motion.path
              d="M160 110 C220 80, 280 90, 330 95"
              stroke="url(#arrowGrad1)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.6, ease: 'easeInOut' }}
            />
            <motion.path
              d="M160 130 C220 160, 280 140, 330 135"
              stroke="url(#arrowGrad1)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
            />
            <motion.text
              x="245" y="75" textAnchor="middle"
              className="fill-violet-400 text-[9px] font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Funds escrow
            </motion.text>
            <motion.text
              x="245" y="175" textAnchor="middle"
              className="fill-violet-400 text-[9px] font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              Sets criteria
            </motion.text>

            {/* Escrow → Contributor */}
            <motion.path
              d="M470 120 C530 140, 580 140, 640 120"
              stroke="url(#arrowGrad3)"
              strokeWidth="2.5"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1.0, ease: 'easeInOut' }}
            />
            <motion.path
              d="M470 120 C530 100, 580 100, 640 120"
              stroke="url(#arrowGrad3)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1.2, ease: 'easeInOut' }}
            />
            <motion.text
              x="555" y="95" textAnchor="middle"
              className="fill-emerald-400 text-[9px] font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              Payment released
            </motion.text>
            <motion.text
              x="555" y="150" textAnchor="middle"
              className="fill-emerald-400 text-[9px] font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              On approval
            </motion.text>

            {/* Animated dot along payment path */}
            <motion.circle
              r="4"
              className="fill-emerald-400"
              filter="url(#glow)"
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: '100%' }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{ offsetPath: "path('M470 120 C530 140, 580 140, 640 120')" }}
            />
            <motion.circle
              r="4"
              className="fill-violet-400"
              filter="url(#glow)"
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: '100%' }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5, ease: 'linear' }}
              style={{ offsetPath: "path('M160 110 C220 80, 280 90, 330 95')" }}
            />

            {/* Labels */}
            <motion.text
              x="400" y="210" textAnchor="middle"
              className="fill-[var(--text-muted)] text-[10px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              All transactions verified on the Stellar network
            </motion.text>
            <motion.text
              x="400" y="228" textAnchor="middle"
              className="fill-[var(--text-muted)] text-[10px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
            >
              Funds never held by the platform — escrowed on-chain
            </motion.text>
          </svg>
        </div>
      </section>

      {/* Steps */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">How it works</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              step: '01', title: 'A task is created',
              desc: 'A creator publishes a task with a reward in XLM or USDC. A unique escrow wallet is generated on the Stellar network — no one can touch these funds but the smart contract.',
            },
            {
              step: '02', title: 'Work gets done',
              desc: 'A contributor claims the task, completes the work, and submits it for review. The creator verifies the submission against the acceptance criteria.',
            },
            {
              step: '03', title: 'Payment is released',
              desc: 'On approval, funds flow from escrow directly to the contributor\'s wallet. The transaction settles on Stellar in seconds — no waiting, no middlemen.',
            },
          ].map((item) => (
            <div key={item.step} className="relative rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
              <div className="text-3xl font-bold text-violet-500/20 mb-2">{item.step}</div>
              <h3 className="text-sm font-semibold mb-2">{item.title}</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key principles */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Key principles</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              title: 'Non-custodial',
              desc: 'The platform never has custody of funds. Every task uses a dedicated on-chain escrow wallet. Only the task creator and the smart contract can authorize releases.',
            },
            {
              title: 'Transparent',
              desc: 'Every transaction is recorded on the Stellar blockchain. Anyone can verify payments, escrow balances, and release transactions in real-time.',
            },
            {
              title: 'Secure',
              desc: 'All communications are encrypted. Rate limiting and abuse detection protect against attacks. Smart contract logic enforces payout conditions — no exceptions.',
            },
            {
              title: 'Fast',
              desc: 'Transactions settle in 3-5 seconds at fractions of a cent. No bank delays, no gas wars, no waiting periods.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-4">
              <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Who participates</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { role: 'Creators', desc: 'Post tasks, set rewards, and approve completed work. Funds flow from their wallet through escrow to contributors.' },
            { role: 'Contributors', desc: 'Browse open tasks, claim work, and earn crypto rewards. Payments arrive directly in their Stellar wallet.' },
            { role: 'Platform', desc: 'Coordinates the process — generates escrow wallets, verifies transactions, enforces rules, and resolves disputes.' },
          ].map((item) => (
            <div key={item.role} className="text-center rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-4">
              <div className="text-base font-semibold mb-1">{item.role}</div>
              <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
