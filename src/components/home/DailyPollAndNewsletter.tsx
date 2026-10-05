/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Poll } from '../../api/types';
import { votePublicPoll } from '../../api';
import { BarChart3, CheckCircle2, MessageCircle, Send, Check } from 'lucide-react';

interface DailyPollAndNewsletterProps {
  initialPoll: Poll;
}

export const DailyPollAndNewsletter: React.FC<DailyPollAndNewsletterProps> = ({ initialPoll }) => {
  const [poll, setPoll] = useState<Poll>(initialPoll);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // WhatsApp subscribe state
  const [phone, setPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleVote = async () => {
    if (!selectedOption || hasVoted) return;
    setSubmitting(true);
    try {
      const updated = await votePublicPoll(poll.id, selectedOption);
      setPoll(updated);
      setHasVoted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setSubscribed(true);
    }
  };

  return (
    <section className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left 6 cols: Daily Poll */}
      <div className="lg:col-span-6 bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-line dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-500/10 text-amber-600 rounded-lg">
                <BarChart3 className="w-5 h-5" />
              </span>
              <h3 className="font-headline font-bold text-base text-zinc-900 dark:text-zinc-50">
                आज का जनमत संग्रह (Daily Poll)
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-muted">
              कुल मत: {poll.totalVotes.toLocaleString('hi-IN')}
            </span>
          </div>

          <h4 className="font-headline font-bold text-sm sm:text-base text-zinc-800 dark:text-zinc-200 mb-4 leading-snug">
            {poll.questionHi}
          </h4>

          {/* Options */}
          <div className="space-y-3">
            {poll.options.map((opt) => {
              const percentage = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;

              return (
                <div key={opt.id} className="space-y-1">
                  {!hasVoted ? (
                    <label
                      onClick={() => setSelectedOption(opt.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedOption === opt.id
                          ? 'border-brand bg-brand/5 dark:bg-brand/10 text-brand font-semibold'
                          : 'border-line dark:border-zinc-800 hover:border-zinc-400 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="poll"
                        checked={selectedOption === opt.id}
                        onChange={() => setSelectedOption(opt.id)}
                        className="text-brand focus:ring-brand"
                      />
                      <span className="text-xs sm:text-sm">{opt.textHi}</span>
                    </label>
                  ) : (
                    /* Animated Result Bar */
                    <div className="p-2.5 rounded-xl border border-line dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850 space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                        <span>{opt.textHi}</span>
                        <span className="text-brand font-bold">{percentage}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand transition-all duration-700 ease-out rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {!hasVoted ? (
          <button
            onClick={handleVote}
            disabled={!selectedOption || submitting}
            className="w-full mt-5 py-2.5 bg-brand hover:bg-brand-dark disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{submitting ? 'मत दर्ज हो रहा है...' : 'अपना मत दर्ज करें'}</span>
          </button>
        ) : (
          <p className="text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-4 flex items-center justify-center gap-1">
            <Check className="w-4 h-4" />
            <span>आपकी राय दर्ज कर ली गई है। धन्यवाद!</span>
          </p>
        )}
      </div>

      {/* Right 6 cols: WhatsApp & Newsletter Join Banner */}
      <div className="lg:col-span-6 bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
        {/* Background watermark */}
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <MessageCircle className="w-64 h-64" />
        </div>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-emerald-200 mb-4 backdrop-blur-xs">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>व्हाट्सएप एवं टेलीग्राम चैनल</span>
          </div>

          <h3 className="font-headline font-black text-xl sm:text-2xl text-white mb-2 leading-tight">
            सीधे अपने फोन पर पाएं झारखंड-बिहार की हर बड़ी खबर
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6">
            बिना किसी देरी, 100% निष्पक्ष खबरें और ब्रेकिंग न्यूज़ अलर्ट्स। 1,50,000+ जागरूक नागरिकों से आज ही जुड़ें।
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="अपना 10 अंकों का मोबाइल नंबर दर्ज करें"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/15 border border-white/20 text-white placeholder-emerald-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 flex-shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>जुड़ें (Join Now)</span>
                </button>
              </div>
              <p className="text-[10px] text-emerald-200/70">
                🔒 हम आपकी गोपनीयता का सम्मान करते हैं। स्पैम रहित केवल सत्यापित समाचार।
              </p>
            </form>
          ) : (
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
              <p className="text-sm font-bold text-emerald-300">
                🎉 धन्यवाद! आपको झारखंड स्वतंत्र खबर के आधिकारिक व्हाट्सएप चैनल पर जोड़ लिया गया है।
              </p>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-200/80 mt-4">
          <span>दैनिक ई-पेपर बुलेटिन</span>
          <span>ताजा सरकारी भर्तियां</span>
          <span>विशेष जमीनी पड़ताल</span>
        </div>
      </div>
    </section>
  );
};
