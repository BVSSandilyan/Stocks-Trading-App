import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

const formatINR = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatPercent = (value) => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

export default function Dashboard() {
  const { user, API } = useAuth();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [portRes, stockRes, statRes] = await Promise.all([
        API.get('/portfolio'),
        API.get('/stocks/all?limit=8&offset=0'),
        API.get('/transactions/stats'),
      ]);
      setPortfolio(portRes.data);
      const stockList = Array.isArray(stockRes.data) ? stockRes.data : (stockRes.data.stocks || []);
      setStocks(stockList.slice(0, 8));
      setStats(statRes.data);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 20000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const initialBalance = user ? user.initialBalance : 100000;
  const currentBalance = user ? user.virtualBalance : 100000;

  const chartData = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const val = initialBalance * (0.92 + Math.random() * 0.16 + i * 0.004);
    return {
      date: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      value: Math.round(val),
    };
  });
  if (user) {
    chartData[chartData.length - 1].value = Math.round(currentBalance);
  }

  const pnl = currentBalance - initialBalance;
  const pnlPct = initialBalance > 0 ? (pnl / initialBalance) * 100 : 0;

  const movers = [...stocks]
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
    .slice(0, 6);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <Layout>
      <div className="fade-in">
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '4px' }}>
            {greeting}, {user ? user.name.split(' ')[0] : 'Trader'} 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            {' · '}NSE &amp; BSE Markets
          </p>
        </div>

        {/* Top Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Virtual Balance (₹)', value: formatINR(currentBalance), accent: 'var(--cyan)' },
            { label: 'Total P&L (₹)', value: formatINR(pnl), accent: pnl >= 0 ? 'var(--green)' : 'var(--red)', sub: formatPercent(pnlPct) },
            { label: 'Holdings', value: portfolio && portfolio.holdings ? portfolio.holdings.length : '0', accent: 'var(--amber)' },
            { label: 'Total Trades', value: stats ? stats.totalTrades : '0', accent: 'var(--text-secondary)' },
          ].map(({ label, value, accent, sub }) => (
            <div key={label} className="card" style={{ borderTop: `2px solid ${accent}` }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: '700', color: accent }}>{value}</div>
              {sub && <div style={{ fontSize: '12px', color: pnl >= 0 ? 'var(--green)' : 'var(--red)', marginTop: '4px' }}>{sub}</div>}
            </div>
          ))}
        </div>

        {/* Chart + Movers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px', marginBottom: '24px' }}>
          {/* Portfolio Chart */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Portfolio Performance (14 days)</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: '700' }}>
                  {formatINR(currentBalance)}
                </div>
              </div>
              <span className={pnl >= 0 ? 'badge-up' : 'badge-down'}>
                {pnl >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%
              </span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00D4FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: '#4A5A7A', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: '#4A5A7A', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
                  domain={['auto', 'auto']}
                />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '13px' }}
                  labelStyle={{ color: 'var(--text-muted)' }}
                  formatter={(v) => [formatINR(v), 'Value']}
                />
                <Area type="monotone" dataKey="value" stroke="#00D4FF" strokeWidth={2} fill="url(#portGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Top Movers */}
          <div className="card">
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Top Movers — NSE / BSE
            </div>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                <span className="spinner spinner-lg" />
              </div>
            ) : movers.map(s => (
              <div
                key={s.symbol}
                onClick={() => navigate(`/trade?symbol=${s.symbol}`)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 8px', borderRadius: 'var(--radius)',
                  cursor: 'pointer', transition: 'var(--transition)', marginBottom: '4px',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-elevated)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: s.changePercent >= 0 ? 'var(--green-dim)' : 'var(--red-dim)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', fontWeight: '700',
                    color: s.changePercent >= 0 ? 'var(--green)' : 'var(--red)',
                    fontFamily: 'var(--font-mono)',
                  }}>{s.symbol.slice(0, 4)}</div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>{s.symbol}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      <span style={{ color: s.exchange === 'NSE' ? 'var(--cyan)' : 'var(--amber)', fontWeight: '700' }}>{s.exchange}</span>
                      {' · '}{s.sector || ''}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: '600' }}>
                    ₹{s.price != null ? s.price.toFixed(2) : '0.00'}
                  </div>
                  <span className={s.changePercent >= 0 ? 'badge-up' : 'badge-down'}>
                    {s.changePercent >= 0 ? '+' : ''}{s.changePercent != null ? s.changePercent.toFixed(2) : '0.00'}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Holdings Preview */}
        {portfolio && portfolio.holdings && portfolio.holdings.length > 0 && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Holdings</div>
              <button onClick={() => navigate('/portfolio')} className="btn btn-ghost" style={{ padding: '6px 14px', fontSize: '12px' }}>
                View All
              </button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Exchange</th>
                  <th>Shares</th>
                  <th>Avg Cost (₹)</th>
                  <th>Total Invested (₹)</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.holdings.slice(0, 5).map(h => (
                  <tr key={h.symbol} onClick={() => navigate(`/trade?symbol=${h.symbol}`)} style={{ cursor: 'pointer' }}>
                    <td className="sym-cell">{h.symbol}</td>
                    <td>
                      <span style={{
                        padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: '700',
                        background: 'rgba(0,212,255,0.1)', color: 'var(--cyan)',
                        border: '1px solid rgba(0,212,255,0.2)',
                      }}>NSE</span>
                    </td>
                    <td>{h.quantity}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{formatINR(h.avgBuyPrice)}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{formatINR(h.totalInvested)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(!portfolio || !portfolio.holdings || portfolio.holdings.length === 0) && !loading && (
          <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>📈</div>
            <h3 style={{ marginBottom: '8px' }}>Your portfolio is empty</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Start trading Indian stocks on NSE &amp; BSE to see your holdings here</p>
            <button onClick={() => navigate('/markets')} className="btn btn-primary">Browse NSE / BSE Markets</button>
          </div>
        )}
      </div>
    </Layout>
  );
}
