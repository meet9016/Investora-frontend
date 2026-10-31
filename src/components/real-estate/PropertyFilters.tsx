'use client';

import React from 'react';
import { CITIES, CATEGORIES } from '@/data/properties';
import { Filter, RotateCcw, ShieldCheck, Check } from 'lucide-react';

export interface FilterState {
  listingType: 'All' | 'Buy' | 'Rent';
  city: string;
  category: string;
  bhk: number | 'all';
  maxBudget: number; // in INR
  furnishing: string;
  possession: string;
  verifiedOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'sqft-desc';
}

interface PropertyFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export default function PropertyFilters({
  filters,
  onChange,
  onReset,
  totalResults
}: PropertyFiltersProps) {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-sm">Filters</h3>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
            {totalResults} listings
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1 font-semibold transition"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Buy / Rent Switch */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Looking To
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
          {(['All', 'Buy', 'Rent'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => updateFilter('listingType', type)}
              className={`py-1.5 rounded-lg text-xs font-bold transition ${
                filters.listingType === type
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {type === 'All' ? 'All Types' : type}
            </button>
          ))}
        </div>
      </div>

      {/* City Dropdown */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          City / Region
        </label>
        <select
          value={filters.city}
          onChange={(e) => updateFilter('city', e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
        >
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Property Category */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Property Type
        </label>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => updateFilter('category', cat.value)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition text-left ${
                filters.category === cat.value
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <span>{cat.label}</span>
              {filters.category === cat.value && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms / BHK */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Bedrooms (BHK)
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {(['all', 1, 2, 3, 4] as const).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => updateFilter('bhk', b)}
              className={`py-1.5 rounded-xl text-xs font-bold border transition ${
                filters.bhk === b
                  ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                  : 'border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {b === 'all' ? 'All' : `${b} BHK`}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Slider */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-slate-700 uppercase tracking-wider">Max Budget</span>
          <span className="text-emerald-700 font-mono">
            {filters.maxBudget >= 200000000
              ? 'Any Budget'
              : filters.maxBudget >= 10000000
              ? `₹${(filters.maxBudget / 10000000).toFixed(1)} Cr`
              : `₹${(filters.maxBudget / 100000).toFixed(0)} Lac`}
          </span>
        </div>
        <input
          type="range"
          min={1000000}
          max={200000000}
          step={2000000}
          value={filters.maxBudget}
          onChange={(e) => updateFilter('maxBudget', Number(e.target.value))}
          className="w-full accent-emerald-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
          <span>₹10 Lac</span>
          <span>₹5 Cr</span>
          <span>₹20+ Cr</span>
        </div>
      </div>

      {/* Verified Only Switch */}
      <div className="pt-2 border-t border-slate-100">
        <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <div>
              <p className="text-xs font-bold text-slate-800">RERA Verified Only</p>
              <p className="text-[10px] text-slate-500">Government sanctioned projects</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => updateFilter('verifiedOnly', e.target.checked)}
            className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
          />
        </label>
      </div>

      {/* Sort Options */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilter('sortBy', e.target.value as FilterState['sortBy'])}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        >
          <option value="featured">Featured First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="sqft-desc">Largest Area (Sq.Ft)</option>
        </select>
      </div>
    </div>
  );
}

