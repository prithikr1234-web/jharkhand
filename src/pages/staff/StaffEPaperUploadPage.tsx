/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Upload, Plus, Trash2, ArrowUp, ArrowDown, Check } from 'lucide-react';

interface PageDraft {
  pageNumber: number;
  imageUrl: string;
  titleHi: string;
}

export const StaffEPaperUploadPage: React.FC = () => {
  const [editionDate, setEditionDate] = useState('2026-10-06');
  const [editionName, setEditionName] = useState('राँची मुख्य संस्करण');
  const [pages, setPages] = useState<PageDraft[]>([
    {
      pageNumber: 1,
      imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
      titleHi: 'पेज 1: मुख्य फ्रंट पेज',
    },
    {
      pageNumber: 2,
      imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
      titleHi: 'पेज 2: राँची नगर हलचल',
    },
    {
      pageNumber: 3,
      imageUrl: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&w=800&q=80',
      titleHi: 'पेज 3: झारखंड प्रशासनिक व व्यापार',
    },
  ]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const movePage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= pages.length) return;
    const reordered = [...pages];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    // Re-index
    const reIndexed = reordered.map((p, idx) => ({ ...p, pageNumber: idx + 1 }));
    setPages(reIndexed);
  };

  const removePage = (index: number) => {
    const updated = pages.filter((_, i) => i !== index);
    setPages(updated.map((p, idx) => ({ ...p, pageNumber: idx + 1 })));
  };

  const addPage = () => {
    const newPageNum = pages.length + 1;
    setPages([
      ...pages,
      {
        pageNumber: newPageNum,
        imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
        titleHi: `पेज ${newPageNum}: विशेष संस्करण`,
      },
    ]);
  };

  const handlePublish = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="font-headline font-black text-xl text-zinc-900 dark:text-zinc-50">
            ई-पेपर अपलोड एवं पृष्ठ प्रबंधन (E-Paper Manager)
          </h1>
          <p className="text-xs text-zinc-500">
            दैनिक मुद्रित संस्करण के डिजिटल पृष्ठों को दिनांकवार अपलोड व व्यवस्थित करें
          </p>
        </div>

        <button
          onClick={handlePublish}
          className="px-5 py-2.5 bg-brand hover:bg-brand-dark text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center gap-1.5 flex-shrink-0"
        >
          <BookOpen className="w-4 h-4 text-amber-300" />
          <span>ई-पेपर संस्करण प्रकाशित करें</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>ई-पेपर संस्करण सफलता से सहेज लिया गया है और पाठकों के लिए उपलब्ध है!</span>
        </div>
      )}

      {/* Edition Setup */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
            संस्करण दिनांक (Edition Date)
          </label>
          <input
            type="date"
            value={editionDate}
            onChange={(e) => setEditionDate(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
            संस्करण का नाम (Edition Title)
          </label>
          <input
            type="text"
            value={editionName}
            onChange={(e) => setEditionName(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs"
          />
        </div>
      </div>

      {/* Pages Reorder List */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <span className="font-headline font-bold text-sm text-zinc-900 dark:text-zinc-100">
            पृष्ठ क्रम एवं छवियां (कुल {pages.length} पृष्ठ)
          </span>
          <button
            onClick={addPage}
            className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-800 dark:text-zinc-200 font-bold text-xs rounded-lg flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>नया पृष्ठ जोड़ें</span>
          </button>
        </div>

        <div className="space-y-3">
          {pages.map((p, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {p.pageNumber}
                </span>
                <img
                  src={p.imageUrl}
                  alt={p.titleHi}
                  className="w-12 h-16 object-cover rounded shadow-xs"
                />
                <div>
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">{p.titleHi}</h4>
                  <span className="text-[10px] text-zinc-400">उच्च रिज़ॉल्यूशन जेपीजी</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => movePage(idx, idx - 1)}
                  disabled={idx === 0}
                  className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-30"
                  title="ऊपर ले जाएं"
                >
                  <ArrowUp className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                </button>
                <button
                  onClick={() => movePage(idx, idx + 1)}
                  disabled={idx === pages.length - 1}
                  className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-30"
                  title="नीचे ले जाएं"
                >
                  <ArrowDown className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                </button>
                <button
                  onClick={() => removePage(idx)}
                  className="p-1.5 rounded hover:bg-red-50 text-red-500"
                  title="पृष्ठ हटाएं"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
