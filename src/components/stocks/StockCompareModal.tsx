'use client';

import React from 'react';
import { X, Trash2, TrendingUp, TrendingDown, Scale } from 'lucide-react';
import { useInvestora } from '@/context/InvestoraContext';

export default function StockCompareModal() {
  const {
    compareStocks,
    toggleCompareStock,
    stocks,
    setSelectedStock,
    isStockCompareOpen,
    setIsStockCompareOpen
  } = useInvestora();

  if (!isStockCompareOpen) return null;

  const comparedList = stocks.filter((s) => compareStocks.includes(s.symbol));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">NSE Stocks Comparative Analysis</h3>
              <p className="text-xs text-slate-500">Benchmark valuation, returns, and financials.</p>
            </div>
          </div>
          <button
            onClick={() => setIsStockCompareOpen(false)}
            className="p-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-x-auto p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/4">
                  Financial Metric
                </th>
                {comparedList.map((stock) => (
                  <th key={stock.symbol} className="py-3 px-4 min-w-[200px]">
                    <div className="relative">
                      <button
                        onClick={() => toggleCompareStock(stock.symbol)}
                        className="absolute -top-1 -right-1 p-1 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-base text-slate-900">{stock.symbol}</span>
                      <p className="text-xs text-slate-500 line-clamp-1">{stock.name}</p>
                      <p className="text-sm font-bold font-mono text-slate-800 mt-1">
                        ₹{stock.currentPrice.toFixed(2)}
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">Sector</td>
                {comparedList.map((s) => (
                  <td key={s.symbol} className="py-3 px-4 text-slate-800">
                    {s.sector}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">Daily Change</td>
                {comparedList.map((s) => (
                  <td key={s.symbol} className="py-3 px-4 font-mono font-semibold">
                    <span className={s.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                      {s.change >= 0 ? '+' : ''}{s.changePercent}%
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">Market Capitalization</td>
                {comparedList.map((s) => (
                  <td key={s.symbol} className="py-3 px-4 font-mono text-slate-800">
                    ₹{(s.marketCap / 1000).toFixed(2)}K Cr
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">P/E Ratio (Valuation)</td>
                {comparedList.map((s) => (
                  <td key={s.symbol} className="py-3 px-4 font-mono text-slate-800">
                    {s.peRatio}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">Price to Book (P/B)</td>
                {comparedList.map((s) => (
                  <td key={s.symbol} className="py-3 px-4 font-mono text-slate-800">
                    {s.pbRatio}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">Dividend Yield</td>
                {comparedList.map((s) => (
                  <td key={s.symbol} className="py-3 px-4 font-mono text-emerald-700 font-semibold">
                    {s.dividendYield}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">Return on Equity (ROE)</td>
                {comparedList.map((s) => (
                  <td key={s.symbol} className="py-3 px-4 font-mono text-slate-800">
                    {s.roe}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">52-Week High / Low</td>
                {comparedList.map((s) => (
                  <td key={s.symbol} className="py-3 px-4 font-mono text-slate-600 text-[11px]">
                    ₹{s.week52High} / ₹{s.week52Low}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">Action</td>
                {comparedList.map((s) => (
                  <td key={s.symbol} className="py-3 px-4">
                    <button
                      onClick={() => {
                        setSelectedStock(s);
                        setIsStockCompareOpen(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold transition"
                    >
                      View Live Chart
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

