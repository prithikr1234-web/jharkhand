/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { getStaffComments, moderateComment } from '../../api';
import { Comment } from '../../api/types';
import { MessageSquare, Check, X, ShieldAlert, Trash2 } from 'lucide-react';

export const StaffCommentsModerationPage: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = () => {
    setLoading(true);
    getStaffComments().then((res) => {
      setComments(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleAction = async (id: string, status: Comment['status']) => {
    await moderateComment(id, status);
    fetchComments();
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="font-headline font-black text-xl text-zinc-900 dark:text-zinc-50">
          टिप्पणी समीक्षा एवं मॉडरेशन (Comments Moderation)
        </h1>
        <p className="text-xs text-zinc-500">
          सभ्य और मर्यादित संवाद सुनिश्चित करने हेतु पाठकों द्वारा की गई टिप्पणियों की स्वीकृति
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        {comments.length === 0 ? (
          <div className="p-12 text-center text-xs text-zinc-500">
            कोई भी टिप्पणी समीक्षाधीन नहीं है।
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
            {comments.map((comm) => (
              <div key={comm.id} className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">
                      {comm.authorName} ({comm.authorCity || 'पाठक'})
                    </span>
                    <span className="text-zinc-400">•</span>
                    <span className="text-[11px] text-zinc-400">
                      लेख: <strong>{comm.articleTitle || 'समाचार'}</strong>
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      comm.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-700'
                        : comm.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : comm.status === 'spam'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {comm.status === 'approved' ? 'स्वीकृत' : comm.status === 'rejected' ? 'अस्वीकृत' : comm.status === 'spam' ? 'स्पैम' : 'प्रतीक्षारत'}
                    </span>
                  </div>

                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-xs sm:text-sm">
                    "{comm.content}"
                  </p>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleAction(comm.id, 'approved')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center gap-1"
                    title="स्वीकार करें"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>स्वीकृत करें</span>
                  </button>
                  <button
                    onClick={() => handleAction(comm.id, 'rejected')}
                    className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 text-zinc-800 dark:text-zinc-200 rounded-lg font-bold text-xs flex items-center gap-1"
                    title="अस्वीकार करें"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>अस्वीकार</span>
                  </button>
                  <button
                    onClick={() => handleAction(comm.id, 'spam')}
                    className="p-1.5 text-zinc-400 hover:text-purple-600 rounded-lg"
                    title="स्पैम चिन्हित करें"
                  >
                    <ShieldAlert className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
