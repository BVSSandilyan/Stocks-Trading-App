const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({
  symbol: { type: String, required: true, uppercase: true },
  companyName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  avgBuyPrice: { type: Number, required: true, min: 0 },
  totalInvested: { type: Number, required: true }
});

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  holdings: [holdingSchema],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

portfolioSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
