'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Building,
  Home,
  Factory,
  Trees,
  TrendingUp,
  Map,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useInvestora } from '@/context/InvestoraContext';

interface BannerSlide {
  id: string;
  title: string;
  badge: string;
  description: string;
  location: string;
  imageUrl: string;
  link: string;
  category: string;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 'vedu-industrial',
    title: 'Vedu Industrial Park',
    badge: 'Verified 7/12 Land · RERA Approved',
    description: 'Prime industrial plots with heavy power, wide roads & express highway connectivity.',
    location: 'Surat - Vapi Economic Hub, Gujarat',
    imageUrl: 'https://saatbaar-media.s3.us-east-2.amazonaws.com/Developer%20%26%20Project%20-%20Banner%20Format%20(9)_1780646857900_1787664673064.webp',
    link: '/properties?category=Industrial%20Property',
    category: 'Industrial'
  },
  {
    id: 'shree-niketan',
    title: 'Shree Niketan Luxury Living & Villa Plots',
    badge: 'Government Approved · Premium Gated Township',
    description: 'Exclusive resort-themed villa plots with 40,000 sq.ft clubhouse, lakeside deck and smart city infrastructure.',
    location: 'Surat Outer Ring Road, Gujarat',
    imageUrl: 'https://saatbaar-media.s3.us-east-2.amazonaws.com/Developer%20%26%20Project%20-%20Banner%20Format%20(8)_1764582346695.jpg',
    link: '/properties?category=Villa%20%2F%20Bungalow',
    category: 'Residential'
  },
  {
    id: 'jalbhumi-industrial',
    title: 'Jalbhumi Heavy Industrial & Open Land Estate',
    badge: 'Heavy Industrial Zone · Ready Allotment',
    description: 'Clear title industrial estate with substation power grid, boundary walls and dedicated freight turnaround bays.',
    location: 'Hazira Port Industrial Belt, Gujarat',
    imageUrl: 'https://saatbaar-media.s3.us-east-2.amazonaws.com/Developer%20%26%20Project%20-%20Banner%20Format%20(5)_1759846846624.jpg',
    link: '/properties?category=Commercial',
    category: 'Industrial'
  },
  {
    id: 'investora-coastal-residences',
    title: 'Oceanfront Luxury Penthouses & Estates',
    badge: 'High-Yield Assets · Direct Seafront Living',
    description: 'RERA-certified sea-facing penthouses in Bandra & Worli combined with real-time NSE market intelligence.',
    location: 'Bandra West, Mumbai & Whitefield, Bengaluru',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    link: '/properties?city=Mumbai',
    category: 'Residential'
  },
  {
    id: 'investora-commercial-park',
    title: 'Investora Grade-A Corporate Towers & Tech Parks',
    badge: 'Pre-Leased Commercial · High Rental Yield',
    description: 'Institutional Grade-A corporate offices and co-working hubs with high cap rates and blue-chip tenants.',
    location: 'BKC, Mumbai & Outer Ring Road, Bengaluru',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop',
    link: '/properties?category=Office%20Space',
    category: 'Commercial'
  }
];

const QUICK_CATEGORIES = [
  { name: 'Flats & Apartments', icon: Building, href: '/properties?category=Flat%20%2F%20Apartment' },
  { name: 'Luxury Villas', icon: Home, href: '/properties?category=Villa%20%2F%20Bungalow' },
  { name: '7/12 Land & Farmhouse', icon: Trees, href: '/properties?category=Farmhouse' },
  { name: 'Industrial & Logistics', icon: Factory, href: '/properties?category=Industrial%20Property' },
  { name: 'Commercial & Office', icon: Building, href: '/properties?category=Office%20Space' },
  { name: 'NSE Market Live', icon: TrendingUp, href: '/stocks' },
  { name: 'View on Map', icon: Map, href: '/properties' }
];

export default function HomeBannerSlider() {
  const router = useRouter();
  const { setIsGlobalSearchOpen } = useInvestora();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [listingType, setListingType] = useState<'Buy' | 'Rent' | 'Land'>('Buy');
  const [city, setCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const touchStartX = useRef<number | null>(null);

  // Auto-slide effect (every 5s)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city !== 'All') params.append('city', city);
    if (listingType === 'Buy') params.append('type', 'Buy');
    if (listingType === 'Rent') params.append('type', 'Rent');
    if (listingType === 'Land') params.append('category', 'Industrial Property');
    if (searchQuery.trim()) params.append('search', searchQuery.trim());
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="w-full max-w-[1920px] mx-auto px-3 sm:px-5 lg:px-6 pt-2 sm:pt-4">
      {/* 1. TOP BANNER CAROUSEL (SaatBaar Embla Style: 20px padding, rounded-3xl, aspect 2.6/1) */}
      <div
        className="relative group rounded-2xl md:rounded-3xl overflow-hidden shadow-md bg-slate-900"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Aspect Ratio Container (aspect-[16/9] on mobile, aspect-[2.6/1] on desktop matching Saatbaar) */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[2.2/1] lg:aspect-[2.6/1] overflow-hidden">
          {BANNER_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                  }`}
              >
                {/* Banner Image */}
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover select-none"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />

                {/* Subtle dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 sm:p-8 lg:p-12 flex flex-col justify-end text-white">
                  <div className="max-w-3xl space-y-2 sm:space-y-3">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-semibold tracking-wide shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{slide.badge}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
                      {slide.title}
                    </h2>

                    {/* Description (hidden on smallest screens) */}
                    <p className="hidden sm:block text-slate-200 text-xs sm:text-sm max-w-2xl line-clamp-2 leading-relaxed drop-shadow-sm font-normal">
                      {slide.description}
                    </p>

                    {/* Bottom row: Location + CTA button */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                      <div className="flex items-center gap-1.5 text-slate-200 text-xs sm:text-sm font-medium">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                        <span className="truncate">{slide.location}</span>
                      </div>

                      <Link
                        href={slide.link}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition shadow-md shadow-emerald-950/40"
                      >
                        <span>Explore Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Navigation Chevron: Previous */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-lg backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Navigation Chevron: Next */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-lg backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* SaatBaar Style Indicator Pill (Bottom Center) */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/10">
              {BANNER_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                    ? 'w-6 bg-emerald-400'
                    : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. SAATBAAR STYLE FLOATING SEARCH PILL BAR */}
      <div className="mt-5 sm:mt-6 mb-4">
        <form
          onSubmit={handleSearchSubmit}
          className="max-w-5xl mx-auto bg-white rounded-2xl md:rounded-full border border-slate-200/90 shadow-md hover:shadow-lg transition-all p-2.5 sm:p-3"
        >
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Left Header Pill (Matching SaatBaar: Search Icon + "Search Property" + "Rent · Sell · Buy") */}
            <div className="flex items-center gap-3 px-2 sm:px-3 w-full md:w-auto shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm sm:text-base font-semibold text-slate-800 leading-tight">
                  Search Property
                </span>
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
                  Rent &middot; Sell &middot; Buy &middot; 7/12 Land
                </span>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block h-8 w-px bg-slate-200 shrink-0" />

            {/* Listing Type Switcher (Buy / Rent / Land) */}
            <div className="flex bg-slate-100 p-1 rounded-full w-full md:w-auto shrink-0">
              {(['Buy', 'Rent', 'Land'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setListingType(type)}
                  className={`flex-1 md:flex-initial px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-full transition ${listingType === type
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  {type === 'Land' ? '7/12 Land' : type}
                </button>
              ))}
            </div>

            {/* City Selector */}
            <div className="w-full md:w-40 shrink-0">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl md:rounded-full border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Cities</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Surat">Surat</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Gurgaon">Gurgaon (NCR)</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
              </select>
            </div>

            {/* Keyword Input */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Locality, landmark, project name or RERA number..."
                className="w-full px-4 py-2 rounded-xl md:rounded-full border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Search Submit CTA */}
            <div className="w-full md:w-auto flex items-center gap-2">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsGlobalSearchOpen(true)}
                title="Global Search (Stocks & Properties)"
                className="hidden lg:flex p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition shrink-0"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          </div>
        </form>

        {/* 3. SAATBAAR STYLE QUICK CATEGORIES SCROLL BAR */}
        <div className="max-w-5xl mx-auto mt-3 sm:mt-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-max pb-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pl-1">
              Explore:
            </span>
            {QUICK_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-700 hover:text-emerald-700 text-xs font-semibold shadow-2xs transition"
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

