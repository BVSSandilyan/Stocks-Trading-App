import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { formatLargeNumber } from '../utils/format';
import { getMarketStatus, formatCountdown, DAY_NAMES } from '../utils/marketHours';

const formatINR = (v) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(v);

export default function Trade() {
  const { user, updateBalance, API } = useAuth();
  const [searchParams] = useSearchParams();
  const defaultSymbol = searchParams.get('symbol') || '';
  const defaultAction = searchParams.get('action') || 'buy';

  const [symbol, setSymbol]           = useState(defaultSymbol.toUpperCase());
  const [inputSymbol, setInputSymbol] = useState(defaultSymbol.toUpperCase());
  const [quote, setQuote]             = useState(null);
  const [history, setHistory]         = useState([]);
  const [quantity, setQuantity]       = useState('');
  const [action, setAction]           = useState(defaultAction);
  const [holding, setHolding]         = useState(null);
  const [loading, setLoading]         = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [tradeStatus, setTradeStatus] = useState(null);
  const [marketStatus, setMarketStatus] = useState(getMarketStatus());

  // Update market status every second
  useEffect(() => {
    const iv = setInterval(() => setMarketStatus(getMarketStatus()), 1000);
    return () => clearInterval(iv);
  }, []);

  const { isOpen, isWeekend, opensInMs, day } = marketStatus;

  const fetchQuote = useCallback(async (sym) => {
    if (!sym) return;
    setQuoteLoading(true);
    try {
      const [quoteRes, histRes, portRes] = await Promise.all([
        API.get(`/stocks/quote/${sym}`),
        API.get(`/stocks/history/${sym}`),
        API.get('/portfolio'),
      ]);
      setQuote(quoteRes.data);
      setHistory(histRes.data.history || []);
      const h = portRes.data.holdings
        ? portRes.data.holdings.find(item => item.symbol === sym.toUpperCase())
        : null;
      setHolding(h || null);
    } catch (err) {
      setQuote(null);
      setTradeStatus({ type: 'error', msg: 'Stock not found. Try RELIANCE, TCS, INFY, HDFCBANK, SBIN...' });
    } finally {
      setQuoteLoading(false);
    }
  }, [API]);

  useEffect(() => {
    if (defaultSymbol) fetchQuote(defaultSymbol.toUpperCase());
  }, [defaultSymbol, fetchQuote]);

  // Auto-refresh quote every 15s
  useEffect(() => {
    if (!symbol) return;
    const iv = setInterval(() => fetchQuote(symbol), 15000);
    return () => clearInterval(iv);
  }, [symbol, fetchQuote]);

  const handleSearch = (e) => {
    e.preventDefault();
    const sym = inputSymbol.trim().toUpperCase();
    if (!sym) return;
    setSymbol(sym);
    setTradeStatus(null);
    setQuantity('');
    fetchQuote(sym);
  };

  const totalCost = quote ? (parseFloat(quantity) || 0) * quote.price : 0;

  const executeTrade = async () => {
    if (!isOpen) return; // extra safety guard
    if (!quote || !quantity || parseFloat(quantity) <= 0) {
      setTradeStatus({ type: 'error', msg: 'Enter a valid quantity' });
      return;
    }
    setLoading(true);
    setTradeStatus(null);
    try {
      const endpoint = action === 'buy' ? '/portfolio/buy' : '/portfolio/sell';
      const res = await API.post(endpoint, {
        symbol: quote.symbol,
        companyName: quote.name,
        quantity: parseInt(quantity, 10),
        pricePerShare: quote.price,
      });
      updateBalance(res.data.newBalance);
      setTradeStatus({ type: 'success', msg: res.data.message });
      setQuantity('');
      const portRes = await API.get('/portfolio');
      const h = portRes.data.holdings
        ? portRes.data.holdings.find(item => item.symbol === symbol)
        : null;
      setHolding(h || null);
    } catch (err) {
      const msg = err.response?.data?.message || 'Trade failed. Please try again.';
      setTradeStatus({ type: 'error', msg });
    } finally {
      setLoading(false);
    }
  };

  const chartData = history.map(d => ({
    date: d.date.slice(5),
    close: d.close,
    volume: Math.round(d.volume / 1e5),
  }));

  // ── Market closed banner shown inside the order panel ──────────────────────
  const MarketClosedBanner = () => (
    <div style={{
      padding: '16px', borderRadius: 'var(--radius)', marginBottom: '16px',
      background: 'rgba(255,59,92,0.08)',
      border: '1px solid rgba(255,59,92,0.25)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--red)', flexShrink: 0 }} />
        <span style={{ fontWeight: '700', color: 'var(--red)', fontSize: '13px', letterSpacing: '0.5px' }}>
          {isWeekend ? `MARKET CLOSED — ${DAY_NAMES[day]}` : 'MARKET CLOSED'}
        </span>
      </div>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: 1.6 }}>
        {isWeekend
          ? 'Trading is not available on Saturday & Sunday. Markets reopen on Monday at 9:00 AM IST.'
          : 'Trading hours are 9:00 AM – 4:00 PM IST, Monday to Friday.'}
      </p>
      {opensInMs > 0 && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Opens in
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: '700', color: 'var(--green)', letterSpacing: '3px' }}>
            {formatCountdown(opensInMs)}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="fade-in">
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '4px' }}>Trade</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Search NSE / BSE stocks, view live charts
            {isOpen
              ? <span style={{ color: 'var(--green)', fontWeight: '600' }}> · Market Open — Trading Active</span>
              : <span style={{ color: 'var(--red)', fontWeight: '600' }}> · Market Closed — View Only</span>}
          </p>
        </div>

        {/* Symbol Search */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '12px', maxWidth: '480px' }}>
          <input
            className="input-field"
            placeholder="Enter symbol — RELIANCE, TCS, INFY, SBIN..."
            value={inputSymbol}
            onChange={e => setInputSymbol(e.target.value.toUpperCase())}
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>Lookup</button>
        </form>

        {/* Quick symbol chips */}
        <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {['RELIANCE','TCS','INFY','HDFCBANK','SBIN','ZOMATO','TATAMOTORS','MARUTI','BAJFINANCE','NTPC'].map(sym => (
            <button key={sym} onClick={() => {
              setInputSymbol(sym); setSymbol(sym);
              setTradeStatus(null); setQuantity('');
              fetchQuote(sym);
            }} style={{
              padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
              background: symbol === sym ? 'var(--cyan-dim)' : 'var(--bg-elevated)',
              color: symbol === sym ? 'var(--cyan)' : 'var(--text-muted)',
              border: `1px solid ${symbol === sym ? 'rgba(0,212,255,0.3)' : 'var(--border)'}`,
              cursor: 'pointer', transition: 'var(--transition)', fontFamily: 'var(--font-mono)',
            }}>{sym}</button>
          ))}
        </div>

        {quoteLoading && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-muted)', marginBottom: '20px' }}>
            <span className="spinner" /> Fetching {symbol}...
          </div>
        )}

        {quote && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>

            {/* ── Left: Quote + Charts ── */}
            <div>
              {/* Quote header */}
              <div className="card" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', fontSize: '22px', color: 'var(--cyan)' }}>
                        {quote.symbol}
                      </span>
                      <span style={{
                        padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700',
                        background: quote.exchange === 'NSE' ? 'rgba(0,212,255,0.12)' : 'rgba(255,184,0,0.12)',
                        color: quote.exchange === 'NSE' ? 'var(--cyan)' : 'var(--amber)',
                        border: `1px solid ${quote.exchange === 'NSE' ? 'rgba(0,212,255,0.25)' : 'rgba(255,184,0,0.25)'}`,
                      }}>{quote.exchange}</span>
                      <span className={quote.changePercent >= 0 ? 'badge-up' : 'badge-down'}>
                        {quote.changePercent >= 0 ? '+' : ''}{(quote.changePercent || 0).toFixed(2)}%
                      </span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{quote.name}</div>
                    {quote.sector && (
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {quote.sector} · {quote.industry}
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '32px', fontWeight: '700' }}>
                      {formatINR(quote.price)}
                    </div>
                    <div style={{ fontSize: '14px', color: quote.change >= 0 ? 'var(--green)' : 'var(--red)', fontFamily: 'var(--font-mono)' }}>
                      {quote.change >= 0 ? '+' : ''}₹{(quote.change || 0).toFixed(2)} today
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '24px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Volume</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: '600', marginTop: '4px' }}>{formatLargeNumber(quote.volume)}</div>
                  </div>
                  {holding && (
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Shares</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--cyan)', marginTop: '4px' }}>{holding.quantity}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* 30-day Price Chart */}
              {chartData.length > 0 && (
                <div className="card" style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                    30-Day Price History (₹)
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={quote.changePercent >= 0 ? '#00FF88' : '#FF3B5C'} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={quote.changePercent >= 0 ? '#00FF88' : '#FF3B5C'} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" tick={{ fill: '#4A5A7A', fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
                      <YAxis tick={{ fill: '#4A5A7A', fontSize: 10 }} axisLine={false} tickLine={false}
                        tickFormatter={v => `₹${v}`} domain={['auto', 'auto']} />
                      <Tooltip
                        contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }}
                        formatter={v => [formatINR(v), 'Close']}
                      />
                      <Area type="monotone" dataKey="close"
                        stroke={quote.changePercent >= 0 ? '#00FF88' : '#FF3B5C'}
                        strokeWidth={2} fill="url(#priceGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Volume Chart */}
              {chartData.length > 0 && (
                <div className="card">
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                    Volume (Lakhs)
                  </div>
                  <ResponsiveContainer width="100%" height={100}>
                    <BarChart data={chartData}>
                      <XAxis dataKey="date" tick={{ fill: '#4A5A7A', fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }}
                        formatter={v => [`${v}L`, 'Volume']}
                      />
                      <Bar dataKey="volume" fill="#00D4FF" opacity={0.5} radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* ── Right: Order Panel ── */}
            <div>
              <div className="card" style={{ position: 'sticky', top: '20px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                  Place Order
                </div>

                {/* Market closed banner — shown when outside hours */}
                {!isOpen && <MarketClosedBanner />}

                {/* Buy / Sell toggle */}
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr',
                  background: 'var(--bg-elevated)', borderRadius: 'var(--radius)',
                  padding: '4px', gap: '4px', marginBottom: '16px',
                  border: '1px solid var(--border)',
                  opacity: isOpen ? 1 : 0.5,
                  pointerEvents: isOpen ? 'auto' : 'none',
                }}>
                  {['buy', 'sell'].map(a => (
                    <button key={a} onClick={() => setAction(a)}
                      className={action === a ? (a === 'buy' ? 'btn btn-buy' : 'btn btn-sell') : ''}
                      style={{
                        padding: '10px', borderRadius: '7px', fontSize: '14px', fontWeight: '700',
                        background: action !== a ? 'transparent' : undefined,
                        color: action !== a ? 'var(--text-muted)' : undefined,
                        cursor: isOpen ? 'pointer' : 'not-allowed',
                        border: 'none', textTransform: 'uppercase', letterSpacing: '1px',
                      }}>
                      {a}
                    </button>
                  ))}
                </div>

                {/* Available cash/shares */}
                <div style={{
                  padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius)',
                  marginBottom: '14px', border: '1px solid var(--border)',
                  opacity: isOpen ? 1 : 0.6,
                }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {action === 'buy' ? 'Available Cash (₹)' : 'Shares Owned'}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', fontSize: '17px', color: 'var(--cyan)', marginTop: '4px' }}>
                    {action === 'buy'
                      ? formatINR(user ? user.virtualBalance : 0)
                      : `${holding ? holding.quantity : 0} shares`}
                  </div>
                </div>

                {/* Price */}
                <div style={{ marginBottom: '14px', opacity: isOpen ? 1 : 0.6 }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>Market Price (₹)</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: '700' }}>
                    {formatINR(quote.price)}
                  </div>
                </div>

                {/* Quantity input — disabled when market is closed */}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Number of Shares
                    {!isOpen && <span style={{ color: 'var(--red)', marginLeft: '6px', fontSize: '11px' }}>(Market Closed)</span>}
                  </div>
                  <input
                    type="number" min="1" step="1"
                    className="input-field"
                    placeholder={isOpen ? '0' : 'Market closed'}
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    disabled={!isOpen}
                    style={{
                      opacity: isOpen ? 1 : 0.5,
                      cursor: isOpen ? 'text' : 'not-allowed',
                      background: isOpen ? undefined : 'var(--bg-elevated)',
                    }}
                  />
                </div>

                {/* Cost estimate */}
                {isOpen && quantity > 0 && (
                  <div style={{
                    padding: '12px', background: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius)', marginBottom: '14px',
                    border: '1px solid var(--border)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        Estimated {action === 'buy' ? 'Cost' : 'Revenue'}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: action === 'buy' ? 'var(--red)' : 'var(--green)' }}>
                        {action === 'buy' ? '−' : '+'}{formatINR(totalCost)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Trade status message */}
                {tradeStatus && (
                  <div style={{
                    padding: '12px 14px', borderRadius: 'var(--radius)', marginBottom: '14px', fontSize: '13px',
                    background: tradeStatus.type === 'success' ? 'var(--green-dim)' : 'var(--red-dim)',
                    color: tradeStatus.type === 'success' ? 'var(--green)' : 'var(--red)',
                    border: `1px solid ${tradeStatus.type === 'success' ? 'rgba(0,255,136,0.25)' : 'rgba(255,59,92,0.25)'}`,
                  }}>
                    {tradeStatus.type === 'success' ? '✓ ' : '✗ '}{tradeStatus.msg}
                  </div>
                )}

                {/* Buy / Sell button — disabled and shows reason when market is closed */}
                <button
                  onClick={executeTrade}
                  className={`btn ${action === 'buy' ? 'btn-buy' : 'btn-sell'}`}
                  disabled={!isOpen || loading || !quantity || parseFloat(quantity) <= 0}
                  style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px' }}
                >
                  {loading
                    ? <><span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px', borderTopColor: '#000' }} /> Processing...</>
                    : !isOpen
                    ? isWeekend ? '🔒 Market Closed (Weekend)' : '🔒 Market Closed (9AM–4PM only)'
                    : `${action === 'buy' ? 'Buy' : 'Sell'} ${symbol}`}
                </button>

                {!isOpen && (
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '10px' }}>
                    {isWeekend
                      ? 'Trading resumes Monday 9:00 AM IST'
                      : 'Trading available Mon–Fri, 9:00 AM–4:00 PM IST'}
                  </p>
                )}

                {isOpen && (
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '10px' }}>
                    Virtual paper trading only
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!quote && !quoteLoading && !tradeStatus && (
          <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <h3 style={{ marginBottom: '8px' }}>Search for a stock to view</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              {isOpen
                ? 'Market is open — search any NSE/BSE stock above to start trading'
                : 'You can browse stock charts anytime. Trading opens Mon–Fri, 9:00 AM–4:00 PM IST'}
            </p>
          </div>
        )}

        {/* Error state */}
        {tradeStatus && !quote && (
          <div style={{
            padding: '16px 20px', borderRadius: 'var(--radius)', fontSize: '14px',
            background: 'var(--red-dim)', color: 'var(--red)',
            border: '1px solid rgba(255,59,92,0.25)',
          }}>
            {tradeStatus.msg}
          </div>
        )}
      </div>
    </Layout>
  );
}
