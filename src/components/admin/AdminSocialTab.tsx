import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Share2, Check, X, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { SocialPost } from '../../types';
import { useAdminData } from '../../context/AdminDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const AdminSocialTab: React.FC = () => {
  const { socialPosts, addSocialPost, updateSocialPost, deleteSocialPost } = useAdminData();
  const { isRTL } = useAccessibility();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [platform, setPlatform] = useState<SocialPost['platform']>('x');
  const [handle, setHandle] = useState('@dhr_sharjah');
  const [author, setAuthor] = useState('Sharjah Human Resources Department');
  const [content, setContent] = useState('');
  const [contentAr, setContentAr] = useState('');
  const [postDate, setPostDate] = useState('Just now');
  const [likes, setLikes] = useState('120');
  const [shares, setShares] = useState('24');
  const [mediaUrl, setMediaUrl] = useState('');
  const [postLink, setPostLink] = useState('https://x.com/dhr_sharjah');

  const resetForm = () => {
    setPlatform('x');
    setHandle('@dhr_sharjah');
    setAuthor('Sharjah Human Resources Department');
    setContent('');
    setContentAr('');
    setPostDate('Just now');
    setLikes('120');
    setShares('24');
    setMediaUrl('');
    setPostLink('https://x.com/dhr_sharjah');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleStartEdit = (post: SocialPost) => {
    setEditingId(post.id);
    setPlatform(post.platform);
    setHandle(post.handle);
    setAuthor(post.author);
    setContent(post.content);
    setContentAr(post.contentAr || '');
    setPostDate(post.postDate);
    setLikes(post.likes);
    setShares(post.shares);
    setMediaUrl(post.mediaUrl || '');
    setPostLink(post.postLink);
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content && !contentAr) return;

    if (editingId) {
      updateSocialPost({
        id: editingId,
        platform,
        handle,
        author,
        avatarUrl: '/1.png',
        content: content || contentAr,
        contentAr: contentAr || content,
        postDate,
        likes,
        shares,
        mediaUrl: mediaUrl || undefined,
        postLink
      });
    } else {
      addSocialPost({
        platform,
        handle,
        author,
        avatarUrl: '/1.png',
        content: content || contentAr,
        contentAr: contentAr || content,
        postDate,
        likes,
        shares,
        mediaUrl: mediaUrl || undefined,
        postLink
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
            <Share2 className="w-5 h-5 text-[#1A3754]" />
            <span>{isRTL ? 'إدارة منشورات قنوات التواصل الاجتماعي' : 'Official Social Media Feeds'}</span>
          </h3>
          <p className="text-xs text-slate-500 font-arabic mt-0.5">
            {isRTL
              ? 'إضافة وتحديث منشورات وتغريدات منصات (X، إنستغرام، لينكد إن، يوتيوب) على البوابة'
              : 'Curate posts and updates from official channels (X, Instagram, LinkedIn, YouTube)'}
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
            <span>{isRTL ? 'إضافة منشور تواصل جديد' : 'Publish Social Post'}</span>
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
                  ? isRTL ? 'تعديل المنشور' : 'Edit Social Media Post'
                  : isRTL ? 'إضافة منشور جديد' : 'Create New Social Post'}
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
            {/* Platform */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'المنصة' : 'Social Platform'}
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as SocialPost['platform'])}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              >
                <option value="x">X (formerly Twitter)</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>

            {/* Handle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'اسم الحساب / المعرف' : 'Official Handle / Username'}
              </label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="@dhr_sharjah"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            {/* Content AR */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'نص المنشور (بالعربية) *' : 'Post Content (Arabic) *'}
              </label>
              <textarea
                required
                rows={3}
                value={contentAr}
                onChange={(e) => setContentAr(e.target.value)}
                placeholder="نص التغريدة أو المنشور بالعربية..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            {/* Content EN */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'نص المنشور (بالإنجليزية)' : 'Post Content (English)'}
              </label>
              <textarea
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Post copy in English..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            {/* Media Image URL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'رابط الصورة المرفقة (اختياري)' : 'Attached Media Image URL (Optional)'}
              </label>
              <input
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            {/* Post Link */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'رابط المنشور الأصلي' : 'Direct Post Link'}
              </label>
              <input
                type="text"
                value={postLink}
                onChange={(e) => setPostLink(e.target.value)}
                placeholder="https://x.com/dhr_sharjah/status/..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            {/* Likes & Shares */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'عدد الإعجابات' : 'Likes Count'}
              </label>
              <input
                type="text"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
                placeholder="1.2k"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isRTL ? 'عدد المشاركات' : 'Shares / Reposts Count'}
              </label>
              <input
                type="text"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                placeholder="180"
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
              <span>{editingId ? (isRTL ? 'حفظ التعديلات' : 'Save Changes') : (isRTL ? 'نشر المنشور' : 'Publish Post')}</span>
            </button>
          </div>
        </form>
      )}

      {/* Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between gap-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {post.platform}
                </span>
                <span className="text-[11px] text-slate-400">{post.postDate}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-arabic leading-relaxed">
                {isRTL ? post.contentAr || post.content : post.content}
              </p>
              {post.mediaUrl && (
                <img
                  src={post.mediaUrl}
                  alt="Post media"
                  className="w-full h-32 object-cover rounded-xl border border-slate-100 mt-2"
                />
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                <span>❤️ {post.likes}</span>
                <span>🔄 {post.shares}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleStartEdit(post)}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-[#1A3754] hover:bg-slate-100 transition-colors"
                  title="Edit Post"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(isRTL ? 'هل أنت متأكد من حذف هذا المنشور؟' : 'Are you sure you want to delete this post?')) {
                      deleteSocialPost(post.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Post"
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
