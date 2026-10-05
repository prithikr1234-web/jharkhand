/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  getPublicArticleById,
  createStaffArticle,
  updateStaffArticle,
  getPublicCategories,
  getPublicDistricts,
} from '../../api';
import { Article, Category, District, ArticleStatus } from '../../api/types';
import {
  Save,
  Send,
  Eye,
  CheckCircle,
  Clock,
  Sparkles,
  Bold,
  Italic,
  Heading2,
  Quote,
  List,
  Link as LinkIcon,
  Image as ImageIcon,
  Flame,
  Star,
  Calendar,
  X,
  ArrowLeft,
} from 'lucide-react';

export const StaffArticleEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isEditMode = Boolean(id && id !== 'new');

  // Form fields
  const [titleHi, setTitleHi] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const [categoryId, setCategoryId] = useState('jharkhand');
  const [districtId, setDistrictId] = useState('ranchi');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80'
  );
  const [coverImageCaption, setCoverImageCaption] = useState('');
  const [coverImageCredit, setCoverImageCredit] = useState('');
  const [tagsInput, setTagsInput] = useState('झारखंड, ताजा खबर');
  const [isBreaking, setIsBreaking] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState<ArticleStatus>('draft');
  const [scheduledAt, setScheduledAt] = useState('');

  // Aux state
  const [categories, setCategories] = useState<Category[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<string>('सभी परिवर्तन सुरक्षित');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load categories, districts and article data if editing
  useEffect(() => {
    getPublicCategories().then(setCategories);
    getPublicDistricts().then(setDistricts);

    if (isEditMode && id) {
      setLoading(true);
      getPublicArticleById(id).then((art) => {
        if (art) {
          setTitleHi(art.titleHi);
          setSlug(art.slug);
          setSummary(art.summary);
          setBodyHtml(art.bodyHtml);
          setCategoryId(art.categoryId);
          setDistrictId(art.districtId || 'ranchi');
          setCoverImage(art.coverImage);
          setCoverImageCaption(art.coverImageCaption || '');
          setCoverImageCredit(art.coverImageCredit || '');
          setTagsInput(art.tags?.join(', ') || '');
          setIsBreaking(art.isBreaking);
          setIsFeatured(art.isFeatured);
          setStatus(art.status);
          setScheduledAt(art.scheduledAt || '');
        }
        setLoading(false);
      });
    }
  }, [id, isEditMode]);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitleHi(val);
    if (!isEditMode) {
      // Basic transliteration / clean slug generator
      const genSlug = val
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(genSlug || `khabar-${Date.now()}`);
    }
  };

  // Word count calculator
  const wordCount = bodyHtml
    .replace(/<[^>]*>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  // Insert Rich-Text Helper Tags
  const insertTag = (startTag: string, endTag = '') => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selectedText = bodyHtml.substring(start, end);
    const replacement = `${startTag}${selectedText}${endTag}`;

    const newContent =
      bodyHtml.substring(0, start) + replacement + bodyHtml.substring(end);
    setBodyHtml(newContent);

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + startTag.length, end + startTag.length);
    }, 50);
  };

  // Core save function
  const handleSave = async (targetStatus?: ArticleStatus) => {
    if (!titleHi.trim()) {
      alert('कृपया शीर्षक दर्ज करें।');
      return;
    }

    setSaving(true);
    setAutoSaveStatus('सहेजा जा रहा है...');

    const chosenCat = categories.find((c) => c.id === categoryId);
    const chosenDist = districts.find((d) => d.id === districtId);
    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const nextStatus = targetStatus || status;

    const payload: Partial<Article> = {
      titleHi,
      slug: slug || `khabar-${Date.now()}`,
      summary: summary || titleHi,
      bodyHtml: bodyHtml.startsWith('<p>') ? bodyHtml : `<p>${bodyHtml}</p>`,
      categoryId,
      categoryName: chosenCat?.nameHi || 'झारखंड',
      districtId,
      districtName: chosenDist?.nameHi || 'राँची',
      state: chosenDist?.state || 'jharkhand',
      coverImage,
      coverImageCaption,
      coverImageCredit,
      tags: parsedTags,
      isBreaking,
      isFeatured,
      status: nextStatus,
      scheduledAt: scheduledAt || undefined,
    };

    try {
      if (isEditMode && id) {
        await updateStaffArticle(id, payload);
      } else {
        const created = await createStaffArticle(payload);
        navigate(`/staff/articles/${created.id}`, { replace: true });
      }
      setStatus(nextStatus);
      setAutoSaveStatus('सेव हो गया (Saved)');
    } catch (err: any) {
      setAutoSaveStatus('त्रुटि!');
      alert(err.message || 'सहेजने में त्रुटि हुई');
    } finally {
      setSaving(false);
    }
  };

  // Autosave every 10 seconds if content has title
  useEffect(() => {
    if (!titleHi.trim() || !isEditMode) return;

    const interval = setInterval(() => {
      setAutoSaveStatus('स्वतः सहेजा जा रहा है...');
      handleSave();
    }, 10000);

    return () => clearInterval(interval);
  }, [titleHi, bodyHtml, summary, isEditMode]);

  // Keyboard shortcut Ctrl+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [titleHi, bodyHtml, summary, status]);

  const canPublish = user?.role === 'admin' || user?.role === 'editor';

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/staff/articles')}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          </button>
          <div>
            <h1 className="font-headline font-black text-xl text-zinc-900 dark:text-zinc-50">
              {isEditMode ? 'समाचार संपादित करें' : 'नया समाचार आलेख लिखें'}
            </h1>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{autoSaveStatus}</span>
              </span>
              <span>•</span>
              <span>Ctrl+S से त्वरित सेव</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Reader Preview button */}
          <button
            onClick={() => setShowPreviewModal(true)}
            className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-800 dark:text-zinc-200 font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
          >
            <Eye className="w-3.5 h-3.5 text-zinc-500" />
            <span>लाइव प्रीव्यू</span>
          </button>

          {/* Draft Save */}
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 text-zinc-800 dark:text-zinc-100 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>ड्राफ्ट सेव</span>
          </button>

          {/* Reporter can submit for review */}
          {user?.role === 'reporter' && (
            <button
              onClick={() => handleSave('review')}
              disabled={saving}
              className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>समीक्षा के लिए भेजें</span>
            </button>
          )}

          {/* Editor/Admin can directly publish */}
          {canPublish && (
            <button
              onClick={() => handleSave('published')}
              disabled={saving}
              className="px-4 py-1.5 bg-brand hover:bg-brand-dark text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>सीधे प्रकाशित करें</span>
            </button>
          )}
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Content & Editor */}
        <div className="lg:col-span-8 space-y-4">
          {/* Hindi Title */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                समाचार का मुख्य शीर्षक (Hindi Headline) *
              </label>
              <input
                type="text"
                value={titleHi}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="उदा. झारखंड कैबिनेट की बड़ी बैठक, स्थानीय युवाओं के लिए नई नियमावली मंजूर..."
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl font-headline font-bold text-base sm:text-lg focus:outline-hidden focus:ring-2 focus:ring-brand text-zinc-900 dark:text-zinc-100"
              />
            </div>

            {/* Editable Slug */}
            <div className="text-xs space-y-1">
              <label className="text-zinc-500 font-semibold">यूआरएल स्लग (Auto-generated Slug):</label>
              <div className="flex items-center gap-1 font-mono text-[11px] bg-zinc-50 dark:bg-zinc-800 p-2 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <span className="text-zinc-400">/news/.../</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 bg-transparent border-0 p-0 text-brand font-bold focus:ring-0"
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                संक्षिप्त सारांश (Intro / Summary Lead)
              </label>
              <textarea
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="2-3 पंक्तियों में खबर का मूल सार, जो सोशल मीडिया और होमपेज कार्ड में दिखेगा..."
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-brand text-zinc-800 dark:text-zinc-200"
              />
            </div>
          </div>

          {/* Rich Text Editor Container */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                समाचार विस्तृत आलेख (Rich Text)
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                शब्द संख्या: <strong>{wordCount}</strong>
              </span>
            </div>

            {/* Editor Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => insertTag('<strong>', '</strong>')}
                className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-700"
                title="बोल्ड (Bold)"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertTag('<em>', '</em>')}
                className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-700"
                title="इटैलिक (Italic)"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertTag('<h3>', '</h3>')}
                className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-700 font-bold"
                title="उप-शीर्षक (H3)"
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertTag('<blockquote>', '</blockquote>')}
                className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-700"
                title="उद्धरण (Quote)"
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')}
                className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-700"
                title="सूची (List)"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const url = prompt('लिंक यूआरएल दर्ज करें:');
                  if (url) insertTag(`<a href="${url}" target="_blank">`, '</a>');
                }}
                className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-700"
                title="लिंक जोड़ें"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const imgUrl = prompt('तस्वीर का वेब यूआरएल दर्ज करें:');
                  if (imgUrl) insertTag(`<img src="${imgUrl}" alt="Photo" class="rounded-xl my-4" />`);
                }}
                className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-700"
                title="तस्वीर जोड़ें"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Editor Textarea */}
            <textarea
              ref={textareaRef}
              rows={14}
              value={bodyHtml}
              onChange={(e) => setBodyHtml(e.target.value)}
              placeholder="समाचार का विस्तृत विवरण यहां लिखें। पैराग्राफ, बिंदु, और प्रत्यक्षदर्शियों के बयान सम्मिलित करें..."
              className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-sm leading-relaxed font-body focus:outline-hidden focus:ring-2 focus:ring-brand text-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>

        {/* Right Column (4 cols): Metadata & Publishing controls */}
        <div className="lg:col-span-4 space-y-4">
          {/* Status Stepper */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="font-headline font-bold text-xs uppercase tracking-wider text-zinc-400">
              प्रकाशन स्थिति (Status Stepper)
            </h3>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span
                className={`px-2.5 py-1 rounded-full ${
                  status === 'draft' ? 'bg-zinc-800 text-white' : 'text-zinc-400'
                }`}
              >
                1. ड्राफ्ट
              </span>
              <span>&rarr;</span>
              <span
                className={`px-2.5 py-1 rounded-full ${
                  status === 'review' ? 'bg-amber-600 text-white' : 'text-zinc-400'
                }`}
              >
                2. समीक्षा
              </span>
              <span>&rarr;</span>
              <span
                className={`px-2.5 py-1 rounded-full ${
                  status === 'published' ? 'bg-emerald-600 text-white' : 'text-zinc-400'
                }`}
              >
                3. प्रकाशित
              </span>
            </div>
          </div>

          {/* Category & District */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="font-headline font-bold text-xs uppercase tracking-wider text-zinc-400">
              विभाग एवं जिला
            </h3>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                विभाग (Category)
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.nameHi}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                संबंधित जिला (District)
              </label>
              <select
                value={districtId}
                onChange={(e) => setDistrictId(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs"
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
                टैग्स (Comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs"
              />
            </div>
          </div>

          {/* Cover Image Upload & Caption */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="font-headline font-bold text-xs uppercase tracking-wider text-zinc-400">
              कवर तस्वीर (Cover Photo)
            </h3>
            <div className="aspect-16/10 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
                छवि यूआरएल (Image URL)
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[11px] text-zinc-500 mb-1">कैप्शन</label>
                <input
                  type="text"
                  value={coverImageCaption}
                  onChange={(e) => setCoverImageCaption(e.target.value)}
                  placeholder="तस्वीर का विवरण"
                  className="w-full px-2 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] text-zinc-500 mb-1">क्रेडिट</label>
                <input
                  type="text"
                  value={coverImageCredit}
                  onChange={(e) => setCoverImageCredit(e.target.value)}
                  placeholder="उदा. पीटीआई / अमित"
                  className="w-full px-2 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          {/* Flags: Breaking & Featured */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="font-headline font-bold text-xs uppercase tracking-wider text-zinc-400">
              विशेष प्राथमिकता
            </h3>

            <label className="flex items-center justify-between p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 cursor-pointer">
              <div className="flex items-center gap-2 text-xs font-bold text-red-600">
                <Flame className="w-4 h-4" />
                <span>ब्रेकिंग न्यूज़ टिकर में दिखाएं</span>
              </div>
              <input
                type="checkbox"
                checked={isBreaking}
                onChange={(e) => setIsBreaking(e.target.checked)}
                className="w-4 h-4 text-brand rounded"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 cursor-pointer">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
                <Star className="w-4 h-4" />
                <span>होमपेज पर खास स्टोरी बनाएं</span>
              </div>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded"
              />
            </label>
          </div>

          {/* Google Search Snippet SEO Preview */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xs space-y-2">
            <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              गूगल सर्च प्रीव्यू (Google SERP Snippet)
            </h4>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-200 dark:border-zinc-700 text-left">
              <span className="text-[11px] text-zinc-500 block truncate">
                https://swatantrakhabar.in/news/{slug}
              </span>
              <h5 className="text-xs font-bold text-blue-600 dark:text-blue-400 line-clamp-1">
                {titleHi || 'शीर्षक यहां दिखेगा...'}
              </h5>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 line-clamp-2 mt-0.5">
                {summary || 'खबर का विवरण गूगल खोज में इस प्रकार प्रदर्शित होगा...'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reader Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-700 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-bold text-brand uppercase tracking-wider">
                पाठक दृश्य (Reader Preview Simulation)
              </span>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <span className="px-2 py-0.5 bg-brand text-white font-bold text-[10px] rounded uppercase">
                {categories.find((c) => c.id === categoryId)?.nameHi || 'झारखंड'}
              </span>
              <h2 className="font-headline font-black text-2xl text-zinc-900 dark:text-zinc-50">
                {titleHi}
              </h2>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg border-l-4 border-brand">
                {summary}
              </p>
              <img src={coverImage} alt="Cover" className="w-full rounded-xl max-h-72 object-cover" />
              <div
                className="article-content text-sm space-y-2 pt-2"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
