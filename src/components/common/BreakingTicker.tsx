import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublicBreakingNews } from '../../api';
import { Article } from '../../api/types';
import { Flame, ChevronRight } from 'lucide-react';

export const BreakingTicker: React.FC = () => {
  const [breakingArticles, setBreakingArticles] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let mounted = true;
    getPublicBreakingNews().then((data) => {
      if (mounted && data.length > 0) {
        setBreakingArticles(data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (breakingArticles.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingArticles.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [breakingArticles, isPaused]);

  if (breakingArticles.length === 0) return null;

  const current = breakingArticles[currentIndex];

  return (
    <div
      className="bg-brand text-white text-sm py-1.5 px-3 sm:px-6 shadow-inner flex items-center gap-3 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      role="region"
      aria-label="ब्रेकिंग न्यूज़"
    >
      <div className="flex items-center gap-1.5 bg-brand-dark px-2.5 py-0.5 rounded-xs font-bold text-xs uppercase tracking-wider flex-shrink-0 animate-pulse border border-white/20">
        <Flame className="w-3.5 h-3.5 text-saffron fill-saffron" />
        <span>ब्रेकिंग</span>
      </div>

      <div className="flex-1 overflow-hidden">
        <Link
          to={`/news/${current.id}/${current.slug}`}
          className="truncate block hover:underline hover:text-amber-100 transition-colors font-headline font-semibold text-xs sm:text-sm"
          title={current.titleHi}
        >
          {current.titleHi}
        </Link>
      </div>

      <div className="flex items-center gap-1 text-[11px] text-white/80 flex-shrink-0">
        <span>
          {currentIndex + 1}/{breakingArticles.length}
        </span>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % breakingArticles.length)}
          className="p-1 hover:bg-white/10 rounded transition-colors"
          title="अगली खबर"
          aria-label="अगली खबर"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
