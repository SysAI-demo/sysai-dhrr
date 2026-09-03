import React, { useState } from 'react';
import { X, CheckCircle, FileText, ArrowRight, Download, Send, Briefcase, GraduationCap, Building } from 'lucide-react';
import { QuickAccessItem } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';

interface ServiceModalProps {
  categoryTitle: string | null;
  item: QuickAccessItem | null;
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ categoryTitle, item, onClose }) => {
  const { isRTL } = useAccessibility();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    emiratesId: '',
    email: '',
    phone: '',
    notes: '',
  });

  if (!item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      id="service-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === 'service-modal-backdrop') onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div
          className="p-6 text-slate-900 border-b border-slate-200 flex items-start justify-between"
          style={{
            background:
              'linear-gradient(135deg, rgba(204, 238, 238, 0.7) 0%, rgba(246, 235, 214, 0.5) 100%)',
          }}
        >
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-teal-800 block mb-1">
              {categoryTitle}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              {isRTL ? item.titleAr : item.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-white/60 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-xs sm:text-sm">
          {/* Description */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <p className="leading-relaxed text-slate-800 font-medium">
              {item.description}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-emerald-950">
                {isRTL ? 'تم استلام طلبك بنجاح' : 'Request Submitted Successfully'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                {isRTL
                  ? 'تم تسجيل طلبك تحت الرقم المرجعي DHR-2026-8942 وسيتم إشعارك عبر الرسائل النصية القصيرة والبريد الإلكتروني.'
                  : 'Your request has been registered under reference #DHR-2026-8942. An SMS and email notification has been dispatched with tracking credentials.'}
              </p>
              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  {isRTL ? 'إغلاق' : 'Close Portal Window'}
                </button>
              </div>
            </div>
          ) : (
            /* Quick Digital Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isRTL ? 'نموذج تقديم الطلب السريع' : 'Quick Service Application'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {isRTL ? 'الاسم الكامل' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rashid Al-Nuaimi"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-hidden text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {isRTL ? 'رقم الهوية / الرقم الوظيفي' : 'Emirates ID / Employee ID'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.emiratesId}
                    onChange={(e) => setFormData({ ...formData, emiratesId: e.target.value })}
                    placeholder="784-1995-1234567-1"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-hidden text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@shj.ae"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-hidden text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {isRTL ? 'رقم الهاتف المتحرك' : 'Mobile Number'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-hidden text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {isRTL ? 'ملاحظات وتفاصيل الطلب' : 'Request Notes & Details'}
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={isRTL ? 'اكتب أي ملاحظات إضافية هنا...' : 'Provide specific details regarding your request...'}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-600 focus:outline-hidden text-slate-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {isRTL ? 'خدمة مؤمنة بنظام التشفير الحكومي' : 'Encrypted with government SSL'}
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-teal-900/10"
                >
                  <span>{isRTL ? 'إرسال الطلب' : 'Submit Service Request'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-slate-500 text-[11px] flex items-center justify-between">
          <span>Department of Human Resources • Government of Sharjah</span>
          <button onClick={onClose} className="hover:text-slate-800 font-semibold">
            {isRTL ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
