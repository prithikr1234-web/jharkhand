/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../api/types';
import { ChevronRight, Compass, Clock, MapPin } from 'lucide-react';

interface BiharTopStoriesProps {
  articles: Article[];
}

export const BiharTopStories: React.FC<BiharTopStoriesProps> = ({ articles }) => {
  const biharStories = articles.slice(0, 4);

  return (
    <section className="bg-amber-50/50 dark:bg-zinc-900 border border-amber-200/60 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-amber-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center shadow-xs">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-headline font-black text-lg sm:text-xl text-zinc-900 dark:text-zinc-50">
              बिहार की बड़ी खबरें
            </h2>
            <p className="text-[11px] text-muted">
              पटना, मुजफ्फरपुर, गया, भागलपुर सहित बिहार के 38 जिलों का पूरा हाल
            </p>
          </div>
        </div>

        <Link
          to="/bihar"
          className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
        >
          <span>पूरा बिहार</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {biharStories.map((story) => (
          <article
            key={story.id}
            className="bg-white dark:bg-zinc-850 border border-amber-100 dark:border-zinc-800 rounded-xl overflow-hidden p-3.5 flex flex-col justify-between group hover:border-amber-500/50 transition-all shadow-2xs"
          >
            <div>
              <Link
                to={`/news/${story.id}/${story.slug}`}
                className="block relative aspect-16/10 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-2.5"
              >
                <img
                  src={story.featuredImage}
                  alt={story.titleHi}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {story.districtName || 'बिहार'}
                </span>
              </Link>

              <Link to={`/news/${story.id}/${story.slug}`}>
                <h3 className="font-headline font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                  {story.titleHi}
                </h3>
              </Link>
              <p className="text-[11px] text-muted line-clamp-2 mt-1 leading-relaxed">
                {story.summaryHi}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-amber-100 dark:border-zinc-800 flex items-center justify-between text-[10px] text-muted">
              <span>{story.reporterName}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {story.publishedAt}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
