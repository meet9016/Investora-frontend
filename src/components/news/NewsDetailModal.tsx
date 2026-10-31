'use client';

import React from 'react';
import { X, Bookmark, Share2, Clock, Calendar, User, ShieldCheck, Tag, Info } from 'lucide-react';
import { useInvestora } from '@/context/InvestoraContext';

export default function NewsDetailModal() {
  const { selectedArticle, setSelectedArticle, savedArticles, toggleSaveArticle } = useInvestora();

  if (!selectedArticle) return null;

  const isSaved = savedArticles.includes(selectedArticle.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedArticle.title,
        text: selectedArticle.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            {selectedArticle.category}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveArticle(selectedArticle.id)}
              className={`p-2 rounded-full border transition ${
                isSaved
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Bookmark"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedArticle(null)}
              className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Title & Metadata */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
              {selectedArticle.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                {selectedArticle.author} ({selectedArticle.authorRole})
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedArticle.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {selectedArticle.publishedAt}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Excerpt */}
          <p className="text-base text-slate-700 font-medium italic border-l-4 border-emerald-600 pl-4 bg-emerald-50/40 py-2 rounded-r-xl">
            {selectedArticle.excerpt}
          </p>

          {/* Main Content */}
          <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
            {selectedArticle.content}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400" />
            {selectedArticle.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* SEBI Notice */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3 text-xs text-slate-600">
            <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <span className="font-bold text-slate-900">Disclaimer:</span> The opinions expressed in this editorial are for educational and informational purposes only. Investora India does not solicit securities investments or guarantee returns. Please conduct independent research or consult a registered investment advisor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

