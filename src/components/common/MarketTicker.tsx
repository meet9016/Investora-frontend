'use client';

import React, { useState, useEffect } from 'react';
import { MARKET_INDICES } from '@/data/stocks';
import { TrendingUp, TrendingDown, Radio, Clock } from 'lucide-react';
import { useInvestora } from '@/context/InvestoraContext';

export default function MarketTicker() {
  const { isMarketLiveSimulating, toggleMarketSimulation } = useInvestora();
  const [istTime, setIstTime] = useState<string>('09:15 IST');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setIstTime(`${new Intl.DateTimeFormat('en-GB', options).format(now)} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-950 text-slate-300 text-xs border-b border-slate-900/90 select-none">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-1.5 flex items-center justify-between gap-4">
        
        {/* Left: NSE Live Status Badge */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-medium text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold tracking-wide">NSE LIVE</span>
          </div>

          <div className="hidden xl:flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{istTime}</span>
          </div>
        </div>

        {/* Center: Real-time Indices Bar */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-0.5">
          {MARKET_INDICES.map((index) => {
            const isPositive = index.change >= 0;
            return (
              <div
                key={index.name}
                className="flex items-center gap-1.5 shrink-0 hover:bg-slate-900/80 px-2 py-0.5 rounded-md transition"
              >
                <span className="text-[11px] text-slate-400 font-medium">{index.name}</span>
                <span className="font-mono text-xs text-slate-100 font-semibold">
                  {index.value.toLocaleString('en-IN', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                </span>
                <span
                  className={`flex items-center text-[10px] font-mono font-medium ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isPositive ? <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> : <TrendingDown className="w-2.5 h-2.5 mr-0.5" />}
                  {isPositive ? '+' : ''}{index.changePercent}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Simulation Switcher */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            onClick={toggleMarketSimulation}
            title="Toggle live price ticks simulation"
            className="text-[11px] text-slate-400 hover:text-white transition flex items-center gap-1.5 border border-slate-800 hover:border-slate-700 bg-slate-900/60 rounded-full px-2.5 py-0.5"
          >
            <Radio className={`w-3 h-3 ${isMarketLiveSimulating ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
            <span>Feed:</span>
            <span className={isMarketLiveSimulating ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
              {isMarketLiveSimulating ? 'Live' : 'Paused'}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
