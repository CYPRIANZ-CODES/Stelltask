import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stelltask | Stellar-Native Bounty Platform',
  description: 'A fair, transparent work marketplace built on the Stellar blockchain.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
              <span className="text-xl font-bold tracking-tight">stelltask</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="/tasks" className="hover:text-blue-600 transition-colors">Find Tasks</a>
              <a href="/repos" className="hover:text-blue-600 transition-colors">Repositories</a>
              <a href="/docs" className="hover:text-blue-600 transition-colors">How it Works</a>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-100 transition-colors">Log In</button>
              <button className="text-sm font-medium bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-slate-800 transition-all shadow-md">Connect Wallet</button>
            </div>
          </nav>
        </header>
        {children}
        <footer className="border-t bg-slate-900 text-slate-400 py-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 text-white mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-xs font-bold">S</div>
                <span className="text-lg font-bold">stelltask</span>
              </div>
              <p className="max-w-xs text-sm leading-relaxed">
                Building the infrastructure for the open-source economy. Powered by Stellar and Soroban.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/tasks" className="hover:text-white">Browse Tasks</a></li>
                <li><a href="/post" className="hover:text-white">Post a Task</a></li>
                <li><a href="/repos" className="hover:text-white">Eco-system Repos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Discord</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 flex justify-between items-center text-xs">
            <p>© 2026 stelltask. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/terms" className="hover:text-white">Terms</a>
              <a href="/privacy" className="hover:text-white">Privacy</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
