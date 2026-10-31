'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, Mail, MapPin, TrendingUp, Building2, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900">
      {/* Upper Footer: Highlights */}
      <div className="border-b border-slate-900 py-8 bg-slate-900/40">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">100% RERA Verified Listings</h4>
              <p className="text-xs text-slate-400">Strict builder and agent authentication with MahaRERA & KRERA cross-checks.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Authorized NSE Data Layer</h4>
              <p className="text-xs text-slate-400">Compliant market feeds, tick-by-tick quotes, and comprehensive technical ratios.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Zero Broker Spam Policy</h4>
              <p className="text-xs text-slate-400">Direct owner & verified builder connections with instant WhatsApp & site visits.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Summary */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              I
            </div>
            <span className="font-bold text-xl tracking-tight text-white">INVESTORA</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              INDIA
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
            India’s unified intelligence ecosystem integrating premier residential & commercial real estate discovery with live NSE stock market feeds and curated financial journalism.
          </p>

          <div className="pt-2 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Bandra Kurla Complex (BKC), Mumbai 400051</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>+91 (022) 6980-8800 (Support: 9 AM - 7 PM IST)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>support@investora.in</span>
            </div>
          </div>
        </div>

        {/* Real Estate Links */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Real Estate</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/properties?city=Mumbai" className="hover:text-emerald-400 transition">Flats in Mumbai</Link></li>
            <li><Link href="/properties?city=Bengaluru" className="hover:text-emerald-400 transition">Villas in Bengaluru</Link></li>
            <li><Link href="/properties?city=Gurgaon" className="hover:text-emerald-400 transition">Offices in Gurgaon</Link></li>
            <li><Link href="/properties?city=Hyderabad" className="hover:text-emerald-400 transition">Apartments in Hyderabad</Link></li>
            <li><Link href="/properties?category=Land" className="hover:text-emerald-400 transition">Gated NA Plots</Link></li>
            <li><Link href="/properties?type=Rent" className="hover:text-emerald-400 transition">Rental Properties</Link></li>
          </ul>
        </div>

        {/* NSE Market Links */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">NSE Stock Market</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/stocks?tab=gainers" className="hover:text-emerald-400 transition">NIFTY 50 Movers</Link></li>
            <li><Link href="/stocks?tab=active" className="hover:text-emerald-400 transition">Top Volume Stocks</Link></li>
            <li><Link href="/stocks" className="hover:text-emerald-400 transition">BANK NIFTY Constituents</Link></li>
            <li><Link href="/stocks?filter=watchlist" className="hover:text-emerald-400 transition">Personal Watchlist</Link></li>
            <li><Link href="/news" className="hover:text-emerald-400 transition">Upcoming IPO Radar</Link></li>
            <li><Link href="/stocks" className="hover:text-emerald-400 transition">NSE Sector Indices</Link></li>
          </ul>
        </div>

        {/* Financial News & Compliance */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">News & Compliance</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/news" className="hover:text-emerald-400 transition">Investment Tips & Insights</Link></li>
            <li><Link href="/news" className="hover:text-emerald-400 transition">Real Estate Market News</Link></li>
            <li><Link href="/news" className="hover:text-emerald-400 transition">SEBI Investor Advisories</Link></li>
            <li><Link href="/news" className="hover:text-emerald-400 transition">RBI Policy Updates</Link></li>
            <li><Link href="/properties" className="hover:text-emerald-400 transition">RERA Project Verification</Link></li>
          </ul>
        </div>
      </div>

      {/* Disclaimers & Regulatory Notices */}
      <div className="bg-slate-900/80 border-t border-slate-900 py-6">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-3">
          <div className="text-[11px] leading-relaxed text-slate-400 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            <span className="font-bold text-amber-400">MANDATORY SEBI & REGULATORY DISCLAIMER: </span>
            Stock market data is provided for informational and analytical purposes only. Market quotes may be delayed subject to exchange policies. Antigravity Investora does not provide guaranteed returns, portfolio management, or personalized stock recommendations without the requisite SEBI registrations. Past market performance is not indicative of future results. Please consult an authorized financial advisor before making investment commitments.
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 pt-2">
            <p>© 2026 Investora India Technologies Private Limited. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">RERA Disclosures</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
