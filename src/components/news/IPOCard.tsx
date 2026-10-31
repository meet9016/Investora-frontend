'use client';

import React from 'react';
import { IPOItem } from '@/types';
import { Sparkles, Calendar, Layers, IndianRupee } from 'lucide-react';

interface IPOCardProps {
  ipo: IPOItem;
}

export default function IPOCard({ ipo }: IPOCardProps) {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            {ipo.symbol}
          </span>
          <h4 className="font-bold text-base text-slate-900 mt-1 line-clamp-1">{ipo.company}</h4>
        </div>
        <span
          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
            ipo.status === 'Live'
              ? 'bg-emerald-100 text-emerald-800 animate-pulse'
              : ipo.status === 'Upcoming'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          {ipo.status}
        </span>
      </div>

      {/* Grid metrics */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-2.5 bg-slate-50 rounded-xl">
          <span className="text-slate-400 font-medium">Price Band</span>
          <p className="font-bold text-slate-900 font-mono mt-0.5">{ipo.issuePrice}</p>
        </div>

        <div className="p-2.5 bg-slate-50 rounded-xl">
          <span className="text-slate-400 font-medium">Issue Size</span>
          <p className="font-bold text-slate-900 font-mono mt-0.5">{ipo.issueSize}</p>
        </div>

        <div className="p-2.5 bg-slate-50 rounded-xl">
          <span className="text-slate-400 font-medium">Lot Size</span>
          <p className="font-bold text-slate-900 font-mono mt-0.5">{ipo.lotSize} Shares</p>
        </div>

        <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            GMP (Expected)
          </span>
          <p className="font-bold text-emerald-800 font-mono mt-0.5">{ipo.gmp}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-slate-400" />
          {ipo.openDate} - {ipo.closeDate}
        </span>
        <span className="font-semibold text-emerald-700">{ipo.subscription}</span>
      </div>
    </div>
  );
}

