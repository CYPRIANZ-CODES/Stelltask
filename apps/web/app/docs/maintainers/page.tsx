import { GitBranch, ShieldCheck, Settings, Users, Bell, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';

export default function Maintainers() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--text-muted)] mb-2">Community</p>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Maintainer Guide</h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          Manage your open-source repositories, create funded bounties, review contributions, and 
          grow your developer community — all on Stellar.
        </p>
      </div>

      {/* Repository Scoring */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <GitBranch size={18} className="text-violet-400" />
          Repository Acceptance
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          Submit your GitHub repository for acceptance on Stelltask. Our automated review system 
          checks the following criteria:
        </p>
        <div className="overflow-x-auto rounded-xl border border-[var(--text-main)]/10 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--text-main)]/10 bg-[var(--text-main)]/3">
                <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-[0.1em]">Check</th>
                <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-[0.1em]">Weight</th>
                <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-[0.1em]">Required</th>
                <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-[0.1em]">Description</th>
              </tr>
            </thead>
            <tbody className="text-xs text-[var(--text-muted)]">
              {[
                ['Public repository', '—', 'Yes', 'Must be publicly accessible on GitHub'],
                ['README file', '20 pts', 'No', 'Must have meaningful documentation'],
                ['CONTRIBUTING.md', '15 pts', 'No', 'Guidelines for potential contributors'],
                ['Open source license', '15 pts', 'No', 'MIT, Apache 2.0, GPL, or similar'],
                ['Open issues', '20 pts', 'No', 'Active issue tracker with clear descriptions'],
                ['Recent activity', '20 pts', 'No', 'At least one commit in the last 3 months'],
                ['Maintainer verified', '10 pts', 'No', 'You must be a collaborator on the repo'],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-[var(--text-main)]/5">
                  <td className="py-2.5 px-4 font-medium text-[var(--text-main)]">{row[0]}</td>
                  <td className="py-2.5 px-4">{row[1]}</td>
                  <td className="py-2.5 px-4">
                    <span className={row[2] === 'Yes' ? 'text-red-400' : 'text-emerald-400/60'}>
                      {row[2]}
                    </span>
                  </td>
                  <td className="py-2.5 px-4">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          Pass threshold: <strong className="text-[var(--text-main)]">60/100</strong> points with all required checks passing.
        </p>
      </section>

      {/* Creating Bounties */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings size={18} className="text-cyan-400" />
          Creating Bounties
        </h2>
        <div className="space-y-4">
          {[
            {
              icon: ShieldCheck, title: 'Convert Issues to Bounties',
              body: 'Browse your repository issues and convert them to funded bounties. Each issue becomes a task with a title, description, acceptance criteria, reward, and deadline. The issue is automatically linked to the task.',
            },
            {
              icon: Users, title: 'Set Difficulty & Reward',
              body: 'Assign difficulty (Beginner, Easy, Medium, Hard, Expert) and set XLM rewards based on scope. Higher rewards attract more qualified contributors. Use skill tags to target specific expertise (Rust, React, Stellar SDK, etc.).',
            },
            {
              icon: Bell, title: 'Review Submissions',
              body: 'When a contributor submits work, you have 72 hours to review. Check the submission against your acceptance criteria. Approve to release payment from escrow, or request revisions with feedback. If you do not respond in 72 hours, the task escalates to admin review.',
            },
            {
              icon: Settings, title: 'Manage Disputes',
              desc: 'If a disagreement arises, either party can raise a dispute. Funds stay locked in escrow until an admin reviews the evidence and issues a resolution. Outcomes: creator wins (refund), contributor wins (payment), split (partial payment), or withdrawn.',
            },
          ].map((step) => (
            <div key={step.title} className="flex gap-4 rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-4">
              <step.icon size={20} className="text-[var(--text-muted)] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{step.body || step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Best Practices</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            'Write clear, detailed acceptance criteria for every bounty',
            'Set realistic deadlines — 7-14 days for medium tasks, 3-7 for beginner tasks',
            'Review submissions promptly to keep contributors engaged',
            'Provide constructive, specific feedback on revision requests',
            'Use relevant skill tags to attract the right contributors',
            'Keep your repository issues organized and well-described',
            'Respond to contributor questions within 24 hours',
            'Recognize exceptional work with positive feedback reviews',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2 rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-3">
              <CheckCircle2 size={14} className="text-cyan-400 mt-0.5 shrink-0" />
              <span className="text-xs text-[var(--text-muted)]">{tip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-5">
          <h3 className="text-sm font-semibold mb-2">Ready to onboard your repository?</h3>
          <p className="text-xs text-[var(--text-muted)] mb-4">Submit your repo for review and start creating bounties for your community.</p>
          <a href="/repos" className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-600 transition">
            Submit Repository <ArrowRight size={12} />
          </a>
        </div>
      </section>
    </div>
  );
}
