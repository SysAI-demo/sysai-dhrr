import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Image, ExternalLink, ArrowUp, ArrowDown, Check, X, Info, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';
import { CarouselSlide } from '../../types';
import { useAdminData } from '../../context/AdminDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const AdminBannerTab: React.FC = () => {
  const { slides, addSlide, updateSlide, deleteSlide, reorderSlides } = useAdminData();
  const { isRTL } = useAccessibility();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [subtitleAr, setSubtitleAr] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [tag, setTag] = useState('');
  const [tagAr, setTagAr] = useState('');
  const [imageUrl, setImageUrl] = useState('/1.jpg');
  const [primaryActionText, setPrimaryActionText] = useState('EXPLORE SERVICES');
  const [primaryActionTextAr, setPrimaryActionTextAr] = useState('استكشف الخدمات');
  const [primaryActionLink, setPrimaryActionLink] = useState('#eservices');

  const presetImages = [
    { label: 'Banner 1 (Main Official)', url: '/1.jpg' },
    { label: 'Banner 2 (Leadership & Vision)', url: '/2.jpg' },
    { label: 'Banner 3 (Portal Panorama)', url: '/3.png' },
    { label: 'Workforce & Talent Excellence', url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=80' },
    { label: 'Digital Transformation & AI', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80' },
    { label: 'Community & National Cadres', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80' }
  ];

  const resetForm = () => {
    setTitle('');
    setTitleAr('');
    setSubtitle('');
    setSubtitleAr('');
    setDescription('');
    setDescriptionAr('');
    setTag('');
    setTagAr('');
    setImageUrl('/1.jpg');
    setPrimaryActionText('EXPLORE SERVICES');
    setPrimaryActionTextAr('استكشف الخدمات');
    setPrimaryActionLink('#eservices');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleStartEdit = (slide: CarouselSlide) => {
    setEditingId(slide.id);
    setTitle(slide.title);
    setTitleAr(slide.titleAr || '');
    setSubtitle(slide.subtitle);
    setSubtitleAr(slide.subtitleAr || '');
    setDescription(slide.description || '');
    setDescriptionAr(slide.descriptionAr || '');
    setTag(slide.tag || '');
    setTagAr(slide.tagAr || '');
    setImageUrl(slide.imageUrl);
    setPrimaryActionText(slide.primaryActionText);
    setPrimaryActionTextAr(slide.primaryActionTextAr || '');
    setPrimaryActionLink(slide.primaryActionLink || '#eservices');
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    if (editingId) {
      updateSlide({
        id: editingId,
        title,
        titleAr: titleAr || title,
        subtitle: subtitle || 'Department of Human Resources - Sharjah',
        subtitleAr: subtitleAr || 'دائرة الموارد البشرية - حكومة الشارقة',
        description,
        descriptionAr,
        tag,
        tagAr,
        imageUrl,
        primaryActionText: primaryActionText || 'EXPLORE SERVICES',
        primaryActionTextAr: primaryActionTextAr || 'استكشف الخدمات',
        primaryActionLink
      });
    } else {
      addSlide({
        title,
        titleAr: titleAr || title,
        subtitle: subtitle || 'Department of Human Resources - Sharjah',
        subtitleAr: subtitleAr || 'دائرة الموارد البشرية - حكومة الشارقة',
        description,
        descriptionAr,
        tag,
        tagAr,
        imageUrl,
        primaryActionText: primaryActionText || 'EXPLORE SERVICES',
        primaryActionTextAr: primaryActionTextAr || 'استكشف الخدمات',
        primaryActionLink
      });
    }

    resetForm();
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= slides.length) return;
    const newSlides = [...slides];
    const temp = newSlides[index];
    newSlides[index] = newSlides[target];
    newSlides[target] = temp;
    reorderSlides(newSlides);
  };

  return (
    <div className="space-y-6">
      {/* Tab Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-arabic flex items-center gap-2">
            <Image className="w-5 h-5 text-[#1A3754]" />
            <span>{isRTL ? 'إدارة صور وبانرات الصفحة الرئيسية' : 'Home Banner Images & Carousel Slides'}</span>
          </h3>
          <p className="text-xs text-slate-500 font-arabic mt-0.5">
            {isRTL
              ? 'إضافة وتعديل صور البانر المتحرك وترتيب ظهورها في واجهة الموقع'
              : 'Add, edit, reorder, or replace active rotating slides displayed on the portal home page'}
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
            <span>{isRTL ? 'إضافة شريحة بانر جديدة' : 'Add New Banner Slide'}</span>
          </button>
        )}
      </div>

      {/* Recommended Banner Image Size Specification Callout */}
      <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-amber-50/50 p-4 sm:p-5 rounded-3xl border border-blue-200/90 shadow-2xs font-arabic">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#1A3754] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Maximize2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  {isRTL ? 'المقاس الموصى به لصور البانر الرئيسي' : 'Recommended Banner Image Dimensions'}
                </h4>
                <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-[#1A3754] text-white shadow-2xs">
                  1903 × 500 px
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                  {isRTL ? 'النسبة: 3.8 : 1' : 'Aspect Ratio: 3.8 : 1'}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                {isRTL
                  ? 'لضمان ملاءمة البانر بصورة متناسقة تماماً مع إطار الصفحة الرئيسية دون أي اقتصاص أو فراغات بيضاء، يرجى استخدام صور بقياس 1903 × 500 بكسل (أو 1920 × 500 بكسل للشاشات القياسية، و 2400 × 630 بكسل لشاشات ريتنا عالية الدقة). التنسيق المفضل: JPG أو PNG أو WebP عالي الوضوح.'
                  : 'To ensure seamless framing on the homepage without letterboxing or cropping, design your banner at 1903 × 500 pixels (or standard 1920 × 500 px, 2400 × 630 px for high-res Retina displays). Preferred formats: JPG, PNG, or WebP.'}
              </p>
            </div>
          </div>

          {/* Quick Specifications Pill Box */}
          <div className="flex flex-wrap md:flex-col items-start md:items-end gap-1.5 shrink-0">
            <div className="text-xs font-mono font-bold text-slate-800 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-1.5">
              <span className="text-slate-400 font-sans font-medium text-[10px]">
                {isRTL ? 'الأبعاد الرسمية:' : 'Exact Size:'}
              </span>
              <span className="text-[#1A3754] font-black">1903 × 500 px</span>
            </div>
            <div className="text-[11px] font-mono text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
              <span className="text-slate-400 font-sans text-[10px] mr-1">
                {isRTL ? 'العرض الأدنى:' : 'Min Width:'}
              </span>
              1400 px (3.8:1)
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Form Modal/Drawer */}
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
                  ? isRTL ? 'تعديل بيانات شريحة البانر' : 'Edit Banner Slide'
                  : isRTL ? 'إضافة شريحة بانر جديدة' : 'Create New Banner Slide'}
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
            {/* Arabic Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'عنوان الشريحة (بالعربية) *' : 'Slide Title (Arabic) *'}
              </label>
              <input
                type="text"
                required
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="تمكين الكفاءات الوطنية ومستقبل العمل"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:ring-2 focus:ring-[#1A3754]"
              />
            </div>

            {/* English Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'عنوان الشريحة (بالإنجليزية) *' : 'Slide Title (English) *'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Empowering National Talents & Future of Work"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:ring-2 focus:ring-[#1A3754]"
              />
            </div>

            {/* Subtitle AR */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'العنوان الفرعي (بالعربية)' : 'Subtitle (Arabic)'}
              </label>
              <input
                type="text"
                value={subtitleAr}
                onChange={(e) => setSubtitleAr(e.target.value)}
                placeholder="دائرة الموارد البشرية - حكومة الشارقة"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            {/* Subtitle EN */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'العنوان الفرعي (بالإنجليزية)' : 'Subtitle (English)'}
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Department of Human Resources - Sharjah"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            {/* Image URL with Preset Selector */}
            <div className="md:col-span-2 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {isRTL ? 'رابط صورة البانر (URL أو مسار الصورة) *' : 'Banner Image URL or Path *'}
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-[#1A3754] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Maximize2 className="w-3 h-3 text-[#1A3754]" />
                    {isRTL ? 'المقاس الموصى به: 1903 × 500 بكسل' : 'Recommended: 1903 × 500 px'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-sans">
                    (3.8:1)
                  </span>
                </div>
              </div>

              {/* Informative Sizing Hint Box */}
              <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center justify-between gap-3 text-xs text-blue-950 font-arabic">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#1A3754] shrink-0" />
                  <span className="text-[11px] sm:text-xs">
                    {isRTL
                      ? 'قياس صورة البانر المتوافق مع الصفحة الرئيسية هو 1903 × 500 بكسل بنسبة أبعاد 3.8:1 لتجنب الاقتصاص وتعبئة الشاشة بالكامل.'
                      : 'The optimal banner dimension matching the homepage carousel is exactly 1903 × 500 px (3.8:1 ratio) for edge-to-edge clarity.'}
                  </span>
                </div>
                <span className="font-mono text-[11px] font-black text-[#1A3754] bg-white px-2 py-0.5 rounded border border-blue-200 shrink-0 shadow-2xs">
                  1903 × 500 px
                </span>
              </div>

              <input
                type="text"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/1.jpg or https://..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white"
              />

              {/* Presets */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[11px] font-semibold text-slate-500 self-center">
                  {isRTL ? 'نماذج جاهزة:' : 'Quick Presets:'}
                </span>
                {presetImages.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(p.url)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                      imageUrl === p.url
                        ? 'bg-[#1A3754] text-white border-[#1A3754]'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Image Preview with Aspect Frame & Dimensions Overlay */}
              {imageUrl && (
                <div className="mt-2 relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center aspect-[1903/500] max-h-48 w-full shadow-2xs">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Dimension pill badge overlay */}
                  <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-white/20 shadow-sm flex items-center gap-1.5">
                    <Maximize2 className="w-3 h-3 text-emerald-400" />
                    <span>1903 × 500 px</span>
                    <span className="text-white/60 font-sans text-[9px]">(3.8:1)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Tag / Category Badge */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'وسام التمييز (بالعربية)' : 'Badge Label (Arabic)'}
              </label>
              <input
                type="text"
                value={tagAr}
                onChange={(e) => setTagAr(e.target.value)}
                placeholder="الرؤية الاستراتيجية 2026"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'وسام التمييز (بالإنجليزية)' : 'Badge Label (English)'}
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Strategic Vision 2026"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            {/* Action Button Link */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'نص زر الإجراء' : 'Button Text'}
              </label>
              <input
                type="text"
                value={isRTL ? primaryActionTextAr : primaryActionText}
                onChange={(e) =>
                  isRTL ? setPrimaryActionTextAr(e.target.value) : setPrimaryActionText(e.target.value)
                }
                placeholder="EXPLORE SERVICES / استكشف الخدمات"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'رابط زر الإجراء' : 'Button Target Link'}
              </label>
              <input
                type="text"
                value={primaryActionLink}
                onChange={(e) => setPrimaryActionLink(e.target.value)}
                placeholder="#eservices or /initiatives"
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
              <span>{editingId ? (isRTL ? 'حفظ التعديلات' : 'Save Changes') : (isRTL ? 'نشر الشريحة' : 'Publish Slide')}</span>
            </button>
          </div>
        </form>
      )}

      {/* List of active slides */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            {slides.length} {isRTL ? 'شرائح نشطة حالياً في البانر' : 'Active Carousel Slides'}
          </span>
          <span className="text-[11px] text-slate-400">
            {isRTL ? 'يتم التدوير تلقائياً كل 6 ثوانٍ' : 'Autoplay rotates every 6s on Home page'}
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Order Index & Reorder Controls */}
                <div className="flex flex-col items-center gap-1">
                  <button
                    disabled={index === 0}
                    onClick={() => moveSlide(index, 'up')}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                    #{index + 1}
                  </span>
                  <button
                    disabled={index === slides.length - 1}
                    onClick={() => moveSlide(index, 'down')}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Thumbnail with dimension badge */}
                <div className="relative w-28 h-14 sm:w-32 sm:h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs text-[9px] font-mono text-white text-center py-0.5 tracking-tight">
                    1903 × 500 px
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 font-arabic">
                      {isRTL ? slide.titleAr || slide.title : slide.title}
                    </span>
                    {slide.tag && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-[#1A3754] font-semibold border border-blue-100">
                        {slide.tag}
                      </span>
                    )}
                    <span className="text-[10px] font-mono font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                      <Maximize2 className="w-2.5 h-2.5 text-slate-400" />
                      1903 × 500 px
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-arabic line-clamp-1">
                    {isRTL ? slide.subtitleAr || slide.subtitle : slide.subtitle}
                  </p>
                  <span className="text-[11px] text-slate-400 font-mono truncate block max-w-xs">
                    {slide.imageUrl}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => handleStartEdit(slide)}
                  className="p-2 rounded-xl text-slate-600 hover:text-[#1A3754] hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                  title="Edit Slide"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(isRTL ? 'هل أنت متأكد من حذف هذه الشريحة؟' : 'Are you sure you want to delete this slide?')) {
                      deleteSlide(slide.id);
                    }
                  }}
                  disabled={slides.length <= 1}
                  className="p-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors disabled:opacity-30 cursor-pointer"
                  title="Delete Slide"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
