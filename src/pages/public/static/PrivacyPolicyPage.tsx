/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeadMeta } from '../../../components/common/HeadMeta';
import { Shield } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <HeadMeta
        title="गोपनीयता नीति (Privacy Policy) - झारखंड स्वतंत्र खबर"
        description="झारखंड स्वतंत्र खबर पाठकों के डेटा संरक्षण एवं गोपनीयता मानकों की विस्तृत नीति।"
      />

      <div className="pb-4 border-b border-line dark:border-zinc-800">
        <h1 className="font-headline font-black text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50">
          गोपनीयता नीति (Privacy Policy)
        </h1>
        <p className="text-xs text-muted mt-1">अंतिम अद्यतन: 1 अक्टूबर 2026</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 text-sm leading-relaxed space-y-4">
        <p>
          झारखंड स्वतंत्र खबर ("हम", "हमारी वेबसाइट") अपने पाठकों की गोपनीयता का पूर्ण सम्मान करती है। यह नीति स्पष्ट करती है कि हमारी डिजिटल सेवाओं के उपयोग के दौरान आपके व्यक्तिगत डेटा का संकलन, उपयोग एवं संरक्षण किस प्रकार किया जाता है।
        </p>

        <h3 className="font-headline font-bold text-base text-zinc-900 dark:text-zinc-100 mt-4">
          1. सूचनाओं का संकलन
        </h3>
        <p>
          हम उपयोगकर्ता द्वारा स्वेच्छा से प्रदान की गई जानकारियों (जैसे टिप्पणी करते समय नाम, ईमेल अथवा नागरिक पत्रकारिता फॉर्म में फोन नंबर) को ही सुरक्षित रखते हैं। किसी भी पाठक की निजी जानकारी तीसरे पक्ष को व्यावसायिक लाभ हेतु बेची या साझा नहीं की जाती।
        </p>

        <h3 className="font-headline font-bold text-base text-zinc-900 dark:text-zinc-100 mt-4">
          2. कुकीज़ एवं लोकल स्टोरेज
        </h3>
        <p>
          पाठकों के अनुभव को सुगम बनाने हेतु हम आपके ब्राउज़र के लोकल स्टोरेज का उपयोग करते हैं, जिससे आपका पसंदीदा जिला, डार्क मोड सेटिंग एवं फ़ॉन्ट आकार सहेजा जा सके।
        </p>

        <h3 className="font-headline font-bold text-base text-zinc-900 dark:text-zinc-100 mt-4">
          3. डेटा सुरक्षा
        </h3>
        <p>
          हमारे सर्वर आधुनिक एन्क्रिप्शन मानकों से सुरक्षित हैं। किसी भी संशय अथवा डेटा संबंधी शिकायत हेतु हमारे शिकायत निवारण अधिकारी से <strong>grievance@swatantrakhabar.in</strong> पर संपर्क किया जा सकता है।
        </p>
      </div>
    </div>
  );
};
