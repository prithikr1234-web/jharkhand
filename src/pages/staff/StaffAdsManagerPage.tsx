/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { getStaffAds, saveStaffAd } from '../../api';
import { Ad } from '../../api/types';
import { DollarSign, ToggleLeft, ToggleRight, Calendar, Eye, MousePointer } from 'lucide-react';

export const StaffAdsManagerPage: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAds = () => {
    setLoading(true);
    getStaffAds().then((res) => {
      setAds(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const toggleAdActive = async (ad: Ad) => {
    await saveStaffAd({ ...ad, isActive: !ad.isActive });
    fetchAds();
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="font-headline font-black text-xl text-zinc-900 dark:text-zinc-50">
          विज्ञापन एवं अभियान प्रबंधन (Ad Slots Manager)
        </h1>
        <p className="text-xs text-zinc-500">
          वेबसाइट एवं मोबाइल ऐप पर प्रदर्शित होने वाले प्रायोजित बैनरों का प्रबंधन
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 font-mono text-[10px] font-bold rounded uppercase">
                  {ad.slot}
                </span>
                <button
                  onClick={() => toggleAdActive(ad)}
                  className="flex items-center gap-1.5 text-xs font-bold"
                >
                  {ad.isActive ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <ToggleRight className="w-5 h-5" /> सक्रिय (Live)
                    </span>
                  ) : (
                    <span className="text-zinc-400 flex items-center gap-1">
                      <ToggleLeft className="w-5 h-5" /> बंद (Inactive)
                    </span>
                  )}
                </button>
              </div>

              <h3 className="font-headline font-bold text-sm text-zinc-900 dark:text-zinc-100">
                {ad.title}
              </h3>

              <div className="text-xs text-zinc-500 space-y-1">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>अवधि: {ad.startDate} से {ad.endDate}</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                  <span className="text-[10px] text-zinc-400 block">कुल इंप्रेशन्स</span>
                  <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">
                    {ad.impressions.toLocaleString('hi-IN')}
                  </span>
                </div>
                <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                  <span className="text-[10px] text-zinc-400 block">क्लिक्स (CTR)</span>
                  <span className="font-mono font-bold text-brand">
                    {ad.clicks.toLocaleString('hi-IN')}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-4 text-[11px] text-zinc-400">
              लक्ष्य लिंक: <span className="font-mono text-zinc-600 dark:text-zinc-400">{ad.targetUrl}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
