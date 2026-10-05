/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getStaffArticles, deleteStaffArticle, updateStaffArticle } from '../../api';
import { Article, ArticleStatus } from '../../api/types';
import {
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  Archive,
  Flame,
  Star,
  ExternalLink,
} from 'lucide-react';

export const StaffArticlesListPage: React.FC = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ArticleStatus>('all');
  const [loading, setLoading] = useState(true);

  const fetchArticles = () => {
    setLoading(true);
    getStaffArticles().then((res) => {
      setArticles(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`क्या आप वाकई इस लेख को हटाना चाहते हैं?\n"${title}"`)) {
      await deleteStaffArticle(id);
      fetchArticles();
    }
  };

  const handleToggleBreaking = async (art: Article) => {
    await updateStaffArticle(art.id, { isBreaking: !art.isBreaking });
    fetchArticles();
  };

  const filtered = articles.filter((a) => {
    const matchesSearch =
      a.titleHi.toLowerCase().includes(search.toLowerCase()) ||
      a.authorName.toLowerCase().includes(search.toLowerCase()) ||
      (a.districtName && a.districtName.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="font-headline font-black text-xl text-zinc-900 dark:text-zinc-50">
            {user?.role === 'reporter' ? 'मेरे आलेख व समाचार' : 'सभी प्रकाशित एवं ड्राफ्ट लेख'}
          </h1>
          <p className="text-xs text-zinc-500">
            कुल {filtered.length} समाचार संकलित
          </p>
        </div>

        {user?.role !== 'media' && user?.role !== 'ad_manager' && (
          <Link
            to="/staff/articles/new"
            className="px-4 py-2 bg-brand hover:bg-brand-dark text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>नई खबर लिखें</span>
          </Link>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="शीर्षक या लेखक खोजें..."
            className="w-full pl-9 pr-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-brand"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
        </div>

        {/* Status Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              statusFilter === 'all'
                ? 'bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            सभी ({articles.length})
          </button>
          <button
            onClick={() => setStatusFilter('published')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              statusFilter === 'published'
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            प्रकाशित
          </button>
          <button
            onClick={() => setStatusFilter('review')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              statusFilter === 'review'
                ? 'bg-amber-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            समीक्षाधीन
          </button>
          <button
            onClick={() => setStatusFilter('draft')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              statusFilter === 'draft'
                ? 'bg-zinc-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            ड्राफ्ट
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800/70 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">शीर्षक / खबर</th>
                <th className="p-4">विभाग एवं जिला</th>
                <th className="p-4">लेखक</th>
                <th className="p-4">स्थिति</th>
                <th className="p-4">व्यूज</th>
                <th className="p-4 text-right">कार्रवाई</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                  <td className="p-4 max-w-sm">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.coverImage}
                        alt="Thumbnail"
                        className="w-12 h-10 object-cover rounded-lg flex-shrink-0 bg-zinc-200 dark:bg-zinc-700"
                      />
                      <div>
                        <Link
                          to={`/staff/articles/${item.id}`}
                          className="font-headline font-bold text-zinc-900 dark:text-zinc-100 hover:text-brand line-clamp-1 text-sm"
                        >
                          {item.titleHi}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          {item.isBreaking && (
                            <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-950 text-red-600 text-[10px] font-bold rounded">
                              ब्रेकिंग
                            </span>
                          )}
                          {item.isFeatured && (
                            <span className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-700 text-[10px] font-bold rounded">
                              खास खबर
                            </span>
                          )}
                          <span className="text-[10px] text-zinc-400">
                            {new Date(item.publishedAt || item.updatedAt || Date.now()).toLocaleDateString('hi-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">
                      {item.categoryName}
                    </span>
                    <span className="text-[11px] text-zinc-400">{item.districtName || 'राज्य'}</span>
                  </td>

                  <td className="p-4 font-medium text-zinc-700 dark:text-zinc-300">
                    {item.authorName}
                  </td>

                  <td className="p-4">
                    {item.status === 'published' && (
                      <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full font-bold text-[10px]">
                        प्रकाशित
                      </span>
                    )}
                    {item.status === 'review' && (
                      <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-full font-bold text-[10px]">
                        समीक्षाधीन
                      </span>
                    )}
                    {item.status === 'draft' && (
                      <span className="px-2 py-0.5 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-full font-bold text-[10px]">
                        ड्राफ्ट
                      </span>
                    )}
                  </td>

                  <td className="p-4 font-mono font-bold text-zinc-700 dark:text-zinc-300">
                    {item.views.toLocaleString('hi-IN')}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Live site link */}
                      {item.status === 'published' && (
                        <Link
                          to={`/news/${item.id}/${item.slug}`}
                          target="_blank"
                          className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
                          title="वेबसाइट पर देखें"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}

                      {/* Toggle breaking for editors */}
                      {(user?.role === 'admin' || user?.role === 'editor') && (
                        <button
                          onClick={() => handleToggleBreaking(item)}
                          className={`p-1.5 rounded transition-colors ${
                            item.isBreaking ? 'text-red-600 bg-red-50' : 'text-zinc-400 hover:text-red-500'
                          }`}
                          title="ब्रेकिंग टॉगल करें"
                        >
                          <Flame className="w-4 h-4" />
                        </button>
                      )}

                      {/* Edit */}
                      <Link
                        to={`/staff/articles/${item.id}`}
                        className="p-1.5 text-zinc-600 dark:text-zinc-300 hover:text-brand"
                        title="संपादित करें"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

                      {/* Delete */}
                      {(user?.role === 'admin' || user?.role === 'editor') && (
                        <button
                          onClick={() => handleDelete(item.id, item.titleHi)}
                          className="p-1.5 text-zinc-400 hover:text-red-600"
                          title="हटाएं"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
