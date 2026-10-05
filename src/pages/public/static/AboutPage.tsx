/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeadMeta } from '../../../components/common/HeadMeta';
import { Logo } from '../../../components/common/Logo';
import { Award, Compass, ShieldCheck, Users, Mail, MapPin, Phone } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      <HeadMeta
        title="हमारे बारे में - झारखंड स्वतंत्र खबर"
        description="झारखंड स्वतंत्र खबर (JSK) झारखंड और बिहार का प्रमुख डिजिटल दैनिक समाचार पत्र है।"
      />

      <div className="text-center space-y-4 pb-6 border-b border-line dark:border-zinc-800">
        <Logo className="justify-center scale-110" />
        <p className="text-sm sm:text-base text-muted max-w-xl mx-auto">
          "सच के साथ, आपके साथ" — निष्पक्ष, निर्भीक और जनसरोकार की आवाज
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-6">
        <section className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold font-headline text-brand flex items-center gap-2">
            <Compass className="w-6 h-6" /> हमारा उद्देश्य एवं संकल्प
          </h2>
          <p className="text-charcoal dark:text-zinc-300">
            <strong>झारखंड स्वतंत्र खबर</strong> की स्थापना झारखंड और बिहार के 62 जिलों में आम नागरिकों, किसानों, युवाओं, मजदूरों और वंचित वर्गों की वास्तविक समस्याओं को बिना किसी राजनीतिक या कॉर्पोरेट दबाव के सामने लाने के ध्येय से की गई है।
          </p>
          <p className="text-charcoal dark:text-zinc-300">
            हम मानते हैं कि लोकतंत्र की सार्थकता स्वतंत्र और जिम्मेदार पत्रकारिता में ही निहित है। जहां मुख्यधारा का मीडिया अक्सर महानगरों की चकाचौंध में सिमट जाता है, वहीं झारखंड स्वतंत्र खबर राज्य के सुदूर गांवों, पंचायतों और कस्बों से ज़मीनी सच्चाई उजागर करने के लिए प्रतिबद्ध है।
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-xl p-5 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950 text-brand flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold font-headline text-base">सत्यता और निष्पक्षता</h3>
            <p className="text-xs text-muted">प्रत्येक समाचार का दोहरे स्तर पर सत्यापन, ताकि भ्रामक या पक्षपाती सूचना का कोई स्थान न रहे।</p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-xl p-5 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950 text-saffron flex items-center justify-center mx-auto">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold font-headline text-base">जनसरोकार प्रथम</h3>
            <p className="text-xs text-muted">शिक्षा, स्वास्थ्य, रोजगार, विस्थापन, आदिवासी अधिकार और जनहितैषी मुद्दों को प्राथमिकता।</p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-xl p-5 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-950 text-forest flex items-center justify-center mx-auto">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold font-headline text-base">डिजिटल उत्कृष्टता</h3>
            <p className="text-xs text-muted">धीमी 2G/3G नेटवर्क पर भी बिजली जैसी तेज़ लोडिंग, स्वच्छ लेआउट और सहज यूजर अनुभव।</p>
          </div>
        </div>

        <section className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold font-headline text-zinc-900 dark:text-zinc-100">
            संपादकीय नेतृत्व एवं टीम
          </h2>
          <p className="text-charcoal dark:text-zinc-300">
            हमारा संपादकीय दल अनुभवी पत्रकारों, शोधकर्ताओं और स्थानीय संवाददाताओं का एक सशक्त नेटवर्क है, जो राँची, पटना, धनबाद, जमशेदपुर, देवघर, गया और मुजफ्फरपुर सहित सभी जिलों में चौबीसों घंटे सक्रिय रहता है।
          </p>
          <div className="pt-4 border-t border-line dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-bold text-zinc-900 dark:text-zinc-200">प्रधान संपादक:</p>
              <p className="text-muted">अमित कुमार वर्मा (वरिष्ठ पत्रकार)</p>
            </div>
            <div>
              <p className="font-bold text-zinc-900 dark:text-zinc-200">कार्यकारी संपादक:</p>
              <p className="text-muted">प्रियंका सिंह</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
