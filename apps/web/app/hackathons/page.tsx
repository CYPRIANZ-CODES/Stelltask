'use client';

import { useState, useEffect } from 'react';
import { Calendar, Trophy, Users, Clock, Plus } from 'lucide-react';

interface Hackathon {
  id: string;
  title: string;
  shortDescription: string;
  bannerImageUrl: string;
  status: string;
  prizePoolXLM: number;
  registrationStart: string;
  registrationEnd: string;
  submissionStart: string;
  submissionEnd: string;
  _count: {
    projects: number;
    participants: number;
  };
}

export default function HackathonsPage() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'active' | 'voting' | 'completed'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - replace with API call
    const mockHackathons: Hackathon[] = [
      {
        id: '1',
        title: 'Stellar DeFi Hackathon 2024',
        shortDescription: 'Build the future of decentralized finance on Stellar',
        bannerImageUrl: '',
        status: 'SUBMISSION_OPEN',
        prizePoolXLM: 50000,
        registrationStart: '2024-01-01',
        registrationEnd: '2024-01-15',
        submissionStart: '2024-01-16',
        submissionEnd: '2024-02-15',
        _count: { projects: 45, participants: 120 },
      },
      {
        id: '2',
        title: 'Soroban Smart Contract Challenge',
        shortDescription: 'Create innovative smart contracts using Soroban',
        bannerImageUrl: '',
        status: 'VOTING_OPEN',
        prizePoolXLM: 25000,
        registrationStart: '2023-11-01',
        registrationEnd: '2023-11-15',
        submissionStart: '2023-11-16',
        submissionEnd: '2023-12-15',
        _count: { projects: 32, participants: 85 },
      },
      {
        id: '3',
        title: 'Stellar Wallet Integration Sprint',
        shortDescription: 'Integrate Stellar wallets into popular apps',
        bannerImageUrl: '',
        status: 'WINNERS_ANNOUNCED',
        prizePoolXLM: 10000,
        registrationStart: '2023-09-01',
        registrationEnd: '2023-09-10',
        submissionStart: '2023-09-11',
        submissionEnd: '2023-10-01',
        _count: { projects: 18, participants: 42 },
      },
    ];
    setHackathons(mockHackathons);
    setLoading(false);
  }, []);

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { text: string; color: string }> = {
      DRAFT: { text: 'Draft', color: 'bg-gray-500/20 text-gray-400' },
      PUBLISHED: { text: 'Registration Open', color: 'bg-green-500/20 text-green-400' },
      SUBMISSION_OPEN: { text: 'Submission Open', color: 'bg-blue-500/20 text-blue-400' },
      VOTING_OPEN: { text: 'Voting', color: 'bg-purple-500/20 text-purple-400' },
      WINNERS_ANNOUNCED: { text: 'Completed', color: 'bg-orange-500/20 text-orange-400' },
    };
    return badges[status] || { text: status, color: 'bg-gray-500/20 text-gray-400' };
  };

  const filteredHackathons = hackathons.filter(h => {
    if (filter === 'all') return true;
    if (filter === 'active') return h.status === 'SUBMISSION_OPEN';
    if (filter === 'voting') return h.status === 'VOTING_OPEN';
    if (filter === 'completed') return h.status === 'WINNERS_ANNOUNCED';
    if (filter === 'upcoming') return h.status === 'PUBLISHED';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-medium mb-2">Hackathons</h1>
              <p className="text-white/50">Participate in coding challenges and win XLM prizes</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Create Hackathon
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2">
          {(['all', 'upcoming', 'active', 'voting', 'completed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filter === f
                  ? 'bg-violet-600 text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Hackathon Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {loading ? (
          <div className="text-center py-12 text-white/50">Loading...</div>
        ) : filteredHackathons.length === 0 ? (
          <div className="text-center py-12 text-white/50">No hackathons found</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHackathons.map(hackathon => {
              const badge = getStatusBadge(hackathon.status);
              return (
                <div
                  key={hackathon.id}
                  className="group rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all hover:-translate-y-1 overflow-hidden"
                >
                  {/* Banner */}
                  <div className="h-40 bg-gradient-to-br from-violet-600/30 to-blue-600/30 flex items-center justify-center">
                    <Trophy className="w-12 h-12 text-white/30" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                        {badge.text}
                      </span>
                    </div>

                    <h3 className="text-lg font-medium mb-2">{hackathon.title}</h3>
                    <p className="text-white/50 text-sm mb-4 line-clamp-2">{hackathon.shortDescription}</p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{hackathon._count.participants}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        <span>{hackathon._count.projects}</span>
                      </div>
                    </div>

                    {/* Prize Pool */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <div className="text-white/40 text-xs">Prize Pool</div>
                        <div className="text-xl font-medium text-violet-400">{hackathon.prizePoolXLM.toLocaleString()} XLM</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white/40 text-xs">Submission Ends</div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(hackathon.submissionEnd).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
