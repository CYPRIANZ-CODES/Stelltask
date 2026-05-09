'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Star, Save, Send, ExternalLink, Github, Video } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  demoUrl: string;
  repoUrl: string;
  videoUrl: string;
  techStack: string[];
  submitter: {
    profile: any;
  };
  reviews: Array<{
    judge: {
      profile: any;
    };
    totalScore: number;
    feedback: string;
  }>;
}

interface Hackathon {
  id: string;
  title: string;
  judgingCriteria: Array<{ name: string; description: string; weight: number }>;
}

export default function JudgeDashboardPage({ params }: { params: { id: string } }) {
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    const mockHackathon: Hackathon = {
      id: params.id,
      title: 'Stellar DeFi Hackathon 2024',
      judgingCriteria: [
        { name: 'Innovation', description: 'How creative and unique is the solution?', weight: 30 },
        { name: 'Technical Quality', description: 'Code quality, architecture, and best practices', weight: 30 },
        { name: 'User Experience', description: 'UI/UX design and usability', weight: 20 },
        { name: 'Presentation', description: 'Demo quality and explanation', weight: 20 },
      ],
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
        submitter: { profile: { displayName: 'Team Alpha' } },
        reviews: [],
      },
      {
        id: '2',
        title: 'Cross-chain Bridge',
        description: 'Secure bridge for transferring assets between Stellar and other chains',
        demoUrl: 'https://demo2.example.com',
        repoUrl: 'https://github.com/example/bridge',
        videoUrl: '',
        techStack: ['Rust', 'Soroban', 'Python'],
        submitter: { profile: { displayName: 'Team Beta' } },
        reviews: [],
      },
      {
        id: '3',
        title: 'Stablecoin Protocol',
        description: 'Over-collateralized stablecoin protocol on Soroban',
        demoUrl: 'https://demo3.example.com',
        repoUrl: 'https://github.com/example/stablecoin',
        videoUrl: 'https://youtube.com/watch?v=example2',
        techStack: ['Solidity', 'Soroban', 'JavaScript'],
        submitter: { profile: { displayName: 'Team Gamma' } },
        reviews: [],
      },
    ];

    setHackathon(mockHackathon);
    setProjects(mockProjects);
    setLoading(false);
  }, [params.id]);

  const handleScoreChange = (criterionName: string, score: number) => {
    setScores({ ...scores, [criterionName]: score });
  };

  const handleSaveDraft = async () => {
    if (!selectedProject) return;
    console.log('Saving draft review for project:', selectedProject.id, scores, feedback);
  };

  const handleSubmitReview = async () => {
    if (!selectedProject) return;
    console.log('Submitting review for project:', selectedProject.id, scores, feedback);
    setSelectedProject(null);
    setScores({});
    setFeedback('');
  };

  const calculateTotalScore = () => {
    if (!hackathon) return 0;
    return hackathon.judgingCriteria.reduce((sum, c) => sum + (scores[c.name] || 0), 0);
  };

  const getReviewedStatus = (project: Project) => {
    if (project.reviews.length === 0) return { text: 'Not Reviewed', color: 'text-gray-400' };
    const myReview = project.reviews.find(r => r.judge.profile?.displayName === 'You');
    if (myReview) return { text: 'Reviewed', color: 'text-green-400' };
    return { text: 'In Progress', color: 'text-yellow-400' };
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Loading...</div>;
  }

  if (!hackathon) {
    return <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Hackathon not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href={`/hackathons/${params.id}`} className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Hackathon
          </Link>
          <h1 className="text-3xl font-medium">Judge Dashboard</h1>
          <p className="text-white/50 mt-1">{hackathon.title}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-medium mb-4">Projects to Review</h2>
            <div className="space-y-2">
              {projects.map(project => {
                const status = getReviewedStatus(project);
                return (
                  <button
                    key={project.id}
                    onClick={() => {
                      setSelectedProject(project);
                      setScores({});
                      setFeedback('');
                    }}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedProject?.id === project.id
                        ? 'bg-violet-500/10 border-violet-500/30'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{project.title}</h3>
                      <span className={`text-xs ${status.color}`}>{status.text}</span>
                    </div>
                    <p className="text-sm text-white/60 line-clamp-2">{project.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Panel */}
          <div className="lg:col-span-2">
            {selectedProject ? (
              <div className="space-y-6">
                {/* Project Info */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-medium mb-2">{selectedProject.title}</h2>
                  <p className="text-white/70 mb-4">{selectedProject.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.techStack.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-white/5 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {selectedProject.demoUrl && (
                      <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {selectedProject.repoUrl && (
                      <a href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-colors">
                        <Github className="w-4 h-4" />
                        Repository
                      </a>
                    )}
                    {selectedProject.videoUrl && (
                      <a href={selectedProject.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-colors">
                        <Video className="w-4 h-4" />
                        Video
                      </a>
                    )}
                  </div>
                </div>

                {/* Scoring */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h2 className="text-lg font-medium mb-4">Scoring</h2>
                  
                  {hackathon.judgingCriteria.map((criterion, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium">{criterion.name}</div>
                          <div className="text-sm text-white/60">{criterion.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-medium text-violet-400">{scores[criterion.name] || 0}</div>
                          <div className="text-xs text-white/40">/ {criterion.weight}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <button
                            key={num}
                            onClick={() => handleScoreChange(criterion.name, num)}
                            className={`flex-1 py-2 rounded-lg transition-all ${
                              scores[criterion.name] === num
                                ? 'bg-violet-600 text-white'
                                : scores[criterion.name] > num
                                ? 'bg-violet-500/30 text-white'
                                : 'bg-white/5 text-white/40 hover:bg-white/10'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Total Score</span>
                      <span className="text-2xl font-medium text-violet-400">{calculateTotalScore()}</span>
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h2 className="text-lg font-medium mb-4">Feedback</h2>
                  <textarea
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors resize-none"
                    placeholder="Provide detailed feedback about the project's strengths, weaknesses, and suggestions for improvement..."
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={handleSaveDraft}
                    className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Draft
                  </button>
                  <button
                    onClick={handleSubmitReview}
                    className="flex-1 px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Review
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <Star className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h2 className="text-xl font-medium mb-2">Select a Project to Review</h2>
                <p className="text-white/50">Choose a project from the list to start reviewing</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
