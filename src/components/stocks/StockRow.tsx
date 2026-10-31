'use client';

import React from 'react';
import { Stock } from '@/types';
import { Star, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { useInvestora } from '@/context/InvestoraContext';

interface StockRowProps {
  stock: Stock;
  onSelect?: (stock: Stock) => void;
}

export default function StockRow({ stock, onSelect }: StockRowProps) {
  const { stockWatchlist, toggleStockWatchlist, setSelectedStock } = useInvestora();

  const isWatchlisted = stockWatchlist.includes(stock.symbol);
  const isPositive = stock.change >= 0;

  const handleClick = () => {
    setSelectedStock(stock);
    if (onSelect) onSelect(stock);
  };

  // Day Range position calculation
  const dayRangeSpread = stock.dayHigh - stock.dayLow;
  const currentOffset = dayRangeSpread > 0 ? ((stock.currentPrice - stock.dayLow) / dayRangeSpread) * 100 : 50;

  return (
    <tr
      onClick={handleClick}
      className="border-b border-slate-100 hover:bg-slate-50/80 transition cursor-pointer group text-xs sm:text-sm"
    >
      {/* Watchlist Star */}
      <td className="py-3.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => toggleStockWatchlist(stock.symbol)}
          className={`p-1 rounded-md transition ${
            isWatchlisted
              ? 'text-amber-500 hover:text-amber-600'
              : 'text-slate-300 hover:text-slate-500'
          }`}
          title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-current' : ''}`} />
        </button>
      </td>

      {/* Stock Symbol & Company */}
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 group-hover:text-emerald-700 transition">
            {stock.symbol}
          </span>
          <span className="text-[10px] font-mono px-1 rounded bg-slate-100 text-slate-500 hidden sm:inline">
            NSE
          </span>
        </div>
        <p className="text-xs text-slate-500 line-clamp-1 max-w-[200px]">{stock.name}</p>
      </td>

      {/* Sector */}
      <td className="py-3.5 px-4 text-slate-600 hidden md:table-cell">
        <span className="bg-slate-100/70 text-slate-700 text-xs px-2 py-0.5 rounded-md font-medium">
          {stock.sector}
        </span>
      </td>

      {/* LTP (Last Traded Price) */}
      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
        ₹{stock.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      </td>

      {/* Change & % */}
      <td className="py-3.5 px-4 text-right font-mono font-semibold">
        <div
          className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md ${
            isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}
        >
          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          <span>
            {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent}%)
          </span>
        </div>
      </td>

      {/* Day Range Mini-bar */}
      <td className="py-3.5 px-4 hidden lg:table-cell w-44">
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>₹{stock.dayLow.toFixed(0)}</span>
            <span>₹{stock.dayHigh.toFixed(0)}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
            <div
              className={`h-full rounded-full ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}
              style={{ width: `${Math.max(5, Math.min(100, currentOffset))}%` }}
            />
          </div>
        </div>
      </td>

      {/* Volume */}
      <td className="py-3.5 px-4 text-right font-mono text-slate-600 hidden sm:table-cell text-xs">
        {(stock.volume / 100000).toFixed(1)}L
      </td>

      {/* Market Cap */}
      <td className="py-3.5 px-4 text-right font-mono text-slate-700 hidden xl:table-cell text-xs font-semibold">
        ₹{(stock.marketCap / 1000).toFixed(1)}K Cr
      </td>

      {/* Action */}
      <td className="py-3.5 px-3 text-right">
        <button
          onClick={handleClick}
          className="p-1 rounded-lg text-slate-400 hover:text-emerald-700 group-hover:translate-x-0.5 transition-transform"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}

