import React, { useState } from 'react';
import {
  Inbox,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  User,
  Building2,
  Phone,
  Mail,
  Calendar,
  Send,
  X,
  Trash2,
  ShieldCheck,
  Check
} from 'lucide-react';
import { GrievanceRequest, GrievanceStatus } from '../../types';
import { useAdminData } from '../../context/AdminDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const AdminGrievancesTab: React.FC = () => {
  const { grievances, updateGrievanceStatus, deleteGrievance } = useAdminData();
  const { isRTL } = useAccessibility();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedGrievance, setSelectedGrievance] = useState<GrievanceRequest | null>(null);

  // Detail Modal Edit State
  const [modalStatus, setModalStatus] = useState<GrievanceStatus>('Pending Review');
  const [adminNotes, setAdminNotes] = useState('');
  const [committeeDecision, setCommitteeDecision] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const statuses: { id: string; labelEn: string; labelAr: string; color: string }[] = [
    { id: 'All', labelEn: 'All Requests', labelAr: 'كافة الطلبات', color: 'bg-slate-100 text-slate-800' },
    { id: 'Pending Review', labelEn: 'Pending Review', labelAr: 'قيد التدقيق الأولي', color: 'bg-amber-100 text-amber-900 border-amber-300' },
    { id: 'Under Investigation', labelEn: 'Under Investigation', labelAr: 'قيد التحقيق والبحث', color: 'bg-blue-100 text-blue-900 border-blue-300' },
    { id: 'Committee Scheduled', labelEn: 'Committee Scheduled', labelAr: 'مجدول للجنة التظلمات', color: 'bg-purple-100 text-purple-900 border-purple-300' },
    { id: 'Resolved / Approved', labelEn: 'Resolved / Approved', labelAr: 'تم البت / قبول التظلم', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    { id: 'Closed / Rejected', labelEn: 'Closed / Rejected', labelAr: 'مغلق / رفض الطلب', color: 'bg-rose-100 text-rose-900 border-rose-300' },
  ];

  const filteredGrievances = grievances.filter((g) => {
    const matchesStatus = selectedStatus === 'All' || g.status === selectedStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      g.referenceNumber.toLowerCase().includes(q) ||
      g.employeeName.toLowerCase().includes(q) ||
      g.department.toLowerCase().includes(q) ||
      (g.departmentAr && g.departmentAr.toLowerCase().includes(q)) ||
      g.subject.toLowerCase().includes(q) ||
      g.civilId.includes(q);
    return matchesStatus && matchesSearch;
  });

  const handleOpenDetail = (g: GrievanceRequest) => {
    setSelectedGrievance(g);
    setModalStatus(g.status);
    setAdminNotes(g.adminNotes || '');
    setCommitteeDecision(g.committeeDecision || '');
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGrievance) return;

    updateGrievanceStatus(
      selectedGrievance.id,
      modalStatus,
      adminNotes,
      committeeDecision
    );

    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      setSelectedGrievance(null);
    }, 800);
  };

  const getStatusBadge = (status: GrievanceStatus) => {
    switch (status) {
      case 'Pending Review':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'Under Investigation':
        return 'bg-blue-50 text-blue-900 border-blue-200';
      case 'Committee Scheduled':
        return 'bg-purple-50 text-purple-900 border-purple-200';
      case 'Resolved / Approved':
        return 'bg-emerald-50 text-emerald-900 border-emerald-200';
      case 'Closed / Rejected':
        return 'bg-rose-50 text-rose-900 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 font-arabic">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Inbox className="w-5 h-5 text-[#1A3754]" />
            <span>{isRTL ? 'صندوق وارد طلبات التظلمات والشكاوى' : 'Employee Grievances & Complaints Inbox'}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isRTL
              ? 'متابعة الطلبات المقدمة من موظفي حكومة الشارقة وتحديث حالة لجان التظلمات وإصدار القرارات'
              : 'Review grievances submitted by Sharjah government employees, assign committee hearings, and issue decisions'}
          </p>
        </div>

        {/* Counter Summary */}
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold">
            {grievances.filter((g) => g.status === 'Pending Review').length} {isRTL ? 'جديد قيد التدقيق' : 'Pending Review'}
          </span>
          <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-bold">
            {grievances.length} {isRTL ? 'إجمالي الطلبات' : 'Total Cases'}
          </span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isRTL ? 'بحث برقم الطلب، اسم الموظف، الدائرة...' : 'Search ref code, employee name, department...'}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#1A3754]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {statuses.map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedStatus(st.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedStatus === st.id
                  ? 'bg-[#1A3754] text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {isRTL ? st.labelAr : st.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Grievances List Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100/90 text-slate-800 text-[11px] sm:text-xs uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3.5 whitespace-nowrap">{isRTL ? 'رقم التظلم المرجعي' : 'Reference Code'}</th>
                <th className="px-4 py-3.5 whitespace-nowrap">{isRTL ? 'تاريخ التقديم' : 'Date'}</th>
                <th className="px-4 py-3.5 whitespace-nowrap">{isRTL ? 'الموظف والدائرة' : 'Employee & Entity'}</th>
                <th className="px-4 py-3.5">{isRTL ? 'موضوع التظلم' : 'Grievance Subject'}</th>
                <th className="px-4 py-3.5 whitespace-nowrap">{isRTL ? 'الحالة الحالية' : 'Status'}</th>
                <th className="px-4 py-3.5 text-center whitespace-nowrap">{isRTL ? 'الإجراء' : 'Review'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredGrievances.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    {isRTL ? 'لا توجد طلبات تظلم تطابق معايير البحث' : 'No grievance requests matching search criteria'}
                  </td>
                </tr>
              ) : (
                filteredGrievances.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="font-mono font-bold text-[#1A3754] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md text-xs">
                        {g.referenceNumber}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 font-semibold whitespace-nowrap text-xs">
                      {g.submissionDate}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <strong className="text-slate-900 block font-bold text-xs sm:text-sm">
                        {g.employeeName}
                      </strong>
                      <span className="text-[11px] text-slate-500 block">
                        {isRTL ? g.departmentAr || g.department : g.department}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-bold text-slate-800 text-xs sm:text-sm block line-clamp-1">
                        {g.subject}
                      </span>
                      <span className="text-[11px] text-slate-500 line-clamp-1">
                        {g.details}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(g.status)}`}>
                        {g.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleOpenDetail(g)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1A3754] text-white hover:bg-[#12283e] text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isRTL ? 'عرض الملف والبت' : 'Open Case'}</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Details & Decision Modal */}
      {selectedGrievance && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#1A3754] text-white p-5 sm:p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-amber-300">
                  {selectedGrievance.referenceNumber}
                </span>
                <h3 className="text-base sm:text-lg font-bold">
                  {isRTL ? 'ملف طلب التظلم ودراسة الحالة' : 'Grievance Review & Official Action File'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedGrievance(null)}
                className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Scrollable */}
            <div className="p-6 overflow-y-auto space-y-5 text-slate-900 text-xs sm:text-sm">
              {/* Employee Summary Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#1A3754]" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">{isRTL ? 'اسم الموظف' : 'Employee Name'}</span>
                    <strong className="text-slate-800">{selectedGrievance.employeeName}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#1A3754]" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">{isRTL ? 'الجهة الحكومية' : 'Government Entity'}</span>
                    <strong className="text-slate-800">
                      {isRTL ? selectedGrievance.departmentAr || selectedGrievance.department : selectedGrievance.department}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#1A3754]" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">{isRTL ? 'البريد الإلكتروني' : 'Email'}</span>
                    <span className="text-slate-700">{selectedGrievance.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#1A3754]" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">{isRTL ? 'رقم الهاتف' : 'Phone'}</span>
                    <span className="text-slate-700">{selectedGrievance.phone}</span>
                  </div>
                </div>

                <div className="sm:col-span-2 pt-2 border-t border-slate-200/60 flex justify-between text-[11px] text-slate-600">
                  <span>{isRTL ? 'الهوية الوطنية:' : 'Emirates ID:'} {selectedGrievance.civilId}</span>
                  <span>{isRTL ? 'الرقم الوظيفي:' : 'Emp No:'} {selectedGrievance.employeeNumber}</span>
                  <span>{isRTL ? 'تاريخ الورود:' : 'Date:'} {selectedGrievance.submissionDate}</span>
                </div>
              </div>

              {/* Subject & Description */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800">
                    {selectedGrievance.type}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">{selectedGrievance.subject}</h4>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed text-xs">
                  {selectedGrievance.details}
                </div>
              </div>

              {/* Attached Documents */}
              <div>
                <strong className="block text-xs font-bold text-slate-700 mb-2">
                  {isRTL ? 'المرفقات والوثائق المؤيدة المرفقة بالطلب:' : 'Attached Evidence Documents:'}
                </strong>
                <div className="space-y-1.5">
                  {selectedGrievance.documentsAttached.map((doc, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 text-slate-800">
                        <FileText className="w-4 h-4 text-[#1A3754]" />
                        <span>{doc}</span>
                      </div>
                      <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                        {isRTL ? 'معتمد' : 'Attached'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update & Committee Decision Form */}
              <form onSubmit={handleSaveStatus} className="space-y-4 pt-4 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isRTL ? 'تحديث حالة الطلب الرسمية *' : 'Official Committee Action Status *'}
                  </label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value as GrievanceStatus)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 font-bold text-slate-800"
                  >
                    <option value="Pending Review">قيد التدقيق الأولي (Pending Review)</option>
                    <option value="Under Investigation">قيد التحقيق والبحث (Under Investigation)</option>
                    <option value="Committee Scheduled">مجدول للجنة التظلمات (Committee Scheduled)</option>
                    <option value="Resolved / Approved">تم البت / قبول التظلم (Resolved / Approved)</option>
                    <option value="Closed / Rejected">مغلق / رفض التظلم (Closed / Rejected)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isRTL ? 'ملاحظات وتوصيات المشرف الداخلي' : 'Internal Admin / Legal Notes'}
                  </label>
                  <textarea
                    rows={2}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="ملاحظات المراجعة القانونية والتدقيق..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isRTL ? 'قرار لجنة التظلمات والشكاوى النهائي' : 'Official Grievance Committee Decision & Resolution'}
                  </label>
                  <textarea
                    rows={2}
                    value={committeeDecision}
                    onChange={(e) => setCommitteeDecision(e.target.value)}
                    placeholder="نص القرار الصادر من اللجنة والموجه للموظف والجهة..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(isRTL ? 'هل أنت متأكد من حذف هذا الطلب؟' : 'Delete this grievance record?')) {
                        deleteGrievance(selectedGrievance.id);
                        setSelectedGrievance(null);
                      }
                    }}
                    className="px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isRTL ? 'حذف السجل' : 'Delete Case'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedGrievance(null)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                    >
                      {isRTL ? 'إلغاء' : 'Close'}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs sm:text-sm font-bold bg-[#1A3754] text-white hover:bg-[#12283e] rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      {saveToast ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>{isRTL ? 'تم الحفظ والاعتماد' : 'Saved & Updated!'}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>{isRTL ? 'حفظ وتحديث الحالة' : 'Save Status & Resolution'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
