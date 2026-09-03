import React, { useState } from 'react';
import {
  LayoutDashboard,
  Image,
  Newspaper,
  Calendar,
  Share2,
  Scale,
  Inbox,
  LogOut,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { AdminBannerTab } from './AdminBannerTab';
import { AdminNewsTab } from './AdminNewsTab';
import { AdminEventsTab } from './AdminEventsTab';
import { AdminSocialTab } from './AdminSocialTab';
import { AdminRegulationsTab } from './AdminRegulationsTab';
import { AdminGrievancesTab } from './AdminGrievancesTab';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

type TabType = 'overview' | 'banner' | 'news' | 'events' | 'social' | 'regulations' | 'grievances';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const {
    adminUser,
    logoutAdmin,
    slides,
    news,
    events,
    socialPosts,
    regulations,
    grievances,
    resetToDefaults
  } = useAdminData();
  const { isRTL } = useAccessibility();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const pendingGrievances = grievances.filter((g) => g.status === 'Pending Review').length;

  const tabs: { id: TabType; labelEn: string; labelAr: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', labelEn: 'Overview', labelAr: 'لوحة المؤشرات', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'banner', labelEn: 'Banner Images', labelAr: 'صور البانر الرئيسي', icon: <Image className="w-4 h-4" />, badge: slides.length },
    { id: 'news', labelEn: 'Latest News', labelAr: 'إدارة الأخبار', icon: <Newspaper className="w-4 h-4" />, badge: news.length },
    { id: 'events', labelEn: 'Events', labelAr: 'الفعاليات', icon: <Calendar className="w-4 h-4" />, badge: events.length },
    { id: 'social', labelEn: 'Social Media', labelAr: 'منصات التواصل', icon: <Share2 className="w-4 h-4" />, badge: socialPosts.length },
    { id: 'regulations', labelEn: 'Laws & Regulations', labelAr: 'القوانين واللوائح', icon: <Scale className="w-4 h-4" />, badge: regulations.length },
    { id: 'grievances', labelEn: 'Grievances & Complaints', labelAr: 'التظلمات والشكاوى', icon: <Inbox className="w-4 h-4" />, badge: pendingGrievances > 0 ? pendingGrievances : undefined },
  ];

  const handleLogout = () => {
    logoutAdmin();
    onNavigate('home');
  };

  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 space-y-6">
      {/* Admin Top Header Banner */}
      <div className="bg-[#1A3754] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#1A3754]/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-arabic">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 shadow-md shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                {isRTL ? 'بوابة الإدارة المركزية • حكومة الشارقة' : 'Sharjah DHR Government Admin Portal'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              {isRTL ? 'لوحة تحكم المشرف العام للبوابة' : 'Chief Portal Administration Control Panel'}
            </h1>
            <p className="text-xs text-slate-200 mt-1">
              {isRTL
                ? `مرحباً ${adminUser?.nameAr || 'سعادة المشرف'} • آخر تسجيل دخول: ${adminUser?.lastLogin || 'اليوم'}`
                : `Logged in as ${adminUser?.name || 'Administrator'} • ${adminUser?.role}`}
            </p>
          </div>
        </div>

        {/* Action Buttons: View Portal, Reset, Logout */}
        <div className="flex flex-wrap items-center gap-2.5 self-stretch md:self-auto justify-end">
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{isRTL ? 'معاينة الموقع العام' : 'View Public Site'}</span>
          </button>

          <button
            onClick={() => {
              if (confirm(isRTL ? 'هل تريد استعادة البيانات الافتراضية الأولية للبوابة؟' : 'Reset all data to default initial state?')) {
                resetToDefaults();
              }
            }}
            className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-semibold border border-white/15 transition-all flex items-center gap-1 cursor-pointer"
            title="Reset to Factory Defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isRTL ? 'استعادة الافتراضي' : 'Reset'}</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isRTL ? 'تسجيل الخروج' : 'Sign Out'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto flex items-center gap-1 font-arabic">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#1A3754] text-white shadow-2xs'
                  : 'text-slate-700 hover:text-[#1A3754] hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              <span>{isRTL ? tab.labelAr : tab.labelEn}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-[11px] px-2 py-0.2 rounded-full font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : tab.id === 'grievances' && pendingGrievances > 0
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tab View */}
      <div>
        {activeTab === 'overview' && (
          <div className="space-y-6 font-arabic animate-in fade-in duration-200">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              <button
                onClick={() => setActiveTab('banner')}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#1A3754] hover:shadow-sm transition-all text-left group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1A3754] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Image className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-slate-900 block">{slides.length}</span>
                <span className="text-xs text-slate-500 font-bold block">{isRTL ? 'شرائح البانر' : 'Banner Slides'}</span>
                <span className="text-[10px] font-mono font-medium text-slate-400 mt-0.5 block">1903 × 500 px</span>
              </button>

              <button
                onClick={() => setActiveTab('news')}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#1A3754] hover:shadow-sm transition-all text-left group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Newspaper className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-slate-900 block">{news.length}</span>
                <span className="text-xs text-slate-500 font-bold block">{isRTL ? 'الأخبار الصحفية' : 'News Articles'}</span>
              </button>

              <button
                onClick={() => setActiveTab('events')}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#1A3754] hover:shadow-sm transition-all text-left group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-slate-900 block">{events.length}</span>
                <span className="text-xs text-slate-500 font-bold block">{isRTL ? 'الفعاليات والمعارض' : 'Total Events'}</span>
              </button>

              <button
                onClick={() => setActiveTab('social')}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#1A3754] hover:shadow-sm transition-all text-left group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-slate-900 block">{socialPosts.length}</span>
                <span className="text-xs text-slate-500 font-bold block">{isRTL ? 'منشورات التواصل' : 'Social Posts'}</span>
              </button>

              <button
                onClick={() => setActiveTab('regulations')}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#1A3754] hover:shadow-sm transition-all text-left group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Scale className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-slate-900 block">{regulations.length}</span>
                <span className="text-xs text-slate-500 font-bold block">{isRTL ? 'القوانين والتعاميم' : 'Regulations'}</span>
              </button>

              <button
                onClick={() => setActiveTab('grievances')}
                className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-2xs hover:border-amber-400 hover:shadow-sm transition-all text-left group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Inbox className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-amber-900 block">{grievances.length}</span>
                <span className="text-xs text-amber-800 font-bold block">
                  {pendingGrievances > 0 ? `${pendingGrievances} ${isRTL ? 'تظلم بانتظارك' : 'Pending'}` : isRTL ? 'التظلمات والشكاوى' : 'Grievances'}
                </span>
              </button>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Grievances Alert Box */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>{isRTL ? 'أحدث طلبات التظلمات والشكاوى الواردة' : 'Recent Employee Grievances'}</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('grievances')}
                    className="text-xs font-bold text-[#1A3754] hover:underline cursor-pointer"
                  >
                    {isRTL ? 'عرض الصندوق بالكامل' : 'Open Inbox'}
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {grievances.slice(0, 3).map((g) => (
                    <div key={g.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#1A3754]">{g.referenceNumber}</span>
                          <span className="text-[11px] text-slate-500">{g.submissionDate}</span>
                        </div>
                        <strong className="text-slate-800 block">{g.employeeName} - {g.department}</strong>
                        <p className="text-slate-500 line-clamp-1">{g.subject}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200 shrink-0">
                        {g.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portal Highlights */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{isRTL ? 'نظام النشر والإدارة الفوري' : 'Live Synchronization Status'}</span>
                  </h3>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                    {isRTL ? 'النظام نشط' : 'Active'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {isRTL
                    ? 'جميع التعديلات والإضافات التي يقوم بها المشرف (الأخبار، الفعاليات، صور البانر، اللوائح، التعاميم) تنعكس فورياً وبشكل حي عبر جميع صفحات البوابة العامة.'
                    : 'All additions and modifications made by administrators (news articles, events, banner carousel slides, laws, regulations) take effect immediately across all public portal pages.'}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('banner')}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 text-center transition-colors cursor-pointer"
                  >
                    {isRTL ? '+ إضافة بانر رئيسي' : '+ Add Banner Slide'}
                  </button>
                  <button
                    onClick={() => setActiveTab('news')}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 text-center transition-colors cursor-pointer"
                  >
                    {isRTL ? '+ نشر خبر صحفي' : '+ Publish News Story'}
                  </button>
                  <button
                    onClick={() => setActiveTab('events')}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 text-center transition-colors cursor-pointer"
                  >
                    {isRTL ? '+ جدولة فعالية جديدة' : '+ Schedule Event'}
                  </button>
                  <button
                    onClick={() => setActiveTab('regulations')}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 text-center transition-colors cursor-pointer"
                  >
                    {isRTL ? '+ إضافة تعميم / قانون' : '+ Add Regulation'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'banner' && <AdminBannerTab />}
        {activeTab === 'news' && <AdminNewsTab />}
        {activeTab === 'events' && <AdminEventsTab />}
        {activeTab === 'social' && <AdminSocialTab />}
        {activeTab === 'regulations' && <AdminRegulationsTab />}
        {activeTab === 'grievances' && <AdminGrievancesTab />}
      </div>
    </div>
  );
};
