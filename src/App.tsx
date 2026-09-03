import React, { useState, useEffect } from 'react';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AdminDataProvider, useAdminData } from './context/AdminDataContext';
import { OfficialGovBanner } from './components/OfficialGovBanner';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { AboutSection } from './components/AboutSection';
import { EServicesSection } from './components/EServicesSection';
import { RegulationsSection } from './components/RegulationsSection';
import { InitiativesSection } from './components/InitiativesSection';
import { MediaCentreSection } from './components/MediaCentreSection';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ArticleModal } from './components/ArticleModal';
import { ServiceModal } from './components/ServiceModal';
import { VirtualAssistant } from './components/VirtualAssistant';
import { NewsArticle, QuickAccessItem } from './types';
import { ShieldCheck, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAccessibility } from './context/AccessibilityContext';

function AppContent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedServiceGroup, setSelectedServiceGroup] = useState<string | null>(null);
  const [selectedServiceItem, setSelectedServiceItem] = useState<QuickAccessItem | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('home');

  const { isAdminLoggedIn, openLoginModal } = useAdminData();
  const { isRTL } = useAccessibility();

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages = ['home', 'about', 'eservices', 'regulations', 'initiatives', 'media', 'admin'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
        if (hash === 'admin' && !isAdminLoggedIn) {
          openLoginModal();
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdminLoggedIn, openLoginModal]);

  const navigateToPage = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global keyboard shortcuts (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectService = (groupTitle: string, item: QuickAccessItem) => {
    setSelectedServiceGroup(groupTitle);
    setSelectedServiceItem(item);
  };

  const handleCloseServiceModal = () => {
    setSelectedServiceGroup(null);
    setSelectedServiceItem(null);
  };

  return (
    <div className="min-h-screen flex flex-col relative text-slate-900 selection:bg-teal-700 selection:text-white">
      {/* Fixed Static Site-Wide Background Image */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/3.png')",
          backgroundAttachment: 'fixed',
        }}
        aria-hidden="true"
      />

      {/* Relative content wrapper over fixed background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Government Official Security & Accessibility Bar */}
        <OfficialGovBanner />

        {/* Primary Navigation Bar */}
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          currentPage={currentPage}
          onNavigate={navigateToPage}
          onOpenAdminLogin={openLoginModal}
        />

        {/* Dedicated Page View Routing */}
        <main id="main-content" className="flex-1">
          {currentPage === 'home' && (
            <HomePage
              onNavigate={navigateToPage}
              onSelectArticle={(article) => setSelectedArticle(article)}
            />
          )}

          {currentPage === 'about' && <AboutSection />}

          {currentPage === 'eservices' && <EServicesSection />}

          {currentPage === 'regulations' && <RegulationsSection />}

          {currentPage === 'initiatives' && <InitiativesSection />}

          {currentPage === 'media' && (
            <MediaCentreSection
              onSelectArticle={(article) => setSelectedArticle(article)}
            />
          )}

          {currentPage === 'admin' && (
            isAdminLoggedIn ? (
              <AdminDashboard onNavigate={navigateToPage} />
            ) : (
              <div className="max-w-xl mx-auto px-4 py-20 text-center font-arabic animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#1A3754]/10 text-[#1A3754] flex items-center justify-center mx-auto">
                    <Lock className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      {isRTL ? 'بوابة إدارة الموقع ومحتوى البوابة' : 'Portal CMS & Administrator Gateway'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {isRTL
                        ? 'هذا القسم مخصص للمشرفين المعتمدين لإدارة الأخبار، الفعاليات، صور البانر، اللوائح، وصندوق التظلمات والشكاوى.'
                        : 'Restricted area for authorized government administrators to manage news, events, hero slides, circulars, and grievance tickets.'}
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={openLoginModal}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1A3754] text-white text-xs sm:text-sm font-bold hover:bg-[#12283e] transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isRTL ? 'تسجيل الدخول للمشرف' : 'Log In to Admin Panel'}</span>
                    </button>
                    <button
                      onClick={() => navigateToPage('home')}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      {isRTL ? 'العودة للرئيسية' : 'Back to Public Home'}
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </main>

        {/* Government Portal Footer */}
        <Footer onNavigate={navigateToPage} />

        {/* Virtual Assistant Floating Widget (Bottom-Right) */}
        <VirtualAssistant />

        {/* Global Search Dialog Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectArticle={(art) => setSelectedArticle(art)}
          onSelectService={handleSelectService}
        />

        {/* Full News Reader Modal */}
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />

        {/* Interactive Quick Access Service Modal */}
        <ServiceModal
          categoryTitle={selectedServiceGroup}
          item={selectedServiceItem}
          onClose={handleCloseServiceModal}
        />

        {/* Admin Login Modal */}
        <AdminLoginModal onSuccessNavigate={() => navigateToPage('admin')} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <AdminDataProvider>
        <AppContent />
      </AdminDataProvider>
    </AccessibilityProvider>
  );
}
