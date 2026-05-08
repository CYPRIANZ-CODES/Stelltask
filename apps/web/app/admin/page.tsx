export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Moderation Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-bold uppercase mb-2">Pending Repos</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-bold uppercase mb-2">Active Disputes</h3>
          <p className="text-3xl font-bold text-red-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-bold uppercase mb-2">Platform Volume (24h)</h3>
          <p className="text-3xl font-bold">45,000 XLM</p>
        </div>
      </div>
      
      <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold">Active Disputes</h2>
          <button className="text-sm font-bold text-blue-600">View All</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-xs font-bold uppercase">
            <tr>
              <th className="px-6 py-4">Task</th>
              <th className="px-6 py-4">Raised By</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            <tr>
              <td className="px-6 py-4 font-medium">Bug fix in Stellar SDK</td>
              <td className="px-6 py-4">contributor_abc</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Under Review</span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-blue-600 font-bold">Review</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
