import { Video, PhotoGallery, EPaper, JobNotice, Poll, Ad, User, SiteSettings } from '../types';

export const INITIAL_VIDEOS: Video[] = [
  {
    id: 'vid-01',
    titleHi: 'ग्राउंड रिपोर्ट: पतरातू घाटी की घुमावदार सड़कों पर पर्यटकों का तांता, क्यों बढ़ रहा है क्रेज?',
    descriptionHi: 'झारखंड के रामगढ़ स्थित मनोरम पतरातू डैम और घाटी से हमारे विशेष संवाददाता की खास ग्राउंड रिपोर्ट।',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    duration: '06:45',
    publishedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    category: 'पर्यटन',
    views: 45200,
  },
  {
    id: 'vid-02',
    titleHi: 'एक्सक्लूसिव: पटना मेट्रो के पहले भूमिगत स्टेशन का अंदरूनी दृश्य, कब से शुरू होगी यात्रा?',
    descriptionHi: 'पटना जंक्शन और गांधी मैदान के बीच बन रहे अंडरग्राउंड टनल में हमारी टीम की विशेष पड़ताल।',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    duration: '08:20',
    publishedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    category: 'विकास',
    views: 68100,
  },
  {
    id: 'vid-03',
    titleHi: 'संथाल परगना का गौरव: मयूराक्षी नदी पर नए बैराज का निर्माण कार्य कैसे बदलेगा किसानों की तकदीर?',
    descriptionHi: 'दुमका से ग्राउंड जीरो रिपोर्ट: जरमुंडी के खेतों तक नहर का पानी पहुंचने से पलायन पर लगेगी रोक।',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    duration: '05:15',
    publishedAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
    category: 'झारखंड',
    views: 29400,
  },
  {
    id: 'vid-04',
    titleHi: 'हॉकी की नर्सरी सिमडेगा: नंगे पांव खेलने वाली बेटियों ने कैसे तय किया भारतीय टीम का सफर?',
    descriptionHi: 'सलीमा टेटे और निक्की प्रधान के गांव से प्रेरणादायक विशेष वृत्तचित्र।',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80',
    duration: '12:30',
    publishedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    category: 'खेल',
    views: 89300,
  },
  {
    id: 'vid-05',
    titleHi: 'पलामू टाइगर रिजर्व की रात: जब कोर एरिया में ट्रैप कैमरे में कैद हुआ बाघिन का परिवार',
    descriptionHi: 'वन विभाग के वरिष्ठ अधिकारी से सीधी बातचीत, जानें कैसे संरक्षित किया जा रहा है जंगल।',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
    duration: '04:50',
    publishedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    category: 'पर्यावरण',
    views: 33700,
  },
  {
    id: 'vid-06',
    titleHi: 'सरायकेला का अद्वितीय छऊ: जानिए कैसे बनता है पारंपरिक मुखौटा और क्या है इसका गहरा इतिहास',
    descriptionHi: 'पद्मश्री गुरुओं के सानिध्य में तैयार होने वाले मुखौटों की संपूर्ण निर्माण कला पर खास डॉक्युमेंट्री।',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    duration: '09:10',
    publishedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    category: 'कला-संस्कृति',
    views: 19800,
  }
];

export const INITIAL_PHOTO_GALLERIES: PhotoGallery[] = [
  {
    id: 'photo-01',
    titleHi: 'तस्वीरों में देखें: नेतरहाट के मैग्नोलिया सनसेट प्वाइंट पर लाल-सुनहरी शाम का जादू',
    summaryHi: 'लातेहार के नेतरहाट में बदलते मौसम के बीच मनोहारी दृश्यों की 6 खास तस्वीरें।',
    coverImage: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    views: 18400,
    photographerName: 'राकेश शर्मा, स्वतंत्र खबर',
    photos: [
      { id: 'p1', url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80', captionHi: 'नेतरहाट की पहाड़ियों पर डूबते सूरज की स्वर्णिम आभा' },
      { id: 'p2', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', captionHi: 'दूर तक फैली शांत पर्वत श्रृंखलाएं और कोहरा' },
      { id: 'p3', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', captionHi: 'पाइन के घने वनों के बीच से गुजरता घुमावदार रास्ता' },
    ]
  },
  {
    id: 'photo-02',
    titleHi: 'बाबा बैद्यनाथ धाम देवघर: मंदिर परिसर में उमड़ा आस्था का महासागर',
    summaryHi: 'द्वादश ज्योतिर्लिंग देवघर में प्रातःकालीन भस्म आरती और जलार्पण के दिव्य दर्शन।',
    coverImage: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 7 * 3600 * 1000).toISOString(),
    views: 24500,
    photographerName: 'संजय तिवारी, देवघर',
    photos: [
      { id: 'p4', url: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80', captionHi: 'पंचशूल और मुख्य मंदिर शिखर पर लहराती लाल ध्वजा' },
      { id: 'p5', url: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=1200&q=80', captionHi: 'शिवगंगा सरोवर में पवित्र स्नान करते श्रद्धालु' },
    ]
  },
  {
    id: 'photo-03',
    titleHi: 'राजगीर ग्लास ब्रिज और वेणुवन: अंतरराष्ट्रीय पर्यटकों के आकर्षण का केंद्र',
    summaryHi: 'नालंदा जिले के राजगीर में प्रकृति सफारी और स्काईवॉक का अद्भुत रोमांच।',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    views: 15300,
    photographerName: 'अरुण सिन्हा, पटना',
    photos: [
      { id: 'p6', url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80', captionHi: 'हरी-भरी पंच पहाड़ियों के बीच बना ग्लास स्काईवॉक' }
    ]
  }
];

export const INITIAL_EPAPERS: EPaper[] = [
  {
    id: 'epaper-ranchi-latest',
    editionDate: '2026-10-05',
    editionNameHi: 'राँची मुख्य संस्करण',
    totalPages: 6,
    thumbnailUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
    pdfUrl: '#',
    pages: [
      { pageNumber: 1, imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80', pageTitleHi: 'पेज 1: मुख्य पृष्ठ (फ्रंट पेज)' },
      { pageNumber: 2, imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80', pageTitleHi: 'पेज 2: राँची नगर एवं आसपास' },
      { pageNumber: 3, imageUrl: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&w=1200&q=80', pageTitleHi: 'पेज 3: झारखंड राज्य एवं प्रशासन' },
      { pageNumber: 4, imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80', pageTitleHi: 'पेज 4: उद्योग व रोजगार' },
      { pageNumber: 5, imageUrl: 'https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=1200&q=80', pageTitleHi: 'पेज 5: खेल जगत' },
      { pageNumber: 6, imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80', pageTitleHi: 'पेज 6: विचार व संपादकीय' },
    ]
  },
  {
    id: 'epaper-patna-latest',
    editionDate: '2026-10-05',
    editionNameHi: 'पटना महानगर संस्करण',
    totalPages: 4,
    thumbnailUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    pdfUrl: '#',
    pages: [
      { pageNumber: 1, imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80', pageTitleHi: 'पेज 1: मुख्य पृष्ठ (पटना)' },
      { pageNumber: 2, imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80', pageTitleHi: 'पेज 2: बिहार हलचल' },
    ]
  }
];

export const INITIAL_JOBS: JobNotice[] = [
  {
    id: 'job-01',
    titleHi: 'झारखंड पुलिस कांस्टेबल भर्ती 2026: 4,919 पदों के लिए ऑनलाइन आवेदन आमंत्रित',
    departmentHi: 'झारखंड कर्मचारी चयन आयोग (JSSC)',
    vacancies: 4919,
    qualificationHi: '10वीं (मैट्रिक) पास',
    lastDate: '2026-10-08',
    applyUrl: 'https://jssc.jharkhand.gov.in',
    isUrgent: true,
    category: 'job'
  },
  {
    id: 'job-02',
    titleHi: 'BPSC 71वीं संयुक्त सिविल सेवा परीक्षा: 1,050 पदों की अधिसूचना जारी',
    departmentHi: 'बिहार लोक सेवा आयोग (BPSC)',
    vacancies: 1050,
    qualificationHi: 'स्नातक (Graduate)',
    lastDate: '2026-10-07',
    applyUrl: 'https://bpsc.bih.nic.in',
    isUrgent: true,
    category: 'job'
  },
  {
    id: 'job-03',
    titleHi: 'JPSC सहायक अभियंता (Civil/Mechanical) भर्ती: 288 पदों हेतु आवेदन',
    departmentHi: 'झारखंड लोक सेवा आयोग (JPSC)',
    vacancies: 288,
    qualificationHi: 'B.E. / B.Tech (इंजीनियरिंग)',
    lastDate: '2026-10-25',
    applyUrl: 'https://jpsc.gov.in',
    isUrgent: false,
    category: 'job'
  },
  {
    id: 'job-04',
    titleHi: 'पूर्व मध्य रेलवे (हाजीपुर) अपरेंटिस भर्ती: 1,832 रिक्तियों के लिए मौका',
    departmentHi: 'भारतीय रेलवे (ECR Hajipur)',
    vacancies: 1832,
    qualificationHi: '10वीं + ITI',
    lastDate: '2026-10-20',
    applyUrl: 'https://ecr.indianrailways.gov.in',
    isUrgent: false,
    category: 'job'
  },
  {
    id: 'job-05',
    titleHi: 'झारखंड प्रारंभिक विद्यालय सहायक आचार्य (शिक्षक भर्ती) कट-ऑफ जारी',
    departmentHi: 'JSSC परीक्षा प्रकोष्ठ',
    vacancies: 26001,
    qualificationHi: 'JTET / CTET उत्तीर्ण',
    lastDate: '2026-10-30',
    applyUrl: 'https://jssc.jharkhand.gov.in',
    isUrgent: false,
    category: 'result'
  }
];

export const INITIAL_POLL: Poll = {
  id: 'poll-today',
  questionHi: 'क्या झारखंड में नई औद्योगिक नीति से स्थानीय युवाओं को रोजगार का वास्तविक लाभ मिल पाएगा?',
  options: [
    { id: 'opt-1', textHi: 'हाँ, 75% स्थानीय आरक्षण से युवाओं को बड़ा लाभ होगा', votes: 1420 },
    { id: 'opt-2', textHi: 'नहीं, जमीनी क्रियान्वयन में समस्याएं आ सकती हैं', votes: 680 },
    { id: 'opt-3', textHi: 'कहा नहीं जा सकता, कुछ महीने इंतजार करना होगा', votes: 230 }
  ],
  totalVotes: 2330,
  isActive: true,
  createdAt: new Date().toISOString()
};

export const INITIAL_ADS: Ad[] = [
  {
    id: 'ad-01',
    title: 'झारखंड पर्यटन पतरातू वैली',
    slot: 'leaderboard_728x90',
    imageUrl: '',
    targetUrl: '#',
    isActive: true,
    startDate: '2026-10-01',
    endDate: '2026-10-31',
    impressions: 48900,
    clicks: 1240
  },
  {
    id: 'ad-02',
    title: 'टाटा स्टील स्किल एकेडमी जमशेदपुर',
    slot: 'mpu_300x250',
    imageUrl: '',
    targetUrl: '#',
    isActive: true,
    startDate: '2026-10-01',
    endDate: '2026-10-31',
    impressions: 32100,
    clicks: 980
  },
  {
    id: 'ad-03',
    title: 'बिहार खादी उत्सव गांधी मैदान',
    slot: 'mobile_320x100',
    imageUrl: '',
    targetUrl: '#',
    isActive: true,
    startDate: '2026-10-01',
    endDate: '2026-10-31',
    impressions: 78500,
    clicks: 2840
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-1',
    name: 'संजय कुमार अग्रवाल',
    email: 'admin@swatantrakhabar.in',
    mobile: '9876543210',
    role: 'admin',
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    lastLoginAt: new Date().toISOString(),
  },
  {
    id: 'usr-ed-1',
    name: 'अनुराधा सहाय',
    email: 'editor@swatantrakhabar.in',
    mobile: '9876543211',
    role: 'editor',
    isActive: true,
    createdAt: '2026-01-15T00:00:00Z',
    lastLoginAt: new Date(Date.now() - 3600 * 1000).toISOString(),
  },
  {
    id: 'usr-rep-1',
    name: 'प्रवीण कुमार वर्मा',
    email: 'praveen.reporter@swatantrakhabar.in',
    mobile: '9876543213',
    role: 'reporter',
    isActive: true,
    createdAt: '2026-02-10T00:00:00Z',
  },
  {
    id: 'usr-rep-2',
    name: 'सुनील झा',
    email: 'sunil.reporter@swatantrakhabar.in',
    mobile: '9876543214',
    role: 'reporter',
    isActive: true,
    createdAt: '2026-02-20T00:00:00Z',
  },
  {
    id: 'usr-rep-3',
    name: 'अशोक महतो',
    email: 'ashok.reporter@swatantrakhabar.in',
    mobile: '9876543215',
    role: 'reporter',
    isActive: true,
    createdAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'usr-media-1',
    name: 'राकेश शर्मा (छायाकार)',
    email: 'media@swatantrakhabar.in',
    mobile: '9876543216',
    role: 'media',
    isActive: true,
    createdAt: '2026-03-15T00:00:00Z',
  },
  {
    id: 'usr-ad-1',
    name: 'मनोज कुमार तिवारी',
    email: 'ads@swatantrakhabar.in',
    mobile: '9876543217',
    role: 'ad_manager',
    isActive: true,
    createdAt: '2026-03-20T00:00:00Z',
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteNameHi: 'झारखंड स्वतंत्र खबर',
  taglineHi: 'सच के साथ, आपके साथ',
  contactEmail: 'contact@swatantrakhabar.in',
  contactPhone: '+91 651 2233445',
  officeAddressHi: 'स्वतंत्र खबर भवन, मेन रोड, कडरु ओवरब्रिज के पास, राँची, झारखंड - 834001',
  tickerItemsHi: [
    'झारखंड कैबिनेट: नई औद्योगिक नीति को मंजूरी, 50,000 नौकरियों का मार्ग प्रशस्त',
    'पटना मेट्रो: पहले कॉरिडोर का सफल ट्रायल रन पूरा, नवंबर में जनता को सौगात संभव',
    'धनबाद: अवैध कोयला खदानों पर टास्क फोर्स की बड़ी छापेमारी, 12 ट्रक जब्त',
    'JSSC CGL: परीक्षा परिणाम की तैयारी अंतिम चरण में, प्रमाण पत्र जांच जल्द',
    'मौसम अलर्ट: राँची, जमशेदपुर और पलामू प्रमंडल में अगले 48 घंटों में हल्की बारिश के आसार'
  ],
  socialLinks: {
    facebook: 'https://facebook.com/jharkhandswatantrakhabar',
    twitter: 'https://twitter.com/jh_swatantra',
    whatsapp: 'https://whatsapp.com/channel/0029Va4xJSKNews',
    youtube: 'https://youtube.com/@jharkhandswatantrakhabar',
    telegram: 'https://t.me/jharkhandswatantrakhabar'
  },
  grievanceOfficer: {
    name: 'श्री रामानंद तिवारी',
    designation: 'शिकायत निवारण अधिकारी एवं वरिष्ठ संपादक',
    email: 'grievance@swatantrakhabar.in',
    phone: '+91 651 2233446',
    address: 'झारखंड स्वतंत्र खबर भवन, प्रेस एनक्लेव, मेन रोड, राँची - 834001',
    redressalTimeframeDays: 15
  }
};
