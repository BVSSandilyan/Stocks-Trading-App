import React, { useState, useEffect } from 'react';
import { getMarketStatus, formatCountdown, DAY_NAMES } from '../utils/marketHours';

export default function MarketClosed() {
  const [status, setStatus] = useState(getMarketStatus());
  const [now, setNow]       = useState(Date.now());

  useEffect(() => {
    const iv = setInterval(() => {
      setStatus(getMarketStatus());
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const { isWeekend, ist, day, nextOpen, opensInMs } = status;

  const istStr = ist.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
  });
  const nextOpenStr = nextOpen
    ? nextOpen.toLocaleString('en-IN', {
        weekday: 'long', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true,
      })
    : '';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      {/* Subtle grid bg */}
      <div style={{
        position: 'fixed', inset: 0, opacity: 0.03, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyan) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '500px', width: '100%' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{
            width: '48px', height: '48px',
            background: 'linear-gradient(135deg, var(--cyan), #0077AA)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', fontWeight: '800', color: '#000',
            fontFamily: 'var(--font-mono)',
            boxShadow: '0 0 24px rgba(0,212,255,0.3)',
          }}>S</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '20px' }}>
              Stocks Trading App
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              NSE · BSE
            </div>
          </div>
        </div>

        {/* Closed card */}
        <div className="card" style={{
          borderTop: '2px solid var(--red)',
          padding: '40px 32px',
          boxShadow: '0 0 40px rgba(255,59,92,0.08)',
        }}>
          {/* Icon */}
          <div style={{
            width: '72px', height: '72px',
            background: 'var(--red-dim)',
            border: '1px solid rgba(255,59,92,0.25)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px', margin: '0 auto 24px',
          }}>
            {isWeekend ? '🏖️' : '🔒'}
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
            Market is Closed
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '28px', lineHeight: 1.7 }}>
            {isWeekend
              ? `Today is ${DAY_NAMES[day]} — markets are closed on weekends.`
              : 'Trading hours are 9:00 AM – 4:00 PM IST, Monday to Friday.'}
          </p>

          {/* Current IST time */}
          <div style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '16px',
            marginBottom: '20px',
          }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
              Current IST Time
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '26px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '2px' }}>
              {istStr}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {DAY_NAMES[day]}, {ist.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>

          {/* Countdown */}
          {opensInMs > 0 && (
            <div style={{
              background: 'var(--green-dim)',
              border: '1px solid rgba(0,255,136,0.2)',
              borderRadius: 'var(--radius)',
              padding: '16px',
              marginBottom: '20px',
            }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                Market opens in
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', fontWeight: '700', color: 'var(--green)', letterSpacing: '3px' }}>
                {formatCountdown(opensInMs)}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
                Next session: <span style={{ color: 'var(--green)', fontWeight: '600' }}>{nextOpenStr} IST</span>
              </div>
            </div>
          )}

          {/* Trading hours info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Market Open',  value: '09:00 AM IST', color: 'var(--green)' },
              { label: 'Market Close', value: '04:00 PM IST', color: 'var(--red)' },
              { label: 'Trading Days', value: 'Mon – Fri',    color: 'var(--cyan)' },
              { label: 'Holidays',     value: 'Sat & Sun',    color: 'var(--amber)' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px',
                textAlign: 'left',
              }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  {label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: '700', color }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ marginTop: '20px', fontSize: '12px', color: 'var(--text-muted)' }}>
          This app simulates NSE &amp; BSE trading hours. Come back Monday at 9:00 AM IST.
        </p>
      </div>
    </div>
  );
}
