/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Role = 'admin' | 'editor' | 'reporter' | 'media' | 'ad_manager';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: Role;
  isActive: boolean;
  avatar?: string;
  mustChangePassword?: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export type ArticleStatus = 'draft' | 'review' | 'published' | 'archived';

export interface Article {
  id: string;
  titleHi: string;
  slug: string;
  summary: string;
  summaryHi?: string;
  bodyHtml: string;
  contentHi?: string;
  coverImage: string;
  featuredImage?: string;
  coverImageCaption?: string;
  imageCaption?: string;
  coverImageCredit?: string;
  status: ArticleStatus;
  categoryId: string;
  categoryName?: string;
  category?: string;
  districtId?: string;
  districtName?: string;
  state?: 'jharkhand' | 'bihar' | 'national' | 'world';
  authorId: string;
  authorName: string;
  authorRole?: string;
  reporterName?: string;
  publishedAt: string;
  updatedAt?: string;
  scheduledAt?: string;
  isBreaking: boolean;
  isFeatured: boolean;
  isTopStory?: boolean;
  views: number;
  viewCount?: number;
  tags: string[];
  readingTimeMinutes?: number;
}

export interface Category {
  id: string;
  nameHi: string;
  slug: string;
  order: number;
  color?: string;
}

export interface District {
  id: string;
  nameHi: string;
  nameEn: string;
  state: 'jharkhand' | 'bihar';
  order?: number;
}

export interface Video {
  id: string;
  titleHi: string;
  descriptionHi: string;
  youtubeId: string;
  thumbnailUrl: string;
  duration: string;
  publishedAt: string;
  category: string;
  views: number;
  viewCount?: number;
  reporterName?: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  captionHi: string;
  credit?: string;
}

export interface PhotoGallery {
  id: string;
  titleHi: string;
  summaryHi?: string;
  descriptionHi?: string;
  coverImage: string;
  photos: PhotoItem[];
  publishedAt: string;
  views: number;
  viewCount?: number;
  photographerName: string;
  photographer?: string;
}

export interface EPaperPage {
  pageNumber: number;
  imageUrl: string;
  pageTitleHi: string;
}

export interface EPaper {
  id: string;
  editionDate: string;
  date?: string;
  editionNameHi: string;
  editionHi?: string;
  totalPages: number;
  thumbnailUrl: string;
  pdfUrl?: string;
  pages: any[];
}

export interface JobNotice {
  id: string;
  titleHi: string;
  departmentHi: string;
  organization?: string;
  vacancies: number;
  totalPosts?: number;
  qualificationHi: string;
  eligibility?: string;
  lastDate: string;
  deadline?: string;
  applyUrl: string;
  isUrgent?: boolean;
  category: 'job' | 'result' | 'admit_card' | string;
}

export interface Comment {
  id: string;
  articleId: string;
  articleTitle?: string;
  authorName: string;
  userName?: string;
  authorCity?: string;
  content: string;
  commentText?: string;
  status: 'pending' | 'approved' | 'rejected' | 'spam';
  createdAt: string;
  likes: number;
}

export interface PollOption {
  id: string;
  textHi: string;
  votes: number;
}

export interface Poll {
  id: string;
  questionHi: string;
  options: PollOption[];
  totalVotes: number;
  isActive: boolean;
  createdAt: string;
}

export interface Ad {
  id: string;
  title: string;
  slot: 'leaderboard_728x90' | 'mpu_300x250' | 'mobile_320x100' | 'sticky_bottom';
  imageUrl: string;
  targetUrl: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  targetType: 'article' | 'user' | 'media' | 'settings' | 'comment' | 'ad';
  targetId?: string;
  details: string;
  timestamp: string;
}

export interface GrievanceOfficer {
  name: string;
  designation: string;
  email: string;
  phone: string;
  address: string;
  redressalTimeframeDays: number;
}

export interface SiteSettings {
  siteNameHi: string;
  taglineHi: string;
  siteLogoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  officeAddressHi: string;
  tickerItemsHi: string[];
  socialLinks: {
    facebook: string;
    twitter: string;
    whatsapp: string;
    youtube: string;
    telegram: string;
  };
  grievanceOfficer: GrievanceOfficer;
}

export interface CitizenReport {
  id: string;
  titleHi: string;
  contentHi: string;
  reporterName: string;
  mobile: string;
  districtId: string;
  districtName?: string;
  photoUrl?: string;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'converted_to_article' | 'rejected';
}
