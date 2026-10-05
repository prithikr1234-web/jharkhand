/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  startAfter,
  DocumentSnapshot,
} from 'firebase/firestore';
import { db } from './config';
import { Article } from '../../api/types';
import { INITIAL_ARTICLES } from '../../api/data/articles';
import { MORE_ARTICLES } from '../../api/data/moreArticles';

export type ArticleWorkflowStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'IN_REVIEW'
  | 'CHANGES_REQUESTED'
  | 'APPROVED'
  | 'SCHEDULED'
  | 'PUBLISHED'
  | 'UNPUBLISHED'
  | 'ARCHIVED'
  | 'REJECTED';

export interface StaffArticleRecord {
  id: string;
  titleHi: string;
  slug: string;
  subtitle?: string;
  summaryHi: string;
  contentHi: string;
  status: ArticleWorkflowStatus;
  categoryId: string;
  categoryName?: string;
  districtId?: string;
  districtName?: string;
  tags: string[];
  featuredImage?: string;
  coverImageCaption?: string;
  coverImageCredit?: string;
  authorId: string;
  authorName: string;
  authorRole?: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
  isTopStory?: boolean;
  views?: number;
  readingTimeMinutes?: number;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  approvedAt?: string;
  publishedAt?: string;
  scheduledAt?: string;
  publishedBy?: string;
  reviewComment?: string;
  createdBy: string;
}

// Convert Firestore document to Article format
function toArticle(docSnap: any): Article {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    titleHi: data.titleHi || '',
    slug: data.slug || docSnap.id,
    summary: data.summaryHi || data.summary || '',
    summaryHi: data.summaryHi || data.summary || '',
    bodyHtml: data.contentHi || data.bodyHtml || '',
    contentHi: data.contentHi || data.bodyHtml || '',
    coverImage: data.featuredImage || data.coverImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80',
    featuredImage: data.featuredImage || data.coverImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80',
    coverImageCaption: data.coverImageCaption || '',
    status: (data.status === 'PUBLISHED' || data.status === 'published' ? 'published' : 'draft') as any,
    categoryId: data.categoryId || 'jharkhand',
    categoryName: data.categoryName || data.categoryId || 'झारखंड',
    category: data.categoryName || data.categoryId || 'झारखंड',
    districtId: data.districtId || '',
    districtName: data.districtName || '',
    authorId: data.authorId || '',
    authorName: data.authorName || 'JSK संवाददाता',
    reporterName: data.authorName || 'JSK संवाददाता',
    publishedAt: data.publishedAt || 'आज',
    isBreaking: !!data.isBreaking,
    isFeatured: !!data.isFeatured,
    isTopStory: !!data.isTopStory,
    views: data.views || 0,
    viewCount: data.views || 0,
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTimeMinutes: data.readingTimeMinutes || 3,
  };
}

/**
 * Seed initial published articles if Firestore articles collection is completely empty
 */
let hasSeededArticles = false;
async function ensureInitialArticlesSeeded() {
  if (hasSeededArticles) return;
  hasSeededArticles = true;

  try {
    const qSnap = await getDocs(query(collection(db, 'articles'), limit(1)));
    if (!qSnap.empty) return;

    // Seed up to 20 representative articles to ensure public site displays rich newsroom stories
    const seedPool = [...INITIAL_ARTICLES, ...MORE_ARTICLES].slice(0, 20);
    for (const art of seedPool) {
      const docRef = doc(db, 'articles', art.id);
      await setDoc(docRef, {
        titleHi: art.titleHi,
        slug: art.slug,
        summaryHi: art.summary,
        contentHi: art.bodyHtml,
        status: 'PUBLISHED',
        categoryId: art.categoryId,
        categoryName: art.categoryName,
        districtId: art.districtId || '',
        districtName: art.districtName || '',
        tags: art.tags || [],
        featuredImage: art.coverImage,
        coverImageCaption: art.coverImageCaption || '',
        authorId: art.authorId || 'admin-01',
        authorName: art.authorName || 'संपादकीय डेस्क',
        isBreaking: !!art.isBreaking,
        isFeatured: !!art.isFeatured,
        views: art.views || 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: art.publishedAt || new Date().toISOString(),
        createdBy: 'admin-01',
      });
    }
  } catch (err) {
    console.warn('Initial seeding note (rules or connection):', err);
  }
}

/**
 * Fetch published articles for public site
 */
export async function fetchPublishedArticles(filters?: {
  categoryId?: string;
  category?: string;
  districtId?: string;
  limitCount?: number;
}): Promise<Article[]> {
  await ensureInitialArticlesSeeded();

  try {
    let q = query(
      collection(db, 'articles'),
      where('status', 'in', ['PUBLISHED', 'published']),
      limit(filters?.limitCount || 40)
    );

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      let results = snapshot.docs.map(toArticle);

      const catTarget = filters?.category || filters?.categoryId;
      if (catTarget && catTarget !== 'all') {
        results = results.filter(
          (a) =>
            a.categoryId === catTarget ||
            a.categoryName === catTarget ||
            a.category === catTarget
        );
      }
      if (filters?.districtId && filters.districtId !== 'all') {
        results = results.filter((a) => a.districtId === filters.districtId);
      }
      return results;
    }
  } catch (err) {
    console.error('Error fetching articles from Firestore, fallback to local dataset:', err);
  }

  // Graceful fallback to initial articles
  let fallback = [...INITIAL_ARTICLES, ...MORE_ARTICLES];
  if (filters?.category && filters.category !== 'all') {
    fallback = fallback.filter(
      (a) => a.categoryId === filters.category || a.categoryName === filters.category
    );
  }
  if (filters?.districtId && filters.districtId !== 'all') {
    fallback = fallback.filter((a) => a.districtId === filters.districtId);
  }
  return fallback.slice(0, filters?.limitCount || 30);
}

/**
 * Fetch single article by ID
 */
export async function fetchArticleById(id: string): Promise<Article | null> {
  try {
    const docSnap = await getDoc(doc(db, 'articles', id));
    if (docSnap.exists()) {
      return toArticle(docSnap);
    }
  } catch (err) {
    console.error('fetchArticleById error:', err);
  }

  // Fallback check
  const fallback = [...INITIAL_ARTICLES, ...MORE_ARTICLES].find((a) => a.id === id);
  return fallback || null;
}

/**
 * Staff article operations
 */
export async function saveStaffArticleDraft(
  articleData: Partial<StaffArticleRecord> & { authorId: string; authorName: string }
): Promise<string> {
  const articleId = articleData.id || `art-${Date.now()}`;
  const docRef = doc(db, 'articles', articleId);

  const payload = {
    ...articleData,
    id: articleId,
    status: (articleData.status || 'DRAFT') as ArticleWorkflowStatus,
    updatedAt: new Date().toISOString(),
    createdAt: articleData.createdAt || new Date().toISOString(),
    createdBy: articleData.createdBy || articleData.authorId,
  };

  await setDoc(docRef, payload, { merge: true });
  return articleId;
}

export async function submitArticleForReview(articleId: string): Promise<void> {
  const docRef = doc(db, 'articles', articleId);
  await updateDoc(docRef, {
    status: 'SUBMITTED',
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export async function requestArticleChanges(articleId: string, comment: string): Promise<void> {
  const docRef = doc(db, 'articles', articleId);
  await updateDoc(docRef, {
    status: 'CHANGES_REQUESTED',
    reviewComment: comment,
    updatedAt: new Date().toISOString(),
  });
}

export async function approveArticle(articleId: string): Promise<void> {
  const docRef = doc(db, 'articles', articleId);
  await updateDoc(docRef, {
    status: 'APPROVED',
    approvedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export async function publishArticleNow(articleId: string, publisherName: string): Promise<void> {
  const docRef = doc(db, 'articles', articleId);
  await updateDoc(docRef, {
    status: 'PUBLISHED',
    publishedAt: new Date().toISOString(),
    publishedBy: publisherName,
    updatedAt: new Date().toISOString(),
  });
}

export async function scheduleArticlePublish(articleId: string, scheduledDateStr: string): Promise<void> {
  const docRef = doc(db, 'articles', articleId);
  await updateDoc(docRef, {
    status: 'SCHEDULED',
    scheduledAt: scheduledDateStr,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteStaffArticle(articleId: string): Promise<void> {
  await deleteDoc(doc(db, 'articles', articleId));
}

export async function fetchStaffArticles(authorId?: string, isReviewQueue?: boolean): Promise<StaffArticleRecord[]> {
  try {
    let q = collection(db, 'articles');
    const snapshot = await getDocs(q);

    let list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as StaffArticleRecord));

    if (isReviewQueue) {
      list = list.filter((a) =>
        ['SUBMITTED', 'IN_REVIEW', 'CHANGES_REQUESTED', 'APPROVED'].includes(a.status)
      );
    } else if (authorId) {
      list = list.filter((a) => a.authorId === authorId || a.createdBy === authorId);
    }

    list.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
    return list;
  } catch (err) {
    console.error('fetchStaffArticles error:', err);
    return [];
  }
}
