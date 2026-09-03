import React, { useState } from 'react';
import { UserCheck, UserSearch, Building2, FileText, ChevronRight, ChevronLeft, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { QUICK_ACCESS_GROUPS, NEWS_ARTICLES } from '../data/mockData';
import { NewsArticle, QuickAccessItem } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';

interface HomeDashboardSectionProps {
  onSelectService: (groupTitle: string, item: QuickAccessItem) => void;
  onSelectArticle: (article: NewsArticle) => void;
}

export const HomeDashboardSection: React.FC<HomeDashboardSectionProps> = ({
  onSelectService,
  onSelectArticle,
}) => {
  const { isRTL } = useAccessibility();
  const [newsSlideIndex, setNewsSlideIndex] = useState(0);

  const maxNewsIndex = Math.max(0, NEWS_ARTICLES.length - 2);

  const handleNextNews = () => {
    setNewsSlideIndex((prev) => Math.min(prev + 1, maxNewsIndex));
  };

  const handlePrevNews = () => {
    setNewsSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const renderGroupIcon = (type: string) => {
    switch (type) {
      case 'employee':
        return (
          <div className="w-11 h-11 rounded-full bg-white/90 shadow-sm border border-slate-200/80 flex items-center justify-center text-teal-700">
            <UserCheck className="w-5 h-5" />
          </div>
        );
      case 'jobseeker':
        return (
          <div className="w-11 h-11 rounded-full bg-white/90 shadow-sm border border-slate-200/80 flex items-center justify-center text-teal-700">
            <UserSearch className="w-5 h-5" />
          </div>
        );
      case 'government':
        return (
          <div className="w-11 h-11 rounded-full bg-white/90 shadow-sm border border-slate-200/80 flex items-center justify-center text-teal-700">
            <Building2 className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="w-11 h-11 rounded-full bg-white/90 shadow-sm border border-slate-200/80 flex items-center justify-center text-teal-700">
            <FileText className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <section id="eservices" className="py-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
        
        {/* LEFT COLUMN: Quick Access (3 Columns of Cards) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
              {isRTL ? 'الوصول السريع' : 'Quick Access'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {QUICK_ACCESS_GROUPS.map((group) => (
              <div
                key={group.id}
                className="group relative bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Iridescent Top Glow Background matching the reference design */}
                <div
                  className="h-28 px-4 pt-5 pb-3 flex flex-col justify-between"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(204, 238, 238, 0.65) 0%, rgba(246, 235, 214, 0.45) 60%, rgba(255, 255, 255, 0) 100%)',
                  }}
                >
                  {/* Circular Icon */}
                  <div>{renderGroupIcon(group.iconType)}</div>

                  {/* Category Title */}
                  <div>
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-wider uppercase leading-tight">
                      {isRTL ? group.categoryTitleAr : group.categoryTitle}
                    </h3>
                  </div>
                </div>

                {/* Service Item Links List */}
                <div className="p-4 pt-2 space-y-2 flex-1 flex flex-col justify-start">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onSelectService(group.categoryTitle, item)}
                      className="w-full text-left py-2 px-2.5 rounded-xl hover:bg-slate-50 text-xs sm:text-[13px] font-medium text-slate-700 hover:text-teal-900 transition-colors flex items-center justify-between group/link"
                    >
                      <span className="truncate">
                        {isRTL ? item.titleAr : item.title}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-teal-700 group-hover/link:translate-x-0.5 transition-transform shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: LATEST NEWS Carousel Cards */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight uppercase">
              {isRTL ? 'آخر الأخبار' : 'LATEST NEWS'}
            </h2>

            {/* Slider Navigation controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevNews}
                disabled={newsSlideIndex === 0}
                className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors shadow-2xs"
                aria-label="Previous news item"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextNews}
                disabled={newsSlideIndex >= maxNewsIndex}
                className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors shadow-2xs"
                aria-label="Next news item"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* News Card Grid / Carousel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {NEWS_ARTICLES.slice(newsSlideIndex, newsSlideIndex + 3).map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="group bg-white rounded-2xl border border-slate-200/90 hover:border-teal-500/70 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Thumbnail Image */}
                <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* News Title & Info */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                  <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-2 leading-snug">
                    {isRTL ? article.titleAr || article.title : article.title}
                  </h3>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{article.publishDate}</span>
                    <span className="font-semibold text-teal-700 flex items-center gap-0.5 group-hover:text-teal-900">
                      {isRTL ? 'اقرأ المزيد' : 'Read'}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Progress / Slider Line at bottom */}
          <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden mt-3">
            <div
              className="bg-teal-600 h-full rounded-full transition-all duration-300"
              style={{
                width: `${((newsSlideIndex + 1) / (maxNewsIndex + 1)) * 100}%`,
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
