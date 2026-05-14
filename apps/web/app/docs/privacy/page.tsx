import { Shield, Mail, Database, Lock, Cookie, Eye, FileText, CheckCircle2 } from 'lucide-react';

export default function Privacy() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--text-muted)] mb-2">Legal</p>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Privacy Policy</h1>
        <p className="text-sm text-[var(--text-muted)]">Last updated: January 2026</p>
      </div>

      <div className="space-y-6 text-sm text-[var(--text-muted)] leading-relaxed">
        {/* 1 */}
        <section className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <div className="flex items-start gap-3">
            <Database size={18} className="text-violet-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-base font-semibold text-[var(--text-main)] mb-3">1. Information We Collect</h2>
              <div className="overflow-x-auto rounded-lg border border-[var(--text-main)]/10">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[var(--text-main)]/10 bg-[var(--text-main)]/5">
                      <th className="text-left py-2.5 px-3 font-semibold">Category</th>
                      <th className="text-left py-2.5 px-3 font-semibold">Data</th>
                      <th className="text-left py-2.5 px-3 font-semibold">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Account', 'Email, GitHub username, Stellar public key', 'Authentication and identity'],
                      ['Profile', 'Bio, skills, timezone, website, avatar', 'Display on contributor profiles'],
                      ['Transactions', 'Task details, submissions, reviews, tx hashes', 'Platform operations and escrow'],
                      ['Technical', 'IP address, browser type, device info', 'Security and analytics'],
                    ].map((row) => (
                      <tr key={row[0]} className="border-b border-[var(--text-main)]/5">
                        <td className="py-2 px-3 font-medium text-[var(--text-main)]">{row[0]}</td>
                        <td className="py-2 px-3">{row[1]}</td>
                        <td className="py-2 px-3">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 2 */}
        <section className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <div className="flex items-start gap-3">
            <Eye size={18} className="text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-base font-semibold text-[var(--text-main)] mb-2">2. How We Use Your Data</h2>
              <ul className="space-y-2 text-xs">
                {[
                  'Provide and maintain the Stelltask platform and its features',
                  'Process transactions and release payments from escrow accounts',
                  'Calculate reputation scores and determine access levels',
                  'Communicate with you about tasks, submissions, and platform updates',
                  'Detect and prevent fraud, abuse, and violations of our Terms',
                  'Comply with legal obligations and enforce our agreements',
                  'Improve platform performance through aggregated analytics',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-cyan-400 mt-0.5 shrink-0" />
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
            <Lock size={18} className="text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-base font-semibold text-[var(--text-main)] mb-2">3. Data Security</h2>
              <p className="text-xs mb-3">We implement industry-standard security measures across all layers:</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  'All sensitive data encrypted at rest using industry-standard algorithms',
                  'All API traffic encrypted in transit using TLS',
                  'Passwords hashed using strong, salted cryptographic functions',
                  'Session tokens rotated regularly with automatic expiry',
                  'Regular security audits and penetration testing',
                  'Rate limiting on all API endpoints to prevent abuse',
                  'Parameterized queries prevent injection attacks',
                  'Strict access controls enforced in production',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-lg border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 p-2.5">
                    <Shield size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-[11px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4 */}
        <section className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <div className="flex items-start gap-3">
            <FileText size={18} className="text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-base font-semibold text-[var(--text-main)] mb-2">4. Data Sharing</h2>
              <p className="text-xs mb-3">We do not sell your personal data. We may share data with:</p>
              <ul className="space-y-2 text-xs">
                <li><strong className="text-[var(--text-main)]">Stellar Network:</strong> Transaction data is publicly visible on the Stellar blockchain by design. This includes wallet addresses and transaction amounts.</li>
                <li><strong className="text-[var(--text-main)]">Service Providers:</strong> Cloud infrastructure, database, and caching services required to operate the platform. All processors are GDPR-compliant.</li>
                <li><strong className="text-[var(--text-main)]">Legal Compliance:</strong> When required by applicable law, court order, or to protect our rights and the safety of our users.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5 */}
        <section className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <div className="flex items-start gap-3">
            <Cookie size={18} className="text-rose-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-base font-semibold text-[var(--text-main)] mb-2">5. Cookies</h2>
              <p className="text-xs">We use essential cookies for authentication and session management. Analytics cookies help us improve platform performance. You can control cookie preferences through your browser settings. No third-party tracking cookies are used.</p>
            </div>
          </div>
        </section>

        {/* 6 */}
        <section className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <div className="flex items-start gap-3">
            <Mail size={18} className="text-blue-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-base font-semibold text-[var(--text-main)] mb-2">6. Your Rights</h2>
              <p className="text-xs mb-3">Under applicable data protection laws (GDPR, CCPA), you have the right to:</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  'Access your personal data held by us',
                  'Correct inaccurate or incomplete data',
                  'Delete your account and associated data',
                  'Export your data in a portable format',
                  'Object to processing of your personal data',
                  'Withdraw consent at any time',
                  'Restrict processing in certain circumstances',
                  'Lodge a complaint with a supervisory authority',
                ].map((right, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 size={10} className="text-blue-400 shrink-0" />
                    <span>{right}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <h2 className="text-base font-semibold text-[var(--text-main)] mb-2">Contact</h2>
          <p className="text-xs">
            For privacy-related inquiries, data requests, or concerns, contact our Data Protection Officer at{' '}
            <a href="mailto:privacy@stelltask.io" className="text-violet-400 hover:text-violet-300 transition">privacy@stelltask.io</a>.
            We respond to all requests within 30 days as required by GDPR.
          </p>
        </section>
      </div>
    </div>
  );
}
