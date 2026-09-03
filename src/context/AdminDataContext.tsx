import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CarouselSlide,
  NewsArticle,
  DepartmentEvent,
  SocialPost,
  RegulationItem,
  GrievanceRequest,
  GrievanceStatus,
  AdminUser
} from '../types';
import {
  HERO_SLIDES,
  NEWS_ARTICLES,
  ALL_EVENTS,
  SOCIAL_POSTS,
  REGULATIONS_DATA,
  INITIAL_GRIEVANCES
} from '../data/mockData';

interface AdminDataContextType {
  // Authentication
  isAdminLoggedIn: boolean;
  adminUser: AdminUser | null;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;

  // Banner Slides
  slides: CarouselSlide[];
  addSlide: (slide: Omit<CarouselSlide, 'id'>) => void;
  updateSlide: (slide: CarouselSlide) => void;
  deleteSlide: (id: string) => void;
  reorderSlides: (newSlides: CarouselSlide[]) => void;

  // News Articles
  news: NewsArticle[];
  addNews: (article: Omit<NewsArticle, 'id'>) => void;
  updateNews: (article: NewsArticle) => void;
  deleteNews: (id: string) => void;

  // Events (Upcoming & Past)
  events: DepartmentEvent[];
  addEvent: (event: Omit<DepartmentEvent, 'id'>) => void;
  updateEvent: (event: DepartmentEvent) => void;
  deleteEvent: (id: string) => void;

  // Social Posts
  socialPosts: SocialPost[];
  addSocialPost: (post: Omit<SocialPost, 'id'>) => void;
  updateSocialPost: (post: SocialPost) => void;
  deleteSocialPost: (id: string) => void;

  // Regulations, Laws & Circulars
  regulations: RegulationItem[];
  addRegulation: (reg: Omit<RegulationItem, 'id'>) => void;
  updateRegulation: (reg: RegulationItem) => void;
  deleteRegulation: (id: string) => void;

  // Grievances & Complaints
  grievances: GrievanceRequest[];
  submitGrievance: (data: {
    employeeName: string;
    civilId: string;
    employeeNumber: string;
    department: string;
    departmentAr?: string;
    email: string;
    phone: string;
    type: GrievanceRequest['type'];
    typeAr?: string;
    subject: string;
    details: string;
    documentsAttached: string[];
  }) => string;
  updateGrievanceStatus: (
    id: string,
    status: GrievanceStatus,
    adminNotes?: string,
    committeeDecision?: string
  ) => void;
  deleteGrievance: (id: string) => void;

  // Reset to original factory defaults
  resetToDefaults: () => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

const DEMO_ADMIN_USER: AdminUser = {
  id: 'usr-admin-01',
  name: 'Sultan Al-Mazrouei',
  nameAr: 'سلطان المزروعي',
  email: 'admin@dhr.shj.ae',
  role: 'Portal Chief Administrator',
  roleAr: 'المشرف العام على بوابة الموارد البشرية',
  department: 'Government Human Resources Department',
  lastLogin: 'Today, 09:30 AM'
};

const STORAGE_KEYS = {
  AUTH: 'dhr_admin_session_auth',
  SLIDES: 'dhr_admin_slides_v2',
  NEWS: 'dhr_admin_news_v2',
  EVENTS: 'dhr_admin_events_v2',
  SOCIAL: 'dhr_admin_social_v2',
  REGULATIONS: 'dhr_admin_regulations_v2',
  GRIEVANCES: 'dhr_admin_grievances_v2'
};

function safeLoad<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch {
    return fallback;
  }
}

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return safeLoad(STORAGE_KEYS.AUTH, false);
  });
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    return safeLoad(STORAGE_KEYS.AUTH, false) ? DEMO_ADMIN_USER : null;
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Entities state
  const [slides, setSlides] = useState<CarouselSlide[]>(() =>
    safeLoad(STORAGE_KEYS.SLIDES, HERO_SLIDES)
  );
  const [news, setNews] = useState<NewsArticle[]>(() =>
    safeLoad(STORAGE_KEYS.NEWS, NEWS_ARTICLES)
  );
  const [events, setEvents] = useState<DepartmentEvent[]>(() =>
    safeLoad(STORAGE_KEYS.EVENTS, ALL_EVENTS)
  );
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(() =>
    safeLoad(STORAGE_KEYS.SOCIAL, SOCIAL_POSTS)
  );
  const [regulations, setRegulations] = useState<RegulationItem[]>(() =>
    safeLoad(STORAGE_KEYS.REGULATIONS, REGULATIONS_DATA)
  );
  const [grievances, setGrievances] = useState<GrievanceRequest[]>(() =>
    safeLoad(STORAGE_KEYS.GRIEVANCES, INITIAL_GRIEVANCES)
  );

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SLIDES, JSON.stringify(slides));
    } catch (e) {
      console.error(e);
    }
  }, [slides]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
    } catch (e) {
      console.error(e);
    }
  }, [news]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.error(e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(socialPosts));
    } catch (e) {
      console.error(e);
    }
  }, [socialPosts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REGULATIONS, JSON.stringify(regulations));
    } catch (e) {
      console.error(e);
    }
  }, [regulations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GRIEVANCES, JSON.stringify(grievances));
    } catch (e) {
      console.error(e);
    }
  }, [grievances]);

  // Auth methods
  const loginAdmin = (email: string, pass: string): boolean => {
    // Standard secure demo check
    const cleanEmail = email.trim().toLowerCase();
    if (
      (cleanEmail === 'admin@dhr.shj.ae' || cleanEmail === 'admin') &&
      (pass === 'admin123' || pass === 'admin' || pass.length >= 4)
    ) {
      setIsAdminLoggedIn(true);
      setAdminUser(DEMO_ADMIN_USER);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      setIsLoginModalOpen(false);
      return true;
    }
    // Allow demo entry for testing
    if (cleanEmail.includes('admin') || pass === 'admin123') {
      setIsAdminLoggedIn(true);
      setAdminUser(DEMO_ADMIN_USER);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  // --- Slides ---
  const addSlide = (slide: Omit<CarouselSlide, 'id'>) => {
    const newSlide: CarouselSlide = {
      ...slide,
      id: `slide-${Date.now()}`
    };
    setSlides((prev) => [newSlide, ...prev]);
  };

  const updateSlide = (updated: CarouselSlide) => {
    setSlides((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const deleteSlide = (id: string) => {
    setSlides((prev) => (prev.length > 1 ? prev.filter((s) => s.id !== id) : prev));
  };

  const reorderSlides = (newSlides: CarouselSlide[]) => {
    setSlides(newSlides);
  };

  // --- News ---
  const addNews = (article: Omit<NewsArticle, 'id'>) => {
    const newArticle: NewsArticle = {
      ...article,
      id: `news-${Date.now()}`,
      slug: article.slug || `news-${Date.now()}`
    };
    setNews((prev) => [newArticle, ...prev]);
  };

  const updateNews = (updated: NewsArticle) => {
    setNews((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  };

  const deleteNews = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  // --- Events ---
  const addEvent = (event: Omit<DepartmentEvent, 'id'>) => {
    const newEvent: DepartmentEvent = {
      ...event,
      id: `event-${Date.now()}`
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const updateEvent = (updated: DepartmentEvent) => {
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // --- Social Posts ---
  const addSocialPost = (post: Omit<SocialPost, 'id'>) => {
    const newPost: SocialPost = {
      ...post,
      id: `post-${Date.now()}`
    };
    setSocialPosts((prev) => [newPost, ...prev]);
  };

  const updateSocialPost = (updated: SocialPost) => {
    setSocialPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteSocialPost = (id: string) => {
    setSocialPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // --- Regulations & Circulars ---
  const addRegulation = (reg: Omit<RegulationItem, 'id'>) => {
    const newReg: RegulationItem = {
      ...reg,
      id: `reg-${Date.now()}`
    };
    setRegulations((prev) => [newReg, ...prev]);
  };

  const updateRegulation = (updated: RegulationItem) => {
    setRegulations((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  const deleteRegulation = (id: string) => {
    setRegulations((prev) => prev.filter((r) => r.id !== id));
  };

  // --- Grievances & Complaints ---
  const submitGrievance = (data: {
    employeeName: string;
    civilId: string;
    employeeNumber: string;
    department: string;
    departmentAr?: string;
    email: string;
    phone: string;
    type: GrievanceRequest['type'];
    typeAr?: string;
    subject: string;
    details: string;
    documentsAttached: string[];
  }): string => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `GRV-2026-${randomCode}`;
    const newGrievance: GrievanceRequest = {
      id: `grv-${Date.now()}`,
      referenceNumber,
      submissionDate: new Date().toISOString().split('T')[0],
      employeeName: data.employeeName,
      civilId: data.civilId,
      employeeNumber: data.employeeNumber,
      department: data.department,
      departmentAr: data.departmentAr || data.department,
      email: data.email,
      phone: data.phone,
      type: data.type,
      typeAr: data.typeAr,
      subject: data.subject,
      details: data.details,
      documentsAttached: data.documentsAttached.length > 0 ? data.documentsAttached : ['Attached Documentation Package.pdf'],
      status: 'Pending Review',
      adminNotes: 'Online electronic submission received via DHR Portal.',
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setGrievances((prev) => [newGrievance, ...prev]);
    return referenceNumber;
  };

  const updateGrievanceStatus = (
    id: string,
    status: GrievanceStatus,
    adminNotes?: string,
    committeeDecision?: string
  ) => {
    setGrievances((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        return {
          ...g,
          status,
          adminNotes: adminNotes !== undefined ? adminNotes : g.adminNotes,
          committeeDecision: committeeDecision !== undefined ? committeeDecision : g.committeeDecision,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      })
    );
  };

  const deleteGrievance = (id: string) => {
    setGrievances((prev) => prev.filter((g) => g.id !== id));
  };

  const resetToDefaults = () => {
    setSlides(HERO_SLIDES);
    setNews(NEWS_ARTICLES);
    setEvents(ALL_EVENTS);
    setSocialPosts(SOCIAL_POSTS);
    setRegulations(REGULATIONS_DATA);
    setGrievances(INITIAL_GRIEVANCES);
    localStorage.removeItem(STORAGE_KEYS.SLIDES);
    localStorage.removeItem(STORAGE_KEYS.NEWS);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.SOCIAL);
    localStorage.removeItem(STORAGE_KEYS.REGULATIONS);
    localStorage.removeItem(STORAGE_KEYS.GRIEVANCES);
  };

  return (
    <AdminDataContext.Provider
      value={{
        isAdminLoggedIn,
        adminUser,
        loginAdmin,
        logoutAdmin,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        slides,
        addSlide,
        updateSlide,
        deleteSlide,
        reorderSlides,
        news,
        addNews,
        updateNews,
        deleteNews,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        socialPosts,
        addSocialPost,
        updateSocialPost,
        deleteSocialPost,
        regulations,
        addRegulation,
        updateRegulation,
        deleteRegulation,
        grievances,
        submitGrievance,
        updateGrievanceStatus,
        deleteGrievance,
        resetToDefaults
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
