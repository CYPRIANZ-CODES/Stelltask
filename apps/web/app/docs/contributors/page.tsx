import { Wallet, Search, Code, CheckCircle2, Award, TrendingUp, ArrowRight, ExternalLink, AlertTriangle } from 'lucide-react';

export default function Contributors() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--text-muted)] mb-2">Community</p>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Contributor Guide</h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          Start earning crypto for your open-source contributions. This guide walks you through every step — 
          from wallet setup to getting paid.
        </p>
      </div>

      {/* Step by Step */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Wallet size={18} className="text-violet-400" />
          Step-by-Step Guide
        </h2>
        <div className="space-y-4">
          {[
            {
              icon: Wallet, title: '1. Connect Your Wallet',
              body: [
                'Install the Freighter browser extension (recommended) or use Rabe wallet.',
                'Create a new Stellar wallet or import an existing one.',
                'Navigate to your Stelltask profile settings and click "Link Wallet".',
                'Sign the verification challenge with your private key to prove ownership.',
                'Your Stellar public key is now linked to your account.',
              ],
            },
            {
              icon: Search, title: '2. Browse Available Tasks',
              body: [
                'Visit the Tasks page to see all OPEN tasks.',
                'Use filters: category (bug fix, feature, documentation), difficulty (Beginner to Expert), reward range (XLM), and skill tags.',
                'Search by keyword to find tasks matching your expertise.',
                'Look for "Beginner Friendly" tags if you are new to the platform.',
              ],
            },
            {
              icon: Code, title: '3. Claim a Task',
              body: [
                'Click "Claim Task" on any OPEN task that matches your skills.',
                'The fair assignment queue evaluates your trust score, skill match, and current workload.',
                'If selected, the task moves to ASSIGNED status and you can start working.',
                'You have 48 hours to begin work — a start notification is required.',
              ],
            },
            {
              icon: CheckCircle2, title: '4. Submit Your Work',
              body: [
                'Complete the task according to the acceptance criteria.',
                'Submit a URL (pull request, deployment link, or file) with notes describing what was done.',
                'The creator has 72 hours to review your submission.',
                'If revisions are requested, address the feedback and resubmit (version increments).',
              ],
            },
            {
              icon: Award, title: '5. Get Paid',
              body: [
                'Once the creator approves, funds are released from escrow.',
                'Payment lands in your Stellar wallet within 3-5 seconds (on-chain).',
                'Platform fee is 2.5% (paid by the task creator).',
                'You receive 100% of the task reward — no deductions.',
              ],
            },
          ].map((step) => (
            <div key={step.title} className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
              <div className="flex gap-4">
                <step.icon size={20} className="text-[var(--text-muted)] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold mb-2">{step.title}</h3>
                  <ul className="space-y-1.5">
                    {step.body.map((line, i) => (
                      <li key={i} className="text-xs text-[var(--text-muted)] flex items-start gap-2">
                        <div className="h-1 w-1 rounded-full bg-violet-500/50 mt-1.5 shrink-0" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reputation */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-emerald-400" />
          Building Your Reputation
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          Your trust score unlocks higher-value tasks. Here is the complete breakdown:
        </p>
        <div className="overflow-x-auto rounded-xl border border-[var(--text-main)]/10 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--text-main)]/10 bg-[var(--text-main)]/3">
                <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-[0.1em]">Action</th>
                <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-[0.1em]">Points</th>
                <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-[0.1em]">Type</th>
              </tr>
            </thead>
            <tbody className="text-xs text-[var(--text-muted)]">
              {[
                ['Task completed (Beginner)', '+20', 'positive'],
                ['Task completed (Medium)', '+35', 'positive'],
                ['Task completed (Hard)', '+50', 'positive'],
                ['Task completed (Expert)', '+50', 'positive'],
                ['Submission approved', '+15', 'positive'],
                ['First task completed', '+10 (one-time)', 'positive'],
                ['Account verified', '+10', 'positive'],
                ['Early completion', '+5', 'positive'],
                ['Positive feedback from creator', '+5', 'positive'],
                ['Task abandoned', '-25', 'negative'],
                ['Deadline missed', '-20', 'negative'],
                ['Submission rejected', '-15', 'negative'],
                ['Repeated low quality (3+ rejections in 30d)', '-30', 'negative'],
                ['Frivolous dispute', '-5', 'negative'],
                ['Dispute lost', '-20', 'negative'],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-[var(--text-main)]/5">
                  <td className="py-2.5 px-4">{row[0]}</td>
                  <td className={`py-2.5 px-4 font-mono font-medium ${row[2] === 'positive' ? 'text-emerald-400' : 'text-red-400'}`}>{row[1]}</td>
                  <td className="py-2.5 px-4">
                    <span className={`text-[10px] uppercase tracking-[0.1em] font-semibold ${row[2] === 'positive' ? 'text-emerald-400/60' : 'text-red-400/60'}`}>
                      {row[2]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={14} className="text-amber-400 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-400/80">
              Scores are time-weighted: events from the last 90 days count fully, 90-180 days count half, 
              and events older than 180 days count quarter weight. This prevents old mistakes from haunting 
              you forever while rewarding consistent good behavior.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Tips for Success</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            'Read acceptance criteria carefully before claiming a task',
            'Communicate with task creators if requirements are unclear',
            'Start with BEGINNER tasks to build your trust score quickly',
            'Keep your skill tags up to date for better task matching',
            'Submit early — early completion earns bonus reputation points',
            'Build a portfolio of completed tasks for higher-value opportunities',
            'Respond to revision requests promptly to maintain momentum',
            'Do not claim more than 3 tasks simultaneously',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2 rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-3">
              <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
              <span className="text-xs text-[var(--text-muted)]">{tip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-purple-500/5 p-5">
          <h3 className="text-sm font-semibold mb-2">Ready to start?</h3>
          <p className="text-xs text-[var(--text-muted)] mb-4">Connect your Stellar wallet and browse open tasks.</p>
          <div className="flex flex-wrap gap-3">
            <a href="/explore" className="inline-flex items-center gap-1.5 rounded-lg bg-violet-500 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-600 transition">
              Browse Tasks <ArrowRight size={12} />
            </a>
            <a href="https://freighter.app" className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--text-main)]/10 px-4 py-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] transition">
              Get Freighter <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
