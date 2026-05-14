'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Zap } from 'lucide-react';

interface DocsSearchProps {
  open: boolean;
  onClose: () => void;
}

export default function DocsSearch({ open, onClose }: DocsSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-xl"
          >
            <div className="rounded-2xl border border-[var(--text-main)]/10 bg-[var(--bg-page)] shadow-2xl shadow-violet-900/10 overflow-hidden">
              {/* Input */}
              <div className="flex items-center gap-3 border-b border-[var(--text-main)]/10 px-5 py-4">
                <Search size={18} className="text-[var(--text-muted)] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search documentation..."
                  className="flex-1 bg-transparent text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] outline-none"
                />
                <button
                  onClick={onClose}
                  className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--text-main)]/5 transition"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Placeholder content */}
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 mb-4">
                  <Zap size={22} />
                </div>
                <p className="text-sm font-medium text-[var(--text-main)] mb-1">Elasticsearch coming soon</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Full-text search powered by Elasticsearch will be available in the next update.
                </p>
              </div>

              {/* Footer */}
              <div className="border-t border-[var(--text-main)]/10 px-5 py-3 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                <span>Search powered by Elasticsearch</span>
                <kbd className="inline-flex items-center gap-0.5 rounded border border-[var(--text-main)]/10 bg-[var(--text-main)]/5 px-1.5 py-0.5 font-mono">
                  <span className="text-[9px]">&#8999;</span> close
                </kbd>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
