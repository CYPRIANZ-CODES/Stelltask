import { CheckCircle2, Shield, Star, Timer, Users, ArrowRight, AlertTriangle } from 'lucide-react';

export default function PlatformGuide() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--text-muted)] mb-2">Platform</p>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Platform Guide</h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          A deep dive into the Stelltask platform — from task lifecycle and escrow mechanics to 
          reputation scoring and fair assignment.
        </p>
      </div>

      {/* Task Lifecycle */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-violet-400" />
          Task Lifecycle
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          Every task on Stelltask follows a strict state machine. Each transition is validated — no 
          shortcuts, no skipped states.
        </p>
        <div className="overflow-x-auto rounded-xl border border-[var(--text-main)]/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--text-main)]/10 bg-[var(--text-main)]/3">
                <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-[0.1em]">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-[0.1em]">Description</th>
                <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-[0.1em]">Next States</th>
              </tr>
            </thead>
            <tbody className="text-xs text-[var(--text-muted)]">
              {[
                ['DRAFT', 'Created but not yet funded or published', 'FUNDING, CANCELLED'],
                ['FUNDING', 'Awaiting XLM escrow deposit confirmation', 'OPEN, CANCELLED'],
                ['OPEN', 'Funded and accepting contributor claims', 'ASSIGNED, CANCELLED, EXPIRED'],
                ['ASSIGNED', 'Claimed by a contributor, work in progress', 'IN_REVIEW, OPEN, DISPUTED, EXPIRED'],
                ['IN_REVIEW', 'Submission received, awaiting review', 'COMPLETED, REVISION_REQUESTED, DISPUTED'],
                ['REVISION_REQUESTED', 'Creator requested changes', 'IN_REVIEW, DISPUTED, EXPIRED'],
                ['COMPLETED', 'Approved and paid out', '—'],
                ['DISPUTED', 'Contested by contributor or creator', 'COMPLETED, CANCELLED'],
                ['CANCELLED', 'Creator cancelled (refunded if funded)', '—'],
                ['EXPIRED', 'Deadline passed with no submission', 'OPEN (admin only)'],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-[var(--text-main)]/5">
                  <td className="py-2.5 px-4"><code className="text-violet-400 font-mono">{row[0]}</code></td>
                  <td className="py-2.5 px-4">{row[1]}</td>
                  <td className="py-2.5 px-4">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Escrow System */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield size={18} className="text-emerald-400" />
          Escrow System
        </h2>
        <div className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5 space-y-4">
          <p className="text-sm text-[var(--text-muted)]">
            Every task on Stelltask uses a <strong className="text-[var(--text-main)]">dedicated Stellar escrow account</strong>.
            This ensures funds are never held by the platform — they live on-chain until the work is approved.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { step: '1', title: 'Account Creation', desc: 'A unique on-chain wallet is generated for each task. The wallet is funded with the minimum required reserve.' },
              { step: '2', title: 'Creator Funds Escrow', desc: 'Creator sends reward + 2.5% fee to the escrow address. Can be XLM or USDC on Stellar.' },
              { step: '3', title: 'Horizon Verification', desc: 'Payment stream from Stellar Horizon confirms the transaction. Task moves from FUNDING to OPEN.' },
              { step: '4', title: 'Funds Released', desc: 'On approval, platform signs and submits release transaction. Contributor receives reward, platform collects fee.' },
              { step: '5', title: 'Account Merged', desc: 'After payout, escrow account is merged back to the platform wallet, reclaiming the base reserve.' },
              { step: '6', title: 'Security', desc: 'Escrow accounts are protected by cryptographic controls. Keys are never exposed to users. Multi-party authorization required for admin operations.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-3 rounded-lg border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 p-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-500/15 text-violet-400 text-[10px] font-bold shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-xs font-semibold mb-0.5">{item.title}</h4>
                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reputation */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Star size={18} className="text-amber-400" />
          Reputation System
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          Trust scores (0–100) determine what tasks you can access. New users start at 50. Scores 
          are calculated from weighted event history with time decay.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          {[
            { level: 'RESTRICTED', range: '0–19', access: 'Beginner tasks only', color: 'text-red-400' },
            { level: 'BASIC', range: '20–39', access: 'Easy and Medium tasks', color: 'text-orange-400' },
            { level: 'STANDARD', range: '40–59', access: 'All tasks (default)', color: 'text-yellow-400' },
            { level: 'TRUSTED', range: '60–79', access: 'Priority queue access', color: 'text-emerald-400' },
            { level: 'ELITE', range: '80–100', access: 'All access + featured profile', color: 'text-violet-400' },
          ].map((t) => (
            <div key={t.level} className="rounded-lg border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 p-3">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-semibold ${t.color}`}>{t.level}</span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">{t.range}</span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)]">{t.access}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-4">
          <p className="text-xs font-semibold mb-2">How scores change</p>
          <div className="grid gap-2 sm:grid-cols-2 text-[11px]">
            {[
              { event: 'Task completed', points: '+20 to +50', type: 'positive' },
              { event: 'Submission approved', points: '+15', type: 'positive' },
              { event: 'Account verified', points: '+10', type: 'positive' },
              { event: 'Task abandoned', points: '-25', type: 'negative' },
              { event: 'Deadline missed', points: '-20', type: 'negative' },
              { event: 'Submission rejected', points: '-15', type: 'negative' },
            ].map((e) => (
              <div key={e.event} className="flex items-center justify-between rounded border border-[var(--text-main)]/10 px-3 py-2">
                <span className="text-[var(--text-muted)]">{e.event}</span>
                <span className={`font-mono font-medium ${e.type === 'positive' ? 'text-emerald-400' : 'text-red-400'}`}>{e.points}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deadlines */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Timer size={18} className="text-rose-400" />
          Deadlines & Enforcement
        </h2>
        <div className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5 space-y-3">
          {[
            { rule: '48-hour start deadline', desc: 'Contributor must begin work within 48 hours of assignment or the task is reassigned and reputation penalty applied.' },
            { rule: '72-hour review window', desc: 'Creator must review submissions within 72 hours. If ignored, the task escalates to admin review.' },
            { rule: 'One-click extension', desc: 'Creators can extend the deadline once per task, adding 72 additional hours.' },
            { rule: '24-hour warning', desc: 'Automatic notification sent 24 hours before any deadline expires.' },
          ].map((d) => (
            <div key={d.rule} className="flex items-start gap-3 p-2 rounded-lg hover:bg-[var(--text-main)]/3 transition">
              <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-[var(--text-main)]">{d.rule}</span>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fair Assignment */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users size={18} className="text-blue-400" />
          Fair Assignment Queue
        </h2>
        <div className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Tasks are assigned through a priority-based queue. The system evaluates 
            multiple factors to ensure fair distribution:
          </p>
          <div className="space-y-3">
            {[
              { factor: 'Trust score', weight: 'Up to 40 points', desc: 'Higher trust scores get priority on competitive tasks.' },
              { factor: 'Skill match', weight: 'Up to 20 points', desc: 'Percentage of matching skill tags between contributor profile and task requirements.' },
              { factor: 'Wait time', weight: 'Up to 5 points', desc: 'First-come bonus prevents ties from always favoring the same users.' },
              { factor: 'Beginner boost', weight: '+25 points', desc: 'New users get priority on BEGINNER difficulty tasks to help them build reputation.' },
              { factor: 'Active load', weight: '-10 per task', desc: 'Penalty for each currently active task to prevent hoarding.' },
            ].map((f) => (
              <div key={f.factor} className="flex items-start justify-between gap-4 rounded-lg border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 p-3">
                <div>
                  <span className="text-xs font-semibold">{f.factor}</span>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{f.desc}</p>
                </div>
                <span className="text-[10px] font-mono text-violet-400 whitespace-nowrap shrink-0">{f.weight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disputes */}
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle size={18} className="text-red-400" />
          Disputes
        </h2>
        <div className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <p className="text-sm text-[var(--text-muted)] mb-3">
            Either party can raise a dispute. Funds stay locked in escrow until resolution — no automatic release.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            {[
              { outcome: 'CREATOR_WINS', desc: 'Funds returned to creator' },
              { outcome: 'CONTRIBUTOR_WINS', desc: 'Funds released to contributor' },
              { outcome: 'SPLIT', desc: 'Partial payment (admin discretion)' },
              { outcome: 'WITHDRAWN', desc: 'Dispute withdrawn by the raiser' },
            ].map((d) => (
              <div key={d.outcome} className="rounded-lg border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 p-3">
                <code className="text-[10px] font-mono text-violet-400">{d.outcome}</code>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
