import { Article, Category, District, Video, PhotoGallery, EPaper, JobNotice, Poll, Ad, User, SiteSettings, Comment, AuditLog, CitizenReport } from './types';
import { ALL_DISTRICTS } from './data/districts';
import { CATEGORIES } from './data/categories';
import { INITIAL_ARTICLES } from './data/articles';
import { MORE_ARTICLES } from './data/moreArticles';
import { INITIAL_VIDEOS, INITIAL_PHOTO_GALLERIES, INITIAL_EPAPERS, INITIAL_JOBS, INITIAL_POLL, INITIAL_ADS, INITIAL_USERS, INITIAL_SETTINGS } from './data/multimedia';

const STORAGE_KEYS = {
  ARTICLES: 'jsk_articles_v3',
  CATEGORIES: 'jsk_categories_v3',
  DISTRICTS: 'jsk_districts_v3',
  VIDEOS: 'jsk_videos_v3',
  PHOTOS: 'jsk_photos_v3',
  EPAPERS: 'jsk_epapers_v3',
  JOBS: 'jsk_jobs_v3',
  POLL: 'jsk_poll_v3',
  ADS: 'jsk_ads_v3',
  USERS: 'jsk_users_v3',
  SETTINGS: 'jsk_settings_v3',
  COMMENTS: 'jsk_comments_v3',
  AUDIT: 'jsk_audit_v3',
  REPORTS: 'jsk_reports_v3',
};

function getStored<T>(key: string, fallback: T): T {
  try {
    const val = localStorage.getItem(key);
    if (!val) return fallback;
    return JSON.parse(val) as T;
  } catch (e) {
    return fallback;
  }
}

function setStored<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn(`Storage write error for ${key}:`, e);
  }
}

class MockDatabase {
  private articles: Article[];
  private categories: Category[];
  private districts: District[];
  private videos: Video[];
  private photos: PhotoGallery[];
  private epapers: EPaper[];
  private jobs: JobNotice[];
  private poll: Poll;
  private ads: Ad[];
  private users: User[];
  private settings: SiteSettings;
  private comments: Comment[];
  private auditLogs: AuditLog[];
  private citizenReports: CitizenReport[];

  constructor() {
    const initialCombinedArticles = [...INITIAL_ARTICLES, ...MORE_ARTICLES];
    this.articles = getStored<Article[]>(STORAGE_KEYS.ARTICLES, initialCombinedArticles);
    this.categories = getStored<Category[]>(STORAGE_KEYS.CATEGORIES, CATEGORIES);
    this.districts = getStored<District[]>(STORAGE_KEYS.DISTRICTS, ALL_DISTRICTS);
    this.videos = getStored<Video[]>(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS);
    this.photos = getStored<PhotoGallery[]>(STORAGE_KEYS.PHOTOS, INITIAL_PHOTO_GALLERIES);
    this.epapers = getStored<EPaper[]>(STORAGE_KEYS.EPAPERS, INITIAL_EPAPERS);
    this.jobs = getStored<JobNotice[]>(STORAGE_KEYS.JOBS, INITIAL_JOBS);
    this.poll = getStored<Poll>(STORAGE_KEYS.POLL, INITIAL_POLL);
    this.ads = getStored<Ad[]>(STORAGE_KEYS.ADS, INITIAL_ADS);
    this.users = getStored<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    this.settings = getStored<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    this.comments = getStored<Comment[]>(STORAGE_KEYS.COMMENTS, [
      {
        id: 'c-1',
        articleId: 'art-001',
        articleTitle: 'झारखंड में नई औद्योगिक नीति',
        authorName: 'विकास रंजन',
        authorCity: 'राँची',
        content: 'स्थानीय युवाओं के 75% आरक्षण की शर्त को जमीन पर ईमानदारी से लागू करना जरूरी है, ताकि पलायन थमे।',
        status: 'approved',
        createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
        likes: 14,
      },
      {
        id: 'c-2',
        articleId: 'art-002',
        articleTitle: 'पटना मेट्रो ट्रायल रन',
        authorName: 'रोहित राज',
        authorCity: 'पटना',
        content: 'बहुत ही सराहनीय कदम! पटना के जाम से राहत मिलेगी। छठ पूजा तक चालू हो जाए तो शानदार रहेगा।',
        status: 'approved',
        createdAt: new Date(Date.now() - 7200 * 1000).toISOString(),
        likes: 9,
      }
    ]);
    this.auditLogs = getStored<AuditLog[]>(STORAGE_KEYS.AUDIT, [
      {
        id: 'aud-1',
        userId: 'usr-admin-1',
        userName: 'संजय कुमार अग्रवाल',
        userRole: 'admin',
        action: 'SITE_INITIALIZED',
        targetType: 'settings',
        details: 'झारखंड स्वतंत्र खबर पोर्टल का प्रारंभिक संस्करण स्थापित किया गया',
        timestamp: new Date(Date.now() - 86400 * 1000).toISOString(),
      }
    ]);
    this.citizenReports = getStored<CitizenReport[]>(STORAGE_KEYS.REPORTS, []);
  }

  getArticles() { return [...this.articles]; }
  saveArticles(list: Article[]) {
    this.articles = list;
    setStored(STORAGE_KEYS.ARTICLES, this.articles);
  }

  getCategories() { return [...this.categories]; }
  saveCategories(list: Category[]) {
    this.categories = list;
    setStored(STORAGE_KEYS.CATEGORIES, this.categories);
  }

  getDistricts() { return [...this.districts]; }
  saveDistricts(list: District[]) {
    this.districts = list;
    setStored(STORAGE_KEYS.DISTRICTS, this.districts);
  }

  getVideos() { return [...this.videos]; }
  getPhotos() { return [...this.photos]; }
  getEPapers() { return [...this.epapers]; }
  getJobs() { return [...this.jobs]; }
  getPoll() { return { ...this.poll }; }
  savePoll(p: Poll) {
    this.poll = p;
    setStored(STORAGE_KEYS.POLL, this.poll);
  }

  getAds() { return [...this.ads]; }
  saveAds(list: Ad[]) {
    this.ads = list;
    setStored(STORAGE_KEYS.ADS, this.ads);
  }

  getUsers() { return [...this.users]; }
  saveUsers(list: User[]) {
    this.users = list;
    setStored(STORAGE_KEYS.USERS, this.users);
  }

  getSettings() { return { ...this.settings }; }
  saveSettings(s: SiteSettings) {
    this.settings = s;
    setStored(STORAGE_KEYS.SETTINGS, this.settings);
  }

  getComments() { return [...this.comments]; }
  saveComments(list: Comment[]) {
    this.comments = list;
    setStored(STORAGE_KEYS.COMMENTS, this.comments);
  }

  getAuditLogs() { return [...this.auditLogs]; }
  addAuditLog(entry: Omit<AuditLog, 'id' | 'timestamp'>) {
    const log: AuditLog = {
      ...entry,
      id: `aud-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.unshift(log);
    setStored(STORAGE_KEYS.AUDIT, this.auditLogs);
    return log;
  }

  getCitizenReports() { return [...this.citizenReports]; }
  saveCitizenReports(list: CitizenReport[]) {
    this.citizenReports = list;
    setStored(STORAGE_KEYS.REPORTS, this.citizenReports);
  }
}

export const mockDb = new MockDatabase();
