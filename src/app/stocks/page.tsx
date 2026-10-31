'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInvestora } from '@/context/InvestoraContext';
import StockRow from '@/components/stocks/StockRow';
import { MARKET_INDICES } from '@/data/stocks';
import {
  TrendingUp,
  TrendingDown,
  Star,
  Search,
  Scale,
  Radio,
  SlidersHorizontal,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

function StocksContent() {
  const searchParams = useSearchParams();
  const {
    stocks,
    stockWatchlist,
    compareStocks,
    setIsStockCompareOpen,
    isMarketLiveSimulating,
    toggleMarketSimulation,
    setSelectedStock
  } = useInvestora();

  const initialFilter = searchParams.get('filter') || searchParams.get('tab') || 'all';

  const [activeTab, setActiveTab] = useState<string>(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');

  // Sectors list
  const sectors = useMemo(() => {
    const list = Array.from(new Set(stocks.map((s) => s.sector)));
    return ['All', ...list];
  }, [stocks]);

  // Filtered stocks list
  const filteredStocks = useMemo(() => {
    return stocks.filter((stock) => {
      // Tab filter
      if (activeTab === 'watchlist' && !stockWatchlist.includes(stock.symbol)) return false;
      if (activeTab === 'gainers' && stock.change < 0) return false;
      if (activeTab === 'losers' && stock.change >= 0) return false;
      if (activeTab === 'active' && !stock.isTopActive) return false;

      // Sector filter
      if (sectorFilter !== 'All' && stock.sector !== sectorFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchSymbol = stock.symbol.toLowerCase().includes(q);
        const matchName = stock.name.toLowerCase().includes(q);
        const matchSector = stock.sector.toLowerCase().includes(q);
        if (!matchSymbol && !matchName && !matchSector) return false;
      }

      return true;
    });
  }, [stocks, activeTab, sectorFilter, searchQuery, stockWatchlist]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              National Stock Exchange
            </span>
            <span className="text-xs text-slate-500 font-medium">Equities & Derivatives Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            NSE Indian Stock Market Live
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time quotes, technical charts, Level-2 depth, and financial ratios for leading Indian bluechips.
          </p>
        </div>

        {/* Action Controls: Live Sim & Compare */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={toggleMarketSimulation}
            className="px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 shadow-xs"
          >
            <Radio className={`w-3.5 h-3.5 ${isMarketLiveSimulating ? 'text-emerald-500 animate-pulse' : 'text-slate-400'}`} />
            <span>Live Ticks:</span>
            <span className={isMarketLiveSimulating ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
              {isMarketLiveSimulating ? 'Active' : 'Paused'}
            </span>
          </button>

          {compareStocks.length > 0 && (
            <button
              onClick={() => setIsStockCompareOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare Stocks ({compareStocks.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Indices Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {MARKET_INDICES.map((index) => {
          const isPos = index.change >= 0;
          return (
            <div
              key={index.name}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-800">{index.name}</span>
                <span
                  className={`flex items-center text-[11px] font-mono font-medium ${
                    isPos ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {isPos ? '+' : ''}{index.changePercent}%
                </span>
              </div>
              <p className="text-base sm:text-lg font-bold font-mono text-slate-900">
                {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-100">
                <span>L: {index.low.toFixed(0)}</span>
                <span>H: {index.high.toFixed(0)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Screener Controls Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
        {/* Top Filters & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-2xl gap-1 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All Stocks' },
              { id: 'watchlist', label: `My Watchlist (${stockWatchlist.length})` },
              { id: 'gainers', label: 'Top Gainers' },
              { id: 'losers', label: 'Top Losers' },
              { id: 'active', label: 'Most Active' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ticker or company..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Sector Fast Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-bold mr-1">Sector:</span>
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSectorFilter(sec)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                sectorFilter === sec
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Screener Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wider">
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
              {filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => (
                  <StockRow key={stock.symbol} stock={stock} />
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 text-xs">
                    No stocks match your query or active tab.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Compliance Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Click any stock to inspect interactive chart, L2 Order Book depth, and financial ratios.</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">Total Stocks: {filteredStocks.length}</span>
        </div>
      </div>
    </div>
  );
}

export default function StocksPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500 font-mono">Loading Stocks Hub...</div>}>
      <StocksContent />
    </Suspense>
  );
}

