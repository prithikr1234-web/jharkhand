/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeadMeta } from '../../../components/common/HeadMeta';
import { ShieldAlert, Mail, Phone, MapPin, Clock, FileCheck } from 'lucide-react';

export const GrievanceOfficerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <HeadMeta
        title="शिकायत निवारण अधिकारी (Grievance Officer) - झारखंड स्वतंत्र खबर"
        description="सूचना प्रौद्योगिकी नियम 2021 के तहत झारखंड स्वतंत्र खबर का शिकायत निवारण तंत्र।"
      />

      <div className="pb-4 border-b border-line dark:border-zinc-800">
        <div className="flex items-center gap-2 text-brand mb-1">
          <ShieldAlert className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">सूचना प्रौद्योगिकी नियम 2021 के अंतर्गत</span>
        </div>
        <h1 className="font-headline font-black text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50">
          शिकायत निवारण तंत्र (Grievance Redressal)
        </h1>
        <p className="text-xs text-muted mt-1">
          सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश और डिजिटल मीडिया आचार संहिता) नियम, 2021 के नियम 11 के अनुपालन में।
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <section className="space-y-4">
          <h2 className="text-lg font-bold font-headline text-brand">शिकायत निवारण अधिकारी का विवरण</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-zinc-50 dark:bg-zinc-850 p-4 rounded-xl border border-line dark:border-zinc-800">
            <div>
              <p className="text-muted">अधिकारी का नाम:</p>
              <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100">श्री राजेश कुमार सहाय</p>
            </div>
            <div>
              <p className="text-muted">पदनाम:</p>
              <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100">नोडल शिकायत अधिकारी (Grievance Officer)</p>
            </div>
            <div>
              <p className="text-muted">आधिकारिक ईमेल:</p>
              <p className="font-bold text-brand">grievance@swatantrakhabar.in</p>
            </div>
            <div>
              <p className="text-muted">दूरभाष:</p>
              <p className="font-bold text-zinc-900 dark:text-zinc-100">+91 651 2912349</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-muted">डाक का पता:</p>
              <p className="font-medium text-zinc-800 dark:text-zinc-200">
                झारखंड स्वतंत्र खबर, मीडिया टॉवर, चतुर्थ तल, मेन रोड, राँची (झारखंड) - 834001
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3 text-xs sm:text-sm leading-relaxed text-charcoal dark:text-zinc-300">
          <h2 className="text-base font-bold font-headline text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-forest" /> शिकायत दर्ज करने और निवारण की प्रक्रिया
          </h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>शिकायत प्रारूप:</strong> शिकायतकर्ता को संबंधित समाचार/सामग्री का लिंक (URL), प्रकाशन की तिथि, आपत्तिजनक अंश और शिकायत का स्पष्ट कानूनी व तथ्यात्मक आधार ईमेल द्वारा प्रेषित करना होगा।
            </li>
            <li>
              <strong>प्राप्ति सूचना (Acknowledgement):</strong> शिकायत प्राप्त होने के <strong>24 घंटे</strong> के भीतर शिकायतकर्ता को एक संदर्भ संख्या (Ticket ID) के साथ पावती भेजी जाएगी।
            </li>
            <li>
              <strong>निस्तारण समय-सीमा:</strong> सक्षम संपादकीय व कानूनी समीक्षा के उपरांत <strong>15 दिनों</strong> के भीतर शिकायत का अंतिम निस्तारण किया जाएगा।
            </li>
          </ol>
        </section>

        <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-900 dark:text-red-200 flex items-start gap-3">
          <FileCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-brand" />
          <span>
            यदि आप हमारे निवारण से संतुष्ट नहीं हैं, तो डिजिटल मीडिया प्रकाशक संघ (DMPO) या प्रेस काउंसिल ऑफ इंडिया के स्व-नियामक निकाय (Self-Regulatory Body Level II) में अपील कर सकते हैं।
          </span>
        </div>
      </div>
    </div>
  );
};
