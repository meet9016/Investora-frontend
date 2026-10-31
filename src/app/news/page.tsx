'use client';

import React, { useState } from 'react';
import { useInvestora } from '@/context/InvestoraContext';
import NewsCard from '@/components/news/NewsCard';
import IPOCard from '@/components/news/IPOCard';
import { UPCOMING_IPOS } from '@/data/news';
import {
  Newspaper,
  Sparkles,
  TrendingUp,
  Bookmark,
  Search,
  Tag,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export default function NewsPage() {
  const { news, savedArticles, setSelectedArticle } = useInvestora();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const categories = [
    'All',
    'Economy',
    'Real Estate',
    'Mutual Funds',
    'Financial Education'
  ];

  const filteredNews = news.filter((art) => {
    if (showSavedOnly && !savedArticles.includes(art.id)) return false;
    if (activeCategory !== 'All' && art.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchExcerpt = art.excerpt.toLowerCase().includes(q);
      const matchTags = art.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchExcerpt && !matchTags) return false;
    }
    return true;
  });

  const featuredArticle = news.find((n) => n.featured) || news[0];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              Financial News & Editorial
            </span>
            <span className="text-xs text-slate-500 font-medium">SEBI-Compliant Market Analysis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Investment Tips, Real Estate & Stock Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Institutional research, macro interest rate trends, REIT analysis, and primary market updates.
          </p>
        </div>

        {/* Saved Articles Toggle */}
        <button
          onClick={() => setShowSavedOnly(!showSavedOnly)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border self-start md:self-auto ${
            showSavedOnly
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-current text-emerald-600' : ''}`} />
          <span>Bookmarked Articles ({savedArticles.length})</span>
        </button>
      </div>

      {/* LEAD FEATURED ARTICLE BANNER */}
      {featuredArticle && !showSavedOnly && activeCategory === 'All' && !searchQuery && (
        <div
          onClick={() => setSelectedArticle(featuredArticle)}
          className="relative rounded-3xl overflow-hidden bg-slate-950 text-white cursor-pointer group shadow-xl border border-slate-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Featured Lead Analysis
                </span>
                <span className="text-xs text-slate-400 font-medium">• {featuredArticle.readTime}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                {featuredArticle.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                {featuredArticle.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
                <span>By {featuredArticle.author} ({featuredArticle.authorRole})</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Full Editorial <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden bg-slate-900">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      )}

      {/* UPCOMING IPO RADAR */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-base">Indian IPO Radar (Primary Markets)</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Bidding window & GMP tracker</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {UPCOMING_IPOS.map((ipo) => (
            <IPOCard key={ipo.id} ipo={ipo} />
          ))}
        </div>
      </div>

      {/* Category Pills & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news, topics, tags..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredNews.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-2">
          <Newspaper className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="font-bold text-slate-800 text-sm">No articles match your criteria</h4>
          <p className="text-xs text-slate-500">Try choosing another category or clearing your search.</p>
        </div>
      )}

      {/* SEBI Compliance Alert */}
      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-3xl flex items-start gap-3 text-xs text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">SEBI Regulatory Notice for Investors:</p>
          <p className="leading-relaxed">
            Content provided on this portal is strictly for educational purposes and financial literacy. We do not provide stock recommendations, assured returns, or trade execution services. Ensure that you consult a registered financial advisor before acting on market information.
          </p>
        </div>
      </div>
    </div>
  );
}

