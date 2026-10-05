/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { getPublicPhotos } from '../../api';
import { PhotoGallery } from '../../api/types';
import { HeadMeta } from '../../components/common/HeadMeta';
import { Camera, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const PhotosListingPage: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoGallery[]>([]);
  const [activeGallery, setActiveGallery] = useState<PhotoGallery | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicPhotos().then((data) => {
      setPhotos(data);
      setLoading(false);
    });
  }, []);

  const openLightbox = (gallery: PhotoGallery, index: number = 0) => {
    setActiveGallery(gallery);
    setActivePhotoIdx(index);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeGallery?.photos) return;
    setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : activeGallery.photos.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeGallery?.photos) return;
    setActivePhotoIdx((prev) => (prev < activeGallery.photos.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-6 py-4">
      <HeadMeta
        title="फोटो गैलरी (Photo Features) - झारखंड स्वतंत्र खबर"
        description="झारखंड और बिहार के दृश्य, त्यौहार, प्राकृतिक सौंदर्य और घटनाओं की उच्च गुणवत्ता वाली तस्वीरें देखें।"
      />

      {/* Header */}
      <div className="pb-4 border-b-2 border-brand">
        <h1 className="font-headline font-black text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <Camera className="w-7 h-7 text-brand" />
          <span>फोटो गैलरी (Photo Features)</span>
        </h1>
        <p className="text-xs text-muted mt-1">
          तस्वीरों में कैद झारखंड और बिहार की मनोहारी छटा एवं ऐतिहासिक क्षण
        </p>
      </div>

      {/* Photo Galleries Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((gallery) => (
          <div
            key={gallery.id}
            onClick={() => openLightbox(gallery, 0)}
            className="group cursor-pointer bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-brand transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-4/3 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <img
                  src={gallery.coverImage}
                  alt={gallery.titleHi}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-3 right-3 bg-black/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow">
                  <Camera className="w-3.5 h-3.5" />
                  <span>{gallery.photos?.length || 4} तस्वीरें</span>
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-headline font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                  {gallery.titleHi}
                </h3>
                <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                  {gallery.descriptionHi}
                </p>
              </div>
            </div>

            <div className="px-4 pb-3 pt-2 border-t border-line/60 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-muted">
              <span>छायाकार: {gallery.photographer}</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {gallery.viewCount?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeGallery && activeGallery.photos && activeGallery.photos.length > 0 && (
        <div
          onClick={() => setActiveGallery(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Top header */}
            <div className="flex items-center justify-between p-3.5 border-b border-zinc-800 text-white">
              <div>
                <h4 className="font-headline font-bold text-sm sm:text-base truncate max-w-md">
                  {activeGallery.titleHi}
                </h4>
                <p className="text-[11px] text-zinc-400">
                  तस्वीर {activePhotoIdx + 1} / {activeGallery.photos.length} • छायाकार:{' '}
                  {activeGallery.photographer}
                </p>
              </div>
              <button
                onClick={() => setActiveGallery(null)}
                className="p-1 rounded-full text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo & Navigation */}
            <div className="relative aspect-16/10 sm:aspect-16/9 bg-black flex items-center justify-center overflow-hidden">
              <button
                onClick={handlePrev}
                className="absolute left-3 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-brand text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <img
                src={activeGallery.photos[activePhotoIdx]?.url}
                alt={activeGallery.photos[activePhotoIdx]?.captionHi}
                className="max-h-full max-w-full object-contain"
              />

              <button
                onClick={handleNext}
                className="absolute right-3 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-brand text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption */}
            <div className="p-3 bg-zinc-900 border-t border-zinc-800 text-xs text-zinc-300">
              <p className="leading-relaxed">
                {activeGallery.photos[activePhotoIdx]?.captionHi || activeGallery.descriptionHi}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
