/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PhotoGallery } from '../../api/types';
import { Camera, ChevronRight, X, Image as ImageIcon } from 'lucide-react';

interface PhotoGallerySectionProps {
  galleries: PhotoGallery[];
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({ galleries }) => {
  const [activeGallery, setActiveGallery] = useState<PhotoGallery | null>(null);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-brand">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center shadow-xs">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-headline font-black text-xl sm:text-2xl text-zinc-900 dark:text-zinc-50">
              फोटो गैलरी (तस्वीरों में झारखंड-बिहार)
            </h2>
            <p className="text-xs text-muted">धरोहर, पर्यटन, प्रकृति और सांस्कृतिक उत्सवों की खास तस्वीरें</p>
          </div>
        </div>

        <Link
          to="/photos"
          className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
        >
          <span>सभी गैलरी देखें</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {galleries.slice(0, 6).map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveGallery(item)}
            className="group cursor-pointer bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/10 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={item.coverImage}
                  alt={item.titleHi}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-black/75 backdrop-blur-xs text-white text-xs font-bold rounded-md flex items-center gap-1.5 shadow-sm">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{item.photos?.length || 4} तस्वीरें</span>
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-headline font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                  {item.titleHi}
                </h3>
                <p className="text-xs text-zinc-500 line-clamp-2 mt-1.5">
                  {item.summaryHi}
                </p>
              </div>
            </div>

            <div className="px-4 py-2 border-t border-line dark:border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
              <span>{item.photographerName}</span>
              <span className="text-brand font-semibold">खोलें &rarr;</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Gallery Modal */}
      {activeGallery && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl">
            <div className="p-4 border-b border-line dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="font-headline font-bold text-base text-zinc-900 dark:text-white">
                  {activeGallery.titleHi}
                </h3>
                <p className="text-xs text-muted">तस्वीरें: {activeGallery.photographerName}</p>
              </div>
              <button
                onClick={() => setActiveGallery(null)}
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {activeGallery.photos.map((p, idx) => (
                <div key={p.id} className="space-y-2">
                  <div className="rounded-xl overflow-hidden bg-zinc-950">
                    <img
                      src={p.url}
                      alt={p.captionHi}
                      className="w-full max-h-[500px] object-contain mx-auto"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300 px-1">
                    <p className="font-medium">
                      <strong>{idx + 1}.</strong> {p.captionHi}
                    </p>
                    {p.credit && <span className="text-muted">{p.credit}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
