import React, { useEffect, useState } from 'react';
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

const formatDateTime = (dateStr) => {
  return new Date(dateStr).toLocaleString('en-IN', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
};

export default function History() {
  const { API } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    Promise.all([
      API.get('/transactions'),
      API.get('/transactions/stats'),
    ]).then(([txRes, statRes]) => {
      setTransactions(txRes.data);
      setStats(statRes.data);
    }).catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [API]);

  const filtered = filter === 'ALL'
    ? transactions
    : transactions.filter(t => t.type === filter);

  return (
    <Layout>
      <div className="fade-in">
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '4px' }}>Transaction History</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Your complete NSE / BSE trading record</p>
        </div>

        {/* Stats */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Total Trades', value: stats.totalTrades, accent: 'var(--cyan)' },
              { label: 'Buy Orders', value: stats.buyTrades, accent: 'var(--green)' },
              { label: 'Sell Orders', value: stats.sellTrades, accent: 'var(--red)' },
              { label: 'Total Volume (₹)', value: formatINR(stats.totalBought + stats.totalSold), accent: 'var(--amber)' },
            ].map(({ label, value, accent }) => (
              <div key={label} className="card">
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: '700', color: accent }}>{value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {['ALL', 'BUY', 'SELL'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={filter === f ? 'btn btn-primary' : 'btn btn-ghost'}
              style={{ padding: '8px 20px', fontSize: '13px' }}>
              {f}
            </button>
          ))}
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
              <span className="spinner spinner-lg" />
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
              <p>No {filter !== 'ALL' ? filter.toLowerCase() : ''} transactions yet</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Symbol</th>
                  <th>Company</th>
                  <th>Shares</th>
                  <th>Price / Share (₹)</th>
                  <th>Total (₹)</th>
                  <th>Balance After (₹)</th>
                  <th>Date &amp; Time</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => (
                  <tr key={t._id}>
                    <td>
                      <span style={{
                        display: 'inline-block',
                        padding: '3px 10px', borderRadius: '20px',
                        fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px',
                        background: t.type === 'BUY' ? 'var(--green-dim)' : 'var(--red-dim)',
                        color: t.type === 'BUY' ? 'var(--green)' : 'var(--red)',
                        border: `1px solid ${t.type === 'BUY' ? 'rgba(0,255,136,0.25)' : 'rgba(255,59,92,0.25)'}`,
                      }}>
                        {t.type}
                      </span>
                    </td>
                    <td className="sym-cell">{t.symbol}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                      {t.companyName ? t.companyName.split(' ').slice(0, 3).join(' ') : ''}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{t.quantity}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{formatINR(t.pricePerShare)}</td>
                    <td style={{
                      fontFamily: 'var(--font-mono)', fontWeight: '600',
                      color: t.type === 'BUY' ? 'var(--red)' : 'var(--green)',
                    }}>
                      {t.type === 'BUY' ? '-' : '+'}{formatINR(t.totalAmount)}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                      {formatINR(t.balanceAfter)}
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '13px', whiteSpace: 'nowrap' }}>
                      {formatDateTime(t.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}
