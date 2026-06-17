import { useState, useEffect } from 'react';
import { useCrudPanel } from './useCrudPanel';

const EMPTY = { order:1, year:'2025', tag:'', name:'', description:'', accentColor:'#FF2D78', bgGradient:'linear-gradient(135deg,#FF2D78,#9B30FF)' };

export default function HighlightsPanel() {
  const { items, loading, modal, editing, openCreate, openEdit, closeModal, save, remove } = useCrudPanel('highlights');
  const [form, setForm] = useState(EMPTY);

  useEffect(() => { setForm(editing || EMPTY); }, [editing]);
  const h = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <div className="panel-header">
        <div>
          <h1 className="panel-title">HIGHLIGHTS</h1>
          <p className="panel-sub">Manage portfolio landmark moments</p>
        </div>
        <button className="btn-primary" onClick={openCreate}>+ Add Highlight</button>
      </div>

      {loading ? <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Loading...</p> : (
        <table className="admin-table">
          <thead><tr><th>#</th><th>Year</th><th>Event</th><th>Tag</th><th>Accent</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map((h) => (
              <tr key={h._id}>
                <td>{h.order}</td>
                <td style={{ fontFamily: 'Bebas Neue', fontSize: 20, color: h.accentColor }}>{h.year}</td>
                <td style={{ color: 'var(--white)', fontWeight: 500 }}>{h.name}</td>
                <td><span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{h.tag}</span></td>
                <td><span style={{ color: h.accentColor }}>{h.accentColor}</span></td>
                <td className="td-actions">
                  <button className="btn-ghost" onClick={() => openEdit(h)}>Edit</button>
                  <button className="btn-danger" onClick={() => remove(h._id)}>Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box">
            <h2 className="modal-title">{editing ? 'EDIT HIGHLIGHT' : 'NEW HIGHLIGHT'}</h2>
            <div className="modal-form">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="modal-field"><label>Order</label><input name="order" type="number" value={form.order} onChange={h}/></div>
                <div className="modal-field"><label>Year</label><input name="year" value={form.year} onChange={h} placeholder="2025"/></div>
              </div>
              <div className="modal-field"><label>Tag</label><input name="tag" value={form.tag} onChange={h} placeholder="Live Concert"/></div>
              <div className="modal-field"><label>Event Name</label><input name="name" value={form.name} onChange={h} placeholder="AKON LIVE Maldives"/></div>
              <div className="modal-field"><label>Description</label><textarea name="description" value={form.description} onChange={h} rows={3}/></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="modal-field"><label>Accent Color</label><input name="accentColor" value={form.accentColor} onChange={h}/></div>
                <div className="modal-field"><label>BG Gradient</label><input name="bgGradient" value={form.bgGradient} onChange={h}/></div>
              </div>
              <div className="modal-actions">
                <button className="btn-primary" onClick={() => save(form)}>Save</button>
                <button className="btn-ghost" onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
