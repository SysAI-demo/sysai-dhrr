import React, { useState } from 'react';
import { X, Lock, Mail, ShieldAlert, ArrowRight, CheckCircle2, UserCheck, KeyRound } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useAccessibility } from '../context/AccessibilityContext';

interface AdminLoginModalProps {
  onSuccessNavigate?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onSuccessNavigate }) => {
  const { isLoginModalOpen, closeLoginModal, loginAdmin } = useAdminData();
  const { isRTL } = useAccessibility();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const success = loginAdmin(email, password);
      setLoading(false);
      if (success) {
        closeLoginModal();
        if (onSuccessNavigate) {
          onSuccessNavigate();
        }
      } else {
        setError(
          isRTL
            ? 'بيانات الاعتماد غير صحيحة. يرجى استخدام بيانات الدخول المعتمدة أو زر الدخول السريع.'
            : 'Invalid credentials. Please use authorized credentials or the Quick Demo Login button.'
        );
      }
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    setEmail('admin@dhr.shj.ae');
    setPassword('admin123');
    setError(null);
    setLoading(true);
    setTimeout(() => {
      loginAdmin('admin@dhr.shj.ae', 'admin123');
      setLoading(false);
      closeLoginModal();
      if (onSuccessNavigate) {
        onSuccessNavigate();
      }
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-[#1A3754] text-white p-6 sm:p-7 relative">
          <button
            onClick={closeLoginModal}
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-amber-300">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300 tracking-wider uppercase block">
                {isRTL ? 'نظام الإدارة المركزي' : 'Sharjah DHR Central Portal'}
              </span>
              <h2 id="admin-modal-title" className="text-xl font-bold font-arabic text-white">
                {isRTL ? 'تسجيل دخول المشرف' : 'Administrator Sign In'}
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-200 font-arabic leading-relaxed">
            {isRTL
              ? 'الوصول الآمن لإدارة المحتوى والأخبار والفعاليات واللوائح وطلبات التظلمات'
              : 'Secure access to manage portal content, news, events, regulations, and grievances'}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-5 font-arabic">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isRTL ? 'البريد الإلكتروني / اسم المستخدم' : 'Official Email / Username'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dhr.shj.ae"
                  className="w-full px-3.5 py-2.5 pl-10 pr-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1A3754] text-slate-900 transition-all placeholder:text-slate-400"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isRTL ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pl-10 pr-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1A3754] text-slate-900 transition-all placeholder:text-slate-400"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-[#1A3754] hover:bg-[#12283e] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>{isRTL ? 'دخول لوحة التحكم' : 'Authenticate & Enter Dashboard'}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Divider */}
          <div className="relative flex py-1 items-center">
            <div className="grow border-t border-slate-200"></div>
            <span className="shrink mx-3 text-slate-400 text-xs">
              {isRTL ? 'أو للتجربة المباشرة' : 'Or quick evaluator demo'}
            </span>
            <div className="grow border-t border-slate-200"></div>
          </div>

          {/* Quick Demo Login Button */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-300 text-amber-900 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <CheckCircle2 className="w-4 h-4 text-amber-700" />
            <span>{isRTL ? 'تسجيل دخول فوري بحساب المشرف التجريبي' : 'One-Click Super Admin Demo Login'}</span>
          </button>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
            <p className="font-semibold text-slate-800">
              {isRTL ? 'بيانات التجربة المعتمدة:' : 'Default Demo Credentials:'}
            </p>
            <div className="flex justify-between">
              <span>Email: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">admin@dhr.shj.ae</code></span>
              <span>Pass: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">admin123</code></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
