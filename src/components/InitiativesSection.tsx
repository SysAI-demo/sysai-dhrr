import React, { useState } from 'react';
import { Sparkles, Users, ArrowUpRight, CheckCircle2, ChevronRight, X, HeartHandshake } from 'lucide-react';
import { INITIATIVES_DATA } from '../data/mockData';
import { InitiativeItem } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';

export const InitiativesSection: React.FC = () => {
  const { isRTL } = useAccessibility();
  const [selectedInitiative, setSelectedInitiative] = useState<InitiativeItem | null>(null);

  return (
    <section id="initiatives" className="py-16 max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A3754] tracking-tight font-arabic">
          {isRTL ? 'مبادرات الدائرة' : "Department's Initiatives"}
        </h2>
      </div>

      {/* Initiatives Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INITIATIVES_DATA.map((init) => (
          <div
            key={init.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-xl hover:border-teal-300 transition-all flex flex-col group"
          >
            {/* Image banner */}
            <div className="relative h-52 overflow-hidden bg-slate-900">
              <img
                src={init.imageUrl}
                alt={init.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-teal-500/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
                  {isRTL ? init.categoryAr : init.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold">
                  {isRTL ? init.statusBadgeAr : init.statusBadge}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-lg sm:text-xl font-arabic drop-shadow-md">
                  {isRTL ? init.titleAr : init.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-arabic">
                {isRTL ? init.summaryAr : init.summary}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
                  <Users className="w-4 h-4 text-teal-600" />
                  <span>{isRTL ? `الفئة المستفيدة: ${init.beneficiariesAr}` : `Target: ${init.beneficiaries}`}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedInitiative(init)}
                  className="px-4 py-2 bg-slate-100 hover:bg-teal-800 hover:text-white text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <span>{isRTL ? 'تفاصيل المبادرة' : 'View Initiative Details'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedInitiative && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
                  {isRTL ? selectedInitiative.categoryAr : selectedInitiative.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-arabic">
                  {isRTL ? selectedInitiative.titleAr : selectedInitiative.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInitiative(null)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-arabic">
              {isRTL ? selectedInitiative.summaryAr : selectedInitiative.summary}
            </p>

            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm">
                {isRTL ? 'أبرز مميزات ومخرجات المبادرة:' : 'Key Features & Deliverables:'}
              </h4>
              <ul className="space-y-2.5">
                {(isRTL ? selectedInitiative.detailsAr : selectedInitiative.details).map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-arabic">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedInitiative(null)}
                className="px-5 py-2.5 bg-teal-800 text-white rounded-xl text-xs font-bold hover:bg-teal-900 transition-all"
              >
                {isRTL ? 'إغلاق' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
