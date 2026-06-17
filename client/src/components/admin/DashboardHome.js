import { useEffect, useState } from 'react';
import { getDashboard } from '../../api';
import './DashboardHome.css';

export default function DashboardHome({ setActive }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboard().then(({ data }) => setData(data)).catch(console.error);
  }, []);

  const fmt = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="dash-home">
      <div className="panel-header">
        <div>
          <h1 className="panel-title">OVERVIEW</h1>
          <p className="panel-sub">Welcome to the Infinity Events admin panel</p>
        </div>
      </div>

      <div className="dash-cards">
        <div className="dash-card" style={{ '--c': 'var(--pink)' }}>
          <div className="dash-card-num">{data?.newInquiries ?? '—'}</div>
          <div className="dash-card-label">New Inquiries</div>
          <button className="dash-card-action" onClick={() => setActive('inbox')}>View →</button>
        </div>
        <div className="dash-card" style={{ '--c': 'var(--cyan)' }}>
          <div className="dash-card-num">{data?.totalInquiries ?? '—'}</div>
          <div className="dash-card-label">Total Inquiries</div>
          <button className="dash-card-action" onClick={() => setActive('inbox')}>View →</button>
        </div>
        <div className="dash-card" style={{ '--c': 'var(--gold)' }}>
          <div className="dash-card-num">5</div>
          <div className="dash-card-label">Global Hubs</div>
          <span className="dash-card-action" style={{ cursor: 'default' }}>Active</span>
        </div>
      </div>

      <div className="dash-section">
        <h2 className="dash-section-title">Recent Inquiries</h2>
        {data?.recentInquiries?.length ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Event Type</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recentInquiries.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td style={{ color: 'rgba(255,255,255,0.45)' }}>{c.email}</td>
                  <td style={{ textTransform: 'capitalize' }}>{c.eventType}</td>
                  <td style={{ color: 'rgba(255,255,255,0.35)' }}>{fmt(c.createdAt)}</td>
                  <td>
                    <span className={`status-badge status-${c.status}`}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>No inquiries yet.</p>
        )}
      </div>

      <div className="dash-quick">
        <h2 className="dash-section-title">Quick Actions</h2>
        <div className="dash-quick-grid">
          {[
            { label: 'Manage Segments', id: 'segments', accent: '#FF2D78' },
            { label: 'Manage Services', id: 'services', accent: '#00F5FF' },
            { label: 'Manage Highlights', id: 'highlights', accent: '#FFB800' },
            { label: 'Manage Clients', id: 'clients', accent: '#9B30FF' },
            { label: 'Update Stats', id: 'stats', accent: '#FF2D78' },
            { label: 'View Inbox', id: 'inbox', accent: '#00F5FF' },
          ].map((q) => (
            <button
              key={q.id}
              className="quick-btn"
              style={{ '--q': q.accent }}
              onClick={() => setActive(q.id)}
            >
              {q.label} →
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
