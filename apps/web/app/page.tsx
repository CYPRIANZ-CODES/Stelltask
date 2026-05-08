export default function LandingPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden opacity-20">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-[128px]" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Stellar Testnet Beta Live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            The Protocol for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Open-Source Work</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            A decentralized work marketplace where every task is protected by Stellar escrows. 
            No middleman, no delays—just verifiable code for verifiable rewards.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-lg shadow-blue-200">
              Start Contributing
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
              Post a Task
            </button>
          </div>
          
          <div className="mt-20 pt-10 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900">500+</span>
              <span className="text-sm text-slate-500 font-medium">Verified Tasks</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900">12M+</span>
              <span className="text-sm text-slate-500 font-medium">XLM Disbursed</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900">1.2k</span>
              <span className="text-sm text-slate-500 font-medium">Active Contributors</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900">98%</span>
              <span className="text-sm text-slate-500 font-medium">Approval Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Fair. Fast. Final.</h2>
            <p className="text-slate-600">The journey from "Issue" to "Paid" on the Stellar blockchain.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-blue-200" />
            
            {[
              { title: "Connect", desc: "Link your Stellar wallet and GitHub profile to verify your identity.", step: 1 },
              { title: "Claim", desc: "Browse open tasks and join the fair-assignment queue based on your score.", step: 2 },
              { title: "Build", desc: "Submit your work via Pull Request. Funds are already locked in escrow.", step: 3 },
              { title: "Earn", desc: "Once approved, XLM is instantly released to your wallet via smart contract.", step: 4 },
            ].map((s) => (
              <div key={s.step} className="relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10 shadow-md">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Built for the <br /> <span className="text-blue-600">Stellar Ecosystem</span></h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
                  🛡️
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Escrow-Protected Rewards</h4>
                  <p className="text-slate-600 text-sm">Every task is funded upfront. No more chasing payments or hoping the budget exists. If you build it, you get paid.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-600">
                  📈
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Trust Score Reputation</h4>
                  <p className="text-slate-600 text-sm">Your performance creates your future. Build your score to unlock high-value Soroban tasks and priority assignment.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 text-green-600">
                  ⚡
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Soroban Smart Contracts</h4>
                  <p className="text-slate-600 text-sm">Automated release logic. No human intervention needed once criteria are met. Native speed, native security.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 relative shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent" />
              {/* Mock Dashboard UI Snippet */}
              <div className="p-8">
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Task</h5>
                      <h3 className="text-xl font-bold text-slate-900">Implement SEP-24 Auth</h3>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Escrow Funded</span>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-blue-600 rounded-full" />
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>Reward: 5,000 XLM</span>
                      <span>Progress: 65%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Element */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-lg font-bold">✓</div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Payment Released</p>
                <p className="text-sm font-bold text-slate-900">+500.00 USDC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to scale your <br /> open-source project?</h2>
          <p className="text-blue-100 text-lg mb-10 opacity-90">
            Join the decentralized workforce building on Stellar. 
            Automate your bounty management and attract top talent today.
          </p>
          <button className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-xl hover:bg-slate-50 hover:scale-[1.05] transition-all shadow-xl">
            Register Repository
          </button>
          <p className="mt-8 text-sm text-blue-200">No upfront platform fees. Pay only when work is approved.</p>
        </div>
      </section>
    </main>
  );
}
