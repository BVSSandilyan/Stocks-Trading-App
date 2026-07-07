import React from 'react';
import Sidebar from './Sidebar';
import TickerTape from './TickerTape';
import MarketStatusBar from './MarketStatusBar';

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <MarketStatusBar />
        <TickerTape />
        <main style={{
          flex: 1,
          padding: '28px',
          overflowY: 'auto',
          background: 'var(--bg-primary)',
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
