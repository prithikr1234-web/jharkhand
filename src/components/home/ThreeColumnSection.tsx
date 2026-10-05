/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../api/types';
import { ShieldAlert, Trophy, Landmark, ChevronRight, Clock } from 'lucide-react';

interface ThreeColumnSectionProps {
  crimeArticles: Article[];
  sportsArticles: Article[];
  politicsArticles: Article[];
}

export const ThreeColumnSection: React.FC<ThreeColumnSectionProps> = ({
  crimeArticles,
  sportsArticles,
  politicsArticles,
}) => {
  const [activeMobileTab, setActiveMobileTab] = useState<'crime' | 'sports' | 'politics'>('crime');

  const renderColumn = (title: string, icon: React.ReactNode, slug: string, articles: Article[]) => {
    const list = articles.slice(0, 4);
    return (
      <div className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between pb-3 border-b-2 border-brand/80">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-950 text-brand flex items-center justify-center">
                {icon}
              </div>
              <h3 className="font-headline font-bold text-base text-zinc-900 dark:text-zinc-50">
                {title}
              </h3>
            </div>
            <Link
              to={`/${slug}`}
              className="text-[11px] font-bold text-brand hover:underline flex items-center gap-0.5"
            >
              <span>और देखें</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-line/60 dark:divide-zinc-800/80 mt-2">
            {list.map((item, idx) => (
              <div key={item.id} className="py-2.5 flex items-start gap-2.5 group">
                <div className="flex-1 min-w-0 space-y-1">
                  <Link
                    to={`/news/${item.id}/${item.slug}`}
                    className="font-headline font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-brand transition-colors line-clamp-2 leading-snug"
                  >
                    {item.titleHi}
                  </Link>
                  <div className="flex items-center gap-2 text-[10px] text-muted">
                    <span>{item.districtName || 'विशेष'}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {item.publishedAt}
                    </span>
                  </div>
                </div>
                {item.featuredImage && (
                  <Link
                    to={`/news/${item.id}/${item.slug}`}
                    className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-800"
                  >
                    <img
                      src={item.featuredImage}
                      alt={item.titleHi}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 text-right">
          <Link
            to={`/${slug}`}
            className="text-[11px] font-bold text-brand hover:underline inline-flex items-center gap-1"
          >
            <span>{title} की सभी खबरें</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section className="space-y-4">
      {/* Mobile Tab Switcher */}
      <div className="flex lg:hidden bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
        <button
          onClick={() => setActiveMobileTab('crime')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeMobileTab === 'crime'
              ? 'bg-white dark:bg-zinc-900 text-brand shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>क्राइम</span>
        </button>
        <button
          onClick={() => setActiveMobileTab('sports')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeMobileTab === 'sports'
              ? 'bg-white dark:bg-zinc-900 text-brand shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>खेल</span>
        </button>
        <button
          onClick={() => setActiveMobileTab('politics')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            activeMobileTab === 'politics'
              ? 'bg-white dark:bg-zinc-900 text-brand shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400'
          }`}
        >
          <Landmark className="w-3.5 h-3.5" />
          <span>राजनीति</span>
        </button>
      </div>

      {/* Desktop 3 Columns */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {renderColumn('क्राइम न्यूज़', <ShieldAlert className="w-4 h-4" />, 'crime', crimeArticles)}
        {renderColumn('खेल जगत', <Trophy className="w-4 h-4" />, 'sports', sportsArticles)}
        {renderColumn('राजनीति', <Landmark className="w-4 h-4" />, 'politics', politicsArticles)}
      </div>

      {/* Mobile Active Column */}
      <div className="block lg:hidden">
        {activeMobileTab === 'crime' &&
          renderColumn('क्राइम न्यूज़', <ShieldAlert className="w-4 h-4" />, 'crime', crimeArticles)}
        {activeMobileTab === 'sports' &&
          renderColumn('खेल जगत', <Trophy className="w-4 h-4" />, 'sports', sportsArticles)}
        {activeMobileTab === 'politics' &&
          renderColumn('राजनीति', <Landmark className="w-4 h-4" />, 'politics', politicsArticles)}
      </div>
    </section>
  );
};
