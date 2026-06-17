import { useState, useEffect } from 'react';
import { useCrudPanel } from './useCrudPanel';

const EMPTY = { order:1, icon:'🎤', label:'', title:'', sub:'', accentColor:'#FF2D78', bgGradient:'linear-gradient(135deg,#1a0010,#3d0030)', imageUrl:'', gridSpan:4, isWide:false };

export default function SegmentsPanel() {
  const { items, loading, modal, editing, openCreate, openEdit, closeModal, save, remove } = useCrudPanel('segments');
  const [form, setForm] = useState(EMPTY);

  useEffect(() => { setForm(editing || EMPTY); }, [editing]);
  const h = (e) => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  return (
    <div>
      <div className="panel-header">
        <div>
          <h1 className="panel-title">SEGMENTS</h1>
          <p className="panel-sub">Manage the bento-grid service segments on the homepage</p>
        </div>
        <button className="btn-primary" onClick={openCreate}>+ Add Segment</button>
      </div>

      {loading ? <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Loading...</p> : (
        <table className="admin-table">
          <thead><tr><th>#</th><th>Icon</th><th>Title</th><th>Accent</th><th>Span</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map((s) => (
              <tr key={s._id}>
                <td>{s.order}</td>
                <td style={{ fontSize: 22 }}>{s.icon}</td>
                <td>
                  <div style={{ color: 'var(--white)', fontWeight: 500 }}>{s.title}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{s.label}</div>
                </td>
                <td><span style={{ color: s.accentColor, fontWeight: 600 }}>{s.accentColor}</span></td>
                <td>{s.gridSpan}</td>
                <td className="td-actions">
                  <button className="btn-ghost" onClick={() => openEdit(s)}>Edit</button>
                  <button className="btn-danger" onClick={() => remove(s._id)}>Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box">
            <h2 className="modal-title">{editing ? 'EDIT SEGMENT' : 'NEW SEGMENT'}</h2>
            <div className="modal-form">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="modal-field"><label>Order</label><input name="order" type="number" value={form.order} onChange={h}/></div>
                <div className="modal-field"><label>Icon (emoji)</label><input name="icon" value={form.icon} onChange={h}/></div>
              </div>
              <div className="modal-field"><label>Label (small text)</label><input name="label" value={form.label} onChange={h} placeholder="Live Entertainment"/></div>
              <div className="modal-field"><label>Title</label><input name="title" value={form.title} onChange={h} placeholder="International Concerts & Festivals"/></div>
              <div className="modal-field"><label>Sub (description)</label><textarea name="sub" value={form.sub} onChange={h} rows={2}/></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="modal-field"><label>Accent Color</label><input name="accentColor" value={form.accentColor} onChange={h} placeholder="#FF2D78"/></div>
                <div className="modal-field"><label>Grid Span (1-12)</label><input name="gridSpan" type="number" min={1} max={12} value={form.gridSpan} onChange={h}/></div>
              </div>
              <div className="modal-field"><label>BG Gradient CSS</label><input name="bgGradient" value={form.bgGradient} onChange={h}/></div>
              <div className="modal-field"><label>Background Image URL (Optional)</label><input name="imageUrl" value={form.imageUrl || ''} onChange={h} placeholder="https://images.unsplash.com/... or /images/..."/></div>
              <div className="modal-field" style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" name="isWide" checked={form.isWide} onChange={h} id="isWide"/>
                <label htmlFor="isWide" style={{ letterSpacing: 1 }}>Wide card (horizontal layout)</label>
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
