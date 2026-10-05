/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPublicArticles, getPublicCategories } from '../../api';
import { Article, Category } from '../../api/types';
import { HeadMeta } from '../../components/common/HeadMeta';
import { CardSkeleton } from '../../components/common/SkeletonLoader';
import { AdSlot } from '../../components/common/AdSlot';
import { Clock, Eye, ChevronRight, Tag } from 'lucide-react';
import { JHARKHAND_DISTRICTS, BIHAR_DISTRICTS } from '../../api/data/districts';

// Map slug to Hindi names
const CATEGORY_MAP: Record<string, string> = {
  jharkhand: 'झारखंड',
  bihar: 'बिहार',
  desh: 'देश',
  duniya: 'दुनिया',
  politics: 'राजनीति',
  crime: 'क्राइम',
  sports: 'खेल',
  jobs: 'रोजगार',
  education: 'शिक्षा',
  entertainment: 'मनोरंजन',
  business: 'कारोबार',
};

export const CategoryPage: React.FC = () => {
  const { category: rawCategory } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Normalize category name
  const catSlug = rawCategory?.toLowerCase() || '';
  const categoryNameHi = CATEGORY_MAP[catSlug] || rawCategory || 'समाचार';

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function loadCategoryArticles() {
      try {
        const data = await getPublicArticles({
          category: categoryNameHi,
          limit: 30,
        });

        if (isMounted) {
          // If direct category didn't match, try broader filtering
          if (data.length === 0) {
            const all = await getPublicArticles({ limit: 40 });
            const filtered = all.filter(
              (a) =>
                a.category === categoryNameHi ||
                (a.category && a.category.toLowerCase().includes(catSlug)) ||
                a.tags?.some((t) => t.toLowerCase().includes(catSlug))
            );
            setArticles(filtered.length > 0 ? filtered : all.slice(0, 12));
          } else {
            setArticles(data);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCategoryArticles();
    window.scrollTo(0, 0);

    return () => {
      isMounted = false;
    };
  }, [categoryNameHi, catSlug]);

  const isJharkhand = catSlug === 'jharkhand';
  const isBihar = catSlug === 'bihar';

  return (
    <div className="space-y-6 py-4">
      <HeadMeta
        title={`${categoryNameHi} समाचार - झारखंड स्वतंत्र खबर`}
        description={`${categoryNameHi} की ताज़ा एवं ब्रेकिंग खबरें पढ़ें - झारखंड स्वतंत्र खबर पर।`}
      />

      {/* Header */}
      <div className="pb-4 border-b-2 border-brand flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted mb-1">
            <Link to="/" className="hover:text-brand">होम</Link>
            <ChevronRight className="w-3 h-3" />
            <span>श्रेणी</span>
          </div>
          <h1 className="font-headline font-black text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <span className="w-2.5 h-7 bg-brand rounded-xs inline-block"></span>
            <span>{categoryNameHi} समाचार</span>
          </h1>
        </div>
        <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold px-3 py-1 rounded-full">
          {articles.length} समाचार उपलब्ध
        </span>
      </div>

      {/* Sub-district pill quick links for Jharkhand / Bihar */}
      {(isJharkhand || isBihar) && (
        <div className="p-3 bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-xl space-y-2">
          <p className="text-[11px] font-bold text-muted uppercase">
            {isJharkhand ? 'झारखंड के प्रमुख जिले चुनें:' : 'बिहार के प्रमुख जिले चुनें:'}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(isJharkhand ? JHARKHAND_DISTRICTS : BIHAR_DISTRICTS).slice(0, 16).map((d) => (
              <Link
                key={d.id}
                to={`/district/${d.id}`}
                className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-brand hover:text-white text-zinc-800 dark:text-zinc-200 rounded-lg text-xs font-semibold transition-colors"
              >
                {d.nameHi}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Content Grid */}
      {loading ? (
        <CardSkeleton rows={4} />
      ) : articles.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-line dark:border-zinc-800 space-y-3">
          <p className="text-sm font-bold text-muted">इस श्रेणी में अभी कोई समाचार उपलब्ध नहीं है।</p>
          <Link
            to="/"
            className="inline-block px-4 py-2 bg-brand text-white font-bold text-xs rounded-lg"
          >
            मुख्य पृष्ठ पर लौटें
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((item) => (
            <article
              key={item.id}
              className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl overflow-hidden p-3.5 flex flex-col justify-between group hover:border-brand/40 transition-all shadow-xs"
            >
              <div>
                <Link
                  to={`/news/${item.id}/${item.slug}`}
                  className="block relative aspect-16/10 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-3"
                >
                  <img
                    src={item.featuredImage}
                    alt={item.titleHi}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {item.districtName && (
                    <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {item.districtName}
                    </span>
                  )}
                </Link>

                <Link to={`/news/${item.id}/${item.slug}`}>
                  <h3 className="font-headline font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug group-hover:text-brand transition-colors">
                    {item.titleHi}
                  </h3>
                </Link>
                <p className="text-xs text-muted line-clamp-2 mt-1.5 leading-relaxed">
                  {item.summaryHi}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-line/60 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-muted">
                <span className="truncate">{item.reporterName}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.publishedAt}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Ad slot */}
      <AdSlot slot="leaderboard_728x90" className="hidden md:flex justify-center pt-4" />
    </div>
  );
};
