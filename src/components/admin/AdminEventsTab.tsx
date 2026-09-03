import React, { useState, useRef } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Check,
  X,
  MapPin,
  Clock,
  Users,
  Globe,
  UploadCloud,
  Upload,
  Image as ImageIcon,
  FileImage,
  RefreshCw,
  Link as LinkIcon
} from 'lucide-react';
import { DepartmentEvent, EventCategory } from '../../types';
import { useAdminData } from '../../context/AdminDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const AdminEventsTab: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useAdminData();
  const { isRTL } = useAccessibility();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [category, setCategory] = useState<EventCategory>('Job Fair');
  const [startDate, setStartDate] = useState('2026-03-20');
  const [endDate, setEndDate] = useState('2026-03-22');
  const [time, setTime] = useState('09:00 AM - 03:00 PM');
  const [location, setLocation] = useState('Expo Centre Sharjah');
  const [isVirtual, setIsVirtual] = useState(false);
  const [virtualPlatform, setVirtualPlatform] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [targetAudience, setTargetAudience] = useState('Sharjah Job Seekers & Graduates');
  const [registrationOpen, setRegistrationOpen] = useState(true);
  const [status, setStatus] = useState<'upcoming' | 'past'>('upcoming');
  const [attendeesCount, setAttendeesCount] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFileSize, setUploadedFileSize] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<'file' | 'url'>('file');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const categories: EventCategory[] = [
    'Job Fair',
    'Webinar',
    'Conference',
    'Training',
    'Public Forum'
  ];

  const handleFileSelected = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(isRTL ? 'يرجى اختيار ملف صورة صالح (JPG, PNG, WebP)' : 'Please select a valid image file (JPG, PNG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        // Optimize to max 1600px dimension for performance
        const maxDim = 1600;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.88);
          setImageUrl(dataUrl);
        } else {
          setImageUrl(event.target?.result as string);
        }
        setUploadedFileName(file.name);
        setUploadedFileSize(`${(file.size / 1024).toFixed(0)} KB`);
      };
      img.src = event.target?.result as string;
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
    setCategory('Job Fair');
    setStartDate('2026-03-20');
    setEndDate('2026-03-22');
    setTime('09:00 AM - 03:00 PM');
    setLocation('Expo Centre Sharjah');
    setIsVirtual(false);
    setVirtualPlatform('');
    setDescription('');
    setDescriptionAr('');
    setTargetAudience('Sharjah Job Seekers & Graduates');
    setRegistrationOpen(true);
    setStatus('upcoming');
    setAttendeesCount('');
    setImageUrl('');
    setUploadedFileName(null);
    setUploadedFileSize(null);
    setImageInputMode('file');
    setIsAdding(false);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleStartEdit = (event: DepartmentEvent) => {
    setEditingId(event.id);
    setTitle(event.title);
    setTitleAr(event.titleAr || '');
    setCategory(event.category);
    setStartDate(event.startDate);
    setEndDate(event.endDate || '');
    setTime(event.time);
    setLocation(event.location);
    setIsVirtual(event.isVirtual);
    setVirtualPlatform(event.virtualPlatform || '');
    setDescription(event.description);
    setDescriptionAr(event.descriptionAr || '');
    setTargetAudience(event.targetAudience);
    setRegistrationOpen(event.registrationOpen);
    setStatus(event.status || 'upcoming');
    setAttendeesCount(event.attendeesCount || '');
    setImageUrl(event.imageUrl || '');
    setUploadedFileName(event.imageUrl && event.imageUrl.startsWith('data:') ? 'event-cover-image.jpg' : null);
    setUploadedFileSize(null);
    setImageInputMode(event.imageUrl && event.imageUrl.startsWith('http') && !event.imageUrl.startsWith('data:') ? 'url' : 'file');
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startDate) return;

    if (editingId) {
      updateEvent({
        id: editingId,
        title,
        titleAr: titleAr || title,
        category,
        startDate,
        endDate,
        time,
        location,
        isVirtual,
        virtualPlatform,
        description,
        descriptionAr: descriptionAr || description,
        targetAudience,
        registrationOpen,
        status,
        attendeesCount: attendeesCount || (status === 'past' ? '250+' : undefined),
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
      });
    } else {
      addEvent({
        title,
        titleAr: titleAr || title,
        category,
        startDate,
        endDate,
        time,
        location,
        isVirtual,
        virtualPlatform,
        description,
        descriptionAr: descriptionAr || description,
        targetAudience,
        registrationOpen,
        status,
        attendeesCount: attendeesCount || (status === 'past' ? '250+' : undefined),
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
      });
    }

    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-arabic flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#1A3754]" />
            <span>{isRTL ? 'إدارة الفعاليات القادمة والسابقة' : 'Department Events (Upcoming & Past)'}</span>
          </h3>
          <p className="text-xs text-slate-500 font-arabic mt-0.5">
            {isRTL
              ? 'إضافة وتنظيم المعارض الوظيفية والورش التدريبية والمؤتمرات الحكومية وإدارة التسجيل'
              : 'Create and manage government job fairs, training sessions, conferences, and registrations'}
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
            <span>{isRTL ? 'إضافة فعالية جديدة' : 'Add Department Event'}</span>
          </button>
        )}
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
                  ? isRTL ? 'تعديل بيانات الفعالية' : 'Edit Event Details'
                  : isRTL ? 'إضافة فعالية جديدة' : 'Create New Department Event'}
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
            {/* Title AR */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'اسم الفعالية (بالعربية) *' : 'Event Title (Arabic) *'}
              </label>
              <input
                type="text"
                required
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="معرض الشارقة للتوظيف والتأهيل المهني 2026"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:ring-2 focus:ring-[#1A3754]"
              />
            </div>

            {/* Title EN */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'اسم الفعالية (بالإنجليزية) *' : 'Event Title (English) *'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sharjah Career & National Talents Fair 2026"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:ring-2 focus:ring-[#1A3754]"
              />
            </div>

            {/* Category & Status */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'التصنيف' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'حالة التوقيت' : 'Event Timing Status'}
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'upcoming' | 'past')}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              >
                <option value="upcoming">{isRTL ? 'قادمة (Upcoming)' : 'Upcoming'}</option>
                <option value="past">{isRTL ? 'سابقة / منتهية (Past & Concluded)' : 'Past'}</option>
              </select>
            </div>

            {/* Dates & Time */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'تاريخ البدء' : 'Start Date'}
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'الوقت' : 'Time'}
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="09:00 AM - 02:00 PM"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            {/* Location & Virtual */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'المكان / القاعة' : 'Location / Venue'}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Expo Centre Sharjah / مركز إكسبو الشارقة"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'الجمهور المستهدف' : 'Target Audience'}
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Sharjah Government Employees / Job Seekers"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            {/* Event Cover Image Upload Section */}
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">
                  {isRTL ? 'صورة غلاف الفعالية' : 'Event Cover Image'}
                </label>
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setImageInputMode('file')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      imageInputMode === 'file'
                        ? 'bg-white text-[#1A3754] shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Upload className="w-3 h-3" />
                    <span>{isRTL ? 'رفع ملف صورة' : 'Upload File'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageInputMode('url')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      imageInputMode === 'url'
                        ? 'bg-white text-[#1A3754] shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <LinkIcon className="w-3 h-3" />
                    <span>{isRTL ? 'رابط خارجي' : 'Image URL'}</span>
                  </button>
                </div>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/jpg"
                className="hidden"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    handleFileSelected(files[0]);
                  }
                }}
              />

              {imageInputMode === 'file' ? (
                <div>
                  {imageUrl ? (
                    <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 p-3 flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300/80 shadow-2xs">
                        <img
                          src={imageUrl}
                          alt="Event preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold">
                          {isRTL ? 'معاينة' : 'Preview'}
                        </span>
                      </div>
                      <div className="flex-1 space-y-1.5 text-center sm:text-start w-full">
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <FileImage className="w-4 h-4 text-[#1A3754]" />
                          <span className="text-xs font-bold text-slate-900 truncate max-w-xs">
                            {uploadedFileName || (isRTL ? 'صورة الغلاف الحالية' : 'Current cover image')}
                          </span>
                        </div>
                        {uploadedFileSize && (
                          <p className="text-[11px] text-slate-500 font-medium">
                            {isRTL ? `الحجم التقريبي: ${uploadedFileSize}` : `Approx size: ${uploadedFileSize}`}
                          </p>
                        )}
                        <p className="text-[11px] text-emerald-700 font-bold flex items-center justify-center sm:justify-start gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>{isRTL ? 'تم تحسين وتجهيز الصورة بنجاح' : 'Image loaded & optimized'}</span>
                        </p>
                        <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1A3754] text-white hover:bg-[#12283e] transition-colors cursor-pointer"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>{isRTL ? 'تغيير الصورة' : 'Change Image'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setImageUrl('');
                              setUploadedFileName(null);
                              setUploadedFileSize(null);
                              if (fileInputRef.current) fileInputRef.current.value = '';
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>{isRTL ? 'حذف الصورة' : 'Remove'}</span>
                          </button>
                        </div>
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
                        <div className="w-12 h-12 rounded-2xl bg-[#1A3754]/10 text-[#1A3754] flex items-center justify-center">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-slate-800">
                            {isRTL
                              ? 'اسحب وأفلت صورة الفعالية هنا، أو اضغط للاختيار'
                              : 'Drag and drop event image here, or click to browse'}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {isRTL
                              ? 'يدعم صيغ JPG و PNG و WebP (يتم تحسين الحجم تلقائياً للأداء)'
                              : 'Supports JPG, PNG, and WebP (auto-optimized for web performance)'}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A3754] text-white text-xs font-bold shadow-2xs mt-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{isRTL ? 'اختيار ملف من الجهاز' : 'Choose File From Device'}</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:border-[#1A3754] outline-none"
                    />
                  </div>
                  {imageUrl && (
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <img
                        src={imageUrl}
                        alt="Event preview"
                        className="w-16 h-12 rounded-lg object-cover bg-slate-200 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="text-xs text-slate-600 truncate">{imageUrl}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Descriptions */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'الوصف (بالعربية)' : 'Description (Arabic)'}
              </label>
              <textarea
                rows={2}
                value={descriptionAr}
                onChange={(e) => setDescriptionAr(e.target.value)}
                placeholder="تفاصيل وأهداف الفعالية..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'الوصف (بالإنجليزية)' : 'Description (English)'}
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Event summary and objectives..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            {/* Registration toggle */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="reg-open-toggle"
                checked={registrationOpen}
                onChange={(e) => setRegistrationOpen(e.target.checked)}
                className="w-4 h-4 text-[#1A3754] rounded-md border-slate-300"
              />
              <label htmlFor="reg-open-toggle" className="text-xs font-bold text-slate-800 cursor-pointer">
                {isRTL ? 'فتح باب التسجيل للجمهور (Registration Open)' : 'Public Registration Open'}
              </label>
            </div>

            {status === 'past' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isRTL ? 'عدد الحضور الفعلي (للإحصائيات)' : 'Actual Attendance Count (Past Event)'}
                </label>
                <input
                  type="text"
                  value={attendeesCount}
                  onChange={(e) => setAttendeesCount(e.target.value)}
                  placeholder="650+ attendees"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                />
              </div>
            )}
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
              <span>{editingId ? (isRTL ? 'حفظ التعديلات' : 'Save Changes') : (isRTL ? 'نشر الفعالية' : 'Publish Event')}</span>
            </button>
          </div>
        </form>
      )}

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between gap-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-[#1A3754] border border-blue-100">
                  {ev.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    ev.status === 'past'
                      ? 'bg-slate-100 text-slate-700'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {ev.status === 'past' ? (isRTL ? 'فعالية سابقة' : 'Past Event') : (isRTL ? 'فعالية قادمة' : 'Upcoming')}
                </span>
              </div>

              <div className="flex items-start gap-3">
                {ev.imageUrl && (
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img
                      src={ev.imageUrl}
                      alt={ev.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 font-arabic line-clamp-2">
                    {isRTL ? ev.titleAr || ev.title : ev.title}
                  </h4>

                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{ev.startDate} • {ev.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{ev.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400 text-[11px]">
                {ev.registrationOpen ? (isRTL ? 'التسجيل متاح' : 'Registration Open') : (isRTL ? 'التسجيل مغلق' : 'Registration Closed')}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleStartEdit(ev)}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-[#1A3754] hover:bg-slate-100 transition-colors"
                  title="Edit Event"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(isRTL ? 'هل أنت متأكد من حذف هذه الفعالية؟' : 'Are you sure you want to delete this event?')) {
                      deleteEvent(ev.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
