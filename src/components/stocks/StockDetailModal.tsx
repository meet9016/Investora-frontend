'use client';

import React, { useState } from 'react';
import {
  X,
  Star,
  TrendingUp,
  TrendingDown,
  Bell,
  Scale,
  ShieldCheck,
  CheckCircle2,
  Info,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useInvestora } from '@/context/InvestoraContext';
import { Stock, StockChartPoint } from '@/types';

export default function StockDetailModal() {
  const {
    selectedStock,
    setSelectedStock,
    stockWatchlist,
    toggleStockWatchlist,
    toggleCompareStock,
    compareStocks,
    setIsStockCompareOpen
  } = useInvestora();

  const [activeTimeframe, setActiveTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | '5Y'>('1D');
  const [hoveredPoint, setHoveredPoint] = useState<StockChartPoint | null>(null);
  const [alertPrice, setAlertPrice] = useState<string>('');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);

  if (!selectedStock) return null;

  const isWatchlisted = stockWatchlist.includes(selectedStock.symbol);
  const isCompared = compareStocks.includes(selectedStock.symbol);
  const isPositive = selectedStock.change >= 0;

  const chartData = selectedStock.chartData[activeTimeframe] || selectedStock.chartData['1D'];

  // Calculate SVG chart coordinates
  const prices = chartData.map((d) => d.price);
  const minPrice = Math.min(...prices) * 0.995;
  const maxPrice = Math.max(...prices) * 1.005;
  const priceRange = maxPrice - minPrice || 1;

  const width = 640;
  const height = 240;

  const points = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1)) * (width - 40) + 20;
    const y = height - 20 - ((d.price - minPrice) / priceRange) * (height - 40);
    return { x, y, data: d };
  });

  const pathData = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaData = `${pathData} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  const handleSetAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertSuccess(true);
    setTimeout(() => {
      setAlertSuccess(false);
      setIsAlertModalOpen(false);
    }, 2000);
  };

  // Day Range calculation
  const daySpread = selectedStock.dayHigh - selectedStock.dayLow || 1;
  const dayOffset = ((selectedStock.currentPrice - selectedStock.dayLow) / daySpread) * 100;

  // 52W Range calculation
  const week52Spread = selectedStock.week52High - selectedStock.week52Low || 1;
  const week52Offset = ((selectedStock.currentPrice - selectedStock.week52Low) / week52Spread) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              {selectedStock.symbol.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">{selectedStock.symbol}</h3>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                  NSE
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline">• {selectedStock.sector}</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1">{selectedStock.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCompareStock(selectedStock.symbol)}
              className={`p-2 rounded-full border transition ${
                isCompared
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Compare Stock"
            >
              <Scale className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAlertModalOpen(true)}
              className="p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
              title="Set Price Alert"
            >
              <Bell className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleStockWatchlist(selectedStock.symbol)}
              className={`p-2 rounded-full border transition ${
                isWatchlisted
                  ? 'bg-amber-50 border-amber-200 text-amber-500'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Watchlist"
            >
              <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => setSelectedStock(null)}
              className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Stock Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Live Price Quote & High/Low Pills */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-bold font-mono text-slate-900 tracking-tight">
                  ₹{hoveredPoint ? hoveredPoint.price.toFixed(2) : selectedStock.currentPrice.toFixed(2)}
                </span>
                <div
                  className={`flex items-center gap-1 font-mono font-bold text-sm sm:text-base ${
                    isPositive ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>
                    {isPositive ? '+' : ''}{selectedStock.change.toFixed(2)} ({isPositive ? '+' : ''}
                    {selectedStock.changePercent}%)
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-1 font-mono">
                {hoveredPoint ? `Snapshot at ${hoveredPoint.time}` : 'NSE Live Quote • Real-time Stream'}
              </p>
            </div>

            {/* Timeframe selector */}
            <div className="flex bg-slate-100 p-1 rounded-xl gap-1 shrink-0 self-start sm:self-center">
              {(['1D', '1W', '1M', '1Y', '5Y'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => {
                    setActiveTimeframe(tf);
                    setHoveredPoint(null);
                  }}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                    activeTimeframe === tf
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive SVG Chart */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 relative">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-56 overflow-visible cursor-crosshair"
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <defs>
                <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={isPositive ? '#059669' : '#e11d48'}
                    stopOpacity="0.25"
                  />
                  <stop
                    offset="100%"
                    stopColor={isPositive ? '#059669' : '#e11d48'}
                    stopOpacity="0.0"
                  />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="20" y1="30" x2={width - 20} y2="30" stroke="#e2e8f0" strokeDasharray="3 3" />
              <line x1="20" y1={height / 2} x2={width - 20} y2={height / 2} stroke="#e2e8f0" strokeDasharray="3 3" />
              <line x1="20" y1={height - 30} x2={width - 20} y2={height - 30} stroke="#e2e8f0" strokeDasharray="3 3" />

              {/* Price Area */}
              <path d={areaData} fill="url(#stockGradient)" />

              {/* Price Line */}
              <path
                d={pathData}
                fill="none"
                stroke={isPositive ? '#059669' : '#e11d48'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Hover Dots */}
              {points.map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="5"
                  className="fill-white stroke-2 transition-all opacity-0 hover:opacity-100 cursor-pointer"
                  stroke={isPositive ? '#059669' : '#e11d48'}
                  onMouseEnter={() => setHoveredPoint(pt.data)}
                />
              ))}

              {/* Active Hover Crosshair Point */}
              {hoveredPoint && (
                (() => {
                  const match = points.find((p) => p.data.time === hoveredPoint.time);
                  if (!match) return null;
                  return (
                    <g>
                      <line
                        x1={match.x}
                        y1="10"
                        x2={match.x}
                        y2={height - 10}
                        stroke="#94a3b8"
                        strokeDasharray="2 2"
                      />
                      <circle
                        cx={match.x}
                        cy={match.y}
                        r="6"
                        fill="#0f172a"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    </g>
                  );
                })()
              )}
            </svg>

            {/* Time labels bottom */}
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2 px-4">
              <span>{chartData[0]?.time}</span>
              <span>{chartData[Math.floor(chartData.length / 2)]?.time}</span>
              <span>{chartData[chartData.length - 1]?.time}</span>
            </div>
          </div>

          {/* Performance Ranges (Day Range & 52-Week Range) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Day Range */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase">Today&apos;s Range</span>
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-800">
                <span>Low: ₹{selectedStock.dayLow.toFixed(2)}</span>
                <span>High: ₹{selectedStock.dayHigh.toFixed(2)}</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden relative">
                <div
                  className={`h-full rounded-full ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ width: `${Math.max(5, Math.min(100, dayOffset))}%` }}
                />
              </div>
            </div>

            {/* 52-Week Range */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase">52-Week Range</span>
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-800">
                <span>52W Low: ₹{selectedStock.week52Low.toFixed(2)}</span>
                <span>52W High: ₹{selectedStock.week52High.toFixed(2)}</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden relative">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${Math.max(5, Math.min(100, week52Offset))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Order Book / Market Depth (Simulated Level 2) */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">
              Order Book / Market Depth (NSE L2)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              {/* Bids */}
              <div className="bg-emerald-50/40 rounded-xl p-3 border border-emerald-100">
                <div className="flex justify-between font-bold text-emerald-800 border-b border-emerald-200/60 pb-1 mb-1.5 text-[11px]">
                  <span>BID QTY</span>
                  <span>ORDERS</span>
                  <span>PRICE</span>
                </div>
                <div className="space-y-1">
                  {selectedStock.orderBook.bids.map((b, idx) => (
                    <div key={idx} className="flex justify-between text-slate-700">
                      <span className="font-semibold text-emerald-700">{b.qty.toLocaleString('en-IN')}</span>
                      <span className="text-slate-400">{b.orders}</span>
                      <span className="font-bold">₹{b.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Asks */}
              <div className="bg-rose-50/40 rounded-xl p-3 border border-rose-100">
                <div className="flex justify-between font-bold text-rose-800 border-b border-rose-200/60 pb-1 mb-1.5 text-[11px]">
                  <span>PRICE</span>
                  <span>ORDERS</span>
                  <span>ASK QTY</span>
                </div>
                <div className="space-y-1">
                  {selectedStock.orderBook.asks.map((a, idx) => (
                    <div key={idx} className="flex justify-between text-slate-700">
                      <span className="font-bold">₹{a.price.toFixed(2)}</span>
                      <span className="text-slate-400">{a.orders}</span>
                      <span className="font-semibold text-rose-700">{a.qty.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Fundamentals & Ratios */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase mb-3">
              Fundamentals & Key Financial Ratios
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">Market Cap</span>
                <p className="font-bold text-slate-900 font-mono mt-0.5">
                  ₹{(selectedStock.marketCap / 1000).toFixed(2)}K Cr
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">P/E Ratio</span>
                <p className="font-bold text-slate-900 font-mono mt-0.5">{selectedStock.peRatio}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">P/B Ratio</span>
                <p className="font-bold text-slate-900 font-mono mt-0.5">{selectedStock.pbRatio}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">Dividend Yield</span>
                <p className="font-bold text-emerald-700 font-mono mt-0.5">
                  {selectedStock.dividendYield}%
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">ROE (%)</span>
                <p className="font-bold text-slate-900 font-mono mt-0.5">{selectedStock.roe}%</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">EPS (TTM)</span>
                <p className="font-bold text-slate-900 font-mono mt-0.5">₹{selectedStock.eps}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">Beta (Volatility)</span>
                <p className="font-bold text-slate-900 font-mono mt-0.5">{selectedStock.beta}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">Today&apos;s Volume</span>
                <p className="font-bold text-slate-900 font-mono mt-0.5">
                  {selectedStock.volume.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          {/* About Company */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase mb-1.5">About {selectedStock.name}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{selectedStock.about}</p>
          </div>

          {/* Regulatory SEBI Disclaimer */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200/70 rounded-2xl flex items-start gap-2.5 text-[11px] text-amber-900">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <span className="font-bold">Compliance Note:</span> Market data shown is sourced from authorized exchange protocols or delayed simulators. Do not trade on unofficial tips or unverified social media signals. Consult a registered SEBI Research Analyst for tailored portfolio advisory.
            </p>
          </div>
        </div>

        {/* Set Price Alert Mini Modal */}
        {isAlertModalOpen && (
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-30">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-slate-900 text-sm">Set Price Alert for {selectedStock.symbol}</h4>
                <button
                  onClick={() => setIsAlertModalOpen(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {alertSuccess ? (
                <div className="text-center py-4 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <p className="text-xs font-bold text-slate-800">Alert Created Successfully!</p>
                  <p className="text-[11px] text-slate-500">
                    We will notify you via SMS & email when {selectedStock.symbol} crosses your trigger.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSetAlert} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Trigger Price (LTP: ₹{selectedStock.currentPrice.toFixed(2)})
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={alertPrice}
                      onChange={(e) => setAlertPrice(e.target.value)}
                      placeholder={`e.g. ${(selectedStock.currentPrice * 1.05).toFixed(2)}`}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold font-mono focus:outline-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition"
                  >
                    Save Price Alert
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

