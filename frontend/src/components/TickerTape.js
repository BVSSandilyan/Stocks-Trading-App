import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const DEFAULT_TICKERS = [
  { symbol: 'RELIANCE', price: 2945.50, change: 1.10, exchange: 'NSE' },
  { symbol: 'TCS',      price: 3812.75, change: -0.48, exchange: 'NSE' },
  { symbol: 'HDFCBANK', price: 1678.30, change: 0.75,  exchange: 'NSE' },
  { symbol: 'INFY',     price: 1824.60, change: 1.38,  exchange: 'NSE' },
  { symbol: 'SBIN',     price: 812.45,  change: 1.21,  exchange: 'NSE' },
  { symbol: 'TATAMOTORS',price:978.60,  change: -1.25, exchange: 'NSE' },
  { symbol: 'BAJFINANCE',price:7124.50, change: 1.25,  exchange: 'NSE' },
  { symbol: 'ZOMATO',   price: 248.70,  change: 2.60,  exchange: 'NSE' },
  { symbol: 'MARUTI',   price: 12845.00,change: 1.30,  exchange: 'NSE' },
  { symbol: 'NTPC',     price: 378.20,  change: 1.56,  exchange: 'NSE' },
  { symbol: 'ITC',      price: 468.90,  change: 0.73,  exchange: 'NSE' },
  { symbol: 'PAYTM',    price: 682.30,  change: 2.17,  exchange: 'NSE' },
];

const formatINR = (v) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(v);

export default function TickerTape() {
  const { API } = useAuth();
  const [tickers, setTickers] = useState(DEFAULT_TICKERS);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        // fetch first 20 stocks from /all endpoint
        const res = await API.get('/stocks/all?limit=20&offset=0');
        const data = res.data.stocks || res.data;
        if (data && data.length) {
          setTickers(data.map(s => ({
            symbol: s.symbol, price: s.price,
            change: s.changePercent, exchange: s.exchange,
          })));
        }
      } catch (err) {
        console.error('Ticker fetch error:', err);
      }
    };
    fetchTickers();
    const iv = setInterval(fetchTickers, 15000);
    return () => clearInterval(iv);
  }, [API]);

  const doubled = [...tickers, ...tickers];

  return (
    <div className="ticker-wrapper">
      <div className="ticker-inner">
        {doubled.map((t, i) => (
          <span key={i} className="ticker-item">
            <span style={{
              fontSize: '9px', fontWeight: '700', letterSpacing: '0.5px',
              color: t.exchange === 'BSE' ? 'var(--amber)' : 'var(--cyan)',
              marginRight: '3px',
            }}>{t.exchange || 'NSE'}</span>
            <span className="sym">{t.symbol}</span>
            <span className="price">{formatINR(t.price)}</span>
            <span className={t.change >= 0 ? 'positive' : 'negative'} style={{ fontSize: '11px' }}>
              {t.change >= 0 ? '▲' : '▼'} {Math.abs(t.change || 0).toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
