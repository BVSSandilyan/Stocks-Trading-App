import React, { useState, useEffect } from 'react';
import { getMarketStatus } from '../utils/marketHours';

export default function MarketClosedOverlay() {
  const [status, setStatus] = useState(getMarketStatus());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const tick = () => setStatus(getMarketStatus());
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  // Reset dismiss when market reopens
  useEffect(() => {
    if (status.isOpen) setDismissed(false);
  }, [status.isOpen]);

  if (status.isOpen || dismissed) return null;

  const { isWeekend, isPreOpen, countdown, nextDay, currentTimeIST } = status;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      background: 'rgba(10,15,30,0.92)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '24px',
        padding: '48px 40px',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
        position: 'relative',
      }}>
        {/* Logo */}
        <div style={{
          width: '64px', height: '64px',
          background: 'linear-gradient(135deg, #1A2035, #0F1629)',
          border: '2px solid var(--border)',
          borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px', margin: '0 auto 24px',
        }}>
          {isWeekend ? '🏖️' : isPreOpen ? '⏳' : '🔔'}
        </div>

        {/* Title */}
        <h2 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '8px', letterSpacing: '-0.5px' }}>
          {isWeekend
            ? 'Markets are Closed'
            : isPreOpen
              ? 'Pre-Open Session'
              : 'Market Closed'}
        </h2>

        {/* Status badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px', borderRadius: '20px', marginBottom: '20px',
          background: isPreOpen ? 'var(--amber-dim)' : 'var(--red-dim)',
          border: `1px solid ${isPreOpen ? 'rgba(255,184,0,0.3)' : 'rgba(255,59,92,0.3)'}`,
        }}>
          <div style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: isPreOpen ? 'var(--amber)' : 'var(--red)',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '700',
            color: isPreOpen ? 'var(--amber)' : 'var(--red)',
          }}>
            {isWeekend ? 'WEEKEND HOLIDAY' : isPreOpen ? 'PRE-OPEN' : 'AFTER HOURS'}
          </span>
        </div>

        {/* Message */}
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.7, marginBottom: '28px' }}>
          {isWeekend
            ? `NSE & BSE are closed on weekends.\nTrading resumes on ${nextDay} at 9:00 AM IST.`
            : isPreOpen
              ? 'The pre-open session is active. Regular trading begins at 9:00 AM IST.'
              : `Trading hours are 9:00 AM – 4:00 PM IST, Monday to Friday.\nMarket opens ${nextDay} at 9:00 AM.`}
        </p>

        {/* Countdown */}
        {!isPreOpen && (
          <div style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '20px',
            marginBottom: '24px',
          }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>
              Market opens in
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '38px', fontWeight: '700',
              color: 'var(--cyan)', letterSpacing: '2px',
              textShadow: '0 0 20px rgba(0,212,255,0.3)',
            }}>
              {countdown}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
              {nextDay} · 09:00 AM IST
            </div>
          </div>
        )}

        {/* Current IST time */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
          marginBottom: '28px',
        }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Current time:</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
            {currentTimeIST}
          </span>
        </div>

        {/* Trading hours info */}
        <div style={{
          display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: '28px',
        }}>
          {[
            { label: 'Pre-Open', time: '08:45–09:00' },
            { label: 'Trading', time: '09:00–16:00' },
            { label: 'Closed', time: 'Sat & Sun' },
          ].map(item => (
            <div key={item.label} style={{
              padding: '6px 14px', borderRadius: '10px',
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '2px' }}>{item.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: '600', color: 'var(--text-primary)' }}>{item.time}</div>
            </div>
          ))}
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="btn btn-ghost"
          style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '14px' }}
        >
          View Portfolio &amp; History
        </button>

        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '14px' }}>
          You can browse your portfolio and history, but trading is disabled during market hours closure.
        </p>
      </div>
    </div>
  );
}
