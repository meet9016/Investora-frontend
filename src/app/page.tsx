'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  TrendingUp,
  Search,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Star,
  CheckCircle2,
  Newspaper,
  Layers,
  ChevronRight,
  Radio
} from 'lucide-react';
import { useInvestora } from '@/context/InvestoraContext';
import PropertyCard from '@/components/real-estate/PropertyCard';
import StockRow from '@/components/stocks/StockRow';
import NewsCard from '@/components/news/NewsCard';
import IPOCard from '@/components/news/IPOCard';
import { MARKET_INDICES } from '@/data/stocks';
import { UPCOMING_IPOS } from '@/data/news';

export default function HomePage() {
  const {
    properties,
    stocks,
    news,
    setIsGlobalSearchOpen,
    setSelectedStock,
    setSelectedProperty
  } = useInvestora();

  // Hero Search State
  const [heroSearchTab, setHeroSearchTab] = useState<'property' | 'stocks'>('property');
  const [heroCity, setHeroCity] = useState('Mumbai');
  const [heroListingType, setHeroListingType] = useState<'Buy' | 'Rent'>('Buy');
  const [heroSearchQuery, setHeroSearchQuery] = useState('');

  // Market Movers Tab State
  const [marketMoverTab, setMarketMoverTab] = useState<'gainers' | 'losers' | 'active'>('gainers');

  // Featured Properties Filter
  const [propertyFilter, setPropertyFilter] = useState<'all' | 'Mumbai' | 'Bengaluru' | 'Commercial'>(
    'all'
  );

  const filteredProperties = properties.filter((p) => {
    if (propertyFilter === 'all') return true;
    if (propertyFilter === 'Commercial') return p.category === 'Commercial';
    return p.location.city === propertyFilter;
  });

  const moverStocks = stocks.filter((s) => {
    if (marketMoverTab === 'gainers') return s.change >= 0;
    if (marketMoverTab === 'losers') return s.change < 0;
    return s.isTopActive;
  });

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 sm:pb-28">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-12 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          {/* Top Pill */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>India&apos;s Integrated Wealth & Real Estate Discovery Engine</span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Invest Smarter in <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent">
                Indian Real Estate & NSE Stocks
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
              Explore RERA-verified luxury homes, grade-A corporate parks, live NSE quotes, Level-2 order books, and financial intelligence in one centralized platform.
            </p>
          </div>

          {/* Unified Search Box */}
          <div className="max-w-5xl mx-auto mt-8 sm:mt-10 bg-white rounded-3xl p-3 sm:p-5 shadow-2xl border border-slate-200/20 text-slate-800">
            {/* Search Tab Switcher */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
              <button
                onClick={() => setHeroSearchTab('property')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  heroSearchTab === 'property'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Search Real Estate</span>
              </button>

              <button
                onClick={() => setHeroSearchTab('stocks')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  heroSearchTab === 'stocks'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Search NSE Stocks</span>
              </button>
            </div>

            {/* REAL ESTATE SEARCH INPUTS */}
            {heroSearchTab === 'property' ? (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                {/* Buy / Rent Switch */}
                <div className="sm:col-span-3 flex bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setHeroListingType('Buy')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                      heroListingType === 'Buy' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroListingType('Rent')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                      heroListingType === 'Rent' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Rent
                  </button>
                </div>

                {/* City Selector */}
                <div className="sm:col-span-3">
                  <select
                    value={heroCity}
                    onChange={(e) => setHeroCity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Gurgaon">Gurgaon (NCR)</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>

                {/* Locality input */}
                <div className="sm:col-span-4 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={heroSearchQuery}
                    onChange={(e) => setHeroSearchQuery(e.target.value)}
                    placeholder="Locality, landmark, project name..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                {/* Search CTA */}
                <div className="sm:col-span-2">
                  <Link
                    href={`/properties?city=${heroCity}&type=${heroListingType}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center justify-center gap-1.5 transition text-center"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              /* STOCK SEARCH INPUT */
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search by NSE Ticker (e.g. RELIANCE, TCS, HDFCBANK, INFY)..."
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                    onFocus={() => setIsGlobalSearchOpen(true)}
                  />
                </div>
                <Link
                  href="/stocks"
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <span>Explore Market Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* Popular quick tags */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <span className="font-semibold text-slate-400">Trending Now:</span>
              {['Bandra West Seafront', 'Whitefield Villa', 'RELIANCE', 'TCS', 'HDFCBANK', 'Swiggy IPO'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setIsGlobalSearchOpen(true)}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-[11px] font-medium transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-10 text-center">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs">
              <p className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">₹2,800+ Cr</p>
              <p className="text-[11px] text-slate-400 font-medium">Property Inventory Listed</p>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs">
              <p className="text-xl sm:text-2xl font-bold text-white font-mono">100% RERA</p>
              <p className="text-[11px] text-slate-400 font-medium">Government Verified</p>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs">
              <p className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">NSE Live</p>
              <p className="text-[11px] text-slate-400 font-medium">Authorized Data Layer</p>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs">
              <p className="text-xl sm:text-2xl font-bold text-white font-mono">0% Broker Spam</p>
              <p className="text-[11px] text-slate-400 font-medium">Direct Verified Contact</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE NSE INDICES SNAPSHOT */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 -mt-10 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {MARKET_INDICES.map((index) => {
            const isPos = index.change >= 0;
            return (
              <div
                key={index.name}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-md hover:shadow-lg transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-700">{index.name}</span>
                  <span
                    className={`flex items-center text-[11px] font-mono font-medium ${
                      isPos ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {isPos ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {isPos ? '+' : ''}{index.changePercent}%
                  </span>
                </div>

                <p className="text-base sm:text-lg font-bold font-mono text-slate-900">
                  {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>

                <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-100">
                  <span>L: ₹{index.low.toLocaleString('en-IN')}</span>
                  <span>H: ₹{index.high.toLocaleString('en-IN')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED REAL ESTATE PROPERTIES */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Listings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Featured Properties in India
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
              Handpicked luxury residences, independent villas, and grade-A commercial assets.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'All Listings', value: 'all' },
              { label: 'Mumbai', value: 'Mumbai' },
              { label: 'Bengaluru', value: 'Bengaluru' },
              { label: 'Commercial', value: 'Commercial' }
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setPropertyFilter(f.value as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  propertyFilter === f.value
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {f.label}
              </button>
            ))}

            <Link
              href="/properties"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold flex items-center gap-1 transition"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.slice(0, 8).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 4. NSE STOCK MARKET MOVERS */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                  Live Market Pulse
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                NSE Market Movers & Bluechips
              </h2>
            </div>

            {/* Mover Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
              <button
                onClick={() => setMarketMoverTab('gainers')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1 ${
                  marketMoverTab === 'gainers'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Top Gainers</span>
              </button>

              <button
                onClick={() => setMarketMoverTab('losers')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1 ${
                  marketMoverTab === 'losers'
                    ? 'bg-white text-rose-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                <span>Top Losers</span>
              </button>

              <button
                onClick={() => setMarketMoverTab('active')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1 ${
                  marketMoverTab === 'active'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Radio className="w-3.5 h-3.5 text-indigo-600" />
                <span>Most Active</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="py-3 px-3 text-center w-10">★</th>
                  <th className="py-3 px-4">Company / Symbol</th>
                  <th className="py-3 px-4 hidden md:table-cell">Sector</th>
                  <th className="py-3 px-4 text-right">LTP (₹)</th>
                  <th className="py-3 px-4 text-right">Change (%)</th>
                  <th className="py-3 px-4 hidden lg:table-cell">Day Range</th>
                  <th className="py-3 px-4 text-right hidden sm:table-cell">Volume</th>
                  <th className="py-3 px-4 text-right hidden xl:table-cell">Market Cap</th>
                  <th className="py-3 px-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {moverStocks.slice(0, 5).map((stock) => (
                  <StockRow key={stock.symbol} stock={stock} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Tick data updates continuously via simulated market feed.</span>
            <Link
              href="/stocks"
              className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Open Full Stock Screener</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. INVESTMENT NEWS & IPO RADAR */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
              <Newspaper className="w-4 h-4" />
              <span>Financial Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Market News & IPO Radar
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
              Curated analysis on macro policy, REITs, tech earnings, and upcoming primary issues.
            </p>
          </div>

          <Link
            href="/news"
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5 transition"
          >
            <span>All Articles & IPOs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* IPO Radar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {UPCOMING_IPOS.map((ipo) => (
            <IPOCard key={ipo.id} ipo={ipo} />
          ))}
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
          {news.slice(0, 4).map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
