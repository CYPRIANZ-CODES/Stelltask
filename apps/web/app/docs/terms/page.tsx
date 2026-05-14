import { FileText, AlertTriangle, CheckCircle2, Ban, Scale, Gavel, Shield } from 'lucide-react';

export default function Terms() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--text-muted)] mb-2">Legal</p>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Terms & Conditions</h1>
        <p className="text-sm text-[var(--text-muted)]">Last updated: January 2026</p>
      </div>

      <div className="space-y-6 text-sm text-[var(--text-muted)] leading-relaxed">
        {/* 1 */}
        <section className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <div className="flex items-start gap-3">
            <FileText size={18} className="text-violet-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-base font-semibold text-[var(--text-main)] mb-2">1. Acceptance of Terms</h2>
              <p className="text-xs">By accessing or using Stelltask, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use the platform. We reserve the right to update or modify these terms at any time; continued use of the platform after changes constitutes acceptance of the new terms.</p>
            </div>
          </div>
        </section>

        {/* 2 */}
        <section className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-base font-semibold text-[var(--text-main)] mb-2">2. Eligibility</h2>
              <p className="text-xs mb-3">To use Stelltask, you must meet all of the following requirements:</p>
              <ul className="space-y-1.5 text-xs">
                {[
                  'Be at least 18 years of age or the age of majority in your jurisdiction',
                  'Have the legal capacity to enter into binding contracts',
                  'Not be located in a jurisdiction where Stellar or cryptocurrency use is prohibited',
                  'Not be on any sanctions lists or restricted by applicable law (OFAC, UN, etc.)',
                  'Provide accurate and complete registration information',
                  'Not have been previously suspended or banned from the platform',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={10} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3 */}
        <section className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <div className="flex items-start gap-3">
            <Scale size={18} className="text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-base font-semibold text-[var(--text-main)] mb-2">3. Platform Rules</h2>
              <ul className="space-y-3 text-xs">
                <li><strong className="text-[var(--text-main)]">Task Creators</strong> must fund tasks in escrow before publishing. Funds are released only on approved completion. Creators must review submissions within 72 hours.</li>
                <li><strong className="text-[var(--text-main)]">Contributors</strong> must complete work as described in the acceptance criteria. Submitting plagiarized, AI-generated (without disclosure), or malicious content may result in account suspension.</li>
                <li><strong className="text-[var(--text-main)]">Disputes</strong> are reviewed by platform administrators. Escrow funds remain locked until resolution. Admin decisions are final and binding.</li>
                <li><strong className="text-[var(--text-main)]">Platform fee</strong> is 2.5% of the task reward, deducted from the escrow on payout. Fee is paid by the task creator.</li>
                <li><strong className="text-[var(--text-main)]">Wallet Linking</strong> requires proof of ownership via cryptographic signature. Linked wallets cannot be changed without security verification.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4 */}
        <section className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-base font-semibold text-[var(--text-main)] mb-2">4. Prohibited Activities</h2>
              <p className="text-xs mb-3">The following activities are strictly prohibited:</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  'Creating multiple accounts to circumvent rules',
                  'Collusion or circular payment fraud',
                  'Submitting malicious code or content',
                  'Reputation score manipulation',
                  'Money laundering or illegal activity',
                  'Harassment or abuse of other users',
                  'Impersonation of platform staff',
                  'Automated scraping without permission',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-lg border border-amber-500/10 bg-amber-500/5 p-2.5">
                    <Ban size={12} className="text-amber-400 mt-0.5 shrink-0" />
                    <span className="text-[11px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5 */}
        <section className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <div className="flex items-start gap-3">
            <Ban size={18} className="text-red-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-base font-semibold text-[var(--text-main)] mb-2">5. Account Suspension & Termination</h2>
              <p className="text-xs mb-3">We reserve the right to suspend or terminate accounts that violate these terms. The following process applies:</p>
              <ul className="space-y-1.5 text-xs">
                <li><strong className="text-[var(--text-main)]">Warning:</strong> First minor violations result in a warning and reputation penalty.</li>
                <li><strong className="text-[var(--text-main)]">Suspension:</strong> Repeated or moderate violations result in temporary account suspension. Funds in escrow are resolved before suspension lifts.</li>
                <li><strong className="text-[var(--text-main)]">Termination:</strong> Severe violations (fraud, illegal activity, abuse) result in permanent account termination. Remaining escrow funds are handled per dispute resolution.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6 */}
        <section className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <div className="flex items-start gap-3">
            <Gavel size={18} className="text-rose-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-base font-semibold text-[var(--text-main)] mb-2">6. Dispute Resolution</h2>
              <p className="text-xs mb-3">Disputes between task creators and contributors are resolved through the platform&apos;s built-in dispute system:</p>
              <ol className="space-y-1.5 text-xs list-decimal list-inside">
                <li>Either party raises a dispute with evidence and reasoning</li>
                <li>Escrow funds are locked — no automatic release during dispute</li>
                <li>Admin reviews evidence from both sides (5 business day SLA)</li>
                <li>Admin issues final resolution: creator wins, contributor wins, split, or dismissed</li>
                <li>Admin resolution is final and binding on both parties</li>
              </ol>
            </div>
          </div>
        </section>

        {/* 7 */}
        <section className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <div className="flex items-start gap-3">
            <Shield size={18} className="text-blue-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-base font-semibold text-[var(--text-main)] mb-2">7. Limitation of Liability</h2>
              <p className="text-xs">Stelltask provides a platform for connecting task creators and contributors. We are not responsible for the quality, delivery, or legality of work performed. The Stellar network operates independently; we cannot reverse transactions once confirmed on-chain. Our total liability is limited to the platform fee paid for the specific transaction in question. We are not liable for any indirect, incidental, or consequential damages arising from platform use.</p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <h2 className="text-base font-semibold text-[var(--text-main)] mb-2">Contact</h2>
          <p className="text-xs">
            Questions about these terms? Contact our legal team at{' '}
            <a href="mailto:legal@stelltask.io" className="text-violet-400 hover:text-violet-300 transition">legal@stelltask.io</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
