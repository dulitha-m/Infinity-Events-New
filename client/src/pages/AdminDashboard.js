import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import InboxPanel from '../components/admin/InboxPanel';
import SegmentsPanel from '../components/admin/SegmentsPanel';
import ServicesPanel from '../components/admin/ServicesPanel';
import ClientsPanel from '../components/admin/ClientsPanel';
import HighlightsPanel from '../components/admin/HighlightsPanel';
import StatsPanel from '../components/admin/StatsPanel';
import DashboardHome from '../components/admin/DashboardHome';
import EventsPanel from '../components/admin/EventsPanel';
import './AdminDashboard.css';

const NAV = [
  { id: 'home',       icon: '⬡', label: 'Overview' },
  { id: 'inbox',      icon: '✉', label: 'Inquiries' },
  { id: 'events',     icon: '🎟', label: 'Events' },
  { id: 'segments',   icon: '⊞', label: 'Segments' },
  { id: 'services',   icon: '⚙', label: 'Services' },
  { id: 'highlights', icon: '★', label: 'Highlights' },
  { id: 'clients',    icon: '◈', label: 'Clients' },
  { id: 'stats',      icon: '◉', label: 'Stats' },
];

export default function AdminDashboard() {
  const [active, setActive] = useState('home');
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const panels = {
    home:       <DashboardHome setActive={setActive} />,
    inbox:      <InboxPanel />,
    events:     <EventsPanel />,
    segments:   <SegmentsPanel />,
    services:   <ServicesPanel />,
    highlights: <HighlightsPanel />,
    clients:    <ClientsPanel />,
    stats:      <StatsPanel />,
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <svg viewBox="0 0 48 28" fill="none" width="32" height="18">
            <ellipse cx="14" cy="14" rx="10" ry="10" stroke="#00F5FF" strokeWidth="2.5" fill="none"/>
            <ellipse cx="34" cy="14" rx="10" ry="10" stroke="#00F5FF" strokeWidth="2.5" fill="none"/>
            <line x1="6" y1="5" x2="42" y2="23" stroke="#00F5FF" strokeWidth="2" opacity="0.6"/>
          </svg>
          <span>INFINITY</span>
        </div>

        <nav className="sidebar-nav">
          {NAV.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item ${active === item.id ? 'active' : ''}`}
              onClick={() => setActive(item.id)}
            >
              <span className="item-icon">{item.icon}</span>
              <span className="item-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="admin-user">
            <div className="user-avatar">{admin?.name?.[0] || 'A'}</div>
            <div className="user-info">
              <div className="user-name">{admin?.name || 'Admin'}</div>
              <div className="user-email">{admin?.email}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-content">
          {panels[active]}
        </div>
      </main>
    </div>
  );
}
