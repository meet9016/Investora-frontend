'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  TrendingUp,
  Newspaper,
  Search,
  Heart,
  Star,
  User,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  LogOut,
  ShieldCheck,
  Sparkles,
  MapPin,
  TrendingDown
} from 'lucide-react';
import { useInvestora } from '@/context/InvestoraContext';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    wishlist,
    stockWatchlist,
    setIsAuthModalOpen,
    setIsGlobalSearchOpen,
    user,
    logoutUser
  } = useInvestora();

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* 1. BRAND LOGO */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  INVESTORA
                </span>
                <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.2 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  INDIA
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-tight -mt-0.5 hidden xl:block">
                Real Estate • NSE Stocks
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION TABS */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Properties Nav Item with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('properties')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/properties"
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  pathname === '/properties'
                    ? 'text-emerald-700 bg-emerald-50/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Properties</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </Link>

              {activeDropdown === 'properties' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Property Categories
                  </div>
                  <Link
                    href="/properties?type=Buy"
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                  >
                    <span>Buy Residential Homes</span>
                    <span className="text-[10px] text-slate-400 font-normal">Flats, Villas</span>
                  </Link>
                  <Link
                    href="/properties?type=Rent"
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                  >
                    <span>Rent & Lease</span>
                    <span className="text-[10px] text-slate-400 font-normal">Homes, Condos</span>
                  </Link>
                  <Link
                    href="/properties?category=Commercial"
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                  >
                    <span>Commercial Office Spaces</span>
                    <span className="text-[10px] text-slate-400 font-normal">Grade-A</span>
                  </Link>
                  <Link
                    href="/properties?category=Land"
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                  >
                    <span>Gated NA Plots & Land</span>
                    <span className="text-[10px] text-slate-400 font-normal">Collector Clear</span>
                  </Link>
                </div>
              )}
            </div>

            {/* NSE Stocks Nav Item with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('stocks')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/stocks"
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  pathname === '/stocks'
                    ? 'text-emerald-700 bg-emerald-50/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                <span>NSE Stocks</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-700 animate-pulse">
                  LIVE
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </Link>

              {activeDropdown === 'stocks' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    NSE Market Hub
                  </div>
                  <Link
                    href="/stocks"
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                  >
                    <span>Live Market Screener</span>
                    <span className="text-[10px] text-slate-400 font-normal">All Equities</span>
                  </Link>
                  <Link
                    href="/stocks?tab=gainers"
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                  >
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="w-3 h-3 text-emerald-600" /> Top Gainers
                    </span>
                    <span className="text-[10px] text-emerald-600 font-mono">+1.5% avg</span>
                  </Link>
                  <Link
                    href="/stocks?tab=losers"
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-rose-700"
                  >
                    <span className="flex items-center gap-1.5">
                      <TrendingDown className="w-3 h-3 text-rose-600" /> Top Losers
                    </span>
                    <span className="text-[10px] text-rose-600 font-mono">-1.2% avg</span>
                  </Link>
                  <Link
                    href="/stocks?filter=watchlist"
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-700"
                  >
                    <span className="flex items-center gap-1.5">
                      <Star className="w-3 h-3 text-amber-500 fill-current" /> My Stock Watchlist
                    </span>
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                      {stockWatchlist.length}
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* News & Insights */}
            <Link
              href="/news"
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                pathname === '/news'
                  ? 'text-emerald-700 bg-emerald-50/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5 text-slate-400" />
              <span>News & IPOs</span>
            </Link>
          </nav>

          {/* 3. CENTER SEARCH BAR */}
          <div className="hidden md:flex items-center flex-1 max-w-md xl:max-w-lg mx-3">
            <button
              onClick={() => setIsGlobalSearchOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-400 bg-slate-50 hover:bg-white hover:border-slate-300 border border-slate-200/90 rounded-full transition shadow-xs group"
            >
              <span className="flex items-center gap-2 text-slate-500 font-medium">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                <span className="line-clamp-1">Search properties, stocks, indices...</span>
              </span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded-md">
                /
              </kbd>
            </button>
          </div>

          {/* 4. RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Button Mobile */}
            <button
              onClick={() => setIsGlobalSearchOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Shortcut Button */}
            <Link
              href="/properties?saved=true"
              className="p-2 rounded-xl border border-slate-200/80 hover:border-slate-300 text-slate-600 hover:text-rose-600 hover:bg-rose-50/50 transition relative"
              title="Saved Properties"
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500/20' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold rounded-full bg-rose-500 text-white flex items-center justify-center font-mono">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Profile / Auth Button */}
            <div className="relative" ref={dropdownRef}>
              {user.isLoggedIn ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pl-2 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 transition"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <div className="hidden xl:block text-left pr-1">
                      <p className="text-xs font-semibold text-slate-800 leading-tight">{user.name}</p>
                      <p className="text-[10px] text-emerald-600 font-medium">{user.role}</p>
                    </div>
                    <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in duration-100">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account</p>
                        <p className="text-xs font-bold text-slate-800">{user.name}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{user.phone}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/properties?saved=true"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          <span className="flex items-center gap-2">
                            <Heart className="w-3.5 h-3.5 text-rose-500" /> Saved Properties
                          </span>
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 text-[10px] font-mono">
                            {wishlist.length}
                          </span>
                        </Link>

                        <Link
                          href="/stocks?filter=watchlist"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          <span className="flex items-center gap-2">
                            <Star className="w-3.5 h-3.5 text-amber-500" /> Stock Watchlist
                          </span>
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 text-[10px] font-mono">
                            {stockWatchlist.length}
                          </span>
                        </Link>
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={() => {
                            logoutUser();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 text-left"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                >
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE EXPANDED MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                pathname === '/' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Home</span>
            </Link>

            <Link
              href="/properties"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                pathname === '/properties' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-400" /> Real Estate Properties
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                India
              </span>
            </Link>

            <Link
              href="/stocks"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                pathname === '/stocks' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-slate-400" /> NSE Stocks Live
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                Live
              </span>
            </Link>

            <Link
              href="/news"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                pathname === '/news' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-slate-400" /> Market News & IPOs
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
