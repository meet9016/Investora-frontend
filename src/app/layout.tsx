import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { InvestoraProvider } from '@/context/InvestoraContext';
import MarketTicker from '@/components/common/MarketTicker';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthModal from '@/components/common/AuthModal';
import GlobalSearchModal from '@/components/common/GlobalSearchModal';
import PropertyDetailModal from '@/components/real-estate/PropertyDetailModal';
import CompareModal from '@/components/real-estate/CompareModal';
import StockDetailModal from '@/components/stocks/StockDetailModal';
import StockCompareModal from '@/components/stocks/StockCompareModal';
import NewsDetailModal from '@/components/news/NewsDetailModal';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Investora | Real Estate, NSE Stock Market & Investment Insights India',
  description:
    'India’s premier unified investment platform: Discover RERA-verified luxury properties, track live NSE Indian stock market quotes and charts, and access curated wealth intelligence.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-500 selection:text-white font-normal`}>
        <InvestoraProvider>
          {/* Top Live NSE Market Ticker */}
          <MarketTicker />

          {/* Main Global Navigation */}
          <Navbar />

          {/* Page Body */}
          <main className="flex-1">{children}</main>

          {/* Global Footer */}
          <Footer />

          {/* Global Interactive Modals */}
          <AuthModal />
          <GlobalSearchModal />
          <PropertyDetailModal />
          <CompareModal />
          <StockDetailModal />
          <StockCompareModal />
          <NewsDetailModal />
        </InvestoraProvider>
      </body>
    </html>
  );
}
