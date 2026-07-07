import React, { useState, useEffect } from 'react';
import { getMarketStatus } from '../utils/marketHours';

export default function MarketStatus({ compact = false }) {
  const [status, setStatus] = useState(getMarketStatus());

  useEffect(() => {
    const tick = () => setStatus(getMarketStatus());
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const { isOpen, isPreOpen, isWeekend, countdown, nextDay, currentTimeIST, minsToClose } = status;

  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: isOpen ? 'var(--green)' : isPreOpen ? 'var(--amber)' : 'var(--red)',
          boxShadow: isOpen
            ? '0 0 8px var(--green)'
            : isPreOpen ? '0 0 8px var(--amber)' : 'none',
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: '11px', fontWeight: '600',
          color: isOpen ? 'var(--green)' : isPreOpen ? 'var(--amber)' : 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
        }}>
          {isOpen ? 'MARKET OPEN' : isPreOpen ? 'PRE-OPEN' : 'MARKET CLOSED'}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {currentTimeIST}
        </span>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
      padding: '8px 16px',
      background: isOpen ? 'rgba(0,255,136,0.06)' : isPreOpen ? 'rgba(255,184,0,0.06)' : 'rgba(255,59,92,0.05)',
      borderBottom: `1px solid ${isOpen ? 'rgba(0,255,136,0.15)' : isPreOpen ? 'rgba(255,184,0,0.15)' : 'rgba(255,59,92,0.12)'}`,
    }}>
      {/* Indicator dot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
          background: isOpen ? 'var(--green)' : isPreOpen ? 'var(--amber)' : 'var(--red)',
          boxShadow: isOpen ? '0 0 10px var(--green)' : isPreOpen ? '0 0 10px var(--amber)' : 'none',
          animation: isOpen ? 'pulse-glow 2s infinite' : 'none',
        }} />
        <span style={{
          fontSize: '12px', fontWeight: '700', letterSpacing: '1px',
          fontFamily: 'var(--font-mono)',
          color: isOpen ? 'var(--green)' : isPreOpen ? 'var(--amber)' : 'var(--red)',
        }}>
          {isOpen ? 'MARKET OPEN' : isPreOpen ? 'PRE-OPEN SESSION' : isWeekend ? 'WEEKEND — CLOSED' : 'MARKET CLOSED'}
        </span>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '14px', background: 'var(--border)', flexShrink: 0 }} />

      {/* Current time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>IST</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>
          {currentTimeIST}
        </span>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '14px', background: 'var(--border)', flexShrink: 0 }} />

      {/* Countdown or close info */}
      {isOpen && minsToClose !== null ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Closes in</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '700', color: 'var(--green)' }}>
            {Math.floor(minsToClose / 60)}h {minsToClose % 60}m
          </span>
        </div>
      ) : !isOpen && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Opens {nextDay} 09:00 in
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '700', color: 'var(--amber)' }}>
            {countdown}
          </span>
        </div>
      )}

      {/* Hours info */}
      <div style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-muted)' }}>
        Mon–Fri · 09:00–16:00 IST
      </div>
    </div>
  );
}
