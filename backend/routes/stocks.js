const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const INDIAN_STOCKS = require('../data/indianStocks');

// Realistic price fluctuation
const addFluctuation = (stock) => {
  const volatility = stock.price > 5000 ? 0.004 : stock.price > 1000 ? 0.007 : 0.012;
  const fluctuation = (Math.random() - 0.5) * stock.price * volatility;
  const basePrice = stock.price - stock.change;
  const newPrice = parseFloat(Math.max(1, stock.price + fluctuation).toFixed(2));
  const newChange = parseFloat((newPrice - basePrice).toFixed(2));
  const newChangePct = parseFloat(((newChange / Math.abs(basePrice || 1)) * 100).toFixed(2));
  return { ...stock, price: newPrice, change: newChange, changePercent: newChangePct };
};

const ALL_STOCKS = Object.values(INDIAN_STOCKS);

// ─── GET /api/stocks/all ──────────────────────────────────────────────────────
// Returns every single stock — used by Markets page
// Supports: ?sector=Banking  ?exchange=NSE  ?q=reliance
router.get('/all', auth, (req, res) => {
  try {
    let stocks = ALL_STOCKS;

    // sector filter
    if (req.query.sector && req.query.sector !== 'All') {
      stocks = stocks.filter(s => s.sector && s.sector.toLowerCase() === req.query.sector.toLowerCase());
    }
    // exchange filter
    if (req.query.exchange && req.query.exchange !== 'All') {
      stocks = stocks.filter(s => s.exchange && s.exchange.toUpperCase() === req.query.exchange.toUpperCase());
    }
    // search query
    if (req.query.q && req.query.q.trim()) {
      const q = req.query.q.trim().toLowerCase();
      stocks = stocks.filter(s =>
        s.symbol.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        (s.sector  && s.sector.toLowerCase().includes(q)) ||
        (s.industry && s.industry.toLowerCase().includes(q))
      );
    }

    const total = stocks.length;

    // Optional pagination via ?offset=0&limit=50
    // If limit is not given (or limit=0), return ALL matching stocks
    const limit  = parseInt(req.query.limit)  || 0;
    const offset = parseInt(req.query.offset) || 0;

    const paginated = limit > 0 ? stocks.slice(offset, offset + limit) : stocks;

    res.json({
      stocks: paginated.map(addFluctuation),
      total,
      offset,
      limit: limit || total,
    });
  } catch (err) {
    console.error('Error in /all:', err);
    res.status(500).json({ message: 'Error fetching stocks' });
  }
});

// ─── GET /api/stocks/popular ─────────────────────────────────────────────────
// Kept for backward-compat (ticker tape, dashboard) — returns first 30 stocks
router.get('/popular', auth, (req, res) => {
  try {
    const stocks = ALL_STOCKS.slice(0, 30).map(addFluctuation);
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching popular stocks' });
  }
});

// ─── GET /api/stocks/sectors ─────────────────────────────────────────────────
router.get('/sectors', auth, (req, res) => {
  try {
    const sectors = [...new Set(ALL_STOCKS.map(s => s.sector).filter(Boolean))].sort();
    res.json(sectors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sectors' });
  }
});

// ─── GET /api/stocks/search ──────────────────────────────────────────────────
router.get('/search', auth, (req, res) => {
  try {
    const q = (req.query.q || '').toLowerCase().trim();
    if (!q) {
      return res.json(ALL_STOCKS.slice(0, 50).map(addFluctuation));
    }
    const results = ALL_STOCKS.filter(s =>
      s.symbol.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      (s.sector   && s.sector.toLowerCase().includes(q)) ||
      (s.industry && s.industry.toLowerCase().includes(q)) ||
      s.exchange.toLowerCase().includes(q)
    ).map(addFluctuation);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error searching stocks' });
  }
});

// ─── GET /api/stocks/quote/:symbol ───────────────────────────────────────────
router.get('/quote/:symbol', auth, (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const stock = INDIAN_STOCKS[symbol];
    if (!stock) {
      return res.status(404).json({ message: `"${symbol}" not found. Try RELIANCE, TCS, INFY, HDFCBANK, SBIN...` });
    }
    res.json(addFluctuation(stock));
  } catch (err) {
    res.status(500).json({ message: 'Error fetching quote' });
  }
});

// ─── GET /api/stocks/history/:symbol ─────────────────────────────────────────
router.get('/history/:symbol', auth, (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const base = INDIAN_STOCKS[symbol];
    if (!base) return res.status(404).json({ message: 'Stock not found' });

    const history = [];
    let price = parseFloat((base.price * 0.88).toFixed(2));

    for (let i = 30; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      if (d.getDay() === 0 || d.getDay() === 6) continue;
      price = parseFloat(Math.max(1, price * (1 + (Math.random() - 0.47) * 0.025)).toFixed(2));
      history.push({
        date:   d.toISOString().split('T')[0],
        open:   price,
        high:   parseFloat((price * (1 + Math.random() * 0.018)).toFixed(2)),
        low:    parseFloat((price * (1 - Math.random() * 0.018)).toFixed(2)),
        close:  parseFloat((price * (1 + (Math.random() - 0.5) * 0.008)).toFixed(2)),
        volume: Math.floor(Math.random() * base.volume * 1.4) + Math.floor(base.volume * 0.3),
      });
    }
    res.json({ symbol, name: base.name, exchange: base.exchange, history });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching history' });
  }
});

module.exports = router;
