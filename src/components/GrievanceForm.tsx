import React, { useState } from 'react';
import { Send, CheckCircle2, FileText, AlertCircle, Sparkles, Building2, User, Mail, Phone, Hash } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { GrievanceType } from '../types';

export const GrievanceForm: React.FC = () => {
  const { submitGrievance } = useAdminData();
  const { isRTL } = useAccessibility();

  const [employeeName, setEmployeeName] = useState('');
  const [civilId, setCivilId] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState<GrievanceType>('Performance Appraisal');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [hasForm14, setHasForm14] = useState(true);
  const [hasEvidence, setHasEvidence] = useState(true);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const departments = [
    'Sharjah Municipality / بلدية مدينة الشارقة',
    'Sharjah Health Authority / هيئة الشارقة الصحية',
    'Department of Planning and Survey / دائرة التخطيط والمساحة',
    'Sharjah Media City (Shams) / مدينة الشارقة للإعلام',
    'Electricity, Water and Gas Authority (SEWA) / هيئة كهرباء ومياه وغاز الشارقة',
    'Sharjah Commerce & Tourism Authority / هيئة الإنماء التجاري والسياحي',
    'Sharjah Roads and Transport Authority / هيئة الطرق والمواصلات',
    'Other Sharjah Entity / جهة حكومية أخرى'
  ];

  const grievanceTypes: { id: GrievanceType; labelEn: string; labelAr: string }[] = [
    { id: 'Performance Appraisal', labelEn: 'Annual Performance Appraisal', labelAr: 'تقييم الأداء الوظيفي السنوي' },
    { id: 'Administrative Decision', labelEn: 'Administrative Decision / Transfer', labelAr: 'قرار إداري / نقل وندب' },
    { id: 'Leave & Entitlements', labelEn: 'Leave & Official Allowances', labelAr: 'الإجازات وبدلات المهمات' },
    { id: 'Disciplinary Action', labelEn: 'Disciplinary Penalty Objection', labelAr: 'اعتراض على جزاء تأديبي' },
    { id: 'Promotion & Grading', labelEn: 'Promotion & Job Reclassification', labelAr: 'ترقية وتعديل مسمى وظيفي' },
    { id: 'Other', labelEn: 'Other Employment Grievance', labelAr: 'تظلم وظيفي آخر' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeName || !civilId || !subject || !details) return;

    const docs = [];
    if (hasForm14) docs.push('Form No. 14 - Official Grievance Application.pdf');
    if (hasEvidence) docs.push('Supporting Evidence & Documents Package.pdf');

    const selectedTypeObj = grievanceTypes.find((t) => t.id === type);
    const typeAr = selectedTypeObj ? selectedTypeObj.labelAr : type;

    const ref = submitGrievance({
      employeeName,
      civilId,
      employeeNumber: employeeNumber || `SHJ-${Math.floor(10000 + Math.random() * 90000)}`,
      department,
      departmentAr: department,
      email,
      phone,
      type,
      typeAr,
      subject,
      details,
      documentsAttached: docs
    });

    setSubmittedRef(ref);
  };

  const handleReset = () => {
    setEmployeeName('');
    setCivilId('');
    setEmployeeNumber('');
    setDepartment('');
    setEmail('');
    setPhone('');
    setType('Performance Appraisal');
    setSubject('');
    setDetails('');
    setSubmittedRef(null);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 font-arabic">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold text-[#1A3754] uppercase tracking-wider block">
            {isRTL ? 'الخدمة الإلكترونية المباشرة' : 'Direct Electronic Service'}
          </span>
          <h4 className="text-base sm:text-lg font-bold text-slate-900">
            {isRTL ? 'تقديم طلب تظلم إلكتروني فوري' : 'Submit Official Online Grievance Request'}
          </h4>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-[#1A3754] font-bold border border-blue-100">
          {isRTL ? 'لجنة التظلمات المركزية' : 'Higher Grievance Committee'}
        </span>
      </div>

      {submittedRef ? (
        <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 space-y-4 text-center animate-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold">
              {isRTL ? 'تم تسجيل طلب التظلم بنجاح في النظام المركزي' : 'Grievance Successfully Registered in Central System'}
            </h4>
            <p className="text-xs text-emerald-800 max-w-lg mx-auto">
              {isRTL
                ? 'تم استلام طلبكم رسمياً وتوجيهه إلى أمانة لجنة التظلمات والشكاوى بدائرة الموارد البشرية لدراسة الأوراق وإحالتها للجنة المختصة.'
                : 'Your grievance has been received and routed to the Secretariat of the Grievance Committee at the Department of Human Resources.'}
            </p>
          </div>

          <div className="inline-block p-4 rounded-xl bg-white border border-emerald-300 shadow-2xs">
            <span className="text-xs text-slate-500 block font-semibold">
              {isRTL ? 'الرقم المرجعي لتتبع الطلب:' : 'Official Tracking Reference Number:'}
            </span>
            <span className="font-mono text-xl sm:text-2xl font-black text-[#1A3754] tracking-wider">
              {submittedRef}
            </span>
          </div>

          <div className="pt-2">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-[#1A3754] text-white text-xs font-bold hover:bg-[#12283e] transition-colors cursor-pointer"
            >
              {isRTL ? 'تقديم طلب تظلم آخر' : 'Submit Another Grievance'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Employee Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'اسم الموظف الثلاثي *' : 'Employee Full Name *'}
              </label>
              <input
                type="text"
                required
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                placeholder={isRTL ? 'سالم خلفان راشد الشامسي' : 'Salem Khalfan Al-Shamsi'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-[#1A3754] text-slate-900"
              />
            </div>

            {/* Emirates ID */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'رقم الهوية الوطنية (Emirates ID) *' : 'Emirates ID Number *'}
              </label>
              <input
                type="text"
                required
                value={civilId}
                onChange={(e) => setCivilId(e.target.value)}
                placeholder="784-1988-1234567-1"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-[#1A3754] text-slate-900"
              />
            </div>

            {/* Employee Number & Department */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'الرقم الوظيفي بالجهة' : 'Employee Job Number'}
              </label>
              <input
                type="text"
                value={employeeNumber}
                onChange={(e) => setEmployeeNumber(e.target.value)}
                placeholder="SHJ-54321"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'الجهة الحكومية التابع لها *' : 'Government Department / Entity *'}
              </label>
              <select
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
              >
                <option value="">{isRTL ? '-- اختر الدائرة الحكومية --' : '-- Select Government Entity --'}</option>
                {departments.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Email & Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'البريد الإلكتروني الرسمي *' : 'Official Contact Email *'}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="employee@department.shj.ae"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'رقم الهاتف المتحرك *' : 'Mobile Phone Number *'}
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+971 50 123 4567"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
              />
            </div>

            {/* Grievance Type */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'نوع التظلم أو الشكوى *' : 'Grievance Subject Type *'}
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as GrievanceType)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800"
              >
                {grievanceTypes.map((gt) => (
                  <option key={gt.id} value={gt.id}>
                    {isRTL ? gt.labelAr : gt.labelEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'موضوع التظلم باختصار *' : 'Grievance Subject Header *'}
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={isRTL ? 'تظلم بشأن نتيجة تقييم الأداء السنوي لعام 2025' : 'Objection to Annual Performance Evaluation 2025'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold"
              />
            </div>

            {/* Details */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'شرح وقائع وأسباب التظلم بالتفصيل *' : 'Detailed Explanation of Grievance Facts & Grounds *'}
              </label>
              <textarea
                required
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={isRTL ? 'يرجى تدوين كافة الوقائع والأسباب والقرارات المعترض عليها بدقة وتوضيح السند القانوني...' : 'State the full sequence of events, specific decisions contested, and relevant dates...'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
              />
            </div>

            {/* Attached Checkboxes */}
            <div className="sm:col-span-2 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="block font-bold text-xs text-slate-800">
                {isRTL ? 'إقرار إرفاق المستندات الرسمية المؤيدة:' : 'Declaration of Supporting Documents:'}
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={hasForm14}
                  onChange={(e) => setHasForm14(e.target.checked)}
                  className="rounded text-[#1A3754]"
                />
                <span>{isRTL ? 'تم تعبئة استمارة التظلم رقم 14 وتوقيعها رسمياً' : 'Form No. 14 completed and signed'}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={hasEvidence}
                  onChange={(e) => setHasEvidence(e.target.checked)}
                  className="rounded text-[#1A3754]"
                />
                <span>{isRTL ? 'كافة الوثائق والمراسلات والتقارير الداعمة جاهزة ومرفقة بالملف' : 'All supporting correspondence and performance records verified'}</span>
              </label>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#1A3754] text-white font-bold hover:bg-[#12283e] transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isRTL ? 'إرسال طلب التظلم الرسمي' : 'Submit Official Grievance'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
