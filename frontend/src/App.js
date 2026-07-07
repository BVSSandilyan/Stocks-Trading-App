import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage  from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Markets   from './pages/Markets';
import Portfolio from './pages/Portfolio';
import Trade     from './pages/Trade';
import History   from './pages/History';
import './styles/globals.css';

// Loading splash shown while auth state is being restored
function LoadingSplash() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--bg-primary)',
      flexDirection: 'column', gap: '20px',
    }}>
      <div style={{
        width: '52px', height: '52px',
        background: 'linear-gradient(135deg, var(--cyan), #0077AA)',
        borderRadius: '12px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '26px', fontWeight: '800',
        color: '#000', fontFamily: 'var(--font-mono)',
        boxShadow: '0 0 30px rgba(0,212,255,0.4)',
      }}>S</div>
      <span className="spinner spinner-lg" />
      <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Stocks Trading App</span>
    </div>
  );
}

// Any logged-in user can access all pages at any time
// Buy/Sell restrictions are handled inside the Trade page itself
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSplash />;
  return user ? children : <Navigate to="/auth" replace />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return !user ? children : <Navigate to="/dashboard" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth"      element={<PublicRoute><AuthPage /></PublicRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/markets"   element={<ProtectedRoute><Markets /></ProtectedRoute>} />
          <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
          <Route path="/trade"     element={<ProtectedRoute><Trade /></ProtectedRoute>} />
          <Route path="/history"   element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/"          element={<Navigate to="/dashboard" replace />} />
          <Route path="*"          element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
