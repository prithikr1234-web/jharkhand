/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchPublicArticles, getPublicCategories, getPublicDistricts } from '../../api';
import { Article, Category, District } from '../../api/types';
import { HeadMeta } from '../../components/common/HeadMeta';
import { CardSkeleton } from '../../components/common/SkeletonLoader';
import { Search, Clock, MapPin, X, Filter } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('');
  const [district, setDistrict] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    Promise.all([getPublicCategories(), getPublicDistricts()]).then(
      ([cats, dists]) => {
        setCategories(cats);
        setDistricts(dists);
      }
    );
  }, []);

  const performSearch = async (q: string, cat?: string, dist?: string) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const data = await searchPublicArticles({
        query: q,
        category: cat || undefined,
        districtId: dist || undefined,
      });
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      performSearch(initialQuery, category, district);
    } else {
      // Default populate with latest news
      performSearch('', category, district);
    }
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
    performSearch(query, category, district);
  };

  return (
    <div className="space-y-6 py-4 max-w-5xl mx-auto">
      <HeadMeta
        title={`समाचार खोजें ${query ? `: "${query}"` : ''} - झारखंड स्वतंत्र खबर`}
        description="झारखंड स्वतंत्र खबर पर अपने मनपसंद विषय, जिले या घटना से संबंधित समाचार खोजें।"
      />

      <div className="pb-3 border-b-2 border-brand">
        <h1 className="font-headline font-black text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <Search className="w-7 h-7 text-brand" />
          <span>समाचार खोजें (Archive Search)</span>
        </h1>
        <p className="text-xs text-muted mt-1">
          हजारों समाचारों, ग्राउंड रिपोर्टों और लेखों में से तुरंत खोजें
        </p>
      </div>

      {/* Search Bar & Filter Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4"
      >
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="कीवर्ड लिखें (उदा. कोयला नीति, JSSC भर्ती, राँची मौसम, सड़क हादसा...)"
            className="w-full pl-10 pr-24 py-3 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand font-medium text-zinc-900 dark:text-zinc-100"
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-muted" />
          <button
            type="submit"
            className="absolute right-2 top-2 px-4 py-1.5 bg-brand hover:bg-brand-dark text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            खोजें
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-line/60 dark:border-zinc-800/80">
          <div>
            <label className="block text-[11px] font-bold text-muted mb-1">
              श्रेणी द्वारा फ़िल्टर करें:
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                performSearch(query, e.target.value, district);
              }}
              className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-brand text-zinc-800 dark:text-zinc-200"
            >
              <option value="">सभी श्रेणियां</option>
              {categories.map((c) => (
                <option key={c.id} value={c.nameHi}>
                  {c.nameHi}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-muted mb-1">
              जिला द्वारा फ़िल्टर करें:
            </label>
            <select
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                performSearch(query, category, e.target.value);
              }}
              className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-brand text-zinc-800 dark:text-zinc-200"
            >
              <option value="">सभी जिले (झारखंड एवं बिहार)</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nameHi} ({d.state === 'jharkhand' ? 'झारखंड' : 'बिहार'})
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>
            {hasSearched ? `खोज परिणाम: ${results.length} समाचार पाए गए` : 'हालिया समाचार'}
          </span>
          {(query || category || district) && (
            <button
              onClick={() => {
                setQuery('');
                setCategory('');
                setDistrict('');
                setSearchParams({});
                performSearch('', '', '');
              }}
              className="text-brand hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>फ़िल्टर हटाएं</span>
            </button>
          )}
        </div>

        {loading ? (
          <CardSkeleton rows={3} />
        ) : results.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-line dark:border-zinc-800 space-y-3">
            <Search className="w-10 h-10 text-muted mx-auto" />
            <p className="font-bold text-base text-zinc-800 dark:text-zinc-200">
              कोई समाचार नहीं मिला
            </p>
            <p className="text-xs text-muted max-w-sm mx-auto">
              कृपया अन्य कीवर्ड, जिला या श्रेणी का चयन करके दोबारा प्रयास करें।
            </p>
          </div>
        ) : (
          <div className="divide-y divide-line dark:divide-zinc-800 bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-xs">
            {results.map((item) => (
              <article key={item.id} className="py-4 first:pt-1 last:pb-1 flex items-start gap-4 group">
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px] font-bold">
                    <span className="text-brand uppercase">{item.category}</span>
                    {item.districtName && (
                      <>
                        <span>•</span>
                        <span className="text-muted">{item.districtName}</span>
                      </>
                    )}
                  </div>
                  <Link
                    to={`/news/${item.id}/${item.slug}`}
                    className="block font-headline font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-brand transition-colors leading-snug"
                  >
                    {item.titleHi}
                  </Link>
                  <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                    {item.summaryHi}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-muted pt-1">
                    <span>{item.reporterName}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.publishedAt}
                    </span>
                  </div>
                </div>

                {item.featuredImage && (
                  <Link
                    to={`/news/${item.id}/${item.slug}`}
                    className="w-24 h-20 sm:w-32 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-800"
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
        )}
      </div>
    </div>
  );
};
