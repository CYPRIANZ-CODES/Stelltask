import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Stelltask | Open Work on Stellar',
  description: 'The new infrastructure for open work. Issue bounties at the speed of light on Stellar.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = window.localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (theme === 'light') document.documentElement.classList.add('light');
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-[var(--bg-page)] text-[var(--text-main)]">
        <Header />
        {children}
        <footer className="border-t border-[var(--text-main)]/10 bg-[var(--bg-page)] text-[var(--text-muted)] py-16">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 text-[var(--text-main)] mb-4">
                <div className="w-6 h-6 bg-violet-600 rounded flex items-center justify-center text-xs font-bold text-white">S</div>
                <span className="text-lg font-medium">stelltask</span>
              </div>
              <p className="max-w-xs text-sm leading-relaxed">
                Building the infrastructure for the open work economy. Powered by Stellar and Soroban.
              </p>
            </div>
            <div>
              <h4 className="text-[var(--text-main)]/80 font-medium mb-4 text-sm">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/tasks" className="hover:text-[var(--text-main)] transition-colors">Browse Tasks</a></li>
                <li><a href="/post" className="hover:text-[var(--text-main)] transition-colors">Post a Bounty</a></li>
                <li><a href="/repos" className="hover:text-[var(--text-main)] transition-colors">Repositories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[var(--text-main)]/80 font-medium mb-4 text-sm">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/docs" className="hover:text-[var(--text-main)] transition-colors">Documentation</a></li>
                <li><a href="https://github.com/stelltask" className="hover:text-[var(--text-main)] transition-colors">GitHub</a></li>
                <li><a href="https://stellar.org" className="hover:text-[var(--text-main)] transition-colors">Stellar</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-[var(--text-main)]/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <p>&copy; 2026 stelltask. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/docs/terms" className="hover:text-[var(--text-main)] transition-colors">Terms</a>
              <a href="/docs/privacy" className="hover:text-[var(--text-main)] transition-colors">Privacy</a>
              <a href="/docs" className="hover:text-[var(--text-main)] transition-colors">Docs</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
