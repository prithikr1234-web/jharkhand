/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPublicArticles, getPublicDistricts } from '../../api';
import { Article, District } from '../../api/types';
import { HeadMeta } from '../../components/common/HeadMeta';
import { CardSkeleton } from '../../components/common/SkeletonLoader';
import { AdSlot } from '../../components/common/AdSlot';
import { useTheme } from '../../context/ThemeContext';
import { MapPin, Clock, ChevronRight, CloudSun, Eye } from 'lucide-react';
import { ALL_DISTRICTS } from '../../api/data/districts';

export const DistrictPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setDistrict } = useTheme();

  const [district, setDistrictState] = useState<District | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;
    setLoading(true);

    const foundDistrict = ALL_DISTRICTS.find(
      (d) => d.id.toLowerCase() === slug.toLowerCase()
    );

    if (foundDistrict) {
      setDistrictState(foundDistrict);
      setDistrict(foundDistrict); // Set active district globally
    }

    async function fetchDistrictArticles() {
      try {
        const all = await getPublicArticles({ limit: 40 });
        if (isMounted) {
          const filtered = all.filter(
            (a) =>
              a.districtId?.toLowerCase() === slug?.toLowerCase() ||
              a.districtName === foundDistrict?.nameHi
          );
          setArticles(filtered.length > 0 ? filtered : all.slice(0, 8));
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDistrictArticles();
    window.scrollTo(0, 0);

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const districtName = district ? district.nameHi : 'जिला समाचार';

  return (
    <div className="space-y-6 py-4">
      <HeadMeta
        title={`${districtName} समाचार - झारखंड स्वतंत्र खबर`}
        description={`${districtName} (${district?.state === 'jharkhand' ? 'झारखंड' : 'बिहार'}) की ताज़ा एवं ब्रेकिंग स्थानीय खबरें।`}
      />

      {/* District Header Card */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-zinc-900 dark:to-zinc-850 border border-brand/20 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Link to="/" className="hover:text-brand">होम</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/${district?.state || 'jharkhand'}`} className="hover:text-brand font-medium">
              {district?.state === 'bihar' ? 'बिहार' : 'झारखंड'}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand font-bold">{districtName}</span>
          </div>
          <h1 className="font-headline font-black text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <MapPin className="w-7 h-7 text-brand" />
            <span>{districtName} की खबरें</span>
          </h1>
          <p className="text-xs text-muted">
            {district?.state === 'jharkhand' ? 'झारखंड' : 'बिहार'} प्रमंडल के अंतर्गत {district?.nameEn} जिले की एक्सक्लूसिव रिपोर्टिंग
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white dark:bg-zinc-800 px-4 py-2.5 rounded-xl border border-line dark:border-zinc-700 shadow-2xs">
          <CloudSun className="w-6 h-6 text-amber-500" />
          <div className="text-xs">
            <p className="font-bold text-zinc-900 dark:text-zinc-100">आज का मौसम: 28°C</p>
            <p className="text-[10px] text-muted">साफ आसमान, सामान्य हवाएं</p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <CardSkeleton rows={3} />
      ) : articles.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-line dark:border-zinc-800 space-y-3">
          <p className="text-sm font-bold text-muted">इस जिले में अभी कोई विशेष खबर नहीं है।</p>
          <Link
            to="/citizen-reporter"
            className="inline-block px-4 py-2 bg-brand text-white font-bold text-xs rounded-lg"
          >
            अपने जिले की खबर हमें भेजें
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
                  <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.category}
                  </span>
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

      {/* Citizen Reporter invitation banner */}
      <div className="bg-white dark:bg-zinc-900 border border-brand/30 dark:border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-headline font-bold text-base text-zinc-900 dark:text-zinc-100">
            क्या आपके पास {districtName} की कोई महत्वपूर्ण खबर है?
          </h3>
          <p className="text-xs text-muted mt-1">
            अपने गांव, कस्बे या शहर की समस्या सीधे झारखंड स्वतंत्र खबर के संपादकीय डेस्क तक पहुंचाएं।
          </p>
        </div>
        <Link
          to="/citizen-reporter"
          className="px-4 py-2 bg-brand hover:bg-brand-dark text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex-shrink-0"
        >
          अपनी खबर भेजें
        </Link>
      </div>

      <AdSlot slot="leaderboard_728x90" className="hidden md:flex justify-center pt-2" />
    </div>
  );
};
