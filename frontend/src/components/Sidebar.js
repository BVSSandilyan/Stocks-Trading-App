import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMarketStatus } from '../utils/marketHours';

const navItems = [
  { to: '/dashboard', icon: '⬡', label: 'Dashboard' },
  { to: '/markets',   icon: '◈', label: 'Markets'   },
  { to: '/portfolio', icon: '◑', label: 'Portfolio'  },
  { to: '/trade',     icon: '⇄', label: 'Trade'      },
  { to: '/history',   icon: '◷', label: 'History'    },
];

const formatINR = (v) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(v);

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [mktStatus, setMktStatus] = useState(getMarketStatus());
  useEffect(() => {
    const iv = setInterval(() => setMktStatus(getMarketStatus()), 1000);
    return () => clearInterval(iv);
  }, []);
  const { isOpen } = mktStatus;

  return (
    <aside style={{
      width: '224px',
      minHeight: '100vh',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      height: '100vh',
      zIndex: 100,
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px', height: '38px',
            background: 'linear-gradient(135deg, var(--cyan), #0077AA)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '19px', fontWeight: '800',
            color: '#000', fontFamily: 'var(--font-mono)',
            boxShadow: '0 0 16px rgba(0,212,255,0.3)',
          }}>S</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '15px', letterSpacing: '-0.3px', lineHeight: 1.2 }}>
              Stocks Trading
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              NSE · BSE
            </div>
          </div>
        </div>
      </div>

      {/* Market status pill */}
      <div style={{ padding: '10px 14px 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '6px 12px',
          background: isOpen ? 'rgba(0,255,136,0.08)' : 'rgba(255,59,92,0.08)',
          border: `1px solid ${isOpen ? 'rgba(0,255,136,0.2)' : 'rgba(255,59,92,0.2)'}`,
          borderRadius: '20px',
          fontSize: '11px', fontWeight: '700',
          color: isOpen ? 'var(--green)' : 'var(--red)',
          letterSpacing: '0.5px',
        }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: isOpen ? 'var(--green)' : 'var(--red)',
            animation: isOpen ? 'pulse-glow 2s infinite' : 'none',
          }} />
          {isOpen ? 'MARKET OPEN' : 'MARKET CLOSED'}
        </div>
      </div>

      {/* Balance widget */}
      {user && (
        <div style={{
          margin: '12px 12px 0',
          padding: '14px',
          background: 'var(--bg-elevated)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
        }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
            Virtual Balance
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: '700', color: 'var(--cyan)' }}>
            {formatINR(user.virtualBalance)}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '3px' }}>
            Virtual Account
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px' }}>
        {navItems.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '11px 14px', borderRadius: 'var(--radius)',
            marginBottom: '3px', fontSize: '14px',
            fontWeight: isActive ? '600' : '400',
            color: isActive ? 'var(--cyan)' : 'var(--text-secondary)',
            background: isActive ? 'var(--cyan-dim)' : 'transparent',
            border: isActive ? '1px solid rgba(0,212,255,0.2)' : '1px solid transparent',
            transition: 'var(--transition)', textDecoration: 'none',
          })}>
            <span style={{ fontSize: '15px', opacity: 0.9 }}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: '14px 12px', borderTop: '1px solid var(--border)' }}>
        {user && (
          <div style={{ marginBottom: '10px', padding: '0 4px' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{user.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{user.email}</div>
          </div>
        )}
        <button onClick={logout} className="btn btn-ghost"
          style={{ width: '100%', justifyContent: 'center', fontSize: '13px', padding: '9px 16px' }}>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
