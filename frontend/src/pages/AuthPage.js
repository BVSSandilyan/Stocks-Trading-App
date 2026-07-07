import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMarketStatus, DAY_NAMES } from '../utils/marketHours';

export default function AuthPage() {
  const [mode, setMode]   = useState('login');
  const [form, setForm]   = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register }   = useAuth();
  const navigate = useNavigate();

  const { isOpen, ist, day } = getMarketStatus();
  const istTime = ist.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        if (!form.name.trim()) { setError('Name is required'); setLoading(false); return; }
        await register(form.name, form.email, form.password);
      }
      navigate('/dashboard');
    } catch (err) {
      if (!err.response) {
        // Network error — backend not reachable
        setError('Cannot connect to server. Make sure the backend is running on port 5000.');
      } else if (err.response.status === 401) {
        setError('Invalid email or password. Please check and try again.');
      } else if (err.response.status === 400) {
        setError(err.response.data?.message || 'Please check your details and try again.');
      } else {
        setError(err.response.data?.message || 'Server error. Please try again in a moment.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'stretch' }}>

      {/* ── Left Panel — Branding ── */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(145deg, var(--bg-secondary) 0%, #0D1530 100%)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '60px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: 'linear-gradient(var(--cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyan) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '52px' }}>
            <div style={{
              width: '54px', height: '54px',
              background: 'linear-gradient(135deg, var(--cyan), #0077AA)',
              borderRadius: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', fontWeight: '800', color: '#000',
              fontFamily: 'var(--font-mono)',
              boxShadow: '0 0 32px rgba(0,212,255,0.4)',
            }}>S</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '22px', letterSpacing: '-0.5px' }}>
                Stocks Trading App
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                NSE · BSE Paper Trading
              </div>
            </div>
          </div>

          <h1 style={{ fontSize: '40px', fontWeight: '700', lineHeight: 1.15, marginBottom: '18px', letterSpacing: '-1px' }}>
            Trade smarter.<br />
            <span style={{ color: 'var(--cyan)' }}>Risk nothing.</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, maxWidth: '380px', marginBottom: '40px' }}>
            Practice trading on NSE &amp; BSE with ₹10,00,000 in virtual funds. Real market data, real hours — no money on the line.
          </p>

          {/* Feature list */}
          {[
            '₹10 Lakh virtual starting balance',
            'Live NSE & BSE stocks — 300+ companies',
            'Market hours: Mon–Fri, 9:00 AM – 4:00 PM IST',
            'Portfolio analytics & P&L tracking',
            'Full transaction history',
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', flexShrink: 0 }} />
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{f}</span>
            </div>
          ))}

          {/* Live market status */}
          <div style={{
            marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '10px 18px', borderRadius: '12px',
            background: isOpen ? 'rgba(0,255,136,0.08)' : 'rgba(255,59,92,0.08)',
            border: `1px solid ${isOpen ? 'rgba(0,255,136,0.2)' : 'rgba(255,59,92,0.2)'}`,
          }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: isOpen ? 'var(--green)' : 'var(--red)',
              animation: isOpen ? 'pulse-glow 2s infinite' : 'none',
            }} />
            <span style={{ fontSize: '13px', fontWeight: '600', color: isOpen ? 'var(--green)' : 'var(--red)' }}>
              {isOpen ? 'Market is OPEN now' : 'Market is CLOSED'}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              · {DAY_NAMES[day]}, {istTime} IST
            </span>
          </div>
        </div>
      </div>

      {/* ── Right Panel — Auth Form ── */}
      <div style={{ width: '460px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: '100%', maxWidth: '360px' }}>

          {/* Mode tabs */}
          <div style={{
            display: 'flex', background: 'var(--bg-elevated)', borderRadius: 'var(--radius)',
            padding: '4px', marginBottom: '30px', border: '1px solid var(--border)',
          }}>
            {['login', 'register'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); }} style={{
                flex: 1, padding: '10px', borderRadius: '7px', fontSize: '14px', fontWeight: '600',
                transition: 'var(--transition)', cursor: 'pointer',
                background: mode === m ? 'var(--bg-card)' : 'transparent',
                color: mode === m ? 'var(--text-primary)' : 'var(--text-muted)',
                border: mode === m ? '1px solid var(--border-light)' : '1px solid transparent',
              }}>
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>
              {mode === 'login' ? 'Welcome back' : 'Start trading today'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              {mode === 'login'
                ? 'Sign in to your trading account'
                : 'Create a free account and get ₹10 Lakh in virtual funds'}
            </p>
          </div>

          <form onSubmit={submit}>
            {mode === 'register' && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '500' }}>Full Name</label>
                <input name="name" type="text" className="input-field"
                  placeholder="Your full name" value={form.name} onChange={handle} required />
              </div>
            )}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '500' }}>Email Address</label>
              <input name="email" type="email" className="input-field"
                placeholder="you@example.com" value={form.email} onChange={handle} required />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '500' }}>Password</label>
              <input name="password" type="password" className="input-field"
                placeholder="Minimum 6 characters" value={form.password} onChange={handle} required minLength={6} />
            </div>

            {error && (
              <div style={{
                background: 'var(--red-dim)', border: '1px solid rgba(255,59,92,0.3)',
                borderRadius: 'var(--radius)', padding: '12px 14px',
                color: 'var(--red)', fontSize: '13px', marginBottom: '16px',
              }}>{error}</div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '15px' }}>
              {loading
                ? <><span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
                    {mode === 'login' ? 'Signing in...' : 'Creating account...'}</>
                : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-muted)' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--cyan)', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
              {mode === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
