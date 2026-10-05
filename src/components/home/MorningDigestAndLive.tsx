/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../api/types';
import { Sparkles, Radio, ChevronRight, CheckCircle2, RefreshCw } from 'lucide-react';

interface MorningDigestAndLiveProps {
  digestArticles: Article[];
}

interface LiveUpdateItem {
  id: string;
  time: string;
  text: string;
  category: string;
  isImportant?: boolean;
}

const INITIAL_LIVE_UPDATES: LiveUpdateItem[] = [
  {
    id: 'lu-1',
    time: 'अभी-अभी',
    text: 'राँची रिंग रोड पर भारी वाहनों का प्रवेश शाम 8 बजे तक वर्जित, ट्रैफिक पुलिस ने जारी की एडवाइजरी।',
    category: 'ट्रैफिक',
    isImportant: true,
  },
  {
    id: 'lu-2',
    time: '12 मिनट पहले',
    text: 'JSSC CGL परीक्षा परिणाम पर आयोग की बैठक समाप्त, अगले 48 घंटे में जारी हो सकती है आधिकारिक कट-ऑफ।',
    category: 'रोजगार',
    isImportant: true,
  },
  {
    id: 'lu-3',
    time: '28 मिनट पहले',
    text: 'धनबाद कोयला खदान क्षेत्र में पर्यावरण मानकों के उल्लंघन पर 3 कोलियरी को नोटिस थमाया गया।',
    category: 'झारखंड',
  },
  {
    id: 'lu-4',
    time: '45 मिनट पहले',
    text: 'मौसम विभाग: संताल परगना और कोल्हान प्रमंडल के 8 जिलों में आज गरज के साथ हल्की बारिश का अलर्ट।',
    category: 'मौसम',
  },
  {
    id: 'lu-5',
    time: '1 घंटा पहले',
    text: 'पटना एम्स में आधुनिक कैंसर यूनिट का ट्रायल पूरा, अगले सप्ताह से आम मरीजों के लिए खुलेगी।',
    category: 'स्वास्थ्य',
  },
];

export const MorningDigestAndLive: React.FC<MorningDigestAndLiveProps> = ({ digestArticles }) => {
  const [liveUpdates, setLiveUpdates] = useState<LiveUpdateItem[]>(INITIAL_LIVE_UPDATES);
  const [lastRefreshed, setLastRefreshed] = useState<string>('अभी');

  // Simulated auto-refresh indicator
  const handleRefresh = () => {
    setLastRefreshed('अभी-अभी अद्यतन किया गया');
    setTimeout(() => setLastRefreshed('अभी'), 3000);
  };

  const top5 = digestArticles.slice(0, 5);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* 1. Morning Digest: आज की 5 बड़ी खबरें (Col 7) */}
      <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-line dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-950 text-brand flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="font-headline font-black text-base sm:text-lg text-zinc-900 dark:text-zinc-50">
                आज की 5 बड़ी खबरें (Morning Digest)
              </h2>
            </div>
            <span className="text-[11px] font-bold text-saffron bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded">
              संपादकीय चयन
            </span>
          </div>

          <div className="divide-y divide-line/60 dark:divide-zinc-800/80 mt-2">
            {top5.map((item, idx) => (
              <div key={item.id} className="py-2.5 sm:py-3 flex items-start gap-3 group">
                <span className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-brand group-hover:text-white transition-colors">
                  {idx + 1}
                </span>
                <div className="space-y-1 flex-1 min-w-0">
                  <Link
                    to={`/news/${item.id}/${item.slug}`}
                    className="font-headline font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-brand transition-colors line-clamp-2 leading-snug"
                  >
                    {item.titleHi}
                  </Link>
                  <div className="flex items-center gap-2 text-[10px] text-muted">
                    <span className="text-brand font-semibold">{item.category}</span>
                    <span>•</span>
                    <span>{item.districtName || 'विशेष'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 text-right">
          <Link
            to="/jharkhand"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
          >
            <span>सभी मुख्य समाचार पढ़ें</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Live Updates: लाइव अपडेट (Col 5) */}
      <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-line dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand"></span>
              </span>
              <h2 className="font-headline font-black text-base sm:text-lg text-zinc-900 dark:text-zinc-50">
                लाइव अपडेट्स
              </h2>
            </div>
            <button
              onClick={handleRefresh}
              title="रिफ्रेश करें"
              className="text-[11px] text-muted hover:text-brand flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{lastRefreshed}</span>
            </button>
          </div>

          <div className="space-y-3 mt-3">
            {liveUpdates.map((update) => (
              <div
                key={update.id}
                className={`p-2.5 rounded-xl border text-xs leading-relaxed transition-all ${
                  update.isImportant
                    ? 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/60'
                    : 'bg-zinc-50 dark:bg-zinc-850/60 border-line dark:border-zinc-800'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-muted mb-1">
                  <span className="text-brand uppercase">{update.category}</span>
                  <span className="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 px-1.5 py-0.2 rounded font-medium">
                    {update.time}
                  </span>
                </div>
                <p className="text-zinc-800 dark:text-zinc-200 font-medium">
                  {update.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-line/60 dark:border-zinc-800/80 text-[11px] text-center text-muted">
          ताज़ा सूचनाएं 24 घंटे सीधे न्यूज़ रूम से अपडेट की जा रही हैं
        </div>
      </div>
    </section>
  );
};
