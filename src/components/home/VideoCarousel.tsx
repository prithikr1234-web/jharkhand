/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../../api/types';
import { Play, ChevronRight, X, Eye } from 'lucide-react';

interface VideoCarouselProps {
  videos: Video[];
}

export const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos }) => {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const displayVideos = videos.slice(0, 4);

  return (
    <section className="bg-zinc-950 text-white rounded-2xl p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center">
            <Play className="w-4 h-4 fill-white" />
          </div>
          <div>
            <h2 className="font-headline font-black text-lg sm:text-xl text-white">
              वीडियो बुलेटिन एवं ग्राउंड रिपोर्ट
            </h2>
            <p className="text-[11px] text-zinc-400">
              प्रत्यक्षदर्शी रिपोर्ट, विशेष साक्षात्कार और विश्लेषण
            </p>
          </div>
        </div>

        <Link
          to="/videos"
          className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
        >
          <span>सभी वीडियो</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className="group cursor-pointer bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-brand transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/9 bg-zinc-800 overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.titleHi}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>
                {video.duration && (
                  <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] font-bold px-1.5 py-0.5 rounded text-white">
                    {video.duration}
                  </span>
                )}
              </div>

              <div className="p-3">
                <h3 className="font-headline font-bold text-xs sm:text-sm text-zinc-100 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                  {video.titleHi}
                </h3>
              </div>
            </div>

            <div className="px-3 pb-3 pt-1 flex items-center justify-between text-[10px] text-zinc-400">
              <span className="truncate">{video.reporterName}</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {video.viewCount?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-3 border-b border-zinc-800">
              <h4 className="font-headline font-bold text-xs sm:text-sm text-white truncate max-w-[85%]">
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
    </section>
  );
};
