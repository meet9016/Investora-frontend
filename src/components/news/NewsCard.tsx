'use client';

import React from 'react';
import { NewsArticle } from '@/types';
import { Bookmark, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { useInvestora } from '@/context/InvestoraContext';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const { savedArticles, toggleSaveArticle, setSelectedArticle } = useInvestora();
  const isSaved = savedArticles.includes(article.id);

  return (
    <article
      onClick={() => setSelectedArticle(article)}
      className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between group"
    >
      <div>
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

          {/* Category Badge */}
          <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-slate-700/60 shadow-sm">
            {article.category}
          </span>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveArticle(article.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-md backdrop-blur-md transition ${
              isSaved ? 'bg-emerald-600 text-white' : 'bg-white/90 text-slate-700 hover:bg-white'
            }`}
            title="Bookmark"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span>•</span>
            <span>{article.publishedAt}</span>
          </div>

          <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition line-clamp-2">
            {article.title}
          </h3>

          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 pt-0">
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">{article.author}</span>
          <span className="font-bold text-emerald-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Read <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

