/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Poll } from '../../api/types';
import { votePublicPoll } from '../../api';
import { Quote, Vote, CheckCircle2, Award } from 'lucide-react';

interface EditorialAndPollProps {
  poll: Poll | null;
}

export const EditorialAndPoll: React.FC<EditorialAndPollProps> = ({ poll }) => {
  const [currentPoll, setCurrentPoll] = useState<Poll | null>(poll);
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    if (poll) {
      setCurrentPoll(poll);
      const voted = localStorage.getItem(`jsk_poll_${poll.id}`);
      if (voted) {
        setVotedOptionId(voted);
      }
    }
  }, [poll]);

  const handleVote = async (optionId: string) => {
    if (!currentPoll || votedOptionId || voting) return;
    setVoting(true);
    try {
      const updated = await votePublicPoll(currentPoll.id, optionId);
      setCurrentPoll(updated);
      setVotedOptionId(optionId);
      localStorage.setItem(`jsk_poll_${currentPoll.id}`, optionId);
    } catch (e) {
      console.error(e);
    } finally {
      setVoting(false);
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 1. संपादकीय स्तम्भ: आज का विचार (Col 7) */}
      <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-line dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950 text-brand flex items-center justify-center">
                <Quote className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-50">
                  संपादकीय स्तम्भ: आज का विचार
                </h3>
                <p className="text-[11px] text-muted">निष्पक्ष टिप्पणी और समसामयिक विमर्श</p>
              </div>
            </div>
            <span className="text-[11px] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold px-2 py-0.5 rounded">
              संपादकीय
            </span>
          </div>

          <div className="mt-4 space-y-3">
            <h4 className="font-headline font-black text-base sm:text-lg text-zinc-900 dark:text-zinc-100 leading-snug">
              झारखंड के खनिज संसाधन और स्थानीय युवाओं के रोजगार की असल चुनौती
            </h4>
            <p className="text-xs sm:text-sm text-charcoal dark:text-zinc-300 leading-relaxed font-sans">
              झारखंड देश के 40% खनिज भंडार का संवाहक है, परंतु आजादी के दशकों बाद भी राज्य की एक बड़ी युवा आबादी पलायन को विवश है। नीतिगत सुधार केवल फाइलों और सम्मेलनों तक सीमित नहीं रहने चाहिए। जब तक स्थानीय उद्योगों में 75% स्थानीय भर्ती के कानून को सख्ती से जमीन पर लागू नहीं किया जाएगा, तब तक 'समृद्ध झारखंड' का सपना अधूरा ही रहेगा। सरकार और उद्योगपतियों दोनों को इस दिशा में ठोस इच्छाशक्ति दिखानी होगी।
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-line/60 dark:border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center font-bold text-brand text-sm font-headline">
              अ.व.
            </div>
            <div>
              <p className="font-headline font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                अमित कुमार वर्मा
              </p>
              <p className="text-[10px] text-muted">प्रधान संपादक, झारखंड स्वतंत्र खबर</p>
            </div>
          </div>
          <span className="text-[11px] text-muted font-medium">आज का अंक</span>
        </div>
      </div>

      {/* 2. आज का पोल (Col 5) */}
      <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-line dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950 text-saffron flex items-center justify-center">
                <Vote className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-base text-zinc-900 dark:text-zinc-50">
                  आज का पोल (Janmat)
                </h3>
                <p className="text-[11px] text-muted">आपकी राय हमारे लिए महत्वपूर्ण है</p>
              </div>
            </div>
            <span className="text-[10px] bg-red-100 text-brand font-bold px-1.5 py-0.5 rounded animate-pulse">
              लाइव
            </span>
          </div>

          {currentPoll ? (
            <div className="mt-4 space-y-3">
              <h4 className="font-headline font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 leading-snug">
                {currentPoll.questionHi}
              </h4>

              <div className="space-y-2 mt-3">
                {currentPoll.options.map((opt) => {
                  const percentage =
                    currentPoll.totalVotes > 0
                      ? Math.round((opt.votes / currentPoll.totalVotes) * 100)
                      : 0;
                  const isSelected = votedOptionId === opt.id;

                  return (
                    <div key={opt.id} className="relative">
                      {votedOptionId ? (
                        <div className="relative overflow-hidden rounded-xl border border-line dark:border-zinc-800 p-2.5 bg-zinc-50 dark:bg-zinc-850">
                          {/* Fill bar */}
                          <div
                            className="absolute top-0 bottom-0 left-0 bg-brand/15 dark:bg-brand/25 transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                          <div className="relative flex items-center justify-between text-xs z-10 font-medium">
                            <span className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200">
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-brand" />}
                              {opt.textHi}
                            </span>
                            <span className="font-bold font-headline text-brand">
                              {percentage}%
                            </span>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleVote(opt.id)}
                          disabled={voting}
                          className="w-full text-left p-2.5 rounded-xl border border-line dark:border-zinc-800 hover:border-brand bg-zinc-50/60 dark:bg-zinc-850 text-xs font-medium text-zinc-800 dark:text-zinc-200 transition-colors flex items-center justify-between cursor-pointer group"
                        >
                          <span className="group-hover:text-brand transition-colors">
                            {opt.textHi}
                          </span>
                          <span className="text-[10px] text-muted group-hover:text-brand">वोट दें</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted py-4">पोल डेटा लोड हो रहा है...</p>
          )}
        </div>

        <div className="pt-3 border-t border-line/60 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-muted">
          <span>कुल मत: {currentPoll?.totalVotes || 0}</span>
          <span>{votedOptionId ? 'आपका मत दर्ज हो चुका है' : 'मत देने के लिए विकल्प पर क्लिक करें'}</span>
        </div>
      </div>
    </section>
  );
};
