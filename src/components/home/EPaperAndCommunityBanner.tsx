/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, MessageCircle, ExternalLink, ArrowRight, Download } from 'lucide-react';
import { EPaper } from '../../api/types';

interface EPaperAndCommunityBannerProps {
  latestEpaper?: EPaper | null;
}

export const EPaperAndCommunityBanner: React.FC<EPaperAndCommunityBannerProps> = ({
  latestEpaper,
}) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 1. ई-पेपर प्रीव्यू बैनर (Col 7) */}
      <div className="lg:col-span-7 bg-linear-to-r from-red-900 to-brand text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-center gap-6 justify-between overflow-hidden relative">
        <div className="space-y-3 z-10 text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5 text-orange-200" />
            <span>डिजिटल ई-पेपर संस्करण</span>
          </div>
          <h3 className="font-headline font-black text-xl sm:text-2xl leading-tight">
            आज का संपूर्ण समाचार पत्र अपने मोबाइल या कंप्यूटर पर पढ़ें
          </h3>
          <p className="text-xs text-red-100 leading-relaxed max-w-md">
            राँची, धनबाद, जमशेदपुर, देवघर एवं पटना के प्रादेशिक संस्करण। पेज-दर-पेज वास्तविक समाचार पत्र का आनंद लें।
          </p>

          <div className="pt-2 flex flex-wrap gap-3 justify-center sm:justify-start">
            <Link
              to="/epaper"
              className="px-5 py-2.5 bg-white text-brand hover:bg-red-50 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-transform active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>आज का ई-पेपर पढ़ें</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* E-paper Front-Page Mockup */}
        <Link
          to="/epaper"
          className="relative w-36 sm:w-44 aspect-3/4 bg-white rounded-lg shadow-2xl p-1.5 flex-shrink-0 rotate-2 hover:rotate-0 transition-transform duration-300 border-2 border-white/60 group block"
        >
          <img
            src={latestEpaper?.thumbnailUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&auto=format&fit=crop&q=80'}
            alt="आज का ई-पेपर"
            className="w-full h-full object-cover rounded-xs"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors rounded-xs" />
          <span className="absolute bottom-2 left-2 right-2 bg-brand/90 backdrop-blur-xs text-white text-[9px] font-bold text-center py-1 rounded">
            राँची संस्करण • 16 पेज
          </span>
        </Link>
      </div>

      {/* 2. WhatsApp / टेलीग्राम कम्युनिटी बैनर (Col 5) */}
      <div className="lg:col-span-5 bg-linear-to-br from-emerald-800 to-forest text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
            <MessageCircle className="w-4 h-4" />
            <span>सीधे न्यूज़ रूम से</span>
          </div>
          <h3 className="font-headline font-black text-lg sm:text-xl leading-snug">
            व्हाट्सएप चैनल एवं ग्रुप से जुड़ें
          </h3>
          <p className="text-xs text-emerald-100 leading-relaxed mt-1.5">
            हर बड़ी और ब्रेकिंग खबर सबसे पहले अपने फोन पर पाएं। 1 लाख+ पाठकों के भरोसेमंद परिवार में शामिल हों।
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-white text-forest hover:bg-emerald-50 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>व्हाट्सएप पर शामिल हों</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <p className="text-[10px] text-emerald-200 text-center">
            निःशुल्क सदस्यता • कोई स्पैम नहीं • 100% प्रामाणिक खबरें
          </p>
        </div>
      </div>
    </section>
  );
};
