'use client';

import React from 'react';
import { X, Check, Trash2, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { useInvestora } from '@/context/InvestoraContext';

export default function CompareModal() {
  const {
    compareProperties,
    toggleCompareProperty,
    clearCompareProperties,
    properties,
    setSelectedProperty,
    isCompareDrawerOpen,
    setIsCompareDrawerOpen
  } = useInvestora();

  if (!isCompareDrawerOpen && compareProperties.length === 0) return null;

  const comparedList = properties.filter((p) => compareProperties.includes(p.id));

  // Bottom floating comparison bar if modal is closed
  if (!isCompareDrawerOpen) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-4 animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-slate-200">
            Comparing {compareProperties.length} Properties
          </span>
        </div>

        <button
          onClick={() => setIsCompareDrawerOpen(true)}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white transition flex items-center gap-1.5"
        >
          <span>View Side-by-Side</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={clearCompareProperties}
          className="text-xs text-slate-400 hover:text-rose-400 transition"
          title="Clear"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Side-by-Side Property Comparison</h3>
            <p className="text-xs text-slate-500">Evaluate specifications, prices, and locations side-by-side.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={clearCompareProperties}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
            <button
              onClick={() => setIsCompareDrawerOpen(false)}
              className="p-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/4">
                  Feature
                </th>
                {comparedList.map((prop) => (
                  <th key={prop.id} className="py-3 px-4 min-w-[240px]">
                    <div className="relative">
                      <button
                        onClick={() => toggleCompareProperty(prop.id)}
                        className="absolute -top-2 -right-2 p-1 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 transition"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <img
                        src={prop.images[0]}
                        alt={prop.title}
                        className="w-full h-32 object-cover rounded-xl mb-2"
                      />
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{prop.title}</h4>
                      <p className="text-xs text-emerald-700 font-bold">{prop.priceDisplay}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">Location</td>
                {comparedList.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-slate-800 font-medium">
                    {p.location.locality}, {p.location.city}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">Configuration</td>
                {comparedList.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-slate-800 font-bold">
                    {p.bedrooms > 0 ? `${p.bedrooms} BHK` : p.subCategory}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">Carpet Area</td>
                {comparedList.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-slate-800 font-medium">
                    {p.carpetArea} sq.ft
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">Rate / Sq.Ft</td>
                {comparedList.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-slate-800 font-mono">
                    ₹{p.pricePerSqFt.toLocaleString('en-IN')}/sq.ft
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">Furnishing</td>
                {comparedList.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-slate-800">
                    {p.furnishing}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">Floor Position</td>
                {comparedList.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-slate-800">
                    Floor {p.floorNumber} of {p.totalFloors}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">RERA Registration</td>
                {comparedList.map((p) => (
                  <td key={p.id} className="py-3 px-4">
                    {p.isReraVerified ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {p.reraNumber}
                      </span>
                    ) : (
                      <span className="text-slate-400">Not Applicable</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600">Action</td>
                {comparedList.map((p) => (
                  <td key={p.id} className="py-3 px-4">
                    <button
                      onClick={() => {
                        setSelectedProperty(p);
                        setIsCompareDrawerOpen(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold transition"
                    >
                      View Details
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

