/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { getPublicVideos } from '../../api';
import { Video } from '../../api/types';
import { HeadMeta } from '../../components/common/HeadMeta';
import { Play, Eye, Clock, X, ChevronRight } from 'lucide-react';

export const VideosListingPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicVideos().then((data) => {
      setVideos(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6 py-4">
      <HeadMeta
        title="वीडियो बुलेटिन एवं ग्राउंड रिपोर्ट - झारखंड स्वतंत्र खबर"
        description="झारखंड और बिहार की ज़मीनी सच्चाई, लाइव कवरेज और एक्सक्लूसिव वीडियो रिपोर्टिंग देखें।"
      />

      {/* Header */}
      <div className="pb-4 border-b-2 border-brand">
        <h1 className="font-headline font-black text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <Play className="w-6 h-6 text-brand fill-brand" />
          <span>वीडियो बुलेटिन एवं विशेष रिपोर्ट</span>
        </h1>
        <p className="text-xs text-muted mt-1">
          प्रत्यक्षदर्शी साक्षात्कार, ज़मीनी पड़ताल और ब्रेकिंग वीडियो कवरेज
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div
            key={vid.id}
            onClick={() => setActiveVideo(vid)}
            className="group cursor-pointer bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-brand transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/9 bg-zinc-800 overflow-hidden">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.titleHi}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center group-hover:bg-black/15 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
                {vid.duration && (
                  <span className="absolute bottom-2 right-2 bg-black/80 text-[11px] font-bold px-2 py-0.5 rounded text-white">
                    {vid.duration}
                  </span>
                )}
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-headline font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                  {vid.titleHi}
                </h3>
                <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                  {vid.descriptionHi}
                </p>
              </div>
            </div>

            <div className="px-4 pb-3 pt-2 border-t border-line/60 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-muted">
              <span>{vid.reporterName}</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {vid.viewCount?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-3.5 border-b border-zinc-800">
              <h4 className="font-headline font-bold text-sm text-white truncate max-w-[85%]">
                {activeVideo.titleHi}
              </h4>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded-full text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-16/9 bg-black">
              {activeVideo.youtubeId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                  title={activeVideo.titleHi}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">
                  वीडियो प्लेयर लोड हो रहा है...
                </div>
              )}
            </div>

            <div className="p-4 space-y-2">
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activeVideo.descriptionHi}
              </p>
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800">
                <span>संवाददाता: {activeVideo.reporterName}</span>
                <span>प्रकाशन: {activeVideo.publishedAt}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
