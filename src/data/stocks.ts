import { Stock, MarketIndex } from '@/types';

export const MARKET_INDICES: MarketIndex[] = [
  {
    name: 'NIFTY 50',
    value: 24345.85,
    change: 142.30,
    changePercent: 0.59,
    high: 24398.20,
    low: 24210.15,
    sparkline: [24210, 24240, 24225, 24290, 24310, 24280, 24330, 24345.85]
  },
  {
    name: 'BANK NIFTY',
    value: 51920.40,
    change: 320.15,
    changePercent: 0.62,
    high: 52040.00,
    low: 51650.30,
    sparkline: [51650, 51710, 51690, 51820, 51860, 51840, 51900, 51920.40]
  },
  {
    name: 'SENSEX',
    value: 79980.50,
    change: 468.20,
    changePercent: 0.59,
    high: 80110.00,
    low: 79540.20,
    sparkline: [79540, 79620, 79590, 79780, 79840, 79800, 79920, 79980.50]
  },
  {
    name: 'NIFTY NEXT 50',
    value: 71420.10,
    change: -115.40,
    changePercent: -0.16,
    high: 71680.00,
    low: 71320.00,
    sparkline: [71600, 71580, 71520, 71450, 71390, 71430, 71400, 71420.10]
  },
  {
    name: 'NIFTY IT',
    value: 41850.70,
    change: 512.60,
    changePercent: 1.24,
    high: 41920.00,
    low: 41410.00,
    sparkline: [41410, 41500, 41590, 41680, 41720, 41790, 41820, 41850.70]
  }
];

export const INITIAL_STOCKS: Stock[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    sector: 'Oil & Gas / Telecom / Retail',
    exchange: 'NSE',
    currentPrice: 2748.50,
    change: 32.40,
    changePercent: 1.19,
    previousClose: 2716.10,
    open: 2720.00,
    dayHigh: 2755.00,
    dayLow: 2715.20,
    volume: 6420190,
    week52High: 3217.90,
    week52Low: 2221.05,
    marketCap: 1859340, // in Cr
    peRatio: 26.8,
    pbRatio: 2.34,
    dividendYield: 0.36,
    roe: 9.4,
    eps: 102.50,
    beta: 0.98,
    about: 'Reliance Industries Limited is India’s largest private sector enterprise. Its activities span hydrocarbon exploration and production, petroleum refining and marketing, petrochemicals, retail (Reliance Retail), digital services (Jio Platforms), and new green energy.',
    orderBook: {
      bids: [
        { price: 2748.20, qty: 1540, orders: 12 },
        { price: 2748.00, qty: 3210, orders: 28 },
        { price: 2747.50, qty: 4500, orders: 35 },
        { price: 2747.00, qty: 8900, orders: 62 },
        { price: 2746.50, qty: 12400, orders: 94 }
      ],
      asks: [
        { price: 2748.50, qty: 1820, orders: 15 },
        { price: 2748.80, qty: 2950, orders: 22 },
        { price: 2749.00, qty: 5400, orders: 41 },
        { price: 2749.50, qty: 7800, orders: 58 },
        { price: 2750.00, qty: 15600, orders: 110 }
      ]
    },
    chartData: {
      '1D': [
        { time: '09:15', price: 2720.00 },
        { time: '10:00', price: 2728.50 },
        { time: '11:00', price: 2724.10 },
        { time: '12:00', price: 2736.80 },
        { time: '13:00', price: 2741.00 },
        { time: '14:00', price: 2739.40 },
        { time: '15:00', price: 2746.20 },
        { time: '15:30', price: 2748.50 }
      ],
      '1W': [
        { time: 'Mon', price: 2690.00 },
        { time: 'Tue', price: 2705.50 },
        { time: 'Wed', price: 2712.00 },
        { time: 'Thu', price: 2716.10 },
        { time: 'Fri', price: 2748.50 }
      ],
      '1M': [
        { time: 'Week 1', price: 2640.00 },
        { time: 'Week 2', price: 2675.00 },
        { time: 'Week 3', price: 2710.00 },
        { time: 'Week 4', price: 2748.50 }
      ],
      '1Y': [
        { time: 'Nov 23', price: 2310.00 },
        { time: 'Jan 24', price: 2450.00 },
        { time: 'Apr 24', price: 2890.00 },
        { time: 'Jul 24', price: 3120.00 },
        { time: 'Oct 24', price: 2748.50 }
      ],
      '5Y': [
        { time: '2020', price: 1450.00 },
        { time: '2021', price: 1980.00 },
        { time: '2022', price: 2380.00 },
        { time: '2023', price: 2580.00 },
        { time: '2024', price: 2748.50 }
      ]
    },
    isGainer: true,
    isTopActive: true
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services Ltd.',
    sector: 'Information Technology',
    exchange: 'NSE',
    currentPrice: 4085.20,
    change: 54.80,
    changePercent: 1.36,
    previousClose: 4030.40,
    open: 4045.00,
    dayHigh: 4098.00,
    dayLow: 4038.10,
    volume: 2410880,
    week52High: 4585.90,
    week52Low: 3313.00,
    marketCap: 1478200,
    peRatio: 31.4,
    pbRatio: 14.8,
    dividendYield: 1.78,
    roe: 48.2,
    eps: 130.10,
    beta: 0.65,
    about: 'Tata Consultancy Services is an IT services, consulting, and business solutions organization that has been partnering with many of the world’s largest businesses for over 55 years. A constituent of Tata Group.',
    orderBook: {
      bids: [
        { price: 4085.00, qty: 980, orders: 8 },
        { price: 4084.50, qty: 1540, orders: 19 },
        { price: 4084.00, qty: 2800, orders: 31 },
        { price: 4083.00, qty: 4500, orders: 49 },
        { price: 4082.00, qty: 8100, orders: 74 }
      ],
      asks: [
        { price: 4085.50, qty: 1120, orders: 11 },
        { price: 4086.00, qty: 2100, orders: 24 },
        { price: 4087.00, qty: 3400, orders: 39 },
        { price: 4088.00, qty: 5900, orders: 63 },
        { price: 4089.00, qty: 9800, orders: 92 }
      ]
    },
    chartData: {
      '1D': [
        { time: '09:15', price: 4045.00 },
        { time: '10:00', price: 4058.00 },
        { time: '11:00', price: 4052.00 },
        { time: '12:00', price: 4069.00 },
        { time: '13:00', price: 4075.00 },
        { time: '14:00', price: 4080.50 },
        { time: '15:00', price: 4082.00 },
        { time: '15:30', price: 4085.20 }
      ],
      '1W': [
        { time: 'Mon', price: 3990.00 },
        { time: 'Tue', price: 4015.00 },
        { time: 'Wed', price: 4022.00 },
        { time: 'Thu', price: 4030.40 },
        { time: 'Fri', price: 4085.20 }
      ],
      '1M': [
        { time: 'Week 1', price: 3950.00 },
        { time: 'Week 2', price: 4010.00 },
        { time: 'Week 3', price: 4040.00 },
        { time: 'Week 4', price: 4085.20 }
      ],
      '1Y': [
        { time: 'Nov 23', price: 3400.00 },
        { time: 'Jan 24', price: 3820.00 },
        { time: 'Apr 24', price: 3990.00 },
        { time: 'Jul 24', price: 4350.00 },
        { time: 'Oct 24', price: 4085.20 }
      ],
      '5Y': [
        { time: '2020', price: 2150.00 },
        { time: '2021', price: 3100.00 },
        { time: '2022', price: 3450.00 },
        { time: '2023', price: 3700.00 },
        { time: '2024', price: 4085.20 }
      ]
    },
    isGainer: true,
    isTopActive: false
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    sector: 'Banking / Financial Services',
    exchange: 'NSE',
    currentPrice: 1742.10,
    change: 18.90,
    changePercent: 1.10,
    previousClose: 1723.20,
    open: 1726.00,
    dayHigh: 1748.50,
    dayLow: 1724.00,
    volume: 14890200,
    week52High: 1794.00,
    week52Low: 1363.45,
    marketCap: 1324890,
    peRatio: 19.2,
    pbRatio: 2.85,
    dividendYield: 1.12,
    roe: 16.8,
    eps: 90.74,
    beta: 0.89,
    about: 'HDFC Bank is India’s largest private bank by assets and market capitalization. Following its landmark merger with HDFC Limited, it commands unparalleled presence in retail and corporate lending and housing finance.',
    orderBook: {
      bids: [
        { price: 1742.00, qty: 5400, orders: 45 },
        { price: 1741.80, qty: 8900, orders: 72 },
        { price: 1741.50, qty: 15400, orders: 120 },
        { price: 1741.00, qty: 24500, orders: 180 },
        { price: 1740.50, qty: 38000, orders: 240 }
      ],
      asks: [
        { price: 1742.20, qty: 6200, orders: 50 },
        { price: 1742.50, qty: 9800, orders: 85 },
        { price: 1743.00, qty: 18200, orders: 140 },
        { price: 1743.50, qty: 29000, orders: 210 },
        { price: 1744.00, qty: 45000, orders: 310 }
      ]
    },
    chartData: {
      '1D': [
        { time: '09:15', price: 1726.00 },
        { time: '10:00', price: 1731.50 },
        { time: '11:00', price: 1729.00 },
        { time: '12:00', price: 1735.20 },
        { time: '13:00', price: 1738.00 },
        { time: '14:00', price: 1739.50 },
        { time: '15:00', price: 1741.00 },
        { time: '15:30', price: 1742.10 }
      ],
      '1W': [
        { time: 'Mon', price: 1705.00 },
        { time: 'Tue', price: 1712.00 },
        { time: 'Wed', price: 1718.00 },
        { time: 'Thu', price: 1723.20 },
        { time: 'Fri', price: 1742.10 }
      ],
      '1M': [
        { time: 'Week 1', price: 1670.00 },
        { time: 'Week 2', price: 1695.00 },
        { time: 'Week 3', price: 1720.00 },
        { time: 'Week 4', price: 1742.10 }
      ],
      '1Y': [
        { time: 'Nov 23', price: 1490.00 },
        { time: 'Jan 24', price: 1440.00 },
        { time: 'Apr 24', price: 1530.00 },
        { time: 'Jul 24', price: 1640.00 },
        { time: 'Oct 24', price: 1742.10 }
      ],
      '5Y': [
        { time: '2020', price: 1180.00 },
        { time: '2021', price: 1460.00 },
        { time: '2022', price: 1520.00 },
        { time: '2023', price: 1610.00 },
        { time: '2024', price: 1742.10 }
      ]
    },
    isGainer: true,
    isTopActive: true
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd.',
    sector: 'Information Technology',
    exchange: 'NSE',
    currentPrice: 1856.40,
    change: 28.15,
    changePercent: 1.54,
    previousClose: 1828.25,
    open: 1835.00,
    dayHigh: 1864.00,
    dayLow: 1830.00,
    volume: 5820400,
    week52High: 1975.00,
    week52Low: 1358.35,
    marketCap: 771200,
    peRatio: 29.1,
    pbRatio: 8.7,
    dividendYield: 2.30,
    roe: 31.8,
    eps: 63.79,
    beta: 0.82,
    about: 'Infosys is a global leader in next-generation digital services and consulting. It enables clients in more than 56 countries to navigate their digital transformation, powered by cloud and AI.',
    orderBook: {
      bids: [
        { price: 1856.20, qty: 1200, orders: 12 },
        { price: 1856.00, qty: 2500, orders: 25 },
        { price: 1855.50, qty: 4100, orders: 40 },
        { price: 1855.00, qty: 7800, orders: 65 },
        { price: 1854.50, qty: 11000, orders: 90 }
      ],
      asks: [
        { price: 1856.50, qty: 1400, orders: 15 },
        { price: 1857.00, qty: 3200, orders: 30 },
        { price: 1857.50, qty: 5400, orders: 48 },
        { price: 1858.00, qty: 8900, orders: 75 },
        { price: 1859.00, qty: 14200, orders: 115 }
      ]
    },
    chartData: {
      '1D': [
        { time: '09:15', price: 1835.00 },
        { time: '10:00', price: 1842.00 },
        { time: '11:00', price: 1840.00 },
        { time: '12:00', price: 1849.50 },
        { time: '13:00', price: 1852.00 },
        { time: '14:00', price: 1854.00 },
        { time: '15:00', price: 1855.50 },
        { time: '15:30', price: 1856.40 }
      ],
      '1W': [
        { time: 'Mon', price: 1810.00 },
        { time: 'Tue', price: 1818.00 },
        { time: 'Wed', price: 1822.00 },
        { time: 'Thu', price: 1828.25 },
        { time: 'Fri', price: 1856.40 }
      ],
      '1M': [
        { time: 'Week 1', price: 1780.00 },
        { time: 'Week 2', price: 1815.00 },
        { time: 'Week 3', price: 1835.00 },
        { time: 'Week 4', price: 1856.40 }
      ],
      '1Y': [
        { time: 'Nov 23', price: 1390.00 },
        { time: 'Jan 24', price: 1620.00 },
        { time: 'Apr 24', price: 1480.00 },
        { time: 'Jul 24', price: 1790.00 },
        { time: 'Oct 24', price: 1856.40 }
      ],
      '5Y': [
        { time: '2020', price: 950.00 },
        { time: '2021', price: 1550.00 },
        { time: '2022', price: 1600.00 },
        { time: '2023', price: 1450.00 },
        { time: '2024', price: 1856.40 }
      ]
    },
    isGainer: true,
    isTopActive: false
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd.',
    sector: 'Automobile',
    exchange: 'NSE',
    currentPrice: 874.30,
    change: -12.45,
    changePercent: -1.40,
    previousClose: 886.75,
    open: 885.00,
    dayHigh: 888.00,
    dayLow: 871.20,
    volume: 11204000,
    week52High: 1179.05,
    week52Low: 622.00,
    marketCap: 321900,
    peRatio: 10.4,
    pbRatio: 3.4,
    dividendYield: 0.69,
    roe: 36.2,
    eps: 84.07,
    beta: 1.34,
    about: 'Tata Motors is a leading global automobile manufacturer with a portfolio comprising cars, sports utility vehicles, trucks, buses, and defense vehicles. It owns the iconic British luxury marque Jaguar Land Rover (JLR).',
    orderBook: {
      bids: [
        { price: 874.10, qty: 3500, orders: 32 },
        { price: 874.00, qty: 7800, orders: 64 },
        { price: 873.50, qty: 12400, orders: 98 },
        { price: 873.00, qty: 18500, orders: 142 },
        { price: 872.50, qty: 29000, orders: 215 }
      ],
      asks: [
        { price: 874.30, qty: 4200, orders: 38 },
        { price: 874.50, qty: 8900, orders: 74 },
        { price: 875.00, qty: 15400, orders: 122 },
        { price: 875.50, qty: 24000, orders: 180 },
        { price: 876.00, qty: 36500, orders: 260 }
      ]
    },
    chartData: {
      '1D': [
        { time: '09:15', price: 885.00 },
        { time: '10:00', price: 883.20 },
        { time: '11:00', price: 879.40 },
        { time: '12:00', price: 877.00 },
        { time: '13:00', price: 875.50 },
        { time: '14:00', price: 873.80 },
        { time: '15:00', price: 872.90 },
        { time: '15:30', price: 874.30 }
      ],
      '1W': [
        { time: 'Mon', price: 902.00 },
        { time: 'Tue', price: 896.00 },
        { time: 'Wed', price: 891.00 },
        { time: 'Thu', price: 886.75 },
        { time: 'Fri', price: 874.30 }
      ],
      '1M': [
        { time: 'Week 1', price: 940.00 },
        { time: 'Week 2', price: 920.00 },
        { time: 'Week 3', price: 890.00 },
        { time: 'Week 4', price: 874.30 }
      ],
      '1Y': [
        { time: 'Nov 23', price: 650.00 },
        { time: 'Jan 24', price: 810.00 },
        { time: 'Apr 24', price: 1010.00 },
        { time: 'Jul 24', price: 1140.00 },
        { time: 'Oct 24', price: 874.30 }
      ],
      '5Y': [
        { time: '2020', price: 130.00 },
        { time: '2021', price: 340.00 },
        { time: '2022', price: 420.00 },
        { time: '2023', price: 620.00 },
        { time: '2024', price: 874.30 }
      ]
    },
    isLoser: true,
    isTopActive: true
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd.',
    sector: 'Banking / Financial Services',
    exchange: 'NSE',
    currentPrice: 1289.40,
    change: 14.30,
    changePercent: 1.12,
    previousClose: 1275.10,
    open: 1278.00,
    dayHigh: 1294.50,
    dayLow: 1276.50,
    volume: 9812400,
    week52High: 1332.95,
    week52Low: 914.00,
    marketCap: 908400,
    peRatio: 18.6,
    pbRatio: 3.1,
    dividendYield: 0.78,
    roe: 18.9,
    eps: 69.32,
    beta: 1.05,
    about: 'ICICI Bank is a leading private sector bank in India offering a wide spectrum of banking products and financial services to corporate and retail customers.',
    orderBook: {
      bids: [
        { price: 1289.20, qty: 2400, orders: 18 },
        { price: 1289.00, qty: 5800, orders: 42 },
        { price: 1288.50, qty: 9400, orders: 75 },
        { price: 1288.00, qty: 15200, orders: 110 },
        { price: 1287.50, qty: 22000, orders: 165 }
      ],
      asks: [
        { price: 1289.40, qty: 3100, orders: 25 },
        { price: 1289.60, qty: 6200, orders: 48 },
        { price: 1290.00, qty: 11500, orders: 86 },
        { price: 1290.50, qty: 18000, orders: 130 },
        { price: 1291.00, qty: 28500, orders: 195 }
      ]
    },
    chartData: {
      '1D': [
        { time: '09:15', price: 1278.00 },
        { time: '10:00', price: 1282.50 },
        { time: '11:00', price: 1281.00 },
        { time: '12:00', price: 1285.80 },
        { time: '13:00', price: 1287.20 },
        { time: '14:00', price: 1288.50 },
        { time: '15:00', price: 1289.00 },
        { time: '15:30', price: 1289.40 }
      ],
      '1W': [
        { time: 'Mon', price: 1262.00 },
        { time: 'Tue', price: 1269.00 },
        { time: 'Wed', price: 1272.00 },
        { time: 'Thu', price: 1275.10 },
        { time: 'Fri', price: 1289.40 }
      ],
      '1M': [
        { time: 'Week 1', price: 1240.00 },
        { time: 'Week 2', price: 1258.00 },
        { time: 'Week 3', price: 1270.00 },
        { time: 'Week 4', price: 1289.40 }
      ],
      '1Y': [
        { time: 'Nov 23', price: 930.00 },
        { time: 'Jan 24', price: 1010.00 },
        { time: 'Apr 24', price: 1100.00 },
        { time: 'Jul 24', price: 1230.00 },
        { time: 'Oct 24', price: 1289.40 }
      ],
      '5Y': [
        { time: '2020', price: 410.00 },
        { time: '2021', price: 710.00 },
        { time: '2022', price: 880.00 },
        { time: '2023', price: 940.00 },
        { time: '2024', price: 1289.40 }
      ]
    },
    isGainer: true,
    isTopActive: true
  },
  {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd.',
    sector: 'Telecommunications',
    exchange: 'NSE',
    currentPrice: 1665.80,
    change: 22.10,
    changePercent: 1.34,
    previousClose: 1643.70,
    open: 1648.00,
    dayHigh: 1672.00,
    dayLow: 1645.00,
    volume: 4890000,
    week52High: 1779.00,
    week52Low: 902.10,
    marketCap: 994800,
    peRatio: 72.4,
    pbRatio: 9.8,
    dividendYield: 0.48,
    roe: 15.2,
    eps: 23.01,
    beta: 0.72,
    about: 'Bharti Airtel is a global communications solutions provider with over 500 million customers across 17 countries in South Asia and Africa, delivering 5G telecom, home broadband, digital TV, and enterprise data solutions.',
    orderBook: {
      bids: [
        { price: 1665.50, qty: 1800, orders: 14 },
        { price: 1665.00, qty: 3400, orders: 28 },
        { price: 1664.50, qty: 5800, orders: 48 },
        { price: 1664.00, qty: 9200, orders: 75 },
        { price: 1663.50, qty: 14500, orders: 110 }
      ],
      asks: [
        { price: 1666.00, qty: 2100, orders: 19 },
        { price: 1666.50, qty: 4200, orders: 35 },
        { price: 1667.00, qty: 7400, orders: 60 },
        { price: 1667.50, qty: 11800, orders: 92 },
        { price: 1668.00, qty: 18900, orders: 135 }
      ]
    },
    chartData: {
      '1D': [
        { time: '09:15', price: 1648.00 },
        { time: '10:00', price: 1655.00 },
        { time: '11:00', price: 1652.80 },
        { time: '12:00', price: 1661.00 },
        { time: '13:00', price: 1663.50 },
        { time: '14:00', price: 1664.80 },
        { time: '15:00', price: 1665.20 },
        { time: '15:30', price: 1665.80 }
      ],
      '1W': [
        { time: 'Mon', price: 1630.00 },
        { time: 'Tue', price: 1638.00 },
        { time: 'Wed', price: 1641.00 },
        { time: 'Thu', price: 1643.70 },
        { time: 'Fri', price: 1665.80 }
      ],
      '1M': [
        { time: 'Week 1', price: 1590.00 },
        { time: 'Week 2', price: 1620.00 },
        { time: 'Week 3', price: 1640.00 },
        { time: 'Week 4', price: 1665.80 }
      ],
      '1Y': [
        { time: 'Nov 23', price: 920.00 },
        { time: 'Jan 24', price: 1080.00 },
        { time: 'Apr 24', price: 1320.00 },
        { time: 'Jul 24', price: 1510.00 },
        { time: 'Oct 24', price: 1665.80 }
      ],
      '5Y': [
        { time: '2020', price: 440.00 },
        { time: '2021', price: 680.00 },
        { time: '2022', price: 790.00 },
        { time: '2023', price: 920.00 },
        { time: '2024', price: 1665.80 }
      ]
    },
    isGainer: true,
    isTopActive: false
  },
  {
    symbol: 'SBIN',
    name: 'State Bank of India',
    sector: 'Public Sector Banking',
    exchange: 'NSE',
    currentPrice: 814.20,
    change: -6.40,
    changePercent: -0.78,
    previousClose: 820.60,
    open: 821.00,
    dayHigh: 823.50,
    dayLow: 811.80,
    volume: 16500000,
    week52High: 912.10,
    week52Low: 555.30,
    marketCap: 726500,
    peRatio: 10.8,
    pbRatio: 1.7,
    dividendYield: 1.68,
    roe: 19.5,
    eps: 75.38,
    beta: 1.15,
    about: 'State Bank of India is a Fortune 500 Indian multinational statutory public sector bank and financial services statutory body. SBI is the largest bank in India with a 23% market share in assets.',
    orderBook: {
      bids: [
        { price: 814.00, qty: 5400, orders: 42 },
        { price: 813.80, qty: 9800, orders: 78 },
        { price: 813.50, qty: 16500, orders: 125 },
        { price: 813.00, qty: 25000, orders: 190 },
        { price: 812.50, qty: 38000, orders: 280 }
      ],
      asks: [
        { price: 814.20, qty: 6100, orders: 48 },
        { price: 814.50, qty: 11200, orders: 86 },
        { price: 815.00, qty: 19400, orders: 145 },
        { price: 815.50, qty: 31000, orders: 220 },
        { price: 816.00, qty: 46000, orders: 320 }
      ]
    },
    chartData: {
      '1D': [
        { time: '09:15', price: 821.00 },
        { time: '10:00', price: 819.50 },
        { time: '11:00', price: 817.20 },
        { time: '12:00', price: 816.00 },
        { time: '13:00', price: 815.10 },
        { time: '14:00', price: 813.80 },
        { time: '15:00', price: 813.00 },
        { time: '15:30', price: 814.20 }
      ],
      '1W': [
        { time: 'Mon', price: 829.00 },
        { time: 'Tue', price: 825.00 },
        { time: 'Wed', price: 823.50 },
        { time: 'Thu', price: 820.60 },
        { time: 'Fri', price: 814.20 }
      ],
      '1M': [
        { time: 'Week 1', price: 805.00 },
        { time: 'Week 2', price: 818.00 },
        { time: 'Week 3', price: 826.00 },
        { time: 'Week 4', price: 814.20 }
      ],
      '1Y': [
        { time: 'Nov 23', price: 565.00 },
        { time: 'Jan 24', price: 630.00 },
        { time: 'Apr 24', price: 770.00 },
        { time: 'Jul 24', price: 885.00 },
        { time: 'Oct 24', price: 814.20 }
      ],
      '5Y': [
        { time: '2020', price: 190.00 },
        { time: '2021', price: 470.00 },
        { time: '2022', price: 590.00 },
        { time: '2023', price: 575.00 },
        { time: '2024', price: 814.20 }
      ]
    },
    isLoser: true,
    isTopActive: true
  }
];

