'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Global Reach',
    subtitle: 'Built on Stellar',
    description: 'Stelltask connects open-source contributors and funders worldwide through the Stellar network — fast, low-cost, and borderless.',
    gradient: 'from-[#6366f1] via-[#8b5cf6] to-[#a855f7]',
    bgGlow: 'bg-violet-500/10',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: 'Lightning Fast',
    subtitle: '3-5 Second Settlements',
    description: 'Transactions settle in seconds at fractions of a cent. Perfect for micro-tasks, bounties, and recurring payments at any scale.',
    gradient: 'from-[#06b6d4] via-[#0ea5e9] to-[#3b82f6]',
    bgGlow: 'bg-cyan-500/10',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Secure & Transparent',
    subtitle: 'Blockchain Escrow',
    description: 'Smart contract escrow protects both task creators and developers. Funds release automatically when work is verified — zero trust required.',
    gradient: 'from-[#10b981] via-[#34d399] to-[#059669]',
    bgGlow: 'bg-emerald-500/10',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Built for Community',
    subtitle: 'Open Source First',
    description: 'Empowering open-source ecosystems with tools for dependency funding, RetroPGF rounds, and community-driven development initiatives.',
    gradient: 'from-[#f59e0b] via-[#f97316] to-[#ef4444]',
    bgGlow: 'bg-amber-500/10',
  },
];

const transitionVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

export default function AboutSlider() {
  const [[index, direction], setPage] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    setPage(([prev]) => [(prev + newDirection + slides.length) % slides.length, newDirection]);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => paginate(1), 4500);
    return () => clearInterval(timer);
  }, [paused, paginate]);

  const slide = slides[index];

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background glow */}
      <div className={`absolute inset-0 ${slide.bgGlow} blur-3xl rounded-full transition-colors duration-700`} />

      <div className="relative w-full max-w-sm mx-auto px-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={transitionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col items-center text-center"
          >
            {/* Icon container */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              className="flex items-center justify-center w-16 h-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-white/90 mb-6"
            >
              {slide.icon}
            </motion.div>

            {/* Subtitle */}
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-white/50 mb-3">
              {slide.subtitle}
            </span>

            {/* Title */}
            <h3 className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.gradient} text-2xl md:text-3xl font-bold leading-tight mb-4`}>
              {slide.title}
            </h3>

            {/* Description */}
            <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xs mx-auto">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > index ? 1 : -1])}
              className="relative group"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index
                  ? 'w-8 bg-white/80'
                  : 'w-1.5 bg-white/20 group-hover:bg-white/40 group-hover:w-3'
              }`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
