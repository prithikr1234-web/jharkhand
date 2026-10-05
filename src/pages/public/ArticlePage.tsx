/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getPublicArticleById,
  getPublicArticles,
  getPublicArticleComments,
  postPublicComment,
} from '../../api';
import { Article, Comment } from '../../api/types';
import { HeadMeta } from '../../components/common/HeadMeta';
import { AdSlot } from '../../components/common/AdSlot';
import { useTheme } from '../../context/ThemeContext';
import {
  Clock,
  User,
  Share2,
  Bookmark,
  Printer,
  ChevronRight,
  MessageSquare,
  ThumbsUp,
  MapPin,
  Check,
  Send,
  Eye,
  Type,
} from 'lucide-react';

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string; slug?: string }>();
  const { fontSize, setFontSize } = useTheme();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    setLoading(true);

    async function fetchArticleData() {
      try {
        const found = await getPublicArticleById(id!);
        if (isMounted && found) {
          setArticle(found);

          const [allArts, comms] = await Promise.all([
            getPublicArticles({ category: found.category, limit: 6 }),
            getPublicArticleComments(found.id),
          ]);

          if (isMounted) {
            setRelatedArticles(allArts.filter((a) => a.id !== found.id).slice(0, 4));
            setComments(comms);
          }
        }
      } catch (err) {
        console.error('Failed to load article:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchArticleData();
    window.scrollTo(0, 0);

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.titleHi,
          text: article.summaryHi,
          url: window.location.href,
        });
      } catch (err) {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article || !newCommentName.trim() || !newCommentText.trim()) return;

    setCommentSubmitting(true);
    try {
      const added = await postPublicComment(article.id, {
        userName: newCommentName,
        commentText: newCommentText,
      });
      setComments([added, ...comments]);
      setNewCommentText('');
    } catch (err) {
      console.error(err);
    } finally {
      setCommentSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 space-y-6 animate-pulse">
        <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-12 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-80 w-full bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-4/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold font-headline">समाचार नहीं मिला</h2>
        <p className="text-xs text-muted">यह खबर हटा दी गई है या इसका लिंक गलत हो सकता है।</p>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-brand text-white font-bold text-xs rounded-lg"
        >
          मुख्य पृष्ठ पर लौटें
        </Link>
      </div>
    );
  }

  const paragraphs = article.contentHi ? article.contentHi.split('\n\n') : [article.summaryHi];

  // Font size class mapping
  const fontClass =
    fontSize === 'sm' || (fontSize as string) === 'small'
      ? 'text-sm'
      : fontSize === 'lg' || (fontSize as string) === 'large'
      ? 'text-lg sm:text-xl'
      : 'text-base sm:text-lg';

  return (
    <article className="max-w-4xl mx-auto py-4 space-y-6">
      <HeadMeta article={article} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-muted pb-2 border-b border-line dark:border-zinc-800">
        <Link to="/" className="hover:text-brand">होम</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/${article.category}`} className="hover:text-brand font-medium">
          {article.category}
        </Link>
        {article.districtName && (
          <>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand font-medium">{article.districtName}</span>
          </>
        )}
      </nav>

      {/* Headline & Meta Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-brand text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
            {article.category}
          </span>
          {article.districtName && (
            <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
              <MapPin className="w-3 h-3 text-brand" />
              {article.districtName}
            </span>
          )}
        </div>

        <h1 className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-zinc-900 dark:text-zinc-50 leading-[1.3]">
          {article.titleHi}
        </h1>

        <p className="text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed border-l-3 border-brand pl-3">
          {article.summaryHi}
        </p>

        {/* Reporter info, Time, Controls */}
        <div className="pt-3 border-y border-line dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
              <User className="w-4 h-4 text-brand" />
              {article.reporterName}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.publishedAt}
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {article.viewCount?.toLocaleString('en-IN')} बार पढ़ा गया
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Size Selector */}
            <div className="flex items-center border border-line dark:border-zinc-700 rounded-lg p-0.5 bg-zinc-50 dark:bg-zinc-800">
              <button
                onClick={() => setFontSize('sm')}
                title="छोटा फॉन्ट"
                className={`px-1.5 py-0.5 text-xs font-bold rounded cursor-pointer ${
                  fontSize === 'sm' || (fontSize as string) === 'small' ? 'bg-brand text-white' : 'text-zinc-600 dark:text-zinc-300'
                }`}
              >
                A−
              </button>
              <button
                onClick={() => setFontSize('md')}
                title="सामान्य फॉन्ट"
                className={`px-1.5 py-0.5 text-xs font-bold rounded cursor-pointer ${
                  fontSize === 'md' || (fontSize as string) === 'medium' ? 'bg-brand text-white' : 'text-zinc-600 dark:text-zinc-300'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                title="बड़ा फॉन्ट"
                className={`px-1.5 py-0.5 text-xs font-bold rounded cursor-pointer ${
                  fontSize === 'lg' || (fontSize as string) === 'large' ? 'bg-brand text-white' : 'text-zinc-600 dark:text-zinc-300'
                }`}
              >
                A+
              </button>
            </div>

            <button
              onClick={handleShare}
              className="p-1.5 bg-zinc-100 dark:bg-zinc-800 hover:text-brand rounded-lg transition-colors cursor-pointer"
              title="शेयर करें"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.print()}
              className="p-1.5 bg-zinc-100 dark:bg-zinc-800 hover:text-brand rounded-lg transition-colors cursor-pointer"
              title="प्रिंट करें"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image with Caption */}
      {article.featuredImage && (
        <figure className="space-y-2">
          <div className="relative aspect-16/9 sm:aspect-16/10 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-line dark:border-zinc-800 shadow-xs">
            <img
              src={article.featuredImage}
              alt={article.titleHi}
              className="w-full h-full object-cover"
            />
          </div>
          {article.imageCaption && (
            <figcaption className="text-xs text-muted text-center italic">
              {article.imageCaption}
            </figcaption>
          )}
        </figure>
      )}

      {/* Article Body Content */}
      <div className={`prose dark:prose-invert max-w-none text-charcoal dark:text-zinc-200 leading-[1.8] space-y-5 font-sans ${fontClass}`}>
        {paragraphs.map((p, index) => (
          <p key={index} className="text-justify">
            {p}
          </p>
        ))}
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="pt-4 border-t border-line dark:border-zinc-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-muted">टैग:</span>
          {article.tags.map((tag) => (
            <Link
              key={tag}
              to={`/search?q=${encodeURIComponent(tag)}`}
              className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-brand hover:text-white px-2.5 py-1 rounded-full font-medium transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Share Bar Sticky on Mobile / Bottom */}
      <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-xl flex items-center justify-between flex-wrap gap-3">
        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
          इस महत्वपूर्ण खबर को अपने मित्रों के साथ शेयर करें:
        </span>
        <div className="flex items-center gap-2">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `${article.titleHi} - झारखंड स्वतंत्र खबर: ${window.location.href}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <span>व्हाट्सएप</span>
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <span>फेसबुक</span>
          </a>
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 text-zinc-800 dark:text-zinc-100 text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-forest" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'कॉपी हो गया' : 'लिंक कॉपी'}</span>
          </button>
        </div>
      </div>

      {/* Ad in Content */}
      <AdSlot slot="leaderboard_728x90" className="hidden md:flex justify-center my-6" />

      {/* Comments Section */}
      <section className="bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-line dark:border-zinc-800">
          <MessageSquare className="w-5 h-5 text-brand" />
          <h3 className="font-headline font-bold text-lg text-zinc-900 dark:text-zinc-50">
            पाठक टिप्पणी एवं प्रतिक्रिया ({comments.length})
          </h3>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              placeholder="आपका नाम *"
              value={newCommentName}
              onChange={(e) => setNewCommentName(e.target.value)}
              className="px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-line dark:border-zinc-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-brand"
            />
          </div>
          <textarea
            required
            rows={3}
            placeholder="इस समाचार पर अपनी सुविचारित राय लिखें..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-line dark:border-zinc-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-brand"
          />
          <button
            type="submit"
            disabled={commentSubmitting}
            className="px-4 py-2 bg-brand hover:bg-brand-dark disabled:bg-zinc-400 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{commentSubmitting ? 'प्रक्रिया में...' : 'टिप्पणी भेजें'}</span>
          </button>
        </form>

        {/* Existing Comments */}
        <div className="divide-y divide-line/60 dark:divide-zinc-800/80 space-y-3 pt-2">
          {comments.length === 0 ? (
            <p className="text-xs text-muted text-center py-4">
              अभी कोई टिप्पणी नहीं है। सबसे पहले अपनी राय साझा करें!
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="pt-3 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    {comment.userName}
                  </span>
                  <span className="text-[10px] text-muted">{comment.createdAt}</span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {comment.commentText}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Related Stories */}
      {relatedArticles.length > 0 && (
        <section className="space-y-4 pt-6">
          <div className="flex items-center gap-2 pb-2 border-b-2 border-brand">
            <h3 className="font-headline font-bold text-lg text-zinc-900 dark:text-zinc-50">
              संबंधित अन्य खबरें
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedArticles.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.id}/${item.slug}`}
                className="group block bg-white dark:bg-zinc-900 border border-line dark:border-zinc-800 rounded-xl overflow-hidden p-3 shadow-2xs hover:border-brand transition-all"
              >
                <div className="aspect-16/10 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-2">
                  <img
                    src={item.featuredImage}
                    alt={item.titleHi}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-headline font-bold text-xs text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug group-hover:text-brand transition-colors">
                  {item.titleHi}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
