import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

const COLORS = ['#00D4FF', '#00FF88', '#FF3B5C', '#FFB800', '#8B5CF6', '#F97316', '#06B6D4', '#84CC16'];

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

export default function Portfolio() {
  const { user, API } = useAuth();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [liveStocks, setLiveStocks] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const portRes = await API.get('/portfolio');
      setPortfolio(portRes.data);

      if (portRes.data && portRes.data.holdings && portRes.data.holdings.length) {
        const stockData = {};
        await Promise.all(portRes.data.holdings.map(async (h) => {
          try {
            const res = await API.get(`/stocks/quote/${h.symbol}`);
            stockData[h.symbol] = res.data;
          } catch (err) {
            console.error('Quote fetch error for', h.symbol, err);
          }
        }));
        setLiveStocks(stockData);
      }
    } catch (err) {
      console.error('Portfolio fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 20000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const enrichedHoldings = (portfolio && portfolio.holdings ? portfolio.holdings : []).map(h => {
    const live = liveStocks[h.symbol];
    const currentPrice = live ? live.price : h.avgBuyPrice;
    const currentValue = currentPrice * h.quantity;
    const pnl = currentValue - h.totalInvested;
    const pnlPct = h.totalInvested > 0 ? (pnl / h.totalInvested) * 100 : 0;
    return { ...h, currentPrice, currentValue, pnl, pnlPct };
  });

  const totalValue = enrichedHoldings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalInvested = enrichedHoldings.reduce((sum, h) => sum + h.totalInvested, 0);
  const totalPnL = totalValue - totalInvested;
  const totalPnLPct = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

  const pieData = enrichedHoldings.map(h => ({
    name: h.symbol,
    value: Math.round(h.currentValue),
  }));

  if (loading) {
    return (
      <Layout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <span className="spinner spinner-lg" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="fade-in">
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '4px' }}>Portfolio</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Live performance tracking · Auto-refreshes every 20s</p>
        </div>

        {enrichedHoldings.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗂️</div>
            <h3 style={{ marginBottom: '8px' }}>No holdings yet</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              Your portfolio is empty. Start buying Indian stocks to track your performance.
            </p>
            <button onClick={() => navigate('/markets')} className="btn btn-primary">Browse NSE / BSE Markets</button>
          </div>
        ) : (
          <>
            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Total Value (₹)', value: formatINR(totalValue + (user ? user.virtualBalance : 0)), accent: 'var(--cyan)' },
                { label: 'Holdings Value (₹)', value: formatINR(totalValue), accent: 'var(--text-primary)' },
                { label: 'Total P&L (₹)', value: formatINR(totalPnL), accent: totalPnL >= 0 ? 'var(--green)' : 'var(--red)', sub: formatPercent(totalPnLPct) },
                { label: 'Cash Available (₹)', value: formatINR(user ? user.virtualBalance : 0), accent: 'var(--amber)' },
              ].map(({ label, value, accent, sub }) => (
                <div key={label} className="card">
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: '700', color: accent }}>{value}</div>
                  {sub && <div style={{ fontSize: '12px', marginTop: '4px', color: totalPnL >= 0 ? 'var(--green)' : 'var(--red)' }}>{sub}</div>}
                </div>
              ))}
            </div>

            {/* Holdings table + Pie */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Holdings</span>
                </div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Symbol</th>
                      <th>Shares</th>
                      <th>Avg Cost (₹)</th>
                      <th>Current Price (₹)</th>
                      <th>Current Value (₹)</th>
                      <th>P&amp;L</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrichedHoldings.map(h => (
                      <tr key={h.symbol}>
                        <td>
                          <div className="sym-cell">{h.symbol}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {h.companyName ? h.companyName.split(' ').slice(0, 3).join(' ') : ''}
                          </div>
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{h.quantity}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{formatINR(h.avgBuyPrice)}</td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '600', color: 'var(--text-primary)' }}>
                          {formatINR(h.currentPrice)}
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{formatINR(h.currentValue)}</td>
                        <td>
                          <div style={{ fontFamily: 'var(--font-mono)', color: h.pnl >= 0 ? 'var(--green)' : 'var(--red)', fontSize: '13px', fontWeight: '600' }}>
                            {h.pnl >= 0 ? '+' : ''}{formatINR(h.pnl)}
                          </div>
                          <div style={{ fontSize: '11px', color: h.pnl >= 0 ? 'var(--green)' : 'var(--red)' }}>
                            {formatPercent(h.pnlPct)}
                          </div>
                        </td>
                        <td>
                          <button
                            onClick={() => navigate(`/trade?symbol=${h.symbol}&action=sell`)}
                            className="btn btn-sell"
                            style={{ padding: '6px 14px', fontSize: '12px' }}
                          >
                            Sell
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Allocation Pie */}
              <div className="card">
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                  Allocation
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      paddingAngle={3}
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v) => [formatINR(v), 'Value']}
                      contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '8px' }}
                    />
                    <Legend formatter={(v) => <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{v}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
