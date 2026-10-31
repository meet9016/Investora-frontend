# INVESTORA - Indian Real Estate, NSE Stock Market & Wealth Intelligence Platform

A modern, high-production Next.js 16 + TypeScript + Tailwind CSS **User Panel** specifically built for the Indian market.

---

## 🚀 Key Features

### 1. Real Estate Marketplace (India)
- **Categories**: Residential (Flats, Luxury Villas, Penthouses), Commercial (Office Spaces, Retail Showrooms), and Land (Gated NA Villa Plots).
- **Locations**: Prime corridors across **Mumbai, Bengaluru, Gurgaon (Delhi-NCR), Hyderabad, and Pune**.
- **Interactive Listings**:
  - Price formatted in Indian notation (**₹ Lac / ₹ Cr**) with rate per sq.ft.
  - Carpet area, Built-up area, BHK configuration, Bathrooms, Furnishing status, Floor level, Facing direction, and Ownership type.
  - **MahaRERA / State RERA Verification** badges.
  - Direct **WhatsApp Inquiry**, **Call Owner**, and **Schedule Guided Site Visit** with date & time slots.
  - In-modal **Home Loan EMI Calculator** preloaded with property price.
  - **Compare Properties**: Side-by-side comparison for up to 3 properties.
  - **Post Property Free Wizard**: Multi-step wizard allowing owners and builders to publish listings live.
  - **Map-based View**: Geographic pin clusters and pricing overview.

### 2. NSE Indian Stock Market Live
- **Market Status & Indices**: Live ticker for **NIFTY 50, SENSEX, BANK NIFTY, NIFTY NEXT 50, and NIFTY IT**.
- **Live Price Simulation**: Toggle continuous tick updates for realistic real-time price action.
- **Stock Screener**:
  - Filter by All Stocks, My Watchlist, Top Gainers, Top Losers, Most Active, and Sector.
  - Interactive SVG Price Charts (**1D, 1W, 1M, 1Y, 5Y**) with crosshair hover tooltips.
  - **Today's Range** & **52-Week Range** visual indicators.
  - **Level-2 Market Depth / Order Book** (Bids vs Asks with depth bars).
  - Key Ratios: Market Cap (₹ Cr), P/E, P/B, Dividend Yield, ROE, EPS, Beta.
  - **Stock Comparison Tool** & **Price Alert** setup.
  - Mandatory **SEBI Regulatory Compliance** disclaimers.

### 3. Investment News, Tips & IPO Radar
- **Categorized News**: Economy, Real Estate, Mutual Funds, Financial Education, and Market Commentary.
- **Indian IPO Radar**: Issue price bands, Issue size, Lot size, GMP (Grey Market Premium), and bidding status (e.g. Swiggy, NTPC Green).
- **Article Reader Modal**: In-depth editorial analysis, key takeaways, bookmarking, and social share.

### 4. Financial Calculators Hub
- **Home Loan EMI Calculator**: Interactive sliders for Principal, Rate of Interest, and Tenure with Principal vs Interest breakdown.
- **SIP Wealth Compounding Calculator**: Future portfolio growth calculator.
- **Rental Yield Estimator**: Gross and net yield calculations based on property acquisition cost and maintenance.
- **Indian Tax Exemptions Guide**: Details for Section 80C, Section 24(b), and Equity LTCG.

### 5. Indian Authentication & User Profile
- **Indian Mobile (+91) OTP Verification**: Simulated instant OTP authentication (prefilled 524108 for demo testing).
- **Google Sign-In Simulation**.
- User profile tracking **Saved Properties**, **Stock Watchlist**, **Inquiries**, and **Bookmarked News**.

---

## 🛠 Tech Stack
- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Architecture**: Modular component architecture with React Context (`InvestoraContext`) for unified global state.

---

## 🏃 Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
