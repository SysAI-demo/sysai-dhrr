import React, { useState, useRef } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Scale,
  Check,
  X,
  FileText,
  Download,
  Tag,
  UploadCloud,
  Upload,
  FileCheck,
  Eye,
  RefreshCw,
  Link as LinkIcon,
  ExternalLink,
  FileSpreadsheet
} from 'lucide-react';
import { RegulationItem } from '../../types';
import { useAdminData } from '../../context/AdminDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const AdminRegulationsTab: React.FC = () => {
  const { regulations, addRegulation, updateRegulation, deleteRegulation } = useAdminData();
  const { isRTL } = useAccessibility();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Form State
  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [lawNumber, setLawNumber] = useState('');
  const [category, setCategory] = useState<'Law' | 'Regulations' | 'Circulars' | 'Evaluation System'>('Circulars');
  const [year, setYear] = useState('2026');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [fileSize, setFileSize] = useState('1.5 MB');
  const [fileType, setFileType] = useState<'PDF' | 'DOCX'>('PDF');

  // PDF Upload State
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [pdfInputMode, setPdfInputMode] = useState<'file' | 'url'>('file');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const categories = [
    { id: 'Law', labelEn: 'Law', labelAr: 'القوانين التشريعية' },
    { id: 'Regulations', labelEn: 'Regulations', labelAr: 'اللوائح التنفيذية' },
    { id: 'Circulars', labelEn: 'Circulars', labelAr: 'التعاميم الرسمية' },
    { id: 'Evaluation System', labelEn: 'Evaluation System', labelAr: 'نظام تقييم الأداء' },
  ];

  const handleFileSelected = (file: File) => {
    const isDocx = file.name.toLowerCase().endsWith('.docx') || file.type.includes('wordprocessingml');
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (!isPdf && !isDocx) {
      alert(isRTL ? 'يرجى اختيار ملف PDF صالح' : 'Please select a valid PDF file');
      return;
    }

    const calculatedSize = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;
      
    setFileSize(calculatedSize);
    setFileType(isDocx ? 'DOCX' : 'PDF');
    setFileName(file.name);

    // If title is empty, suggest the filename without extension
    const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    if (!titleAr) {
      setTitleAr(cleanName);
    }
    if (!title) {
      setTitle(cleanName);
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPdfUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelected(files[0]);
    }
  };

  const resetForm = () => {
    setTitle('');
    setTitleAr('');
    setLawNumber('');
    setCategory('Circulars');
    setYear('2026');
    setDescription('');
    setDescriptionAr('');
    setFileSize('1.5 MB');
    setFileType('PDF');
    setPdfUrl('');
    setFileName('');
    setPdfInputMode('file');
    setIsAdding(false);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleStartEdit = (reg: RegulationItem) => {
    setEditingId(reg.id);
    setTitle(reg.title);
    setTitleAr(reg.titleAr);
    setLawNumber(reg.lawNumber);
    setCategory((reg.category as any) || 'Circulars');
    setYear(reg.year);
    setDescription(reg.description);
    setDescriptionAr(reg.descriptionAr);
    setFileSize(reg.fileSize || '1.5 MB');
    setFileType(reg.fileType || 'PDF');
    setPdfUrl(reg.pdfUrl || '');
    setFileName(reg.fileName || (reg.pdfUrl ? `${reg.lawNumber}.pdf` : ''));
    setPdfInputMode(reg.pdfUrl && reg.pdfUrl.startsWith('http') && !reg.pdfUrl.startsWith('data:') ? 'url' : 'file');
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr || !lawNumber) return;

    const matchedCat = categories.find((c) => c.id === category);
    const categoryAr = matchedCat ? matchedCat.labelAr : category;

    if (editingId) {
      updateRegulation({
        id: editingId,
        title: title || titleAr,
        titleAr,
        lawNumber,
        category,
        categoryAr,
        year,
        description: description || descriptionAr,
        descriptionAr,
        fileSize,
        fileType,
        pdfUrl: pdfUrl || undefined,
        fileName: fileName || undefined
      });
    } else {
      addRegulation({
        title: title || titleAr,
        titleAr,
        lawNumber,
        category,
        categoryAr,
        year,
        description: description || descriptionAr,
        descriptionAr,
        fileSize,
        fileType,
        pdfUrl: pdfUrl || undefined,
        fileName: fileName || undefined
      });
    }

    resetForm();
  };

  const filteredRegulations = filterCategory === 'All'
    ? regulations
    : regulations.filter((r) => r.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-arabic flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#1A3754]" />
            <span>{isRTL ? 'إدارة القوانين واللوائح والتعاميم' : 'Laws, Regulations & Circulars Repository'}</span>
          </h3>
          <p className="text-xs text-slate-500 font-arabic mt-0.5">
            {isRTL
              ? 'إضافة ونشر وتعديل القوانين والقرارات التنفيذية والتعاميم السنوية المعتمدة'
              : 'Publish and administer civil service laws, executive by-laws, and official periodic circulars'}
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => {
              resetForm();
              setIsAdding(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A3754] text-white text-xs sm:text-sm font-bold hover:bg-[#12283e] transition-colors shadow-2xs cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{isRTL ? 'إضافة وثيقة / تعميم جديد' : 'Publish Law or Circular'}</span>
          </button>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterCategory('All')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterCategory === 'All'
              ? 'bg-[#1A3754] text-white'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          {isRTL ? 'كافة الوثائق والتعاميم' : 'All Documents'} ({regulations.length})
        </button>
        {categories.map((c) => {
          const count = regulations.filter((r) => r.category === c.id).length;
          return (
            <button
              key={c.id}
              onClick={() => setFilterCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterCategory === c.id
                  ? 'bg-[#1A3754] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isRTL ? c.labelAr : c.labelEn} ({count})
            </button>
          );
        })}
      </div>

      {/* Form */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-3xl border-2 border-[#1A3754]/30 shadow-md space-y-5 animate-in fade-in duration-200 font-arabic"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1A3754]" />
              <span>
                {editingId
                  ? isRTL ? 'تعديل بيانات الوثيقة التشريعية' : 'Edit Regulatory Document'
                  : isRTL ? 'إضافة قانون أو تعميم جديد' : 'Publish New Law / Circular'}
              </span>
            </h4>
            <button
              type="button"
              onClick={resetForm}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'التصنيف الرئيسي *' : 'Document Category *'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.labelAr} ({c.labelEn})
                  </option>
                ))}
              </select>
            </div>

            {/* Law/Circular Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'رقم القانون / التعميم / القرار *' : 'Decree / Circular Number *'}
              </label>
              <input
                type="text"
                required
                value={lawNumber}
                onChange={(e) => setLawNumber(e.target.value)}
                placeholder="تعميم رقم (4) لسنة 2026 / Circular No. (4) of 2026"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white"
              />
            </div>

            {/* PDF Document Upload Zone */}
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#1A3754]" />
                  <span>{isRTL ? 'ملف الوثيقة الرسمية (PDF) *' : 'Official Document File (PDF) *'}</span>
                </label>
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setPdfInputMode('file')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      pdfInputMode === 'file'
                        ? 'bg-white text-[#1A3754] shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Upload className="w-3 h-3" />
                    <span>{isRTL ? 'رفع ملف PDF' : 'Upload PDF File'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPdfInputMode('url')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      pdfInputMode === 'url'
                        ? 'bg-white text-[#1A3754] shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <LinkIcon className="w-3 h-3" />
                    <span>{isRTL ? 'رابط ملف خارجي' : 'External URL'}</span>
                  </button>
                </div>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,application/pdf"
                className="hidden"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    handleFileSelected(files[0]);
                  }
                }}
              />

              {pdfInputMode === 'file' ? (
                <div>
                  {pdfUrl ? (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
                      <div className="flex items-center gap-3.5 w-full sm:w-auto">
                        <div className="w-12 h-12 rounded-xl bg-rose-500 text-white flex flex-col items-center justify-center font-bold shadow-2xs shrink-0">
                          <span className="text-[10px] tracking-wider uppercase">{fileType}</span>
                          <FileText className="w-4 h-4 mt-0.5" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-xs block">
                              {fileName || (isRTL ? 'ملف الوثيقة المرفق' : 'Attached Document')}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 whitespace-nowrap">
                              {isRTL ? 'جاهز للنشر' : 'Ready'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {fileSize} • {fileType} Document
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                        {pdfUrl && (
                          <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={fileName || `${lawNumber || 'regulation'}.pdf`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#1A3754] bg-white hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{isRTL ? 'معاينة / فتح' : 'Preview'}</span>
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1A3754] text-white hover:bg-[#12283e] transition-colors cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>{isRTL ? 'تغيير الملف' : 'Change'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPdfUrl('');
                            setFileName('');
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{isRTL ? 'حذف' : 'Remove'}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                        isDragging
                          ? 'border-[#1A3754] bg-blue-50/70 scale-[0.99]'
                          : 'border-slate-300 hover:border-[#1A3754]/60 bg-slate-50/50 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-slate-800">
                            {isRTL
                              ? 'اسحب وأفلت ملف الـ PDF هنا، أو اضغط للتصفح والاختيار'
                              : 'Drag and drop PDF document here, or click to browse'}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {isRTL
                              ? 'يدعم ملفات PDF و DOCX الرسمية (يتم قراءة الحجم والاسم تلقائياً)'
                              : 'Supports official PDF and DOCX files (size & name are detected automatically)'}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1A3754] text-white text-xs font-bold shadow-2xs mt-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{isRTL ? 'اختيار ملف PDF من الجهاز' : 'Select PDF From Computer'}</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={pdfUrl}
                    onChange={(e) => {
                      setPdfUrl(e.target.value);
                      if (!fileName && e.target.value) {
                        const parts = e.target.value.split('/');
                        setFileName(parts[parts.length - 1] || 'document.pdf');
                      }
                    }}
                    placeholder="https://example.gov.ae/documents/regulation.pdf"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:border-[#1A3754] outline-none"
                  />
                  {pdfUrl && (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="text-slate-600 truncate">{pdfUrl}</span>
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1A3754] hover:underline font-bold flex items-center gap-1 shrink-0 ml-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{isRTL ? 'فتح الرابط' : 'Open Link'}</span>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Year & File Size / Details */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'السنة' : 'Year'}
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'حجم الملف وصيغته' : 'File Size & Type'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  placeholder="1.8 MB"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                />
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value as 'PDF' | 'DOCX')}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                >
                  <option value="PDF">PDF</option>
                  <option value="DOCX">DOCX</option>
                </select>
              </div>
            </div>

            {/* Title AR */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'عنوان وموضوع الوثيقة (بالعربية) *' : 'Document Title (Arabic) *'}
              </label>
              <input
                type="text"
                required
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="بشأن تحديد ساعات الدوام الرسمي ونظام العمل المرن خلال شهر رمضان المبارك"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:ring-2 focus:ring-[#1A3754]"
              />
            </div>

            {/* Title EN */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'عنوان وموضوع الوثيقة (بالإنجليزية)' : 'Document Title (English)'}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Regarding Official Working Hours and Flexible Hybrid Workplace Framework"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white"
              />
            </div>

            {/* Description AR */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'شرح تفصيلي وملاحظات إجرائية (بالعربية)' : 'Procedural Description (Arabic)'}
              </label>
              <textarea
                rows={2}
                value={descriptionAr}
                onChange={(e) => setDescriptionAr(e.target.value)}
                placeholder="الضوابط والأحكام التنظيمية المرتبطة بالتعميم..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            {/* Description EN */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'شرح تفصيلي وملاحظات إجرائية (بالإنجليزية)' : 'Procedural Description (English)'}
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Key administrative provisions and execution mechanisms..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              {isRTL ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs sm:text-sm font-bold bg-[#1A3754] text-white hover:bg-[#12283e] rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{editingId ? (isRTL ? 'حفظ التعديلات' : 'Save Changes') : (isRTL ? 'نشر الوثيقة' : 'Publish Document')}</span>
            </button>
          </div>
        </form>
      )}

      {/* Regulations Table / Card List */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm font-arabic">
            <thead className="bg-slate-100/90 text-slate-800 text-[11px] sm:text-xs uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3.5 whitespace-nowrap">{isRTL ? 'الرقم والوثيقة' : 'Number / Reference'}</th>
                <th className="px-4 py-3.5 whitespace-nowrap">{isRTL ? 'السنة' : 'Year'}</th>
                <th className="px-4 py-3.5">{isRTL ? 'العنوان والموضوع' : 'Subject'}</th>
                <th className="px-4 py-3.5 whitespace-nowrap">{isRTL ? 'الملف المرفق' : 'Attached File'}</th>
                <th className="px-4 py-3.5 whitespace-nowrap">{isRTL ? 'التصنيف' : 'Category'}</th>
                <th className="px-4 py-3.5 text-center whitespace-nowrap">{isRTL ? 'إجراءات الإدارة' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredRegulations.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#1A3754] border border-blue-100 font-bold text-xs">
                      {reg.lawNumber}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 font-semibold whitespace-nowrap">
                    {reg.year}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                      {isRTL ? reg.titleAr : reg.title}
                    </span>
                    <span className="text-[11px] text-slate-500 line-clamp-1">
                      {isRTL ? reg.descriptionAr : reg.description}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1 ${
                        reg.pdfUrl
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        <FileText className="w-3 h-3" />
                        <span>{reg.fileType || 'PDF'} ({reg.fileSize})</span>
                      </span>
                      {reg.pdfUrl && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500" title="File uploaded" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                      {reg.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      {reg.pdfUrl && (
                        <a
                          href={reg.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={reg.fileName || `${reg.lawNumber}.pdf`}
                          className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors"
                          title={isRTL ? 'تحميل / فتح الملف' : 'Download / Open File'}
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleStartEdit(reg)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-[#1A3754] hover:bg-slate-100 transition-colors"
                        title="Edit Regulation"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(isRTL ? 'هل أنت متأكد من حذف هذه الوثيقة؟' : 'Are you sure you want to delete this document?')) {
                            deleteRegulation(reg.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Regulation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
