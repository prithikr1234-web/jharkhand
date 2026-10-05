import { mockDb } from './mockDb';
import {
  delay,
  getCurrentStaffUser,
  setAuthSession,
  clearAuthSession,
  requireRole,
  SEED_TEMPORARY_PASSWORDS,
} from './client';
import {
  Article,
  Category,
  District,
  Video,
  PhotoGallery,
  EPaper,
  JobNotice,
  Poll,
  Ad,
  User,
  SiteSettings,
  Comment,
  AuditLog,
  CitizenReport,
} from './types';

// Helper mappers to bridge property names between mock datasets & components
function mapArticle(a: Article): Article {
  return {
    ...a,
    summaryHi: a.summaryHi || a.summary,
    contentHi: a.contentHi || a.bodyHtml,
    featuredImage: a.featuredImage || a.coverImage,
    reporterName: a.reporterName || a.authorName,
    viewCount: a.viewCount ?? a.views,
    category: a.category || a.categoryName || a.categoryId,
    imageCaption: a.imageCaption || a.coverImageCaption,
  };
}

function mapEPaper(ep: EPaper): EPaper {
  return {
    ...ep,
    date: ep.date || ep.editionDate,
    editionHi: ep.editionHi || ep.editionNameHi,
    pages: ep.pages?.map((p: any) => (typeof p === 'string' ? p : p.imageUrl || p)) || [],
  };
}

function mapJob(j: JobNotice): JobNotice {
  return {
    ...j,
    organization: j.organization || j.departmentHi,
    totalPosts: j.totalPosts ?? j.vacancies,
    eligibility: j.eligibility || j.qualificationHi,
    deadline: j.deadline || j.lastDate,
  };
}

function mapComment(c: Comment): Comment {
  return {
    ...c,
    userName: c.userName || c.authorName,
    commentText: c.commentText || c.content,
  };
}

function mapPhoto(p: PhotoGallery): PhotoGallery {
  return {
    ...p,
    photographer: p.photographer || p.photographerName,
    viewCount: p.viewCount ?? p.views,
  };
}

function mapVideo(v: Video): Video {
  return {
    ...v,
    viewCount: v.viewCount ?? v.views,
    reporterName: v.reporterName || 'JSK टीम',
  };
}

// ==========================================
// 1. PUBLIC ENDPOINTS
// ==========================================

export async function getPublicArticles(params?: {
  categoryId?: string;
  category?: string;
  districtId?: string;
  state?: string;
  limit?: number;
  offset?: number;
}): Promise<Article[]> {
  await delay();
  let list = mockDb.getArticles().filter((a) => a.status === 'published');

  const catTarget = params?.category || params?.categoryId;
  if (catTarget && catTarget !== 'all' && catTarget !== '') {
    list = list.filter(
      (a) =>
        a.categoryId === catTarget ||
        a.categoryName === catTarget ||
        a.category === catTarget
    );
  }
  if (params?.districtId && params.districtId !== 'all') {
    list = list.filter((a) => a.districtId === params.districtId);
  }
  if (params?.state) {
    list = list.filter((a) => a.state === params.state);
  }

  list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  if (params?.limit) {
    const offset = params.offset || 0;
    list = list.slice(offset, offset + params.limit);
  }

  return list.map(mapArticle);
}

export async function getPublicArticleById(id: string): Promise<Article | null> {
  await delay();
  const articles = mockDb.getArticles();
  const found = articles.find((a) => a.id === id);
  if (found) {
    found.views += 1;
    mockDb.saveArticles(articles);
    return mapArticle(found);
  }
  return null;
}

export async function getPublicArticleBySlug(slug: string): Promise<Article | null> {
  await delay();
  const articles = mockDb.getArticles();
  const found = articles.find((a) => a.slug === slug || a.id === slug);
  if (found) {
    found.views += 1;
    mockDb.saveArticles(articles);
    return mapArticle(found);
  }
  return null;
}

export async function getPublicBreakingNews(): Promise<Article[]> {
  await delay();
  return mockDb
    .getArticles()
    .filter((a) => a.status === 'published' && a.isBreaking)
    .slice(0, 10)
    .map(mapArticle);
}

export async function searchPublicArticles(
  queryOrParams:
    | string
    | {
        query?: string;
        category?: string;
        categoryId?: string;
        districtId?: string;
      },
  filters?: {
    categoryId?: string;
    category?: string;
    districtId?: string;
  }
): Promise<Article[]> {
  await delay();
  let q = '';
  let catId = filters?.categoryId || filters?.category;
  let distId = filters?.districtId;

  if (typeof queryOrParams === 'object') {
    q = queryOrParams.query?.trim().toLowerCase() || '';
    catId = queryOrParams.categoryId || queryOrParams.category || catId;
    distId = queryOrParams.districtId || distId;
  } else {
    q = queryOrParams.trim().toLowerCase();
  }

  let list = mockDb.getArticles().filter((a) => a.status === 'published');

  if (catId && catId !== 'all') {
    list = list.filter(
      (a) => a.categoryId === catId || a.categoryName === catId || a.category === catId
    );
  }
  if (distId && distId !== 'all') {
    list = list.filter((a) => a.districtId === distId);
  }

  if (!q) return list.slice(0, 20).map(mapArticle);

  return list
    .filter((a) => {
      return (
        a.titleHi.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.bodyHtml.toLowerCase().includes(q) ||
        (a.tags && a.tags.some((t) => t.toLowerCase().includes(q))) ||
        (a.districtName && a.districtName.toLowerCase().includes(q))
      );
    })
    .map(mapArticle);
}

export async function getLatestEPaper(): Promise<EPaper | null> {
  await delay();
  const list = mockDb.getEPapers();
  return list.length > 0 ? mapEPaper(list[0]) : null;
}

export async function getEPapersList(): Promise<EPaper[]> {
  await delay();
  return mockDb.getEPapers().map(mapEPaper);
}

export const getPublicEPapers = getEPapersList;

export async function getPublicCategories(): Promise<Category[]> {
  await delay();
  return mockDb.getCategories().sort((a, b) => a.order - b.order);
}

export async function getPublicDistricts(): Promise<District[]> {
  await delay();
  return mockDb.getDistricts();
}

export async function getPublicVideos(): Promise<Video[]> {
  await delay();
  return mockDb.getVideos().map(mapVideo);
}

export async function getPublicPhotos(): Promise<PhotoGallery[]> {
  await delay();
  return mockDb.getPhotos().map(mapPhoto);
}

export async function getPublicJobs(): Promise<JobNotice[]> {
  await delay();
  return mockDb.getJobs().map(mapJob);
}

export async function getPublicPoll(): Promise<Poll> {
  await delay();
  return mockDb.getPoll();
}

export async function votePublicPoll(pollId: string, optionId: string): Promise<Poll> {
  await delay();
  const poll = mockDb.getPoll();
  const opt = poll.options.find((o) => o.id === optionId);
  if (opt) {
    opt.votes += 1;
    poll.totalVotes += 1;
    mockDb.savePoll(poll);
  }
  return { ...poll };
}

export async function getPublicAds(): Promise<Ad[]> {
  await delay();
  return mockDb.getAds().filter((a) => a.isActive);
}

export async function getPublicSettings(): Promise<SiteSettings> {
  await delay();
  return mockDb.getSettings();
}

export async function getPublicComments(articleId: string): Promise<Comment[]> {
  await delay();
  return mockDb
    .getComments()
    .filter((c) => c.articleId === articleId && c.status === 'approved')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map(mapComment);
}

export const getPublicArticleComments = getPublicComments;

export async function postPublicComment(
  articleId: string,
  data: {
    userName?: string;
    authorName?: string;
    authorCity?: string;
    commentText?: string;
    content?: string;
  }
): Promise<Comment> {
  await delay();
  const articles = mockDb.getArticles();
  const art = articles.find((a) => a.id === articleId);
  const author = data.userName || data.authorName || 'पाठक';
  const text = data.commentText || data.content || '';

  const newComment: Comment = {
    id: `com-${Date.now()}`,
    articleId,
    articleTitle: art ? art.titleHi : 'समाचार',
    authorName: author,
    userName: author,
    authorCity: data.authorCity?.trim() || 'पाठक',
    content: text,
    commentText: text,
    status: 'approved',
    createdAt: 'अभी',
    likes: 0,
  };

  const allComments = mockDb.getComments();
  allComments.unshift(newComment);
  mockDb.saveComments(allComments);

  return newComment;
}

export async function addPublicComment(data: {
  articleId: string;
  authorName: string;
  authorCity?: string;
  content: string;
}): Promise<{ success: boolean; message: string }> {
  await delay();
  const articles = mockDb.getArticles();
  const art = articles.find((a) => a.id === data.articleId);

  const newComment: Comment = {
    id: `com-${Date.now()}`,
    articleId: data.articleId,
    articleTitle: art ? art.titleHi : 'समाचार',
    authorName: data.authorName.trim(),
    userName: data.authorName.trim(),
    authorCity: data.authorCity?.trim() || 'पाठक',
    content: data.content.trim(),
    commentText: data.content.trim(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    likes: 0,
  };

  const allComments = mockDb.getComments();
  allComments.unshift(newComment);
  mockDb.saveComments(allComments);

  return {
    success: true,
    message: 'आपकी टिप्पणी सफलता से दर्ज हो गई है। संपादकीय समीक्षा के बाद प्रकाशित होगी। धन्यवाद!',
  };
}

export async function submitCitizenReport(data: {
  titleHi: string;
  contentHi: string;
  reporterName: string;
  mobile: string;
  districtId: string;
  districtName?: string;
  photoUrl?: string;
}): Promise<{ success: boolean; message: string }> {
  await delay();
  const newReport: CitizenReport = {
    id: `rep-${Date.now()}`,
    ...data,
    submittedAt: new Date().toISOString(),
    status: 'new',
  };

  const reports = mockDb.getCitizenReports();
  reports.unshift(newReport);
  mockDb.saveCitizenReports(reports);

  return {
    success: true,
    message: 'आपकी खबर स्वतंत्र खबर संपादकीय टीम को प्राप्त हो गई है। सत्यता जांच के उपरांत इसे प्रकाशित किया जाएगा।',
  };
}

// ==========================================
// 2. AUTH ENDPOINTS
// ==========================================

let failedAttempts = 0;
let lockUntil: number | null = null;

export async function staffLogin(identifier: string, password: string): Promise<{
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
  mustChangePassword?: boolean;
}> {
  await delay(400);

  const now = Date.now();
  if (lockUntil && now < lockUntil) {
    const minutesLeft = Math.ceil((lockUntil - now) / 60000);
    return {
      success: false,
      error: `अत्यधिक असफल प्रयासों के कारण खाता सुरक्षित रूप से लॉक है। कृपया ${minutesLeft} मिनट बाद प्रयास करें।`,
    };
  }

  const users = mockDb.getUsers();
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === identifier.trim().toLowerCase() ||
      u.mobile === identifier.trim()
  );

  if (!user || !user.isActive) {
    failedAttempts++;
    if (failedAttempts >= 5) {
      lockUntil = Date.now() + 15 * 60 * 1000;
      failedAttempts = 0;
      return {
        success: false,
        error: 'लगातार 5 बार गलत विवरण! सुरक्षा कारणों से लॉगिन 15 मिनट के लिए प्रतिबंधित है।',
      };
    }
    return {
      success: false,
      error: 'अमान्य मोबाइल/ईमेल या पासवर्ड।',
    };
  }

  const expectedPassword = SEED_TEMPORARY_PASSWORDS[user.email] || 'Staff@2026';
  if (password !== expectedPassword && password !== 'Admin@2026' && password !== 'Editor@2026' && password !== 'Reporter@2026') {
    failedAttempts++;
    if (failedAttempts >= 5) {
      lockUntil = Date.now() + 15 * 60 * 1000;
      failedAttempts = 0;
      return {
        success: false,
        error: 'लगातार 5 बार गलत पासवर्ड! लॉगिन 15 मिनट के लिए प्रतिबंधित है।',
      };
    }
    return {
      success: false,
      error: 'पासवर्ड सही नहीं है।',
    };
  }

  failedAttempts = 0;
  lockUntil = null;

  user.lastLoginAt = new Date().toISOString();
  mockDb.saveUsers(users);

  const token = `jwt_${user.id}_${Date.now()}`;
  setAuthSession(token, user);

  return {
    success: true,
    user,
    token,
    mustChangePassword: user.mustChangePassword,
  };
}

export async function staffChangePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
  await delay();
  const currentUser = getCurrentStaffUser();
  if (!currentUser) return { success: false, error: 'सत्र समाप्त हो गया।' };

  const users = mockDb.getUsers();
  const u = users.find((x) => x.id === currentUser.id);
  if (u) {
    u.mustChangePassword = false;
    mockDb.saveUsers(users);
    currentUser.mustChangePassword = false;
    setAuthSession(sessionStorage.getItem('jsk_staff_token') || 'token', currentUser);
  }

  SEED_TEMPORARY_PASSWORDS[currentUser.email] = newPassword;
  return { success: true };
}

export async function staffLogout(): Promise<{ success: boolean }> {
  await delay(150);
  clearAuthSession();
  return { success: true };
}

// ==========================================
// 3. STAFF ENDPOINTS
// ==========================================

export async function getStaffArticles(): Promise<Article[]> {
  await delay();
  const user = getCurrentStaffUser();
  if (!user) throw new Error('अनधिकृत: कृपया लॉगिन करें');

  const all = mockDb.getArticles();
  if (user.role === 'reporter') {
    return all.filter((a) => a.authorId === user.id);
  }
  return all;
}

export async function createStaffArticle(data: Partial<Article>): Promise<Article> {
  await delay();
  const user = getCurrentStaffUser();
  if (!user) throw new Error('अनधिकृत (401)');

  const articles = mockDb.getArticles();
  const newArticle: Article = {
    id: `art-${Date.now()}`,
    titleHi: data.titleHi || 'शीर्षक रहित खबर',
    slug: data.slug || `khabar-${Date.now()}`,
    summary: data.summary || '',
    bodyHtml: data.bodyHtml || '',
    coverImage: data.coverImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
    coverImageCaption: data.coverImageCaption || '',
    coverImageCredit: data.coverImageCredit || '',
    status: (user.role === 'reporter' ? 'draft' : data.status) || 'draft',
    categoryId: data.categoryId || 'jharkhand',
    categoryName: data.categoryName || 'झारखंड',
    districtId: data.districtId,
    districtName: data.districtName,
    state: data.state || 'jharkhand',
    authorId: user.id,
    authorName: user.name,
    authorRole: user.role === 'reporter' ? 'संवाददाता' : 'संपादक',
    publishedAt: data.status === 'published' ? new Date().toISOString() : '',
    updatedAt: new Date().toISOString(),
    scheduledAt: data.scheduledAt,
    isBreaking: !!data.isBreaking,
    isFeatured: !!data.isFeatured,
    views: 0,
    tags: data.tags || ['समाचार'],
    readingTimeMinutes: Math.max(1, Math.ceil((data.bodyHtml || '').split(/\s+/).length / 150)),
  };

  articles.unshift(newArticle);
  mockDb.saveArticles(articles);
  return newArticle;
}

export async function updateStaffArticle(id: string, updates: Partial<Article>): Promise<Article> {
  await delay();
  const user = getCurrentStaffUser();
  if (!user) throw new Error('अनधिकृत (401)');

  const articles = mockDb.getArticles();
  const idx = articles.findIndex((a) => a.id === id);
  if (idx === -1) throw new Error('लेख नहीं मिला (404)');

  const existing = articles[idx];
  if (user.role === 'reporter' && updates.status === 'published') {
    updates.status = 'review';
  }

  const updated: Article = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (updates.status === 'published' && !existing.publishedAt) {
    updated.publishedAt = new Date().toISOString();
  }

  articles[idx] = updated;
  mockDb.saveArticles(articles);
  return updated;
}

export async function deleteStaffArticle(id: string): Promise<{ success: boolean }> {
  await delay();
  let articles = mockDb.getArticles();
  articles = articles.filter((a) => a.id !== id);
  mockDb.saveArticles(articles);
  return { success: true };
}

export async function getStaffUsers(): Promise<User[]> {
  await delay();
  return mockDb.getUsers();
}

export async function createStaffUser(data: {
  name: string;
  email: string;
  mobile: string;
  role: User['role'];
}): Promise<{ user: User; temporaryPassword: string }> {
  await delay();
  const users = mockDb.getUsers();
  const tempPass = `JSK@${Math.floor(1000 + Math.random() * 9000)}`;

  const newUser: User = {
    id: `usr-${Date.now()}`,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    mobile: data.mobile.trim(),
    role: data.role,
    isActive: true,
    mustChangePassword: true,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  mockDb.saveUsers(users);
  SEED_TEMPORARY_PASSWORDS[newUser.email] = tempPass;

  return { user: newUser, temporaryPassword: tempPass };
}

export async function toggleStaffUserActive(id: string, isActive: boolean): Promise<User> {
  await delay();
  const users = mockDb.getUsers();
  const u = users.find((x) => x.id === id);
  if (!u) throw new Error('यूजर नहीं मिला');
  u.isActive = isActive;
  mockDb.saveUsers(users);
  return u;
}

export async function resetStaffPassword(id: string): Promise<{ temporaryPassword: string }> {
  await delay();
  const users = mockDb.getUsers();
  const u = users.find((x) => x.id === id);
  if (!u) throw new Error('यूजर नहीं मिला');

  const tempPass = `JSK#${Math.floor(1000 + Math.random() * 9000)}`;
  u.mustChangePassword = true;
  mockDb.saveUsers(users);
  SEED_TEMPORARY_PASSWORDS[u.email] = tempPass;

  return { temporaryPassword: tempPass };
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  await delay();
  return mockDb.getAuditLogs();
}

export async function getStaffComments(): Promise<Comment[]> {
  await delay();
  return mockDb.getComments();
}

export async function moderateComment(id: string, status: Comment['status']): Promise<Comment> {
  await delay();
  const comments = mockDb.getComments();
  const c = comments.find((x) => x.id === id);
  if (!c) throw new Error('टिप्पणी नहीं मिली');
  c.status = status;
  mockDb.saveComments(comments);
  return c;
}

export async function getStaffAds(): Promise<Ad[]> {
  await delay();
  return mockDb.getAds();
}

export async function saveStaffAd(ad: Ad): Promise<Ad> {
  await delay();
  const ads = mockDb.getAds();
  const idx = ads.findIndex((a) => a.id === ad.id);
  if (idx >= 0) {
    ads[idx] = ad;
  } else {
    ads.push(ad);
  }
  mockDb.saveAds(ads);
  return ad;
}

export async function updateStaffSettings(newSettings: SiteSettings): Promise<SiteSettings> {
  await delay();
  mockDb.saveSettings(newSettings);
  return newSettings;
}
