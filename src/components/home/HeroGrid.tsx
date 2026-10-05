/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../api/types';
import { Clock, User } from 'lucide-react';

interface HeroGridProps {
  articles: Article[];
}

export const HeroGrid: React.FC<HeroGridProps> = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  const topStory = articles[0];
  const subStories = articles.slice(1, 5);

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Large Top Story (Col 7 on desktop) */}
        <article className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
          <div>
            <Link to={`/news/${topStory.id}/${topStory.slug}`} className="block relative aspect-16/9 sm:aspect-16/10 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <img
                src={topStory.featuredImage}
                alt={topStory.titleHi}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                loading="eager"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-brand text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                  {topStory.category}
                </span>
                {topStory.districtName && (
                  <span className="bg-zinc-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-1 rounded-md">
                    {topStory.districtName}
                  </span>
                )}
              </div>
            </Link>

            <div className="p-4 sm:p-6 space-y-2.5">
              <Link to={`/news/${topStory.id}/${topStory.slug}`}>
                <h1 className="font-headline font-black text-xl sm:text-2xl lg:text-3xl text-zinc-900 dark:text-zinc-50 leading-[1.3] group-hover:text-brand transition-colors">
                  {topStory.titleHi}
                </h1>
              </Link>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-2 sm:line-clamp-3">
                {topStory.summaryHi}
              </p>
            </div>
          </div>

          <div className="px-4 sm:px-6 pb-4 pt-2 border-t border-line/60 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-muted">
            <span className="flex items-center gap-1.5 font-medium">
              <User className="w-3.5 h-3.5 text-brand" />
              {topStory.reporterName}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {topStory.publishedAt}
            </span>
          </div>
        </article>

        {/* 4 Smaller stories: grid of 2x2 on desktop, horizontal scroll on mobile */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
          {subStories.map((story) => (
            <article
              key={story.id}
              className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-xl overflow-hidden p-3 hover:border-brand/40 transition-all flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <Link to={`/news/${story.id}/${story.slug}`} className="block relative aspect-16/10 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-2.5">
                  <img
                    src={story.featuredImage}
                    alt={story.titleHi}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {story.category}
                  </span>
                </Link>
                <Link to={`/news/${story.id}/${story.slug}`}>
                  <h3 className="font-headline font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2 group-hover:text-brand transition-colors">
                    {story.titleHi}
                  </h3>
                </Link>
              </div>

              <div className="mt-2.5 pt-2 border-t border-line/40 dark:border-zinc-800/60 flex items-center justify-between text-[10px] text-muted">
                <span>{story.districtName || story.reporterName}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {story.publishedAt}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
