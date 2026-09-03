import React from 'react';
import { Landmark, ArrowUp, ShieldCheck } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { isRTL } = useAccessibility();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    }
    scrollToTop();
  };

  return (
    <footer id="footer" className="bg-[#505A65] text-slate-100 border-t border-slate-400/30">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Branding */}
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => handleLinkClick('home', e)}
              className="h-10 flex items-center justify-center cursor-pointer"
            >
              <img
                src="/1.png"
                alt="Government of Sharjah Logo"
                className="h-10 w-auto object-contain brightness-0 invert opacity-95"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="w-10 h-10 rounded-xl bg-[#1A3754] text-white hidden items-center justify-center border border-white/20">
                <Landmark className="w-5 h-5 text-slate-100" />
              </div>
            </button>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-200 block leading-tight font-arabic">
                {isRTL ? 'دائرة الموارد البشرية' : 'Government Portal'}
              </span>
              <span className="text-sm font-extrabold text-white leading-tight">
                {isRTL ? 'حكومة الشارقة' : 'Department of Human Resources - Sharjah'}
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-200">
            <button onClick={(e) => handleLinkClick('home', e)} className="hover:text-white hover:underline transition-colors cursor-pointer">
              {isRTL ? 'الرئيسية' : 'Home'}
            </button>
            <button onClick={(e) => handleLinkClick('about', e)} className="hover:text-white hover:underline transition-colors cursor-pointer">
              {isRTL ? 'عن الدائرة' : 'About'}
            </button>
            <button onClick={(e) => handleLinkClick('eservices', e)} className="hover:text-white hover:underline transition-colors cursor-pointer">
              {isRTL ? 'الخدمات الإلكترونية' : 'E-Services'}
            </button>
            <button onClick={(e) => handleLinkClick('regulations', e)} className="hover:text-white hover:underline transition-colors cursor-pointer">
              {isRTL ? 'القوانين واللوائح' : 'Law and Regulations'}
            </button>
            <button onClick={(e) => handleLinkClick('initiatives', e)} className="hover:text-white hover:underline transition-colors cursor-pointer">
              {isRTL ? 'مبادرات الدائرة' : "Department's Initiatives"}
            </button>
            <button onClick={(e) => handleLinkClick('media', e)} className="hover:text-white hover:underline transition-colors cursor-pointer">
              {isRTL ? 'المركز الإعلامي' : 'Media Centre'}
            </button>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-[#1A3754] hover:bg-[#12283e] text-white rounded-xl border border-white/20 transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-xs cursor-pointer"
            aria-label="Back to top of page"
          >
            <ArrowUp className="w-4 h-4" />
            <span>{isRTL ? 'للأعلى' : 'Top'}</span>
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{isRTL ? 'البوابة الرسمية • جميع الحقوق محفوظة' : 'Official Portal • All rights reserved'}</span>
            </div>
            <span className="text-slate-500">•</span>
            <button
              onClick={() => onNavigate && onNavigate('admin')}
              className="text-slate-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              {isRTL ? 'بوابة المشرفين والإدارة' : 'Staff & Admin Portal'}
            </button>
          </div>

          <span>© {new Date().getFullYear()} Department of Human Resources • Government of Sharjah</span>
        </div>
      </div>
    </footer>
  );
};
