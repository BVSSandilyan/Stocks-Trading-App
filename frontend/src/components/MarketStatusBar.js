import React, { useState, useEffect } from 'react';
import { getMarketStatus, formatCountdown } from '../utils/marketHours';

export default function MarketStatusBar() {
  const [status, setStatus] = useState(getMarketStatus());

  useEffect(() => {
    const iv = setInterval(() => setStatus(getMarketStatus()), 1000);
    return () => clearInterval(iv);
  }, []);

  const { isOpen, isWeekend, ist, closesAt, opensInMs } = status;

  const istTime = ist.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
  });

  const msUntilClose = isOpen && closesAt ? closesAt.getTime() - ist.getTime() : 0;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
      padding: '7px 20px',
      background: isOpen ? 'rgba(0,255,136,0.05)' : 'rgba(255,59,92,0.05)',
      borderBottom: `1px solid ${isOpen ? 'rgba(0,255,136,0.12)' : 'rgba(255,59,92,0.12)'}`,
      fontSize: '12px', flexShrink: 0,
    }}>
      {/* Status dot + label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{
          width: '7px', height: '7px', borderRadius: '50%',
          background: isOpen ? 'var(--green)' : 'var(--red)',
          boxShadow: `0 0 6px ${isOpen ? 'var(--green)' : 'var(--red)'}`,
          animation: isOpen ? 'pulse-glow 2s infinite' : 'none',
          flexShrink: 0,
        }} />
        <span style={{ fontWeight: '700', color: isOpen ? 'var(--green)' : 'var(--red)', letterSpacing: '0.5px' }}>
          {isOpen ? 'MARKET OPEN' : 'MARKET CLOSED'}
        </span>
        {!isOpen && (
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '2px' }}>
            {isWeekend ? '(Weekend)' : '(Outside trading hours)'}
          </span>
        )}
      </div>

      {/* Live IST clock */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ color: 'var(--text-muted)' }}>🕐</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '600', color: 'var(--text-secondary)' }}>
          {istTime} IST
        </span>
      </div>

      {/* When open: closes in countdown */}
      {isOpen && msUntilClose > 0 && (
        <div style={{ color: 'var(--text-muted)' }}>
          Closes in{' '}
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--amber)' }}>
            {formatCountdown(msUntilClose)}
          </span>
        </div>
      )}

      {/* When closed: opens in countdown */}
      {!isOpen && opensInMs > 0 && (
        <div style={{ color: 'var(--text-muted)' }}>
          Trading opens in{' '}
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--green)' }}>
            {formatCountdown(opensInMs)}
          </span>
        </div>
      )}

      {/* When closed: view-only note */}
      {!isOpen && (
        <div style={{
          padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600',
          background: 'rgba(255,184,0,0.1)', color: 'var(--amber)',
          border: '1px solid rgba(255,184,0,0.2)',
        }}>
          📋 View Only — No Buy/Sell
        </div>
      )}

      {/* Right: hours info */}
      <div style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '11px', whiteSpace: 'nowrap' }}>
        NSE &amp; BSE · Mon–Fri · 9:00 AM – 4:00 PM IST
      </div>
    </div>
  );
}
