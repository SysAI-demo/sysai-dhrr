import React, { useState } from 'react';
import {
  Newspaper,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Share2,
  Heart,
  CheckCircle2,
  Video,
  Layers,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { HeroBanner } from './HeroBanner';
import { HERO_SLIDES, NEWS_ARTICLES, UPCOMING_EVENTS, SOCIAL_POSTS } from '../data/mockData';
import { useAccessibility } from '../context/AccessibilityContext';
import { useAdminData } from '../context/AdminDataContext';
import { NewsArticle, DepartmentEvent, SocialPost } from '../types';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectArticle: (article: NewsArticle) => void;
}

type TabType = 'all' | 'news' | 'events' | 'social';

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectArticle }) => {
  const { isRTL } = useAccessibility();
  const { slides: dynamicSlides, news: dynamicNews, events: dynamicEvents, socialPosts: dynamicSocial } = useAdminData();

  const currentSlides = dynamicSlides && dynamicSlides.length > 0 ? dynamicSlides : HERO_SLIDES;
  const currentNews = dynamicNews && dynamicNews.length > 0 ? dynamicNews : NEWS_ARTICLES;
  const currentEvents = dynamicEvents && dynamicEvents.length > 0 ? dynamicEvents : UPCOMING_EVENTS;
  const currentSocial = dynamicSocial && dynamicSocial.length > 0 ? dynamicSocial : SOCIAL_POSTS;

  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const handleToggleRegister = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRegisteredEvents((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const handleToggleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const featuredArticle = currentNews.find((n) => n.featured) || currentNews[0];
  const sideArticles = currentNews.filter((n) => n.id !== featuredArticle?.id).slice(0, 3);

  const getPlatformDetails = (platform: SocialPost['platform']) => {
    switch (platform) {
      case 'x':
        return { name: 'X (Twitter)', icon: '𝕏', tagClass: 'bg-slate-900 text-white' };
      case 'instagram':
        return { name: 'Instagram', icon: '📷', tagClass: 'bg-rose-50 text-rose-700 border border-rose-200' };
      case 'linkedin':
        return { name: 'LinkedIn', icon: 'in', tagClass: 'bg-blue-50 text-blue-700 border border-blue-200' };
      case 'youtube':
        return { name: 'YouTube', icon: '▶', tagClass: 'bg-red-50 text-red-700 border border-red-200' };
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Carousel Banner */}
      <section id="hero-banner">
        <HeroBanner slides={currentSlides} />
      </section>

      {/* 2. Unified, Sleek Department Updates Hub */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header with Elegant Segmented Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/90">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-arabic">
              {isRTL ? 'مركز الأخبار والفعاليات والتواصل' : 'Updates, Events & Media'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-arabic">
              {isRTL
                ? 'متابعة حية وشاملة لأحدث أخبار الدائرة، الأجندة والفعاليات القادمة، والتغطيات الاجتماعية الرسمية'
                : 'A curated overview of official press releases, upcoming calendar events, and social channels.'}
            </p>
          </div>

          {/* Sleek Segmented Pill Controls */}
          <div className="inline-flex items-center p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 self-start md:self-auto shadow-2xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-[#1A3754] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isRTL ? 'الكل' : 'All Updates'}
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'news'
                  ? 'bg-white text-[#1A3754] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isRTL ? 'الأخبار' : 'News'}
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-white text-[#1A3754] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isRTL ? 'الفعاليات' : 'Events'}
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'social'
                  ? 'bg-white text-[#1A3754] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isRTL ? 'التواصل الاجتماعي' : 'Social Media'}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION A: LATEST NEWS (Shown if 'all' or 'news') */}
        {/* ========================================================= */}
        {(activeTab === 'all' || activeTab === 'news') && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#1A3754]" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-arabic">
                  {isRTL ? 'أحدث الأخبار والبيانات الصحفية' : 'Latest News & Statements'}
                </h3>
              </div>
              <button
                onClick={() => onNavigate('media')}
                className="text-xs font-bold text-[#1A3754] hover:text-[#12283e] flex items-center gap-1 cursor-pointer hover:underline"
              >
                <span>{isRTL ? 'المزيد من الأخبار' : 'Explore News Archive'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Asymmetric Elegant 2-Column News Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Featured Main Story (Left - 7 cols) */}
              {featuredArticle && (
                <div
                  onClick={() => onSelectArticle(featuredArticle)}
                  className="lg:col-span-7 group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer hover:border-[#1A3754]/40"
                >
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                    <img
                      src={featuredArticle.imageUrl}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-xl bg-[#1A3754]/90 backdrop-blur-md text-white text-xs font-bold shadow-sm">
                        {featuredArticle.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-xs text-blue-200 mb-1 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredArticle.publishDate}
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold font-arabic leading-snug line-clamp-2 drop-shadow-xs">
                        {isRTL ? featuredArticle.titleAr || featuredArticle.title : featuredArticle.title}
                      </h4>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {isRTL ? featuredArticle.excerptAr || featuredArticle.excerpt : featuredArticle.excerpt}
                    </p>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1A3754]">
                      <span>{isRTL ? 'قراءة البيان كاملاً' : 'Read Full Article'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              )}

              {/* Compact List of Secondary Stories (Right - 5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between divide-y divide-slate-100">
                {sideArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => onSelectArticle(article)}
                    className="py-3.5 first:pt-0 last:pb-0 group cursor-pointer space-y-2 hover:bg-slate-50/80 p-3 rounded-2xl transition-all"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-[#1A3754] bg-[#1A3754]/10 px-2 py-0.5 rounded-md">
                        {article.category}
                      </span>
                      <span className="text-[11px] text-slate-400">{article.publishDate}</span>
                    </div>

                    <h5 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#1A3754] transition-colors font-arabic line-clamp-2 leading-snug">
                      {isRTL ? article.titleAr || article.title : article.title}
                    </h5>

                    <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1">
                      {isRTL ? article.excerptAr || article.excerpt : article.excerpt}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION B & C: EVENTS & SOCIAL MEDIA */}
        {/* ========================================================= */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: UPCOMING EVENTS (7 cols if 'all', or full width if 'events') */}
          {(activeTab === 'all' || activeTab === 'events') && (
            <div className={`${activeTab === 'events' ? 'lg:col-span-12' : 'lg:col-span-7'} space-y-4`}>
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-arabic">
                    {isRTL ? 'الأجندة والفعاليات القادمة' : 'Upcoming Calendar & Events'}
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {currentEvents.length} {isRTL ? 'فعاليات مجدولة' : 'Scheduled Events'}
                </span>
              </div>

              {/* Clean Event List Cards */}
              <div className={`grid ${activeTab === 'events' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
                {currentEvents.slice(0, activeTab === 'events' ? 6 : 3).map((event) => {
                  const isRegistered = registeredEvents.includes(event.id);
                  const [day, month] = event.startDate.split(' ');

                  return (
                    <div
                      key={event.id}
                      className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-[#1A3754]/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Left: Date badge + Info */}
                      <div className="flex items-start gap-3.5 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-[#1A3754] text-white flex flex-col items-center justify-center text-center shrink-0 shadow-2xs">
                          <span className="text-[10px] uppercase font-bold text-blue-200 leading-none">
                            {month || 'SEP'}
                          </span>
                          <span className="text-base font-black leading-tight">{day || '25'}</span>
                        </div>

                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                              {event.category}
                            </span>
                            {event.isVirtual && (
                              <span className="inline-flex items-center gap-1 text-blue-700 text-[10px] font-semibold">
                                <Video className="w-3 h-3 text-blue-600" />
                                <span>{isRTL ? 'عن بُعد' : 'Virtual'}</span>
                              </span>
                            )}
                          </div>

                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-arabic truncate">
                            {isRTL ? event.titleAr || event.title : event.title}
                          </h4>

                          <div className="flex items-center gap-3 text-[11px] text-slate-500 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {event.time}
                            </span>
                            <span className="flex items-center gap-1 truncate">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {event.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Action Button */}
                      <button
                        onClick={(e) => handleToggleRegister(event.id, e)}
                        className={`w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                          isRegistered
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                            : 'bg-[#1A3754] hover:bg-[#12283e] text-white shadow-2xs'
                        }`}
                      >
                        {isRegistered ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            {isRTL ? 'مسجل' : 'Booked'}
                          </span>
                        ) : (
                          <span>{isRTL ? 'تسجيل حضور' : 'Register'}</span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* RIGHT: SOCIAL MEDIA (5 cols if 'all', or full width if 'social') */}
          {(activeTab === 'all' || activeTab === 'social') && (
            <div className={`${activeTab === 'social' ? 'lg:col-span-12' : 'lg:col-span-5'} space-y-4`}>
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-arabic">
                    {isRTL ? 'منصات التواصل الاجتماعي' : 'Social Channels'}
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {isRTL ? 'حسابات موثقة' : 'Verified Feeds'}
                </span>
              </div>

              {/* Clean Compact Social Feed Cards */}
              <div className={`grid ${activeTab === 'social' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} gap-3.5`}>
                {currentSocial.slice(0, activeTab === 'social' ? 4 : 3).map((post) => {
                  const isLiked = likedPosts.includes(post.id);
                  const brand = getPlatformDetails(post.platform);

                  return (
                    <div
                      key={post.id}
                      className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md transition-all space-y-3"
                    >
                      {/* Post Header */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-slate-900 p-0.5 shrink-0 overflow-hidden">
                            <img src={post.avatarUrl} alt={post.author} className="w-full h-full object-contain" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-slate-900 block truncate font-arabic">
                              {post.author}
                            </span>
                            <span className="text-[10px] text-slate-400 block">{post.handle}</span>
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${brand.tagClass}`}>
                          {brand.name}
                        </span>
                      </div>

                      {/* Post Content */}
                      <p className="text-xs text-slate-700 leading-relaxed font-arabic line-clamp-2">
                        {isRTL ? post.contentAr || post.content : post.content}
                      </p>

                      {/* Post Meta & Actions */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => handleToggleLike(post.id, e)}
                            className={`flex items-center gap-1 hover:text-rose-600 transition-colors cursor-pointer ${
                              isLiked ? 'text-rose-600 font-bold' : ''
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-600' : ''}`} />
                            <span>{post.likes}</span>
                          </button>
                          <span className="text-slate-400">{post.postDate}</span>
                        </div>

                        <a
                          href={post.postLink}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-[#1A3754] hover:text-[#12283e] flex items-center gap-0.5"
                        >
                          <span>{isRTL ? 'عرض' : 'View'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </section>
    </div>
  );
};
