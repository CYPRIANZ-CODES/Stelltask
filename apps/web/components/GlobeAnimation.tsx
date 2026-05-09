'use client';

import { motion } from 'framer-motion';

const StellarLogo = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 1024 1024" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0zm0 938.7C267.7 938.7 69.3 740.3 69.3 512S267.7 85.3 512 85.3 954.7 283.7 954.7 512 756.3 938.7 512 938.7z" fill="currentColor" />
    <path d="M729.1 573.9l-117.3-61.9L729.1 450c26.7-14.1 36.8-47.5 22.7-74.2-14.1-26.7-47.5-36.8-74.2-22.7L442 459.7l-71.1-37.5c-26.7-14.1-60.1-4-74.2 22.7-14.1 26.7-4 60.1 22.7 74.2l117.3 61.9L294.9 574c-26.7 14.1-36.8 47.5-22.7 74.2 14.1 26.7 47.5 36.8 74.2 22.7l235.6-124.3 71.1 37.5c26.7 14.1 60.1 4 74.2-22.7 14.1-26.7 4-60.1-22.7-74.2z" fill="currentColor" />
  </svg>
);

const GlobeIcon = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 16 16"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="8" cy="8" r="8" />
    <path d="M8 1.077c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H8z" />
    <path d="M4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4z" />
    <path d="M3.508 7.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5z" />
    <path d="M4.847 5a12.5 12.5 0 0 0-.338 2.5H8V5z" />
    <path d="M9.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5z" />
    <path d="M4.51 8.5a12.5 12.5 0 0 0 .337 2.5H8V8.5z" />
    <path d="M11.5 8.5V11h2.653c.187-.765.306-1.608.338-2.5z" />
    <path d="M5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12z" />
    <path d="M5.327 14.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472z" />
    <path d="M3.82 11a13.7 13.7 0 0 1-.312-2.5H1.318c.062.89.291 1.733.656 2.5z" />
    <path d="M10.353 15.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933z" />
    <path d="M9.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068z" />
    <path d="M13.18 11h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5z" />
    <path d="M11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933z" />
    <path d="M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
  </svg>
);

export default function GlobeAnimation() {
  const orbitCount = 20;
  const orbitRadius = 140;

  return (
    <div className="flex items-center justify-center w-full h-full text-black dark:text-white">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-black/5 dark:bg-white/5 blur-3xl" />

        <div className="relative w-72 h-72 md:w-96 md:h-96">
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.15" />
              <circle cx="200" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.12" />
              <circle cx="200" cy="200" r="80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
            </svg>
          </motion.div>

          <div className="absolute inset-0">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
              {Array.from({ length: orbitCount }).map((_, index) => {
                const angle = (index * (360 / orbitCount)) * (Math.PI / 180);
                const x = 200 + Math.cos(angle) * orbitRadius;
                const y = 200 + Math.sin(angle) * orbitRadius;
                return (
                  <line
                    key={`line-${index}`}
                    x1="200"
                    y1="200"
                    x2={x}
                    y2={y}
                    stroke="currentColor"
                    strokeWidth="0.75"
                    strokeDasharray="4 4"
                    opacity="0.18"
                  />
                );
              })}
            </svg>
          </div>

          <motion.div
            className="absolute inset-0"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: orbitCount }).map((_, index) => {
              const angle = index * (360 / orbitCount);
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * orbitRadius;
              const y = Math.sin(rad) * orbitRadius;

              return (
                <motion.div
                  key={`logo-${index}`}
                  className="absolute top-1/2 left-1/2"
                  style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12 + (index % 3) * 0.8, repeat: Infinity, ease: 'linear' }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-white/95 dark:bg-slate-950 shadow-lg shadow-black/10 dark:shadow-white/10 border border-black/5 dark:border-white/10 flex items-center justify-center text-current"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.1 }}
                  >
                    <StellarLogo className="w-5 h-5" />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            <div className="relative w-[110px] h-[110px] rounded-full bg-transparent border border-current/20 shadow-[0_0_60px_rgba(0,0,0,0.08)] dark:shadow-[0_0_60px_rgba(255,255,255,0.08)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-[rgba(255,255,255,0.9)] dark:bg-[rgba(0,0,0,0.85)] border border-current/10 flex items-center justify-center shadow-xl shadow-black/10 dark:shadow-white/10">
                  <GlobeIcon className="w-16 h-16" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-current"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}
+