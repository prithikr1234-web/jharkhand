/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getStaffArticles, getAuditLogs, getStaffComments } from '../../api';
import { Article, AuditLog, Comment } from '../../api/types';
import {
  FileText,
  Clock,
  Eye,
  TrendingUp,
  PlusCircle,
  CheckCircle,
  Users,
  Activity,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const StaffDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [pendingCommentsCount, setPendingCommentsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      getStaffArticles(),
      user?.role === 'admin' ? getAuditLogs() : Promise.resolve([]),
      getStaffComments().catch(() => []),
    ]).then(([arts, logs, comms]) => {
      if (!mounted) return;
      setArticles(arts);
      setAuditLogs(logs.slice(0, 6));
      setPendingCommentsCount(comms.filter((c) => c.status === 'pending').length);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [user]);

  const publishedToday = articles.filter((a) => a.status === 'published').length;
  const pendingReview = articles.filter((a) => a.status === 'review').length;
  const myDrafts = articles.filter((a) => a.status === 'draft').length;
  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);

  // Top 5 stories by views
  const topStories = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);
  const maxViews = topStories.length > 0 ? topStories[0].views : 1;

  // Reporter leaderboard
  const reporterCounts: Record<string, { name: string; count: number; views: number }> = {};
  articles.forEach((a) => {
    if (!reporterCounts[a.authorName]) {
      reporterCounts[a.authorName] = { name: a.authorName, count: 0, views: 0 };
    }
    reporterCounts[a.authorName].count += 1;
    reporterCounts[a.authorName].views += a.views;
  });
  const leaderboard = Object.values(reporterCounts)
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline font-black text-xl sm:text-2xl text-zinc-900 dark:text-zinc-50">
              नमस्ते, {user?.name}
            </h1>
            <span className="px-2 py-0.5 bg-brand/10 text-brand text-xs font-bold rounded-full">
              {user?.role.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            झारखंड स्वतंत्र खबर संपादकीय डैशबोर्ड में आपका स्वागत है।
          </p>
        </div>

        {user?.role !== 'media' && user?.role !== 'ad_manager' && (
          <Link
            to="/staff/articles/new"
            className="px-4 py-2.5 bg-brand hover:bg-brand-dark text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-2 flex-shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>नया लेख सृजित करें</span>
          </Link>
        )}
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs mb-2">
            <span className="font-medium">प्रकाशित लेख</span>
            <FileText className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-headline font-black text-2xl text-zinc-900 dark:text-zinc-50">
            {publishedToday}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">लाइव एवं सक्रिय</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs mb-2">
            <span className="font-medium">समीक्षाधीन (Pending)</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-headline font-black text-2xl text-zinc-900 dark:text-zinc-50">
            {pendingReview}
          </div>
          <Link to="/staff/review-queue" className="text-[10px] text-amber-600 font-semibold hover:underline">
            समीक्षा कतार देखें &rarr;
          </Link>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs mb-2">
            <span className="font-medium">कुल डिजिटल पाठक</span>
            <Eye className="w-4 h-4 text-brand" />
          </div>
          <div className="font-headline font-black text-2xl text-zinc-900 dark:text-zinc-50">
            {totalViews.toLocaleString('hi-IN')}
          </div>
          <span className="text-[10px] text-zinc-400">सभी लेखों पर संचयी व्यूज</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs mb-2">
            <span className="font-medium">नई पाठक टिप्पणियां</span>
            <Activity className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="font-headline font-black text-2xl text-zinc-900 dark:text-zinc-50">
            {pendingCommentsCount}
          </div>
          <span className="text-[10px] text-indigo-500 font-semibold">संपादकीय स्वीकृति हेतु</span>
        </div>
      </div>

      {/* 2-column: Top stories chart + Reporter leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Top stories visual bar chart */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand" />
              <h3 className="font-headline font-bold text-sm text-zinc-900 dark:text-zinc-50">
                शीर्ष 5 लोकप्रिय समाचार (Top Stories by Views)
              </h3>
            </div>
            <Link to="/staff/articles" className="text-xs text-brand hover:underline">
              सभी &rarr;
            </Link>
          </div>

          <div className="space-y-4">
            {topStories.map((story) => {
              const pct = Math.max(10, Math.round((story.views / maxViews) * 100));

              return (
                <div key={story.id} className="space-y-1 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="truncate max-w-[80%] font-semibold text-zinc-800 dark:text-zinc-200">
                      {story.titleHi}
                    </span>
                    <span className="font-mono text-zinc-500">{story.views.toLocaleString('hi-IN')}</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 5 cols: Reporter Leaderboard */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-500" />
              <h3 className="font-headline font-bold text-sm text-zinc-900 dark:text-zinc-50">
                संवाददाता प्रदर्शन (Leaderboard)
              </h3>
            </div>
            <span className="text-[11px] text-zinc-400">इस सप्ताह</span>
          </div>

          <div className="space-y-3">
            {leaderboard.map((rep, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand/10 text-brand font-bold flex items-center justify-center text-xs">
                    {idx + 1}
                  </span>
                  <div>
                    <h5 className="font-bold text-zinc-900 dark:text-zinc-100">{rep.name}</h5>
                    <span className="text-[11px] text-zinc-400">{rep.count} खबरें दर्ज</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {rep.views.toLocaleString('hi-IN')}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">व्यूज</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Audit Log Preview */}
      {user?.role === 'admin' && auditLogs.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="font-headline font-bold text-sm text-zinc-900 dark:text-zinc-50">
                हालिया सुरक्षा एवं संपादकीय गतिविधि (Recent Audit Trail)
              </h3>
            </div>
            <Link to="/staff/audit" className="text-xs text-brand hover:underline">
              संपूर्ण ऑडिट लॉग देखें &rarr;
            </Link>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{log.userName}</span>
                  <span className="text-zinc-400 ml-2">({log.userRole})</span>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">{log.details}</p>
                </div>
                <span className="text-[11px] text-zinc-400 font-mono flex-shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
