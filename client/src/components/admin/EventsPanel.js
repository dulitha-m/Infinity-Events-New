import { useState, useEffect } from 'react';
import { useCrudPanel } from './useCrudPanel';

const EMPTY = {
  order: 1,
  title: '',
  artist: '',
  date: '',
  location: '',
  category: 'Live Concert',
  description: '',
  imageUrl: '',
  accentColor: '#FFB800',
  ticketUrl: '',
  isFeatured: false,
};

const CATEGORIES = [
  'Live Concert', 'Corporate Event', 'Fashion Show', 'State Event',
  'Awards Show', 'Festival', 'Private Gala', 'Theatre & Arts', 'Pageant', 'Other'
];

export default function EventsPanel() {
  const { items, loading, modal, editing, openCreate, openEdit, closeModal, save, remove } = useCrudPanel('events');
  const [form, setForm] = useState(EMPTY);

  useEffect(() => { setForm(editing || EMPTY); }, [editing]);
  const h = (e) => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  return (
    <div>
      <div className="panel-header">
        <div>
          <h1 className="panel-title">UPCOMING EVENTS</h1>
          <p className="panel-sub">Manage promotions, upcoming events & artist showcases displayed on the homepage</p>
        </div>
        <button className="btn-primary" onClick={openCreate}>+ Add Event</button>
      </div>

      {loading ? <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Loading...</p> : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Event</th>
              <th>Date</th>
              <th>Location</th>
              <th>Category</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((ev) => (
              <tr key={ev._id}>
                <td>{ev.order}</td>
                <td>
                  <div style={{ color: 'var(--white)', fontWeight: 500 }}>{ev.title}</div>
                  {ev.artist && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>ft. {ev.artist}</div>}
                </td>
                <td style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{ev.date}</td>
                <td style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{ev.location}</td>
                <td>
                  <span style={{ color: ev.accentColor, fontSize: 11, fontWeight: 600 }}>{ev.category}</span>
                </td>
                <td>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: 1,
                    color: ev.isFeatured ? 'var(--cyan)' : 'rgba(255,255,255,0.2)'
                  }}>
                    {ev.isFeatured ? '★ YES' : '—'}
                  </span>
                </td>
                <td className="td-actions">
                  <button className="btn-ghost" onClick={() => openEdit(ev)}>Edit</button>
                  <button className="btn-danger" onClick={() => remove(ev._id)}>Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box" style={{ maxWidth: 680 }}>
            <h2 className="modal-title">{editing ? 'EDIT EVENT' : 'NEW EVENT'}</h2>
            <div className="modal-form">
              {/* Row 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="modal-field"><label>Order</label><input name="order" type="number" value={form.order} onChange={h} /></div>
                <div className="modal-field">
                  <label>Category</label>
                  <select name="category" value={form.category} onChange={h} style={{ background: '#0d0d14', color: 'var(--white)', border: '1px solid rgba(255,255,255,0.08)', padding: '10px 12px', fontSize: 12, width: '100%' }}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              {/* Row 2 */}
              <div className="modal-field"><label>Event Title</label><input name="title" value={form.title} onChange={h} placeholder="e.g. AKON LIVE IN COLOMBO" /></div>
              <div className="modal-field"><label>Artist / Performer (optional)</label><input name="artist" value={form.artist} onChange={h} placeholder="e.g. Akon" /></div>
              {/* Row 3 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="modal-field"><label>Date</label><input name="date" value={form.date} onChange={h} placeholder="2025-12-31 or Dec 31, 2025" /></div>
                <div className="modal-field"><label>Location / Venue</label><input name="location" value={form.location} onChange={h} placeholder="e.g. Colombo, Sri Lanka" /></div>
              </div>
              {/* Description */}
              <div className="modal-field"><label>Description</label><textarea name="description" value={form.description} onChange={h} rows={3} placeholder="Short description of the event..." /></div>
              {/* Image + Ticket */}
              <div className="modal-field"><label>Background Image URL</label><input name="imageUrl" value={form.imageUrl || ''} onChange={h} placeholder="https://..." /></div>
              <div className="modal-field"><label>Ticket Link URL (optional)</label><input name="ticketUrl" value={form.ticketUrl || ''} onChange={h} placeholder="https://..." /></div>
              {/* Row accent */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="modal-field"><label>Accent Color</label><input name="accentColor" value={form.accentColor} onChange={h} placeholder="#FFB800" /></div>
                <div className="modal-field" style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 28 }}>
                  <input type="checkbox" name="isFeatured" id="isFeatured" checked={form.isFeatured} onChange={h} />
                  <label htmlFor="isFeatured" style={{ letterSpacing: 1 }}>⭐ Feature as hero banner</label>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-primary" onClick={() => save(form)}>Save Event</button>
                <button className="btn-ghost" onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
