import React, { useState } from 'react';
import {
  UserCheck,
  UserSearch,
  Handshake,
  ChevronRight,
  ChevronLeft,
  LogIn,
  GraduationCap,
  School,
  Building2,
  BookOpen,
  Award,
  ExternalLink,
  Mail,
  Phone,
  Sparkles,
  UserPlus,
  Info,
  FileText,
  FolderCheck,
  CheckCircle2,
  HelpCircle,
  PlayCircle,
  PhoneCall,
  Briefcase,
  Users,
  ClipboardList,
  Play,
  FileCheck,
  Calendar,
  AlertCircle,
  Check,
  Camera,
  CreditCard,
  Globe,
  BookMarked,
  FileBadge,
  ShieldCheck,
  Scroll,
  Image as ImageIcon,
  BadgeCheck,
  Clock,
  Shield,
  FileSpreadsheet,
  HeartHandshake,
  MessageSquareShare,
  Smartphone,
  Monitor,
  MousePointerClick,
  Smile,
  FileSearch,
  MapPin,
  Sparkles as SparklesIcon,
  Shirt,
  Timer,
  Video,
  Wrench,
  CheckCheck
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { QuickAccessItem } from '../types';

interface EServicesSectionProps {
  onSelectService?: (groupTitle: string, item: QuickAccessItem) => void;
}

type MenuCategory = 'employee' | 'jobseekers' | 'partners';
type JobSeekerServiceId = 'registration' | 'qualification' | 'field-training' | 'nomination';
type JobSeekerSubTabId = 'about' | 'details' | 'documents' | 'requirements' | 'faqs' | 'video' | 'contact';

export const EServicesSection: React.FC<EServicesSectionProps> = () => {
  const { isRTL } = useAccessibility();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('employee');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('self-service-login');

  // Job Seekers 4 Bubbles and 7 Sub-Bubbles state
  const [selectedJobSeekerService, setSelectedJobSeekerService] = useState<JobSeekerServiceId>('registration');
  const [selectedJobSeekerSubTab, setSelectedJobSeekerSubTab] = useState<JobSeekerSubTabId>('about');

  const employeeSubItems = [
    {
      id: 'self-service-login',
      titleEn: 'Self-Service Login',
      titleAr: 'تسجيل دخول الخدمة الذاتية',
      icon: LogIn
    },
    {
      id: 'training-login-admin',
      titleEn: 'Training Login for Admin',
      titleAr: 'دخول التدريب للمشرفين',
      icon: GraduationCap,
      descEn: 'Administrative portal to manage annual training plans, evaluate training needs, approve employee nominations, and track career development programs.',
      descAr: 'بوابة مخصصة للمشرفين والمسؤولين لإدارة الخطط التدريبية السنوية، اعتماد ترشيحات الموظفين، ومتابعة برامج التأهيل والتطوير المهني.',
      portalUrl: 'https://hr.sharjah.ae/'
    }
  ];

  const partnerSubItems = [
    {
      id: 'lecturer',
      titleEn: 'Lecturer',
      titleAr: 'المحاضرون والمدربون',
      descEn: 'The Directorate is keen to attract candidates who are qualified on the educational and professional levels to provide the training programs, in accordance with quality training standards and specifications through the provision of a system that enables the partners from among institutes and training centres and independent lecturers to register in the Directorate to provide training programs to employees of the Government of Sharjah.',
      descAr: 'تحرص الدائرة على استقطاب الكفاءات المؤهلة علمياً ومهنياً لتقديم البرامج التدريبية وفق معايير ومواصفات الجودة التدريبية، وذلك من خلال توفير نظام يتيح للشركاء من المعاهد والمراكز التدريبية والمحاضرين المستقلين التسجيل في الدائرة لتقديم البرامج التدريبية لموظفي حكومة الشارقة.',
      icon: Award,
      portalUrl: 'https://hr.sharjah.ae/'
    },
    {
      id: 'training-institutes-centres',
      titleEn: 'Training Institutes and Centres',
      titleAr: 'المعاهد والمراكز التدريبية',
      descEn: 'The Directorate is keen to attract candidates who are qualified on the educational and professional levels to provide the training programs, in accordance with quality training standards and specifications through the provision of a system that enables the partners from among institutes, training centres and independent lecturers to register in the Directorate to provide training programs to employees of the Government of Sharjah.',
      descAr: 'تحرص الدائرة على استقطاب الكفاءات المؤهلة علمياً ومهنياً لتقديم البرامج التدريبية وفق معايير ومواصفات الجودة التدريبية، وذلك من خلال توفير نظام يتيح للشركاء من المعاهد والمراكز التدريبية والمحاضرين المستقلين التسجيل في الدائرة لتقديم البرامج التدريبية لموظفي حكومة الشارقة.',
      icon: School,
      portalUrl: 'https://hr.sharjah.ae/'
    },
    {
      id: 'public-private-sector',
      titleEn: 'Public and Private Sector',
      titleAr: 'القطاع الحكومي والخاص',
      descEn: 'The Directorate of Human Resources is keen to strengthen and reinforce the strategic partnership relations and mutual cooperation between public and private sector institutions to support educating, training, rehabilitating and hiring UAE national labour forces.',
      descAr: 'تحرص دائرة الموارد البشرية على تعزيز وتوطيد علاقات الشراكة الاستراتيجية والتعاون المشترك بين مؤسسات القطاعين العام والخاص لدعم مسيرة تعليم وتدريب وتأهيل وتوظيف الكوادر الوطنية.',
      icon: Building2,
      portalUrl: 'https://hr.sharjah.ae/'
    },
    {
      id: 'academic-bodies',
      titleEn: 'Academic Bodies',
      titleAr: 'الجهات والمؤسسات الأكاديمية',
      descEn: 'The Directorate of Human Resources is keen to strengthen scientific and professional cooperation with universities and colleges in continuing education, training, research, and professional consultations.',
      descAr: 'تحرص دائرة الموارد البشرية على تعزيز وتوطيد علاقات التعاون العلمي والمهني مع جامعات وكليات الدولة في مجال التعليم المستمر، البرامج التدريبية، والبحوث الأكاديمية والاستشارات المهنية.',
      icon: BookOpen,
      portalUrl: 'https://hr.sharjah.ae/'
    }
  ];

  // Self-Service Features list (features only)
  const selfServiceFeaturesEn = [
    'The possibility of accessing personal, administrative and financial data at any time and in any place.',
    'The possibility for the employee to check his leave balance or the leaves he used during a given period.',
    'The possibility of reviewing the sequence of self-actions since his appointment and the possibility of printing each action.',
    'Helps the employee to communicate with the department of administrative affairs in the Directorate or the body for which he works, by converting all administrative services into electronic services such as leaves, requesting a certificate to whom it may concern, requesting correction of data, requesting travel tickets, etc.',
    'The System provides a performance evaluation service where the direct supervisor can electronically evaluate the employee and reveal it to him the evaluation after its adoption.',
    'The possibility of obtaining health insurance data according to the category of the employee, getting informed about its benefits and searching for medical network such as hospitals, health centres, pharmacies etc., and filing any complaint or giving any remark directly to Sharjah Health Authority.'
  ];

  const selfServiceFeaturesAr = [
    'إمكانية الوصول إلى البيانات الشخصية والإدارية والمالية في أي وقت ومن أي مكان.',
    'إمكانية الاطلاع على رصيد الإجازات ومتابعة سجل الإجازات المستخدمة خلال فترة محددة.',
    'إمكانية مراجعة التسلسل الزمني للإجراءات والقرارات الوظيفية منذ التعيين مع إمكانية طباعتها.',
    'تسهيل التواصل مع إدارة الشؤون الإدارية بالدائرة أو جهة العمل من خلال تحويل كافة الخدمات الإدارية إلى إلكترونية (طلب إجازات، شهادة لمن يهمه الأمر، تعديل البيانات، تذاكر السفر، وغيرها).',
    'توفير خدمة تقييم الأداء السنوي إلكترونياً من قبل المسؤول المباشر واطلاع الموظف على التقييم بعد اعتماده.',
    'الحصول على بيانات التأمين الصحي ومعرفة المزايا والبحث في الشبكة الطبية (المستشفيات، المراكز الصحية، والصيدليات) وتقديم الشكاوى والملاحظات مباشرة لهيئة الشارقة للصحية.'
  ];

  // Training System Features list
  const trainingFeaturesEn = [
    'The possibility of seeing each training programme plan and registering in the programs offered.',
    'The possibility for the government departments and institutions to register in the system and give their employees the opportunity to participate in the training programmes.',
    'Evaluation of training programmes by the employee.',
    'Evaluation of records for the employee.',
    'Electronic Certification.'
  ];

  const trainingFeaturesAr = [
    'إمكانية الاطلاع على خطة كل برنامج تدريبي والتسجيل في البرامج المطروحة.',
    'إمكانية قيام الدوائر والمؤسسات الحكومية بالتسجيل في النظام وإتاحة الفرصة لموظفيها للمشاركة في البرامج التدريبية.',
    'تقييم البرامج التدريبية من قبل الموظف.',
    'تقييم السجلات التدريبية للموظف.',
    'إصدار الشهادات الإلكترونية المعتمدة.'
  ];

  // Job Seekers Features list
  const jobSeekersFeaturesEn = [
    'Receiving job seekers, registering their applications electronically, verifying them and archiving required documents in accordance with the obligations and procedures adopted, as well as following up the process of updating their data in order to optimal use of the services provided by the Directorate.',
    'Providing career guidance and professional rehabilitation programs which are prepared and designed in response to the needs of the labour market, and implementing them according to the scientific and professional standards adopted, in order to raise awareness of the needs and requirements of the labour market, and provide them with the professional knowledge and experience that will enable them to enter business communities with confidence.',
    'Preparing job seekers and empowering them to enter the labour market by giving them opportunities for field training in the public and private sectors and for exercising actual work to gain practical experience and skills for the labour market.',
    'Nominating job seekers for the right jobs in the public and private sectors, commensurate with their qualifications and abilities, following the practical methods and professional rules applicable and as required by the recruiting entities.'
  ];

  const jobSeekersFeaturesAr = [
    'استقبال الباحثين عن عمل وتسجيل طلباتهم إلكترونياً وتدقيقها وأرشفة المستندات المطلوبة وفقاً للضوابط والإجراءات المعتمدة، ومتابعة تحديث بياناتهم لتحقيق الاستفادة المثلى من الخدمات التي تقدمها الدائرة.',
    'تقديم برامج الإرشاد المهني والتأهيل الوظيفي المعدة والمصممة وفقاً لاحتياجات سوق العمل، وتنفيذها وفق المعايير العلمية والمهنية المعتمدة لرفع الوعي بمتطلبات سوق العمل وتزويدهم بالمعارف والخبرات المهنية التي تمكنهم من دخول مجتمعات الأعمال بكل ثقة.',
    'إعداد الباحثين عن عمل وتمكينهم من دخول سوق العمل عبر إتاحة فرص التدريب الميداني في القطاعين الحكومي والخاص وممارسة العمل الفعلي لاكتساب المهارات والخبرات العملية اللازمة.',
    'ترشيح الباحثين عن عمل للوظائف المناسبة في القطاعين الحكومي والخاص بما يتناسب مع مؤهلاتهم وقدراتهم، وفق الأساليب العملية والقواعد المهنية المعمول بها وبحسب متطلبات الجهات الطالبة للتوظيف.'
  ];

  // 4 Primary Bubbles for Job Seekers
  const jobSeekerMainBubbles = [
    {
      id: 'registration' as JobSeekerServiceId,
      nameEn: 'Registration',
      nameAr: 'التسجيل',
      icon: ClipboardList
    },
    {
      id: 'qualification' as JobSeekerServiceId,
      nameEn: 'Qualification',
      nameAr: 'التأهيل',
      icon: GraduationCap
    },
    {
      id: 'field-training' as JobSeekerServiceId,
      nameEn: 'Field Training',
      nameAr: 'التدريب الميداني',
      icon: Briefcase
    },
    {
      id: 'nomination' as JobSeekerServiceId,
      nameEn: 'Nomination for Job Interviews',
      nameAr: 'الترشيح للمقابلات الوظيفية',
      icon: Users
    }
  ];

  // 7 Sub Bubbles for each service (customized dynamically for services where needed)
  const getSubBubbleLabel = (subTabId: JobSeekerSubTabId, serviceId: JobSeekerServiceId, rtl: boolean) => {
    if (serviceId === 'qualification' && subTabId === 'documents') {
      return rtl ? 'الخطة التأهيلية' : 'Qualification Plan';
    }
    const defaultTab = jobSeekerSubBubbles.find(s => s.id === subTabId);
    if (!defaultTab) return '';
    return rtl ? defaultTab.labelAr : defaultTab.labelEn;
  };

  const jobSeekerSubBubbles = [
    { id: 'about' as JobSeekerSubTabId, labelEn: 'About', labelAr: 'عن الخدمة', icon: Info },
    { id: 'details' as JobSeekerSubTabId, labelEn: 'Details', labelAr: 'التفاصيل', icon: FileText },
    { id: 'documents' as JobSeekerSubTabId, labelEn: 'Required Documents', labelAr: 'الوثائق المطلوبة', icon: FolderCheck },
    { id: 'requirements' as JobSeekerSubTabId, labelEn: 'Requirements', labelAr: 'الشروط والمتطلبات', icon: CheckCircle2 },
    { id: 'faqs' as JobSeekerSubTabId, labelEn: 'FAQs', labelAr: 'الأسئلة الشائعة', icon: HelpCircle },
    { id: 'video' as JobSeekerSubTabId, labelEn: 'Video', labelAr: 'فيديو تعريفي', icon: PlayCircle },
    { id: 'contact' as JobSeekerSubTabId, labelEn: 'Contact Us', labelAr: 'اتصل بنا', icon: PhoneCall }
  ];

  // Comprehensive data dictionary for the 4 bubbles and 7 sub-bubbles
  const jobSeekerDetailsData = {
    registration: {
      aboutEn: 'The Directorate provides the service of receiving job seekers and registering their applications electronically in the database of the Directorate of Human Resources and archiving the required documents in accordance with the approved obligations and procedures, as well as following up the process of updating their data to achieve optimal use of the Directorate’s services.',
      aboutAr: 'توفر الدائرة خدمة استقبال الباحثين عن عمل وتسجيل طلباتهم إلكترونياً في قاعدة بيانات دائرة الموارد البشرية وأرشفة المستندات المطلوبة وفقاً للضوابط والإجراءات المعتمدة، ومتابعة تحديث بياناتهم لتحقيق الاستفادة المثلى من خدمات الدائرة.',
      detailsIntroEn: 'To benefit from job seekers’ services, you can register in the database of the Directorate of Human Resources through the following steps:',
      detailsIntroAr: 'للاستفادة من خدمات الباحثين عن عمل، يمكنك التسجيل في قاعدة بيانات دائرة الموارد البشرية من خلال الخطوات التالية:',
      stepsEn: [
        {
          step: 'First Step',
          title: 'Logging in to the job seekers portal.'
        },
        {
          step: 'Second Step',
          title: 'Registration of a new job seeker – Filling the electronic registration application.'
        },
        {
          step: 'Third Step',
          title: 'Please read the instructions before online registration and agree on the registration terms and the requirements.',
          instructionsHeader: 'Please read the following instructions very carefully before starting to fill the online registration form:',
          instructions: [
            'Upon registration, the job seeker shall create and keep their own username and password.',
            'Please fill out all requirements marked with an asterisk (*), noting that incomplete applications will not be considered.',
            'Please make sure that the required documents are attached. All uploaded documents must be clear, and the file must be in (PDF) format and the personal photo in (JPG) format.',
            'Your online registration request can be completed by logging into the system and using the username and password (within the specified period of one month from the date of the application).'
          ]
        },
        {
          step: 'Fourth Step',
          title: 'Filling out the online application to register the job seeker data.'
        },
        {
          step: 'Fifth Step',
          title: 'Attaching all required documents.'
        }
      ],
      stepsAr: [
        {
          step: 'الخطوة الأولى',
          title: 'تسجيل الدخول إلى بوابة الباحثين عن عمل.'
        },
        {
          step: 'الخطوة الثانية',
          title: 'تسجيل باحث عن عمل جديد – تعبئة طلب التسجيل الإلكتروني.'
        },
        {
          step: 'الخطوة الثالثة',
          title: 'يرجى قراءة التعليمات قبل التسجيل الإلكتروني والموافقة على شروط ومتطلبات التسجيل.',
          instructionsHeader: 'يرجى قراءة التعليمات التالية بعناية فائقة قبل البدء في ملء استمارة التسجيل الإلكتروني:',
          instructions: [
            'عند التسجيل، يقوم الباحث عن عمل بإنشاء اسم مستخدم وكلمة مرور خاصة به والاحتفاظ بهما.',
            'يرجى تعبئة كافة الحقول المطلوبة والمشار إليها بعلامة (*)، علماً بأنه لن يتم النظر في الطلبات غير المكتملة.',
            'يرجى التأكد من إرفاق الوثائق المطلوبة؛ يجب أن تكون جميع المستندات واضحة وبصيغة (PDF) والصورة الشخصية بصيغة (JPG).',
            'يمكن استكمال طلب التسجيل الإلكتروني بتسجيل الدخول إلى النظام باستخدام اسم المستخدم وكلمة المرور (خلال مدة محددة بشهر واحد من تاريخ تقديم الطلب).'
          ]
        },
        {
          step: 'الخطوة الرابعة',
          title: 'تعبئة استمارة التسجيل الإلكتروني لبيانات الباحث عن عمل.'
        },
        {
          step: 'الخطوة الخامسة',
          title: 'إرفاق كافة المستندات والوثائق المطلوبة.'
        }
      ],
      detailsEn: [
        'First Step - Logging in to the job seekers portal.',
        'Second Step - Registration of a new job seeker – Filling the electronic registration application.',
        'Third Step - Please read the instructions before online registration and agree on the registration terms and the requirements.',
        'Fourth Step - Filling out the online application to register the job seeker data.',
        'Fifth Step - Attaching all required documents.'
      ],
      detailsAr: [
        'الخطوة الأولى - تسجيل الدخول إلى بوابة الباحثين عن عمل.',
        'الخطوة الثانية - تسجيل باحث عن عمل جديد – تعبئة طلب التسجيل الإلكتروني.',
        'الخطوة الثالثة - قراءة التعليمات قبل التسجيل الإلكتروني والموافقة على الشروط.',
        'الخطوة الرابعة - تعبئة استمارة التسجيل الإلكتروني لبيانات الباحث عن عمل.',
        'الخطوة الخامسة - إرفاق كافة المستندات المطلوبة.'
      ],
      documentsIntroEn: 'Documents required for registration in the database of the Directorate of Human Resources:',
      documentsIntroAr: 'المستندات والوثائق المطلوبة للتسجيل في قاعدة بيانات دائرة الموارد البشرية:',
      visualDocuments: [
        {
          num: 1,
          labelEn: 'A profile photo in GPJ format',
          labelAr: 'صورة شخصية بصيغة (JPG)',
          icon: ImageIcon
        },
        {
          num: 2,
          labelEn: 'A valid ID card (a copy of both sides)',
          labelAr: 'بطاقة هوية سارية المفعول (صورة عن الوجهين)',
          icon: CreditCard
        },
        {
          num: 3,
          labelEn: 'Document 3',
          labelAr: 'جواز السفر (ساري المفعول)',
          icon: Globe
        },
        {
          num: 4,
          labelEn: 'A family Book',
          labelAr: 'خلاصة القيد (كاملة)',
          icon: BookMarked
        },
        {
          num: 5,
          labelEn: 'Page of the head of the family',
          labelAr: 'صفحة رب الأسرة في خلاصة القيد',
          icon: Scroll
        },
        {
          num: 6,
          labelEn: "Job seaker's name page",
          labelAr: 'صفحة اسم الباحث عن عمل في خلاصة القيد',
          icon: FileBadge
        },
        {
          num: 7,
          labelEn: 'An attested academic certificate (in Arabic with academic transcripts)',
          labelAr: 'مؤهل علمي مصدق (باللغة العربية مع كشف الدرجات)',
          icon: Award
        },
        {
          num: 8,
          labelEn: 'National Service Certificate (To Whom It May Concern)',
          labelAr: 'شهادة الخدمة الوطنية (لمن يهمه الأمر)',
          icon: ShieldCheck
        }
      ],
      documentsEn: [
        'A profile photo in GPJ format',
        'A valid ID card (a copy of both sides)',
        'Document 3 (Passport copy)',
        'A family Book',
        'Page of the head of the family',
        "Job seaker's name page",
        'An attested academic certificate (in Arabic with academic transcripts)',
        'National Service Certificate (To Whom It May Concern)'
      ],
      documentsAr: [
        'صورة شخصية بصيغة (JPG)',
        'بطاقة هوية سارية المفعول (صورة عن الوجهين)',
        'جواز السفر (ساري المفعول)',
        'خلاصة القيد (كاملة)',
        'صفحة رب الأسرة في خلاصة القيد',
        'صفحة اسم الباحث عن عمل في خلاصة القيد',
        'مؤهل علمي مصدق (باللغة العربية مع كشف الدرجات)',
        'شهادة الخدمة الوطنية (لمن يهمه الأمر)'
      ],
      requirementsEn: [
        'Must be a UAE national holding Sharjah citizenship/family book.',
        'Minimum age of 18 years at the time of application.',
        'Proof of completion or exemption from National Service (for male applicants).',
        'All academic documents must be formally attested by competent UAE authorities.',
        'Commitment to keep personal contact information and CV data actively updated.'
      ],
      requirementsAr: [
        'أن يكون المتقدم من مواطني دولة الإمارات من حملة قيد إمارة الشارقة.',
        'ألا يقل عمر المتقدم عن 18 عاماً عند تقديم الطلب.',
        'إتمام متطلبات الخدمة الوطنية والاحتياطية أو إرفاق شهادة الإعفاء الرسمي (للذكور).',
        'تصديق المؤهلات والشهادات الدراسية من الجهات الرسمية المختصة في الدولة.',
        'الالتزام بتحديث بيانات التواصل والسيرة الذاتية بصفة دورية.'
      ],
      registrationRequirements: {
        section1: {
          titleEn: 'Holders of academic qualification and the documents required to be provided for approval:',
          titleAr: 'حملة المؤهلات العلمية والمستندات المطلوبة للاعتماد:',
          num: 1,
          cards: [
            {
              titleEn: 'High school diploma - in the State',
              titleAr: 'شهادة الثانوية العامة - داخل الدولة',
              pointsEn: [
                'Holders of high school diplomas from schools that follow the educational system of the Ministry of Education in the UAE, in addition to the private education system in the State.',
                'A full academic year shall be completed in the event of obtaining a high school diploma or the like, and an official proof shall be brought.',
                'For job seakers having obtained technical secondary school certificates (commercial, technical or industrial) from recognised schools or institutes, they shall bring an official proof.'
              ],
              pointsAr: [
                'حملة شهادات الثانوية العامة من المدارس المتبعة للنظام التعليمي لوزارة التربية والتعليم بالدولة، بالإضافة إلى نظام التعليم الخاص بالدولة.',
                'يشترط استكمال عام دراسي كامل في حال الحصول على شهادة الثانوية العامة أو ما يعادلها، مع إحضار ما يثبت ذلك رسمياً.',
                'بالنسبة للباحثين عن عمل الحاصلين على شهادات الثانوية الفنية (تجارية، فنية أو صناعية) من مدارس أو معاهد معترف بها، يجب إحضار إثبات رسمي.'
              ]
            },
            {
              titleEn: "Diploma and Bachelor's degree - in the State",
              titleAr: 'الدبلوم والبكالوريوس - داخل الدولة',
              pointsEn: [
                'Certificate of the last academic qualification obtained with an academic transcript from public universities in the State.',
                "Certificate of the last academic qualification obtained with an academic transcript attested by the State's private universities."
              ],
              pointsAr: [
                'شهادة آخر مؤهل علمي تم الحصول عليه مع كشف الدرجات الأكاديمي الصادر من الجامعات الحكومية في الدولة.',
                'شهادة آخر مؤهل علمي تم الحصول عليه مع كشف الدرجات الأكاديمي المصدق من الجامعات الخاصة في الدولة.'
              ]
            },
            {
              titleEn: 'Holders of Academic Qualification - Outside the State',
              titleAr: 'حملة المؤهلات العلمية - خارج الدولة',
              pointsEn: [
                'A request for the equivalence of the academic certificate issued outside the State (or to whom it may concern) + the academic qualification certificate obtained with an academic transcript attested by the university (for all academic qualifications) equivalent of a high school or university certificate from the Ministry of Education and Higher Education in the UAE.'
              ],
              pointsAr: [
                'طلب معادلة الشهادة العلمية الصادرة من خارج الدولة (أو شهادة لمن يهمه الأمر) بالإضافة إلى شهادة المؤهل العلمي مع كشف الدرجات المصدق من الجامعة (لكافة المؤهلات) المعادلة لشهادة الثانوية أو الجامعية من وزارة التربية والتعليم والتعليم العالي بالدولة.'
              ]
            }
          ]
        },
        section2: {
          titleEn: 'National Service',
          titleAr: 'الخدمة الوطنية',
          num: 2,
          pointsEn: [
            "Evidence of the job seaker's status of national service from the National and Reserve Service Authority, as follows:",
            'Deferment of national service to complete study or employment (for one year)',
            'Exemption (for a period of 5 years)',
            'All national service requirements completed',
            'Permanent exemption',
            'Not required to perform national service'
          ],
          pointsAr: [
            'إثبات موقف الباحث عن عمل من الخدمة الوطنية الصادر من هيئة الخدمة الوطنية والاحتياطية، وفق ما يلي:',
            'تأجيل الخدمة الوطنية لاستكمال الدراسة أو التوظيف (لمدة سنة واحدة)',
            'إعفاء مؤقت (لمدة 5 سنوات)',
            'إنجاز واستكمال كافة متطلبات الخدمة الوطنية',
            'إعفاء دائم',
            'غير ملزم بأداء الخدمة الوطنية'
          ]
        },
        section3: {
          titleEn: 'Professional Experience',
          titleAr: 'الخبرة المهنية',
          num: 3,
          pointsEn: [
            'Certificate of experience from the previous employer (date of joining work and date of leaving work) with job title and place of work.',
            'Attachment of all professional experiences, if any',
            'Attachment of a letter to Whom It May Concern (not insured) from the General Pension and Social Security Authority'
          ],
          pointsAr: [
            'شهادة خبرة من جهة العمل السابقة (توضح تاريخ الالتحاق وتاريخ ترك العمل) مع المسمى الوظيفي ومقر العمل.',
            'إرفاق كافة شهادات الخبرة المهنية والعملية إن وجدت.',
            'إرفاق شهادة لمن يهمه الأمر (غير مؤمن عليه) صادرة من الهيئة العامة للمعاشات والتأمينات الاجتماعية.'
          ]
        },
        section4: {
          titleEn: 'Residence',
          titleAr: 'إثبات السكن',
          num: 4,
          pointsEn: [
            'Attachment of a copy of the proof of residence (the government housing map or the lease contract) in the event of changing residence or moving from one city to another.',
            'Attachment of a copy of proof of residence for the first cases (in the name of parents or grandparents)',
            'Proof of residence not accepted (in case of expired lease contract - or temporary house plan).'
          ],
          pointsAr: [
            'إرفاق صورة من إثبات السكن (خارطة الإسكان الحكومي أو عقد الإيجار) في حال تغيير السكن أو الانتقال من مدينة إلى أخرى.',
            'إرفاق صورة من إثبات السكن للحالات الأولى (باسم الوالدين أو الأجداد).',
            'لا يُقبل إثبات السكن (في حال كان عقد الإيجار منتهي الصلاحية - أو مخطط مسكن مؤقت).'
          ]
        }
      },
      faqsEn: [
        {
          q: "What are the target groups of job seekers' services?",
          a: 'The Directorate receives applications of job seekers from among citizens and children of female citizens registered in Sharjah only who are unemployed and those having resigned with experience.'
        },
        {
          q: 'What are the registration requirements for citizens?',
          a: 'Providing the required documents (passport, family book, academic certificate, ID card, profile photo, national service certificate for males, proof of expertise (if any), for approval of the application through the job seekers registration system.'
        },
        {
          q: 'What are the registration requirements for children of female citizens?',
          a: 'Providing the required documents (job seaker’s passport, mother’s passport (issued in Sharjah), mother’s family book (issued in Sharjah), profile photo, ID card, birth certificate, academic certificate, proof of expertise (if any), copy of residency permit, for approval of the application through the job seekers registration system.'
        }
      ],
      faqsAr: [
        {
          q: 'ما هي الفئات المستهدفة من خدمات الباحثين عن عمل؟',
          a: 'تستقبل الدائرة طلبات الباحثين عن عمل من المواطنين وأبناء المواطنات المقيدين في إمارة الشارقة فقط من فئة المتعطلين عن العمل ومن فئة المستقيلين من ذوي الخبرة.'
        },
        {
          q: 'ما هي متطلبات وشروط التسجيل لفئة المواطنين؟',
          a: 'توفير المستندات المطلوبة (جواز السفر، خلاصة القيد، المؤهل العلمي، بطاقة الهوية، صورة شخصية، شهادة الخدمة الوطنية للذكور، إثبات الخبرة إن وجد) لاعتماد الطلب عبر نظام تسجيل الباحثين عن عمل.'
        },
        {
          q: 'ما هي متطلبات وشروط التسجيل لفئة أبناء المواطنات؟',
          a: 'توفير المستندات المطلوبة (جواز سفر الباحث عن عمل، جواز سفر الأم الصادر من الشارقة، خلاصة قيد الأم الصادرة من الشارقة، صورة شخصية، بطاقة الهوية، شهادة الميلاد، المؤهل العلمي، إثبات الخبرة إن وجد، وصورة من الإقامة سارية المفعول) لاعتماد الطلب عبر نظام تسجيل الباحثين عن عمل.'
        }
      ],
      videoTitleEn: 'Guide to Job Seeker Electronic Registration & Profile Setup',
      videoTitleAr: 'دليل مرئي: خطوات التسجيل الإلكتروني للباحثين عن عمل وتفعيل الحساب',
      videoDuration: '2:45',
      contactInfo: {
        email: 'jsaldiffin@hr.sharjah.ae',
        phones: ['065078806']
      }
    },
    qualification: {
      aboutEn:
        'Rehabilitation programmes are one of the means provided by the Directorate of Human Resources, and they are relied upon in the rehabilitation and development of job seeking national human resources, and aim to provide rehabilitation and development opportunities for job seekers based on the requirements of the labour market, in accordance with the curricula and standards adopted locally and internationally. They also contribute to providing them with knowledge, professional experience, and professionalism, raising their efficiency and developing their skills to become the first choice in the labour market to fill the available jobs. The qualification programmes available to job seekers are classified into specialised programmes, behavioural programmes, self-development programmes, professional diplomas, and basic qualification programmes such as English language programmes and ICDL.\n\nThe Directorate implements its rehabilitation programmes remotely for a healthy training and rehabilitation environment, and to ensure the adoption of an effective approach to maintain the safety of job seekers and to ensure the continuity of the rehabilitation process, which is one of the priorities of the Directorate’s plans to develop and qualify the category of job seekers.',
      aboutAr:
        'تعد البرامج التأهيلية إحدى الوسائل التي توفرها دائرة الموارد البشرية، ويُعتمد عليها في تأهيل وتطوير الموارد البشرية الوطنية الباحثة عن عمل، وتهدف إلى إتاحة فرص التأهيل والتطوير للباحثين عن عمل بناءً على متطلبات واحتياجات سوق العمل، وفق مناهج ومعايير معتمدة محلياً ودولياً. كما تسهم في تزويدهم بالمعارف والخبرات المهنية والاحترافية ورفع كفاءتهم وصقل مهاراتهم ليكونوا الخيار الأول في سوق العمل لشغل الوظائف المتاحة. وتُصنّف البرامج التأهيلية المتاحة للباحثين عن عمل إلى: برامج تخصصية، برامج سلوكية، برامج تطوير الذات، دبلومات مهنية، وبرامج تأهيلية أساسية مثل برامج اللغة الإنجليزية والرخصة الدولية لقيادة الحاسوب (ICDL).\n\nوتنفذ الدائرة برامجها التأهيلية (عن بُعد) لتوفير بيئة تدريبية وتأهيلية صحية، وضمان اتباع نهج فاعل للحفاظ على سلامة الباحثين عن عمل وضمان استمرارية العملية التأهيلية، والتي تعد إحدى أولويات خطط الدائرة لتطوير وتأهيل فئة الباحثين عن عمل.',
      detailsEn: [
        'The job seeker can participate in the qualifying programmes according to the target group. There are programmes that are intended for high school certificate holders, and others are specialised programmes that depend on the academic specialisation of the job seeker.',
        'Registration mechanism: The Rehabilitation Department announces the electronic qualification programmes through the Directorate\'s social media on hr_sharjah account on Instagram and Twitter (@hr_sharjah).',
        'Direct communication with the target groups of the rehabilitation programmes to inform them of participation.',
        'Attendance rules: Commitment to attendance, where the attendance rate shall be no less than 80%.',
        'Passing requirements: Satisfying all the programme requirements and successfully passing exams to obtain a certificate of participation in qualification programmes.'
      ],
      detailsAr: [
        'يمكن للباحث عن عمل المشاركة في البرامج التأهيلية وفقاً للفئة المستهدفة؛ حيث توجد برامج مخصصة لحملة شهادة الثانوية العامة، وأخرى برامج تخصصية تعتمد على التخصص العلمي والأكاديمي للباحث عن عمل.',
        'آلية التسجيل في البرامج التأهيلية: تعلن إدارة التأهيل عن البرامج التأهيلية الإلكترونية عبر وسائل التواصل الاجتماعي للدائرة عبر حساب hr_sharjah على منصتي إنستغرام وتويتر/إكس.',
        'التواصل المباشر مع الفئات المستهدفة من البرامج التأهيلية لإبلاغهم بفرص المشاركة ومواعيد الانعقاد.',
        'ضوابط الحضور: الالتزام التام بنسبة الحضور المقررة، على ألا تقل نسبة الحضور عن 80%.',
        'متطلبات الحصول على الشهادة: استيفاء جميع متطلبات البرنامج التدريبي واجتياز الاختبارات بنجاح للحصول على شهادة المشاركة في البرامج التأهيلية.'
      ],
      structuredQualificationDetails: {
        introEn: 'The job seeker can participate in the qualifying programmes according to the target group. There are programmes that are intended for high school certificate holders, and others are specialised programmes that depend on the academic specialisation of the job seeker.',
        introAr: 'يمكن للباحث عن عمل المشاركة في البرامج التأهيلية وفقاً للفئة المستهدفة؛ حيث توجد برامج مخصصة لحملة شهادة الثانوية العامة، وأخرى برامج تخصصية تعتمد على التخصص العلمي والأكاديمي للباحث عن عمل.',
        mechanismTitleEn: 'Registration mechanism for qualification programmes:',
        mechanismTitleAr: 'آلية التسجيل في البرامج التأهيلية:',
        mechanismPointsEn: [
          "The Rehabilitation Department announces the electronic qualification programmes through the Directorate's social media on hr_sharjah account on Instagram and Twitter.",
          'Communicating with the target groups of the rehabilitation programmes to inform them of participation.'
        ],
        mechanismPointsAr: [
          'تعلن إدارة التأهيل عن البرامج التأهيلية الإلكترونية عبر منصات التواصل الاجتماعي للدائرة على حساب hr_sharjah على إنستغرام وتويتر.',
          'التواصل مع الفئات المستهدفة من البرامج التأهيلية لإبلاغهم بفرص المشاركة ومواعيد الانعقاد.'
        ],
        rulesTitleEn: 'Attendance rules:',
        rulesTitleAr: 'ضوابط الحضور والاجتياز:',
        rulesPointsEn: [
          'Commitment to attendance, where attendance rate shall be no less than 80%.',
          'Satisfying all the programme requirements, and successfully passing exams, to be able to obtain a certificate of participation in qualification programmes.'
        ],
        rulesPointsAr: [
          'الالتزام بنسبة الحضور، على ألا تقل نسبة الحضور عن 80%.',
          'استيفاء كافة متطلبات البرنامج واجتياز الاختبارات بنجاح للحصول على شهادة المشاركة في البرامج التأهيلية.'
        ]
      },
      documentsEn: [
        'Active Job Seeker Registration ID',
        'Copy of the latest Academic Degree',
        'Training track registration confirmation',
        'Commitment acknowledgment form for program attendance'
      ],
      documentsAr: [
        'رقم الباحث عن عمل المعتمد في المنظومة',
        'صورة من المؤهل الدراسي الأخير',
        'إشعار تأكيد التسجيل في المسار التأهيلي',
        'إقرار الالتزام بحضور ساعات البرنامج التدريبي'
      ],
      requirementsEn: [
        'Job seekers with respect to all academic qualifications shall be registered in the database of the Directorate of Human Resources.'
      ],
      requirementsAr: [
        'تسجيل الباحثين عن عمل من كافة المؤهلات العلمية في قاعدة بيانات دائرة الموارد البشرية.'
      ],
      faqsEn: [
        {
          q: 'What are the types of programmes available to job seekers?',
          a: '• Specialised programmes\n• Behavioural programmes\n• Self-development programmes\n• Professional diplomas\n• Basic Qualification Programmes such as English Language Programs and ICDL'
        },
        {
          q: 'Can I register in any of the programmes offered in the qualification plan?',
          a: 'Yes, you can subscribe in the qualification programmes according to the target group. There are programmes which are intended for high school certificate holders, and others are specialised programmes that depend on the academic specialisation of the job seeker.'
        },
        {
          q: 'What is the benefit that I will get after I pass the qualification programmes?',
          a: '• Obtaining an accredited certificate\n• Investing time in specialised and support programmes that meet the needs of the labour market to improve your skills, develop your capabilities, and increase your chances of employment\n• Identifying the skills and abilities of the job seeker\n• Helping build character and increasing self-confidence\n• Helping in making the right decisions'
        },
        {
          q: 'After I pass the programmes, will I get a job?',
          a: 'Selection falls within the competence of government and private agencies. The authorities conduct job interviews for job seekers according to the qualifications and specialisations that are compatible with the jobs available to them. The more you prove your competencies in the job interview, the stronger the chance of you being selected by the recruiting entities.'
        }
      ],
      faqsAr: [
        {
          q: 'ما هي أنواع البرامج المتاحة للباحثين عن عمل؟',
          a: '• البرامج التخصصية\n• البرامج السلوكية\n• برامج التطوير الذاتي\n• الدبلومات المهنية\n• البرامج التأهيلية الأساسية مثل برامج اللغة الإنجليزية والرخصة الدولية لقيادة الحاسوب (ICDL)'
        },
        {
          q: 'هل يمكنني التسجيل في أي من البرامج المطروحة في الخطة التأهيلية؟',
          a: 'نعم، يمكنك الاشتراك في البرامج التأهيلية وفقاً للفئة المستهدفة؛ حيث توجد برامج مخصصة لحملة شهادة الثانوية العامة، وأخرى برامج تخصصية تعتمد على التخصص العلمي والأكاديمي للباحث عن عمل.'
        },
        {
          q: 'ما هي الفائدة التي سأحصل عليها بعد اجتياز البرامج التأهيلية؟',
          a: '• الحصول على شهادة معتمدة\n• استثمار الوقت في برامج تخصصية ومساندة تلبي احتياجات سوق العمل لصقل مهاراتك وتطوير قدراتك وزيادة فرص توظيفك\n• التعرف على مهارات وقدرات الباحث عن عمل\n• المساعدة في بناء الشخصية وزيادة الثقة بالنفس\n• المساعدة في اتخاذ القرارات السليمة'
        },
        {
          q: 'بعد اجتياز البرامج، هل سأحصل على وظيفة مباشرة؟',
          a: 'عملية الاختيار والتوظيف تدخل ضمن اختصاص الجهات والدوائر الحكومية والخاصة؛ حيث تقوم الجهات بإجراء المقابلات الوظيفية للباحثين عن عمل وفق المؤهلات والتخصصات المتوافقة مع الشواغر المتاحة لديها. وكلما أثبتَّ كفاءتك وجدارتك في المقابلة الوظيفية، زادت فرصة اختيارك من قِبل جهات التوظيف.'
        }
      ],
      videoTitleEn: 'Overview of Professional Qualification Tracks and Career Guidance',
      videoTitleAr: 'نظرة عامة على مسارات التأهيل المهني وبرامج الإرشاد الوظيفي',
      videoDuration: '3:10',
      contactInfo: {
        email: 'trainingjs@hr.sharjah.ae',
        phones: ['065078861', '065078837', '065078879', '065078592']
      }
    },
    'field-training': {
      aboutEn:
        'The Directorate provides field training service (on-the-job training), and it is considered one of the forms of training that is relied upon to enable job seekers to acquire practical experiences by accompanying employees at training agencies in the actual workplace and during daily working hours, while performing their daily job tasks.\n\nThe Directorate shall monitor the implementation of the field training programme, in cooperation with all government and private agencies and their branches in various cities and regions of the Emirate of Sharjah.',
      aboutAr:
        'توفر الدائرة خدمة التدريب الميداني (التدريب على رأس العمل)، وتعد من صور التدريب التي يُعتمد عليها لتمكين الباحثين عن عمل من اكتساب الخبرات العملية من خلال مرافقة الموظفين لدى جهات التدريب في بيئة ومقر العمل الفعلي وأثناء ساعات العمل اليومية، وأثناء تأدية مهامهم الوظيفية اليومية.\n\nوتتولى الدائرة متابعة تنفيذ برنامج التدريب الميداني، بالتعاون مع كافة الجهات والدوائر الحكومية والخاصة وفروعها في مختلف مدن ومناطق إمارة الشارقة.',
      detailsEn: [
        'Selection and matching of candidates based on academic specialization and departmental needs.',
        'Issuance of formal field training placement letters to designated hosting entities.',
        'Supervised workplace training duration ranging from 1 to 3 months.',
        'Periodic progress monitoring by the Directorate training coordinator.',
        'Submission of final performance assessment and issuance of field experience certification.'
      ],
      detailsAr: [
        'ترشيح وتوزيع المتدربين بناءً على التخصص الأكاديمي واحتياجات الجهات المستضيفة.',
        'إصدار خطابات التدريب الميداني الرسمية وتوجيهها للجهات المعنية في الإمارة.',
        'فترة تدريب عملي وإشراف مهني مباشر تتراوح بين شهر إلى 3 أشهر.',
        'متابعة دورية للأداء من قبل منسق التدريب الميداني المعتمد من الدائرة.',
        'تقديم تقرير تقييم الأداء النهائي ومنح شهادة الخبرة الميدانية المعتمدة.'
      ],
      documentsEn: [
        'Official Field Training Application Form',
        'Academic Transcript and Degree Certificate copy',
        'Updated Resume / Curriculum Vitae',
        'Nomination confirmation from the Directorate'
      ],
      documentsAr: [
        'استمارة طلب التدريب الميداني المعتمدة',
        'نسخة من كشف الدرجات والشهادة الأكاديمية',
        'نسخة حديثة من السيرة الذاتية',
        'إشعار الترشيح الصادر من دائرة الموارد البشرية'
      ],
      requirementsEn: [
        'The candidate shall be a job-seeker registered in the Human Resources Directorate’s database, and accordingly, he can enroll in field training depending on specialisation and the field training opportunities available in government and private agencies.',
        'The job seeker must complete all field training procedures prescribed by the Human Resources Directorate.',
        'Abiding by the laws and regulations in force within the training institution.',
        'Committing to the daily attendance and departure registration system.',
        'Obtaining prior permission to get off of work, just like the training institution\'s employees.',
        'Proving proficiency in training and seriousness in achievement.',
        'Committing to morals, good conduct and respect for officials and workers of the training institution.'
      ],
      requirementsAr: [
        'أن يكون المرشح باحثاً عن عمل مسجلاً في قاعدة بيانات دائرة الموارد البشرية، وبناءً عليه يمكنه الالتحاق بالتدريب الميداني حسب التخصص وفرص التدريب الميداني المتاحة في الجهات الحكومية والخاصة.',
        'استكمال الباحث عن عمل لكافة إجراءات التدريب الميداني المقررة من قبل دائرة الموارد البشرية.',
        'الالتزام بالقوانين واللوائح المعمول بها داخل المؤسسة أو الجهة المدربة.',
        'الالتزام بنظام تسجيل الحضور والانصراف اليومي المعتمد في جهة التدريب.',
        'الحصول على إذن مسبق للمغادرة أو الانصراف من العمل أسوة بموظفي جهة التدريب.',
        'إثبات الكفاءة في التدريب والجدية في إنجاز المهام والتكليفات.',
        'الالتزام بالأخلاق وحسن السيرة والسلوك واحترام المسؤولين والعاملين في المؤسسة التدريبية.'
      ],
      fieldTrainingRequirementsCards: [
        {
          num: 1,
          icon: 'BookMarked',
          titleEn: 'Database Registration & Specialisation Match',
          titleAr: 'التسجيل بقاعدة البيانات ومواءمة التخصص',
          textEn: 'The candidate shall be a job-seeker registered in the Human Resources Directorate’s database, and accordingly, he can enroll in field training depending on specialisation and the field training opportunities available in government and private agencies.',
          textAr: 'أن يكون المرشح باحثاً عن عمل مسجلاً في قاعدة بيانات دائرة الموارد البشرية، وبناءً عليه يمكنه الالتحاق بالتدريب الميداني حسب التخصص وفرص التدريب الميداني المتاحة في الجهات الحكومية والخاصة.'
        },
        {
          num: 2,
          icon: 'Clock',
          titleEn: 'Completion of Prescribed Procedures',
          titleAr: 'استكمال الإجراءات المقررة',
          textEn: 'The job seeker must complete all field training procedures prescribed by the Human Resources Directorate.',
          textAr: 'استكمال الباحث عن عمل لكافة إجراءات التدريب الميداني المقررة من قبل دائرة الموارد البشرية.'
        },
        {
          num: 3,
          icon: 'Shield',
          titleEn: 'Compliance with Laws & Regulations',
          titleAr: 'الالتزام بالقوانين واللوائح المعمول بها',
          textEn: 'Abiding by the laws and regulations in force within the training institution.',
          textAr: 'الالتزام بالقوانين واللوائح المعمول بها داخل المؤسسة أو الجهة المدربة.'
        },
        {
          num: 4,
          icon: 'Users',
          titleEn: 'Daily Attendance & Departure System',
          titleAr: 'تسجيل الحضور والانصراف اليومي',
          textEn: 'Committing to the daily attendance and departure registration system.',
          textAr: 'الالتزام بنظام تسجيل الحضور والانصراف اليومي المعتمد في جهة التدريب.'
        },
        {
          num: 5,
          icon: 'HeartHandshake',
          titleEn: 'Prior Permission Protocol',
          titleAr: 'الحصول على إذن مسبق للمغادرة',
          textEn: 'Obtaining prior permission to get off of work, just like the training institution\'s employees.',
          textAr: 'الحصول على إذن مسبق للمغادرة أو الانصراف من العمل أسوة بموظفي جهة التدريب.'
        },
        {
          num: 6,
          icon: 'FileSpreadsheet',
          titleEn: 'Proficiency & High Achievement',
          titleAr: 'إثبات الكفاءة والجدية في التدريب',
          textEn: 'Proving proficiency in training and seriousness in achievement.',
          textAr: 'إثبات الكفاءة في التدريب والجدية في إنجاز المهام والتكليفات.'
        },
        {
          num: 7,
          icon: 'MessageSquareShare',
          titleEn: 'Workplace Ethics & Mutual Respect',
          titleAr: 'حسن السيرة والسلوك والاحترام المتبادل',
          textEn: 'Committing to morals, good conduct and respect for officials and workers of the training institution.',
          textAr: 'الالتزام بالأخلاق وحسن السيرة والسلوك واحترام المسؤولين والعاملين في المؤسسة التدريبية.'
        }
      ],
      faqsEn: [
        {
          q: 'What is the benefit that I will get after I pass the field training?',
          a: '• A field training certificate issued by the Human Resources Directorate.\n• A reward of 1000 dirhams for job seekers with high school diplomas, and 1500 dirhams for job seekers with a university degree.\n• Acquiring field skills in your area of specialisation, and giving different institutions an opportunity to discover your capabilities and energies, which contributes to your access to greater employment opportunities.'
        },
        {
          q: 'When I complete two weeks of field training, and then I stop training with an excuse, will it still be possible to receive the training reward?',
          a: 'You cannot get any reward if you do not complete the period set for field training, as specified in the field training contract.'
        },
        {
          q: 'Will I get a job after the field training?',
          a: 'If you are ready, and have passed the qualification and field training phase required in your field .. This increases your chances of being nominated for job interviews and your chances of being selected for the job by the recruiting entities. The more you prove your worth in the job interview .. the stronger the chance of your selection.'
        }
      ],
      faqsAr: [
        {
          q: 'ما هي الفائدة التي سأحصل عليها بعد اجتياز التدريب الميداني؟',
          a: '• الحصول على شهادة تدريب ميداني صادرة عن دائرة الموارد البشرية.\n• مكافأة مالية قدرها 1000 درهم للباحثين عن عمل من حملة شهادة الثانوية العامة، و1500 درهم لحملة المؤهل الجامعي.\n• اكتساب المهارات الميدانية في مجال تخصصك، وإتاحة الفرصة للمؤسسات المختلفة لاكتشاف قدراتك وطاقاتك، مما يساهم في حصولك على فرص وظيفية أكبر.'
        },
        {
          q: 'عند إكمالي أسبوعين من التدريب الميداني ثم التوقف عن التدريب بعذر، هل يمكنني استلام مكافأة التدريب؟',
          a: 'لا يمكنك الحصول على أي مكافأة في حال عدم إكمال المدة المحددة للتدريب الميداني، والموضحة والمعتمدة في عقد التدريب الميداني.'
        },
        {
          q: 'هل سأحصل على وظيفة بعد التدريب الميداني؟',
          a: 'إذا كنت جاهزاً واجتزت مرحلة التأهيل والتدريب الميداني المطلوبة في مجالك، فإن ذلك يزيد من فرص ترشيحك للمقابلات الوظيفية وفرص اختيارك للوظيفة من قِبل جهات التوظيف. وكلما أثبتَّ جدارتك وكفاءتك في المقابلة الوظيفية، زادت فرصة اختيارك.'
        }
      ],
      videoTitleEn: 'Maximizing Success During Your Field Training & Internship Journey',
      videoTitleAr: 'كيف تحقق أقصى استفادة من تجربة التدريب الميداني في بيئة العمل',
      videoDuration: '3:35',
      contactInfo: {
        email: 'fieldtraining-diffin@hr.sharjah.ae',
        phones: ['065078885', '065078883', '065078881', '065078886']
      }
    },
    nomination: {
      aboutEn:
        'Job interviews are held by nominating job seekers registered in the Human Resources Directorate’s database in accordance with the requirements and conditions for occupying jobs in terms of academic qualifications, financial categories and job specialisations, and to ensure that they comply with the conditions and specifications required for the recruiting entity.',
      aboutAr:
        'تُعقد المقابلات الوظيفية بترشيح الباحثين عن عمل المسجلين في قاعدة بيانات دائرة الموارد البشرية وفقاً لمتطلبات وشروط شغل الوظائف من حيث المؤهلات العلمية، الفئات المالية والتخصصات الوظيفية، والتأكد من مطابقتها للشروط والمواصفات المطلوبة لدى الجهة الطالبة للتوظيف.',
      detailsEn: [
        'The Directorate of Human Resources allows virtual job interviews through Webex programme, to facilitate the process of conducting job interviews for government entities and job seekers, in line with the series of preventive and precautionary measures followed in the State to confront the Novel Coronavirus (COVID-19) pandemic.'
      ],
      detailsAr: [
        'تتيح دائرة الموارد البشرية المقابلات الوظيفية الافتراضية عبر برنامج (Webex)، لتسهيل عملية إجراء المقابلات الوظيفية للجهات الحكومية والباحثين عن عمل، تماشياً مع منظومة الإجراءات والتدابير الوقائية والاحترازية المتبعة في الدولة.'
      ],
      stepsHeadingEn: 'Steps for Virtual Job Interviews',
      stepsHeadingAr: 'خطوات المقابلات الوظيفية الافتراضية',
      virtualJobInterviewsSteps: [
        {
          stepNum: 1,
          icon: 'Smartphone',
          textEn: 'The Directorate informs candidates of the dates of the virtual job interviews by text messages.',
          textAr: 'تقوم الدائرة بإشعار المرشحين بمواعيد المقابلات الوظيفية الافتراضية عبر الرسائل النصية القصيرة.'
        },
        {
          stepNum: 2,
          icon: 'Monitor',
          textEn: 'The interviews are conducted by the interview committee approved by the recruiting government entity seeking recruitment opportunities and in the presence of a representative from the Human Resources Directorate.',
          textAr: 'تُجرى المقابلات من قِبل لجنة المقابلات المعتمدة لدى الجهة الحكومية الطالبة للتوظيف وبحضور ممثل عن دائرة الموارد البشرية.'
        },
        {
          stepNum: 3,
          icon: 'MousePointerClick',
          textEn: 'The government entity seeking recruitment opportunities will select those who meet the appointment conditions.',
          textAr: 'تتولى الجهة الحكومية الطالبة للتوظيف اختيار المرشحين المستوفين لشروط ومعايير التعيين.'
        },
        {
          stepNum: 4,
          icon: 'Smile',
          textEn: 'Sending a text message to the candidate after the job interview stating whether or not he passed the job interview.',
          textAr: 'إرسال رسالة نصية للمرشح بعد المقابلة الوظيفية تفيد بنتيجة المقابلة سواء بالاجتياز أو عدمه.'
        },
        {
          stepNum: 5,
          icon: 'FileSearch',
          textEn: 'Those who are not lucky enough to pass the exams and interviews for the job will be then nominated for the upcoming jobs.',
          textAr: 'المرشحون الذين لم يحالفهم الحظ في اجتياز الاختبارات والمقابلات الوظيفية، يتم ترشيحهم لاحقاً للشواغر والوظائف القادمة.'
        }
      ],
      nominationRequirements: {
        section1HeadingEn: 'Requirements',
        section1HeadingAr: 'الشروط والمتطلبات',
        section1IntroEn: 'The conditions and criteria for nomination for virtual job interviews are as follows:',
        section1IntroAr: 'شروط ومعايير الترشيح للمقابلات الوظيفية الافتراضية هي كالتالي:',
        nominationCriteria: [
          {
            num: 1,
            titleEn: 'Seniority in Registration',
            titleAr: 'أقدمية التسجيل',
            textEn: 'Respecting seniority in registering an employment application in compliance with the principle of priority',
            textAr: 'مراعاة الأقدمية في تسجيل طلب التوظيف إعمالاً لمبدأ الأولوية.'
          },
          {
            num: 2,
            titleEn: 'Seniority in Academic Qualification',
            titleAr: 'أقدمية المؤهل العلمي',
            textEn: 'Respecting seniority in obtaining the academic qualification.',
            textAr: 'مراعاة الأقدمية في الحصول على المؤهل العلمي.'
          },
          {
            num: 3,
            titleEn: 'Passing Qualification & Training',
            titleAr: 'اجتياز البرامج التأهيلية والتدريب',
            textEn: 'Passing the qualifying programmes and the field training programme.',
            textAr: 'اجتياز البرامج التأهيلية وبرنامج التدريب الميداني.'
          },
          {
            num: 4,
            titleEn: 'Willingness & Capability to Work',
            titleAr: 'الرغبة والقدرة على العمل',
            textEn: 'Having willingness and ability to work according to the requirements of the job for which the candidate is nominated.',
            textAr: 'توفر الرغبة والقدرة على العمل وفق متطلبات الوظيفة المرشح لها.'
          },
          {
            num: 5,
            titleEn: 'Unemployed Job Seekers Category',
            titleAr: 'فئة المتعطلين عن العمل',
            textEn: 'Job seekers are nominated from the category of unemployed candidates.',
            textAr: 'ترشيح الباحثين عن عمل من فئة المتعطلين عن العمل.'
          },
          {
            num: 6,
            titleEn: 'Academic & Specialisation Match',
            titleAr: 'تطابق المؤهل والتخصص',
            textEn: 'The nomination is based on correspondence between the academic qualification and the required job specialisation in order to place the right person in the right place to align academic qualifications',
            textAr: 'يرتكز الترشيح على التطابق بين المؤهل العلمي والتخصص الوظيفي المطلوب لوضع الشخص المناسب في المكان المناسب ومواءمة المؤهلات الأكاديمية.'
          },
          {
            num: 7,
            titleEn: 'Geographic Region & Residence',
            titleAr: 'النطاق الجغرافي والإقامة',
            textEn: 'Nomination for job interviews for the positions takes place in the cities and regions where the candidates reside.',
            textAr: 'يتم الترشيح للمقابلات الوظيفية للشواغر في المدن والمناطق التي يقيم فيها المرشحون.'
          }
        ],
        section2HeadingEn: 'Conditions for attending job interviews',
        section2HeadingAr: 'شروط وضوابط حضور المقابلات الوظيفية',
        interviewAttendanceConditions: [
          {
            num: 1,
            titleEn: 'Uniform & Official Dress',
            titleAr: 'الالتزام بالزي الرسمي',
            textEn: 'Commitment to uniform during the interview',
            textAr: 'الالتزام بالزي الرسمي المناسب أثناء المقابلة الوظيفية.'
          },
          {
            num: 2,
            titleEn: 'Clear Personal Name Entry',
            titleAr: 'إدخال الاسم الشخصي بوضوح',
            textEn: 'Enter your personal name clearly and correctly in video communication applications to introduce yourself easier to the administrator',
            textAr: 'إدخال الاسم الشخصي بوضوح وبشكل صحيح في تطبيقات الاتصال المرئي لتسهيل التعريف بنفسك للمسؤول.'
          },
          {
            num: 3,
            titleEn: 'Punctuality & Early Preparation',
            titleAr: 'احترام الموعد والتواجد المبكر',
            textEn: 'Respect the date and time of the interview, get ready for the interview 15 minutes before the time set, and do not leave the programme',
            textAr: 'احترام تاريخ ووقت المقابلة، والاستعداد للمقابلة قبل 15 دقيقة من الموعد المحدد، وعدم مغادرة البرنامج.'
          },
          {
            num: 4,
            titleEn: 'Suitable Environment & Camera Focus',
            titleAr: 'بيئة مناسبة والتركيز على الكاميرا',
            textEn: 'Choose a suitable place to conduct the interview, avoide everything that might cause distraction during the interview, and focus by looking towards the official or towards the camera and not the scree',
            textAr: 'اختيار مكان مناسب لإجراء المقابلة، وتجنب كل ما قد يسبب التشتت، والتركيز بالنظر نحو المسؤول أو نحو الكاميرا وليس الشاشة.'
          },
          {
            num: 5,
            titleEn: 'Technical Glitch Reporting',
            titleAr: 'الإبلاغ الفوري عن الخلل الفني',
            textEn: 'In the event of a technical defect or failure before or during the interview, inform the official in charge of the interview immediately, so that it can be fixed and so that you do not lose your right',
            textAr: 'في حال حدوث عطل أو خلل فني قبل أو أثناء المقابلة، يجب إبلاغ المسؤول عن المقابلة فوراً حتى يتم إصلاحه ولكي لا تفقد حقك.'
          }
        ]
      },
      documentsEn: [
        'Updated Comprehensive Curriculum Vitae (CV)',
        'Original Emirates ID for identity verification at interview',
        'Certified Academic Degrees and Experience portfolios',
        'Interview Appointment Confirmation slip'
      ],
      documentsAr: [
        'نسخة محدثة وشاملة من السيرة الذاتية',
        'أصل بطاقة الهوية الإماراتية للتحقق في مقر المقابلة',
        'الشهادات الأكاديمية والمهنية وملف الأعمال إن وجد',
        'إشعار موعد المقابلة الوظيفية الصادر من النظام'
      ],
      requirementsEn: [
        'Respecting seniority in registering an employment application in compliance with the principle of priority.',
        'Respecting seniority in obtaining the academic qualification.',
        'Passing the qualifying programmes and the field training programme.',
        'Having willingness and ability to work according to the requirements of the job for which the candidate is nominated.',
        'Job seekers are nominated from the category of unemployed candidates.',
        'The nomination is based on correspondence between the academic qualification and the required job specialisation.',
        'Nomination for job interviews takes place in the cities and regions where the candidates reside.'
      ],
      requirementsAr: [
        'مراعاة الأقدمية في تسجيل طلب التوظيف إعمالاً لمبدأ الأولوية.',
        'مراعاة الأقدمية في الحصول على المؤهل العلمي.',
        'اجتياز البرامج التأهيلية وبرنامج التدريب الميداني.',
        'توفر الرغبة والقدرة على العمل وفق متطلبات الوظيفة المرشح لها.',
        'ترشيح الباحثين عن عمل من فئة المتعطلين عن العمل.',
        'يرتكز الترشيح على التطابق بين المؤهل العلمي والتخصص الوظيفي المطلوب.',
        'يتم الترشيح للمقابلات الوظيفية في المدن والمناطق التي يقيم فيها المرشحون.'
      ],
      faqsEn: [
        {
          q: 'Why would the Directorate abstain from hiring me?',
          a: 'The Directorate is considered a link connecting the labour market institutions, whether governmental or private, and it seeks to support your training to reach high levels of qualification to increase your employment opportunities in line with the required qualifications, your capabilities and the needs of the labour market.'
        },
        {
          q: "Why haven't you contacted me yet about employment?",
          a: 'Nominations for job interviews are made according to the specialisations required in business entreprises.'
        },
        {
          q: 'In the event that I do not attend the job interview, will I be nominated for the upcoming interviews that are compatible with my area of specialisation?',
          a: 'You will not be nominated for the upcoming interviews, and the Directorate will send you a text message explaining the procedures followed to reactivate the file, and then you can run for the next interviews.'
        },
        {
          q: 'Do I have the right to apply through the job seekers system while I aready have a job?',
          a: 'No, application is only allowed to job seekers, to support them in getting a job.'
        },
        {
          q: 'Why would I not be nominated for other than my area of specilisation?',
          a: 'Because the criteria adopted for nomination for job interviews are as follows:\n• Respecting seniority in registering an employment application in compliance with the principle of priority.\n• Respecting seniority in obtaining the academic qualification.\n• Passing the qualifying programmes and the field training programme.\n• Having the willingness and ability to work according to the requirements of the job for which the candicate is nominated.\n• Nomination of job seekers from the category of unemployed candidates.\n• The nomination is based on correspondence between the academic qualification and the required job specialisation in order to place the right person in the right place to align academic qualifications with practical professional experience.'
        }
      ],
      faqsAr: [
        {
          q: 'لماذا تمتنع الدائرة عن توظيفي؟',
          a: 'تُعد الدائرة حلقة وصل تربط بين مؤسسات سوق العمل سواء الحكومية أو الخاصة، وتسعى إلى دعم تدريبك للوصول إلى مستويات عالية من التأهيل لزيادة فرص توظيفك بما يتناسب مع المؤهلات المطلوبة وقدراتك واحتياجات سوق العمل.'
        },
        {
          q: 'لماذا لم تتواصلوا معي حتى الآن بشأن التوظيف؟',
          a: 'يتم الترشيح للمقابلات الوظيفية وفقاً للتخصصات المطلوبة لدى مؤسسات وجهات العمل.'
        },
        {
          q: 'في حال عدم حضوري المقابلة الوظيفية، هل سيتم ترشيحي للمقابلات القادمة المتوافقة مع تخصصي؟',
          a: 'لن يتم ترشيحك للمقابلات القادمة، وستقوم الدائرة بإرسال رسالة نصية توضح الإجراءات المتبعة لإعادة تفعيل الملف، ومن ثم يمكنك الترشح للمقابلات التالية.'
        },
        {
          q: 'هل يحق لي التقديم عبر نظام الباحثين عن عمل وأنا على رأس عملي؟',
          a: 'لا، التقديم متاح فقط للباحثين عن عمل لدعمهم في الحصول على فرصة وظيفية.'
        },
        {
          q: 'لماذا لا يتم ترشيحي لغير تخصصي؟',
          a: 'لأن المعايير المعتمدة للترشيح للمقابلات الوظيفية هي كالتالي:\n• مراعاة الأقدمية في تسجيل طلب التوظيف إعمالاً لمبدأ الأولوية.\n• مراعاة الأقدمية في الحصول على المؤهل العلمي.\n• اجتياز البرامج التأهيلية وبرنامج التدريب الميداني.\n• توفر الرغبة والقدرة على العمل وفق متطلبات الوظيفة المرشح لها.\n• ترشيح الباحثين عن عمل من فئة المتعطلين عن العمل.\n• يرتكز الترشيح على التطابق بين المؤهل العلمي والتخصص الوظيفي المطلوب لوضع الشخص المناسب في المكان المناسب ومواءمة المؤهلات العلمية مع الخبرات المهنية والعملية.'
        }
      ],
      videoTitleEn: 'Mastering Government & Private Sector Job Interviews: Tips & Preparation',
      videoTitleAr: 'إرشادات ونصائح للتميز في المقابلات الوظيفية للقطاعين الحكومي والخاص',
      videoDuration: '4:15',
      contactInfo: {
        email: 'jsaldiffin@hr.sharjah.ae',
        phones: ['065078806']
      }
    }
  };

  const handleSubItemClick = (cat: MenuCategory, itemId: string) => {
    setActiveCategory(cat);
    setSelectedServiceId(itemId);
  };

  const handleCategoryHeaderClick = (cat: MenuCategory) => {
    setActiveCategory(cat);
    if (cat === 'employee') {
      setSelectedServiceId('self-service-login');
    } else if (cat === 'partners') {
      setSelectedServiceId('lecturer');
    } else if (cat === 'jobseekers') {
      setSelectedServiceId('jobseekers');
    }
  };

  const allSubItems = [...employeeSubItems, ...partnerSubItems];
  const activeSubItem = allSubItems.find(item => item.id === selectedServiceId);

  return (
    <section id="eservices" className="py-8 sm:py-10 max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-20 font-ibm-plex space-y-8">
      
      {/* Centered Title */}
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A3754] tracking-tight font-arabic">
          {isRTL ? 'الخدمات الإلكترونية' : 'E-Services'}
        </h2>
      </div>

      {/* Main Grid: Left Frozen Navigation Menu + Right Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Side Navigation Bar - Frozen/Sticky on scroll centered in viewport */}
        <aside className="md:col-span-4 lg:col-span-3 md:sticky md:top-28 z-20">
          <nav aria-label="E-Services Navigation" className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-md space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
            
            {/* 1. Employee Services */}
            <div className="space-y-1.5">
              <button
                onClick={() => handleCategoryHeaderClick('employee')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${
                  isRTL ? 'text-right' : 'text-left'
                } ${
                  activeCategory === 'employee'
                    ? 'text-[#1A3754] bg-[#1A3754]/5'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#1A3754] text-white flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span className="font-arabic font-bold text-slate-900">
                    {isRTL ? 'خدمات الموظفين' : 'Employee Services'}
                  </span>
                </div>
              </button>

              {/* Bullet Points under Employee Services */}
              <div className={`space-y-1 ${isRTL ? 'pr-5 border-r-2 border-slate-200 mr-3' : 'pl-5 border-l-2 border-slate-200 ml-3'}`}>
                {employeeSubItems.map((sub) => {
                  const isSelected = activeCategory === 'employee' && selectedServiceId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleSubItemClick('employee', sub.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                        isRTL ? 'text-right' : 'text-left'
                      } ${
                        isSelected
                          ? 'bg-[#1A3754] text-white font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-[#1A3754] hover:bg-slate-50'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? 'bg-white' : 'bg-slate-400'}`} />
                      <span className="font-arabic">
                        {isRTL ? sub.titleAr : sub.titleEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Job Seekers */}
            <div className="space-y-1">
              <button
                onClick={() => handleCategoryHeaderClick('jobseekers')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${
                  isRTL ? 'text-right' : 'text-left'
                } ${
                  activeCategory === 'jobseekers'
                    ? 'bg-[#1A3754] text-white shadow-xs'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    activeCategory === 'jobseekers' ? 'bg-white/15 text-white' : 'bg-[#1A3754] text-white'
                  }`}>
                    <UserSearch className="w-4 h-4" />
                  </div>
                  <span className="font-arabic font-bold">
                    {isRTL ? 'الباحثون عن عمل' : 'Job Seekers'}
                  </span>
                </div>
                {isRTL ? (
                  <ChevronLeft className={`w-4 h-4 ${activeCategory === 'jobseekers' ? 'text-white' : 'text-slate-300'}`} />
                ) : (
                  <ChevronRight className={`w-4 h-4 ${activeCategory === 'jobseekers' ? 'text-white' : 'text-slate-300'}`} />
                )}
              </button>
            </div>

            {/* 3. Partner Services */}
            <div className="space-y-1.5">
              <button
                onClick={() => handleCategoryHeaderClick('partners')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${
                  isRTL ? 'text-right' : 'text-left'
                } ${
                  activeCategory === 'partners'
                    ? 'text-[#1A3754] bg-[#1A3754]/5'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#1A3754] text-white flex items-center justify-center shrink-0">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <span className="font-arabic font-bold text-slate-900">
                    {isRTL ? 'خدمات الشركاء' : 'Partner Services'}
                  </span>
                </div>
              </button>

              {/* Bullet Points under Partner Services */}
              <div className={`space-y-1 ${isRTL ? 'pr-5 border-r-2 border-slate-200 mr-3' : 'pl-5 border-l-2 border-slate-200 ml-3'}`}>
                {partnerSubItems.map((sub) => {
                  const isSelected = activeCategory === 'partners' && selectedServiceId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleSubItemClick('partners', sub.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                        isRTL ? 'text-right' : 'text-left'
                      } ${
                        isSelected
                          ? 'bg-[#1A3754] text-white font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-[#1A3754] hover:bg-slate-50'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? 'bg-white' : 'bg-slate-400'}`} />
                      <span className="font-arabic">
                        {isRTL ? sub.titleAr : sub.titleEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </nav>
        </aside>

        {/* Right Side Content Details Area */}
        <div className="md:col-span-8 lg:col-span-9">
          
          {/* ================= A. SELF-SERVICE LOGIN DETAIL VIEW ================= */}
          {activeCategory === 'employee' && selectedServiceId === 'self-service-login' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 animate-in fade-in duration-200">
              
              {/* Header Badge & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#1A3754] text-white flex items-center justify-center shadow-xs">
                    <LogIn className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1A3754] uppercase tracking-wider block font-arabic">
                      {isRTL ? 'موظفو حكومة الشارقة' : 'Sharjah Government Employees'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-arabic">
                      {isRTL ? 'تسجيل دخول الخدمة الذاتية' : 'Self-Service Login'}
                    </h3>
                  </div>
                </div>

                <a
                  href="https://hr.sharjah.ae/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A3754] text-white text-xs sm:text-sm font-semibold hover:bg-[#152e46] transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  <span className="font-arabic">{isRTL ? 'تسجيل الدخول للنظام' : 'Access Self-Service'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Context Paragraphs */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-normal font-arabic">
                <p>
                  {isRTL
                    ? 'إن تحقيق التنمية المستدامة بشكل عام وتنمية الموارد البشرية الوطنية بشكل خاص في حكومة الشارقة يتطلب تحسين الأداء الحكومي والارتقاء بوعي الموظفين بقانون الموارد البشرية وتطبيقاته. لذا تحرص الدائرة على توعية جميع الموظفين بحقوقهم وواجباتهم الوظيفية وآليات ونظم وإجراءات العمل، بالإضافة إلى نشر الثقافة المهنية والمؤسسية وترسيخ ثقافة عمل مبنية على الشفافية والثقة المتبادلة بين كوادر الجهة الحكومية، سواء كانوا رؤساء أو مرؤوسين.'
                    : 'Achieving sustainable development in general and the development of national human resources in particular in the Government of Sharjah requires improving government performance and drawing attention to the extent to which employees are aware of the law of human resources and its applications. Therefore, the Directorate is keen to educate all employees on their workplace rights and responsibilities and the business mechanisms, systems and procedures, in addition to spreading the professional culture of the institution among them, instilling a work culture based on transparency and mutual trust between the staffs of the government body, whether superiors or subordinates.'}
                </p>
                <p>
                  {isRTL
                    ? 'كما تسهم الدائرة في مساعدة الموظفين على تذليل كافة العقبات التي قد تعترض مسيرتهم المهنية، وخلق بيئة مؤسسية جاذبة تحقق للموظف الرضا والأمان والاستقرار الوظيفي والشعور بالولاء والانتماء لجهة عمله.'
                    : 'It also helps the employees to solve all obstacles that may hinder their professional career, and create an attractive institutional environment for employees to achieve satisfaction, security and job stability, and feel loyal and belonging to their employers.'}
                </p>
              </div>

              {/* Employee Self-Service System Section */}
              <div className="space-y-3 pt-2">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#1A3754] font-arabic">
                    {isRTL ? 'نظام الخدمة الذاتية للموظفين:' : 'Employee Self-Service System:'}
                  </h4>
                </div>

                {/* Normal descriptive sentence (not a bullet point) */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-arabic">
                  {isRTL
                    ? 'تهدف هذه الخدمة إلى تيسير التواصل بين الموظف الحكومي ودائرة الموارد البشرية، حيث توفر ما يلي:'
                    : 'This service aims at facilitating communication between government employees and the Directorate of Human Resources, as it provides the following:'}
                </p>

                {/* Bullet points for the service features */}
                <ul className={`space-y-2.5 pt-1 ${isRTL ? 'pr-2' : 'pl-2'}`}>
                  {(isRTL ? selfServiceFeaturesAr : selfServiceFeaturesEn).map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-arabic"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A3754] shrink-0 mt-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact and Inquiries Footer Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1A3754] shrink-0" />
                  <span className="font-medium font-arabic">
                    {isRTL
                      ? 'لأية استفسارات حول الخدمة، يرجى التواصل عبر:'
                      : 'If you have any questions about the service, please contact:'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#1A3754]">
                  <a
                    href="mailto:info@hr.sharjah.ae"
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>info@hr.sharjah.ae</span>
                  </a>
                  <a
                    href="tel:065078806"
                    className="inline-flex items-center gap-1.5 hover:underline"
                    dir="ltr"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>065078806</span>
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* ================= B. TRAINING LOGIN FOR ADMIN DETAIL VIEW ================= */}
          {activeCategory === 'employee' && selectedServiceId === 'training-login-admin' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 animate-in fade-in duration-200">
              
              {/* Header Badge & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#1A3754] text-white flex items-center justify-center shadow-xs">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1A3754] uppercase tracking-wider block font-arabic">
                      {isRTL ? 'خدمات تدريب الموظفين والمشرفين' : 'Employee & Admin Training Services'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-arabic">
                      {isRTL ? 'نظام التدريب..' : 'Training System..'}
                    </h3>
                  </div>
                </div>

                <a
                  href="https://hr.sharjah.ae/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A3754] text-white text-xs sm:text-sm font-semibold hover:bg-[#152e46] transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  <span className="font-arabic">{isRTL ? 'دخول نظام التدريب' : 'Access Training Portal'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Context Paragraphs */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-normal font-arabic">
                <p>
                  {isRTL
                    ? 'تنفذ الدائرة البرامج التدريبية في مختلف المجالات المهنية، مع التركيز على تصميم وتنفيذ البرامج التخصصية والفنية استجابة للاحتياجات التدريبية للدوائر والهيئات والمؤسسات الحكومية في إمارة الشارقة، وذلك لتنمية الموارد البشرية الوطنية وتعزيز قدراتها المهنية للارتقاء بمستوى العمل، بما ينعكس إيجاباً على إنتاجية المؤسسة ورضا المتعاملين والارتقاء بمستوى الخدمات المقدمة في الإمارة.'
                    : 'The Directorate will implement the training programs in various professional fields, focusing on the design and implementation of specialised and technical programs in response to the training needs of government departments, bodies and institutions in the Emirate of Sharjah, in order to develop the national human resources and enhance their professional capabilities to elevate the level of work, so as to reflect positively on the productivity of the institution and customer satisfaction and thus improve the level of services provided in the Emirate.'}
                </p>
              </div>

              {/* Training System Section */}
              <div className="space-y-3 pt-2">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-arabic">
                  {isRTL
                    ? 'يعتبر نظام التدريب نظاماً فعالاً على مستوى حكومة الشارقة حيث يقدم خدمات متكاملة لكافة الإجراءات التدريبية، وتتمثل الخدمات التي يوفرها النظام فيما يلي:'
                    : 'The training system is considered as an effective system at the level of the Government of Sharjah as it provides integrated services for all training procedures. The services provided by the system are as follows:'}
                </p>

                {/* Bullet points for the training system features */}
                <ul className={`space-y-2.5 pt-1 ${isRTL ? 'pr-2' : 'pl-2'}`}>
                  {(isRTL ? trainingFeaturesAr : trainingFeaturesEn).map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-arabic"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A3754] shrink-0 mt-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact and Inquiries Footer Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1A3754] shrink-0" />
                  <span className="font-medium font-arabic">
                    {isRTL
                      ? 'لأية استفسارات حول برامج التدريب، يرجى التواصل عبر:'
                      : 'If you have any questions about the training programs, please contact:'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#1A3754]">
                  <a
                    href="mailto:info@hr.sharjah.ae"
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>info@hr.sharjah.ae</span>
                  </a>
                  <a
                    href="tel:065078806"
                    className="inline-flex items-center gap-1.5 hover:underline"
                    dir="ltr"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>065078806</span>
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* ================= C. LECTURER (PARTNERS) DETAIL VIEW ================= */}
          {activeCategory === 'partners' && selectedServiceId === 'lecturer' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 animate-in fade-in duration-200">
              
              {/* Header Badge & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#1A3754] text-white flex items-center justify-center shadow-xs">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1A3754] uppercase tracking-wider block font-arabic">
                      {isRTL ? 'خدمات الشركاء والجهات الخارجية' : 'Partner & Institute Services'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-arabic">
                      {isRTL ? 'المحاضرون والمدربون' : 'Lecturer'}
                    </h3>
                  </div>
                </div>

                {/* 2 Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <a
                    href="https://hr.sharjah.ae/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#1A3754] text-white text-xs sm:text-sm font-semibold hover:bg-[#152e46] transition-all shadow-xs shrink-0 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="font-arabic">{isRTL ? 'الدخول إلى الخدمة' : 'Access to the Service'}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <a
                    href="https://hr.sharjah.ae/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-white border border-[#1A3754] text-[#1A3754] text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-all shadow-2xs shrink-0 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="font-arabic">{isRTL ? 'تسجيل جديد' : 'New Registration'}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>
              </div>

              {/* Context Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-normal font-arabic bg-slate-50/60 p-5 sm:p-6 rounded-2xl border border-slate-200/80">
                <p>
                  {isRTL
                    ? 'تحرص الدائرة على استقطاب الكفاءات المؤهلة علمياً ومهنياً لتقديم البرامج التدريبية، وفق معايير ومواصفات الجودة التدريبية من خلال توفير نظام يتيح للشركاء من المعاهد والمراكز التدريبية والمحاضرين المستقلين التسجيل في الدائرة لتقديم البرامج التدريبية لموظفي حكومة الشارقة.'
                    : 'The Directorate is keen to attract candidates who are qualified on the educational and professional levels to provide the training programs, in accordance with quality training standards and specifications through the provision of a system that enables the partners from among institutes and training centres and independent lecturers to register in the Directorate to provide training programs to employees of the Government of Sharjah.'}
                </p>
                <p>
                  {isRTL
                    ? 'يمكن للمحاضر التسجيل في نظام التدريب كمحاضر مستقل بعد إدخال كافة بياناته في الموقع التدريبي، كما يتم ربط المحاضر بالمعهد التدريبي في حال تقديمه لدبلوم مهني أو برنامج تأسيسي، ليتسنى للمحاضرين تقييم الموظفين المسجلين في البرنامج.'
                    : 'The lecturer can register in the training system as an independent lecturer after all his data is entered into the training site. The lecturer is also linked to the training institute if he/she presents a professional diploma or foundation program, so that the lecturers can evaluate the employees registered in the programme.'}
                </p>
              </div>

              {/* Contact and Inquiries Footer Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1A3754] shrink-0" />
                  <span className="font-medium font-arabic">
                    {isRTL
                      ? 'لأية استفسارات حول تسجيل المحاضرين، يرجى التواصل عبر:'
                      : 'If you have any questions about lecturer registration, please contact:'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#1A3754]">
                  <a
                    href="mailto:info@hr.sharjah.ae"
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>info@hr.sharjah.ae</span>
                  </a>
                  <a
                    href="tel:065078806"
                    className="inline-flex items-center gap-1.5 hover:underline"
                    dir="ltr"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>065078806</span>
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* ================= D. TRAINING INSTITUTES & CENTRES (PARTNERS) DETAIL VIEW ================= */}
          {activeCategory === 'partners' && selectedServiceId === 'training-institutes-centres' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 animate-in fade-in duration-200">
              
              {/* Header Badge & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#1A3754] text-white flex items-center justify-center shadow-xs">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1A3754] uppercase tracking-wider block font-arabic">
                      {isRTL ? 'خدمات الشركاء والجهات الخارجية' : 'Partner & Institute Services'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-arabic">
                      {isRTL ? 'المعاهد والمراكز التدريبية' : 'Training Institutes and Centres'}
                    </h3>
                  </div>
                </div>

                {/* 2 Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <a
                    href="https://hr.sharjah.ae/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#1A3754] text-white text-xs sm:text-sm font-semibold hover:bg-[#152e46] transition-all shadow-xs shrink-0 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="font-arabic">
                      {isRTL ? 'الدخول إلى الخدمة' : 'Access to the Service'}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <a
                    href="https://hr.sharjah.ae/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-white border border-[#1A3754] text-[#1A3754] text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-all shadow-2xs shrink-0 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="font-arabic">
                      {isRTL ? 'تسجيل جديد' : 'New Registration'}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>
              </div>

              {/* Context Paragraph */}
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-normal font-arabic bg-slate-50/60 p-5 sm:p-6 rounded-2xl border border-slate-200/80">
                <p>
                  {isRTL
                    ? 'تحرص الدائرة على استقطاب الكفاءات المؤهلة علمياً ومهنياً لتقديم البرامج التدريبية، وفق معايير ومواصفات الجودة التدريبية من خلال توفير نظام يتيح للشركاء من المعاهد، المراكز التدريبية والمحاضرين المستقلين التسجيل في الدائرة لتقديم البرامج التدريبية لموظفي حكومة الشارقة.'
                    : 'The Directorate is keen to attract candidates who are qualified on the educational and professional levels to provide the training programs, in accordance with quality training standards and specifications through the provision of a system that enables the partners from among institutes, training centres and independent lecturers to register in the Directorate to provide training programs to employees of the Government of Sharjah.'}
                </p>
              </div>

              {/* Registration Procedures / Steps */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-arabic flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1A3754]" />
                  <span>
                    {isRTL
                      ? 'يتم تسجيل المركز والمعهد التدريبي في النظام من خلال:'
                      : 'The Centre and the Training Institute are registered in the system through:'}
                  </span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                    <div className="w-8 h-8 rounded-xl bg-[#1A3754] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                      1
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-[#1A3754] font-arabic block">
                        {isRTL ? 'أولاً' : 'First'}
                      </span>
                      <p className="text-xs sm:text-[13px] text-slate-700 font-arabic leading-relaxed">
                        {isRTL
                          ? 'إحضار كافة الأوراق والمستندات المطلوبة في دائرة المالية المركزية.'
                          : 'Bringing all the papers required in the Central Finance Department.'}
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                    <div className="w-8 h-8 rounded-xl bg-[#1A3754] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                      2
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-[#1A3754] font-arabic block">
                        {isRTL ? 'ثانياً' : 'Second'}
                      </span>
                      <p className="text-xs sm:text-[13px] text-slate-700 font-arabic leading-relaxed">
                        {isRTL
                          ? 'يتم التسجيل من خلال الرابط الإلكتروني الخاص بالتدريب عن طريق إدخال كافة البيانات المطابقة لمتطلبات تنفيذ البرامج التدريبية في الدائرة.'
                          : 'Registration is done through the electronic link for the training by entering all data that correspond to the requirements of implementation of the training programmes in the Directorate.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact and Inquiries Footer Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1A3754] shrink-0" />
                  <span className="font-medium font-arabic">
                    {isRTL
                      ? 'لأية استفسارات حول اعتماد وتسجيل المعاهد والمراكز التدريبية، يرجى التواصل عبر:'
                      : 'If you have any questions about training institute accreditation & registration, please contact:'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#1A3754]">
                  <a
                    href="mailto:info@hr.sharjah.ae"
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>info@hr.sharjah.ae</span>
                  </a>
                  <a
                    href="tel:065078806"
                    className="inline-flex items-center gap-1.5 hover:underline"
                    dir="ltr"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>065078806</span>
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* ================= E. PUBLIC AND PRIVATE SECTOR (PARTNERS) DETAIL VIEW ================= */}
          {activeCategory === 'partners' && selectedServiceId === 'public-private-sector' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 animate-in fade-in duration-200">
              
              {/* Header Badge & Title */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#1A3754] text-white flex items-center justify-center shadow-xs">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1A3754] uppercase tracking-wider block font-arabic">
                      {isRTL ? 'خدمات الشركاء والجهات الخارجية' : 'Partner & Institutional Services'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-arabic">
                      {isRTL ? 'القطاع الحكومي والخاص' : 'Public and Private Sector'}
                    </h3>
                  </div>
                </div>

                {/* 3 Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  {/* Button 1: Login */}
                  <a
                    href="https://hr.sharjah.ae/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#1A3754] text-white text-xs sm:text-sm font-semibold hover:bg-[#152e46] transition-all shadow-xs shrink-0 cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span className="font-arabic">{isRTL ? 'تسجيل الدخول' : 'Login'}</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>

                  {/* Button 2: Registration */}
                  <a
                    href="https://hr.sharjah.ae/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-white border border-[#1A3754] text-[#1A3754] text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-all shadow-2xs shrink-0 cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span className="font-arabic">{isRTL ? 'التسجيل' : 'Registration'}</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>

                  {/* Button 3: Login to Training System */}
                  <a
                    href="https://hr.sharjah.ae/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[#1A3754] text-xs sm:text-sm font-semibold hover:bg-blue-100 transition-all shadow-2xs shrink-0 cursor-pointer"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-[#1A3754]" />
                    <span className="font-arabic">{isRTL ? 'الدخول لنظام التدريب' : 'Login to Training System'}</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                </div>
              </div>

              {/* Context Paragraph */}
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-normal font-arabic bg-slate-50/60 p-5 sm:p-6 rounded-2xl border border-slate-200/80">
                <p>
                  {isRTL
                    ? 'تحرص دائرة الموارد البشرية على تعزيز وتوطيد علاقات الشراكة الاستراتيجية والتعاون المشترك بين مؤسسات القطاعين العام والخاص لدعم مسيرة تعليم وتدريب وتأهيل وتوظيف الكوادر الوطنية وإعدادها لسوق العمل على أسس تنافسية، وذلك إيماناً منها بأهمية الدور التكاملي بين الدائرة ومؤسسات القطاعين العام والخاص، وأهمية تنسيق وتوحيد الجهود معها لتحقيق الاستثمار الأمثل للموارد البشرية.'
                    : 'The Directorate of Human Resources is keen to strengthen and reinforce the strategic partnership relations and mutual cooperation between public and private sector institutions to support the process of educating, training, rehabilitating and hiring UAE national labour forces and preparing them for the labour market on grounds of competitiveness. This is because of its belief in the importance of the integrative role between the Department and public and private sector institutions, and the importance of coordinating and unifying efforts with them to achieve optimal investment of human resources.'}
                </p>
              </div>

              {/* Training System Section */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 font-arabic flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1A3754]" />
                    <span>{isRTL ? 'نظام التدريب' : 'Training System'}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-arabic mt-1.5 leading-relaxed">
                    {isRTL
                      ? 'تتيح الدائرة لمؤسسات القطاعين العام والخاص المشاركة في البرامج التدريبية التي تطرحها من خلال التسجيل في نظام التدريب والحصول على الخدمات التالية:'
                      : 'The Directorate enables public and private sector institutions to participate in the training programs it offers through registration in the training system and the ability to obtain the following services:'}
                  </p>
                </div>

                {/* 5 Training System Services */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {/* Item 1 */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <div className="w-6 h-6 rounded-lg bg-[#1A3754]/10 text-[#1A3754] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCheck className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-700 font-arabic leading-relaxed">
                      {isRTL
                        ? 'إمكانية الاطلاع على خطة كل برنامج تدريبي والتسجيل في البرامج المطروحة.'
                        : 'The possibility of seeing each training programme plan and registering in the programmes offered.'}
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <div className="w-6 h-6 rounded-lg bg-[#1A3754]/10 text-[#1A3754] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCheck className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-700 font-arabic leading-relaxed">
                      {isRTL
                        ? 'إمكانية قيام إدارات وأقسام الموارد البشرية في جهات القطاعين العام والخاص بتسجيل موظفي جهاتهم للالتحاق بالبرامج التدريبية المنفذة من قبل الدائرة كجزء من الخطة التدريبية.'
                        : 'The possibility for the departments and divisions of human resources in the public and private sector entities to register the employees of their entities to enrol in the training programs implemented by the Directorate as a part of the training plan.'}
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <div className="w-6 h-6 rounded-lg bg-[#1A3754]/10 text-[#1A3754] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCheck className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-700 font-arabic leading-relaxed">
                      {isRTL
                        ? 'تقييم البرامج التدريبية من قبل الموظف.'
                        : 'Evaluation of training programs by the employee'}
                    </p>
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <div className="w-6 h-6 rounded-lg bg-[#1A3754]/10 text-[#1A3754] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCheck className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-700 font-arabic leading-relaxed">
                      {isRTL
                        ? 'تقييم السجلات للموظف.'
                        : 'Evaluation of records for the employee'}
                    </p>
                  </div>

                  {/* Item 5 */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 md:col-span-2">
                    <div className="w-6 h-6 rounded-lg bg-[#1A3754]/10 text-[#1A3754] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCheck className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-700 font-arabic leading-relaxed">
                      {isRTL
                        ? 'الحصول على الشهادات الإلكترونية المعتمدة (Electronic Certification).'
                        : 'Electronic Certification.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact and Inquiries Footer Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1A3754] shrink-0" />
                  <span className="font-medium font-arabic">
                    {isRTL
                      ? 'لأية استفسارات حول خدمات القطاعين العام والخاص، يرجى التواصل عبر:'
                      : 'If you have any questions regarding public & private sector partnerships, please contact:'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#1A3754]">
                  <a
                    href="mailto:info@hr.sharjah.ae"
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>info@hr.sharjah.ae</span>
                  </a>
                  <a
                    href="tel:065078806"
                    className="inline-flex items-center gap-1.5 hover:underline"
                    dir="ltr"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>065078806</span>
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* ================= F. ACADEMIC BODIES (PARTNERS) DETAIL VIEW ================= */}
          {activeCategory === 'partners' && selectedServiceId === 'academic-bodies' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 animate-in fade-in duration-200">
              
              {/* Header Badge & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#1A3754] text-white flex items-center justify-center shadow-xs">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1A3754] uppercase tracking-wider block font-arabic">
                      {isRTL ? 'خدمات الشركاء والجهات الخارجية' : 'Partner & Institutional Services'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-arabic">
                      {isRTL ? 'الجهات والمؤسسات الأكاديمية' : 'Academic Bodies'}
                    </h3>
                  </div>
                </div>

                {/* 1 Action Button: Academic Bodies Registration */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <a
                    href="https://hr.sharjah.ae/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#1A3754] text-white text-xs sm:text-sm font-semibold hover:bg-[#152e46] transition-all shadow-xs shrink-0 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="font-arabic">
                      {isRTL ? 'تسجيل الجهات الأكاديمية' : 'Academic Bodies Registration'}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>
              </div>

              {/* Context Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-normal font-arabic bg-slate-50/60 p-5 sm:p-6 rounded-2xl border border-slate-200/80">
                <p>
                  {isRTL
                    ? 'تحرص دائرة الموارد البشرية على تعزيز وتوطيد علاقات التعاون العلمي والمهني مع جامعات وكليات الدولة في مجال التعليم المستمر والبرامج التدريبية، لرفع الكفاءة العلمية والمهنية للموارد البشرية، وإرساء أسس وآفاق التعاون في مجالات البحث الأكاديمي، الاستشارات المهنية، ورعاية المؤتمرات والملتقيات العلمية بما يخدم المجتمع، ويطور الموارد البشرية، ويؤهل الكوادر الوطنية.'
                    : 'The Directorate of Human Resources is keen to strengthen the relations of scientific and professional cooperation with the universities and colleges of the State in the field of continuing education and training programmes, to enhance the scientific and professional qualifications of the human resources, establish the foundations and horizons of cooperation in the fields of academic research, professional consultation and cooperation in the field of sponsoring conferences and scientific forums to serve the society, develop human resources and rehabilitate national cadres.'}
                </p>
                <p>
                  {isRTL
                    ? 'لذا توفر الدائرة خدمة تسجيل الأكاديميين لإرساء أسس التعاون المشترك معهم والاستفادة من خبراتهم وقدراتهم.'
                    : 'Therefore, the Directorate provides the service of registration of academics to lay the foundation for mutual cooperation with them, to benefit from their expertise and capabilities.'}
                </p>
              </div>

              {/* Contact and Inquiries Footer Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1A3754] shrink-0" />
                  <span className="font-medium font-arabic">
                    {isRTL
                      ? 'لأية استفسارات حول تسجيل واعتماد المؤسسات والجهات الأكاديمية، يرجى التواصل عبر:'
                      : 'If you have any questions about academic bodies registration and cooperation, please contact:'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#1A3754]">
                  <a
                    href="mailto:info@hr.sharjah.ae"
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>info@hr.sharjah.ae</span>
                  </a>
                  <a
                    href="tel:065078806"
                    className="inline-flex items-center gap-1.5 hover:underline"
                    dir="ltr"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>065078806</span>
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* ================= G. OTHER SUB-ITEMS (Standard View) ================= */}
          {activeCategory !== 'jobseekers' &&
            selectedServiceId !== 'self-service-login' &&
            selectedServiceId !== 'training-login-admin' &&
            selectedServiceId !== 'lecturer' &&
            selectedServiceId !== 'training-institutes-centres' &&
            selectedServiceId !== 'public-private-sector' &&
            selectedServiceId !== 'academic-bodies' &&
            activeSubItem && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1A3754]/10 text-[#1A3754] flex items-center justify-center">
                    {React.createElement(activeSubItem.icon, { className: 'w-5 h-5' })}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1A3754] font-arabic">
                      {isRTL ? activeSubItem.titleAr : activeSubItem.titleEn}
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-500 font-arabic">
                      {activeCategory === 'employee'
                        ? (isRTL ? 'خدمات الموظفين' : 'Employee Services')
                        : (isRTL ? 'خدمات الشركاء' : 'Partner Services')}
                    </span>
                  </div>
                </div>

                <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#1A3754]">
                  {isRTL ? 'بوابة إلكترونية' : 'Digital Portal'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-arabic">
                {isRTL ? activeSubItem.descAr : activeSubItem.descEn}
              </p>

              <div className="pt-2">
                <a
                  href={activeSubItem.portalUrl || 'https://hr.sharjah.ae/'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A3754] text-white text-xs sm:text-sm font-semibold hover:bg-[#152e46] transition-all shadow-xs"
                >
                  <span className="font-arabic">{isRTL ? 'تسجيل الدخول / الوصول للبوابة' : 'Access Portal'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* ================= C. JOB SEEKERS VIEW ================= */}
          {activeCategory === 'jobseekers' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 animate-in fade-in duration-200">
              
              {/* Header Badge & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#1A3754] text-white flex items-center justify-center shadow-xs">
                    <UserSearch className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1A3754] uppercase tracking-wider block font-arabic">
                      {isRTL ? 'الكوادر الوطنية وسوق العمل' : 'National Talent & Labour Market'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-arabic">
                      {isRTL ? 'خدمات الباحثين عن عمل' : 'Job seekers Services'}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <a
                    href="https://hr.sharjah.ae/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#1A3754] text-white text-xs sm:text-sm font-semibold hover:bg-[#152e46] transition-all shadow-xs cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="font-arabic">{isRTL ? 'تسجيل الدخول' : 'Login'}</span>
                  </a>

                  <a
                    href="https://hr.sharjah.ae/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-white text-[#1A3754] border border-[#1A3754]/30 hover:bg-[#1A3754]/5 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="font-arabic">{isRTL ? 'تسجيل جديد' : 'New Registration'}</span>
                  </a>
                </div>
              </div>

              {/* Context Paragraph */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-normal font-arabic">
                <p>
                  {isRTL
                    ? 'تسعى الدائرة إلى إعداد كوادر بشرية وطنية ذات مستوى عالٍ من الأداء والقدرات التنافسية وتمكينهم في عالم الأعمال لدعم خطط التنمية الحكومية وضمان استمرارية إنتاجية الكوادر الوطنية لمواكبة نظرائهم في القطاعات الاقتصادية المتقدمة من خلال ما يلي:'
                    : 'The Directorate endeavours to prepare national human staffs with high level of performance and competitive capabilities and empower the in the business world so as to support government development plans and ensure continuity of productivity of national staffs to match their counterparts in the advanced economic sectors through the following:'}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="space-y-3 pt-1">
                <ul className={`space-y-2.5 ${isRTL ? 'pr-2' : 'pl-2'}`}>
                  {(isRTL ? jobSeekersFeaturesAr : jobSeekersFeaturesEn).map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-arabic"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A3754] shrink-0 mt-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ================= 4 PRIMARY BUBBLES + 7 SUB-BUBBLES MODULE ================= */}
              <div className="pt-4 border-t border-slate-200/80 space-y-5">
                
                {/* 1. 4 Primary Bubbles */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1A3754]" />
                    <h4 className="text-xs sm:text-sm font-bold text-[#1A3754] uppercase tracking-wider font-arabic">
                      {isRTL ? 'الخدمات والمسارات الرئيسية' : 'Key Services & Pathways'}
                    </h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    {jobSeekerMainBubbles.map((bubble) => {
                      const Icon = bubble.icon;
                      const isActive = selectedJobSeekerService === bubble.id;
                      return (
                        <button
                          key={bubble.id}
                          type="button"
                          onClick={() => {
                            setSelectedJobSeekerService(bubble.id);
                            if (
                              (bubble.id === 'field-training' || bubble.id === 'nomination') &&
                              selectedJobSeekerSubTab === 'documents'
                            ) {
                              setSelectedJobSeekerSubTab('about');
                            }
                          }}
                          className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                            isActive
                              ? 'bg-[#1A3754] text-white border border-[#1A3754] ring-2 ring-[#1A3754]/20'
                              : 'bg-slate-50 text-slate-700 border border-slate-200/90 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#1A3754]'}`} />
                          <span className="font-arabic">{isRTL ? bubble.nameAr : bubble.nameEn}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. 7 Sub Bubbles */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span className="text-xs font-semibold text-slate-500 font-arabic">
                      {isRTL ? 'أقسام وتفاصيل الخدمة المختارة:' : 'Selected Service Sections:'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {jobSeekerSubBubbles
                      .filter((subTab) => {
                        // Field Training and Nomination for Job Interviews do not require documents tab
                        if (
                          (selectedJobSeekerService === 'field-training' || selectedJobSeekerService === 'nomination') &&
                          subTab.id === 'documents'
                        ) {
                          return false;
                        }
                        return true;
                      })
                      .map((subTab) => {
                      const SubIcon = subTab.icon;
                      const isSubActive = selectedJobSeekerSubTab === subTab.id;
                      const label = getSubBubbleLabel(subTab.id, selectedJobSeekerService, isRTL);
                      return (
                        <button
                          key={subTab.id}
                          type="button"
                          onClick={() => setSelectedJobSeekerSubTab(subTab.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                            isSubActive
                              ? 'bg-[#1A3754]/10 text-[#1A3754] border border-[#1A3754]/30 font-bold shadow-2xs'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 font-medium'
                          }`}
                        >
                          <SubIcon className={`w-3.5 h-3.5 ${isSubActive ? 'text-[#1A3754]' : 'text-slate-400'}`} />
                          <span className="font-arabic">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Sub-Bubble Content Viewer Box */}
                <div className="rounded-2xl bg-slate-50/80 border border-slate-200/90 p-4 sm:p-5 space-y-3 transition-all">
                  
                  {/* Content Header */}
                  <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#1A3754] text-white flex items-center justify-center">
                        {React.createElement(
                          jobSeekerSubBubbles.find(s => s.id === selectedJobSeekerSubTab)?.icon || Info,
                          { className: 'w-4 h-4' }
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 font-arabic">
                        {isRTL
                          ? `${jobSeekerMainBubbles.find(m => m.id === selectedJobSeekerService)?.nameAr} - ${getSubBubbleLabel(selectedJobSeekerSubTab, selectedJobSeekerService, true)}`
                          : `${jobSeekerMainBubbles.find(m => m.id === selectedJobSeekerService)?.nameEn} - ${getSubBubbleLabel(selectedJobSeekerSubTab, selectedJobSeekerService, false)}`}
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Tab Content Views */}
                  {/* A. ABOUT */}
                  {selectedJobSeekerSubTab === 'about' && (
                    <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-arabic text-start pt-1">
                      {(isRTL
                        ? jobSeekerDetailsData[selectedJobSeekerService].aboutAr
                        : jobSeekerDetailsData[selectedJobSeekerService].aboutEn
                      )
                        .split('\n\n')
                        .map((para, pIdx) => (
                          <p key={pIdx} className="leading-relaxed">
                            {para}
                          </p>
                        ))}
                    </div>
                  )}

                  {/* B. DETAILS */}
                  {selectedJobSeekerSubTab === 'details' && (
                    <div className="space-y-4 pt-1">
                      {selectedJobSeekerService === 'nomination' &&
                      jobSeekerDetailsData.nomination.virtualJobInterviewsSteps ? (
                        <div className="space-y-5">
                          {/* Introductory context block */}
                          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 text-xs sm:text-sm text-slate-800 font-arabic leading-relaxed shadow-2xs">
                            <p className="leading-relaxed">
                              {isRTL
                                ? jobSeekerDetailsData.nomination.detailsAr[0]
                                : jobSeekerDetailsData.nomination.detailsEn[0]}
                            </p>
                          </div>

                          {/* Steps container matching the diagram layout */}
                          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-2xs space-y-6">
                            {/* Section Header */}
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 font-arabic flex items-center gap-2.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#1A3754]" />
                              <span>
                                {isRTL
                                  ? jobSeekerDetailsData.nomination.stepsHeadingAr
                                  : jobSeekerDetailsData.nomination.stepsHeadingEn}
                              </span>
                            </h4>

                            {/* 5-Step Flow */}
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-3 relative items-start pt-2">
                              {jobSeekerDetailsData.nomination.virtualJobInterviewsSteps.map((step, sIdx, arr) => (
                                <div
                                  key={sIdx}
                                  className="relative flex flex-col items-center text-center group"
                                >
                                  {/* Circular Ring Frame with Icon */}
                                  <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full border-2 border-[#1A3754]/80 bg-white flex items-center justify-center text-[#1A3754] shadow-2xs group-hover:scale-105 group-hover:border-[#1A3754] group-hover:shadow-xs transition-all duration-300">
                                    {sIdx === 0 && <Smartphone className="w-10 h-10 sm:w-11 sm:h-11 stroke-[1.5]" />}
                                    {sIdx === 1 && <Monitor className="w-10 h-10 sm:w-11 sm:h-11 stroke-[1.5]" />}
                                    {sIdx === 2 && <MousePointerClick className="w-10 h-10 sm:w-11 sm:h-11 stroke-[1.5]" />}
                                    {sIdx === 3 && <Smile className="w-10 h-10 sm:w-11 sm:h-11 stroke-[1.5]" />}
                                    {sIdx === 4 && <FileSearch className="w-10 h-10 sm:w-11 sm:h-11 stroke-[1.5]" />}

                                    {/* Small Step Number Badge */}
                                    <span className="absolute -top-1.5 -right-1.5 rtl:right-auto rtl:-left-1.5 w-6 h-6 rounded-full bg-[#1A3754] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                                      {step.stepNum}
                                    </span>
                                  </div>

                                  {/* Chevron Arrow on Desktop between steps */}
                                  {sIdx < arr.length - 1 && (
                                    <div className="hidden lg:flex absolute top-9 -right-3.5 sm:-right-4 translate-x-1/2 rtl:right-auto rtl:-left-3.5 rtl:sm:-left-4 rtl:-translate-x-1/2 text-slate-400 group-hover:text-[#1A3754] transition-colors pointer-events-none">
                                      {isRTL ? (
                                        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
                                      ) : (
                                        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
                                      )}
                                    </div>
                                  )}

                                  {/* Step Description */}
                                  <p className="mt-4 text-xs sm:text-[13px] text-slate-700 font-arabic leading-relaxed text-center px-1">
                                    {isRTL ? step.textAr : step.textEn}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : selectedJobSeekerService === 'qualification' &&
                      jobSeekerDetailsData.qualification.structuredQualificationDetails ? (
                        <div className="space-y-4">
                          {/* Introductory context block */}
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 font-arabic leading-relaxed">
                            {isRTL
                              ? jobSeekerDetailsData.qualification.structuredQualificationDetails.introAr
                              : jobSeekerDetailsData.qualification.structuredQualificationDetails.introEn}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                            {/* Card 1: Registration Mechanism */}
                            <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs space-y-3">
                              <h4 className="text-xs sm:text-sm font-bold text-[#1A3754] font-arabic flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#1A3754]" />
                                <span>
                                  {isRTL
                                    ? jobSeekerDetailsData.qualification.structuredQualificationDetails.mechanismTitleAr
                                    : jobSeekerDetailsData.qualification.structuredQualificationDetails.mechanismTitleEn}
                                </span>
                              </h4>
                              <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-700 font-arabic">
                                {(isRTL
                                  ? jobSeekerDetailsData.qualification.structuredQualificationDetails.mechanismPointsAr
                                  : jobSeekerDetailsData.qualification.structuredQualificationDetails.mechanismPointsEn
                                ).map((pt, pIdx) => (
                                  <li key={pIdx} className="flex items-start gap-2.5 text-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-2" />
                                    <span className="leading-relaxed">{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Card 2: Attendance & Passing Rules */}
                            <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs space-y-3">
                              <h4 className="text-xs sm:text-sm font-bold text-[#1A3754] font-arabic flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#1A3754]" />
                                <span>
                                  {isRTL
                                    ? jobSeekerDetailsData.qualification.structuredQualificationDetails.rulesTitleAr
                                    : jobSeekerDetailsData.qualification.structuredQualificationDetails.rulesTitleEn}
                                </span>
                              </h4>
                              <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-700 font-arabic">
                                {(isRTL
                                  ? jobSeekerDetailsData.qualification.structuredQualificationDetails.rulesPointsAr
                                  : jobSeekerDetailsData.qualification.structuredQualificationDetails.rulesPointsEn
                                ).map((pt, pIdx) => (
                                  <li key={pIdx} className="flex items-start gap-2.5 text-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A3754] shrink-0 mt-2" />
                                    <span className="leading-relaxed">{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <ol className="space-y-2">
                          {(isRTL
                            ? jobSeekerDetailsData[selectedJobSeekerService].detailsAr
                            : jobSeekerDetailsData[selectedJobSeekerService].detailsEn
                          ).map((step, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-arabic"
                            >
                              <span className="w-5 h-5 rounded-full bg-[#1A3754] text-white flex items-center justify-center text-2xs font-bold shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  )}

                  {/* C. REQUIRED DOCUMENTS */}
                  {selectedJobSeekerSubTab === 'documents' && (
                    <div className="space-y-4 pt-1">
                      {selectedJobSeekerService === 'registration' && jobSeekerDetailsData.registration.visualDocuments ? (
                        <div className="space-y-6">
                          <p className="text-xs sm:text-sm text-slate-700 font-arabic font-medium">
                            {isRTL
                              ? jobSeekerDetailsData.registration.documentsIntroAr
                              : jobSeekerDetailsData.registration.documentsIntroEn}
                          </p>

                          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-6 gap-x-2 sm:gap-x-3 pt-3">
                            {jobSeekerDetailsData.registration.visualDocuments.map((doc) => {
                              const DocIcon = doc.icon;
                              return (
                                <div
                                  key={doc.num}
                                  className="flex flex-col items-center text-center space-y-3 px-1"
                                >
                                  {/* Circular frame with top number badge */}
                                  <div className="relative mt-2">
                                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center shadow-2xs hover:border-[#1A3754] transition-colors">
                                      <DocIcon className="w-7 h-7 text-[#1A3754]" strokeWidth={1.5} />
                                    </div>
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#1A3754] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                                      {doc.num}
                                    </span>
                                  </div>

                                  {/* Label text */}
                                  <p className="text-xs text-slate-800 leading-snug font-medium font-arabic max-w-[125px]">
                                    {isRTL ? doc.labelAr : doc.labelEn}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <ul className="space-y-2">
                          {(isRTL
                            ? jobSeekerDetailsData[selectedJobSeekerService].documentsAr
                            : jobSeekerDetailsData[selectedJobSeekerService].documentsEn
                          ).map((doc, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-arabic"
                            >
                              <FileCheck className="w-4 h-4 text-[#1A3754] shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{doc}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* D. REQUIREMENTS */}
                  {selectedJobSeekerSubTab === 'requirements' && (
                    <div className="space-y-8 pt-3">
                      {selectedJobSeekerService === 'registration' && jobSeekerDetailsData.registration.registrationRequirements ? (
                        <div className="space-y-8">
                          {/* ================= SECTION 1: ACADEMIC QUALIFICATIONS ================= */}
                          <div className="space-y-6">
                            {/* Main Section 1 Header Capsule */}
                            <div className="flex justify-center">
                              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-100/90 border border-slate-300/80 text-slate-900 text-xs sm:text-sm font-bold shadow-2xs">
                                <span className="font-arabic text-center">
                                  {isRTL
                                    ? jobSeekerDetailsData.registration.registrationRequirements.section1.titleAr
                                    : jobSeekerDetailsData.registration.registrationRequirements.section1.titleEn}
                                </span>
                                <span className="w-5 h-5 rounded-full bg-[#1A3754] text-white text-2xs font-bold flex items-center justify-center shrink-0 shadow-xs">
                                  {jobSeekerDetailsData.registration.registrationRequirements.section1.num}
                                </span>
                              </div>
                            </div>

                            {/* 3 Sub-Cards for Academic Qualification */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-1">
                              {jobSeekerDetailsData.registration.registrationRequirements.section1.cards.map((card, cIdx) => (
                                <div
                                  key={cIdx}
                                  className="relative rounded-2xl border border-slate-200/90 bg-white pt-7 pb-5 px-5 sm:px-6 shadow-2xs flex flex-col justify-start hover:border-slate-300 transition-colors"
                                >
                                  {/* Floating Top Header Pill */}
                                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-max max-w-[92%]">
                                    <div className="px-4 py-1.5 rounded-full bg-[#1A3754] text-white text-2xs sm:text-xs font-semibold shadow-xs text-center truncate">
                                      <span className="font-arabic">{isRTL ? card.titleAr : card.titleEn}</span>
                                    </div>
                                  </div>

                                  {/* Card Points */}
                                  <ul className="space-y-3.5 pt-1 text-xs sm:text-[13px] text-slate-700 font-arabic leading-relaxed">
                                    {(isRTL ? card.pointsAr : card.pointsEn).map((pt, pIdx) => (
                                      <li key={pIdx} className="flex items-start gap-2.5 text-start">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A3754] shrink-0 mt-2" />
                                        <span className="leading-relaxed">{pt}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* ================= SECTIONS 2, 3, 4: NATIONAL SERVICE, EXPERIENCE, RESIDENCE ================= */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-1">
                            
                            {/* Card 2: National Service */}
                            <div className="relative rounded-2xl border border-slate-200/90 bg-white pt-7 pb-5 px-5 sm:px-6 shadow-2xs flex flex-col justify-start hover:border-slate-300 transition-colors">
                              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-max max-w-[92%]">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A3754] text-white text-2xs sm:text-xs font-semibold shadow-xs">
                                  <span className="font-arabic">
                                    {isRTL
                                      ? jobSeekerDetailsData.registration.registrationRequirements.section2.titleAr
                                      : jobSeekerDetailsData.registration.registrationRequirements.section2.titleEn}
                                  </span>
                                  <span className="w-4 h-4 rounded-full bg-white text-[#1A3754] text-3xs font-bold flex items-center justify-center shrink-0">
                                    {jobSeekerDetailsData.registration.registrationRequirements.section2.num}
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-3 pt-1 text-xs sm:text-[13px] text-slate-700 font-arabic">
                                {/* Intro point */}
                                <p className="font-semibold text-slate-800 text-start leading-relaxed pb-1 border-b border-slate-100">
                                  {isRTL
                                    ? jobSeekerDetailsData.registration.registrationRequirements.section2.pointsAr[0]
                                    : jobSeekerDetailsData.registration.registrationRequirements.section2.pointsEn[0]}
                                </p>
                                {/* Sub bullets */}
                                <ul className="space-y-2.5">
                                  {(isRTL
                                    ? jobSeekerDetailsData.registration.registrationRequirements.section2.pointsAr.slice(1)
                                    : jobSeekerDetailsData.registration.registrationRequirements.section2.pointsEn.slice(1)
                                  ).map((pt, pIdx) => (
                                    <li key={pIdx} className="flex items-start gap-2.5 text-start">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A3754] shrink-0 mt-2" />
                                      <span className="leading-relaxed">{pt}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Card 3: Professional Experience */}
                            <div className="relative rounded-2xl border border-slate-200/90 bg-white pt-7 pb-5 px-5 sm:px-6 shadow-2xs flex flex-col justify-start hover:border-slate-300 transition-colors">
                              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-max max-w-[92%]">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A3754] text-white text-2xs sm:text-xs font-semibold shadow-xs">
                                  <span className="font-arabic">
                                    {isRTL
                                      ? jobSeekerDetailsData.registration.registrationRequirements.section3.titleAr
                                      : jobSeekerDetailsData.registration.registrationRequirements.section3.titleEn}
                                  </span>
                                  <span className="w-4 h-4 rounded-full bg-white text-[#1A3754] text-3xs font-bold flex items-center justify-center shrink-0">
                                    {jobSeekerDetailsData.registration.registrationRequirements.section3.num}
                                  </span>
                                </div>
                              </div>

                              <ul className="space-y-3.5 pt-1 text-xs sm:text-[13px] text-slate-700 font-arabic leading-relaxed">
                                {(isRTL
                                  ? jobSeekerDetailsData.registration.registrationRequirements.section3.pointsAr
                                  : jobSeekerDetailsData.registration.registrationRequirements.section3.pointsEn
                                ).map((pt, pIdx) => (
                                  <li key={pIdx} className="flex items-start gap-2.5 text-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A3754] shrink-0 mt-2" />
                                    <span className="leading-relaxed">{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Card 4: Residence */}
                            <div className="relative rounded-2xl border border-slate-200/90 bg-white pt-7 pb-5 px-5 sm:px-6 shadow-2xs flex flex-col justify-start hover:border-slate-300 transition-colors">
                              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-max max-w-[92%]">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A3754] text-white text-2xs sm:text-xs font-semibold shadow-xs">
                                  <span className="font-arabic">
                                    {isRTL
                                      ? jobSeekerDetailsData.registration.registrationRequirements.section4.titleAr
                                      : jobSeekerDetailsData.registration.registrationRequirements.section4.titleEn}
                                  </span>
                                  <span className="w-4 h-4 rounded-full bg-white text-[#1A3754] text-3xs font-bold flex items-center justify-center shrink-0">
                                    {jobSeekerDetailsData.registration.registrationRequirements.section4.num}
                                  </span>
                                </div>
                              </div>

                              <ul className="space-y-3.5 pt-1 text-xs sm:text-[13px] text-slate-700 font-arabic leading-relaxed">
                                {(isRTL
                                  ? jobSeekerDetailsData.registration.registrationRequirements.section4.pointsAr
                                  : jobSeekerDetailsData.registration.registrationRequirements.section4.pointsEn
                                ).map((pt, pIdx) => (
                                  <li key={pIdx} className="flex items-start gap-2.5 text-start">
                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-2 ${pIdx === 2 ? 'bg-amber-600' : 'bg-[#1A3754]'}`} />
                                    <span className={`leading-relaxed ${pIdx === 2 ? 'text-amber-900/90 font-medium' : ''}`}>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                          </div>
                        </div>
                      ) : selectedJobSeekerService === 'field-training' &&
                        jobSeekerDetailsData['field-training']?.fieldTrainingRequirementsCards ? (
                        /* Highly Organized & Elegant Grid Layout for Requirements */
                        <div className="space-y-4 pt-1 pb-2">
                          
                          {/* Intro Summary Bar */}
                          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-700 font-arabic">
                            <div className="flex items-center gap-2.5">
                              <span className="w-2 h-2 rounded-full bg-[#1A3754]" />
                              <span className="font-semibold text-slate-900">
                                {isRTL
                                  ? 'شروط وضوابط الالتحاق بالتدريب الميداني (٧ متطلبات أساسية)'
                                  : 'Terms & Conditions for Field Training (7 Key Requirements)'}
                              </span>
                            </div>
                            <span className="text-xs text-slate-500 font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200">
                              {isRTL ? 'الالتزام إلزامي' : 'Mandatory Compliance'}
                            </span>
                          </div>

                          {/* 2-Column / 3-Column Structured Cards */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                            {jobSeekerDetailsData['field-training'].fieldTrainingRequirementsCards.map((card, cIdx) => (
                              <div
                                key={cIdx}
                                className={`bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:border-[#1A3754] hover:shadow-xs transition-all duration-200 flex flex-col justify-between group ${
                                  cIdx === 6 ? 'md:col-span-2 lg:col-span-3' : ''
                                }`}
                              >
                                <div>
                                  {/* Top Header: Step Badge + Icon Ring + Title */}
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#1A3754]/5 border border-[#1A3754]/20 flex items-center justify-center text-[#1A3754] shrink-0 group-hover:bg-[#1A3754] group-hover:text-white transition-colors">
                                      {cIdx === 0 && <BookMarked className="w-5 h-5" />}
                                      {cIdx === 1 && <Clock className="w-5 h-5" />}
                                      {cIdx === 2 && <Shield className="w-5 h-5" />}
                                      {cIdx === 3 && <Users className="w-5 h-5" />}
                                      {cIdx === 4 && <HeartHandshake className="w-5 h-5" />}
                                      {cIdx === 5 && <FileSpreadsheet className="w-5 h-5" />}
                                      {cIdx === 6 && <MessageSquareShare className="w-5 h-5" />}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="text-[11px] font-bold text-[#1A3754] uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-full">
                                          {isRTL ? `البند ${card.num}` : `Requirement 0${card.num}`}
                                        </span>
                                      </div>
                                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-arabic truncate mt-1">
                                        {isRTL ? card.titleAr : card.titleEn}
                                      </h4>
                                    </div>
                                  </div>

                                  {/* Requirement Description */}
                                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-arabic">
                                    {isRTL ? card.textAr : card.textEn}
                                  </p>
                                </div>

                                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-arabic">
                                  <span>{isRTL ? 'إجراء معتمد' : 'Verified Term'}</span>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : selectedJobSeekerService === 'nomination' &&
                        jobSeekerDetailsData.nomination.nominationRequirements ? (
                        <div className="space-y-6 pt-1 pb-2">
                          {/* ================= SECTION 1: NOMINATION REQUIREMENTS (7 CRITERIA) ================= */}
                          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
                            {/* Section Header & Subtitle */}
                            <div>
                              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-arabic flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#1A3754]" />
                                <span>
                                  {isRTL
                                    ? jobSeekerDetailsData.nomination.nominationRequirements.section1HeadingAr
                                    : jobSeekerDetailsData.nomination.nominationRequirements.section1HeadingEn}
                                </span>
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-600 font-arabic mt-1.5 leading-relaxed">
                                {isRTL
                                  ? jobSeekerDetailsData.nomination.nominationRequirements.section1IntroAr
                                  : jobSeekerDetailsData.nomination.nominationRequirements.section1IntroEn}
                              </p>
                            </div>

                            {/* 7 Horizontal Workflow / Grid Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5 lg:gap-2 pt-2 items-start">
                              {jobSeekerDetailsData.nomination.nominationRequirements.nominationCriteria.map(
                                (crit, cIdx) => (
                                  <div
                                    key={cIdx}
                                    className="flex flex-col items-center text-center group relative px-1 sm:px-1.5"
                                  >
                                    {/* Circular Frame with Number Pill and Icon */}
                                    <div className="relative mt-2 mb-3">
                                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center text-[#1A3754] shadow-2xs group-hover:border-[#1A3754] group-hover:scale-105 group-hover:shadow-xs transition-all duration-300">
                                        {cIdx === 0 && <Calendar className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />}
                                        {cIdx === 1 && <GraduationCap className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />}
                                        {cIdx === 2 && <Award className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />}
                                        {cIdx === 3 && <ClipboardList className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />}
                                        {cIdx === 4 && <Briefcase className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />}
                                        {cIdx === 5 && <Users className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />}
                                        {cIdx === 6 && <MapPin className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />}
                                      </div>

                                      {/* Top Number Badge */}
                                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#1A3754] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                                        {crit.num}
                                      </span>
                                    </div>

                                    {/* Requirement Text */}
                                    <p className="text-[11px] sm:text-xs text-slate-700 font-arabic leading-relaxed text-center">
                                      {isRTL ? crit.textAr : crit.textEn}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          {/* ================= SECTION 2: CONDITIONS FOR ATTENDING JOB INTERVIEWS (5 RULES) ================= */}
                          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
                            {/* Section 2 Header */}
                            <div>
                              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-arabic flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#1A3754]" />
                                <span>
                                  {isRTL
                                    ? jobSeekerDetailsData.nomination.nominationRequirements.section2HeadingAr
                                    : jobSeekerDetailsData.nomination.nominationRequirements.section2HeadingEn}
                                </span>
                              </h3>
                            </div>

                            {/* 5 Horizontal Workflow Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-3 pt-2 items-start">
                              {jobSeekerDetailsData.nomination.nominationRequirements.interviewAttendanceConditions.map(
                                (cond, condIdx) => (
                                  <div
                                    key={condIdx}
                                    className="flex flex-col items-center text-center group relative px-1 sm:px-2"
                                  >
                                    {/* Circular Frame with Number Pill and Icon */}
                                    <div className="relative mt-2 mb-3">
                                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center text-[#1A3754] shadow-2xs group-hover:border-[#1A3754] group-hover:scale-105 group-hover:shadow-xs transition-all duration-300">
                                        {condIdx === 0 && <Shirt className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />}
                                        {condIdx === 1 && <UserCheck className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />}
                                        {condIdx === 2 && <Timer className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />}
                                        {condIdx === 3 && <Video className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />}
                                        {condIdx === 4 && <Wrench className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />}
                                      </div>

                                      {/* Top Number Badge */}
                                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#1A3754] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                                        {cond.num}
                                      </span>
                                    </div>

                                    {/* Condition Text */}
                                    <p className="text-[11px] sm:text-xs text-slate-700 font-arabic leading-relaxed text-center">
                                      {isRTL ? cond.textAr : cond.textEn}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <ul className="space-y-2.5">
                          {(isRTL
                            ? jobSeekerDetailsData[selectedJobSeekerService].requirementsAr
                            : jobSeekerDetailsData[selectedJobSeekerService].requirementsEn
                          ).map((req, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-arabic"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{req}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* E. FAQS */}
                  {selectedJobSeekerSubTab === 'faqs' && (
                    <div className="space-y-3 pt-1">
                      {(isRTL
                        ? jobSeekerDetailsData[selectedJobSeekerService].faqsAr
                        : jobSeekerDetailsData[selectedJobSeekerService].faqsEn
                      ).map((faq, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/90 shadow-2xs space-y-1.5"
                        >
                          <div className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-slate-900 font-arabic">
                            <HelpCircle className="w-4 h-4 text-[#1A3754] shrink-0 mt-0.5" />
                            <span className="leading-snug">{faq.q}</span>
                          </div>
                          <div className={`text-xs sm:text-[13px] text-slate-600 leading-relaxed font-arabic whitespace-pre-line ${isRTL ? 'pr-6' : 'pl-6'}`}>
                            {faq.a}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* F. VIDEO */}
                  {selectedJobSeekerSubTab === 'video' && (
                    <div className="space-y-3 pt-1">
                      <div className="relative aspect-video max-h-52 w-full rounded-xl bg-gradient-to-tr from-[#1A3754] to-slate-800 text-white flex flex-col items-center justify-center p-4 text-center overflow-hidden group shadow-xs">
                        <div className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs flex items-center justify-center transition-transform transform group-hover:scale-110 cursor-pointer shadow-md mb-2">
                          <Play className="w-5 h-5 text-white ml-0.5 fill-white" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold font-arabic max-w-md">
                          {isRTL
                            ? jobSeekerDetailsData[selectedJobSeekerService].videoTitleAr
                            : jobSeekerDetailsData[selectedJobSeekerService].videoTitleEn}
                        </span>
                        <span className="text-2xs text-slate-300 mt-1">
                          {isRTL ? `المدة: ${jobSeekerDetailsData[selectedJobSeekerService].videoDuration} دقيقة` : `Duration: ${jobSeekerDetailsData[selectedJobSeekerService].videoDuration} mins`}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* G. CONTACT US */}
                  {selectedJobSeekerSubTab === 'contact' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                      {/* Direct Email Card */}
                      <div className="bg-white rounded-xl p-3 border border-slate-200/80 space-y-1.5">
                        <span className="font-semibold text-slate-900 block font-arabic">
                          {isRTL ? 'البريد الإلكتروني المباشر' : 'Direct Email Support'}
                        </span>
                        <a
                          href={`mailto:${jobSeekerDetailsData[selectedJobSeekerService]?.contactInfo?.email || 'jsaldiffin@hr.sharjah.ae'}`}
                          className="inline-flex items-center gap-1.5 text-[#1A3754] font-bold hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{jobSeekerDetailsData[selectedJobSeekerService]?.contactInfo?.email || 'jsaldiffin@hr.sharjah.ae'}</span>
                        </a>
                      </div>

                      {/* Phone Numbers Card */}
                      <div className="bg-white rounded-xl p-3 border border-slate-200/80 space-y-2">
                        <span className="font-semibold text-slate-900 block font-arabic">
                          {isRTL ? 'أرقام التواصل الهاتفي' : 'Telephone Numbers'}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          {(jobSeekerDetailsData[selectedJobSeekerService]?.contactInfo?.phones || ['065078806']).map((ph, pIdx) => (
                            <a
                              key={pIdx}
                              href={`tel:${ph}`}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[#1A3754] font-bold hover:bg-slate-100 transition-colors text-xs"
                              dir="ltr"
                            >
                              <Phone className="w-3 h-3 text-[#1A3754]" />
                              <span>{ph}</span>
                            </a>
                          ))}
                        </div>
                      </div>

                      <div className="sm:col-span-2 bg-white rounded-xl p-3 border border-slate-200/80 flex items-center justify-between text-slate-600 font-arabic">
                        <span>{isRTL ? 'ساعات العمل الرسمية:' : 'Official Working Hours:'}</span>
                        <span className="font-semibold text-slate-900">
                          {isRTL ? 'الإثنين - الخميس (7:30 ص - 3:30 م)' : 'Mon - Thu (7:30 AM - 3:30 PM)'}
                        </span>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </section>
  );
};
