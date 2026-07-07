const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');

// GET /api/transactions - get user's transaction history
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

// GET /api/transactions/stats - portfolio performance stats
router.get('/stats', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    
    const totalBought = transactions
      .filter(t => t.type === 'BUY')
      .reduce((sum, t) => sum + t.totalAmount, 0);
    
    const totalSold = transactions
      .filter(t => t.type === 'SELL')
      .reduce((sum, t) => sum + t.totalAmount, 0);
    
    const totalTrades = transactions.length;
    const buyTrades = transactions.filter(t => t.type === 'BUY').length;
    const sellTrades = transactions.filter(t => t.type === 'SELL').length;

    res.json({ totalBought, totalSold, totalTrades, buyTrades, sellTrades });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

module.exports = router;
