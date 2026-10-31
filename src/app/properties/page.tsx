'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInvestora } from '@/context/InvestoraContext';
import PropertyCard from '@/components/real-estate/PropertyCard';
import PropertyFilters, { FilterState } from '@/components/real-estate/PropertyFilters';
import {
  Building2,
  MapPin,
  List,
  Map as MapIcon,
  Heart,
  SlidersHorizontal,
  X,
  ShieldCheck
} from 'lucide-react';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const {
    properties,
    wishlist,
    setSelectedProperty
  } = useInvestora();

  const initialCity = searchParams.get('city') || 'All Cities';
  const initialType = (searchParams.get('type') as any) || 'All';
  const initialCategory = searchParams.get('category') || 'all';
  const showSavedOnly = searchParams.get('saved') === 'true';

  const defaultFilters: FilterState = {
    listingType: initialType,
    city: initialCity,
    category: initialCategory,
    bhk: 'all',
    maxBudget: 200000000,
    furnishing: 'All',
    possession: 'All',
    verifiedOnly: false,
    sortBy: 'featured'
  };

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [filterSavedOnly, setFilterSavedOnly] = useState(showSavedOnly);

  useEffect(() => {
    if (showSavedOnly) setFilterSavedOnly(true);
  }, [showSavedOnly]);

  // Filter and sort logic
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        // Saved wishlist filter
        if (filterSavedOnly && !wishlist.includes(p.id)) return false;

        // Listing type
        if (filters.listingType !== 'All' && p.listingType !== filters.listingType) return false;

        // City
        if (filters.city !== 'All Cities' && p.location.city !== filters.city) return false;

        // Category
        if (filters.category !== 'all' && p.category !== filters.category) return false;

        // BHK
        if (filters.bhk !== 'all') {
          if (filters.bhk === 4) {
            if (p.bedrooms < 4) return false;
          } else if (p.bedrooms !== filters.bhk) {
            return false;
          }
        }

        // Budget
        if (p.price > filters.maxBudget) return false;

        // Verified
        if (filters.verifiedOnly && !p.isReraVerified) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'sqft-desc') return b.carpetArea - a.carpetArea;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [properties, filters, filterSavedOnly, wishlist]);

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setFilterSavedOnly(false);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              Real Estate Marketplace
            </span>
            <span className="text-xs text-slate-500 font-medium">Pan-India Verified Discovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Properties for Sale & Rent in India
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse verified luxury flats, villas, commercial corporate floors, and residential plots.
          </p>
        </div>

        {/* View Switch & Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Wishlist toggle pill */}
          <button
            onClick={() => setFilterSavedOnly(!filterSavedOnly)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              filterSavedOnly
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${filterSavedOnly ? 'fill-current text-rose-600' : ''}`} />
            <span>Saved ({wishlist.length})</span>
          </button>

          {/* Grid / Map Switch */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
              title="Grid View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'map' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
              title="Map View"
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-20">
          <PropertyFilters
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            totalResults={filteredProperties.length}
          />
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 lg:hidden">
            <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 max-h-[85vh] overflow-y-auto space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-bold text-slate-900 text-base">Filter Properties</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full hover:bg-slate-100"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <PropertyFilters
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
                totalResults={filteredProperties.length}
              />
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Apply Filters ({filteredProperties.length} Results)
              </button>
            </div>
          </div>
        )}

        {/* Main Properties View */}
        <div className="flex-1 min-w-0 w-full space-y-6">
          {/* Active Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Active:</span>
            {filters.city !== 'All Cities' && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                City: {filters.city}
                <button onClick={() => setFilters({ ...filters, city: 'All Cities' })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.listingType !== 'All' && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200">
                Type: {filters.listingType}
                <button onClick={() => setFilters({ ...filters, listingType: 'All' })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                Category: {filters.category}
                <button onClick={() => setFilters({ ...filters, category: 'all' })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterSavedOnly && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                Saved Only
                <button onClick={() => setFilterSavedOnly(false)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.verifiedOnly && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                RERA Verified Only
                <button onClick={() => setFilters({ ...filters, verifiedOnly: false })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {/* VIEW MODE: GRID */}
          {viewMode === 'grid' && (
            <>
              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {filteredProperties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                  <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-800">No properties match your filter</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try loosening budget limits or clearing city and bedroom filters.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </>
          )}

          {/* VIEW MODE: MAP SPLIT VIEW */}
          {viewMode === 'map' && (
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapIcon className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold">Interactive Geographic Property Map</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {filteredProperties.length} Geotagged Locations
                </span>
              </div>

              {/* Simulated Map Container */}
              <div className="relative h-[480px] bg-slate-100 overflow-hidden flex items-center justify-center">
                {/* Visual grid / terrain overlay simulation */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />

                <div className="text-center p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl max-w-md border border-slate-200 z-10 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Interactive Metro Clustered Pins</h4>
                  <p className="text-xs text-slate-500">
                    Pins are situated across prime Mumbai (Bandra, Carter Rd), Bengaluru (Whitefield, Hebbal), Gurgaon (Sector 42, 65) and Hyderabad.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {filteredProperties.slice(0, 4).map((prop) => (
                      <button
                        key={prop.id}
                        onClick={() => setSelectedProperty(prop)}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-emerald-700 text-white text-[11px] font-bold font-mono transition"
                      >
                        📍 {prop.location.locality.split(',')[0]} ({prop.priceDisplay})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500 font-mono">Loading Properties...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}

