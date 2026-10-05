/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeadMeta } from '../../../components/common/HeadMeta';
import { getPublicDistricts, submitCitizenReport } from '../../../api';
import { District } from '../../../api/types';
import { Send, Upload, Check, Camera, MapPin, AlertCircle } from 'lucide-react';

export const CitizenReporterPage: React.FC = () => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [districtId, setDistrictId] = useState('ranchi');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    getPublicDistricts().then(setDistricts);
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !name.trim() || !mobile.trim()) return;

    setSubmitting(true);
    try {
      const chosenDist = districts.find((d) => d.id === districtId);
      const res = await submitCitizenReport({
        titleHi: title,
        contentHi: content,
        reporterName: name,
        mobile,
        districtId,
        districtName: chosenDist?.nameHi || 'स्थानीय',
        photoUrl: photoPreview || undefined,
      });

      setSuccessMsg(res.message);
      setTitle('');
      setContent('');
      setName('');
      setMobile('');
      setPhotoPreview(null);
    } catch (err) {
      setSuccessMsg('खबर भेजने में त्रुटि हुई। कृपया दोबारा प्रयास करें।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      <HeadMeta
        title="अपनी खबर भेजें (Citizen Reporter) - झारखंड स्वतंत्र खबर"
        description="अपने मोहल्ले, गांव या शहर की समस्या, भ्रष्टाचार, या सराहनीय कार्य की सूचना सीधे संपादक को भेजें।"
      />

      <div className="pb-4 border-b border-line dark:border-zinc-800">
        <div className="flex items-center gap-2 text-brand mb-1">
          <Camera className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">नागरिक पत्रकारिता</span>
        </div>
        <h1 className="font-headline font-black text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50">
          अपनी खबर भेजें (Citizen Reporter)
        </h1>
        <p className="text-xs text-muted mt-1">
          अपने क्षेत्र की बुनियादी समस्याएं, घटनाएं या प्रेरणादायक कहानियां सीधे हमारे संपादकीय कक्ष तक पहुंचाएं।
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-6 shadow-xs">
        {successMsg ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-headline font-bold text-lg text-zinc-900 dark:text-zinc-100">
              खबर सफलतापूर्वक प्राप्त हुई!
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-md mx-auto leading-relaxed">
              {successMsg}
            </p>
            <button
              onClick={() => setSuccessMsg('')}
              className="mt-4 px-4 py-2 bg-brand text-white font-bold text-xs rounded-lg"
            >
              एक और खबर भेजें
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                खबर का मुख्य शीर्षक *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="उदा. राँची के हरमू रोड पर 2 महीने से सीवर लाइन क्षतिग्रस्त, राहगीर परेशान..."
                className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-brand"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  संबंधित जिला *
                </label>
                <select
                  value={districtId}
                  onChange={(e) => setDistrictId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-brand"
                >
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nameHi} ({d.state === 'jharkhand' ? 'झारखंड' : 'बिहार'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  आपका नाम *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="अपना नाम लिखें"
                  className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  मोबाइल नंबर (सत्यापन हेतु) *
                </label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="10 अंकों का मोबाइल नंबर"
                  className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-brand"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                घटना या समस्या का संपूर्ण विवरण *
              </label>
              <textarea
                rows={5}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="स्थान का सटीक पता, कब से समस्या है, संबंधित अधिकारियों की प्रतिक्रिया इत्यादि विस्तार से लिखें..."
                className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-brand"
              />
            </div>

            {/* Photo Upload Attachment */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                तस्वीर संलग्न करें (वैकल्पिक)
              </label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-4 py-2 border border-dashed border-zinc-400 dark:border-zinc-600 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:border-brand flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800">
                  <Upload className="w-4 h-4 text-brand" />
                  <span>फोटो चुनें</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                {photoPreview && (
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-brand">
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-zinc-850 rounded-xl text-[11px] text-amber-900 dark:text-amber-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
              <span>
                कृपया किसी भी प्रकार की भ्रामक, अश्लील या असत्यापित सूचना प्रेषित न करें। संवेदनशील मामलों में संवाददाता द्वारा फोन पर सत्यापन किया जाएगा।
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-brand hover:bg-brand-dark disabled:bg-zinc-400 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'भेजा जा रहा है...' : 'संपादक को खबर भेजें'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
