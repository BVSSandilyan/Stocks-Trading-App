const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const { requireMarketOpen } = require('../middleware/marketHours');
const Portfolio   = require('../models/Portfolio');
const User        = require('../models/User');
const Transaction = require('../models/Transaction');

// GET /api/portfolio
router.get('/', auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ user: req.user._id });
    if (!portfolio) {
      portfolio = new Portfolio({ user: req.user._id, holdings: [] });
      await portfolio.save();
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching portfolio' });
  }
});

// POST /api/portfolio/buy  — requires market to be open
router.post('/buy', auth, requireMarketOpen, async (req, res) => {
  try {
    const { symbol, companyName, quantity, pricePerShare } = req.body;
    if (!symbol || !quantity || !pricePerShare || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid trade data' });
    }

    const totalCost = quantity * pricePerShare;
    const user = await User.findById(req.user._id);

    if (user.virtualBalance < totalCost) {
      return res.status(400).json({
        message: `Insufficient balance. Need ₹${totalCost.toFixed(2)}, have ₹${user.virtualBalance.toFixed(2)}`,
      });
    }

    user.virtualBalance -= totalCost;
    await user.save();

    let portfolio = await Portfolio.findOne({ user: req.user._id });
    if (!portfolio) portfolio = new Portfolio({ user: req.user._id, holdings: [] });

    const idx = portfolio.holdings.findIndex(h => h.symbol === symbol.toUpperCase());
    if (idx >= 0) {
      const ex = portfolio.holdings[idx];
      const newQty   = ex.quantity + quantity;
      const newTotal = ex.totalInvested + totalCost;
      portfolio.holdings[idx].quantity      = newQty;
      portfolio.holdings[idx].avgBuyPrice   = newTotal / newQty;
      portfolio.holdings[idx].totalInvested = newTotal;
    } else {
      portfolio.holdings.push({
        symbol: symbol.toUpperCase(), companyName,
        quantity, avgBuyPrice: pricePerShare, totalInvested: totalCost,
      });
    }
    await portfolio.save();

    const tx = new Transaction({
      user: req.user._id, type: 'BUY',
      symbol: symbol.toUpperCase(), companyName,
      quantity, pricePerShare, totalAmount: totalCost,
      balanceAfter: user.virtualBalance,
    });
    await tx.save();

    res.json({ message: `Successfully bought ${quantity} share(s) of ${symbol.toUpperCase()}`, newBalance: user.virtualBalance, transaction: tx });
  } catch (err) {
    console.error('Buy error:', err);
    res.status(500).json({ message: 'Error processing buy order' });
  }
});

// POST /api/portfolio/sell  — requires market to be open
router.post('/sell', auth, requireMarketOpen, async (req, res) => {
  try {
    const { symbol, quantity, pricePerShare } = req.body;
    if (!symbol || !quantity || !pricePerShare || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid trade data' });
    }

    const portfolio = await Portfolio.findOne({ user: req.user._id });
    if (!portfolio) return res.status(400).json({ message: 'Portfolio not found' });

    const idx = portfolio.holdings.findIndex(h => h.symbol === symbol.toUpperCase());
    if (idx < 0) return res.status(400).json({ message: 'You do not own this stock' });

    const holding = portfolio.holdings[idx];
    if (holding.quantity < quantity) {
      return res.status(400).json({ message: `You only have ${holding.quantity} share(s) of ${symbol.toUpperCase()}` });
    }

    const totalRevenue = quantity * pricePerShare;
    const user = await User.findById(req.user._id);
    user.virtualBalance += totalRevenue;
    await user.save();

    if (holding.quantity === quantity) {
      portfolio.holdings.splice(idx, 1);
    } else {
      const soldRatio = quantity / holding.quantity;
      portfolio.holdings[idx].quantity      -= quantity;
      portfolio.holdings[idx].totalInvested -= holding.totalInvested * soldRatio;
    }
    await portfolio.save();

    const tx = new Transaction({
      user: req.user._id, type: 'SELL',
      symbol: symbol.toUpperCase(), companyName: holding.companyName,
      quantity, pricePerShare, totalAmount: totalRevenue,
      balanceAfter: user.virtualBalance,
    });
    await tx.save();

    res.json({ message: `Successfully sold ${quantity} share(s) of ${symbol.toUpperCase()}`, newBalance: user.virtualBalance, transaction: tx });
  } catch (err) {
    console.error('Sell error:', err);
    res.status(500).json({ message: 'Error processing sell order' });
  }
});

module.exports = router;
