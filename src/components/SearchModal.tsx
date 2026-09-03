import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Newspaper, ArrowRight, Layers } from 'lucide-react';
import { NEWS_ARTICLES, QUICK_ACCESS_GROUPS } from '../data/mockData';
import { NewsArticle, QuickAccessItem } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle?: (article: NewsArticle) => void;
  onSelectService?: (groupTitle: string, item: QuickAccessItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onSelectService,
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'news' | 'services'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const { isRTL } = useAccessibility();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Filter News
  const matchedNews = NEWS_ARTICLES.filter((item) =>
    !normalizedQuery
      ? true
      : item.title.toLowerCase().includes(normalizedQuery) ||
        (item.titleAr && item.titleAr.includes(normalizedQuery)) ||
        item.excerpt.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery)
  );

  // Filter Services from Quick Access
  const matchedServices: { groupTitle: string; item: QuickAccessItem }[] = [];
  QUICK_ACCESS_GROUPS.forEach((group) => {
    group.items.forEach((item) => {
      if (
        !normalizedQuery ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.titleAr.includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery)
      ) {
        matchedServices.push({ groupTitle: group.categoryTitle, item });
      }
    });
  });

  const totalResults =
    (activeFilter === 'all' || activeFilter === 'news' ? matchedNews.length : 0) +
    (activeFilter === 'all' || activeFilter === 'services' ? matchedServices.length : 0);

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 sm:pt-16 overflow-y-auto"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === 'search-modal-backdrop') onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600/10 text-teal-700 flex items-center justify-center shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <div className="flex-1 relative">
              <label htmlFor="department-search-input" className="sr-only">
                Search portal
              </label>
              <input
                id="department-search-input"
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isRTL ? 'ابحث في الأخبار والخدمات...' : 'Search news, public services, portals...'}
                className="w-full text-base sm:text-lg text-slate-900 placeholder:text-slate-400 bg-transparent border-0 focus:ring-0 focus:outline-hidden"
              />
            </div>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/60 transition-colors shrink-0"
              aria-label="Close search dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-200/60 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-500 font-medium mr-1 shrink-0">
              {isRTL ? 'تصفية:' : 'Filter:'}
            </span>
            {[
              { id: 'all', label: isRTL ? 'الكل' : 'All Results' },
              { id: 'news', label: `${isRTL ? 'الأخبار' : 'News'} (${matchedNews.length})` },
              { id: 'services', label: `${isRTL ? 'الخدمات' : 'Services'} (${matchedServices.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium ${
                  activeFilter === tab.id
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-slate-100">
          {query && (
            <div className="py-2 text-xs text-slate-500 flex items-center justify-between">
              <span>
                Found <strong>{totalResults}</strong> result{totalResults === 1 ? '' : 's'} for "{query}"
              </span>
            </div>
          )}

          {/* Latest News Matches */}
          {(activeFilter === 'all' || activeFilter === 'news') && matchedNews.length > 0 && (
            <div className="py-4 space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Newspaper className="w-3.5 h-3.5 text-teal-600" />
                <span>{isRTL ? 'الأخبار والبيانات الصحفية' : 'News & Announcements'}</span>
              </div>
              <div className="space-y-2">
                {matchedNews.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => {
                      if (onSelectArticle) onSelectArticle(article);
                      onClose();
                    }}
                    className="p-3 rounded-2xl border border-slate-100 hover:border-teal-300 hover:bg-teal-50/40 transition-all cursor-pointer flex gap-3 items-center group"
                  >
                    <img
                      src={article.imageUrl}
                      alt=""
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
                        <span className="px-1.5 py-0.5 bg-teal-100 text-teal-800 rounded font-medium text-[10px]">
                          {article.category}
                        </span>
                        <span>•</span>
                        <span>{article.publishDate}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-teal-800 truncate">
                        {isRTL ? article.titleAr || article.title : article.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {isRTL ? article.excerptAr || article.excerpt : article.excerpt}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Access Services Matches */}
          {(activeFilter === 'all' || activeFilter === 'services') && matchedServices.length > 0 && (
            <div className="py-4 space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-teal-600" />
                <span>{isRTL ? 'الخدمات والبوابات الذكية' : 'Services & Portals'}</span>
              </div>
              <div className="space-y-2">
                {matchedServices.map(({ groupTitle, item }) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (onSelectService) onSelectService(groupTitle, item);
                      onClose();
                    }}
                    className="p-3 rounded-2xl border border-slate-100 hover:border-teal-300 hover:bg-teal-50/40 transition-all cursor-pointer flex gap-3 items-center group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 font-bold">
                      <Layers className="w-5 h-5 text-teal-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase font-bold text-teal-700">{groupTitle}</div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-teal-800 truncate">
                        {isRTL ? item.titleAr : item.title}
                      </h4>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{item.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {matchedNews.length === 0 && matchedServices.length === 0 && (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-slate-800">
                {query ? 'No matching records found' : 'Search is ready'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                {query
                  ? `No items found matching "${query}".`
                  : 'Type a keyword to find services, announcements, and portal features.'}
              </p>
            </div>
          )}

        </div>

        {/* Footer info & shortcut */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">ESC</kbd> to close
          </div>
          <span className="text-slate-400">Department of Human Resources</span>
        </div>

      </div>
    </div>
  );
};
