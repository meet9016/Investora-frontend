export type PropertyCategory = 'Residential' | 'Commercial' | 'Land';

export type PropertySubCategory =
  | 'Flat / Apartment'
  | 'Villa / Bungalow'
  | 'Independent House'
  | 'Penthouse'
  | 'Office Space'
  | 'Shop / Showroom'
  | 'Commercial Building'
  | 'Co-working Space'
  | 'Plot / Land'
  | 'Farmhouse'
  | 'Agricultural Land';

export type ListingType = 'Buy' | 'Rent' | 'Lease';

export interface PropertyLocation {
  locality: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  lat: number;
  lng: number;
}

export interface PropertyOwner {
  name: string;
  role: 'Individual Owner' | 'Property Agent' | 'Builder / Developer' | 'Real Estate Agency';
  companyName?: string;
  phone: string;
  whatsapp: string;
  isVerified: boolean;
  responseRate: string;
}

export interface Property {
  id: string;
  uniqueId: string;
  title: string;
  category: PropertyCategory;
  subCategory: PropertySubCategory;
  listingType: ListingType;
  price: number; // in INR
  priceDisplay: string; // e.g. "₹2.85 Cr" or "₹65,000/mo"
  pricePerSqFt: number;
  description: string;
  carpetArea: number; // in sq ft
  builtUpArea: number;
  plotArea?: number;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  furnishing: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  floorNumber: number;
  totalFloors: number;
  parking: string;
  propertyAge: string;
  facing: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West';
  amenities: string[];
  location: PropertyLocation;
  images: string[];
  videoUrl?: string;
  floorPlanUrl?: string;
  brochurePdf?: string;
  reraNumber?: string;
  isReraVerified: boolean;
  ownership: 'Freehold' | 'Leasehold' | 'Co-operative Society' | 'Power of Attorney';
  postedDate: string;
  availabilityStatus: 'Ready to Move' | 'Under Construction' | 'Immediate';
  possessionDate?: string;
  owner: PropertyOwner;
  views: number;
  isFeatured?: boolean;
}

export interface StockOrderBookEntry {
  price: number;
  qty: number;
  orders: number;
}

export interface StockChartPoint {
  time: string;
  price: number;
}

export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  exchange: 'NSE';
  currentPrice: number;
  change: number;
  changePercent: number;
  previousClose: number;
  open: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  week52High: number;
  week52Low: number;
  marketCap: number; // in Crores
  peRatio: number;
  pbRatio: number;
  dividendYield: number;
  roe: number;
  eps: number;
  beta: number;
  about: string;
  orderBook: {
    bids: StockOrderBookEntry[];
    asks: StockOrderBookEntry[];
  };
  chartData: {
    '1D': StockChartPoint[];
    '1W': StockChartPoint[];
    '1M': StockChartPoint[];
    '1Y': StockChartPoint[];
    '5Y': StockChartPoint[];
  };
  isGainer?: boolean;
  isLoser?: boolean;
  isTopActive?: boolean;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  sparkline: number[];
  high: number;
  low: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Stock Market' | 'Real Estate' | 'Mutual Funds' | 'IPO Updates' | 'Economy' | 'Financial Education';
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorRole: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
  relatedStocks?: string[];
  likes?: number;
}

export interface IPOItem {
  id: string;
  company: string;
  symbol: string;
  issuePrice: string;
  issueSize: string;
  lotSize: number;
  openDate: string;
  closeDate: string;
  listingDate: string;
  gmp: string;
  status: 'Upcoming' | 'Live' | 'Closed' | 'Listed';
  subscription: string;
  rating: string;
}

export interface UserInquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  inquiryType: 'Call Request' | 'WhatsApp Chat' | 'Site Visit' | 'Brochure Request';
  siteVisitDate?: string;
  siteVisitSlot?: string;
  createdAt: string;
}

