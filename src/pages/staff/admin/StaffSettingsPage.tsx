/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { getPublicSettings, updateStaffSettings } from '../../../api';
import { SiteSettings } from '../../../api/types';
import { Settings, Save, Check, Globe } from 'lucide-react';

export const StaffSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [tickerText, setTickerText] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getPublicSettings().then((res) => {
      setSettings(res);
      setTickerText(res.tickerItemsHi?.join('\n') || '');
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    const updatedSettings: SiteSettings = {
      ...settings,
      tickerItemsHi: tickerText.split('\n').filter((t) => t.trim()),
    };

    await updateStaffSettings(updatedSettings);
    setSettings(updatedSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!settings) return <div className="p-8 text-center text-xs">लोड हो रहा है...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div>
          <h1 className="font-headline font-black text-xl text-zinc-900 dark:text-zinc-50">
            पोर्टल एवं ब्रांड सेटिंग्स (Site Configuration)
          </h1>
          <p className="text-xs text-zinc-500">
            संपादकीय संपर्क, टिकर शीर्षक, सोशल लिंक्स एवं शिकायत अधिकारी का विवरण
          </p>
        </div>

        {saved && (
          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
            <Check className="w-4 h-4" />
            <span>सेटिंग्स सहेजी गईं!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Brand */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-headline font-bold text-sm text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            ब्रांड एवं संपर्क विवरण
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                पोर्टल का नाम
              </label>
              <input
                type="text"
                value={settings.siteNameHi}
                onChange={(e) => setSettings({ ...settings, siteNameHi: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                टैगलाइन (Tagline)
              </label>
              <input
                type="text"
                value={settings.taglineHi}
                onChange={(e) => setSettings({ ...settings, taglineHi: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        {/* Ticker Items */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-3">
          <h3 className="font-headline font-bold text-sm text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            ब्रेकिंग टिकर समाचार (प्रत्येक पंक्ति में एक खबर)
          </h3>
          <textarea
            rows={5}
            value={tickerText}
            onChange={(e) => setTickerText(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs font-headline leading-relaxed"
          />
        </div>

        {/* Grievance Officer details */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-headline font-bold text-sm text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            शिकायत निवारण अधिकारी (Grievance Officer Information)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                पदाधिकारी का नाम
              </label>
              <input
                type="text"
                value={settings.grievanceOfficer.name}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    grievanceOfficer: { ...settings.grievanceOfficer, name: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                ईमेल
              </label>
              <input
                type="email"
                value={settings.grievanceOfficer.email}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    grievanceOfficer: { ...settings.grievanceOfficer, email: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-brand hover:bg-brand-dark text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          <span>परिवर्तन सहेजें</span>
        </button>
      </form>
    </div>
  );
};
