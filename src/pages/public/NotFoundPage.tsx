/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeadMeta } from '../../components/common/HeadMeta';
import { Search, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
      <HeadMeta
        title="पृष्ठ नहीं मिला (404) - झारखंड स्वतंत्र खबर"
        description="क्षमा करें, जिस पृष्ठ की आप तलाश कर रहे हैं वह उपलब्ध नहीं है।"
      />

      <div className="inline-block p-4 rounded-3xl bg-red-100 dark:bg-red-950/60 text-brand font-headline font-black text-6xl shadow-inner">
        404
      </div>

      <h1 className="font-headline font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50">
        यह पृष्ठ उपलब्ध नहीं है (Page Not Found)
      </h1>

      <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-md mx-auto">
        क्षमा करें, जो खबर या पृष्ठ आप खोज रहे हैं, उसका लिंक बदल चुका है या उसे हटा दिया गया है।
      </p>

      {/* Quick Search */}
      <form onSubmit={handleSearch} className="flex max-w-md mx-auto gap-2">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="खबर खोजें..."
          className="flex-1 px-4 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-brand hover:bg-brand-dark text-white font-bold text-xs rounded-xl shadow-xs"
        >
          खोजें
        </button>
      </form>

      <div className="pt-4 flex items-center justify-center gap-4">
        <Link
          to="/"
          className="px-5 py-2.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
        >
          <Home className="w-4 h-4" />
          <span>मुख्य पृष्ठ पर जाएं</span>
        </Link>
      </div>
    </div>
  );
};
