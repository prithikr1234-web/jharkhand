/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../api/types';
import { Flame, TrendingUp, ChevronRight, Eye, Clock } from 'lucide-react';
import { AdSlot } from '../common/AdSlot';

interface TopStoriesListsProps {
  jharkhandArticles: Article[];
  trendingArticles: Article[];
}

export const TopStoriesLists: React.FC<TopStoriesListsProps> = ({
  jharkhandArticles,
  trendingArticles,
}) => {
  const top10 = jharkhandArticles.slice(0, 10);
  const trending = trendingArticles.slice(0, 6);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 1. झारखंड की बड़ी खबरें (Numbered List #1 to #10) - Col 8 */}
      <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b-2 border-brand">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-brand rounded-xs inline-block"></span>
            <h2 className="font-headline font-black text-lg sm:text-xl text-zinc-900 dark:text-zinc-50">
              झारखंड की 10 बड़ी खबरें
            </h2>
          </div>
          <Link
            to="/jharkhand"
            className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
          >
            <span>पूरा झारखंड</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-line/70 dark:divide-zinc-800/80">
          {top10.map((item, idx) => (
            <article key={item.id} className="py-3 sm:py-3.5 flex items-start gap-3 sm:gap-4 group">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand/10 text-brand font-black font-headline text-xs sm:text-sm flex items-center justify-center flex-shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
                #{idx + 1}
              </span>

              <div className="flex-1 min-w-0 space-y-1">
                <Link
                  to={`/news/${item.id}/${item.slug}`}
                  className="font-headline font-bold text-xs sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-brand transition-colors line-clamp-2 leading-snug"
                >
                  {item.titleHi}
                </Link>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
                  <span className="font-semibold text-brand">{item.districtName || 'झारखंड'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.publishedAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {item.viewCount?.toLocaleString('en-IN')} पाठक
                  </span>
                </div>
              </div>

              {item.featuredImage && (
                <Link
                  to={`/news/${item.id}/${item.slug}`}
                  className="hidden sm:block w-20 h-16 sm:w-24 sm:h-18 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-800"
                >
                  <img
                    src={item.featuredImage}
                    alt={item.titleHi}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* 2. Trending / सबसे ज्यादा पढ़ी गई + Ad Slot - Col 4 */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-saffron">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-saffron fill-saffron" />
              <h2 className="font-headline font-black text-base sm:text-lg text-zinc-900 dark:text-zinc-50">
                सबसे ज्यादा पढ़ी गई (Trending)
              </h2>
            </div>
            <TrendingUp className="w-4 h-4 text-muted" />
          </div>

          <div className="divide-y divide-line/60 dark:divide-zinc-800/80">
            {trending.map((item, idx) => (
              <div key={item.id} className="py-2.5 flex items-start gap-2.5 group">
                <span className="text-saffron font-bold text-sm font-headline w-4 flex-shrink-0">
                  {idx + 1}.
                </span>
                <div className="flex-1 min-w-0 space-y-1">
                  <Link
                    to={`/news/${item.id}/${item.slug}`}
                    className="font-headline font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-brand transition-colors line-clamp-2 leading-snug"
                  >
                    {item.titleHi}
                  </Link>
                  <div className="flex items-center gap-2 text-[10px] text-muted">
                    <span className="text-brand font-medium">{item.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Eye className="w-2.5 h-2.5" />
                      {item.viewCount?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MPU 300x250 Ad */}
        <AdSlot slot="mpu_300x250" />
      </div>
    </section>
  );
};
