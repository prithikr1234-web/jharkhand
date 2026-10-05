/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { JobNotice } from '../../api/types';
import { Briefcase, Calendar, ChevronRight, AlertCircle, ExternalLink } from 'lucide-react';

interface JobsAndResultsProps {
  jobs: JobNotice[];
}

export const JobsAndResults: React.FC<JobsAndResultsProps> = ({ jobs }) => {
  const displayJobs = jobs.slice(0, 6);

  // Helper to check if deadline is within 3 days
  const isClosingSoon = (deadlineStr: string) => {
    return deadlineStr.includes('3 दिन') || deadlineStr.includes('कल') || deadlineStr.includes('आज') || deadlineStr.includes('2 दिन');
  };

  return (
    <section className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b-2 border-forest">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-forest flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-headline font-black text-lg sm:text-xl text-zinc-900 dark:text-zinc-50">
              रोजगार एवं सरकारी परिणाम (Jobs & Results)
            </h2>
            <p className="text-[11px] text-muted">
              JSSC, JPSC, BPSC, रेलवे, शिक्षक भर्ती एवं प्रतियोगी परीक्षाओं की ताज़ा विज्ञप्तियां
            </p>
          </div>
        </div>

        <Link
          to="/jobs"
          className="text-xs font-bold text-forest hover:underline flex items-center gap-1"
        >
          <span>सभी भर्तियां देखें</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-800/80 border-b border-line dark:border-zinc-800 text-muted font-bold">
              <th className="py-2.5 px-3">संस्था / विभाग</th>
              <th className="py-2.5 px-3">पद एवं विज्ञप्ति</th>
              <th className="py-2.5 px-3">कुल पद</th>
              <th className="py-2.5 px-3">अंतिम तिथि</th>
              <th className="py-2.5 px-3 text-right">लिंक</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60 dark:divide-zinc-800/60">
            {displayJobs.map((job) => {
              const closingSoon = isClosingSoon(job.deadline || '');
              return (
                <tr
                  key={job.id}
                  className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <td className="py-3 px-3 font-bold text-zinc-800 dark:text-zinc-200">
                    <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-[11px]">
                      {job.organization}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-headline font-semibold text-zinc-900 dark:text-zinc-100">
                      {job.titleHi}
                    </div>
                    <div className="text-[10px] text-muted">{job.eligibility}</div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-zinc-700 dark:text-zinc-300">
                    {job.totalPosts ? `${job.totalPosts} पद` : '—'}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                        closingSoon
                          ? 'bg-red-100 dark:bg-red-950 text-brand animate-pulse'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <Calendar className="w-3 h-3" />
                      {job.deadline}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <a
                      href={job.applyUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-forest hover:bg-emerald-700 text-white font-bold rounded-md text-[11px] transition-colors"
                    >
                      <span>आवेदन</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
