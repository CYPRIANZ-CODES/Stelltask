'use client';

import { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Criterion {
  name: string;
  description: string;
  weight: number;
}

export default function CreateHackathonPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    title: '',
    description: '',
    shortDescription: '',
    bannerImageUrl: '',
    
    // Step 2: Dates
    registrationStart: '',
    registrationEnd: '',
    submissionStart: '',
    submissionEnd: '',
    votingStart: '',
    votingEnd: '',
    
    // Step 3: Prize Pool
    prizePoolXLM: '',
    maxParticipants: '',
    maxTeamSize: '5',
    allowTeamProjects: true,
    requireRegistration: true,
    
    // Step 4: Judging Criteria
    judgingCriteria: [
      { name: 'Innovation', description: 'How creative and unique is the solution?', weight: 30 },
      { name: 'Technical Quality', description: 'Code quality, architecture, and best practices', weight: 30 },
      { name: 'User Experience', description: 'UI/UX design and usability', weight: 20 },
      { name: 'Presentation', description: 'Demo quality and explanation', weight: 20 },
    ] as Criterion[],
  });

  const addCriterion = () => {
    setFormData({
      ...formData,
      judgingCriteria: [
        ...formData.judgingCriteria,
        { name: '', description: '', weight: 10 },
      ],
    });
  };

  const removeCriterion = (index: number) => {
    setFormData({
      ...formData,
      judgingCriteria: formData.judgingCriteria.filter((_, i) => i !== index),
    });
  };

  const updateCriterion = (index: number, field: keyof Criterion, value: string | number) => {
    const updated = [...formData.judgingCriteria];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, judgingCriteria: updated });
  };

  const totalWeight = formData.judgingCriteria.reduce((sum, c) => sum + c.weight, 0);

  const handleSubmit = async () => {
    // API call to create hackathon
    console.log('Creating hackathon:', formData);
    // Redirect to hackathon detail page
  };

  const steps = [
    { title: 'Basic Info', description: 'Title, description, and banner' },
    { title: 'Dates', description: 'Registration and submission windows' },
    { title: 'Prize Pool', description: 'XLM amount and configuration' },
    { title: 'Judging Criteria', description: 'Scoring rubric and weights' },
    { title: 'Review', description: 'Preview and publish' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/hackathons" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Hackathons
          </Link>
          <h1 className="text-3xl font-medium">Create Hackathon</h1>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex-1 flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                    step > i
                      ? 'bg-violet-600 text-white'
                      : step === i + 1
                      ? 'bg-violet-600 text-white'
                      : 'bg-white/10 text-white/40'
                  }`}
                >
                  {step > i ? '✓' : i + 1}
                </div>
                <div className="text-xs mt-2 text-center">
                  <div className={`font-medium ${step === i + 1 ? 'text-white' : 'text-white/40'}`}>
                    {s.title}
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-colors ${
                    step > i + 1 ? 'bg-violet-600' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="e.g., Stellar DeFi Hackathon 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Short Description</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="Brief description for card previews"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors resize-none"
                  placeholder="Full hackathon description with rules, requirements, and guidelines..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Banner Image URL</label>
                <input
                  type="text"
                  value={formData.bannerImageUrl}
                  onChange={e => setFormData({ ...formData, bannerImageUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="https://example.com/banner.jpg"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Registration Start *</label>
                <input
                  type="datetime-local"
                  value={formData.registrationStart}
                  onChange={e => setFormData({ ...formData, registrationStart: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Registration End *</label>
                <input
                  type="datetime-local"
                  value={formData.registrationEnd}
                  onChange={e => setFormData({ ...formData, registrationEnd: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Submission Start *</label>
                <input
                  type="datetime-local"
                  value={formData.submissionStart}
                  onChange={e => setFormData({ ...formData, submissionStart: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Submission End *</label>
                <input
                  type="datetime-local"
                  value={formData.submissionEnd}
                  onChange={e => setFormData({ ...formData, submissionEnd: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div className="pt-4 border-t border-white/10">
                <label className="block text-sm font-medium mb-2">Voting Start (Optional)</label>
                <input
                  type="datetime-local"
                  value={formData.votingStart}
                  onChange={e => setFormData({ ...formData, votingStart: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Voting End (Optional)</label>
                <input
                  type="datetime-local"
                  value={formData.votingEnd}
                  onChange={e => setFormData({ ...formData, votingEnd: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Prize Pool (XLM) *</label>
                <input
                  type="number"
                  min="10"
                  value={formData.prizePoolXLM}
                  onChange={e => setFormData({ ...formData, prizePoolXLM: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="Minimum 10 XLM"
                />
                <p className="text-white/40 text-sm mt-1">Minimum 10 XLM required</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Max Participants (Optional)</label>
                <input
                  type="number"
                  value={formData.maxParticipants}
                  onChange={e => setFormData({ ...formData, maxParticipants: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="Leave empty for unlimited"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Max Team Size</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.maxTeamSize}
                  onChange={e => setFormData({ ...formData, maxTeamSize: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.allowTeamProjects}
                    onChange={e => setFormData({ ...formData, allowTeamProjects: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Allow team projects</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requireRegistration}
                    onChange={e => setFormData({ ...formData, requireRegistration: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Require registration</span>
                </label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Judging Criteria</h3>
                <button
                  onClick={addCriterion}
                  className="flex items-center gap-2 px-3 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Criterion
                </button>
              </div>

              {formData.judgingCriteria.map((criterion, index) => (
                <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={criterion.name}
                      onChange={e => updateCriterion(index, 'name', e.target.value)}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                      placeholder="Criterion name"
                    />
                    <button
                      onClick={() => removeCriterion(index)}
                      className="ml-2 p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={criterion.description}
                    onChange={e => updateCriterion(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="Description"
                  />

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-xs text-white/40 mb-1">Weight (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={criterion.weight}
                        onChange={e => updateCriterion(index, 'weight', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className={`p-4 rounded-lg ${totalWeight === 100 ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Weight</span>
                  <span className={`font-medium ${totalWeight === 100 ? 'text-green-400' : 'text-red-400'}`}>
                    {totalWeight}%
                  </span>
                </div>
                {totalWeight !== 100 && (
                  <p className="text-white/40 text-xs mt-1">Weights must sum to 100%</p>
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-medium">Review Your Hackathon</h3>

              <div className="space-y-4">
                <div>
                  <div className="text-white/40 text-sm">Title</div>
                  <div className="font-medium">{formData.title || 'Not set'}</div>
                </div>

                <div>
                  <div className="text-white/40 text-sm">Description</div>
                  <div className="text-sm">{formData.description || 'Not set'}</div>
                </div>

                <div>
                  <div className="text-white/40 text-sm">Prize Pool</div>
                  <div className="font-medium text-violet-400">{formData.prizePoolXLM} XLM</div>
                </div>

                <div>
                  <div className="text-white/40 text-sm">Registration</div>
                  <div>
                    {formData.registrationStart} → {formData.registrationEnd}
                  </div>
                </div>

                <div>
                  <div className="text-white/40 text-sm">Submission</div>
                  <div>
                    {formData.submissionStart} → {formData.submissionEnd}
                  </div>
                </div>

                <div>
                  <div className="text-white/40 text-sm">Judging Criteria</div>
                  <ul className="mt-2 space-y-2">
                    {formData.judgingCriteria.map((c, i) => (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span>{c.name}</span>
                        <span className="text-violet-400">{c.weight}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5"
            >
              Previous
            </button>

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
              >
                Create Hackathon
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
