import React, { useState } from 'react';
import {
  Scale,
  FileText,
  Download,
  CheckCircle,
  BookOpen,
  ScrollText,
  ClipboardCheck,
  MessageSquareWarning,
  Award,
  Mail,
  Clock,
  AlertCircle,
  FileCheck,
  Send,
  Check,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { REGULATIONS_DATA } from '../data/mockData';
import { useAccessibility } from '../context/AccessibilityContext';
import { useAdminData } from '../context/AdminDataContext';
import { GrievanceForm } from './GrievanceForm';

interface SupportingDecree {
  number: string;
  year: string;
  titleEn: string;
  titleAr: string;
  typeEn: string;
  typeAr: string;
  descriptionEn: string;
  descriptionAr: string;
  fileSize: string;
}

const SUPPORTING_DECREES: SupportingDecree[] = [
  {
    number: 'Law No. (6) of 2015',
    year: '2015',
    titleEn: 'Human Resources Law in the Emirate of Sharjah',
    titleAr: 'قانون الموارد البشرية لإمارة الشارقة رقم (6) لسنة 2015',
    typeEn: 'Primary Law',
    typeAr: 'قانون أساسي',
    descriptionEn: 'The primary legislative framework regulating civil service, rights, duties, and talent management in the Government of Sharjah.',
    descriptionAr: 'التشريع الأساسي المنظم للخدمة المدنية والحقوق والواجبات وإدارة رأس المال البشري بحكومة الشارقة.',
    fileSize: '3.8 MB',
  },
  {
    number: 'Executive Council Resolution (21) of 2019',
    year: '2019',
    titleEn: 'Executive Regulations of the Human Resources Law',
    titleAr: 'اللائحة التنفيذية لقانون الموارد البشرية لحكومة الشارقة',
    typeEn: 'Executive Regulations',
    typeAr: 'لائحة تنفيذية',
    descriptionEn: 'Detailed operational by-laws, procedural workflows, and execution mechanisms for the Human Resources Law.',
    descriptionAr: 'الأحكام التنظيمية والإجرائية المفصلة لتطبيق أحكام قانون الموارد البشرية.',
    fileSize: '4.5 MB',
  },
  {
    number: 'Law No. (18) of 2021',
    year: '2021',
    titleEn: 'Amending Certain Provisions of Law No. (6) of 2015',
    titleAr: 'قانون رقم (18) لسنة 2021 بتعديل بعض أحكام قانون الموارد البشرية',
    typeEn: 'Legislative Amendment',
    typeAr: 'تعديل تشريعي',
    descriptionEn: 'Statutory amendments modernizing performance standards, administrative agility, and employee entitlements.',
    descriptionAr: 'تعديلات تشريعية لتحديث معايير الكفاءة والمرونة الإدارية واستحقاقات الموظفين.',
    fileSize: '1.9 MB',
  },
  {
    number: 'Executive Council Resolution (32) of 2022',
    year: '2022',
    titleEn: 'Sharjah Government Grades and Salaries Structure',
    titleAr: 'قرار المجلس التنفيذي رقم (32) لسنة 2022 بشأن جدول الدرجات والرواتب',
    typeEn: 'Cabinet Decree',
    typeAr: 'قرار تنفيذي',
    descriptionEn: 'Standardized salary scales, technical allowances, and professional grade ladders across all government entities.',
    descriptionAr: 'تنظيم جداول الدرجات والرواتب والبدلات والمزايا الوظيفية لكافة دوائر حكومة الشارقة.',
    fileSize: '2.4 MB',
  },
  {
    number: 'Executive Council Resolution (15) of 2023',
    year: '2023',
    titleEn: 'Flexible and Remote Work Regulations',
    titleAr: 'قرار المجلس التنفيذي رقم (15) لسنة 2023 بشأن تنظيم العمل المرن وعن بُعد',
    typeEn: 'Operational By-law',
    typeAr: 'لائحة تنظيمية',
    descriptionEn: 'Governance standards, attendance monitoring, and digital productivity requirements for hybrid workplace models.',
    descriptionAr: 'المعايير والضوابط المنظمة لأنماط العمل المرن والعمل عن بُعد لتعزيز الإنتاجية الحكومية.',
    fileSize: '1.7 MB',
  },
];

const SUPPORTING_REGULATIONS: SupportingDecree[] = [
  {
    number: 'Executive Decision (17) of 2017',
    year: '2017',
    titleEn: 'Implementing Regulation of Sharjah HR Law No. (6) of 2015',
    titleAr: 'اللائحة التنفيذية لقانون الموارد البشرية لإمارة الشارقة رقم (6) لسنة 2015',
    typeEn: 'Executive Regulation',
    typeAr: 'لائحة تنفيذية',
    descriptionEn: 'Comprehensive by-laws regulating rights, duties, recruitment, disciplinary system, and performance management.',
    descriptionAr: 'الضوابط والإجراءات التنفيذية المنظمة للحقوق والواجبات ونظام تأديب الموظفين وإدارة الأداء الحكومي.',
    fileSize: '4.5 MB',
  },
  {
    number: 'Executive Decision (19) of 2018',
    year: '2018',
    titleEn: 'Government Performance Management & Appraisal Regulation',
    titleAr: 'لائحة إدارة وتقييم الأداء لموظفي حكومة الشارقة',
    typeEn: 'Procedural Regulation',
    typeAr: 'لائحة إجرائية',
    descriptionEn: 'Framework outlining performance indicators, appraisal cycles, achievement incentives, and development plans.',
    descriptionAr: 'الإطار المنظم لمؤشرات الأداء السنوية ودورات التقييم ونظام المكافآت وخطط التطوير الفردية.',
    fileSize: '3.1 MB',
  },
  {
    number: 'Executive Decision (12) of 2018',
    year: '2018',
    titleEn: 'Employee Disciplinary System and Administrative Investigation By-law',
    titleAr: 'لائحة نظام تأديب الموظفين والتحقيق الإداري والجزاءات',
    typeEn: 'Disciplinary By-law',
    typeAr: 'لائحة تأديبية',
    descriptionEn: 'Procedures for administrative investigations, disciplinary committees, penalties schedule, and grievances.',
    descriptionAr: 'إجراءات التحقيق الإداري وتشكيل لجان التأديب وجدول المخالفات والجزاءات وآليات التظلم.',
    fileSize: '2.8 MB',
  },
  {
    number: 'Executive Decision (24) of 2019',
    year: '2019',
    titleEn: 'Job Descriptions and Occupational Classification Framework',
    titleAr: 'لائحة الأوصاف الوظيفية والتصنيف المهني الموحد',
    typeEn: 'Classification Guide',
    typeAr: 'دليل تصنيف',
    descriptionEn: 'Standardized job description cards, qualification requirements, and competencies across government bodies.',
    descriptionAr: 'بطاقات الوصف الوظيفي الموحدة والشروط والمؤهلات والكفاءات المهنية لكافة المسميات الحكومية.',
    fileSize: '3.9 MB',
  },
  {
    number: 'Executive Decision (15) of 2023',
    year: '2023',
    titleEn: 'Regulation for Leaves, Official Missions, and Hybrid Workplace Framework',
    titleAr: 'لائحة الإجازات والمهام الرسمية وتنظيم بيئة العمل الهجينة',
    typeEn: 'Operational By-law',
    typeAr: 'لائحة تشغيلية',
    descriptionEn: 'Procedures and controls governing leave entitlements, study leaves, official missions, and flexible work.',
    descriptionAr: 'الضوابط المنظمة لجميع أنواع الإجازات والمهام الرسمية والتفرغ الدراسي وساعات العمل المرنة.',
    fileSize: '2.2 MB',
  },
];

export const RegulationsSection: React.FC = () => {
  const { isRTL } = useAccessibility();
  const [selectedCategory, setSelectedCategory] = useState<string>('Law');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // 5 Specific Categories Requested
  const topButtons = [
    {
      id: 'Law',
      labelEn: 'Law',
      labelAr: 'القانون',
      icon: Scale,
    },
    {
      id: 'Regulations',
      labelEn: 'Regulations',
      labelAr: 'اللوائح',
      icon: BookOpen,
    },
    {
      id: 'Circulars',
      labelEn: 'Circulars',
      labelAr: 'التعاميم',
      icon: ScrollText,
    },
    {
      id: 'Evaluation System',
      labelEn: 'Evaluation System',
      labelAr: 'نظام التقييم',
      icon: ClipboardCheck,
    },
    {
      id: 'Grievences and Complaints',
      labelEn: 'Grievences and Complaints',
      labelAr: 'التظلمات والشكاوى',
      icon: MessageSquareWarning,
    },
  ];

  const { regulations: dynamicRegulations } = useAdminData();
  const allRegulations = dynamicRegulations && dynamicRegulations.length > 0 ? dynamicRegulations : REGULATIONS_DATA;

  const filteredRegulations = allRegulations.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  const handleDownload = (id: string, customPdfUrl?: string, customFileName?: string) => {
    setDownloadSuccess(id);

    // If a real PDF URL or uploaded Data URL is passed or found, download it
    const targetUrl = customPdfUrl || allRegulations.find(r => r.id === id)?.pdfUrl;
    const targetName = customFileName || allRegulations.find(r => r.id === id)?.fileName || `${id}.pdf`;

    if (targetUrl) {
      try {
        const link = document.createElement('a');
        link.href = targetUrl;
        link.download = targetName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error('Download error:', err);
      }
    }

    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  const activeCategoryObj = topButtons.find((b) => b.id === selectedCategory) || topButtons[0];

  return (
    <section id="regulations" className="py-8 sm:py-10 max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-20 font-ibm-plex space-y-8">
      {/* Centered Title */}
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A3754] tracking-tight font-arabic">
          {isRTL ? 'الأنظمة واللوائح' : 'Legislation and Regulations'}
        </h2>
      </div>

      {/* Main Grid: Left Floating/Sticky Navigation Menu + Right Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Side Navigation Bar - Floating & Sticky on scroll */}
        <aside className="md:col-span-4 lg:col-span-3 md:sticky md:top-28 z-20">
          <nav aria-label="Regulations Navigation" className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-md space-y-2 max-h-[calc(100vh-8rem)] overflow-y-auto">
            {topButtons.map((btn) => {
              const IconComponent = btn.icon;
              const isActive = selectedCategory === btn.id;

              return (
                <button
                  key={btn.id}
                  onClick={() => setSelectedCategory(btn.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isRTL ? 'text-right' : 'text-left'
                  } ${
                    isActive
                      ? 'bg-[#1A3754] text-white shadow-xs'
                      : 'text-slate-800 hover:bg-slate-50 hover:text-[#1A3754]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-white/15 text-white' : 'bg-[#1A3754] text-white'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="font-arabic font-bold">
                      {isRTL ? btn.labelAr : btn.labelEn}
                    </span>
                  </div>
                  {isRTL ? (
                    <ChevronLeft
                      className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-300'}`}
                    />
                  ) : (
                    <ChevronRight
                      className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-300'}`}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Main Content Area */}
        <div className="md:col-span-8 lg:col-span-9 space-y-6">

          {/* ========================================================================= */}
          {/* 1. LAW VIEW (Custom Detailed Information + Table) */}
          {/* ========================================================================= */}
          {selectedCategory === 'Law' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Main Card: Human Resources Law */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            
            {/* Combined Decree Overview & Vision Container */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200/90 text-xs sm:text-sm text-slate-800 font-arabic leading-relaxed space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <strong className="font-bold text-[#1A3754] text-sm sm:text-base block">
                    {isRTL
                      ? 'قانون الموارد البشرية رقم (6) لسنة 2015:'
                      : 'Human Resources Law No. 6 for the year 2015:'}
                  </strong>
                  <p className="text-slate-700 italic">
                    {isRTL
                      ? 'صدر قانون الموارد البشرية بناءً على التوجيهات السامية لصاحب السمو الشيخ الدكتور سلطان بن محمد القاسمي عضو المجلس الأعلى للاتحاد حاكم إمارة الشارقة حفظه الله ورعاه ..'
                      : 'Human Resources Law has been issued as per Supreme instructions of His Highness Sheikh Dr. Sultan bin Muhammad Al Qassimi member of the Supreme Council of the United Arab Emirates, the Ruler of Sharjah ..'}
                  </p>
                </div>

                {/* Direct Download Button */}
                <button
                  onClick={() => handleDownload('main-law-2015')}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer font-arabic shrink-0 ${
                    downloadSuccess === 'main-law-2015'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#1A3754] text-white hover:bg-[#152e46]'
                  }`}
                >
                  {downloadSuccess === 'main-law-2015' ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>{isRTL ? 'تم التحميل' : 'Downloaded'}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>{isRTL ? 'تحميل نص القانون PDF' : 'Download Law PDF (3.8 MB)'}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-3 border-t border-slate-200/70 text-slate-700 text-justify leading-relaxed">
                <p>
                  {isRTL
                    ? 'يركز القانون على العنصر البشري باعتباره أصلاً استثمارياً يجب إدارته وتنميته بكفاءة وفاعلية. وهو يعكس رؤية مستقبلية واستشرافاً للاحتياجات المستقبلية للموارد البشرية. ويسهم في تطوير الأنظمة والسياسات وبيئة العمل، بما يربط التنمية البشرية بالدوائر والمؤسسات الحكومية في الشارقة. ويفتح الآفاق أمام الجميع، لتحسين أداء الموظفين وصقل مهاراتهم واستثمار طاقاتهم.'
                    : 'The law focuses on the human element as an investment asset that must be managed and developed effectively and efficiently. It reflects a future vision and foresight for the future needs of human resources. It contributes to the development of systems, policies and the work environment, in a manner to link the human development in Sharjah government departments and institutions. It opens the horizons for everyone, to improve the performance of employees and control their skills and invest their potentials.'}
                </p>
              </div>
            </div>

            {/* 4 Main Features */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 font-arabic flex items-center gap-2">
                <Award className="w-4 h-4 text-[#1A3754]" />
                <span>
                  {isRTL
                    ? 'أهم ملامح قانون الموارد البشرية:'
                    : 'The main features of the law are:'}
                </span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {[
                  {
                    num: '1',
                    en: 'Meeting the requirements of the next stage, to foster the culture of excellence and raise the level of performance in the Government.',
                    ar: 'تلبية متطلبات المرحلة القادمة، لترسيخ ثقافة التميز ورفع مستوى الأداء في الحكومة.',
                  },
                  {
                    num: '2',
                    en: 'Applying legal texts that contribute to raising awareness of employees and making known to them their rights, duties and responsibilities.',
                    ar: 'تطبيق نصوص قانونية تسهم في رفع وعي الموظفين وتعريفهم بحقوقهم وواجباتهم ومسؤولياتهم.',
                  },
                  {
                    num: '3',
                    en: 'Verifying the role of human resources as the main basis for the implementation of the strategic plan for each governmental body.',
                    ar: 'التأكيد على دور الموارد البشرية كركيزة أساسية لتنفيذ الخطة الاستراتيجية لكل جهة حكومية.',
                  },
                  {
                    num: '4',
                    en: 'Contributing effectively to clarifying the administrative vision to accelerate progress of the government in the administrative field.',
                    ar: 'الإسهام الفاعل في توضيح الرؤية الإدارية لتسريع عجلة تقدم الحكومة في المجال الإداري.',
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3 hover:border-[#1A3754]/40 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-xl bg-[#1A3754] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {item.num}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 font-arabic leading-relaxed">
                      {isRTL ? item.ar : item.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Information & Supporting Decrees */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="space-y-1">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 font-arabic">
                  {isRTL ? 'معلومات الجدول' : 'Table Information'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-arabic">
                  {isRTL
                    ? 'صدرت عدة مراسيم وقرارات داعمة لقانون الموارد البشرية لحكومة الشارقة رقم (6) لسنة 2015 وتعديلاته كالتالي:'
                    : 'Several decrees supporting the Human Resources Law of the Government of Sharjah No. (6) of 2015 and its amendments were issued as follows:'}
                </p>
              </div>

              {/* Decrees Data Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm font-arabic">
                  <thead className="bg-slate-100/90 text-slate-800 text-[11px] sm:text-xs uppercase tracking-wider font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3.5 whitespace-nowrap">
                        {isRTL ? 'رقم المرسوم / القرار' : 'Decree / Resolution'}
                      </th>
                      <th className="px-4 py-3.5 whitespace-nowrap">
                        {isRTL ? 'السنة' : 'Year'}
                      </th>
                      <th className="px-4 py-3.5">
                        {isRTL ? 'عنوان الوثيقة والبيان' : 'Title & Subject'}
                      </th>
                      <th className="px-4 py-3.5 whitespace-nowrap">
                        {isRTL ? 'نوع الوثيقة' : 'Type'}
                      </th>
                      <th className="px-4 py-3.5 text-center whitespace-nowrap">
                        {isRTL ? 'التحميل' : 'Action'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {SUPPORTING_DECREES.map((row, idx) => {
                      const isDown = downloadSuccess === `decree-${idx}`;
                      return (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3.5 font-bold text-slate-900 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-[#1A3754] text-xs font-bold">
                              {row.number}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-slate-500 font-semibold whitespace-nowrap">
                            {row.year}
                          </td>
                          <td className="px-4 py-3.5 space-y-1">
                            <span className="font-bold text-slate-800 block text-xs sm:text-sm">
                              {isRTL ? row.titleAr : row.titleEn}
                            </span>
                            <span className="text-slate-500 text-[11px] block leading-relaxed line-clamp-2">
                              {isRTL ? row.descriptionAr : row.descriptionEn}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                              {isRTL ? row.typeAr : row.typeEn}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-center whitespace-nowrap">
                            <button
                              onClick={() => handleDownload(`decree-${idx}`)}
                              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                isDown
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-100 hover:bg-[#1A3754] hover:text-white text-slate-700'
                              }`}
                            >
                              {isDown ? (
                                <>
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>{isRTL ? 'تم' : 'Done'}</span>
                                </>
                              ) : (
                                <>
                                  <Download className="w-3.5 h-3.5" />
                                  <span>PDF</span>
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. REGULATIONS VIEW (Detailed Implementing Regulation View) */}
      {/* ========================================================================= */}
      {selectedCategory === 'Regulations' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Main Card: Implementing Regulations */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            
            {/* Decree Header & Introductory Combined Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200/90 text-xs sm:text-sm text-slate-800 font-arabic leading-relaxed space-y-4">
              <div className="space-y-1">
                <strong className="font-bold text-[#1A3754] text-sm sm:text-base block">
                  {isRTL
                    ? 'قرار المجلس التنفيذي رقم (17) لسنة 2017:'
                    : 'Executive Council Decision No. (17) of 2017:'}
                </strong>
                <p className="text-slate-700 font-semibold italic">
                  {isRTL
                    ? 'قرار المجلس التنفيذي رقم (17) لسنة 2017 بشأن اللائحة التنفيذية للقانون رقم (6) لسنة 2015 بشأن الموارد البشرية لإمارة الشارقة'
                    : 'Executive Council Decision No. (17) of 2017 on the Implementing Regulation of Law No. (6) of 2015 concerning the Human Resources of the Emirate of Sharjah'}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/70 text-slate-700 text-justify leading-relaxed space-y-3">
                <p>
                  {isRTL
                    ? 'حرصت دائرة الموارد البشرية على تعزيز الجانب التشريعي في الإمارة على مستوى الموارد البشرية من خلال إصدار اللائحة التنفيذية لتوضيح واجبات وحقوق الموظفين وتوفير بيئة عمل ملائمة لجميع العاملين فيها.'
                    : 'The Human Resources Department was keen to strengthen the legislative aspect in the Emirate at the level of human resources by issuing the Implementing Regulation to clarify the duties and rights of employees and to provide an appropriate working environment to all its employees.'}
                </p>
                <p>
                  {isRTL
                    ? 'وتتضمن اللائحة التنفيذية لقانون الموارد البشرية كافة الضوابط والتفاصيل المتعلقة بحقوق وواجبات الموظفين، وإجراءات التوظيف والتقييم، وأنظمة الحوافز والإجازات، ونظام تأديب الموظفين، وغيرها من المسائل المرتبطة بالموارد البشرية لكوادر الجهات الحكومية.'
                    : 'The Implementing Regulations of the Human Resources Law includes all the controls and details regarding the rights and duties of employees, recruitment and assessment processes, incentive and leave systems, the employee discipline system and other matters related to human resources, for the staffs of government bodies.'}
                </p>
              </div>
            </div>

            {/* 4 Advantages of Implementing Regulation */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 font-arabic flex items-center gap-2">
                <Award className="w-4 h-4 text-[#1A3754]" />
                <span>
                  {isRTL
                    ? 'مزايا اللائحة التنفيذية للقانون رقم (6) لسنة 2015 بشأن الموارد البشرية لإمارة الشارقة:'
                    : 'Advantages of the Implementing Regulation of Law No. (6) of 2015 concerning the Human Resources of the Emirate of Sharjah:'}
                </span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {[
                  {
                    num: '1',
                    en: 'The new Law is the first law of human resources in the Emirate of Sharjah for which an Implementing Regulation was issued, as Civil Service Law No. (5) of 2001 used to be applied in the past without any implementing regulation thereto.',
                    ar: 'يعتبر القانون الجديد أول قانون للموارد البشرية في إمارة الشارقة تصدر له لائحة تنفيذية، حيث كان يطبق في السابق قانون الخدمة المدنية رقم (5) لسنة 2001 دون أي لائحة تنفيذية له.',
                  },
                  {
                    num: '2',
                    en: 'The Implementing Regulation of the law contains the procedures that must be followed when applying each article of the law separately.',
                    ar: 'تضمنت اللائحة التنفيذية للقانون الإجراءات الواجب اتباعها عند تطبيق كل مادة من مواد القانون على حدة.',
                  },
                  {
                    num: '3',
                    en: 'The Regulation contains a full Employee Discipline System in addition to the controls and procedures which should be followed to implement this system.',
                    ar: 'تضمنت اللائحة نظاماً متكاملاً لتأديب الموظفين، بالإضافة إلى الضوابط والإجراءات الواجب اتباعها لتطبيق هذا النظام.',
                  },
                  {
                    num: '4',
                    en: 'The Regulation contains a full performance management system, in addition to the controls, conditions and procedures to be followed for the implementation of this system.',
                    ar: 'تضمنت اللائحة نظاماً متكاملاً لإدارة الأداء، بالإضافة إلى الضوابط والشروط والإجراءات الواجب اتباعها لتطبيق هذا النظام.',
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3 hover:border-[#1A3754]/40 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-xl bg-[#1A3754] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {item.num}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 font-arabic leading-relaxed">
                      {isRTL ? item.ar : item.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6 Outcomes / Impacts Section */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="space-y-1">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 font-arabic">
                  {isRTL
                    ? 'الأثر والنتائج المترتبة على هذه المزايا:'
                    : 'Provided that the abovementioned advantages lead to:'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-arabic">
                  {isRTL
                    ? 'تسهم اللائحة في تحقيق أعلى مستويات الحوكمة والكفاءة المؤسسية عبر الأهداف التالية:'
                    : 'The regulation delivers institutional governance, consistency and procedural clarity through:'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {[
                  {
                    num: '1',
                    en: 'Unifying the implementation of procedures in all the government agencies and any entities that apply this law.',
                    ar: 'توحيد تطبيق الإجراءات في كافة الجهات الحكومية وأي جهات تطبق هذا القانون.',
                  },
                  {
                    num: '2',
                    en: 'Limiting inquiries and facilitating the work of the departments of support services in all government agencies for the clarity of the application procedures.',
                    ar: 'حصر الاستفسارات وتسهيل عمل إدارات الخدمات المساندة في كافة الجهات الحكومية لوضوح إجراءات التطبيق.',
                  },
                  {
                    num: '3',
                    en: 'Unifying all forms of administrative procedures in all government agencies to unify and harmonise administrative work and its transparency.',
                    ar: 'توحيد كافة نماذج الإجراءات الإدارية في جميع الجهات الحكومية لتوحيد وتنسيق العمل الإداري وشفافيته.',
                  },
                  {
                    num: '4',
                    en: 'Unify all forms of employment contracts, whether for nationals or non-nationals, of all types of employment.',
                    ar: 'توحيد كافة نماذج عقود التوظيف سواء للمواطنين أو غير المواطنين ولكافة أنواع التوظيف.',
                  },
                  {
                    num: '5',
                    en: 'Unifying all procedures to achieve the purpose of the employee discipline system and showing the mechanisms of grievance and complaint in government agencies.',
                    ar: 'توحيد كافة الإجراءات لتحقيق الغرض من نظام تأديب الموظفين وبيان آليات التظلم والشكاوى في الجهات الحكومية.',
                  },
                  {
                    num: '6',
                    en: 'Unifying the mechanisms, procedures and forms of performance assessment for all government agencies.',
                    ar: 'توحيد آليات وإجراءات ونماذج تقييم الأداء لكافة الجهات الحكومية.',
                  },
                ].map((res) => (
                  <div
                    key={res.num}
                    className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 shadow-2xs flex items-start gap-3 hover:border-[#1A3754]/40 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#1A3754]/10 text-[#1A3754] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {res.num}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 font-arabic leading-relaxed">
                      {isRTL ? res.ar : res.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Information & Regulations Table */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="space-y-1">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 font-arabic">
                  {isRTL ? 'جدول اللوائح والقرارات التنفيذية' : 'Regulations & Executive Decisions Table'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-arabic">
                  {isRTL
                    ? 'قائمة اللوائح التنفيذية والإجرائية المعتمدة والقرارات المفسرة لكافة قطاعات الموارد البشرية لحكومة الشارقة:'
                    : 'List of approved executive regulations, procedural guidelines, and interpreting decisions for Sharjah Government HR:'}
                </p>
              </div>

              {/* Regulations Data Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm font-arabic">
                  <thead className="bg-slate-100/90 text-slate-800 text-[11px] sm:text-xs uppercase tracking-wider font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3.5 whitespace-nowrap">
                        {isRTL ? 'رقم اللائحة / القرار' : 'Regulation / Decision'}
                      </th>
                      <th className="px-4 py-3.5 whitespace-nowrap">
                        {isRTL ? 'السنة' : 'Year'}
                      </th>
                      <th className="px-4 py-3.5">
                        {isRTL ? 'عنوان اللائحة والتفاصيل' : 'Title & Subject'}
                      </th>
                      <th className="px-4 py-3.5 whitespace-nowrap">
                        {isRTL ? 'نوع الوثيقة' : 'Type'}
                      </th>
                      <th className="px-4 py-3.5 text-center whitespace-nowrap">
                        {isRTL ? 'التحميل' : 'Action'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {SUPPORTING_REGULATIONS.map((row, idx) => {
                      const isDown = downloadSuccess === `reg-${idx}`;
                      return (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3.5 font-bold text-slate-900 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-[#1A3754] text-xs font-bold">
                              {row.number}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-slate-500 font-semibold whitespace-nowrap">
                            {row.year}
                          </td>
                          <td className="px-4 py-3.5 space-y-1">
                            <span className="font-bold text-slate-800 block text-xs sm:text-sm">
                              {isRTL ? row.titleAr : row.titleEn}
                            </span>
                            <span className="text-slate-500 text-[11px] block leading-relaxed line-clamp-2">
                              {isRTL ? row.descriptionAr : row.descriptionEn}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                              {isRTL ? row.typeAr : row.typeEn}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-center whitespace-nowrap">
                            <button
                              onClick={() => handleDownload(`reg-${idx}`)}
                              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                isDown
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-100 hover:bg-[#1A3754] hover:text-white text-slate-700'
                              }`}
                            >
                              {isDown ? (
                                <>
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>{isRTL ? 'تم' : 'Done'}</span>
                                </>
                              ) : (
                                <>
                                  <Download className="w-3.5 h-3.5" />
                                  <span>PDF</span>
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. GRIEVANCES AND COMPLAINTS VIEW */}
      {/* ========================================================================= */}
      {selectedCategory === 'Grievences and Complaints' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-7">
            
            {/* Header / Intro Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/90 border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1A3754] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                <MessageSquareWarning className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-[#1A3754] font-arabic">
                  {isRTL
                    ? 'إجراءات تقديم طلب التظلم أو الشكوى'
                    : 'The procedures for filing a Grievance or Complaint'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-arabic leading-relaxed">
                  {isRTL
                    ? 'الدليل الإجرائي المعتمد والمستندات المطلوبة للتقدم بالتظلم الأول إلى اللجنة العليا للموارد البشرية بحكومة الشارقة.'
                    : 'Standard procedural guidelines and mandatory attachments for submitting the first grievance to the Supreme Committee for Human Resources.'}
                </p>
              </div>
            </div>

            {/* Section 1: Procedures & Required Attachments */}
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 font-arabic flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1A3754]"></span>
                  <span>
                    {isRTL
                      ? 'أولاً: إجراءات تقديم طلب التظلم (التظلم الأول إلى اللجنة العليا للموارد البشرية):'
                      : 'First: Procedures for submitting a grievance request (The first complaint to the Supreme Committee for Human Resources):'}
                  </span>
                </h4>
                <p className="text-xs text-slate-500 font-arabic mt-1">
                  {isRTL
                    ? 'يرجى إرفاق المستندات والوثائق المحددة أدناه واستيفاء كافة الشروط:'
                    : 'Please attach the following documents and fulfill all requirements:'}
                </p>
              </div>

              {/* 5 Clear Step Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Form 13 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/60 border border-slate-200/90 shadow-2xs hover:border-[#1A3754]/40 transition-colors flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#1A3754] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="space-y-1">
                    <strong className="text-xs sm:text-sm font-bold text-slate-900 font-arabic block">
                      {isRTL ? 'النموذج رقم (13) مع إثبات الاستلام' : 'Form No. (13) with Proof of Receipt'}
                    </strong>
                    <p className="text-xs text-slate-700 font-arabic leading-relaxed text-justify">
                      {isRTL
                        ? 'النموذج رقم (13) من جهة عمل الموظف المتظلم، مع إرفاق ما يثبت استلام جهة العمل للنموذج رسمياً.'
                        : 'Form No. (13) of the aggrieved employee’s employer, with proof of the entity’s receipt of the form.'}
                    </p>
                  </div>
                </div>

                {/* 2. Grievances Committee Statement */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/60 border border-slate-200/90 shadow-2xs hover:border-[#1A3754]/40 transition-colors flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#1A3754] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="space-y-1">
                    <strong className="text-xs sm:text-sm font-bold text-slate-900 font-arabic block">
                      {isRTL ? 'إفادة لجنة التظلمات والشكاوى' : 'Informing the Grievances & Complaints Committee'}
                    </strong>
                    <p className="text-xs text-slate-700 font-arabic leading-relaxed text-justify">
                      {isRTL
                        ? 'إفادة لجنة التظلمات والشكاوى بجهة عمل الموظف المتظلم بشأن تظلمه المقدم إليها.'
                        : 'Informing the Grievances and Complaints Committee regarding the work of the aggrieved employee regarding his grievance.'}
                    </p>
                  </div>
                </div>

                {/* 3. Administrative Decision */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/60 border border-slate-200/90 shadow-2xs hover:border-[#1A3754]/40 transition-colors flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#1A3754] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="space-y-1">
                    <strong className="text-xs sm:text-sm font-bold text-slate-900 font-arabic block">
                      {isRTL ? 'القرار الإداري الصادر' : 'The Administrative Decision'}
                    </strong>
                    <p className="text-xs text-slate-700 font-arabic leading-relaxed text-justify">
                      {isRTL
                        ? 'نسخة من القرار الإداري الصادر في حق الموظف المتظلم موضوع التظلم.'
                        : 'The administrative decision issued against the aggrieved employee.'}
                    </p>
                  </div>
                </div>

                {/* 4. Form 14 with Direct Action Button */}
                <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 shadow-2xs hover:border-blue-300 transition-colors flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#1A3754] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div className="space-y-2 flex-1">
                    <strong className="text-xs sm:text-sm font-bold text-[#1A3754] font-arabic block">
                      {isRTL ? 'تعبئة النموذج رقم (14)' : 'Fill out Form No. 14'}
                    </strong>
                    <p className="text-xs text-slate-700 font-arabic leading-relaxed">
                      {isRTL
                        ? 'تعبئة استمارة النموذج رقم (14) الخاصة باللجنة العليا للموارد البشرية.'
                        : 'Fill out Form No. 14 of the Supreme Committee for Human Resources.'}
                    </p>
                    <div className="pt-1">
                      <button
                        onClick={() => handleDownload('form-14-pdf')}
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#1A3754] bg-white px-3.5 py-2 rounded-xl border border-blue-200 hover:bg-[#1A3754] hover:text-white transition-all shadow-2xs cursor-pointer font-arabic"
                      >
                        {downloadSuccess === 'form-14-pdf' ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span>{isRTL ? 'تم تحميل استمارة رقم 14' : 'Form No. 14 Downloaded'}</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>
                              {isRTL
                                ? 'مرفق استمارة الطلب نموذج رقم 14 (اضغط هنا)'
                                : 'Attached is application form No. 14 Click here'}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 5. All Supporting Evidences */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/60 border border-slate-200/90 shadow-2xs md:col-span-2 hover:border-[#1A3754]/40 transition-colors flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#1A3754] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    5
                  </div>
                  <div className="space-y-1">
                    <strong className="text-xs sm:text-sm font-bold text-slate-900 font-arabic block">
                      {isRTL ? 'كافة الإثباتات والمستندات المؤيدة' : 'All Supporting Documents & Evidence'}
                    </strong>
                    <p className="text-xs text-slate-700 font-arabic leading-relaxed">
                      {isRTL
                        ? 'كافة الإثباتات والوثائق المؤيدة ذات الصلة بحالة الطلب المرسل والوقائع الداعمة له.'
                        : 'All support and documentation related to the status of the sent application.'}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Section 2: Special Requirements for Performance Evaluation Grievances */}
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-4 font-arabic">
              <div className="space-y-1">
                <h5 className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>
                    {isRTL
                      ? 'في حالة التظلم بشأن تقييم الأداء الوظيفي:'
                      : 'In the event of a grievance regarding the performance evaluation:'}
                  </span>
                </h5>
                <p className="text-xs text-amber-900 leading-relaxed">
                  {isRTL
                    ? 'يلزم إرفاق الوثائق الإضافية التالية مع طلب التظلم:'
                    : 'The following additional documents must be attached with the grievance request:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-950">
                <div className="p-3.5 rounded-xl bg-white border border-amber-200/80 flex items-center gap-2.5 shadow-2xs">
                  <FileCheck className="w-4 h-4 text-amber-800 shrink-0" />
                  <span className="font-bold">
                    {isRTL ? '1. وثيقة تقييم الأداء' : '1. Performance appraisal document'}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-amber-200/80 flex items-center gap-2.5 shadow-2xs">
                  <FileCheck className="w-4 h-4 text-amber-800 shrink-0" />
                  <span className="font-bold">
                    {isRTL ? '2. ملف الإنجاز' : '2. Achievement file'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-amber-800 font-semibold italic pt-1 border-t border-amber-200/60">
                {isRTL
                  ? '• بالإضافة إلى كافة إجراءات ومستندات تقديم التظلم الموضحة أعلاه.'
                  : '• In addition to the above grievance filing procedures.'}
              </p>
            </div>

            {/* Section 3: Submission Channel via Email */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#1A3754] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm font-arabic">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  <span>{isRTL ? 'قناة إرسال الطلب الرسمية' : 'Official Submission Channel'}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed max-w-xl">
                  {isRTL
                    ? 'يرجى إرسال استمارة الطلب وكافة المرفقات والمستندات المؤيدة إلى دائرة الموارد البشرية عبر البريد الإلكتروني:'
                    : 'Please Send the application attachments and the form to the human resources department to the email:'}
                </p>
              </div>

              <a
                href="mailto:g.c@dhr.shj.ae"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#1A3754] font-bold text-xs sm:text-sm hover:bg-slate-100 hover:shadow-md transition-all shadow-xs shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>g.c@dhr.shj.ae</span>
              </a>
            </div>

            {/* Section 4: Legal & Statutory Timeframes */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 text-xs text-slate-700 font-arabic leading-relaxed">
              <strong className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#1A3754]" />
                <span>{isRTL ? 'تنبيهات وملاحظات المهل القانونية المعتمدة:' : 'Important Statutory Notes & Deadlines:'}</span>
              </strong>
              
              <div className="space-y-2.5 text-justify pl-1 pr-1">
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#1A3754] shrink-0 mt-1.5" />
                  <p className="text-slate-800">
                    {isRTL
                      ? 'يرجى مراعاة المدة المحددة وفقاً لأحكام المادة (109) في اللائحة التنفيذية للقانون رقم (6) لسنة 2015م بشأن الموارد البشرية لإمارة الشارقة.'
                      : 'Note: Please take into account the period specified in accordance with the provisions of Article (109) in the executive regulations of Law No. (6) of 2015 AD regarding human resources for the Emirate of Sharjah.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#1A3754] shrink-0 mt-1.5" />
                  <p className="text-slate-800">
                    {isRTL
                      ? 'وفيما يتعلق بتقييم الأداء وفقاً لنص المادة (18) من قرار المجلس التنفيذي رقم (8) لسنة 2018م بشأن تقييم أداء موظفي حكومة الشارقة.'
                      : 'And with regard to performance evaluation in accordance with the text of Article (18) of Executive Council Resolution No. (8) of 2018 AD regarding performance evaluation of Sharjah government employees.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Online Grievance Submission Form */}
            <div className="pt-2">
              <GrievanceForm />
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. OTHER CATEGORIES VIEW (Circulars, Evaluation System) */}
      {/* ========================================================================= */}
      {selectedCategory !== 'Law' && selectedCategory !== 'Regulations' && selectedCategory !== 'Grievences and Complaints' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
            {/* Header & Subtitle */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1A3754]/10 text-[#1A3754] flex items-center justify-center font-bold">
                  {selectedCategory === 'Circulars' ? (
                    <ScrollText className="w-5 h-5" />
                  ) : selectedCategory === 'Evaluation System' ? (
                    <ClipboardCheck className="w-5 h-5" />
                  ) : (
                    <MessageSquareWarning className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-arabic">
                    {isRTL ? activeCategoryObj.labelAr : activeCategoryObj.labelEn}
                  </h3>
                  <p className="text-xs text-slate-500 font-arabic">
                    {selectedCategory === 'Circulars'
                      ? isRTL
                        ? 'التعاميم الرسمية والكتب الدورية الصادرة لتنظيم بيئة العمل وسياسات الموارد البشرية'
                        : 'Official periodic circulars governing workplace regulations and civil service procedures'
                      : isRTL
                      ? 'اللوائح والوثائق المنظمة المعتمدة'
                      : 'Governing regulatory framework and operational guidelines'}
                  </p>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-100 font-bold text-slate-700 border border-slate-200 font-arabic whitespace-nowrap">
                {filteredRegulations.length} {isRTL ? 'وثيقة رسمية' : 'Official Documents'}
              </span>
            </div>

            {/* Table View */}
            {filteredRegulations.length > 0 ? (
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm font-arabic">
                  <thead className="bg-slate-100/90 text-slate-800 text-[11px] sm:text-xs uppercase tracking-wider font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3.5 whitespace-nowrap">
                        {isRTL ? 'رقم التعميم / الوثيقة' : 'Circular / Document No.'}
                      </th>
                      <th className="px-4 py-3.5 whitespace-nowrap">
                        {isRTL ? 'السنة' : 'Year'}
                      </th>
                      <th className="px-4 py-3.5">
                        {isRTL ? 'الموضوع والتفاصيل الإجرائية' : 'Subject & Regulatory Context'}
                      </th>
                      <th className="px-4 py-3.5 whitespace-nowrap">
                        {isRTL ? 'التصنيف' : 'Category'}
                      </th>
                      <th className="px-4 py-3.5 text-center whitespace-nowrap">
                        {isRTL ? 'التحميل' : 'Action'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredRegulations.map((item) => {
                      const isDownloaded = downloadSuccess === item.id;
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3.5 font-bold text-slate-900 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-[#1A3754] text-xs font-bold">
                              {item.lawNumber}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-slate-500 font-semibold whitespace-nowrap">
                            {item.year}
                          </td>
                          <td className="px-4 py-3.5 space-y-1">
                            <span className="font-bold text-slate-800 block text-xs sm:text-sm">
                              {isRTL ? item.titleAr : item.title}
                            </span>
                            <span className="text-slate-500 text-[11px] block leading-relaxed line-clamp-2">
                              {isRTL ? item.descriptionAr : item.description}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                              {isRTL ? item.categoryAr : item.category}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-center whitespace-nowrap">
                            <button
                              onClick={() => handleDownload(item.id, item.pdfUrl, item.fileName)}
                              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                isDownloaded
                                  ? 'bg-emerald-600 text-white shadow-2xs'
                                  : 'bg-slate-100 hover:bg-[#1A3754] hover:text-white text-slate-700'
                              }`}
                            >
                              {isDownloaded ? (
                                <>
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>{isRTL ? 'تم' : 'Done'}</span>
                                </>
                              ) : (
                                <>
                                  <Download className="w-3.5 h-3.5" />
                                  <span>PDF ({item.fileSize})</span>
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl p-10 border border-slate-200/90 text-center space-y-3">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800 font-arabic">
                  {isRTL ? 'لا توجد وثائق مطابقة' : 'No documents match your query'}
                </h4>
                <p className="text-xs text-slate-500 font-arabic">
                  {isRTL
                    ? 'يرجى تجربة كلمات بحث أخرى أو اختيار تبويب آخر من الأعلى.'
                    : 'Try searching for different keywords or select another section above.'}
                </p>
              </div>
            )}
          </div>

        </div>
      )}

        </div>
      </div>

    </section>
  );
};
