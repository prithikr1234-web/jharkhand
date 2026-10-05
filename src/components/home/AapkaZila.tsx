/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../api/types';
import { useTheme } from '../../context/ThemeContext';
import { MapPin, ChevronRight, X, Sparkles, Clock } from 'lucide-react';
import { JHARKHAND_DISTRICTS, BIHAR_DISTRICTS } from '../../api/data/districts';

interface AapkaZilaProps {
  articles: Article[];
}

export const AapkaZila: React.FC<AapkaZilaProps> = ({ articles }) => {
  const { currentDistrict, setDistrict } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [stateTab, setStateTab] = useState<'jharkhand' | 'bihar'>('jharkhand');

  // Filter articles for currently selected district or fallback to jharkhand/nearby if few
  const districtArticles = articles.filter(
    (a) => a.districtId?.toLowerCase() === currentDistrict.id.toLowerCase()
  );
  const displayArticles = districtArticles.length > 0 ? districtArticles.slice(0, 6) : articles.slice(0, 6);

  return (
    <section className="bg-gradient-to-r from-red-50/60 to-orange-50/40 dark:from-zinc-900 dark:to-zinc-850 border border-brand/20 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-line dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center shadow-xs">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-headline font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-50">
                आपका जिला: <span className="text-brand font-black">{currentDistrict.nameHi}</span>
              </h2>
              <span className="text-[10px] bg-brand/10 text-brand px-1.5 py-0.5 rounded font-bold uppercase">
                {currentDistrict.state === 'jharkhand' ? 'झारखंड' : 'बिहार'}
              </span>
            </div>
            <p className="text-[11px] text-muted">
              आपके क्षेत्र की ताज़ा एवं एक्सक्लूसिव स्थानीय खबरें
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setModalOpen(true)}
            className="px-3 py-1.5 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-brand dark:text-red-400 border border-brand/30 dark:border-zinc-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>जिला बदलें</span>
          </button>
          <Link
            to={`/district/${currentDistrict.id}`}
            className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-brand flex items-center gap-0.5"
          >
            <span>सभी देखें</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Stories horizontal swipe row on mobile / 6-col grid on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {displayArticles.map((story) => (
          <article
            key={story.id}
            className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-xl overflow-hidden p-2.5 flex flex-col justify-between group hover:border-brand/40 transition-all shadow-2xs"
          >
            <div>
              <Link to={`/news/${story.id}/${story.slug}`} className="block relative aspect-16/10 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-2">
                <img
                  src={story.featuredImage}
                  alt={story.titleHi}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </Link>
              <Link to={`/news/${story.id}/${story.slug}`}>
                <h3 className="font-headline font-semibold text-xs text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug group-hover:text-brand transition-colors">
                  {story.titleHi}
                </h3>
              </Link>
            </div>
            <div className="mt-2 pt-1.5 border-t border-line/40 dark:border-zinc-800/60 flex items-center justify-between text-[9px] text-muted">
              <span>{story.districtName || currentDistrict.nameHi}</span>
              <span className="flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5" />
                {story.publishedAt}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* District Selection Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-line dark:border-zinc-800 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-line dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand" />
                <h3 className="font-headline font-bold text-base sm:text-lg">अपना जिला चुनें</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2 my-3">
              <button
                onClick={() => setStateTab('jharkhand')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  stateTab === 'jharkhand'
                    ? 'bg-brand text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                झारखंड के 24 जिले
              </button>
              <button
                onClick={() => setStateTab('bihar')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  stateTab === 'bihar'
                    ? 'bg-brand text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                बिहार के 38 जिले
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {(stateTab === 'jharkhand' ? JHARKHAND_DISTRICTS : BIHAR_DISTRICTS).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setDistrict(d);
                      setModalOpen(false);
                    }}
                    className={`p-2.5 text-left rounded-xl text-xs font-semibold border transition-all ${
                      currentDistrict.id === d.id
                        ? 'border-brand bg-red-50 dark:bg-red-950/40 text-brand font-bold'
                        : 'border-line dark:border-zinc-800 hover:border-brand/40 bg-zinc-50/50 dark:bg-zinc-850 text-zinc-800 dark:text-zinc-200'
                    }`}
                  >
                    <div className="truncate">{d.nameHi}</div>
                    <div className="text-[10px] text-muted truncate">{d.nameEn}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-line dark:border-zinc-800 flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-lg"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
