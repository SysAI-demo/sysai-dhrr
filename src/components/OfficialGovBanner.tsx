import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, Lock, Globe, Eye, Type, Check } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export const OfficialGovBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { textSize, increaseTextSize, decreaseTextSize, resetTextSize, highContrast, toggleHighContrast, language, setLanguage, isRTL } = useAccessibility();

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ar', label: 'Arabic', native: 'العربية' },
  ];

  return (
    <div className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800">
      {/* Accessibility & Official Info Bar */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-1.5 flex flex-wrap items-center justify-between gap-2">
        
        {/* Left: Official government badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            <span className="inline-block w-4 h-3 bg-emerald-700 border border-slate-600 rounded-xs relative overflow-hidden" aria-hidden="true">
              <span className="absolute inset-x-0 top-0 h-1 bg-red-600"></span>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-emerald-600"></span>
            </span>
            <span>{isRTL ? 'بوابة حكومة الشارقة الرسمية' : 'Official Government Portal'}</span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-teal-400 hover:text-teal-300 underline inline-flex items-center gap-0.5 font-normal focus:outline-hidden focus:ring-2 focus:ring-teal-400 rounded-sm px-1"
            aria-expanded={isOpen}
            aria-controls="gov-banner-info"
          >
            {isRTL ? 'الأمان والتحقق' : 'Security & Verification'}
            <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Right: Accessibility controls & Language selector */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Text Size Control */}
          <div className="flex items-center bg-slate-800/80 rounded-md px-1.5 py-0.5 border border-slate-700/60" title="Adjust Text Size">
            <Type className="w-3 h-3 text-slate-400 mr-1" />
            <button
              onClick={decreaseTextSize}
              disabled={textSize === 'normal'}
              className="px-1.5 py-0.5 text-xs text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 font-semibold focus:outline-hidden"
              aria-label="Decrease text size"
            >
              A-
            </button>
            <button
              onClick={resetTextSize}
              className="px-1.5 py-0.5 text-xs text-slate-300 hover:text-white font-semibold focus:outline-hidden border-x border-slate-700"
              aria-label="Reset text size to standard"
            >
              A
            </button>
            <button
              onClick={increaseTextSize}
              disabled={textSize === 'larger'}
              className="px-1.5 py-0.5 text-xs text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 font-semibold focus:outline-hidden"
              aria-label="Increase text size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors border ${
              highContrast
                ? 'bg-amber-400 text-slate-950 border-amber-300'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
            }`}
            aria-pressed={highContrast}
            title="Toggle High Contrast Mode"
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">{isRTL ? 'التباين' : 'Contrast'}</span>
          </button>

          {/* Topmost Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-teal-400"
              aria-expanded={langDropdownOpen}
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span>{language === 'en' ? 'English' : 'العربية'}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1 w-36 bg-slate-900 border border-slate-700 rounded-md shadow-xl py-1 z-50 text-slate-200">
                  {languages.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as 'en' | 'ar');
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-teal-950 hover:text-teal-200 flex items-center justify-between ${
                          isSelected ? 'text-teal-400 font-bold bg-slate-800/90' : 'text-slate-300'
                        }`}
                      >
                        <span className={lang.code === 'ar' ? 'font-arabic' : ''}>
                          {lang.native}
                        </span>
                        {isSelected && <Check className="w-3 h-3 text-teal-400" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Expandable Explanation of Government Domain */}
      {isOpen && (
        <div id="gov-banner-info" className="bg-slate-800/90 border-t border-slate-700/60 px-4 py-3 sm:px-8">
          <div className="max-w-[1536px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-white block font-semibold">
                  {isRTL ? 'بوابة حكومية رسمية ومعتمدة' : 'Official government portal'}
                </strong>
                <p className="mt-0.5 text-slate-300">
                  {isRTL ? 'المواقع الرسمية تتبع الجهات والمؤسسات الحكومية المعتمدة بإمارة الشارقة.' : 'Official websites belong to authorized government organizations.'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-white block font-semibold">
                  {isRTL ? 'اتصال آمن ومشفر بواسطة HTTPS' : 'Secure connection using HTTPS'}
                </strong>
                <p className="mt-0.5 text-slate-300">
                  {isRTL ? 'رمز القفل أو بروتوكول https:// يشير إلى تشفير البيانات وأمان المعاملات.' : 'A lock icon or https:// indicates encrypted data transmission.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
