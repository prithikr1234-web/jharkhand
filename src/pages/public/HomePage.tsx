/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { HeadMeta } from '../../components/common/HeadMeta';
import { AdSlot } from '../../components/common/AdSlot';
import { CardSkeleton } from '../../components/common/SkeletonLoader';
import {
  getPublicArticles,
  getPublicVideos,
  getPublicPhotos,
  getPublicEPapers,
  getPublicJobs,
  getPublicPoll,
} from '../../api';
import {
  Article,
  Video,
  PhotoGallery,
  EPaper,
  JobNotice,
  Poll,
} from '../../api/types';

// Home Page Components
import { HeroGrid } from '../../components/home/HeroGrid';
import { AapkaZila } from '../../components/home/AapkaZila';
import { MorningDigestAndLive } from '../../components/home/MorningDigestAndLive';
import { TopStoriesLists } from '../../components/home/TopStoriesLists';
import { BiharTopStories } from '../../components/home/BiharTopStories';
import { VideoCarousel } from '../../components/home/VideoCarousel';
import { JobsAndResults } from '../../components/home/JobsAndResults';
import { ThreeColumnSection } from '../../components/home/ThreeColumnSection';
import { EditorialAndPoll } from '../../components/home/EditorialAndPoll';
import { PhotoStrip } from '../../components/home/PhotoStrip';
import { EPaperAndCommunityBanner } from '../../components/home/EPaperAndCommunityBanner';

export const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [photos, setPhotos] = useState<PhotoGallery[]>([]);
  const [epapers, setEpapers] = useState<EPaper[]>([]);
  const [jobs, setJobs] = useState<JobNotice[]>([]);
  const [poll, setPoll] = useState<Poll | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [arts, vids, phots, eps, jbs, pll] = await Promise.all([
          getPublicArticles({ limit: 40 }),
          getPublicVideos(),
          getPublicPhotos(),
          getPublicEPapers(),
          getPublicJobs(),
          getPublicPoll(),
        ]);

        if (isMounted) {
          setArticles(arts);
          setVideos(vids);
          setPhotos(phots);
          setEpapers(eps);
          setJobs(jbs);
          setPoll(pll);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading home data:', err);
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 py-4 animate-in fade-in duration-300">
        <HeadMeta />
        <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7 h-96 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse" />
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-44 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
        <CardSkeleton rows={4} />
      </div>
    );
  }

  // Segmenting articles
  const jharkhandArticles = articles.filter(
    (a) => a.category === 'झारखंड' || a.tags?.includes('झारखंड')
  );
  const biharArticles = articles.filter(
    (a) => a.category === 'बिहार' || a.tags?.includes('बिहार')
  );
  const crimeArticles = articles.filter((a) => a.category === 'क्राइम');
  const sportsArticles = articles.filter((a) => a.category === 'खेल');
  const politicsArticles = articles.filter((a) => a.category === 'राजनीति');
  const trendingArticles = [...articles].sort(
    (a, b) => (b.viewCount || 0) - (a.viewCount || 0)
  );

  return (
    <div className="space-y-8 pb-12">
      <HeadMeta />

      {/* Top Banner Advertisement (Leaderboard) */}
      <AdSlot slot="leaderboard_728x90" className="hidden md:flex justify-center" />

      {/* 1. Hero Grid: Top story + 4 sub stories */}
      <HeroGrid articles={articles} />

      {/* 2. आपका जिला (Your District Strip) */}
      <AapkaZila articles={articles} />

      {/* 3. आज की 5 बड़ी खबरें + लाइव अपडेट */}
      <MorningDigestAndLive digestArticles={articles} />

      {/* 4. झारखंड की 10 बड़ी खबरें + Trending Sidebar */}
      <TopStoriesLists
        jharkhandArticles={jharkhandArticles.length > 0 ? jharkhandArticles : articles}
        trendingArticles={trendingArticles}
      />

      {/* Middle Banner Advertisement */}
      <AdSlot slot="leaderboard_728x90" className="hidden md:flex justify-center" />

      {/* 5. बिहार की बड़ी खबरें */}
      <BiharTopStories
        articles={biharArticles.length > 0 ? biharArticles : articles.slice(4, 10)}
      />

      {/* 6. वीडियो बुलेटिन एवं ग्राउंड रिपोर्ट */}
      <VideoCarousel videos={videos} />

      {/* 7. रोजगार एवं सरकारी परिणाम */}
      <JobsAndResults jobs={jobs} />

      {/* 8. Three-column Section: क्राइम | खेल | राजनीति */}
      <ThreeColumnSection
        crimeArticles={crimeArticles.length > 0 ? crimeArticles : articles.slice(2, 6)}
        sportsArticles={sportsArticles.length > 0 ? sportsArticles : articles.slice(6, 10)}
        politicsArticles={politicsArticles.length > 0 ? politicsArticles : articles.slice(1, 5)}
      />

      {/* 9. संपादकीय स्तम्भ & आज का पोल */}
      <EditorialAndPoll poll={poll} />

      {/* 10. फोटो गैलरी */}
      <PhotoStrip photos={photos} />

      {/* 11 & 12. ई-पेपर प्रीव्यू & व्हाट्सएप कम्युनिटी */}
      <EPaperAndCommunityBanner latestEpaper={epapers[0] || null} />
    </div>
  );
};
