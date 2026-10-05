/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { getPublicEPapers } from '../../api';
import { EPaper } from '../../api/types';
import { HeadMeta } from '../../components/common/HeadMeta';
import {
  Newspaper,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Share2,
} from 'lucide-react';

export const EPaperPage: React.FC = () => {
  const [epapers, setEpapers] = useState<EPaper[]>([]);
  const [selectedEdition, setSelectedEdition] = useState<EPaper | null>(null);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicEPapers().then((data) => {
      setEpapers(data);
      if (data.length > 0) {
        setSelectedEdition(data[0]);
      }
      setLoading(false);
    });
  }, []);

  const pages = selectedEdition?.pages || [
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
  ];

  const handlePrevPage = () => {
    setActivePageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setActivePageIndex((prev) => Math.min(pages.length - 1, prev + 1));
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(2.5, z + 0.25));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.75, z - 0.25));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="space-y-6 py-4">
      <HeadMeta
        title="डिजिटल ई-पेपर (E-Paper) - झारखंड स्वतंत्र खबर"
        description="झारखंड स्वतंत्र खबर का आज का संपूर्ण ई-पेपर संस्करण पृष्ठ-दर-पृष्ठ पढ़ें एवं पीडीएफ डाउनलोड करें।"
      />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-brand">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center shadow-xs">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-headline font-black text-xl sm:text-2xl text-zinc-900 dark:text-zinc-50">
              डिजिटल ई-पेपर (E-Paper)
            </h1>
            <p className="text-xs text-muted">
              आज का मुद्रित संस्करण अब आपके स्मार्टफोन और कंप्यूटर पर उपलब्ध
            </p>
          </div>
        </div>

        {/* Edition Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {epapers.map((ep) => (
            <button
              key={ep.id}
              onClick={() => {
                setSelectedEdition(ep);
                setActivePageIndex(0);
                setZoomLevel(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedEdition?.id === ep.id
                  ? 'bg-brand text-white shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-800 dark:text-zinc-200'
              }`}
            >
              {ep.editionHi} संस्करण
            </button>
          ))}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200">
            <Calendar className="w-4 h-4 text-brand" />
            {selectedEdition?.date}
          </span>
          <span className="text-muted">•</span>
          <span className="text-muted">
            पृष्ठ: <span className="text-brand font-black">{activePageIndex + 1}</span> / {pages.length}
          </span>
        </div>

        {/* Viewer Tools */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:text-brand transition-colors text-zinc-700 dark:text-zinc-300"
            title="ज़ूम आउट"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-bold px-1.5 text-muted">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:text-brand transition-colors text-zinc-700 dark:text-zinc-300"
            title="ज़ूम इन"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:text-brand transition-colors text-zinc-700 dark:text-zinc-300"
            title="रीसेट"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <span className="h-4 w-px bg-line dark:bg-zinc-700 mx-1" />

          {selectedEdition?.pdfUrl && (
            <a
              href={selectedEdition.pdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-forest hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>पीडीएफ डाउनलोड</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Newspaper Canvas View */}
      <div className="relative bg-zinc-200 dark:bg-zinc-950 border border-line dark:border-zinc-800 rounded-2xl overflow-hidden shadow-inner flex flex-col items-center justify-center p-4 sm:p-8 min-h-[600px]">
        {/* Navigation Prev/Next Overlays */}
        <button
          onClick={handlePrevPage}
          disabled={activePageIndex === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-brand disabled:opacity-30 disabled:hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-all shadow-lg cursor-pointer"
          title="पिछला पेज"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNextPage}
          disabled={activePageIndex === pages.length - 1}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-brand disabled:opacity-30 disabled:hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-all shadow-lg cursor-pointer"
          title="अगला पेज"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Newspaper Page Image */}
        <div
          className="overflow-auto max-w-full max-h-[80vh] flex items-center justify-center transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
        >
          <img
            src={pages[activePageIndex]}
            alt={`पेज ${activePageIndex + 1}`}
            className="shadow-2xl rounded-sm max-w-full h-auto bg-white border border-zinc-300 pointer-events-auto"
          />
        </div>
      </div>

      {/* Page Thumbnails Bar */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-muted">पेज चयन करें:</p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {pages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActivePageIndex(idx);
                setZoomLevel(1);
              }}
              className={`relative flex-shrink-0 w-20 sm:w-24 aspect-3/4 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                activePageIndex === idx
                  ? 'border-brand shadow-md scale-103'
                  : 'border-zinc-300 dark:border-zinc-700 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`पेज ${idx + 1}`} className="w-full h-full object-cover" />
              <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                P.{idx + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
