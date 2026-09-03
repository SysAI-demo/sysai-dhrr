import React, { createContext, useContext, useState, useEffect } from 'react';

type TextSize = 'normal' | 'large' | 'larger';
type Language = 'en' | 'ar';

interface AccessibilityContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
  resetTextSize: () => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  toggleHighContrast: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSize] = useState<TextSize>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('en');

  const increaseTextSize = () => {
    if (textSize === 'normal') setTextSize('large');
    else if (textSize === 'large') setTextSize('larger');
  };

  const decreaseTextSize = () => {
    if (textSize === 'larger') setTextSize('large');
    else if (textSize === 'large') setTextSize('normal');
  };

  const resetTextSize = () => {
    setTextSize('normal');
  };

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const isRTL = language === 'ar';

  // Apply attributes to document element
  useEffect(() => {
    const root = document.documentElement;
    if (textSize === 'large') {
      root.classList.add('text-size-large');
      root.classList.remove('text-size-larger');
    } else if (textSize === 'larger') {
      root.classList.add('text-size-larger');
      root.classList.remove('text-size-large');
    } else {
      root.classList.remove('text-size-large', 'text-size-larger');
    }

    if (highContrast) {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }

    if (language === 'ar') {
      root.setAttribute('dir', 'rtl');
      root.setAttribute('lang', 'ar');
      root.classList.add('font-arabic');
    } else {
      root.setAttribute('dir', 'ltr');
      root.setAttribute('lang', 'en');
      root.classList.remove('font-arabic');
    }
  }, [textSize, highContrast, language]);

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        setTextSize,
        increaseTextSize,
        decreaseTextSize,
        resetTextSize,
        highContrast,
        setHighContrast,
        toggleHighContrast,
        language,
        setLanguage,
        toggleLanguage,
        isRTL,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
