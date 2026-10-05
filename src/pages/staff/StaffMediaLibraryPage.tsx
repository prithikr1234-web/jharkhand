/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Upload, Search, Image as ImageIcon, Copy, Check, Trash2, AlertCircle } from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  date: string;
}

const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'm1',
    name: 'ranchi_assembly.jpg',
    url: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80',
    size: '1.2 MB',
    date: '2026-10-05',
  },
  {
    id: 'm2',
    name: 'patna_metro_tunnel.jpg',
    url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    size: '2.4 MB',
    date: '2026-10-05',
  },
  {
    id: 'm3',
    name: 'dhanbad_coal_field.jpg',
    url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    size: '1.8 MB',
    date: '2026-10-04',
  },
  {
    id: 'm4',
    name: 'tata_steel_jamshedpur.jpg',
    url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    size: '3.1 MB',
    date: '2026-10-04',
  },
  {
    id: 'm5',
    name: 'baidyanath_dham_deoghar.jpg',
    url: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80',
    size: '2.8 MB',
    date: '2026-10-03',
  },
  {
    id: 'm6',
    name: 'netarhat_sunset.jpg',
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80',
    size: '1.5 MB',
    date: '2026-10-02',
  },
];

export const StaffMediaLibraryPage: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (up to 5 MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('फ़ाइल का आकार 5 MB से कम होना आवश्यक है।');
      return;
    }

    // Validate type (jpg, png, webp)
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('केवल JPG, PNG अथवा WEBP तस्वीरें ही अनुमत हैं।');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newItem: MediaItem = {
        id: `m-${Date.now()}`,
        name: file.name,
        url: reader.result as string,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        date: new Date().toISOString().split('T')[0],
      };
      setMediaList([newItem, ...mediaList]);
    };
    reader.readAsDataURL(file);
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm('क्या आप इस तस्वीर को हटाना चाहते हैं?')) {
      setMediaList(mediaList.filter((m) => m.id !== id));
    }
  };

  const filtered = mediaList.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="font-headline font-black text-xl text-zinc-900 dark:text-zinc-50">
            मीडिया एवं छायाचित्र गैलरी (Media Library)
          </h1>
          <p className="text-xs text-zinc-500">
            समाचारों के लिए उच्च गुणवत्ता वाली तस्वीरों का केंद्रीय संग्रह
          </p>
        </div>

        {/* Upload Button */}
        <label className="cursor-pointer px-4 py-2 bg-brand hover:bg-brand-dark text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 flex-shrink-0">
          <Upload className="w-4 h-4" />
          <span>नई तस्वीर अपलोड करें (Max 5MB)</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Drag & Drop zone */}
      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-6 text-center bg-white/50 dark:bg-zinc-900/50 hover:border-brand transition-colors">
        <ImageIcon className="w-10 h-10 text-zinc-400 mx-auto mb-2" />
        <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          यहाँ फ़ाइल खींचकर लाएं (Drag & Drop) अथवा ऊपर दिए बटन से चुनें
        </p>
        <span className="text-[11px] text-zinc-400 mt-1 block">
          अनुमत प्रारूप: JPG, PNG, WEBP (अधिकतम 5 MB प्रति फ़ाइल)
        </span>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="तस्वीर का नाम खोजें..."
          className="w-full pl-9 pr-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs"
        />
        <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-2xs group flex flex-col justify-between"
          >
            <div className="aspect-16/10 bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative">
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/70 text-white text-[10px] font-mono rounded">
                {item.size}
              </span>
            </div>

            <div className="p-3">
              <p className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 truncate" title={item.name}>
                {item.name}
              </p>
              <span className="text-[10px] text-zinc-400">{item.date}</span>
            </div>

            <div className="px-3 py-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <button
                onClick={() => copyUrl(item.id, item.url)}
                className="flex items-center gap-1 text-brand font-bold hover:underline"
              >
                {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === item.id ? 'कॉपी हुआ!' : 'URL कॉपी'}</span>
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-zinc-400 hover:text-red-600 p-1"
                title="हटाएं"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
