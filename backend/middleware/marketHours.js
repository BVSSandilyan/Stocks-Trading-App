// Market Hours Middleware — NSE/BSE: Mon–Fri, 09:00–16:00 IST

function isMarketOpen() {
  const now   = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const istMs = utcMs + 5.5 * 3600 * 1000;
  const ist   = new Date(istMs);

  const day     = ist.getDay();   // 0=Sun, 6=Sat
  const minutes = ist.getHours() * 60 + ist.getMinutes();

  if (day === 0 || day === 6) return false;        // weekend
  if (minutes < 9 * 60)       return false;        // before 09:00
  if (minutes >= 16 * 60)     return false;        // after  16:00
  return true;
}

// Apply to buy/sell routes — blocks trading outside hours
function requireMarketOpen(req, res, next) {
  if (!isMarketOpen()) {
    const now   = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    const ist   = new Date(utcMs + 5.5 * 3600 * 1000);
    const day   = ist.getDay();
    const isWeekend = day === 0 || day === 6;
    return res.status(403).json({
      message: isWeekend
        ? 'Market is closed on weekends. Trading resumes Monday at 9:00 AM IST.'
        : 'Market is closed. Trading hours are 9:00 AM – 4:00 PM IST, Monday to Friday.',
      marketClosed: true,
    });
  }
  next();
}

module.exports = { requireMarketOpen, isMarketOpen };
