/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeadMeta } from '../../../components/common/HeadMeta';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <HeadMeta
        title="नियम और शर्तें (Terms of Service) - झारखंड स्वतंत्र खबर"
        description="झारखंड स्वतंत्र खबर पोर्टल के उपयोग की वैधानिक शर्तें एवं आचार संहिता।"
      />

      <div className="pb-4 border-b border-line dark:border-zinc-800">
        <h1 className="font-headline font-black text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50">
          नियम और शर्तें (Terms & Conditions)
        </h1>
        <p className="text-xs text-muted mt-1">अंतिम अद्यतन: 1 अक्टूबर 2026</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 text-sm leading-relaxed space-y-4">
        <p>
          झारखंड स्वतंत्र खबर वेबसाइट और ऐप का उपयोग करने पर आप निम्नलिखित शर्तों से आबद्ध होने की सहमति प्रदान करते हैं:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>वेबसाइट पर प्रकाशित सभी समाचार, लेख, तस्वीरें और वीडियो बौद्धिक संपदा कानून के अंतर्गत सुरक्षित हैं। बिना पूर्व लिखित अनुमति के किसी भी सामग्री की व्यावसायिक प्रतिलिपि प्रतिबंधित है।</li>
          <li>पाठक टिप्पणियों में भड़काऊ, असंसदीय अथवा मानहानिकारक भाषा का प्रयोग वर्जित है। ऐसी टिप्पणियों को हटाने और आवश्यक होने पर विधिक कार्रवाई करने का अधिकार संपादक मंडल के पास सुरक्षित है।</li>
          <li>नागरिक पत्रकारिता के अंतर्गत भेजी गई सामग्री की सत्यता की जिम्मेदारी प्रेषक की होगी।</li>
        </ul>
      </div>
    </div>
  );
};

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <HeadMeta
        title="अस्वीकरण (Disclaimer) - झारखंड स्वतंत्र खबर"
        description="झारखंड स्वतंत्र खबर संपादकीय अस्वीकरण एवं दायित्व मुक्ति विवरण।"
      />

      <div className="pb-4 border-b border-line dark:border-zinc-800">
        <h1 className="font-headline font-black text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50">
          अस्वीकरण (Disclaimer)
        </h1>
        <p className="text-xs text-muted mt-1">अंतिम अद्यतन: 1 अक्टूबर 2026</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 text-sm leading-relaxed space-y-4">
        <p>
          झारखंड स्वतंत्र खबर पर प्रस्तुत सभी समाचार और आलेख निष्पक्षता और तथ्यों की पुष्टि के पश्चात ही प्रकाशित किए जाते हैं। फिर भी, किसी भी तकनीकी या मानवीय त्रुटि के लिए प्रकाशक बिना किसी पूर्व सूचना के संशोधन करने का अधिकार रखता है।
        </p>
        <p>
          संपादकीय पृष्ठ पर प्रकाशित विचार संबंधित लेखकों के निजी विचार हैं। विज्ञापनों में किए गए दावों की सत्यता की जांच पाठक स्वयं अपने विवेक से करें, उसके किसी भी नुकसान के लिए संस्थान उत्तरदायी नहीं होगा।
        </p>
      </div>
    </div>
  );
};
