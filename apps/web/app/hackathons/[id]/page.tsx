'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Users, Calendar, Clock, ExternalLink, Github, Video, Plus, Send } from 'lucide-react';
import Link from 'next/link';

interface Hackathon {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  bannerImageUrl: string;
  status: string;
  prizePoolXLM: number;
  registrationStart: string;
  registrationEnd: string;
  submissionStart: string;
  submissionEnd: string;
  votingStart: string;
  votingEnd: string;
  maxParticipants: number;
  maxTeamSize: number;
  allowTeamProjects: boolean;
  requireRegistration: boolean;
  judgingCriteria: Array<{ name: string; description: string; weight: number }>;
  organizer: {
    id: string;
    email: string;
    profile: any;
  };
  _count: {
    projects: number;
    participants: number;
  };
}

interface Project {
  id: string;
  title: string;
  description: string;
  demoUrl: string;
  repoUrl: string;
  videoUrl: string;
  techStack: string[];
  totalScore: number;
  rank: number;
  submitter: {
    profile: any;
  };
  teamMembers: Array<{
    user: {
      profile: any;
    };
  }>;
}

export default function HackathonDetailPage({ params }: { params: { id: string } }) {
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    demoUrl: '',
    repoUrl: '',
    videoUrl: '',
    techStack: '',
    teamMembers: '',
  });

  useEffect(() => {
    // Mock data - replace with API call
    const mockHackathon: Hackathon = {
      id: params.id,
      title: 'Stellar DeFi Hackathon 2024',
      description: 'Build the future of decentralized finance on the Stellar network. Create innovative DeFi solutions that leverage Soroban smart contracts, stablecoins, and cross-chain interoperability.',
      shortDescription: 'Build the future of decentralized finance on Stellar',
      bannerImageUrl: '',
      status: 'SUBMISSION_OPEN',
      prizePoolXLM: 50000,
      registrationStart: '2024-01-01T00:00:00Z',
      registrationEnd: '2024-01-15T23:59:59Z',
      submissionStart: '2024-01-16T00:00:00Z',
      submissionEnd: '2024-02-15T23:59:59Z',
      votingStart: '2024-02-16T00:00:00Z',
      votingEnd: '2024-02-23T23:59:59Z',
      maxParticipants: undefined as any,
      maxTeamSize: 5,
      allowTeamProjects: true,
      requireRegistration: true,
      judgingCriteria: [
        { name: 'Innovation', description: 'How creative and unique is the solution?', weight: 30 },
        { name: 'Technical Quality', description: 'Code quality, architecture, and best practices', weight: 30 },
        { name: 'User Experience', description: 'UI/UX design and usability', weight: 20 },
        { name: 'Presentation', description: 'Demo quality and explanation', weight: 20 },
      ],
      organizer: {
        id: '1',
        email: 'organizer@example.com',
        profile: { displayName: 'Stellar Foundation' },
      },
      _count: { projects: 45, participants: 120 },
    };

    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'Stellar DEX Aggregator',
        description: 'A decentralized exchange aggregator that finds the best prices across multiple Stellar DEXs',
        demoUrl: 'https://demo.example.com',
        repoUrl: 'https://github.com/example/dex',
        videoUrl: 'https://youtube.com/watch?v=example',
        techStack: ['React', 'Soroban', 'TypeScript'],
        totalScore: 85,
        rank: 1,
        submitter: { profile: { displayName: 'Team Alpha' } },
        teamMembers: [],
      },
      {
        id: '2',
        title: 'Cross-chain Bridge',
        description: 'Secure bridge for transferring assets between Stellar and other chains',
        demoUrl: 'https://demo2.example.com',
        repoUrl: 'https://github.com/example/bridge',
        videoUrl: '',
        techStack: ['Rust', 'Soroban', 'Python'],
        totalScore: 78,
        rank: 2,
        submitter: { profile: { displayName: 'Team Beta' } },
        teamMembers: [],
      },
    ];

    setHackathon(mockHackathon);
    setProjects(mockProjects);
    setLoading(false);
  }, [params.id]);

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

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // API call to submit project
    console.log('Submitting project:', projectForm);
    setShowSubmitForm(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Loading...</div>;
  }

  if (!hackathon) {
    return <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Hackathon not found</div>;
  }

  const badge = getStatusBadge(hackathon.status);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/hackathons" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Hackathons
          </Link>
        </div>
      </div>

      {/* Banner */}
      <div className="h-64 bg-gradient-to-br from-violet-600/30 to-blue-600/30 flex items-center justify-center">
        <Trophy className="w-20 h-20 text-white/30" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
                  {badge.text}
                </span>
                <div className="flex items-center gap-1 text-sm text-white/60">
                  <Users className="w-4 h-4" />
                  <span>{hackathon._count.participants} participants</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-white/60">
                  <Trophy className="w-4 h-4" />
                  <span>{hackathon._count.projects} projects</span>
                </div>
              </div>

              <h1 className="text-3xl font-medium mb-4">{hackathon.title}</h1>
              <p className="text-white/70 leading-relaxed">{hackathon.description}</p>
            </div>

            {/* Timeline */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-medium mb-4">Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-violet-400" />
                  <div>
                    <div className="text-sm text-white/60">Registration</div>
                    <div className="font-medium">
                      {new Date(hackathon.registrationStart).toLocaleDateString()} - {new Date(hackathon.registrationEnd).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-sm text-white/60">Submission</div>
                    <div className="font-medium">
                      {new Date(hackathon.submissionStart).toLocaleDateString()} - {new Date(hackathon.submissionEnd).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                {hackathon.votingStart && (
                  <div className="flex items-center gap-4">
                    <Trophy className="w-5 h-5 text-orange-400" />
                    <div>
                      <div className="text-sm text-white/60">Voting</div>
                      <div className="font-medium">
                        {new Date(hackathon.votingStart).toLocaleDateString()} - {new Date(hackathon.votingEnd).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Judging Criteria */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-medium mb-4">Judging Criteria</h2>
              <div className="space-y-3">
                {hackathon.judgingCriteria.map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 font-medium text-sm flex-shrink-0">
                      {c.weight}%
                    </div>
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-sm text-white/60">{c.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Submitted Projects</h2>
                {hackathon.status === 'SUBMISSION_OPEN' && (
                  <button
                    onClick={() => setShowSubmitForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Submit Project
                  </button>
                )}
              </div>

              {projects.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-white/50">
                  No projects submitted yet
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {projects.map(project => (
                    <div key={project.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-violet-500/30 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{project.title}</h3>
                        {project.rank && (
                          <span className="text-sm text-violet-400">#{project.rank}</span>
                        )}
                      </div>
                      <p className="text-sm text-white/60 mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map(tech => (
                          <span key={tech} className="px-2 py-1 bg-white/5 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        {project.demoUrl && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors">
                            <ExternalLink className="w-3 h-3" />
                            Demo
                          </a>
                        )}
                        {project.repoUrl && (
                          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors">
                            <Github className="w-3 h-3" />
                            Code
                          </a>
                        )}
                        {project.videoUrl && (
                          <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors">
                            <Video className="w-3 h-3" />
                            Video
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prize Pool */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-white/40 text-sm mb-2">Prize Pool</div>
              <div className="text-3xl font-medium text-violet-400">{hackathon.prizePoolXLM.toLocaleString()} XLM</div>
            </div>

            {/* Organizer */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-white/40 text-sm mb-2">Organized by</div>
              <div className="font-medium">{hackathon.organizer.profile?.displayName || hackathon.organizer.email}</div>
            </div>

            {/* Configuration */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-white/40 text-sm mb-4">Configuration</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Max Team Size</span>
                  <span>{hackathon.maxTeamSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Team Projects</span>
                  <span>{hackathon.allowTeamProjects ? 'Allowed' : 'Not Allowed'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Registration</span>
                  <span>{hackathon.requireRegistration ? 'Required' : 'Optional'}</span>
                </div>
                {hackathon.maxParticipants && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Max Participants</span>
                    <span>{hackathon.maxParticipants}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Submission Modal */}
      {showSubmitForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-medium">Submit Project</h2>
            </div>
            <form onSubmit={handleProjectSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project Title *</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={projectForm.description}
                  onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Demo URL *</label>
                <input
                  type="url"
                  value={projectForm.demoUrl}
                  onChange={e => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Repository URL</label>
                <input
                  type="url"
                  value={projectForm.repoUrl}
                  onChange={e => setProjectForm({ ...projectForm, repoUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Video URL</label>
                <input
                  type="url"
                  value={projectForm.videoUrl}
                  onChange={e => setProjectForm({ ...projectForm, videoUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={projectForm.techStack}
                  onChange={e => setProjectForm({ ...projectForm, techStack: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="React, TypeScript, Soroban"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Team Members (comma-separated emails)</label>
                <input
                  type="text"
                  value={projectForm.teamMembers}
                  onChange={e => setProjectForm({ ...projectForm, teamMembers: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="member1@example.com, member2@example.com"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSubmitForm(false)}
                  className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
