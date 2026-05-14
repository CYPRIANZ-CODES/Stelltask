import { Shield, ExternalLink, Lock, Server } from 'lucide-react';

export default function APIReference() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--text-muted)] mb-2">Reference</p>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">API Reference</h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          The Stelltask platform exposes a secure REST API for integrating with the platform. 
          All requests require proper authentication. Authorized developers can access full 
          interactive documentation through the platform&apos;s API explorer.
        </p>
      </div>

      <section className="mb-8">
        <div className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Server size={16} className="text-violet-400" />
            <h2 className="text-base font-semibold">API access</h2>
          </div>
          <div className="space-y-3 text-xs text-[var(--text-muted)]">
            <p>
              The Stelltask API enables programmatic access to the platform. It handles authentication, 
              task management, payments, and user operations in a secure, rate-limited environment.
            </p>
            <p>
              Developers building integrations can access the full API specification through 
              the platform&apos;s interactive API documentation, available to authenticated users.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={16} className="text-emerald-400" />
            <h2 className="text-base font-semibold">Authentication</h2>
          </div>
          <div className="space-y-3 text-xs text-[var(--text-muted)]">
            <p>
              All API requests require authentication. The platform uses industry-standard token-based 
              authentication with automatic session management.
            </p>
            <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-4">
              <div className="flex items-start gap-2">
                <Shield size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-emerald-400/90 mb-1">Security measures</p>
                  <p className="text-[11px] text-emerald-400/70">
                    All API traffic is encrypted. Rate limiting is applied per-user and per-IP. 
                    Tokens are rotated regularly. Failed authentication attempts are throttled.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <h2 className="text-base font-semibold mb-4">Available capabilities</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Authentication',
                desc: 'User registration, login, and session management. Supports email/password and OAuth providers.',
              },
              {
                title: 'Task management',
                desc: 'Create, browse, claim, and manage tasks through their lifecycle. Filtering and search available.',
              },
              {
                title: 'Payments & escrow',
                desc: 'On-chain payment processing with Stellar. Escrow creation, funding confirmation, and payout triggers.',
              },
              {
                title: 'User & profile',
                desc: 'Profile management, wallet linking, reputation tracking, and notification preferences.',
              },
              {
                title: 'Repositories',
                desc: 'Repository submission and management for maintainers. Issue syncing and bounty creation.',
              },
              {
                title: 'Administration',
                desc: 'Platform administration: user moderation, dispute resolution, and analytics.',
              },
            ].map((cap) => (
              <div key={cap.title} className="rounded-lg border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 p-3">
                <h3 className="text-xs font-semibold mb-1">{cap.title}</h3>
                <p className="text-[11px] text-[var(--text-muted)]">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="rounded-xl border border-[var(--text-main)]/10 bg-[var(--text-main)]/3 p-5">
          <p className="text-xs text-[var(--text-muted)]">
            Full interactive API documentation with endpoint specifications, request examples, and 
            response schemas is available to authorized developers through the platform.
          </p>
        </div>
      </section>
    </div>
  );
}
