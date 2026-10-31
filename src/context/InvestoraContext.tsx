'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, Stock, NewsArticle, UserInquiry } from '@/types';
import { INITIAL_PROPERTIES } from '@/data/properties';
import { INITIAL_STOCKS } from '@/data/stocks';
import { NEWS_ARTICLES } from '@/data/news';

interface UserProfile {
  name: string;
  phone: string;
  email: string;
  city: string;
  role: 'Buyer / Investor' | 'Property Owner' | 'Agent' | 'Builder';
  isLoggedIn: boolean;
}

interface InvestoraContextType {
  // Properties
  properties: Property[];
  wishlist: string[];
  toggleWishlist: (propertyId: string) => void;
  compareProperties: string[];
  toggleCompareProperty: (propertyId: string) => void;
  clearCompareProperties: () => void;
  addProperty: (property: Property) => void;
  selectedProperty: Property | null;
  setSelectedProperty: (property: Property | null) => void;

  // Stocks
  stocks: Stock[];
  stockWatchlist: string[];
  toggleStockWatchlist: (symbol: string) => void;
  selectedStock: Stock | null;
  setSelectedStock: (stock: Stock | null) => void;
  compareStocks: string[];
  toggleCompareStock: (symbol: string) => void;
  isMarketLiveSimulating: boolean;
  toggleMarketSimulation: () => void;

  // News
  news: NewsArticle[];
  savedArticles: string[];
  toggleSaveArticle: (articleId: string) => void;
  selectedArticle: NewsArticle | null;
  setSelectedArticle: (article: NewsArticle | null) => void;

  // Modals & Navigation
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isCompareDrawerOpen: boolean;
  setIsCompareDrawerOpen: (open: boolean) => void;
  isStockCompareOpen: boolean;
  setIsStockCompareOpen: (open: boolean) => void;
  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;

  // User Profile & Inquiries
  user: UserProfile;
  loginUser: (phone: string, name?: string) => void;
  logoutUser: () => void;
  inquiries: UserInquiry[];
  submitInquiry: (inquiry: Omit<UserInquiry, 'id' | 'createdAt'>) => void;
}

const defaultUser: UserProfile = {
  name: 'Rahul Sharma',
  phone: '+91 98200 45678',
  email: 'rahul.sharma@investora.in',
  city: 'Mumbai',
  role: 'Buyer / Investor',
  isLoggedIn: true
};

const InvestoraContext = createContext<InvestoraContextType | undefined>(undefined);

export function InvestoraProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [wishlist, setWishlist] = useState<string[]>(['prop-mum-01', 'prop-del-07']);
  const [compareProperties, setCompareProperties] = useState<string[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);
  const [stockWatchlist, setStockWatchlist] = useState<string[]>(['RELIANCE', 'TCS', 'HDFCBANK']);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [compareStocks, setCompareStocks] = useState<string[]>(['RELIANCE', 'TCS']);
  const [isMarketLiveSimulating, setIsMarketLiveSimulating] = useState<boolean>(true);

  const [news] = useState<NewsArticle[]>(NEWS_ARTICLES);
  const [savedArticles, setSavedArticles] = useState<string[]>(['news-01']);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const [isStockCompareOpen, setIsStockCompareOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);

  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [inquiries, setInquiries] = useState<UserInquiry[]>([
    {
      id: 'inq-101',
      propertyId: 'prop-mum-01',
      propertyTitle: 'The Grand Seafront Residence at Bandra West',
      userName: 'Rahul Sharma',
      userPhone: '+91 98200 45678',
      userEmail: 'rahul.sharma@investora.in',
      inquiryType: 'Site Visit',
      siteVisitDate: '2026-11-04',
      siteVisitSlot: '11:00 AM - 01:00 PM',
      createdAt: '2026-10-30T10:15:00Z'
    }
  ]);

  // Simulate real-time stock price fluctuations
  useEffect(() => {
    if (!isMarketLiveSimulating) return;

    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          // slight random tick between -0.4% and +0.4%
          const deltaPct = (Math.random() - 0.49) * 0.005;
          const priceChange = +(stock.currentPrice * deltaPct).toFixed(2);
          const newPrice = +(stock.currentPrice + priceChange).toFixed(2);
          const newTotalChange = +(newPrice - stock.previousClose).toFixed(2);
          const newPercent = +((newTotalChange / stock.previousClose) * 100).toFixed(2);

          const newHigh = Math.max(stock.dayHigh, newPrice);
          const newLow = Math.min(stock.dayLow, newPrice);

          return {
            ...stock,
            currentPrice: newPrice,
            change: newTotalChange,
            changePercent: newPercent,
            dayHigh: newHigh,
            dayLow: newLow,
            volume: stock.volume + Math.floor(Math.random() * 250)
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isMarketLiveSimulating]);

  const toggleWishlist = (propertyId: string) => {
    setWishlist((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  const toggleCompareProperty = (propertyId: string) => {
    setCompareProperties((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 properties simultaneously.');
        return prev;
      }
      return [...prev, propertyId];
    });
  };

  const clearCompareProperties = () => {
    setCompareProperties([]);
  };

  const addProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
  };

  const toggleStockWatchlist = (symbol: string) => {
    setStockWatchlist((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  const toggleCompareStock = (symbol: string) => {
    setCompareStocks((prev) => {
      if (prev.includes(symbol)) {
        return prev.filter((s) => s !== symbol);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 stocks simultaneously.');
        return prev;
      }
      return [...prev, symbol];
    });
  };

  const toggleMarketSimulation = () => {
    setIsMarketLiveSimulating((prev) => !prev);
  };

  const toggleSaveArticle = (articleId: string) => {
    setSavedArticles((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const loginUser = (phone: string, name: string = 'User') => {
    setUser({
      name,
      phone,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      city: 'Mumbai',
      role: 'Buyer / Investor',
      isLoggedIn: true
    });
    setIsAuthModalOpen(false);
  };

  const logoutUser = () => {
    setUser({
      name: '',
      phone: '',
      email: '',
      city: '',
      role: 'Buyer / Investor',
      isLoggedIn: false
    });
  };

  const submitInquiry = (inq: Omit<UserInquiry, 'id' | 'createdAt'>) => {
    const newInquiry: UserInquiry = {
      ...inq,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  return (
    <InvestoraContext.Provider
      value={{
        properties,
        wishlist,
        toggleWishlist,
        compareProperties,
        toggleCompareProperty,
        clearCompareProperties,
        addProperty,
        selectedProperty,
        setSelectedProperty,

        stocks,
        stockWatchlist,
        toggleStockWatchlist,
        selectedStock,
        setSelectedStock,
        compareStocks,
        toggleCompareStock,
        isMarketLiveSimulating,
        toggleMarketSimulation,

        news,
        savedArticles,
        toggleSaveArticle,
        selectedArticle,
        setSelectedArticle,

        isAuthModalOpen,
        setIsAuthModalOpen,
        isCompareDrawerOpen,
        setIsCompareDrawerOpen,
        isStockCompareOpen,
        setIsStockCompareOpen,
        isGlobalSearchOpen,
        setIsGlobalSearchOpen,

        user,
        loginUser,
        logoutUser,
        inquiries,
        submitInquiry
      }}
    >
      {children}
    </InvestoraContext.Provider>
  );
}

export function useInvestora() {
  const context = useContext(InvestoraContext);
  if (!context) {
    throw new Error('useInvestora must be used within an InvestoraProvider');
  }
  return context;
}

