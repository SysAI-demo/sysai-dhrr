import React, { useState } from 'react';
import {
  Building2,
  Network,
  TrendingUp,
  CheckCircle2,
  Compass,
  Target,
  HeartHandshake,
  Users,
  Handshake,
  Sparkles,
  Award,
  Zap,
  BookOpen
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

type AboutTab = 'about' | 'structure' | 'strategy';

export const AboutSection: React.FC = () => {
  const { isRTL } = useAccessibility();
  const [activeTab, setActiveTab] = useState<AboutTab>('about');

  const bulletPointsEn = [
    'Holding several training programs for human resources working in government departments, authorities and institutions.',
    'Qualifying job seekers in areas that meet the needs of the labour market.',
    'Continuously trying to provide job opportunities for citizens according to their qualifications and abilities.',
    'Directing the career path of human cadres.',
    'Implementing human resources systems applicable in the Emirate and continuously studying their development to keep pace with global development.'
  ];

  const bulletPointsAr = [
    'عقد وتنفيذ البرامج التدريبية والتأهيلية للموارد البشرية العاملة في الدوائر والهيئات والمؤسسات الحكومية.',
    'تأهيل وتدريب الباحثين عن عمل في المجالات والتخصصات التي تلبي احتياجات سوق العمل.',
    'السعي المستمر لتوفير وتأمين فرص عمل مناسبة للمواطنين وفقاً لمؤهلاتهم وقدراتهم.',
    'توجيه وتطوير المسار المهني والوظيفي للكوادر البشرية.',
    'تطبيق أنظمة وتشريعات الموارد البشرية المعمول بها في الإمارة ودراسة تطويرها باستمرار لمواكبة التطورات العالمية.'
  ];

  const valuesData = [
    {
      titleEn: 'Career belonging',
      descEn: 'Loyalty and devotion to work.',
      titleAr: 'الانتماء الوظيفي',
      descAr: 'الولاء والإخلاص في العمل.',
      icon: HeartHandshake
    },
    {
      titleEn: 'Team spirit',
      descEn: 'Cooperation between the employees to strengthen and build relationships to provide a conducive working environment.',
      titleAr: 'روح الفريق',
      descAr: 'التعاون بين الموظفين لتعزيز وبناء العلاقات لتوفير بيئة عمل ملائمة.',
      icon: Users
    },
    {
      titleEn: 'Strengthening partnerships',
      descEn: 'Effective communication and positive collaboration with stakeholders across all government and private sectors.',
      titleAr: 'تعزيز الشراكات',
      descAr: 'التواصل الفعال والتعاون الإيجابي مع المعنيين في مختلف القطاعات الحكومية والخاصة.',
      icon: Handshake
    },
    {
      titleEn: 'Creativity & innovation',
      descEn: 'Creative thinking with the aim of continuous improvement and development in the work environment.',
      titleAr: 'الإبداع والابتكار',
      descAr: 'التفكير الخلاق بهدف التحسين والتطوير المستمر في بيئة العمل.',
      icon: Sparkles
    },
    {
      titleEn: 'Professionalism',
      descEn: 'Knowhow, accuracy and workmanship.',
      titleAr: 'الاحترافية والمهنية',
      descAr: 'المعرفة، الدقة، وإتقان العمل.',
      icon: Award
    },
    {
      titleEn: 'Empowerment',
      descEn: 'Providing a positive environment to motivate human resources staff to give unconditionally in the best interest of the work.',
      titleAr: 'التمكين',
      descAr: 'توفير بيئة إيجابية لتحفيز كوادر الموارد البشرية على العطاء بلا حدود لصالح العمل.',
      icon: Zap
    },
    {
      titleEn: 'Deepening knowledge',
      descEn: 'Keeping, exchanging and transferring knowledge through the use of staff’s thinking and reducing wastage.',
      titleAr: 'ترسيخ المعرفة',
      descAr: 'حفظ وتبادل ونقل المعرفة من خلال استثمار فكر الموظفين والحد من الهدر.',
      icon: BookOpen
    }
  ];

  const strategicObjectivesEn = [
    {
      num: '01',
      title: 'Sustainable HR Systems',
      titleAr: 'استدامة الأنظمة',
      text: 'Continuous development of the human resources system to achieve sustainability and look ahead.',
      textAr: 'التطوير المستمر لمنظومة الموارد البشرية لتحقيق الاستدامة واستشراف المستقبل.'
    },
    {
      num: '02',
      title: 'Rights & Job Satisfaction',
      titleAr: 'تنظيم الحقوق والواجبات',
      text: 'Organising rights and defining duties according to the Human Resources Law and its Implementing Regulation and keeping pace with the requirements for achieving job satisfaction.',
      textAr: 'تنظيم الحقوق وتحديد الواجبات وفقاً لقانون الموارد البشرية ولائحته التنفيذية ومواكبة متطلبات تحقيق الرضا الوظيفي.'
    },
    {
      num: '03',
      title: 'Service Excellence',
      titleAr: 'التميز المؤسسي والخدمي',
      text: 'Excellence in providing best service practices according to the best standards of quality and excellence.',
      textAr: 'التميز في تقديم أفضل الممارسات الخدمية وفقاً لأعلى معايير الجودة والريادة.'
    }
  ];

  return (
    <section id="about" className="py-6 sm:py-8 max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-20 font-ibm-plex space-y-6">
      
      {/* 3 Interactive Header Bubbles on Top */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <button
          onClick={() => setActiveTab('about')}
          className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-xs ${
            activeTab === 'about'
              ? 'bg-[#1A3754] text-white shadow-md scale-105 ring-2 ring-[#1A3754]/30'
              : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-[#1A3754] border border-slate-200/90'
          }`}
        >
          <Building2 className={`w-4 h-4 ${activeTab === 'about' ? 'text-blue-200' : 'text-slate-500'}`} />
          <span>{isRTL ? 'عن الدائرة' : 'About the Department'}</span>
        </button>

        <button
          onClick={() => setActiveTab('structure')}
          className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-xs ${
            activeTab === 'structure'
              ? 'bg-[#1A3754] text-white shadow-md scale-105 ring-2 ring-[#1A3754]/30'
              : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-[#1A3754] border border-slate-200/90'
          }`}
        >
          <Network className={`w-4 h-4 ${activeTab === 'structure' ? 'text-blue-200' : 'text-slate-500'}`} />
          <span>{isRTL ? 'الهيكل التنظيمي' : 'Organizational Structure'}</span>
        </button>

        <button
          onClick={() => setActiveTab('strategy')}
          className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-xs ${
            activeTab === 'strategy'
              ? 'bg-[#1A3754] text-white shadow-md scale-105 ring-2 ring-[#1A3754]/30'
              : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-[#1A3754] border border-slate-200/90'
          }`}
        >
          <TrendingUp className={`w-4 h-4 ${activeTab === 'strategy' ? 'text-blue-200' : 'text-slate-500'}`} />
          <span>{isRTL ? 'استراتيجية الدائرة' : "Department's Strategy"}</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="w-full">
        {/* ================= ABOUT TAB ================= */}
        {activeTab === 'about' && (
          <div id="tab-about-content" className="animate-in fade-in duration-300 w-full">
            
            {/* Establishment Overview Card - Wide full-width layout */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
              
              {/* Main descriptive paragraph */}
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
                {isRTL
                  ? 'تأسست دائرة الموارد البشرية بموجب المرسوم الأميري رقم (22) لسنة 2010م، والذي نص على دمج كل من دائرة الرقابة الإدارية المنشأة منذ عام 1981م ودائرة تنمية الموارد البشرية المنشأة منذ عام 2003م. وتهدف الدائرة إلى تنمية وتطوير الموارد البشرية في إمارة الشارقة بما يتواكب مع أهداف التطوير الإداري والتقني في القطاع الحكومي على المستوى العالمي، ورفع الإنتاجية لتحسين مستوى الأداء الوظيفي من خلال:'
                  : 'The Department of Human Resources was established by Emiri Decree No. (22) of 2010, which provided for the merger of each of the Administrative Control Department established since 1981 and the Human Resources Development Department established since 2003. It aims at developing Human Resources in Sharjah in line with the objectives of administrative and technical development in the government sector on the global level, and raising productivity to improve the level of job performance through:'}
              </p>

              {/* Objectives Grid - Multi-column to fit on one screen without scrolling */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                {(isRTL ? bulletPointsAr : bulletPointsEn).map((point, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100/90 hover:border-[#1A3754]/30 hover:bg-[#1A3754]/5 transition-all ${
                      index === 4 && (isRTL ? bulletPointsAr : bulletPointsEn).length === 5 ? 'md:col-span-2 lg:col-span-2' : ''
                    }`}
                  >
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#1A3754]/10 text-[#1A3754] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-[13px] text-slate-800 leading-snug font-medium">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* ================= STRUCTURE TAB ================= */}
        {activeTab === 'structure' && (
          <div id="tab-structure-content" className="animate-in fade-in duration-300">
            {/* Empty - Ready for custom content */}
          </div>
        )}

        {/* ================= STRATEGY TAB ================= */}
        {activeTab === 'strategy' && (
          <div id="tab-strategy-content" className="animate-in fade-in duration-300 w-full space-y-6">
            
            {/* Top Grid: Vision & Message */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* Vision Card - Elegant high contrast badge */}
              <div className="lg:col-span-4 bg-[#1A3754] text-white rounded-3xl p-6 sm:p-7 shadow-sm border border-white/10 flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center gap-2 text-blue-200">
                    <Compass className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {isRTL ? 'الرؤية' : 'Vision'}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-arabic leading-snug text-white">
                    "{isRTL ? 'ثروة بشرية لريادة حكومية' : 'Human wealth for government leadership'}"
                  </h3>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs text-blue-200/80">
                  {isRTL ? 'استراتيجية دائرة الموارد البشرية' : 'Directorate of Human Resources Strategy'}
                </div>
              </div>

              {/* The Message (Mission) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/90 flex flex-col justify-between space-y-3">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-[#1A3754]">
                    <Target className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {isRTL ? 'الرسالة' : 'The Message'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-normal">
                    {isRTL
                      ? 'تحقيق الريادة الحكومية برأس مال بشري مستدام لتنظيم وضمان حقوق رأس المال البشري من خلال تطبيق قانون الموارد البشرية ولائحته التنفيذية، والتطوير المستمر لموظفي حكومة الشارقة والباحثين عن عمل عبر خطط تطويرية شاملة.'
                      : 'Achieving government leadership with a sustainable human capital to organise and guarantee human capital rights through the application of Human Resources Law and its implementing regulation, and the continuous development of Sharjah government employees and job seekers through comprehensive development plans.'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    {isRTL ? 'رأس مال بشري مستدام' : 'Sustainable Capital'}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    {isRTL ? 'تطبيق القانون واللوائح' : 'Legal Compliance'}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    {isRTL ? 'تطوير الكفاءات الوطنية' : 'Workforce Development'}
                  </span>
                </div>
              </div>

            </div>

            {/* Strategic Objectives (3 Pillars) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1A3754]" />
                  <h3 className="text-sm sm:text-base font-bold text-[#1A3754] font-arabic">
                    {isRTL ? 'الأهداف الاستراتيجية' : 'Strategic Objectives'}
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {isRTL ? '3 أهداف رئيسية' : '3 Core Pillars'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {strategicObjectivesEn.map((obj, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100/90 hover:border-[#1A3754]/30 hover:bg-[#1A3754]/5 transition-all flex flex-col justify-between space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#1A3754] bg-[#1A3754]/10 px-2 py-0.5 rounded-md font-mono">
                        {obj.num}
                      </span>
                      <span className="text-xs font-bold text-slate-800 font-arabic">
                        {isRTL ? obj.titleAr : obj.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isRTL ? obj.textAr : obj.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Institutional Values (7 Core Values) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1A3754]" />
                  <h3 className="text-sm sm:text-base font-bold text-[#1A3754] font-arabic">
                    {isRTL ? 'القيم المؤسسية' : 'Institutional Values'}
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {isRTL ? '7 قيم جوهرية' : '7 Core Values'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {valuesData.map((val, idx) => {
                  const Icon = val.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl bg-slate-50 border border-slate-100/90 hover:border-[#1A3754]/30 hover:bg-[#1A3754]/5 transition-all space-y-1.5 ${
                        idx === 6 ? 'sm:col-span-2 lg:col-span-3 xl:col-span-1' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2 text-[#1A3754]">
                        <div className="w-6 h-6 rounded-lg bg-[#1A3754]/10 flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-xs sm:text-[13px] font-bold font-arabic leading-tight text-slate-900">
                          {isRTL ? val.titleAr : val.titleEn}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isRTL ? val.descAr : val.descEn}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}
      </div>

    </section>
  );
};
