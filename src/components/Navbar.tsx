import React, { useState } from 'react';
import { Search, Menu, X, Landmark, ChevronRight, Globe, Sparkles, ShieldCheck } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useAdminData } from '../context/AdminDataContext';

interface NavbarProps {
  onOpenSearch: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenAdminLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, currentPage, onNavigate, onOpenAdminLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, isRTL } = useAccessibility();
  const { isAdminLoggedIn } = useAdminData();

  const navLinks = [
    { name: isRTL ? 'الرئيسية' : 'Home', id: 'home' },
    { name: isRTL ? 'عن الدائرة' : 'About', id: 'about' },
    { name: isRTL ? 'الخدمات الإلكترونية' : 'E-Services', id: 'eservices' },
    { name: isRTL ? 'القوانين واللوائح' : 'Law and Regulations', id: 'regulations' },
    { name: isRTL ? 'مبادرات الدائرة' : "Department's Initiatives", id: 'initiatives' },
    { name: isRTL ? 'المركز الإعلامي' : 'Media Centre', id: 'media' },
  ];

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs transition-colors">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Main Bar: Nav on left, Logo on top right in both LTR & RTL */}
        <div className="flex items-center justify-between w-full h-20 sm:h-24 gap-4">
          
          {/* LEFT SIDE: Navigation Menu, Search & Mobile Menu Button */}
            <div className="flex items-center gap-2 xl:gap-3 order-1">
              
              {/* Mobile Controls (Menu button & Search) on the Left */}
              <div className="flex items-center gap-2 lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-slate-700 hover:text-[#1A3754] hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
                  aria-expanded={mobileMenuOpen}
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                <button
                  onClick={onOpenSearch}
                  className="p-2 text-slate-700 hover:text-[#1A3754] hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
                  aria-label="Open portal search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Desktop Navigation Links on the Left */}
              <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={(e) => handleNavClick(link.id, e)}
                      className={`px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all whitespace-nowrap relative cursor-pointer ${
                        isActive
                          ? 'text-[#1A3754] bg-[#1A3754]/10 font-bold shadow-2xs'
                          : 'text-slate-700 hover:text-[#1A3754] hover:bg-slate-100/70'
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#1A3754] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="hidden lg:flex items-center gap-2">
                <div className="h-5 w-px bg-slate-200 mx-1" />

                {/* Search Trigger Button */}
                <button
                  onClick={onOpenSearch}
                  className="p-2 text-slate-600 hover:text-[#1A3754] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  title="Search"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4 text-[#1A3754]" />
                </button>

                {/* Admin Portal Quick Access Button */}
                <button
                  onClick={() => {
                    if (isAdminLoggedIn) {
                      onNavigate('admin');
                    } else if (onOpenAdminLogin) {
                      onOpenAdminLogin();
                    } else {
                      onNavigate('admin');
                    }
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentPage === 'admin'
                      ? 'bg-[#1A3754] text-white shadow-2xs'
                      : isAdminLoggedIn
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                      : 'text-slate-600 hover:text-[#1A3754] hover:bg-slate-100'
                  }`}
                  title={isRTL ? 'بوابة إدارة الموقع' : 'Portal Admin Section'}
                  aria-label="Admin Portal"
                >
                  <ShieldCheck className={`w-4 h-4 ${isAdminLoggedIn ? 'text-emerald-600' : 'text-[#1A3754]'}`} />
                  <span className="hidden xl:inline">
                    {isAdminLoggedIn ? (isRTL ? 'لوحة التحكم' : 'Admin Panel') : (isRTL ? 'دخول المشرف' : 'Admin')}
                  </span>
                  {isAdminLoggedIn && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </button>
              </div>

            </div>

            {/* RIGHT SIDE: Site Logo (1.png) - positioned on the Top Right */}
            <div className="flex items-center order-2">
              <button
                onClick={(e) => handleNavClick('home', e)}
                className="flex items-center gap-3.5 group focus:outline-hidden focus:ring-2 focus:ring-[#1A3754] rounded-xl p-1 cursor-pointer"
                aria-label="Department of Human Resources Home"
              >
                <div className="h-14 sm:h-16 md:h-20 flex items-center justify-center shrink-0 py-1">
                  <img
                    src="/1.png"
                    alt="Government of Sharjah - Department of Human Resources Logo"
                    className="h-12 sm:h-14 md:h-18 w-auto max-h-20 object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="eager"
                    onError={(e) => {
                      // Fallback if image fails to render
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#1A3754] text-white hidden items-center justify-center shadow-md border border-white/20">
                    <Landmark className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
              </button>
            </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl transition-all animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-3 pb-6 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between p-3 bg-slate-50 text-[#1A3754] rounded-2xl border border-slate-200 text-sm font-medium"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-[#1A3754]" />
                <span>{isRTL ? 'البحث في البوابة...' : 'Search portal content...'}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#1A3754]" />
            </button>

            <div className="divide-y divide-slate-100">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={(e) => handleNavClick(link.id, e)}
                  className={`w-full flex items-center justify-between py-3 px-2 rounded-xl font-semibold text-sm transition-colors cursor-pointer ${
                    currentPage === link.id
                      ? 'text-[#1A3754] bg-[#1A3754]/10 font-bold'
                      : 'text-slate-800 hover:text-[#1A3754] hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (isAdminLoggedIn) {
                    onNavigate('admin');
                  } else if (onOpenAdminLogin) {
                    onOpenAdminLogin();
                  } else {
                    onNavigate('admin');
                  }
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 text-[#1A3754] font-bold text-sm border border-slate-200 hover:bg-slate-100 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1A3754]" />
                  <span>{isAdminLoggedIn ? (isRTL ? 'لوحة تحكم المشرف' : 'Admin Control Panel') : (isRTL ? 'تسجيل دخول المشرف' : 'Admin Login')}</span>
                </div>
                {isAdminLoggedIn ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {isRTL ? 'نشط' : 'Logged In'}
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
