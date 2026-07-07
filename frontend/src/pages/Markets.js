import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { formatLargeNumber } from '../utils/format';

const formatINR = (v) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(v);

const PAGE_SIZE = 50;

export default function Markets() {
  const { API } = useAuth();
  const navigate = useNavigate();

  // master list from server (all stocks, current filter)
  const [allStocks, setAllStocks]     = useState([]);
  const [sectors, setSectors]         = useState([]);
  const [search, setSearch]           = useState('');
  const [sector, setSector]           = useState('All');
  const [exchange, setExchange]       = useState('All');
  const [sortBy, setSortBy]           = useState('symbol');
  const [sortDir, setSortDir]         = useState('asc');
  const [page, setPage]               = useState(0);
  const [loading, setLoading]         = useState(true);
  const [refreshing, setRefreshing]   = useState(false);
  const searchRef                     = useRef(null);

  // ── fetch ALL stocks from backend ─────────────────────────────────────────
  const fetchAll = useCallback(async ({ silent = false } = {}) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const params = new URLSearchParams();
      if (sector   !== 'All') params.set('sector',   sector);
      if (exchange !== 'All') params.set('exchange', exchange);
      if (search.trim())      params.set('q',        search.trim());
      // no limit param → backend returns all matching stocks
      const res = await API.get(`/stocks/all?${params}`);
      setAllStocks(res.data.stocks || res.data);
    } catch (err) {
      console.error('Markets fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [API, sector, exchange, search]);

  // ── fetch sector list once ────────────────────────────────────────────────
  useEffect(() => {
    API.get('/stocks/sectors')
      .then(res => setSectors(['All', ...res.data]))
      .catch(() => setSectors(['All','Banking','IT','Finance','Pharma','Auto','FMCG',
        'Energy','Power','Infrastructure','Cement','Steel','Chemicals','Healthcare',
        'Telecom','Insurance','Metals','Mining','Real Estate','Retail','Defence',
        'Textile','Tech','Fintech','E-Commerce','Logistics','Consumer',
        'Hospitality','Media','Agriculture','Education','Conglomerate','Diversified']));
  }, [API]);

  // ── initial load + auto-refresh every 20 s ───────────────────────────────
  useEffect(() => {
    fetchAll();
    const iv = setInterval(() => fetchAll({ silent: true }), 20000);
    return () => clearInterval(iv);
  }, [fetchAll]);

  // ── debounce search ───────────────────────────────────────────────────────
  useEffect(() => {
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => { setPage(0); fetchAll(); }, 350);
    return () => clearTimeout(searchRef.current);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── client-side sort then paginate ───────────────────────────────────────
  const sorted = useMemo(() => {
    const arr = [...allStocks].sort((a, b) => {
      let va = a[sortBy];
      let vb = b[sortBy];
      if (typeof va === 'string') { va = va.toLowerCase(); vb = (vb || '').toLowerCase(); }
      if (va == null) return 1;
      if (vb == null) return -1;
      return sortDir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });
    return arr;
  }, [allStocks, sortBy, sortDir]);

  const totalPages  = Math.ceil(sorted.length / PAGE_SIZE);
  const pageStocks  = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleSector = (s)   => { setSector(s);   setPage(0); };
  const handleExchange = (e) => { setExchange(e); setPage(0); };
  const toggleSort = (key)   => {
    if (sortBy === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(key); setSortDir('asc'); }
    setPage(0);
  };

  const SortTh = ({ k, label }) => (
    <th onClick={() => toggleSort(k)} style={{ cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}>
      {label}{' '}
      {sortBy === k
        ? (sortDir === 'asc' ? '↑' : '↓')
        : <span style={{ opacity: 0.25 }}>↕</span>}
    </th>
  );

  const goPage = (p) => setPage(Math.max(0, Math.min(p, totalPages - 1)));

  return (
    <Layout>
      <div className="fade-in">

        {/* ── Header ── */}
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '4px' }}>Indian Stock Markets</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              NSE &amp; BSE ·{' '}
              <strong style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>{allStocks.length}</strong>
              {' '}stocks loaded
              {sector !== 'All' && <span style={{ color: 'var(--amber)' }}> · {sector}</span>}
              {exchange !== 'All' && <span style={{ color: 'var(--cyan)' }}> · {exchange}</span>}
              {search && <span style={{ color: 'var(--green)' }}> · "{search}"</span>}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {refreshing && <span className="spinner" style={{ width: '14px', height: '14px' }} />}
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Live · 20s</span>
          </div>
        </div>

        {/* ── Exchange tabs ── */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          {['All', 'NSE', 'BSE'].map(ex => (
            <button key={ex} onClick={() => handleExchange(ex)} style={{
              padding: '6px 20px', borderRadius: '20px', fontSize: '12px', fontWeight: '700',
              cursor: 'pointer', border: 'none', transition: 'var(--transition)',
              background: exchange === ex
                ? ex === 'NSE' ? 'rgba(0,212,255,0.18)' : ex === 'BSE' ? 'rgba(255,184,0,0.18)' : 'var(--cyan-dim)'
                : 'var(--bg-elevated)',
              color: exchange === ex
                ? ex === 'NSE' ? 'var(--cyan)' : ex === 'BSE' ? 'var(--amber)' : 'var(--cyan)'
                : 'var(--text-muted)',
              outline: exchange === ex ? '1px solid rgba(0,212,255,0.3)' : 'none',
            }}>{ex}</button>
          ))}
        </div>

        {/* ── Sector pills (scrollable) ── */}
        <div style={{ marginBottom: '16px', overflowX: 'auto', paddingBottom: '6px' }}>
          <div style={{ display: 'flex', gap: '6px', width: 'max-content' }}>
            {sectors.map(sec => (
              <button key={sec} onClick={() => handleSector(sec)} style={{
                padding: '5px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
                cursor: 'pointer', border: 'none', transition: 'var(--transition)', whiteSpace: 'nowrap',
                background: sector === sec ? 'var(--cyan-dim)' : 'var(--bg-elevated)',
                color: sector === sec ? 'var(--cyan)' : 'var(--text-muted)',
                outline: sector === sec ? '1px solid rgba(0,212,255,0.25)' : 'none',
              }}>{sec}</button>
            ))}
          </div>
        </div>

        {/* ── Search ── */}
        <div style={{ marginBottom: '16px', position: 'relative', maxWidth: '440px' }}>
          <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '16px' }}>⌕</span>
          <input
            className="input-field"
            style={{ paddingLeft: '40px', paddingRight: search ? '36px' : '14px' }}
            placeholder="Search by symbol, company, sector, industry..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
          />
          {search && (
            <button onClick={() => { setSearch(''); setPage(0); }} style={{
              position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '18px', lineHeight: 1,
            }}>×</button>
          )}
        </div>

        {/* ── Table ── */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '16px' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px', gap: '16px' }}>
              <span className="spinner spinner-lg" />
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading all Indian stocks…</span>
            </div>
          ) : pageStocks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔍</div>
              <p>No stocks match your filters.</p>
              <button onClick={() => { setSearch(''); setSector('All'); setExchange('All'); }} className="btn btn-ghost" style={{ marginTop: '16px' }}>
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* Results count bar */}
              <div style={{ padding: '10px 16px', background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                  Showing <strong style={{ color: 'var(--text-primary)' }}>{page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, sorted.length)}</strong> of <strong style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>{sorted.length}</strong> stocks
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                  Page {page + 1} / {totalPages}
                </span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="data-table" style={{ minWidth: '960px' }}>
                  <thead>
                    <tr>
                      <SortTh k="symbol"        label="Symbol" />
                      <SortTh k="exchange"      label="Exch" />
                      <SortTh k="sector"        label="Sector" />
                      <SortTh k="name"          label="Company" />
                      <SortTh k="price"         label="Price (₹)" />
                      <SortTh k="change"        label="Chg (₹)" />
                      <SortTh k="changePercent" label="Chg %" />
                      <SortTh k="volume"        label="Volume" />
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageStocks.map(s => (
                      <tr key={s.symbol} style={{ cursor: 'pointer' }} onClick={() => navigate(`/trade?symbol=${s.symbol}`)}>
                        <td>
                          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--cyan)', fontSize: '13px' }}>
                            {s.symbol}
                          </span>
                        </td>
                        <td>
                          <span style={{
                            padding: '2px 7px', borderRadius: '10px', fontSize: '10px', fontWeight: '700',
                            background: s.exchange === 'NSE' ? 'rgba(0,212,255,0.1)' : 'rgba(255,184,0,0.1)',
                            color: s.exchange === 'NSE' ? 'var(--cyan)' : 'var(--amber)',
                            border: `1px solid ${s.exchange === 'NSE' ? 'rgba(0,212,255,0.2)' : 'rgba(255,184,0,0.2)'}`,
                          }}>{s.exchange}</span>
                        </td>
                        <td>
                          <span style={{
                            padding: '2px 7px', borderRadius: '10px', fontSize: '10px',
                            background: 'var(--bg-elevated)', color: 'var(--text-muted)',
                            border: '1px solid var(--border)', whiteSpace: 'nowrap',
                          }}>{s.sector}</span>
                        </td>
                        <td style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '13px' }}>
                          <span title={s.name} style={{ display: 'block', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {s.name}
                          </span>
                          {s.industry && (
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{s.industry}</span>
                          )}
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                          {formatINR(s.price)}
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', color: s.change >= 0 ? 'var(--green)' : 'var(--red)', whiteSpace: 'nowrap' }}>
                          {s.change >= 0 ? '+' : ''}{(s.change || 0).toFixed(2)}
                        </td>
                        <td>
                          <span className={s.changePercent >= 0 ? 'badge-up' : 'badge-down'}>
                            {s.changePercent >= 0 ? '+' : ''}{(s.changePercent || 0).toFixed(2)}%
                          </span>
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                          {formatLargeNumber(s.volume)}
                        </td>
                        <td onClick={e => e.stopPropagation()}>
                          <button
                            onClick={() => navigate(`/trade?symbol=${s.symbol}`)}
                            className="btn btn-primary"
                            style={{ padding: '6px 14px', fontSize: '11px' }}
                          >
                            Trade
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* ── Pagination ── */}
        {!loading && totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <button onClick={() => goPage(0)}           className="btn btn-ghost" style={{ padding: '7px 13px', fontSize: '12px' }} disabled={page === 0}>«</button>
            <button onClick={() => goPage(page - 1)}    className="btn btn-ghost" style={{ padding: '7px 13px', fontSize: '12px' }} disabled={page === 0}>‹</button>

            {Array.from({ length: totalPages }, (_, i) => i)
              .filter(i => Math.abs(i - page) <= 2 || i === 0 || i === totalPages - 1)
              .reduce((acc, i, idx, arr) => {
                if (idx > 0 && i - arr[idx - 1] > 1) acc.push('…');
                acc.push(i);
                return acc;
              }, [])
              .map((item, idx) =>
                item === '…'
                  ? <span key={`e${idx}`} style={{ color: 'var(--text-muted)', padding: '0 4px' }}>…</span>
                  : <button key={item} onClick={() => goPage(item)}
                      className={page === item ? 'btn btn-primary' : 'btn btn-ghost'}
                      style={{ padding: '7px 13px', fontSize: '12px', minWidth: '38px' }}>
                      {item + 1}
                    </button>
              )
            }

            <button onClick={() => goPage(page + 1)}        className="btn btn-ghost" style={{ padding: '7px 13px', fontSize: '12px' }} disabled={page >= totalPages - 1}>›</button>
            <button onClick={() => goPage(totalPages - 1)}  className="btn btn-ghost" style={{ padding: '7px 13px', fontSize: '12px' }} disabled={page >= totalPages - 1}>»</button>

            <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px' }}>
              {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, sorted.length)} of {sorted.length}
            </span>
          </div>
        )}

      </div>
    </Layout>
  );
}
