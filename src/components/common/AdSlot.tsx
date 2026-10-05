import React from 'react';

interface AdSlotProps {
  slot: 'leaderboard_728x90' | 'mpu_300x250' | 'mobile_320x100';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slot, className = '' }) => {
  if (slot === 'leaderboard_728x90') {
    return (
      <div className={`w-full flex flex-col items-center justify-center my-4 overflow-hidden ${className}`}>
        <span className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 tracking-wider mb-1">
          विज्ञापन (Advertisement)
        </span>
        <div className="w-full max-w-[728px] h-[90px] bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-850 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg flex items-center justify-between px-6 transition-all hover:border-brand/40">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-brand/10 dark:bg-brand/20 text-brand font-bold flex items-center justify-center text-sm">
              JSK
            </span>
            <div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 font-headline">
                झारखंड स्वतंत्र खबर विशेष डिजिटल पार्टनरशिप
              </p>
              <p className="text-[11px] text-zinc-500">अपने ब्रांड का प्रचार लाखों पाठकों तक पहुंचाएं</p>
            </div>
          </div>
          <span className="text-xs font-medium text-brand hover:underline cursor-pointer bg-white dark:bg-zinc-900 px-3 py-1.5 rounded border border-line dark:border-zinc-700 shadow-2xs">
            संपर्क करें &rarr;
          </span>
        </div>
      </div>
    );
  }

  if (slot === 'mpu_300x250') {
    return (
      <div className={`w-full flex flex-col items-center justify-center my-4 overflow-hidden ${className}`}>
        <span className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 tracking-wider mb-1">
          विज्ञापन (300x250)
        </span>
        <div className="w-[300px] h-[250px] bg-gradient-to-b from-amber-50 to-orange-50 dark:from-zinc-800 dark:to-zinc-850 border border-dashed border-amber-200 dark:border-zinc-700 rounded-xl p-4 flex flex-col justify-between text-center relative overflow-hidden">
          <div className="pt-2">
            <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-amber-500 text-white rounded mb-2">
              विशेष प्रायोजित
            </span>
            <h4 className="font-headline font-bold text-sm text-zinc-900 dark:text-zinc-100 leading-snug">
              झारखंड-बिहार उद्योग एवं व्यापार एक्सपो 2026
            </h4>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-2">
              राँची और पटना के प्रमुख उद्यमियों से जुड़ें। स्टॉल बुकिंग प्रारंभ।
            </p>
          </div>
          <div className="pt-2 border-t border-amber-200/60 dark:border-zinc-700">
            <button className="w-full py-2 bg-brand hover:bg-brand-dark text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors">
              निःशुल्क पंजीकरण करें
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col items-center justify-center my-3 overflow-hidden ${className}`}>
      <span className="text-[9px] uppercase text-zinc-400 dark:text-zinc-500 tracking-wider mb-0.5">
        प्रायोजित
      </span>
      <div className="w-[320px] h-[100px] bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2.5 flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-brand/10 dark:bg-brand/20 flex-shrink-0 flex items-center justify-center text-brand font-bold text-lg">
          📱
        </div>
        <div className="flex-1 text-left">
          <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-tight">
            स्वतंत्र खबर एंड्रॉइड ऐप इंस्टॉल करें
          </p>
          <p className="text-[10px] text-zinc-500 mt-0.5">ब्रेकिंग अलर्ट सीधे अपने फोन पर पाएं</p>
        </div>
      </div>
    </div>
  );
};
