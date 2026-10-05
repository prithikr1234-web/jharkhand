import React from 'react';

export const CardSkeleton: React.FC<{ rows?: number }> = ({ rows = 3 }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-xl p-4 shadow-xs animate-pulse space-y-3">
      <div className="h-44 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-full" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
      <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
      {rows > 1 && <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />}
      {rows > 2 && <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3" />}
      <div className="flex items-center gap-2 pt-2">
        <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-24" />
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
      <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-xl p-4 space-y-4">
        <div className="h-72 sm:h-96 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-full" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-24" />
        <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-4/5" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3" />
      </div>
      <div className="lg:col-span-4 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-3 bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 p-3 rounded-lg">
            <div className="w-20 h-20 bg-zinc-200 dark:bg-zinc-800 rounded flex-shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
              <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
