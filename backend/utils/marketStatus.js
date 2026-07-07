// ============================================================
// MARKET STATUS — Trading hours, weekends, and NSE/BSE holidays
// ============================================================
//
// IMPORTANT: The exact dates of festival-based holidays (Holi, Diwali,
// Eid, etc.) are set annually by NSE/BSE circular and follow the lunar
// calendar, so they shift every year. The lists below are sourced from
// public NSE/BSE holiday calendars current as of mid-2026 and should be
// re-verified each year against the official circular at:
//   https://www.nseindia.com/resources/exchange-communication-holidays
//
// Fixed-date holidays (Republic Day, Independence Day, Gandhi Jayanti,
// Christmas) are reliable year over year. Lunar/festival dates are not.

// Trading window — requested as 9:00 AM to 4:00 PM IST.
// (Note: NSE/BSE's actual published equity session is 9:15 AM–3:30 PM IST;
// this app uses the wider 9:00–4:00 window per the product requirement.)
const MARKET_OPEN_HOUR = 9;
const MARKET_OPEN_MINUTE = 0;
const MARKET_CLOSE_HOUR = 16;
const MARKET_CLOSE_MINUTE = 0;

const IST_OFFSET_MINUTES = 5 * 60 + 30; // UTC+5:30, fixed (India has no DST)

// Holiday name, date 'YYYY-MM-DD' in IST
const HOLIDAYS = [
  // ---- 2025 ----
  { date: '2025-01-26', name: 'Republic Day' },
  { date: '2025-02-26', name: 'Mahashivratri' },
  { date: '2025-03-14', name: 'Holi' },
  { date: '2025-03-31', name: 'Eid-ul-Fitr (Ramzan Id)' },
  { date: '2025-04-10', name: 'Shri Mahavir Jayanti' },
  { date: '2025-04-14', name: 'Dr. Baba Saheb Ambedkar Jayanti' },
  { date: '2025-04-18', name: 'Good Friday' },
  { date: '2025-05-01', name: 'Maharashtra Day' },
  { date: '2025-08-15', name: 'Independence Day' },
  { date: '2025-08-27', name: 'Ganesh Chaturthi' },
  { date: '2025-10-02', name: 'Gandhi Jayanti / Dussehra' },
  { date: '2025-10-21', name: 'Diwali Laxmi Pujan' },
  { date: '2025-10-22', name: 'Diwali Balipratipada' },
  { date: '2025-11-05', name: 'Gurunanak Jayanti' },
  { date: '2025-12-25', name: 'Christmas' },

  // ---- 2026 ----
  { date: '2026-01-26', name: 'Republic Day' },
  { date: '2026-02-15', name: 'Mahashivratri' },
  { date: '2026-03-04', name: 'Holi' },
  { date: '2026-03-21', name: 'Eid-ul-Fitr (Ramzan Id)' },
  { date: '2026-04-03', name: 'Good Friday' },
  { date: '2026-04-14', name: 'Dr. Baba Saheb Ambedkar Jayanti' },
  { date: '2026-05-01', name: 'Maharashtra Day' },
  { date: '2026-05-28', name: 'Bakri Id (Eid-ul-Adha)' },
  { date: '2026-06-26', name: 'Muharram' },
  { date: '2026-08-15', name: 'Independence Day' },
  { date: '2026-09-14', name: 'Ganesh Chaturthi' },
  { date: '2026-10-02', name: 'Gandhi Jayanti' },
  { date: '2026-10-20', name: 'Dussehra' },
  { date: '2026-11-09', name: 'Diwali Balipratipada' },
  // Note: Nov 8, 2026 (Diwali Laxmi Pujan) falls on a Sunday — markets are
  // normally closed anyway, with a special 1-hour Muhurat trading session
  // confirmed by NSE. We don't add it here since it's already a Sunday.
  { date: '2026-11-24', name: 'Gurunanak Jayanti' },
  { date: '2026-12-25', name: 'Christmas' },

  // ---- 2027 (placeholder fixed-date holidays; festival dates TBD/lunar) ----
  { date: '2027-01-26', name: 'Republic Day' },
  { date: '2027-08-15', name: 'Independence Day' },
  { date: '2027-10-02', name: 'Gandhi Jayanti' },
  { date: '2027-12-25', name: 'Christmas' },
];

const HOLIDAY_MAP = new Map(HOLIDAYS.map(h => [h.date, h.name]));

/** Convert any Date to its IST wall-clock representation. */
function toIST(date) {
  const utcMs = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utcMs + IST_OFFSET_MINUTES * 60000);
}

function istDateString(istDate) {
  const y = istDate.getFullYear();
  const m = String(istDate.getMonth() + 1).padStart(2, '0');
  const d = String(istDate.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Returns the current market status, evaluated in IST regardless of
 * server timezone.
 */
function getMarketStatus(now = new Date()) {
  const ist = toIST(now);
  const dateStr = istDateString(ist);
  const day = ist.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = ist.getHours();
  const minute = ist.getMinutes();
  const minutesNow = hour * 60 + minute;
  const openMinutes = MARKET_OPEN_HOUR * 60 + MARKET_OPEN_MINUTE;
  const closeMinutes = MARKET_CLOSE_HOUR * 60 + MARKET_CLOSE_MINUTE;

  const isWeekend = day === 0 || day === 6;
  const holidayName = HOLIDAY_MAP.get(dateStr) || null;
  const isHoliday = Boolean(holidayName);
  const withinHours = minutesNow >= openMinutes && minutesNow < closeMinutes;

  let isOpen = false;
  let reason = null;

  if (isHoliday) {
    reason = 'holiday';
  } else if (isWeekend) {
    reason = day === 0 ? 'sunday' : 'saturday';
  } else if (!withinHours) {
    reason = minutesNow < openMinutes ? 'before_open' : 'after_close';
  } else {
    isOpen = true;
  }

  return {
    isOpen,
    reason,                 // null | 'holiday' | 'saturday' | 'sunday' | 'before_open' | 'after_close'
    holidayName,            // populated when reason === 'holiday'
    istDate: dateStr,
    istTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    openTime: '09:00',
    closeTime: '16:00',
  };
}

/** Returns the next upcoming holiday on/after the given date (for display, e.g. "Markets next closed on..."). */
function getNextHoliday(now = new Date()) {
  const ist = toIST(now);
  const todayStr = istDateString(ist);
  const upcoming = HOLIDAYS
    .filter(h => h.date >= todayStr)
    .sort((a, b) => (a.date < b.date ? -1 : 1));
  return upcoming[0] || null;
}

module.exports = { getMarketStatus, getNextHoliday, HOLIDAYS, MARKET_OPEN_HOUR, MARKET_CLOSE_HOUR };
