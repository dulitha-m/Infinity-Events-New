import { useState, useEffect } from 'react';
import { useCrudPanel } from './useCrudPanel';

const EMPTY = { order: 1, label: '', value: '0', suffix: '+' };

export default function StatsPanel() {
  const { items, loading, modal, editing, openCreate, openEdit, closeModal, save, remove } = useCrudPanel('stats');
  const [form, setForm] = useState(EMPTY);

  useEffect(() => { setForm(editing || EMPTY); }, [editing]);
  const h = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <div className="panel-header">
        <div>
          <h1 className="panel-title">STATS</h1>
          <p className="panel-sub">Manage the animated counter stats strip</p>
        </div>
        <button className="btn-primary" onClick={openCreate}>+ Add Stat</button>
      </div>

      {loading ? <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Loading...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {items.map((s) => (
            <div
              key={s._id}
              style={{
                background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
                padding: 24, borderTop: '2px solid var(--cyan)'
              }}
            >
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 52, color: 'var(--cyan)', lineHeight: 1 }}>
                {s.value}{s.suffix}
              </div>
              <div style={{ fontFamily: 'Syne', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
                {s.label}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-ghost" onClick={() => openEdit(s)}>Edit</button>
                <button className="btn-danger" onClick={() => remove(s._id)}>Del</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box">
            <h2 className="modal-title">{editing ? 'EDIT STAT' : 'NEW STAT'}</h2>
            <div className="modal-form">
              <div className="modal-field"><label>Order</label><input name="order" type="number" value={form.order} onChange={h}/></div>
              <div className="modal-field"><label>Label</label><input name="label" value={form.label} onChange={h} placeholder="Events Delivered"/></div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                <div className="modal-field"><label>Value (number)</label><input name="value" value={form.value} onChange={h} placeholder="500"/></div>
                <div className="modal-field"><label>Suffix</label><input name="suffix" value={form.suffix} onChange={h} placeholder="+"/></div>
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
