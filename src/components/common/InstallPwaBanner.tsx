/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export const InstallPwaBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('jsk_pwa_dismissed');
    if (isDismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // If already installed or on iOS/desktop without prompt, display soft invite after 10s if not dismissed
    const timer = setTimeout(() => {
      if (!isDismissed && !deferredPrompt) {
        setIsVisible(true);
      }
    }, 8000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    } else {
      alert('अपने ब्राउज़र मेन्यू में जाकर "Add to Home Screen" या "ऐप इंस्टॉल करें" चुनें।');
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('jsk_pwa_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-brand text-white text-xs sm:text-sm py-2 px-3 sm:px-4 flex items-center justify-between border-b border-red-800 shadow-sm relative z-50">
      <div className="flex items-center space-x-2.5 overflow-hidden">
        <div className="w-7 h-7 rounded-lg bg-white p-1 flex-shrink-0 flex items-center justify-center shadow">
          <img src="/favicon.svg" alt="JSK" className="w-5 h-5 object-contain" />
        </div>
        <div className="truncate">
          <span className="font-bold">झारखंड स्वतंत्र खबर ऐप</span>
          <span className="hidden md:inline ml-2 text-red-100">तेज़ लोड और बिना रुकावट ताज़ा खबरें पाने के लिए इंस्टॉल करें</span>
        </div>
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        <button
          onClick={handleInstallClick}
          className="bg-white text-brand font-bold text-xs px-3 py-1.5 rounded-full shadow hover:bg-red-50 transition-colors flex items-center space-x-1 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>इंस्टॉल करें</span>
        </button>
        <button
          onClick={handleDismiss}
          aria-label="बंद करें"
          className="p-1 text-white hover:bg-black/20 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
