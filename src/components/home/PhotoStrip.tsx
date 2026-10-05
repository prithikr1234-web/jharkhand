/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { PhotoGallery } from '../../api/types';
import { Camera, ChevronRight, Eye } from 'lucide-react';

interface PhotoStripProps {
  photos: PhotoGallery[];
}

export const PhotoStrip: React.FC<PhotoStripProps> = ({ photos }) => {
  const displayPhotos = photos.slice(0, 4);

  return (
    <section className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b-2 border-brand">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950 text-brand flex items-center justify-center">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-headline font-black text-lg sm:text-xl text-zinc-900 dark:text-zinc-50">
              फोटो गैलरी (Photo Features)
            </h2>
            <p className="text-[11px] text-muted">तस्वीरों में देखें झारखंड और बिहार के मनमोहक रंग और घटनाएं</p>
          </div>
        </div>

        <Link
          to="/photos"
          className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
        >
          <span>सभी फोटो देखें</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayPhotos.map((item) => (
          <Link
            to="/photos"
            key={item.id}
            className="group block bg-zinc-50 dark:bg-zinc-850 rounded-xl overflow-hidden border border-line dark:border-zinc-800 hover:border-brand transition-all shadow-2xs"
          >
            <div className="relative aspect-4/3 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
              <img
                src={item.coverImage}
                alt={item.titleHi}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <span className="absolute top-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Camera className="w-3 h-3" />
                <span>{item.photos?.length || 4} तस्वीरें</span>
              </span>
            </div>

            <div className="p-3">
              <h3 className="font-headline font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug group-hover:text-brand transition-colors">
                {item.titleHi}
              </h3>
              <div className="mt-2 flex items-center justify-between text-[10px] text-muted">
                <span>{item.photographer}</span>
                <span className="flex items-center gap-0.5">
                  <Eye className="w-2.5 h-2.5" />
                  {item.viewCount?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
