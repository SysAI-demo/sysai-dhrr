import React, { useEffect, useState } from 'react';
import { X, Clock, Calendar, User, Share2, Printer, Download, Check, Volume2, VolumeX } from 'lucide-react';
import { NewsArticle } from '../types';

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsReading(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article]);

  if (!article) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const textToRead = `${article.title}. Published on ${article.publishDate}. ${article.content.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  return (
    <div
      id="article-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === 'article-modal-backdrop') onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Control Bar */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 font-semibold text-xs">
              {article.category}
            </span>
            {article.referenceNumber && (
              <span className="font-mono text-xs text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                Ref: {article.referenceNumber}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Text to Speech Reader */}
            {'speechSynthesis' in window && (
              <button
                onClick={toggleSpeech}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  isReading
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title={isReading ? 'Stop audio reader' : 'Listen to article (Text-to-Speech)'}
              >
                {isReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{isReading ? 'Stop' : 'Listen'}</span>
              </button>
            )}

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Print release"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Share / Copy Button */}
            <button
              onClick={handleCopyLink}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Copy share link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>

            <div className="h-4 w-px bg-slate-300 mx-1" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div className="space-y-3">
            <h2 id="article-modal-title" className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {article.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>{article.publishDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Article Banner Image */}
          <div className="rounded-2xl overflow-hidden max-h-80 border border-slate-200">
            <img
              src={article.imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Excerpt Lead */}
          <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100">
            {article.excerpt}
          </p>

          {/* Full Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            {article.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Attachments Section */}
          {article.attachments && article.attachments.length > 0 && (
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Attachments & Annexes
              </h4>
              <div className="space-y-2">
                {article.attachments.map((file, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        {file.type}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-900">{file.name}</div>
                        <div className="text-[11px] text-slate-500">{file.size}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const blob = new Blob(['Government Document Data Simulation'], { type: 'text/plain' });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = file.name;
                        a.click();
                      }}
                      className="px-3 py-1.5 bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-300 hover:border-blue-600 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Official Public Press Distribution</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition-colors"
          >
            Close Reader
          </button>
        </div>

      </div>
    </div>
  );
};
