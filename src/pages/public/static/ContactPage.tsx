/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeadMeta } from '../../../components/common/HeadMeta';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', mobile: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      <HeadMeta
        title="संपर्क करें - झारखंड स्वतंत्र खबर"
        description="झारखंड स्वतंत्र खबर से संपर्क करें। संपादकीय कार्यालय, विज्ञापन और पाठक प्रतिक्रिया।"
      />

      <div className="text-center space-y-2 pb-6 border-b border-line dark:border-zinc-800">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-brand">संपर्क करें</h1>
        <p className="text-xs sm:text-sm text-muted">
          किसी भी समाचार सुझाव, विज्ञापन पूछताछ या तकनीकी समस्या के लिए हमारी टीम सदैव तत्पर है।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4 md:col-span-1">
          <div className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-3 text-brand">
              <MapPin className="w-5 h-5 flex-shrink-0" />
              <h3 className="font-bold font-headline text-sm text-zinc-900 dark:text-zinc-100">मुख्य कार्यालय</h3>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              झारखंड स्वतंत्र खबर प्राइवेट लिमिटेड<br />
              चौथी मंजिल, मीडिया टॉवर, मेन रोड,<br />
              राँची, झारखंड - 834001
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-3 text-brand">
              <Phone className="w-5 h-5 flex-shrink-0" />
              <h3 className="font-bold font-headline text-sm text-zinc-900 dark:text-zinc-100">दूरभाष / व्हाट्सएप</h3>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              संपादकीय: +91 651 2912345<br />
              व्हाट्सएप हेल्पलाइन: +91 94311 00000<br />
              विज्ञापन विभाग: +91 98350 11111
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-3 text-brand">
              <Mail className="w-5 h-5 flex-shrink-0" />
              <h3 className="font-bold font-headline text-sm text-zinc-900 dark:text-zinc-100">ईमेल</h3>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              समाचार: editor@swatantrakhabar.in<br />
              विज्ञापन: ads@swatantrakhabar.in<br />
              सामान्य: contact@swatantrakhabar.in
            </p>
          </div>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-bold font-headline text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand" /> संदेश भेजें
          </h2>

          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle className="w-12 h-12 text-forest mx-auto" />
              <h3 className="font-bold text-lg">आपका संदेश प्राप्त हो गया है!</h3>
              <p className="text-xs text-muted">हमारी टीम यथाशीघ्र आपसे संपर्क करेगी। धन्यवाद।</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-brand text-white font-bold text-xs rounded-lg"
              >
                अन्य संदेश लिखें
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">पूरा नाम *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-brand"
                    placeholder="आपका नाम"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">ईमेल पता *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-brand"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">मोबाइल नंबर</label>
                  <input
                    type="tel"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-brand"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">विषय *</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-brand"
                  >
                    <option value="">विषय चुनें...</option>
                    <option value="editorial">संपादकीय / समाचार सुधार</option>
                    <option value="ad">विज्ञापन व प्रायोजन</option>
                    <option value="grievance">शिकायत निवारण</option>
                    <option value="feedback">सुझाव एवं प्रतिक्रिया</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">संदेश *</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-brand"
                  placeholder="अपना संदेश यहाँ लिखें..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-brand hover:bg-brand-dark text-white font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>संदेश भेजें</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
