// ─── Market Hours Utility ────────────────────────────────────────────────────
// NSE / BSE trading hours: Monday–Friday, 09:00–16:00 IST
// Saturday & Sunday: market closed

export const MARKET_OPEN_HOUR  = 9;   // 09:00 IST
export const MARKET_CLOSE_HOUR = 16;  // 16:00 IST

/**
 * Returns an object describing current market status.
 * All times are computed in IST (UTC+5:30).
 */
export function getMarketStatus() {
  // Current time in IST
  const now    = new Date();
  const utcMs  = now.getTime() + now.getTimezoneOffset() * 60000;
  const istMs  = utcMs + 5.5 * 3600000;          // IST = UTC + 5:30
  const ist    = new Date(istMs);

  const day    = ist.getDay();   // 0=Sun, 1=Mon … 6=Sat
  const hour   = ist.getHours();
  const minute = ist.getMinutes();
  const second = ist.getSeconds();

  const isWeekend   = day === 0 || day === 6;
  const timeInMins  = hour * 60 + minute;
  const openMins    = MARKET_OPEN_HOUR  * 60;   // 540
  const closeMins   = MARKET_CLOSE_HOUR * 60;   // 960

  const isOpen = !isWeekend && timeInMins >= openMins && timeInMins < closeMins;

  // ── Next open time ────────────────────────────────────────────────────────
  const nextOpen = new Date(istMs);
  if (isWeekend) {
    // Find next Monday 09:00 IST
    const daysUntilMon = day === 0 ? 1 : 2; // Sun→+1, Sat→+2
    nextOpen.setDate(ist.getDate() + daysUntilMon);
    nextOpen.setHours(MARKET_OPEN_HOUR, 0, 0, 0);
  } else if (timeInMins < openMins) {
    // Same day, before open
    nextOpen.setHours(MARKET_OPEN_HOUR, 0, 0, 0);
  } else if (timeInMins >= closeMins) {
    // After close → next weekday
    let d = new Date(istMs);
    d.setDate(ist.getDate() + (day === 5 ? 3 : day === 6 ? 2 : 1)); // Fri→Mon, Sat→Mon, else+1
    d.setHours(MARKET_OPEN_HOUR, 0, 0, 0);
    return {
      isOpen,
      isWeekend,
      ist,
      day,
      hour,
      minute,
      second,
      timeInMins,
      nextOpen: d,
      closesAt: null,
      opensInMs: d.getTime() - istMs,
    };
  }

  // When open: time remaining until close
  const closeToday = new Date(istMs);
  closeToday.setHours(MARKET_CLOSE_HOUR, 0, 0, 0);

  return {
    isOpen,
    isWeekend,
    ist,
    day,
    hour,
    minute,
    second,
    timeInMins,
    nextOpen: isOpen ? null : nextOpen,
    closesAt: isOpen ? closeToday : null,
    opensInMs: isOpen ? null : (nextOpen.getTime() - istMs),
  };
}

/** Format a countdown from milliseconds into HH:MM:SS */
export function formatCountdown(ms) {
  if (!ms || ms <= 0) return '00:00:00';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return [h, m, s].map(n => String(n).padStart(2, '0')).join(':');
}

/** Day name helper */
export const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
