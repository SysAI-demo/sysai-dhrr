import React, { useState, useRef } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Newspaper,
  Check,
  X,
  Star,
  Calendar,
  Clock,
  UploadCloud,
  Upload,
  Image as ImageIcon,
  FileImage,
  RefreshCw,
  AlertCircle,
  Link as LinkIcon
} from 'lucide-react';
import { NewsArticle, NewsCategory } from '../../types';
import { useAdminData } from '../../context/AdminDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const AdminNewsTab: React.FC = () => {
  const { news, addNews, updateNews, deleteNews } = useAdminData();
  const { isRTL } = useAccessibility();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [excerptAr, setExcerptAr] = useState('');
  const [content, setContent] = useState('');
  const [contentAr, setContentAr] = useState('');
  const [category, setCategory] = useState<NewsCategory>('Press Release');
  const [publishDate, setPublishDate] = useState(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  const [author, setAuthor] = useState('Department Media Office');
  const [readTime, setReadTime] = useState('3 min read');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFileSize, setUploadedFileSize] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<'file' | 'url'>('file');
  const [featured, setFeatured] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const categories: NewsCategory[] = [
    'Press Release',
    'Policy Update',
    'Workforce Bulletin',
    'Recognition',
    'Public Advisory',
    'Initiatives'
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
        // Optimize to max 1600px dimension for performance & crispness
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
    setExcerpt('');
    setExcerptAr('');
    setContent('');
    setContentAr('');
    setCategory('Press Release');
    setPublishDate(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    setAuthor('Department Media Office');
    setReadTime('3 min read');
    setImageUrl('');
    setUploadedFileName(null);
    setUploadedFileSize(null);
    setImageInputMode('file');
    setFeatured(false);
    setIsAdding(false);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleStartEdit = (article: NewsArticle) => {
    setEditingId(article.id);
    setTitle(article.title);
    setTitleAr(article.titleAr || '');
    setExcerpt(article.excerpt);
    setExcerptAr(article.excerptAr || '');
    setContent(article.content.join('\n\n'));
    setContentAr((article.contentAr || []).join('\n\n'));
    setCategory(article.category);
    setPublishDate(article.publishDate);
    setAuthor(article.author);
    setReadTime(article.readTime);
    setImageUrl(article.imageUrl);
    setUploadedFileName(article.imageUrl.startsWith('data:') ? 'uploaded-image.jpg' : null);
    setUploadedFileSize(null);
    setImageInputMode(article.imageUrl.startsWith('http') && !article.imageUrl.startsWith('data:') ? 'url' : 'file');
    setFeatured(Boolean(article.featured));
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    if (!imageUrl) {
      alert(isRTL ? 'يرجى تحميل ملف صورة للخبر' : 'Please upload an image file for the article');
      return;
    }

    const contentParagraphs = content.split('\n\n').filter(Boolean);
    const contentParagraphsAr = contentAr.split('\n\n').filter(Boolean);

    if (editingId) {
      updateNews({
        id: editingId,
        title,
        titleAr: titleAr || title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt,
        excerptAr: excerptAr || excerpt,
        content: contentParagraphs.length > 0 ? contentParagraphs : [excerpt],
        contentAr: contentParagraphsAr.length > 0 ? contentParagraphsAr : [excerptAr || excerpt],
        category,
        publishDate,
        author,
        readTime,
        imageUrl,
        featured
      });
    } else {
      addNews({
        title,
        titleAr: titleAr || title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt,
        excerptAr: excerptAr || excerpt,
        content: contentParagraphs.length > 0 ? contentParagraphs : [excerpt],
        contentAr: contentParagraphsAr.length > 0 ? contentParagraphsAr : [excerptAr || excerpt],
        category,
        publishDate,
        author,
        readTime,
        imageUrl,
        featured
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
            <Newspaper className="w-5 h-5 text-[#1A3754]" />
            <span>{isRTL ? 'إدارة الأخبار والمستجدات الصحفية' : 'Latest News & Press Releases'}</span>
          </h3>
          <p className="text-xs text-slate-500 font-arabic mt-0.5">
            {isRTL
              ? 'إضافة وتحرير ونشر الأخبار الرسمية المعروضة في الصفحة الرئيسية والمركز الإعلامي'
              : 'Add, update, or unpublish department news displayed across the home page and Media Centre'}
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
            <span>{isRTL ? 'إضافة خبر صحفي جديد' : 'Publish New Article'}</span>
          </button>
        )}
      </div>

      {/* Form Modal */}
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
                  ? isRTL ? 'تعديل الخبر الصحفي' : 'Edit News Article'
                  : isRTL ? 'إنشاء ونشر خبر صحفي جديد' : 'Publish New News Article'}
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
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'عنوان الخبر (بالعربية) *' : 'Article Title (Arabic) *'}
              </label>
              <input
                type="text"
                required
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="موارد الشارقة تعلن إطلاق برنامج التوطين النوعي لعام 2026"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:ring-2 focus:ring-[#1A3754]"
              />
            </div>

            {/* English Title */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'عنوان الخبر (بالإنجليزية) *' : 'Article Title (English) *'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sharjah DHR Announces Strategic National Talent Initiative 2026"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:ring-2 focus:ring-[#1A3754]"
              />
            </div>

            {/* Excerpt AR */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'الموجز الصحفي (بالعربية) *' : 'Summary / Excerpt (Arabic) *'}
              </label>
              <textarea
                required
                rows={2}
                value={excerptAr}
                onChange={(e) => setExcerptAr(e.target.value)}
                placeholder="موجز صحفي قصير يظهر في البطاقات الرئيسية..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            {/* Excerpt EN */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'الموجز الصحفي (بالإنجليزية) *' : 'Summary / Excerpt (English) *'}
              </label>
              <textarea
                required
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A concise summary shown on portal cards..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            {/* Category */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'تصنيف الخبر' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NewsCategory)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured Article Image - File Upload First */}
            <div className="md:col-span-2 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileImage className="w-4 h-4 text-[#1A3754]" />
                  <span>{isRTL ? 'صورة الخبر المرفقة (تحميل ملف الصورة) *' : 'Featured Article Image (File Upload) *'}</span>
                </label>
                {/* Mode Switcher */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setImageInputMode('file')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                      imageInputMode === 'file'
                        ? 'bg-white text-[#1A3754] shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Upload className="w-3 h-3" />
                    <span>{isRTL ? 'تحميل ملف' : 'Upload File'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageInputMode('url')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                      imageInputMode === 'url'
                        ? 'bg-white text-[#1A3754] shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <LinkIcon className="w-3 h-3" />
                    <span>{isRTL ? 'رابط URL' : 'Image URL'}</span>
                  </button>
                </div>
              </div>

              {/* Hidden File Input for click-to-browse */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileSelected(file);
                  }
                }}
              />

              {imageInputMode === 'file' ? (
                <>
                  {!imageUrl ? (
                    /* Drag & Drop Upload Zone */
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                        isDragging
                          ? 'border-[#1A3754] bg-blue-50/70 scale-[0.99]'
                          : 'border-slate-300 hover:border-[#1A3754] bg-slate-50/70 hover:bg-blue-50/30'
                      }`}
                    >
                      <div className="w-13 h-13 rounded-2xl bg-white text-[#1A3754] border border-slate-200/80 shadow-2xs flex items-center justify-center">
                        <UploadCloud className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-800">
                          {isRTL
                            ? 'اسحب وأفلت ملف الصورة هنا، أو انقر للاختيار من جهازك'
                            : 'Drag and drop your image file here, or click to browse'}
                        </p>
                        <p className="text-xs text-slate-500">
                          {isRTL
                            ? 'صيغ الملفات المدعومة: JPG، PNG، WebP، GIF (تلقائياً بدقة عالية)'
                            : 'Supported formats: JPG, PNG, WebP, GIF (auto-optimized)'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="mt-1 px-4 py-2 rounded-xl bg-[#1A3754] text-white text-xs font-bold hover:bg-[#12283e] transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isRTL ? 'اختيار ملف الصورة' : 'Browse Image File'}</span>
                      </button>
                    </div>
                  ) : (
                    /* Uploaded Image Preview & Management Card */
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative w-36 h-24 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300 shadow-2xs">
                        <img
                          src={imageUrl}
                          alt="Article preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1 text-center sm:text-start">
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {uploadedFileName || (isRTL ? 'صورة الخبر المرفوعة' : 'Uploaded Article Image')}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                            <Check className="w-2.5 h-2.5" />
                            <span>{isRTL ? 'جاهز' : 'Ready'}</span>
                          </span>
                        </div>
                        {uploadedFileSize && (
                          <p className="text-[11px] text-slate-500 font-mono">
                            {uploadedFileSize}
                          </p>
                        )}
                        <p className="text-[11px] text-slate-500">
                          {isRTL ? 'ستظهر هذه الصورة في صدارة بطاقة ومحتوى الخبر' : 'This image will be displayed on the article card and full reading modal'}
                        </p>
                      </div>
                      <div className="flex sm:flex-col items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3 text-[#1A3754]" />
                          <span>{isRTL ? 'تغيير الملف' : 'Change File'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setImageUrl('');
                            setUploadedFileName(null);
                            setUploadedFileSize(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>{isRTL ? 'حذف' : 'Remove'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Fallback Direct URL Input */
                <div className="space-y-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setUploadedFileName(null);
                    }}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:ring-2 focus:ring-[#1A3754]"
                  />
                  {imageUrl && (
                    <div className="mt-2 w-32 h-20 rounded-xl overflow-hidden border border-slate-200">
                      <img src={imageUrl} alt="URL Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Publish Date & Read Time */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'تاريخ النشر' : 'Publish Date'}
              </label>
              <input
                type="text"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                placeholder="Mar 1, 2026"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'زمن القراءة المقدر' : 'Estimated Read Time'}
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="3 min read"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            {/* Featured toggle */}
            <div className="md:col-span-2 flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="featured-checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-[#1A3754] rounded-md border-slate-300"
              />
              <label htmlFor="featured-checkbox" className="text-xs font-bold text-slate-800 cursor-pointer flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>{isRTL ? 'تمييز الخبر كخبر رئيسي في أعلى الصفحة (Featured Story)' : 'Set as Top Featured Spotlight Article'}</span>
              </label>
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
              <span>{editingId ? (isRTL ? 'حفظ التعديلات' : 'Save Changes') : (isRTL ? 'نشر الخبر' : 'Publish Article')}</span>
            </button>
          </div>
        </form>
      )}

      {/* Articles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between gap-3"
          >
            <div className="flex gap-3.5">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-100"
              />
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#1A3754] border border-blue-100">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                      <span>{isRTL ? 'مميز' : 'Featured'}</span>
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.publishDate}</span>
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 font-arabic">
                  {isRTL ? item.titleAr || item.title : item.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-1 font-arabic">
                  {isRTL ? item.excerptAr || item.excerpt : item.excerpt}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{item.readTime}</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleStartEdit(item)}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-[#1A3754] hover:bg-slate-100 transition-colors"
                  title="Edit Article"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(isRTL ? 'هل أنت متأكد من حذف هذا الخبر؟' : 'Are you sure you want to delete this article?')) {
                      deleteNews(item.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Article"
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
