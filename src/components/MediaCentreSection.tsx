import React, { useState } from 'react';
import {
  Newspaper,
  Calendar,
  Video,
  Image as ImageIcon,
  Search,
  Filter,
  ArrowRight,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  Play,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  ExternalLink,
  Share2,
  CalendarCheck
} from 'lucide-react';
import { NEWS_ARTICLES, ALL_EVENTS, VIDEOS_DATA, PHOTO_GALLERIES_DATA } from '../data/mockData';
import { NewsArticle, DepartmentEvent, VideoItem, PhotoAlbum, GalleryPhoto } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';
import { useAdminData } from '../context/AdminDataContext';

interface MediaCentreSectionProps {
  onSelectArticle: (article: NewsArticle) => void;
}

export const MediaCentreSection: React.FC<MediaCentreSectionProps> = ({ onSelectArticle }) => {
  const { isRTL } = useAccessibility();

  // Active Main Tab
  const [activeMainTab, setActiveMainTab] = useState<'news' | 'events' | 'videos' | 'gallery'>('news');

  // Search & Category Filters
  const [newsSearch, setNewsSearch] = useState('');
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<string>('All');

  // Events Sub-filter (all / upcoming / past)
  const [eventsTimingFilter, setEventsTimingFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [eventsCategoryFilter, setEventsCategoryFilter] = useState<string>('All');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [registeringEvent, setRegisteringEvent] = useState<DepartmentEvent | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Video Player Modal State
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [videoCategoryFilter, setVideoCategoryFilter] = useState<string>('All');

  // Photo Gallery Lightbox State
  const [activeAlbum, setActiveAlbum] = useState<PhotoAlbum | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Tabs Definition
  const mainTabs = [
    {
      id: 'news',
      labelAr: 'آخر الأخبار',
      labelEn: 'Latest News',
      icon: Newspaper,
    },
    {
      id: 'events',
      labelAr: 'الفعاليات (القادمة والسابقة)',
      labelEn: 'Past & Upcoming Events',
      icon: Calendar,
    },
    {
      id: 'videos',
      labelAr: 'مكتبة الفيديو',
      labelEn: 'Videos',
      icon: Video,
    },
    {
      id: 'gallery',
      labelAr: 'معرض الصور',
      labelEn: 'Photo Gallery',
      icon: ImageIcon,
    },
  ];

  // Dynamic data from admin context
  const { news: dynamicNews, events: dynamicEvents } = useAdminData();
  const allNewsArticles = dynamicNews && dynamicNews.length > 0 ? dynamicNews : NEWS_ARTICLES;
  const allEventsList = dynamicEvents && dynamicEvents.length > 0 ? dynamicEvents : ALL_EVENTS;

  // News Filtering
  const newsCategories = ['All', 'Press Release', 'Initiatives', 'Recognition', 'Workforce Bulletin'];
  const filteredNews = allNewsArticles.filter((article) => {
    const matchesCategory = selectedNewsCategory === 'All' || article.category === selectedNewsCategory;
    const titleMatch = (isRTL ? article.titleAr || article.title : article.title)
      .toLowerCase()
      .includes(newsSearch.toLowerCase());
    const excerptMatch = (isRTL ? article.excerptAr || article.excerpt : article.excerpt)
      .toLowerCase()
      .includes(newsSearch.toLowerCase());
    return matchesCategory && (titleMatch || excerptMatch);
  });

  const featuredNews = allNewsArticles.find((a) => a.featured) || allNewsArticles[0];

  // Events Filtering
  const filteredEvents = allEventsList.filter((ev) => {
    const matchesTiming =
      eventsTimingFilter === 'all'
        ? true
        : eventsTimingFilter === 'upcoming'
        ? ev.status === 'upcoming'
        : ev.status === 'past';
    const matchesCat = eventsCategoryFilter === 'All' || ev.category === eventsCategoryFilter;
    return matchesTiming && matchesCat;
  });

  // Videos Filtering
  const videoCategories = ['All', 'Initiatives', 'Tutorial & Guide', 'Conference Coverage', 'Programs'];
  const filteredVideos = VIDEOS_DATA.filter((vid) => {
    return videoCategoryFilter === 'All' || vid.category === videoCategoryFilter;
  });

  // Handle Event Registration
  const handleRegisterEvent = (event: DepartmentEvent) => {
    setRegisteringEvent(event);
    setRegistrationSuccess(false);
  };

  const confirmRegistration = () => {
    if (registeringEvent) {
      setRegisteredEvents((prev) => [...prev, registeringEvent.id]);
      setRegistrationSuccess(true);
      setTimeout(() => {
        setRegisteringEvent(null);
        setRegistrationSuccess(false);
      }, 1800);
    }
  };

  // Lightbox navigation
  const handleOpenAlbum = (album: PhotoAlbum, initialIndex = 0) => {
    setActiveAlbum(album);
    setCurrentPhotoIndex(initialIndex);
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeAlbum) return;
    setCurrentPhotoIndex((prev) => (prev + 1) % activeAlbum.photos.length);
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeAlbum) return;
    setCurrentPhotoIndex((prev) => (prev - 1 + activeAlbum.photos.length) % activeAlbum.photos.length);
  };

  return (
    <section id="media" className="py-8 sm:py-10 max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-20 space-y-8 font-ibm-plex">
      
      {/* Centered Page Header */}
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A3754] tracking-tight font-arabic">
          {isRTL ? 'المركز الإعلامي' : 'Media Centre'}
        </h2>
      </div>

      {/* 4 Interactive Header Navigation Pills (Matching About page style & size) */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {mainTabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeMainTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveMainTab(tab.id as any)}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-xs ${
                isActive
                  ? 'bg-[#1A3754] text-white shadow-md scale-105 ring-2 ring-[#1A3754]/30'
                  : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-[#1A3754] border border-slate-200/90'
              }`}
            >
              <IconComponent
                className={`w-4 h-4 ${isActive ? 'text-blue-200' : 'text-slate-500'}`}
              />
              <span>{isRTL ? tab.labelAr : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 1. LATEST NEWS TAB */}
      {/* ========================================================================= */}
      {activeMainTab === 'news' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Featured Hero Story Card */}
          {featuredNews && (
            <div
              onClick={() => onSelectArticle(featuredNews)}
              className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl hover:border-[#1A3754]/40 transition-all duration-300 overflow-hidden cursor-pointer grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[340px] overflow-hidden bg-slate-900">
                <img
                  src={featuredNews.imageUrl}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                />
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#1A3754] text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    {isRTL ? 'خبر مميز' : 'Featured Story'}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#1A3754] font-bold border border-blue-100">
                      {featuredNews.category}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {featuredNews.publishDate}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {featuredNews.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#1A3754] transition-colors leading-snug font-arabic">
                    {isRTL ? featuredNews.titleAr || featuredNews.title : featuredNews.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-arabic line-clamp-4">
                    {isRTL ? featuredNews.excerptAr || featuredNews.excerpt : featuredNews.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {isRTL ? 'المصدر: المركز الإعلامي' : 'Source: Media Center'}
                  </span>
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A3754] text-white text-xs sm:text-sm font-bold shadow-sm group-hover:bg-[#152e46] transition-colors">
                    <span>{isRTL ? 'قراءة الخبر بالكامل' : 'Read Full Story'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search & Category Filter Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3.5 text-slate-400" />
              <input
                type="text"
                placeholder={isRTL ? 'ابحث في الأخبار والتغطيات...' : 'Search news & releases...'}
                value={newsSearch}
                onChange={(e) => setNewsSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#1A3754]/30 focus:border-[#1A3754] bg-slate-50/50"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {newsCategories.map((cat) => {
                const isActive = selectedNewsCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedNewsCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1A3754] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'All' ? (isRTL ? 'الكل' : 'All') : cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="group bg-white rounded-3xl border border-slate-200/90 hover:border-[#1A3754]/60 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-[#1A3754]/90 backdrop-blur-xs text-white text-[11px] font-bold shadow-xs">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.publishDate}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1A3754] transition-colors line-clamp-2 leading-snug font-arabic">
                      {isRTL ? article.titleAr || article.title : article.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-arabic">
                      {isRTL ? article.excerptAr || article.excerpt : article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#1A3754] font-bold">
                    <span>{isRTL ? 'تفاصيل الخبر' : 'Read Full Article'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PAST AND UPCOMING EVENTS TAB */}
      {/* ========================================================================= */}
      {activeMainTab === 'events' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Sub-navigation Controls: Timing Filter (All / Upcoming / Past) + Category */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Timing Toggle (Upcoming vs Past) */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 w-full md:w-auto">
              <button
                onClick={() => setEventsTimingFilter('all')}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  eventsTimingFilter === 'all'
                    ? 'bg-[#1A3754] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isRTL ? 'جميع الفعاليات' : 'All Events'}
              </button>
              <button
                onClick={() => setEventsTimingFilter('upcoming')}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  eventsTimingFilter === 'upcoming'
                    ? 'bg-[#1A3754] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>{isRTL ? 'الفعاليات القادمة' : 'Upcoming Events'}</span>
              </button>
              <button
                onClick={() => setEventsTimingFilter('past')}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  eventsTimingFilter === 'past'
                    ? 'bg-[#1A3754] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isRTL ? 'الفعاليات السابقة والتغطيات' : 'Past Events'}
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {['All', 'Job Fair', 'Conference', 'Webinar', 'Training', 'Public Forum'].map((cat) => {
                const isActive = eventsCategoryFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setEventsCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'All' ? (isRTL ? 'كافة الفئات' : 'All Types') : cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => {
              const isPast = event.status === 'past';
              const isRegistered = registeredEvents.includes(event.id);

              return (
                <div
                  key={event.id}
                  className={`bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                    isPast ? 'opacity-95' : 'hover:border-[#1A3754]/50'
                  }`}
                >
                  {/* Event Top Banner Image with Status Badge */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Category & Status Badge Overlay */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                        {event.category}
                      </span>
                      {isPast ? (
                        <span className="px-3 py-1 rounded-lg bg-slate-800/90 text-slate-200 text-xs font-bold backdrop-blur-md border border-slate-700">
                          {isRTL ? 'فعالية منتهية' : 'Completed Event'}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-lg bg-emerald-600/90 text-white text-xs font-bold backdrop-blur-md flex items-center gap-1.5 shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                          {isRTL ? 'التسجيل متاح' : 'Upcoming'}
                        </span>
                      )}
                    </div>

                    {/* Date Badge Banner */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-200">
                        <Calendar className="w-4 h-4" />
                        <span>{event.startDate} {event.endDate ? ` - ${event.endDate}` : ''}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug font-arabic">
                        {isRTL ? event.titleAr || event.title : event.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-arabic">
                        {isRTL ? event.descriptionAr || event.description : event.description}
                      </p>

                      {/* Past Event Recap / Attendee Stats */}
                      {isPast && event.recapSummary && (
                        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-bold text-[#1A3754]">
                            <span>{isRTL ? 'ملخص مخرجات الفعالية:' : 'Event Outcomes:'}</span>
                            {event.attendeesCount && (
                              <span className="px-2 py-0.5 rounded-md bg-blue-100 text-[#1A3754] text-[11px]">
                                {event.attendeesCount}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 font-arabic">
                            {isRTL ? event.recapSummaryAr || event.recapSummary : event.recapSummary}
                          </p>
                        </div>
                      )}

                      {/* Event Metadata: Time, Location, Audience */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-500">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:col-span-2">
                          <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{isRTL ? 'الفئة المستهدفة:' : 'Target Audience:'} {event.targetAudience}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      {isPast ? (
                        <button
                          onClick={() => setActiveMainTab('gallery')}
                          className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#1A3754] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ImageIcon className="w-4 h-4 text-slate-500" />
                          <span>{isRTL ? 'مشاهدة ألبوم صور الفعالية' : 'View Event Photo Album'}</span>
                        </button>
                      ) : isRegistered ? (
                        <div className="w-full py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>{isRTL ? 'تم تأكيد تسجيلك في الفعالية' : 'Registered Successfully'}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRegisterEvent(event)}
                          className="w-full py-2.5 rounded-xl bg-[#1A3754] text-white hover:bg-[#152e46] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                        >
                          <CalendarCheck className="w-4 h-4" />
                          <span>{isRTL ? 'التسجيل في الفعالية' : 'Register for Event'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. VIDEOS TAB */}
      {/* ========================================================================= */}
      {activeMainTab === 'videos' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Category Filter Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <Video className="w-4 h-4 text-[#1A3754]" />
              <span>{isRTL ? 'مكتبة المقاطع المرئية والتقارير' : 'Video Library & Official Highlights'}</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {videoCategories.map((cat) => {
                const isActive = videoCategoryFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setVideoCategoryFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1A3754] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'All' ? (isRTL ? 'الكل' : 'All') : cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group bg-white rounded-3xl border border-slate-200/90 hover:border-[#1A3754]/50 shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                {/* Thumbnail with Play Button */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 text-[#1A3754] flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-white transition-all">
                      <Play className="w-6 h-6 fill-[#1A3754] ml-1" />
                    </div>
                  </div>

                  {/* Duration & Category Badges */}
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-xs font-bold border border-white/20">
                    {video.duration}
                  </div>
                  <div className="absolute top-3 left-3 bg-[#1A3754]/90 backdrop-blur-md px-3 py-1 rounded-lg text-white text-[11px] font-bold">
                    {isRTL ? video.categoryAr : video.category}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{video.publishDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.views}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1A3754] transition-colors leading-snug font-arabic">
                      {isRTL ? video.titleAr || video.title : video.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-arabic">
                      {isRTL ? video.descriptionAr || video.description : video.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#1A3754] font-bold">
                    <span>{isRTL ? 'مشاهدة الفيديو' : 'Watch Video'}</span>
                    <Play className="w-3.5 h-3.5 fill-[#1A3754]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. PHOTO GALLERY TAB */}
      {/* ========================================================================= */}
      {activeMainTab === 'gallery' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Albums Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PHOTO_GALLERIES_DATA.map((album) => (
              <div
                key={album.id}
                onClick={() => handleOpenAlbum(album, 0)}
                className="group bg-white rounded-3xl border border-slate-200/90 hover:border-[#1A3754]/50 shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                {/* Cover Image */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Photo Count Badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1.5 border border-white/20">
                    <ImageIcon className="w-3.5 h-3.5 text-blue-200" />
                    <span>{album.photoCount} {isRTL ? 'صورة' : 'Photos'}</span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-bold text-blue-200 block">
                      {isRTL ? album.categoryAr : album.category}
                    </span>
                    <span className="text-xs text-slate-300 block">
                      {album.date}
                    </span>
                  </div>
                </div>

                {/* Album Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#1A3754] transition-colors leading-snug font-arabic line-clamp-2">
                    {isRTL ? album.titleAr || album.title : album.title}
                  </h3>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#1A3754] font-bold">
                    <span>{isRTL ? 'استعراض الألبوم' : 'Browse Album'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIDEO PLAYER MODAL */}
      {/* ========================================================================= */}
      {selectedVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#1A3754] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-200" />
                <h3 className="font-bold text-sm sm:text-base font-arabic truncate max-w-xl">
                  {isRTL ? selectedVideo.titleAr || selectedVideo.title : selectedVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Area */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {/* Simulated / Embedded Video Player */}
              <div className="w-full h-full relative">
                <img
                  src={selectedVideo.thumbnailUrl}
                  alt={selectedVideo.title}
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white space-y-3 p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 text-[#1A3754] flex items-center justify-center shadow-2xl">
                    <Play className="w-8 h-8 fill-[#1A3754] ml-1" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full">
                    {isRTL ? 'جاري تشغيل المقطع المرئي الرسمي' : 'Official Government Video Stream'}
                  </p>
                </div>
              </div>
            </div>

            {/* Video Details & Meta */}
            <div className="p-6 space-y-3 overflow-y-auto">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#1A3754] font-bold">
                    {isRTL ? selectedVideo.categoryAr : selectedVideo.category}
                  </span>
                  <span>{selectedVideo.publishDate}</span>
                  <span>•</span>
                  <span>{selectedVideo.duration}</span>
                </div>
                <span>{selectedVideo.views}</span>
              </div>

              <h4 className="text-base font-bold text-slate-900 font-arabic">
                {isRTL ? selectedVideo.titleAr || selectedVideo.title : selectedVideo.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 font-arabic leading-relaxed">
                {isRTL ? selectedVideo.descriptionAr || selectedVideo.description : selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHOTO GALLERY LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {activeAlbum && activeAlbum.photos.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 select-none"
          onClick={() => setActiveAlbum(null)}
        >
          <div
            className="relative max-w-5xl w-full h-[85vh] flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Lightbox Bar */}
            <div className="flex items-center justify-between text-white p-3 sm:p-4 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="space-y-0.5">
                <h3 className="font-bold text-sm sm:text-base font-arabic">
                  {isRTL ? activeAlbum.titleAr || activeAlbum.title : activeAlbum.title}
                </h3>
                <p className="text-xs text-slate-300">
                  {currentPhotoIndex + 1} / {activeAlbum.photos.length} {isRTL ? 'صورة' : 'photos'} • {activeAlbum.date}
                </p>
              </div>

              <button
                onClick={() => setActiveAlbum(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Center Photo with Left/Right Arrows */}
            <div className="relative flex-1 my-4 flex items-center justify-center overflow-hidden rounded-2xl">
              <img
                src={activeAlbum.photos[currentPhotoIndex].url}
                alt={activeAlbum.photos[currentPhotoIndex].caption}
                className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
              />

              {/* Prev Button */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-xl transition-all cursor-pointer"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-xl transition-all cursor-pointer"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Photo Caption */}
            <div className="p-3 sm:p-4 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 text-center text-white text-xs sm:text-sm font-arabic">
              {isRTL
                ? activeAlbum.photos[currentPhotoIndex].captionAr || activeAlbum.photos[currentPhotoIndex].caption
                : activeAlbum.photos[currentPhotoIndex].caption}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EVENT REGISTRATION DIALOG MODAL */}
      {/* ========================================================================= */}
      {registeringEvent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setRegisteringEvent(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {registrationSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-arabic">
                  {isRTL ? 'تم تسجيل حضورك بنجاح!' : 'Registration Confirmed!'}
                </h3>
                <p className="text-xs text-slate-500 font-arabic">
                  {isRTL
                    ? 'سيتم إرسال بطاقة الدخول وتفاصيل الفعالية إلى بريدك الإلكتروني المسجل.'
                    : 'Confirmation and event pass details have been sent to your registered official email.'}
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-[#1A3754]">
                    <CalendarCheck className="w-5 h-5" />
                    <h3 className="font-bold text-base font-arabic">
                      {isRTL ? 'تأكيد التسجيل في الفعالية' : 'Event Registration'}
                    </h3>
                  </div>
                  <button
                    onClick={() => setRegisteringEvent(null)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                    <h4 className="font-bold text-sm text-slate-900 font-arabic">
                      {isRTL ? registeringEvent.titleAr || registeringEvent.title : registeringEvent.title}
                    </h4>
                    <div className="text-xs text-slate-500 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#1A3754]" />
                        <span>{registeringEvent.startDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#1A3754]" />
                        <span>{registeringEvent.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#1A3754]" />
                        <span>{registeringEvent.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 font-arabic">
                    {isRTL
                      ? 'بالضغط على تأكيد التسجيل، سيتم حجز مقعدك وتضمينك في قائمة الحضور الرسمية.'
                      : 'By confirming registration, your seat will be reserved and logged on the official event attendee roster.'}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setRegisteringEvent(null)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
                  >
                    {isRTL ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    onClick={confirmRegistration}
                    className="flex-1 py-2.5 rounded-xl bg-[#1A3754] text-white text-xs font-bold hover:bg-[#152e46] shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{isRTL ? 'تأكيد التسجيل' : 'Confirm'}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
