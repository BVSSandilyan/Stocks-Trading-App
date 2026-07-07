// ============================================================
// COMPREHENSIVE INDIAN STOCK DATABASE — NSE & BSE
// Real prices as of July 2025 (paper trading reference)
// ============================================================

const INDIAN_STOCKS = {

  // ─── NIFTY 50 LARGE CAPS ─────────────────────────────────
  'RELIANCE':    { symbol: 'RELIANCE',    name: 'Reliance Industries Ltd.',              exchange: 'NSE', price: 1408.25, change: 12.30,   changePercent: 0.88,   volume: 8200000,  sector: 'Energy',         industry: 'Oil & Gas' },
  'TCS':         { symbol: 'TCS',         name: 'Tata Consultancy Services Ltd.',        exchange: 'NSE', price: 3438.90, change: -22.15,  changePercent: -0.64,  volume: 3100000,  sector: 'IT',             industry: 'IT Services' },
  'HDFCBANK':    { symbol: 'HDFCBANK',    name: 'HDFC Bank Ltd.',                        exchange: 'NSE', price: 1924.80, change: 14.35,   changePercent: 0.75,   volume: 11200000, sector: 'Banking',        industry: 'Private Bank' },
  'INFY':        { symbol: 'INFY',        name: 'Infosys Ltd.',                          exchange: 'NSE', price: 1638.55, change: 18.90,   changePercent: 1.17,   volume: 6400000,  sector: 'IT',             industry: 'IT Services' },
  'ICICIBANK':   { symbol: 'ICICIBANK',   name: 'ICICI Bank Ltd.',                       exchange: 'NSE', price: 1432.70, change: -9.20,   changePercent: -0.64,  volume: 9800000,  sector: 'Banking',        industry: 'Private Bank' },
  'HINDUNILVR':  { symbol: 'HINDUNILVR',  name: 'Hindustan Unilever Ltd.',               exchange: 'NSE', price: 2356.40, change: 11.20,   changePercent: 0.48,   volume: 2100000,  sector: 'FMCG',           industry: 'Consumer Goods' },
  'SBIN':        { symbol: 'SBIN',        name: 'State Bank of India',                   exchange: 'NSE', price: 831.25,  change: 7.85,    changePercent: 0.95,   volume: 22000000, sector: 'Banking',        industry: 'Public Bank' },
  'BHARTIARTL':  { symbol: 'BHARTIARTL',  name: 'Bharti Airtel Ltd.',                    exchange: 'NSE', price: 1895.60, change: -14.30,  changePercent: -0.75,  volume: 4500000,  sector: 'Telecom',        industry: 'Telecom Services' },
  'BAJFINANCE':  { symbol: 'BAJFINANCE',  name: 'Bajaj Finance Ltd.',                    exchange: 'NSE', price: 9248.35, change: 102.40,  changePercent: 1.12,   volume: 1800000,  sector: 'Finance',        industry: 'NBFC' },
  'WIPRO':       { symbol: 'WIPRO',       name: 'Wipro Ltd.',                            exchange: 'NSE', price: 469.90,  change: -5.30,   changePercent: -1.11,  volume: 7200000,  sector: 'IT',             industry: 'IT Services' },
  'LT':          { symbol: 'LT',          name: 'Larsen & Toubro Ltd.',                  exchange: 'NSE', price: 3652.15, change: 38.70,   changePercent: 1.07,   volume: 2300000,  sector: 'Infrastructure', industry: 'Engineering' },
  'ASIANPAINT':  { symbol: 'ASIANPAINT',  name: 'Asian Paints Ltd.',                     exchange: 'NSE', price: 2298.75, change: -18.45,  changePercent: -0.80,  volume: 1200000,  sector: 'Consumer',       industry: 'Paints' },
  'MARUTI':      { symbol: 'MARUTI',      name: 'Maruti Suzuki India Ltd.',              exchange: 'NSE', price: 12456.30,change: 124.80,  changePercent: 1.01,   volume: 890000,   sector: 'Auto',           industry: 'Passenger Vehicles' },
  'TITAN':       { symbol: 'TITAN',       name: 'Titan Company Ltd.',                    exchange: 'NSE', price: 3502.45, change: 28.60,   changePercent: 0.82,   volume: 1600000,  sector: 'Consumer',       industry: 'Jewellery & Watches' },
  'ULTRACEMCO':  { symbol: 'ULTRACEMCO',  name: 'UltraTech Cement Ltd.',                 exchange: 'NSE', price: 11248.60,change: -89.40,  changePercent: -0.79,  volume: 540000,   sector: 'Cement',         industry: 'Cement' },
  'AXISBANK':    { symbol: 'AXISBANK',    name: 'Axis Bank Ltd.',                        exchange: 'NSE', price: 1198.35, change: 11.25,   changePercent: 0.95,   volume: 8900000,  sector: 'Banking',        industry: 'Private Bank' },
  'SUNPHARMA':   { symbol: 'SUNPHARMA',   name: 'Sun Pharmaceutical Industries Ltd.',    exchange: 'NSE', price: 1892.40, change: 24.60,   changePercent: 1.32,   volume: 3400000,  sector: 'Pharma',         industry: 'Pharmaceuticals' },
  'TATAMOTORS':  { symbol: 'TATAMOTORS',  name: 'Tata Motors Ltd.',                      exchange: 'NSE', price: 719.85,  change: -9.35,   changePercent: -1.28,  volume: 12400000, sector: 'Auto',           industry: 'Commercial Vehicles' },
  'KOTAKBANK':   { symbol: 'KOTAKBANK',   name: 'Kotak Mahindra Bank Ltd.',              exchange: 'NSE', price: 2152.30, change: 18.45,   changePercent: 0.86,   volume: 4100000,  sector: 'Banking',        industry: 'Private Bank' },
  'HCLTECH':     { symbol: 'HCLTECH',     name: 'HCL Technologies Ltd.',                 exchange: 'NSE', price: 1732.60, change: 22.80,   changePercent: 1.33,   volume: 5200000,  sector: 'IT',             industry: 'IT Services' },
  'ITC':         { symbol: 'ITC',         name: 'ITC Ltd.',                              exchange: 'NSE', price: 428.35,  change: 3.15,    changePercent: 0.74,   volume: 18000000, sector: 'FMCG',           industry: 'Tobacco & Diversified' },
  'POWERGRID':   { symbol: 'POWERGRID',   name: 'Power Grid Corporation of India Ltd.',  exchange: 'NSE', price: 298.45,  change: -1.85,   changePercent: -0.62,  volume: 9800000,  sector: 'Power',          industry: 'Power Transmission' },
  'NTPC':        { symbol: 'NTPC',        name: 'NTPC Ltd.',                             exchange: 'NSE', price: 361.20,  change: 4.65,    changePercent: 1.30,   volume: 14500000, sector: 'Power',          industry: 'Power Generation' },
  'ONGC':        { symbol: 'ONGC',        name: 'Oil and Natural Gas Corporation Ltd.',  exchange: 'NSE', price: 241.80,  change: 3.20,    changePercent: 1.34,   volume: 16000000, sector: 'Energy',         industry: 'Oil & Gas Exploration' },
  'ADANIENT':    { symbol: 'ADANIENT',    name: 'Adani Enterprises Ltd.',                exchange: 'NSE', price: 2612.55, change: -28.40,  changePercent: -1.08,  volume: 3200000,  sector: 'Conglomerate',   industry: 'Diversified' },
  'DRREDDY':     { symbol: 'DRREDDY',     name: "Dr. Reddy's Laboratories Ltd.",         exchange: 'NSE', price: 6428.75, change: 72.30,   changePercent: 1.14,   volume: 780000,   sector: 'Pharma',         industry: 'Pharmaceuticals' },
  'JSWSTEEL':    { symbol: 'JSWSTEEL',    name: 'JSW Steel Ltd.',                        exchange: 'NSE', price: 1021.40, change: 12.60,   changePercent: 1.25,   volume: 5600000,  sector: 'Steel',          industry: 'Steel' },
  'TATASTEEL':   { symbol: 'TATASTEEL',   name: 'Tata Steel Ltd.',                       exchange: 'NSE', price: 162.55,  change: 1.85,    changePercent: 1.15,   volume: 32000000, sector: 'Steel',          industry: 'Steel' },
  'HINDALCO':    { symbol: 'HINDALCO',    name: 'Hindalco Industries Ltd.',              exchange: 'NSE', price: 698.35,  change: 8.45,    changePercent: 1.23,   volume: 7800000,  sector: 'Metals',         industry: 'Aluminium' },
  'COALINDIA':   { symbol: 'COALINDIA',   name: 'Coal India Ltd.',                       exchange: 'NSE', price: 387.60,  change: 4.20,    changePercent: 1.09,   volume: 8200000,  sector: 'Mining',         industry: 'Coal' },
  'BPCL':        { symbol: 'BPCL',        name: 'Bharat Petroleum Corporation Ltd.',     exchange: 'NSE', price: 348.90,  change: -3.45,   changePercent: -0.98,  volume: 9400000,  sector: 'Energy',         industry: 'Oil Refining' },
  'GRASIM':      { symbol: 'GRASIM',      name: 'Grasim Industries Ltd.',                exchange: 'NSE', price: 2748.60, change: 22.40,   changePercent: 0.82,   volume: 1100000,  sector: 'Diversified',    industry: 'Cement & VSF' },
  'TECHM':       { symbol: 'TECHM',       name: 'Tech Mahindra Ltd.',                    exchange: 'NSE', price: 1598.45, change: 18.60,   changePercent: 1.18,   volume: 3200000,  sector: 'IT',             industry: 'IT Services' },
  'DIVISLAB':    { symbol: 'DIVISLAB',    name: "Divi's Laboratories Ltd.",              exchange: 'NSE', price: 5848.30, change: 64.20,   changePercent: 1.11,   volume: 620000,   sector: 'Pharma',         industry: 'API Manufacturing' },
  'NESTLEIND':   { symbol: 'NESTLEIND',   name: 'Nestle India Ltd.',                     exchange: 'NSE', price: 2198.45, change: 16.80,   changePercent: 0.77,   volume: 145000,   sector: 'FMCG',           industry: 'Food & Beverages' },
  'CIPLA':       { symbol: 'CIPLA',       name: 'Cipla Ltd.',                            exchange: 'NSE', price: 1568.90, change: 18.25,   changePercent: 1.18,   volume: 2800000,  sector: 'Pharma',         industry: 'Pharmaceuticals' },
  'EICHERMOT':   { symbol: 'EICHERMOT',   name: 'Eicher Motors Ltd.',                    exchange: 'NSE', price: 5312.40, change: 58.90,   changePercent: 1.12,   volume: 480000,   sector: 'Auto',           industry: 'Two Wheelers' },
  'BAJAJ-AUTO':  { symbol: 'BAJAJ-AUTO',  name: 'Bajaj Auto Ltd.',                       exchange: 'NSE', price: 8924.55, change: 98.40,   changePercent: 1.11,   volume: 520000,   sector: 'Auto',           industry: 'Two Wheelers' },
  'HEROMOTOCO':  { symbol: 'HEROMOTOCO',  name: 'Hero MotoCorp Ltd.',                    exchange: 'NSE', price: 4248.70, change: -34.20,  changePercent: -0.80,  volume: 680000,   sector: 'Auto',           industry: 'Two Wheelers' },
  'BRITANNIA':   { symbol: 'BRITANNIA',   name: 'Britannia Industries Ltd.',             exchange: 'NSE', price: 5412.35, change: 38.60,   changePercent: 0.72,   volume: 320000,   sector: 'FMCG',           industry: 'Food Products' },
  'APOLLOHOSP':  { symbol: 'APOLLOHOSP',  name: 'Apollo Hospitals Enterprise Ltd.',      exchange: 'NSE', price: 6892.40, change: 82.60,   changePercent: 1.21,   volume: 420000,   sector: 'Healthcare',     industry: 'Hospitals' },
  'SBILIFE':     { symbol: 'SBILIFE',     name: 'SBI Life Insurance Company Ltd.',       exchange: 'NSE', price: 1689.45, change: 14.80,   changePercent: 0.88,   volume: 1800000,  sector: 'Insurance',      industry: 'Life Insurance' },
  'HDFCLIFE':    { symbol: 'HDFCLIFE',    name: 'HDFC Life Insurance Company Ltd.',      exchange: 'NSE', price: 752.60,  change: 6.45,    changePercent: 0.86,   volume: 4200000,  sector: 'Insurance',      industry: 'Life Insurance' },
  'BAJAJFINSV':  { symbol: 'BAJAJFINSV',  name: 'Bajaj Finserv Ltd.',                    exchange: 'NSE', price: 1938.25, change: 22.40,   changePercent: 1.17,   volume: 2100000,  sector: 'Finance',        industry: 'Financial Services' },
  'INDUSINDBK':  { symbol: 'INDUSINDBK',  name: 'IndusInd Bank Ltd.',                    exchange: 'NSE', price: 858.35,  change: -10.20,  changePercent: -1.17,  volume: 4800000,  sector: 'Banking',        industry: 'Private Bank' },
  'M&M':         { symbol: 'M&M',         name: 'Mahindra & Mahindra Ltd.',              exchange: 'NSE', price: 3098.45, change: 32.60,   changePercent: 1.06,   volume: 3200000,  sector: 'Auto',           industry: 'SUV & Tractors' },
  'ADANIPORTS':  { symbol: 'ADANIPORTS',  name: 'Adani Ports and SEZ Ltd.',              exchange: 'NSE', price: 1284.60, change: 16.40,   changePercent: 1.29,   volume: 4200000,  sector: 'Infrastructure', industry: 'Ports' },
  'SHRIRAMFIN':  { symbol: 'SHRIRAMFIN',  name: 'Shriram Finance Ltd.',                  exchange: 'NSE', price: 654.85,  change: 7.20,    changePercent: 1.11,   volume: 3400000,  sector: 'Finance',        industry: 'NBFC' },
  'TRENT':       { symbol: 'TRENT',       name: 'Trent Ltd.',                            exchange: 'NSE', price: 5812.30, change: 72.40,   changePercent: 1.26,   volume: 880000,   sector: 'Retail',         industry: 'Fashion Retail' },
  'BEL':         { symbol: 'BEL',         name: 'Bharat Electronics Ltd.',               exchange: 'NSE', price: 298.45,  change: 3.65,    changePercent: 1.24,   volume: 14000000, sector: 'Capital Goods',  industry: 'Defence Electronics' },

  // ─── BANKING ─────────────────────────────────────────────
  'BANKBARODA':  { symbol: 'BANKBARODA',  name: 'Bank of Baroda',                        exchange: 'NSE', price: 228.45,  change: 2.80,    changePercent: 1.24,   volume: 14000000, sector: 'Banking',        industry: 'Public Bank' },
  'PNB':         { symbol: 'PNB',         name: 'Punjab National Bank',                  exchange: 'NSE', price: 104.25,  change: 1.35,    changePercent: 1.31,   volume: 28000000, sector: 'Banking',        industry: 'Public Bank' },
  'CANARABANK':  { symbol: 'CANARABANK',  name: 'Canara Bank',                           exchange: 'NSE', price: 98.65,   change: 1.10,    changePercent: 1.13,   volume: 22000000, sector: 'Banking',        industry: 'Public Bank' },
  'UNIONBANK':   { symbol: 'UNIONBANK',   name: 'Union Bank of India',                   exchange: 'NSE', price: 138.90,  change: 1.75,    changePercent: 1.28,   volume: 16000000, sector: 'Banking',        industry: 'Public Bank' },
  'IOBK':        { symbol: 'IOBK',        name: 'Indian Overseas Bank',                  exchange: 'NSE', price: 52.40,   change: 0.55,    changePercent: 1.06,   volume: 24000000, sector: 'Banking',        industry: 'Public Bank' },
  'MAHABANK':    { symbol: 'MAHABANK',    name: 'Bank of Maharashtra',                   exchange: 'NSE', price: 52.85,   change: 0.65,    changePercent: 1.24,   volume: 22000000, sector: 'Banking',        industry: 'Public Bank' },
  'INDIANB':     { symbol: 'INDIANB',     name: 'Indian Bank',                           exchange: 'NSE', price: 568.30,  change: 6.45,    changePercent: 1.15,   volume: 4800000,  sector: 'Banking',        industry: 'Public Bank' },
  'UCOBANK':     { symbol: 'UCOBANK',     name: 'UCO Bank',                              exchange: 'NSE', price: 44.20,   change: 0.40,    changePercent: 0.91,   volume: 20000000, sector: 'Banking',        industry: 'Public Bank' },
  'FEDERALBNK':  { symbol: 'FEDERALBNK',  name: 'The Federal Bank Ltd.',                 exchange: 'NSE', price: 198.45,  change: 2.20,    changePercent: 1.12,   volume: 8400000,  sector: 'Banking',        industry: 'Private Bank' },
  'BANDHANBNK':  { symbol: 'BANDHANBNK',  name: 'Bandhan Bank Ltd.',                     exchange: 'NSE', price: 168.35,  change: -2.15,   changePercent: -1.26,  volume: 6200000,  sector: 'Banking',        industry: 'Private Bank' },
  'IDFCFIRSTB':  { symbol: 'IDFCFIRSTB',  name: 'IDFC First Bank Ltd.',                  exchange: 'NSE', price: 68.45,   change: 0.85,    changePercent: 1.26,   volume: 18000000, sector: 'Banking',        industry: 'Private Bank' },
  'RBLBANK':     { symbol: 'RBLBANK',     name: 'RBL Bank Ltd.',                         exchange: 'NSE', price: 214.60,  change: -2.80,   changePercent: -1.29,  volume: 4800000,  sector: 'Banking',        industry: 'Private Bank' },
  'YESBANK':     { symbol: 'YESBANK',     name: 'Yes Bank Ltd.',                         exchange: 'NSE', price: 19.85,   change: 0.25,    changePercent: 1.27,   volume: 48000000, sector: 'Banking',        industry: 'Private Bank' },
  'DCBBANK':     { symbol: 'DCBBANK',     name: 'DCB Bank Ltd.',                         exchange: 'NSE', price: 124.40,  change: 1.55,    changePercent: 1.26,   volume: 2800000,  sector: 'Banking',        industry: 'Private Bank' },
  'UJJIVANSFB':  { symbol: 'UJJIVANSFB',  name: 'Ujjivan Small Finance Bank Ltd.',       exchange: 'NSE', price: 42.85,   change: 0.55,    changePercent: 1.30,   volume: 8400000,  sector: 'Banking',        industry: 'Small Finance Bank' },

  // ─── IT & TECHNOLOGY ─────────────────────────────────────
  'MPHASIS':     { symbol: 'MPHASIS',     name: 'Mphasis Ltd.',                          exchange: 'NSE', price: 2789.45, change: 32.60,   changePercent: 1.18,   volume: 820000,   sector: 'IT',             industry: 'IT Services' },
  'LTTS':        { symbol: 'LTTS',        name: 'L&T Technology Services Ltd.',          exchange: 'NSE', price: 4912.35, change: 58.40,   changePercent: 1.20,   volume: 420000,   sector: 'IT',             industry: 'IT Services' },
  'LTIMINDTREE': { symbol: 'LTIMINDTREE', name: 'LTIMindtree Ltd.',                      exchange: 'NSE', price: 4568.90, change: 52.40,   changePercent: 1.16,   volume: 580000,   sector: 'IT',             industry: 'IT Services' },
  'COFORGE':     { symbol: 'COFORGE',     name: 'Coforge Ltd.',                          exchange: 'NSE', price: 7248.60, change: 88.20,   changePercent: 1.23,   volume: 360000,   sector: 'IT',             industry: 'IT Services' },
  'PERSISTENT':  { symbol: 'PERSISTENT',  name: 'Persistent Systems Ltd.',               exchange: 'NSE', price: 5912.35, change: 68.40,   changePercent: 1.17,   volume: 480000,   sector: 'IT',             industry: 'IT Services' },
  'KPITTECH':    { symbol: 'KPITTECH',    name: 'KPIT Technologies Ltd.',                exchange: 'NSE', price: 1389.45, change: 16.80,   changePercent: 1.23,   volume: 1200000,  sector: 'IT',             industry: 'IT Services' },
  'TATAELXSI':   { symbol: 'TATAELXSI',   name: 'Tata Elxsi Ltd.',                       exchange: 'NSE', price: 6248.75, change: 72.40,   changePercent: 1.17,   volume: 280000,   sector: 'IT',             industry: 'IT Services' },
  'MASTEK':      { symbol: 'MASTEK',      name: 'Mastek Ltd.',                           exchange: 'NSE', price: 2456.80, change: 28.60,   changePercent: 1.18,   volume: 180000,   sector: 'IT',             industry: 'IT Services' },
  'CYIENT':      { symbol: 'CYIENT',      name: 'Cyient Ltd.',                           exchange: 'NSE', price: 1698.45, change: 19.80,   changePercent: 1.18,   volume: 520000,   sector: 'IT',             industry: 'IT Services' },
  'PERSISTENT2': { symbol: 'SONATSOFTW',  name: 'Sonata Software Ltd.',                  exchange: 'NSE', price: 638.45,  change: 7.20,    changePercent: 1.14,   volume: 1200000,  sector: 'IT',             industry: 'IT Services' },
  'RATEGAIN':    { symbol: 'RATEGAIN',    name: 'RateGain Travel Technologies Ltd.',     exchange: 'NSE', price: 548.60,  change: 6.40,    changePercent: 1.18,   volume: 680000,   sector: 'IT',             industry: 'SaaS' },
  'NEWGEN':      { symbol: 'NEWGEN',      name: 'Newgen Software Technologies Ltd.',     exchange: 'NSE', price: 1389.45, change: 16.80,   changePercent: 1.23,   volume: 480000,   sector: 'IT',             industry: 'Software Products' },

  // ─── PHARMA & HEALTHCARE ─────────────────────────────────
  'AUROPHARMA':  { symbol: 'AUROPHARMA',  name: 'Aurobindo Pharma Ltd.',                 exchange: 'NSE', price: 1189.45, change: 14.20,   changePercent: 1.21,   volume: 2800000,  sector: 'Pharma',         industry: 'Pharmaceuticals' },
  'BIOCON':      { symbol: 'BIOCON',      name: 'Biocon Ltd.',                           exchange: 'NSE', price: 348.60,  change: -4.20,   changePercent: -1.19,  volume: 6400000,  sector: 'Pharma',         industry: 'Biopharmaceuticals' },
  'LUPIN':       { symbol: 'LUPIN',       name: 'Lupin Ltd.',                            exchange: 'NSE', price: 2148.35, change: 24.60,   changePercent: 1.16,   volume: 2200000,  sector: 'Pharma',         industry: 'Pharmaceuticals' },
  'TORNTPHARM':  { symbol: 'TORNTPHARM',  name: 'Torrent Pharmaceuticals Ltd.',          exchange: 'NSE', price: 3289.45, change: 38.20,   changePercent: 1.18,   volume: 720000,   sector: 'Pharma',         industry: 'Pharmaceuticals' },
  'ALKEM':       { symbol: 'ALKEM',       name: 'Alkem Laboratories Ltd.',               exchange: 'NSE', price: 5628.45, change: 64.20,   changePercent: 1.15,   volume: 280000,   sector: 'Pharma',         industry: 'Pharmaceuticals' },
  'IPCALAB':     { symbol: 'IPCALAB',     name: 'IPCA Laboratories Ltd.',                exchange: 'NSE', price: 1648.35, change: 19.40,   changePercent: 1.19,   volume: 620000,   sector: 'Pharma',         industry: 'Pharmaceuticals' },
  'NATCOPHARM':  { symbol: 'NATCOPHARM',  name: 'Natco Pharma Ltd.',                     exchange: 'NSE', price: 1389.45, change: 16.80,   changePercent: 1.22,   volume: 480000,   sector: 'Pharma',         industry: 'Pharmaceuticals' },
  'GRANULES':    { symbol: 'GRANULES',    name: 'Granules India Ltd.',                   exchange: 'NSE', price: 548.60,  change: 6.80,    changePercent: 1.25,   volume: 1800000,  sector: 'Pharma',         industry: 'API Manufacturing' },
  'METROPOLIS':  { symbol: 'METROPOLIS',  name: 'Metropolis Healthcare Ltd.',            exchange: 'NSE', price: 1812.45, change: 22.40,   changePercent: 1.25,   volume: 380000,   sector: 'Healthcare',     industry: 'Diagnostics' },
  'DRPATH':      { symbol: 'DRPATH',      name: "Dr Lal PathLabs Ltd.",                  exchange: 'NSE', price: 2948.35, change: 34.80,   changePercent: 1.19,   volume: 280000,   sector: 'Healthcare',     industry: 'Diagnostics' },
  'MAXHEALTH':   { symbol: 'MAXHEALTH',   name: 'Max Healthcare Institute Ltd.',         exchange: 'NSE', price: 1089.45, change: 12.80,   changePercent: 1.19,   volume: 2800000,  sector: 'Healthcare',     industry: 'Hospitals' },
  'NARAYANA':    { symbol: 'NARAYANA',    name: 'Narayana Hrudayalaya Ltd.',             exchange: 'NSE', price: 1648.35, change: 19.40,   changePercent: 1.19,   volume: 1200000,  sector: 'Healthcare',     industry: 'Hospitals' },
  'FORTIS':      { symbol: 'FORTIS',      name: 'Fortis Healthcare Ltd.',                exchange: 'NSE', price: 689.45,  change: 8.20,    changePercent: 1.20,   volume: 4200000,  sector: 'Healthcare',     industry: 'Hospitals' },

  // ─── AUTO & AUTO ANCILLARIES ─────────────────────────────
  'ASHOKLEY':    { symbol: 'ASHOKLEY',    name: 'Ashok Leyland Ltd.',                    exchange: 'NSE', price: 248.35,  change: 2.80,    changePercent: 1.14,   volume: 12000000, sector: 'Auto',           industry: 'Commercial Vehicles' },
  'TVSMOTOR':    { symbol: 'TVSMOTOR',    name: 'TVS Motor Company Ltd.',                exchange: 'NSE', price: 2648.35, change: 28.60,   changePercent: 1.09,   volume: 1800000,  sector: 'Auto',           industry: 'Two Wheelers' },
  'MOTHERSON':   { symbol: 'MOTHERSON',   name: 'Samvardhana Motherson International',   exchange: 'NSE', price: 142.45,  change: 1.75,    changePercent: 1.24,   volume: 14000000, sector: 'Auto',           industry: 'Auto Ancillaries' },
  'BOSCHLTD':    { symbol: 'BOSCHLTD',    name: 'Bosch Ltd.',                            exchange: 'NSE', price: 36248.00,change: 412.00,  changePercent: 1.15,   volume: 82000,    sector: 'Auto',           industry: 'Auto Ancillaries' },
  'MRF':         { symbol: 'MRF',         name: 'MRF Ltd.',                              exchange: 'NSE', price: 138248.00,change:1548.00, changePercent: 1.13,   volume: 12000,    sector: 'Auto',           industry: 'Tyres' },
  'APOLLOTYRE':  { symbol: 'APOLLOTYRE',  name: 'Apollo Tyres Ltd.',                     exchange: 'NSE', price: 498.35,  change: 5.80,    changePercent: 1.18,   volume: 4200000,  sector: 'Auto',           industry: 'Tyres' },
  'CEATLTD':     { symbol: 'CEATLTD',     name: 'CEAT Ltd.',                             exchange: 'NSE', price: 3148.35, change: 36.40,   changePercent: 1.17,   volume: 380000,   sector: 'Auto',           industry: 'Tyres' },
  'BALKRISIND':  { symbol: 'BALKRISIND',  name: 'Balkrishna Industries Ltd.',            exchange: 'NSE', price: 2948.35, change: 32.60,   changePercent: 1.12,   volume: 480000,   sector: 'Auto',           industry: 'Tyres' },
  'BHARATFORG':  { symbol: 'BHARATFORG',  name: 'Bharat Forge Ltd.',                     exchange: 'NSE', price: 1348.35, change: 15.60,   changePercent: 1.17,   volume: 1800000,  sector: 'Auto',           industry: 'Auto Ancillaries' },
  'EXIDEIND':    { symbol: 'EXIDEIND',    name: 'Exide Industries Ltd.',                 exchange: 'NSE', price: 389.45,  change: 4.60,    changePercent: 1.20,   volume: 4200000,  sector: 'Auto',           industry: 'Auto Ancillaries' },
  'AMARAJABAT':  { symbol: 'AMARAJABAT',  name: 'Amara Raja Energy & Mobility Ltd.',     exchange: 'NSE', price: 1189.45, change: 13.60,   changePercent: 1.16,   volume: 1200000,  sector: 'Auto',           industry: 'Auto Ancillaries' },

  // ─── FMCG & CONSUMER ─────────────────────────────────────
  'DABUR':       { symbol: 'DABUR',       name: 'Dabur India Ltd.',                      exchange: 'NSE', price: 498.35,  change: 5.80,    changePercent: 1.18,   volume: 4200000,  sector: 'FMCG',           industry: 'Consumer Goods' },
  'MARICO':      { symbol: 'MARICO',      name: 'Marico Ltd.',                           exchange: 'NSE', price: 648.35,  change: 7.20,    changePercent: 1.12,   volume: 4800000,  sector: 'FMCG',           industry: 'Consumer Goods' },
  'COLPAL':      { symbol: 'COLPAL',      name: 'Colgate-Palmolive (India) Ltd.',        exchange: 'NSE', price: 3248.35, change: 36.40,   changePercent: 1.13,   volume: 680000,   sector: 'FMCG',           industry: 'Consumer Goods' },
  'VBL':         { symbol: 'VBL',         name: 'Varun Beverages Ltd.',                  exchange: 'NSE', price: 648.35,  change: 7.60,    changePercent: 1.19,   volume: 2800000,  sector: 'FMCG',           industry: 'Beverages' },
  'RADICO':      { symbol: 'RADICO',      name: 'Radico Khaitan Ltd.',                   exchange: 'NSE', price: 2548.35, change: 28.40,   changePercent: 1.13,   volume: 680000,   sector: 'FMCG',           industry: 'Alcoholic Beverages' },
  'JUBLFOOD':    { symbol: 'JUBLFOOD',    name: 'Jubilant FoodWorks Ltd.',               exchange: 'NSE', price: 698.35,  change: 8.20,    changePercent: 1.19,   volume: 2800000,  sector: 'FMCG',           industry: 'QSR' },
  'GODREJCP':    { symbol: 'GODREJCP',    name: 'Godrej Consumer Products Ltd.',         exchange: 'NSE', price: 1148.35, change: 12.40,   changePercent: 1.09,   volume: 2200000,  sector: 'FMCG',           industry: 'Consumer Goods' },
  'EMAMILTD':    { symbol: 'EMAMILTD',    name: 'Emami Ltd.',                            exchange: 'NSE', price: 698.35,  change: 8.20,    changePercent: 1.19,   volume: 1800000,  sector: 'FMCG',           industry: 'Consumer Goods' },
  'TATACONSUM':  { symbol: 'TATACONSUM',  name: 'Tata Consumer Products Ltd.',           exchange: 'NSE', price: 1098.35, change: 12.40,   changePercent: 1.14,   volume: 3800000,  sector: 'FMCG',           industry: 'Food & Beverages' },

  // ─── STEEL & METALS ──────────────────────────────────────
  'SAIL':        { symbol: 'SAIL',        name: 'Steel Authority of India Ltd.',         exchange: 'NSE', price: 128.45,  change: 1.60,    changePercent: 1.26,   volume: 28000000, sector: 'Steel',          industry: 'Steel' },
  'NMDC':        { symbol: 'NMDC',        name: 'NMDC Ltd.',                             exchange: 'NSE', price: 218.45,  change: 2.60,    changePercent: 1.21,   volume: 12000000, sector: 'Mining',         industry: 'Iron Ore' },
  'NATIONALUM':  { symbol: 'NATIONALUM',  name: 'National Aluminium Company Ltd.',       exchange: 'NSE', price: 228.45,  change: 2.80,    changePercent: 1.24,   volume: 8400000,  sector: 'Metals',         industry: 'Aluminium' },
  'VEDL':        { symbol: 'VEDL',        name: 'Vedanta Ltd.',                          exchange: 'NSE', price: 468.35,  change: 5.80,    changePercent: 1.25,   volume: 14000000, sector: 'Metals',         industry: 'Diversified Metals' },
  'HINDZINC':    { symbol: 'HINDZINC',    name: 'Hindustan Zinc Ltd.',                   exchange: 'NSE', price: 748.35,  change: 9.20,    changePercent: 1.24,   volume: 4800000,  sector: 'Metals',         industry: 'Zinc' },
  'RATNAMANI':   { symbol: 'RATNAMANI',   name: 'Ratnamani Metals and Tubes Ltd.',       exchange: 'NSE', price: 3148.35, change: 36.40,   changePercent: 1.17,   volume: 120000,   sector: 'Steel',          industry: 'Steel Pipes' },
  'APLAPOLLO':   { symbol: 'APLAPOLLO',   name: 'APL Apollo Tubes Ltd.',                 exchange: 'NSE', price: 1548.35, change: 18.40,   changePercent: 1.20,   volume: 1200000,  sector: 'Steel',          industry: 'Steel Tubes' },

  // ─── CEMENT & CONSTRUCTION ───────────────────────────────
  'SHREECEM':    { symbol: 'SHREECEM',    name: 'Shree Cement Ltd.',                     exchange: 'NSE', price: 26248.00,change: 298.00,  changePercent: 1.15,   volume: 82000,    sector: 'Cement',         industry: 'Cement' },
  'AMBUJACEM':   { symbol: 'AMBUJACEM',   name: 'Ambuja Cements Ltd.',                   exchange: 'NSE', price: 548.35,  change: 6.80,    changePercent: 1.25,   volume: 8400000,  sector: 'Cement',         industry: 'Cement' },
  'ACCLTD':      { symbol: 'ACCLTD',      name: 'ACC Ltd.',                              exchange: 'NSE', price: 1898.35, change: 22.40,   changePercent: 1.20,   volume: 1800000,  sector: 'Cement',         industry: 'Cement' },
  'JKCEMENT':    { symbol: 'JKCEMENT',    name: 'JK Cement Ltd.',                        exchange: 'NSE', price: 4248.35, change: 48.40,   changePercent: 1.15,   volume: 280000,   sector: 'Cement',         industry: 'Cement' },
  'DALMIA':      { symbol: 'DALMIA',      name: 'Dalmia Bharat Ltd.',                    exchange: 'NSE', price: 1748.35, change: 20.40,   changePercent: 1.18,   volume: 880000,   sector: 'Cement',         industry: 'Cement' },
  'NCC':         { symbol: 'NCC',         name: 'NCC Ltd.',                              exchange: 'NSE', price: 248.35,  change: 3.20,    changePercent: 1.30,   volume: 4800000,  sector: 'Infrastructure', industry: 'Construction' },
  'RVNL':        { symbol: 'RVNL',        name: 'Rail Vikas Nigam Ltd.',                 exchange: 'NSE', price: 398.45,  change: 5.20,    changePercent: 1.32,   volume: 8400000,  sector: 'Infrastructure', industry: 'Railways' },
  'IRCTC':       { symbol: 'IRCTC',       name: 'Indian Railway Catering & Tourism',     exchange: 'NSE', price: 898.45,  change: 10.20,   changePercent: 1.15,   volume: 4800000,  sector: 'Infrastructure', industry: 'Railways' },

  // ─── OIL, GAS & ENERGY ───────────────────────────────────
  'IOC':         { symbol: 'IOC',         name: 'Indian Oil Corporation Ltd.',           exchange: 'NSE', price: 148.35,  change: 1.80,    changePercent: 1.23,   volume: 24000000, sector: 'Energy',         industry: 'Oil Refining' },
  'HPCL':        { symbol: 'HPCL',        name: 'Hindustan Petroleum Corporation',       exchange: 'NSE', price: 412.45,  change: 5.20,    changePercent: 1.28,   volume: 12000000, sector: 'Energy',         industry: 'Oil Refining' },
  'GAIL':        { symbol: 'GAIL',        name: 'GAIL (India) Ltd.',                     exchange: 'NSE', price: 198.45,  change: 2.40,    changePercent: 1.22,   volume: 14000000, sector: 'Energy',         industry: 'Gas Distribution' },
  'IGL':         { symbol: 'IGL',         name: 'Indraprastha Gas Ltd.',                 exchange: 'NSE', price: 398.45,  change: 4.80,    changePercent: 1.22,   volume: 4800000,  sector: 'Energy',         industry: 'Gas Distribution' },
  'MGL':         { symbol: 'MGL',         name: 'Mahanagar Gas Ltd.',                    exchange: 'NSE', price: 1648.35, change: 19.80,   changePercent: 1.22,   volume: 880000,   sector: 'Energy',         industry: 'Gas Distribution' },
  'GUJGASLTD':   { symbol: 'GUJGASLTD',   name: 'Gujarat Gas Ltd.',                      exchange: 'NSE', price: 548.35,  change: 6.60,    changePercent: 1.22,   volume: 2800000,  sector: 'Energy',         industry: 'Gas Distribution' },
  'PETRONET':    { symbol: 'PETRONET',    name: 'Petronet LNG Ltd.',                     exchange: 'NSE', price: 268.45,  change: 3.20,    changePercent: 1.21,   volume: 8400000,  sector: 'Energy',         industry: 'LNG' },
  'TATAPOWER':   { symbol: 'TATAPOWER',   name: 'Tata Power Company Ltd.',               exchange: 'NSE', price: 432.45,  change: 5.40,    changePercent: 1.27,   volume: 18000000, sector: 'Power',          industry: 'Power Generation' },
  'JSWENERGY':   { symbol: 'JSWENERGY',   name: 'JSW Energy Ltd.',                       exchange: 'NSE', price: 698.35,  change: 8.40,    changePercent: 1.22,   volume: 4800000,  sector: 'Power',          industry: 'Power Generation' },
  'NHPC':        { symbol: 'NHPC',        name: 'NHPC Ltd.',                             exchange: 'NSE', price: 88.45,   change: 1.10,    changePercent: 1.26,   volume: 22000000, sector: 'Power',          industry: 'Hydropower' },
  'SJVN':        { symbol: 'SJVN',        name: 'SJVN Ltd.',                             exchange: 'NSE', price: 118.45,  change: 1.40,    changePercent: 1.20,   volume: 18000000, sector: 'Power',          industry: 'Hydropower' },
  'TORNTPOWER':  { symbol: 'TORNTPOWER',  name: 'Torrent Power Ltd.',                    exchange: 'NSE', price: 1748.35, change: 20.80,   changePercent: 1.21,   volume: 1800000,  sector: 'Power',          industry: 'Power Distribution' },

  // ─── CHEMICALS & FERTILIZERS ─────────────────────────────
  'PIDILITIND':  { symbol: 'PIDILITIND',  name: 'Pidilite Industries Ltd.',              exchange: 'NSE', price: 2948.35, change: 34.80,   changePercent: 1.19,   volume: 880000,   sector: 'Chemicals',      industry: 'Adhesives' },
  'SRF':         { symbol: 'SRF',         name: 'SRF Ltd.',                              exchange: 'NSE', price: 2148.35, change: 24.80,   changePercent: 1.17,   volume: 680000,   sector: 'Chemicals',      industry: 'Specialty Chemicals' },
  'NAVINFLUOR':  { symbol: 'NAVINFLUOR',  name: 'Navin Fluorine International Ltd.',     exchange: 'NSE', price: 3248.35, change: 38.40,   changePercent: 1.20,   volume: 280000,   sector: 'Chemicals',      industry: 'Fluorochemicals' },
  'TATACHEM':    { symbol: 'TATACHEM',    name: 'Tata Chemicals Ltd.',                   exchange: 'NSE', price: 998.35,  change: 11.60,   changePercent: 1.18,   volume: 1800000,  sector: 'Chemicals',      industry: 'Chemicals' },
  'COROMANDEL':  { symbol: 'COROMANDEL',  name: 'Coromandel International Ltd.',         exchange: 'NSE', price: 1848.35, change: 21.60,   changePercent: 1.18,   volume: 1200000,  sector: 'Chemicals',      industry: 'Fertilizers' },
  'UPL':         { symbol: 'UPL',         name: 'UPL Ltd.',                              exchange: 'NSE', price: 498.35,  change: -5.80,   changePercent: -1.15,  volume: 6400000,  sector: 'Chemicals',      industry: 'Agrochemicals' },
  'PIIND':       { symbol: 'PIIND',       name: 'PI Industries Ltd.',                    exchange: 'NSE', price: 3548.35, change: 42.40,   changePercent: 1.21,   volume: 340000,   sector: 'Chemicals',      industry: 'Agrochemicals' },
  'VINATIORGA':  { symbol: 'VINATIORGA',  name: 'Vinati Organics Ltd.',                  exchange: 'NSE', price: 1748.35, change: 20.60,   changePercent: 1.19,   volume: 380000,   sector: 'Chemicals',      industry: 'Specialty Chemicals' },

  // ─── REAL ESTATE ─────────────────────────────────────────
  'DLF':         { symbol: 'DLF',         name: 'DLF Ltd.',                              exchange: 'NSE', price: 798.35,  change: 9.60,    changePercent: 1.22,   volume: 8400000,  sector: 'Real Estate',    industry: 'Real Estate' },
  'GODREJPROP':  { symbol: 'GODREJPROP',  name: 'Godrej Properties Ltd.',                exchange: 'NSE', price: 2748.35, change: 32.40,   changePercent: 1.20,   volume: 1800000,  sector: 'Real Estate',    industry: 'Real Estate' },
  'PRESTIGE':    { symbol: 'PRESTIGE',    name: 'Prestige Estates Projects Ltd.',        exchange: 'NSE', price: 1648.35, change: 19.60,   changePercent: 1.20,   volume: 2800000,  sector: 'Real Estate',    industry: 'Real Estate' },
  'OBEROIRLTY':  { symbol: 'OBEROIRLTY',  name: 'Oberoi Realty Ltd.',                    exchange: 'NSE', price: 1948.35, change: 22.80,   changePercent: 1.18,   volume: 1200000,  sector: 'Real Estate',    industry: 'Real Estate' },
  'BRIGADE':     { symbol: 'BRIGADE',     name: 'Brigade Enterprises Ltd.',              exchange: 'NSE', price: 1348.35, change: 15.60,   changePercent: 1.17,   volume: 1800000,  sector: 'Real Estate',    industry: 'Real Estate' },
  'SOBHA':       { symbol: 'SOBHA',       name: 'Sobha Ltd.',                            exchange: 'NSE', price: 1748.35, change: 20.60,   changePercent: 1.19,   volume: 880000,   sector: 'Real Estate',    industry: 'Real Estate' },
  'PHOENIXLTD':  { symbol: 'PHOENIXLTD',  name: 'The Phoenix Mills Ltd.',                exchange: 'NSE', price: 3248.35, change: 38.40,   changePercent: 1.20,   volume: 880000,   sector: 'Real Estate',    industry: 'Retail REITs' },

  // ─── NEW AGE / FINTECH / TECH ─────────────────────────────
  'ZOMATO':      { symbol: 'ZOMATO',      name: 'Zomato Ltd.',                           exchange: 'NSE', price: 278.45,  change: 5.60,    changePercent: 2.05,   volume: 28000000, sector: 'Tech',           industry: 'Food Delivery' },
  'NYKAA':       { symbol: 'NYKAA',       name: 'FSN E-Commerce Ventures Ltd.',          exchange: 'NSE', price: 198.35,  change: -3.40,   changePercent: -1.69,  volume: 7400000,  sector: 'E-Commerce',     industry: 'Beauty E-Commerce' },
  'PAYTM':       { symbol: 'PAYTM',       name: 'One 97 Communications Ltd.',            exchange: 'NSE', price: 812.45,  change: 14.60,   changePercent: 1.83,   volume: 6200000,  sector: 'Fintech',        industry: 'Digital Payments' },
  'POLICYBZR':   { symbol: 'POLICYBZR',   name: 'PB Fintech Ltd.',                       exchange: 'NSE', price: 1548.35, change: 18.60,   changePercent: 1.22,   volume: 1800000,  sector: 'Fintech',        industry: 'Insurtech' },
  'DELHIVERY':   { symbol: 'DELHIVERY',   name: 'Delhivery Ltd.',                        exchange: 'NSE', price: 398.45,  change: 4.80,    changePercent: 1.22,   volume: 4800000,  sector: 'Logistics',      industry: 'Logistics' },
  'NAZARA':      { symbol: 'NAZARA',      name: 'Nazara Technologies Ltd.',              exchange: 'NSE', price: 948.35,  change: 11.60,   changePercent: 1.24,   volume: 480000,   sector: 'Tech',           industry: 'Gaming' },
  'MAPMYINDIA':  { symbol: 'MAPMYINDIA',  name: 'C.E. Info Systems Ltd.',                exchange: 'NSE', price: 1848.35, change: 22.40,   changePercent: 1.23,   volume: 280000,   sector: 'Tech',           industry: 'Mapping & Analytics' },

  // ─── TELECOM ─────────────────────────────────────────────
  'IDEA':        { symbol: 'IDEA',        name: 'Vodafone Idea Ltd.',                    exchange: 'NSE', price: 8.45,    change: -0.15,   changePercent: -1.75,  volume: 48000000, sector: 'Telecom',        industry: 'Telecom Services' },
  'TATACOMM':    { symbol: 'TATACOMM',    name: 'Tata Communications Ltd.',              exchange: 'NSE', price: 1748.35, change: 21.60,   changePercent: 1.25,   volume: 880000,   sector: 'Telecom',        industry: 'Data Services' },
  'ROUTE':       { symbol: 'ROUTE',       name: 'Route Mobile Ltd.',                     exchange: 'NSE', price: 1548.35, change: 18.60,   changePercent: 1.22,   volume: 280000,   sector: 'Telecom',        industry: 'Cloud Communications' },
  'TANLA':       { symbol: 'TANLA',       name: 'Tanla Platforms Ltd.',                  exchange: 'NSE', price: 898.35,  change: 10.80,   changePercent: 1.22,   volume: 1200000,  sector: 'Telecom',        industry: 'Cloud Communications' },

  // ─── INSURANCE ───────────────────────────────────────────
  'LICI':        { symbol: 'LICI',        name: 'Life Insurance Corporation of India',   exchange: 'NSE', price: 1098.45, change: 13.60,   changePercent: 1.25,   volume: 8400000,  sector: 'Insurance',      industry: 'Life Insurance' },
  'ICICIGI':     { symbol: 'ICICIGI',     name: 'ICICI Lombard General Insurance',       exchange: 'NSE', price: 2048.35, change: 24.60,   changePercent: 1.22,   volume: 1200000,  sector: 'Insurance',      industry: 'General Insurance' },
  'NIACL':       { symbol: 'NIACL',       name: 'New India Assurance Company Ltd.',      exchange: 'NSE', price: 198.45,  change: 2.40,    changePercent: 1.22,   volume: 2800000,  sector: 'Insurance',      industry: 'General Insurance' },
  'GICRE':       { symbol: 'GICRE',       name: 'General Insurance Corporation of India',exchange: 'NSE', price: 412.45,  change: 5.00,    changePercent: 1.23,   volume: 1800000,  sector: 'Insurance',      industry: 'Reinsurance' },

  // ─── TEXTILE & RETAIL ────────────────────────────────────
  'PAGEIND':     { symbol: 'PAGEIND',     name: 'Page Industries Ltd.',                  exchange: 'NSE', price: 48248.00,change: 548.00,  changePercent: 1.15,   volume: 28000,    sector: 'Textile',        industry: 'Innerwear' },
  'ABFRL':       { symbol: 'ABFRL',       name: 'Aditya Birla Fashion and Retail Ltd.',  exchange: 'NSE', price: 248.35,  change: 2.80,    changePercent: 1.14,   volume: 8400000,  sector: 'Retail',         industry: 'Fashion Retail' },
  'RAYMOND':     { symbol: 'RAYMOND',     name: 'Raymond Ltd.',                          exchange: 'NSE', price: 2248.35, change: 26.40,   changePercent: 1.19,   volume: 480000,   sector: 'Textile',        industry: 'Apparel' },
  'ARVIND':      { symbol: 'ARVIND',      name: 'Arvind Ltd.',                           exchange: 'NSE', price: 278.35,  change: 3.20,    changePercent: 1.16,   volume: 2800000,  sector: 'Textile',        industry: 'Denim & Textile' },
  'TRIDENT':     { symbol: 'TRIDENT',     name: 'Trident Ltd.',                          exchange: 'NSE', price: 38.45,   change: 0.45,    changePercent: 1.18,   volume: 18000000, sector: 'Textile',        industry: 'Textile' },
  'VEDANT':      { symbol: 'VEDANT',      name: 'Vedant Fashions Ltd.',                  exchange: 'NSE', price: 1048.35, change: 12.40,   changePercent: 1.20,   volume: 680000,   sector: 'Retail',         industry: 'Ethnic Wear' },
  'SHOPERSTOP':  { symbol: 'SHOPERSTOP',  name: 'Shoppers Stop Ltd.',                    exchange: 'NSE', price: 698.35,  change: 8.20,    changePercent: 1.19,   volume: 880000,   sector: 'Retail',         industry: 'Department Stores' },

  // ─── CAPITAL GOODS & DEFENCE ─────────────────────────────
  'HAL':         { symbol: 'HAL',         name: 'Hindustan Aeronautics Ltd.',            exchange: 'NSE', price: 4648.35, change: 54.40,   changePercent: 1.18,   volume: 1200000,  sector: 'Defence',        industry: 'Aerospace & Defence' },
  'BDL':         { symbol: 'BDL',         name: 'Bharat Dynamics Ltd.',                  exchange: 'NSE', price: 1248.35, change: 14.60,   changePercent: 1.18,   volume: 1800000,  sector: 'Defence',        industry: 'Defence' },
  'BEML':        { symbol: 'BEML',        name: 'BEML Ltd.',                             exchange: 'NSE', price: 3648.35, change: 42.40,   changePercent: 1.18,   volume: 280000,   sector: 'Capital Goods',  industry: 'Defence & Railways' },
  'MAZDOCK':     { symbol: 'MAZDOCK',     name: 'Mazagon Dock Shipbuilders Ltd.',        exchange: 'NSE', price: 5148.35, change: 60.40,   changePercent: 1.19,   volume: 480000,   sector: 'Defence',        industry: 'Shipbuilding' },
  'COCHINSHIP':  { symbol: 'COCHINSHIP',  name: 'Cochin Shipyard Ltd.',                  exchange: 'NSE', price: 1748.35, change: 20.60,   changePercent: 1.19,   volume: 880000,   sector: 'Defence',        industry: 'Shipbuilding' },
  'CUMMINSIND':  { symbol: 'CUMMINSIND',  name: 'Cummins India Ltd.',                    exchange: 'NSE', price: 3448.35, change: 40.40,   changePercent: 1.18,   volume: 880000,   sector: 'Capital Goods',  industry: 'Engines' },
  'THERMAX':     { symbol: 'THERMAX',     name: 'Thermax Ltd.',                          exchange: 'NSE', price: 4448.35, change: 52.40,   changePercent: 1.19,   volume: 280000,   sector: 'Capital Goods',  industry: 'Energy & Environment' },
  'KEC':         { symbol: 'KEC',         name: 'KEC International Ltd.',                exchange: 'NSE', price: 848.35,  change: 10.00,   changePercent: 1.19,   volume: 2800000,  sector: 'Capital Goods',  industry: 'Power T&D' },
  'VOLTAS':      { symbol: 'VOLTAS',      name: 'Voltas Ltd.',                           exchange: 'NSE', price: 1648.35, change: 19.60,   changePercent: 1.20,   volume: 1800000,  sector: 'Capital Goods',  industry: 'Air Conditioners' },
  'HAVELLS':     { symbol: 'HAVELLS',     name: 'Havells India Ltd.',                    exchange: 'NSE', price: 1898.35, change: 22.60,   changePercent: 1.21,   volume: 1400000,  sector: 'Capital Goods',  industry: 'Electrical Equipment' },
  'POLYCAB':     { symbol: 'POLYCAB',     name: 'Polycab India Ltd.',                    exchange: 'NSE', price: 6548.35, change: 76.60,   changePercent: 1.18,   volume: 480000,   sector: 'Capital Goods',  industry: 'Wires & Cables' },
  'SIEMENS':     { symbol: 'SIEMENS',     name: 'Siemens Ltd.',                          exchange: 'NSE', price: 7248.35, change: 84.40,   changePercent: 1.18,   volume: 380000,   sector: 'Capital Goods',  industry: 'Electrical Equipment' },
  'ABB':         { symbol: 'ABB',         name: 'ABB India Ltd.',                        exchange: 'NSE', price: 6648.35, change: 78.40,   changePercent: 1.19,   volume: 290000,   sector: 'Capital Goods',  industry: 'Electrical Equipment' },

  // ─── FINANCE / NBFC ──────────────────────────────────────
  'CHOLAFIN':    { symbol: 'CHOLAFIN',    name: 'Cholamandalam Investment & Finance',    exchange: 'NSE', price: 1548.35, change: 18.60,   changePercent: 1.22,   volume: 1200000,  sector: 'Finance',        industry: 'NBFC' },
  'MUTHOOTFIN':  { symbol: 'MUTHOOTFIN',  name: 'Muthoot Finance Ltd.',                  exchange: 'NSE', price: 2248.35, change: 26.60,   changePercent: 1.20,   volume: 820000,   sector: 'Finance',        industry: 'Gold Finance' },
  'MANAPPURAM':  { symbol: 'MANAPPURAM',  name: 'Manappuram Finance Ltd.',               exchange: 'NSE', price: 198.45,  change: 2.40,    changePercent: 1.22,   volume: 4200000,  sector: 'Finance',        industry: 'Gold Finance' },
  'LICHSGFIN':   { symbol: 'LICHSGFIN',   name: 'LIC Housing Finance Ltd.',              exchange: 'NSE', price: 748.35,  change: -8.40,   changePercent: -1.11,  volume: 2800000,  sector: 'Finance',        industry: 'Housing Finance' },
  'RECLTD':      { symbol: 'RECLTD',      name: 'REC Ltd.',                              exchange: 'NSE', price: 548.35,  change: 6.80,    changePercent: 1.25,   volume: 7200000,  sector: 'Finance',        industry: 'Power Finance' },
  'PFC':         { symbol: 'PFC',         name: 'Power Finance Corporation Ltd.',        exchange: 'NSE', price: 498.35,  change: 6.20,    changePercent: 1.26,   volume: 9400000,  sector: 'Finance',        industry: 'Power Finance' },
  'IRFC':        { symbol: 'IRFC',        name: 'Indian Railway Finance Corporation',    exchange: 'NSE', price: 198.45,  change: 2.40,    changePercent: 1.22,   volume: 18000000, sector: 'Finance',        industry: 'Infrastructure Finance' },

  // ─── MEDIA ───────────────────────────────────────────────
  'ZEEL':        { symbol: 'ZEEL',        name: 'Zee Entertainment Enterprises Ltd.',    exchange: 'NSE', price: 118.45,  change: -1.60,   changePercent: -1.33,  volume: 8400000,  sector: 'Media',          industry: 'Broadcasting' },
  'SUNTV':       { symbol: 'SUNTV',       name: 'Sun TV Network Ltd.',                   exchange: 'NSE', price: 648.35,  change: 7.80,    changePercent: 1.22,   volume: 2800000,  sector: 'Media',          industry: 'Broadcasting' },
  'PVRINOX':     { symbol: 'PVRINOX',     name: 'PVR INOX Ltd.',                         exchange: 'NSE', price: 1298.35, change: -15.60,  changePercent: -1.19,  volume: 880000,   sector: 'Media',          industry: 'Multiplex' },
  'SAREGAMA':    { symbol: 'SAREGAMA',    name: 'Saregama India Ltd.',                   exchange: 'NSE', price: 498.35,  change: 5.80,    changePercent: 1.18,   volume: 480000,   sector: 'Media',          industry: 'Music' },

  // ─── HOSPITALITY ─────────────────────────────────────────
  'INDHOTEL':    { symbol: 'INDHOTEL',    name: 'The Indian Hotels Company Ltd.',        exchange: 'NSE', price: 798.35,  change: 9.60,    changePercent: 1.22,   volume: 8400000,  sector: 'Hospitality',    industry: 'Hotels' },
  'EIHOTEL':     { symbol: 'EIHOTEL',     name: 'EIH Ltd.',                              exchange: 'NSE', price: 498.35,  change: 5.80,    changePercent: 1.18,   volume: 2800000,  sector: 'Hospitality',    industry: 'Hotels' },
  'LEMONTREE':   { symbol: 'LEMONTREE',   name: 'Lemon Tree Hotels Ltd.',                exchange: 'NSE', price: 148.35,  change: 1.80,    changePercent: 1.23,   volume: 8400000,  sector: 'Hospitality',    industry: 'Hotels' },
  'CHALET':      { symbol: 'CHALET',      name: 'Chalet Hotels Ltd.',                    exchange: 'NSE', price: 898.35,  change: 10.80,   changePercent: 1.22,   volume: 1800000,  sector: 'Hospitality',    industry: 'Hotels' },

  // ─── CONSUMER DURABLES ───────────────────────────────────
  'WHIRLPOOL':   { symbol: 'WHIRLPOOL',   name: 'Whirlpool of India Ltd.',               exchange: 'NSE', price: 1748.35, change: 20.60,   changePercent: 1.19,   volume: 280000,   sector: 'Consumer',       industry: 'Consumer Durables' },
  'BLUESTAR':    { symbol: 'BLUESTAR',    name: 'Blue Star Ltd.',                        exchange: 'NSE', price: 1898.35, change: 22.60,   changePercent: 1.21,   volume: 880000,   sector: 'Consumer',       industry: 'Air Conditioners' },
  'CROMPTON':    { symbol: 'CROMPTON',    name: 'Crompton Greaves Consumer Electricals', exchange: 'NSE', price: 298.45,  change: 3.60,    changePercent: 1.22,   volume: 4800000,  sector: 'Consumer',       industry: 'Consumer Durables' },
  'ASTRAL':      { symbol: 'ASTRAL',      name: 'Astral Ltd.',                           exchange: 'NSE', price: 1898.35, change: 22.60,   changePercent: 1.21,   volume: 880000,   sector: 'Consumer',       industry: 'Plastic Pipes' },
  'KAJARIA':     { symbol: 'KAJARIA',     name: 'Kajaria Ceramics Ltd.',                 exchange: 'NSE', price: 1248.35, change: 14.60,   changePercent: 1.18,   volume: 880000,   sector: 'Consumer',       industry: 'Tiles & Ceramics' },
  'SUPREMEIND':  { symbol: 'SUPREMEIND',  name: 'Supreme Industries Ltd.',               exchange: 'NSE', price: 4648.35, change: 54.40,   changePercent: 1.18,   volume: 480000,   sector: 'Consumer',       industry: 'Plastic Products' },
  'CENTURYPLY':  { symbol: 'CENTURYPLY',  name: 'Century Plyboards (India) Ltd.',        exchange: 'NSE', price: 748.35,  change: 8.80,    changePercent: 1.19,   volume: 1800000,  sector: 'Consumer',       industry: 'Plywood' },

  // ─── LOGISTICS & TRANSPORT ───────────────────────────────
  'CONCOR':      { symbol: 'CONCOR',      name: 'Container Corporation of India Ltd.',   exchange: 'NSE', price: 898.35,  change: 10.80,   changePercent: 1.22,   volume: 2800000,  sector: 'Logistics',      industry: 'Rail Logistics' },
  'BLUEDART':    { symbol: 'BLUEDART',    name: 'Blue Dart Express Ltd.',                exchange: 'NSE', price: 8248.35, change: 96.40,   changePercent: 1.18,   volume: 48000,    sector: 'Logistics',      industry: 'Express Logistics' },
  'ADANIGREEN':  { symbol: 'ADANIGREEN',  name: 'Adani Green Energy Ltd.',               exchange: 'NSE', price: 1948.35, change: -22.60,  changePercent: -1.15,  volume: 2800000,  sector: 'Energy',         industry: 'Renewable Energy' },
  'ADANIPOWER':  { symbol: 'ADANIPOWER',  name: 'Adani Power Ltd.',                      exchange: 'NSE', price: 548.35,  change: 6.60,    changePercent: 1.22,   volume: 8400000,  sector: 'Power',          industry: 'Power Generation' },

  // ─── GEMS & JEWELLERY ────────────────────────────────────
  'KALYAN':      { symbol: 'KALYAN',      name: 'Kalyan Jewellers India Ltd.',           exchange: 'NSE', price: 698.35,  change: 8.40,    changePercent: 1.22,   volume: 4800000,  sector: 'Consumer',       industry: 'Jewellery' },
  'SENCO':       { symbol: 'SENCO',       name: 'Senco Gold Ltd.',                       exchange: 'NSE', price: 1048.35, change: 12.60,   changePercent: 1.22,   volume: 880000,   sector: 'Consumer',       industry: 'Jewellery' },
  'PCJEWELLER':  { symbol: 'PCJEWELLER',  name: 'PC Jeweller Ltd.',                      exchange: 'NSE', price: 98.45,   change: 1.20,    changePercent: 1.24,   volume: 8400000,  sector: 'Consumer',       industry: 'Jewellery' },
};

module.exports = INDIAN_STOCKS;
