import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { CarouselSlide } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';

interface HeroBannerProps {
  slides: CarouselSlide[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { isRTL } = useAccessibility();

  const handleNext = useCallback(() => {
    if (slides.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    if (slides.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay rotation every 6 seconds
  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, handleNext, slides.length]);

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-4 pb-2">
      {/* Outer Hero Container framed cleanly for full image display */}
      <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-lg border border-slate-200/80 bg-white aspect-[16/7] sm:aspect-[21/6.5] md:aspect-[1903/500] w-full flex items-end">
        
        {/* Slides Images in Rotation */}
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center bg-white ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.imageUrl}
                alt={slide.title || `Banner Slide ${index + 1}`}
                className="w-full h-full object-cover sm:object-contain object-center"
              />
            </div>
          );
        })}

        {/* Carousel Rotation Dots & Subtle Controls Bar */}
        <div className="relative z-20 w-full flex items-center justify-between px-4 sm:px-8 pb-4 sm:pb-6 text-white text-xs">
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2 bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? 'w-7 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Left/Right Controls & Play/Pause */}
          <div className="flex items-center gap-1.5 bg-black/35 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/20 shadow-sm">
            <button
              onClick={handlePrev}
              className="p-1 hover:text-white text-white/80 transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 hover:text-white text-white/80 transition-colors cursor-pointer"
              aria-label={isPlaying ? 'Pause auto-rotation' : 'Play auto-rotation'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleNext}
              className="p-1 hover:text-white text-white/80 transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
