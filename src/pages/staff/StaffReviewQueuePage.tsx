/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getStaffArticles, updateStaffArticle } from '../../api';
import { Article } from '../../api/types';
import { CheckCircle, XCircle, Clock, Eye, AlertCircle, Sparkles } from 'lucide-react';

export const StaffReviewQueuePage: React.FC = () => {
  const { user } = useAuth();
  const [reviewArticles, setReviewArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [rejectionNote, setRejectionNote] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchQueue = () => {
    setLoading(true);
    getStaffArticles().then((res) => {
      const pending = res.filter((a) => a.status === 'review');
      setReviewArticles(pending);
      if (pending.length > 0 && !selectedArticle) {
        setSelectedArticle(pending[0]);
      } else if (pending.length === 0) {
        setSelectedArticle(null);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleApproveAndPublish = async () => {
    if (!selectedArticle) return;
    await updateStaffArticle(selectedArticle.id, {
      status: 'published',
      publishedAt: new Date().toISOString(),
    });
    alert('लेख सफलतापूर्वक प्रकाशित हो गया है और अब मुख्य वेबसाइट पर लाइव है!');
    fetchQueue();
  };

  const handleRequestChanges = async () => {
    if (!selectedArticle) return;
    const note = rejectionNote || 'कृपया तथ्यों की दोबारा जांच करें और भाषा संशोधित करें।';
    await updateStaffArticle(selectedArticle.id, {
      status: 'draft',
      summary: `[संपादकीय टिप्पणी: ${note}] ${selectedArticle.summary}`,
    });
    alert('लेख संशोधन हेतु रिपोर्टर को वापस भेज दिया गया है।');
    setRejectionNote('');
    fetchQueue();
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="font-headline font-black text-xl text-zinc-900 dark:text-zinc-50">
          संपादकीय समीक्षा कतार (Review Queue)
        </h1>
        <p className="text-xs text-zinc-500">
          संवाददाताओं द्वारा प्रेषित समाचारों की तथ्य-जांच और अंतिम प्रकाशन स्वीकृति
        </p>
      </div>

      {reviewArticles.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="font-headline font-bold text-lg text-zinc-800 dark:text-zinc-200">
            समीक्षा कतार रिक्त है!
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            वर्तमान में कोई भी समाचार समीक्षाधीन नहीं है। सभी लेख स्वीकृत किए जा चुके हैं।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left List (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">
              प्रतीक्षारत आलेख ({reviewArticles.length})
            </span>
            {reviewArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedArticle?.id === art.id
                    ? 'border-brand bg-white dark:bg-zinc-900 ring-2 ring-brand/30 shadow-sm'
                    : 'bg-zinc-50 dark:bg-zinc-850 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mb-1">
                  <span className="font-bold text-brand uppercase">{art.categoryName}</span>
                  <span>• {art.districtName || 'झारखंड'}</span>
                </div>
                <h4 className="font-headline font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
                  {art.titleHi}
                </h4>
                <div className="text-[11px] text-zinc-500 mt-2 flex items-center justify-between">
                  <span>लेखक: {art.authorName}</span>
                  <span className="flex items-center gap-1 text-amber-600">
                    <Clock className="w-3 h-3" />
                    समीक्षाधीन
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Preview & Actions (8 cols) */}
          {selectedArticle && (
            <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
              {/* Header and Details */}
              <div className="space-y-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-brand text-white font-bold text-[10px] rounded uppercase">
                      {selectedArticle.categoryName}
                    </span>
                    <span className="text-xs font-semibold text-zinc-500">
                      जिला: {selectedArticle.districtName}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400">
                    संवाददाता: <strong>{selectedArticle.authorName}</strong>
                  </span>
                </div>

                <h2 className="font-headline font-black text-xl sm:text-2xl text-zinc-900 dark:text-zinc-50">
                  {selectedArticle.titleHi}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl border-l-4 border-amber-500">
                  {selectedArticle.summary}
                </p>
              </div>

              {/* Cover Image & Body */}
              <div className="space-y-4">
                <img
                  src={selectedArticle.coverImage}
                  alt="Cover"
                  className="w-full max-h-72 object-cover rounded-xl"
                />
                <div
                  className="article-content text-sm space-y-2 text-zinc-800 dark:text-zinc-200"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.bodyHtml }}
                />
              </div>

              {/* Review Actions Panel */}
              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-4 bg-zinc-50 dark:bg-zinc-850 p-4 rounded-xl">
                <h4 className="font-headline font-bold text-xs uppercase tracking-wider text-zinc-500">
                  संपादकीय निर्णय (Editorial Action)
                </h4>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleApproveAndPublish}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>स्वीकार करें एवं प्रकाशित करें (Publish Live)</span>
                  </button>

                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      placeholder="सुधार हेतु निर्देश या टिप्पणी..."
                      value={rejectionNote}
                      onChange={(e) => setRejectionNote(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs"
                    />
                    <button
                      onClick={handleRequestChanges}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex-shrink-0"
                    >
                      सुधार हेतु भेजें
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
