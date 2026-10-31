import { NewsArticle, IPOItem } from '@/types';

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-01',
    title: 'RBI Monetary Policy: Repo Rate Kept Steady at 6.50%; Real Estate & Home Loan Outlook',
    slug: 'rbi-policy-repo-rate-steady-real-estate-impact',
    category: 'Economy',
    excerpt: 'The Reserve Bank of India’s MPC has decided unanimously to keep the policy repo rate unchanged. Real estate developers welcome the decision as festive housing demand hits record quarterly highs.',
    content: `The Reserve Bank of India (RBI) Monetary Policy Committee (MPC), headed by Governor Shaktikanta Das, has voted unanimously to keep the benchmark repo rate unchanged at 6.50%. This marks the tenth consecutive meeting where borrowing costs have remained stable.

### Key Highlights for Homebuyers & Investors
1. **Stable Home Loan EMIs**: With the repo rate holding steady, major lending institutions like SBI, HDFC Bank, and ICICI Bank are expected to keep floating home loan interest rates between 8.40% and 8.95%.
2. **Housing Momentum Continues**: The festive quarter has witnessed record-breaking residential registrations across top metropolitan regions including Mumbai MMR, Bengaluru, and Delhi-NCR.
3. **Inflation Trajectory**: While food inflation remains monitored closely, retail CPI is expected to moderate towards the RBI's target of 4.0% in the forthcoming quarters.

Industry analysts note that high-ticket luxury housing (ticket sizes above ₹3 Crore) has shown immense resilience, driven by domestic wealth creation and NRI investments.`,
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    author: 'Sunil Rao',
    authorRole: 'Chief Macro Analyst',
    readTime: '4 min read',
    publishedAt: '2026-10-30',
    tags: ['RBI', 'Home Loans', 'Real Estate', 'Economy', 'NIFTY'],
    featured: true,
    relatedStocks: ['HDFCBANK', 'SBIN', 'ICICIBANK'],
    likes: 428
  },
  {
    id: 'news-02',
    title: 'India Equity Inflows: Mutual Fund SIPs Cross ₹25,000 Crore Monthly Milestone',
    slug: 'mutual-fund-sip-record-inflows-nse-rally',
    category: 'Mutual Funds',
    excerpt: 'Domestic retail participation reaches historic peak as monthly Systematic Investment Plan (SIP) contributions hit ₹25,320 Crore, insulating Indian markets from foreign portfolio outflows.',
    content: `Data released by the Association of Mutual Funds in India (AMFI) showcases an unprecedented surge in retail investor discipline. Monthly inflows through SIPs reached ₹25,320 Crore, with active SIP accounts surpassing 9.8 Crore.

### Key Insights
- **Retail Anchor**: Domestic institutional flows (DIIs) have completely counterbalanced foreign institutional investor (FII) profit booking.
- **Top Inflow Sectors**: Flexi-cap, Mid-cap, and Infrastructure theme funds attracted the highest net inflows.
- **Financial Literacy**: Growing adoption of mobile trading and direct mutual fund platforms has democratized equity ownership across Tier-2 and Tier-3 cities in India.`,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    author: 'Neha Deshpande',
    authorRole: 'Senior Wealth Strategist',
    readTime: '3 min read',
    publishedAt: '2026-10-28',
    tags: ['Mutual Funds', 'SIP', 'NSE', 'Wealth Building'],
    featured: true,
    relatedStocks: ['RELIANCE', 'TCS', 'INFY'],
    likes: 310
  },
  {
    id: 'news-03',
    title: 'Commercial Real Estate: Grade-A Tech Park Vacancy Drops to Sub-5% in Bengaluru & Hyderabad',
    slug: 'commercial-tech-park-leasing-boom-gccs',
    category: 'Real Estate',
    excerpt: 'Global Capability Centers (GCCs) and AI innovation labs lease over 18 million sq ft in Bengaluru and Hyderabad, driving commercial rental yields upwards of 8.5%.',
    content: `The Indian commercial office market has registered its strongest quarter in five years. Leading REITs (Embassy Office Parks, Mindspace, Nexus) report near-full occupancy across prime IT corridors.

### Drivers of Commercial Expansion
- **Global Capability Centers (GCCs)**: Over 120 Fortune 500 corporations set up dedicated AI and engineering hubs in India during 2024-2026.
- **Institutional Quality Assets**: Demand is heavily concentrated on IGBC/LEED Gold and Platinum certified energy-efficient campuses.
- **Rental Growth**: Prime rentals in Outer Ring Road (Bengaluru) and HITEC City (Hyderabad) rose 7-11% year-on-year.`,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    author: 'Arunav Banerjee',
    authorRole: 'Head of Real Estate Research',
    readTime: '5 min read',
    publishedAt: '2026-10-26',
    tags: ['Real Estate', 'Commercial Office', 'Bengaluru', 'REITs', 'Hyderabad'],
    featured: false,
    likes: 185
  },
  {
    id: 'news-04',
    title: 'SEBI Investor Advisory: Verifying Authenticity of Trading Tips & Social Media Influencers',
    slug: 'sebi-investor-advisory-financial-influencers-compliance',
    category: 'Financial Education',
    excerpt: 'Securities and Exchange Board of India (SEBI) releases updated guidelines urging retail investors to avoid unregistered finfluencers offering guaranteed returns.',
    content: `In a detailed circular, SEBI highlighted the importance of conducting due diligence before acting on stock tips circulated on social media platforms and messaging apps.

### SEBI Guidelines Summary:
- **No Guaranteed Returns**: Equity markets are subject to systematic risks; any entity guaranteeing fixed monthly percentages on stocks is non-compliant.
- **Check SEBI Registration**: Verify whether an advisor is registered as a SEBI Research Analyst (RA) or Registered Investment Advisor (RIA).
- **Report Fraud**: Utilize SEBI’s SCORES portal to report fraudulent schemes and unsolicited stock recommendation messages.`,
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    author: 'Compliance Desk',
    authorRole: 'Regulatory & Governance',
    readTime: '3 min read',
    publishedAt: '2026-10-24',
    tags: ['SEBI', 'Compliance', 'Investor Safety', 'Regulations'],
    featured: false,
    likes: 542
  }
];

export const UPCOMING_IPOS: IPOItem[] = [
  {
    id: 'ipo-01',
    company: 'Swiggy Limited',
    symbol: 'SWIGGY',
    issuePrice: '₹371 - ₹390',
    issueSize: '₹11,327 Cr',
    lotSize: 38,
    openDate: '06 Nov 2026',
    closeDate: '08 Nov 2026',
    listingDate: '13 Nov 2026',
    gmp: '+₹18 (4.6%)',
    status: 'Upcoming',
    subscription: 'Opens Soon',
    rating: 'Subscribe for Long Term'
  },
  {
    id: 'ipo-02',
    company: 'NTPC Green Energy Ltd.',
    symbol: 'NTPCGREEN',
    issuePrice: '₹102 - ₹108',
    issueSize: '₹10,000 Cr',
    lotSize: 138,
    openDate: '19 Nov 2026',
    closeDate: '22 Nov 2026',
    listingDate: '27 Nov 2026',
    gmp: '+₹14 (13.0%)',
    status: 'Upcoming',
    subscription: 'Opens Soon',
    rating: 'Strong Fundamental Play'
  },
  {
    id: 'ipo-03',
    company: 'Hyundai Motor India Ltd.',
    symbol: 'HYUNDAI',
    issuePrice: '₹1,865 - ₹1,960',
    issueSize: '₹27,870 Cr',
    lotSize: 7,
    openDate: '15 Oct 2026',
    closeDate: '17 Oct 2026',
    listingDate: '22 Oct 2026',
    gmp: 'Listed at ₹1,934',
    status: 'Listed',
    subscription: '2.37x',
    rating: 'Listed on NSE & BSE'
  }
];

