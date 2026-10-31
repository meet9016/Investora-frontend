'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Building2, TrendingUp, ArrowRight, MapPin, IndianRupee } from 'lucide-react';
import { useInvestora } from '@/context/InvestoraContext';
import { useRouter } from 'next/navigation';

export default function GlobalSearchModal() {
  const {
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    properties,
    stocks,
    setSelectedProperty,
    setSelectedStock
  } = useInvestora();

  const [query, setQuery] = useState('');
  const router = useRouter();

  // Keyboard shortcut listener (Cmd/Ctrl + K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && document.activeElement?.tagName !== 'INPUT')) {
        e.preventDefault();
        setIsGlobalSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsGlobalSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsGlobalSearchOpen]);

  if (!isGlobalSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchedProperties = properties
    .filter(
      (p) =>
        p.title.toLowerCase().includes(trimmed) ||
        p.location.city.toLowerCase().includes(trimmed) ||
        p.location.locality.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.subCategory.toLowerCase().includes(trimmed)
    )
    .slice(0, 4);

  const matchedStocks = stocks
    .filter(
      (s) =>
        s.symbol.toLowerCase().includes(trimmed) ||
        s.name.toLowerCase().includes(trimmed) ||
        s.sector.toLowerCase().includes(trimmed)
    )
    .slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search properties (e.g. Bandra flat, Villa) or stocks (e.g. RELIANCE, TCS)..."
            className="w-full text-base sm:text-lg text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setIsGlobalSearchOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick suggestions when query is empty */}
        {query === '' && (
          <div className="p-4 sm:p-6 bg-slate-50/70 border-b border-slate-100">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {['Bandra West Seafront', 'Whitefield Villa', 'RELIANCE', 'TCS', 'HDFCBANK', 'Gurgaon Commercial', 'Home Loan EMI'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:border-emerald-500 hover:text-emerald-700 transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Matched Stocks */}
          {matchedStocks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>NSE Stocks ({matchedStocks.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedStocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    onClick={() => {
                      setSelectedStock(stock);
                      setIsGlobalSearchOpen(false);
                      router.push(`/stocks?symbol=${stock.symbol}`);
                    }}
                    className="p-3 rounded-xl border border-slate-200/80 hover:border-emerald-500 hover:bg-emerald-50/40 cursor-pointer transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-slate-900 group-hover:text-emerald-700">
                          {stock.symbol}
                        </span>
                        <span className="text-[10px] font-mono font-medium px-1 rounded bg-slate-100 text-slate-600">
                          NSE
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold font-mono text-slate-800">
                        ₹{stock.currentPrice.toFixed(2)}
                      </p>
                      <span
                        className={`text-[11px] font-semibold font-mono ${
                          stock.change >= 0 ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Properties */}
          {matchedProperties.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>Real Estate Properties ({matchedProperties.length})</span>
              </div>
              <div className="space-y-2">
                {matchedProperties.map((prop) => (
                  <div
                    key={prop.id}
                    onClick={() => {
                      setSelectedProperty(prop);
                      setIsGlobalSearchOpen(false);
                      router.push(`/properties?id=${prop.id}`);
                    }}
                    className="p-3 rounded-xl border border-slate-200/80 hover:border-indigo-500 hover:bg-indigo-50/40 cursor-pointer transition flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prop.images[0]}
                        alt={prop.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 line-clamp-1">
                          {prop.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {prop.location.locality}, {prop.location.city}
                          </span>
                          <span>•</span>
                          <span>{prop.subCategory}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-slate-900">{prop.priceDisplay}</span>
                      <p className="text-[10px] text-slate-400">{prop.carpetArea} sq.ft</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedProperties.length === 0 && matchedStocks.length === 0 && query !== '' && (
            <div className="text-center py-8 text-slate-400">
              <p className="text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-500 mt-1">Try searching by city (Mumbai, Bengaluru) or stock symbol (RELIANCE).</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Tip: Use keyboard shortcuts to browse faster</span>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono">ESC</kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

