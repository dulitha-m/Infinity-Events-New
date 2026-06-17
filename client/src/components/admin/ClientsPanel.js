import { useState, useEffect } from 'react';
import { useCrudPanel } from './useCrudPanel';

const EMPTY = { name: '', category: 'corporate' };

export default function ClientsPanel() {
  const { items, loading, modal, editing, openCreate, openEdit, closeModal, save, remove } = useCrudPanel('clients');
  const [form, setForm] = useState(EMPTY);
  const [catFilter, setCatFilter] = useState('all');

  useEffect(() => { setForm(editing || EMPTY); }, [editing]);
  const h = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const filtered = catFilter === 'all' ? items : items.filter(c => c.category === catFilter);

  return (
    <div>
      <div className="panel-header">
        <div>
          <h1 className="panel-title">CLIENTS</h1>
          <p className="panel-sub">{items.length} clients total</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['all','hotel','corporate'].map(c => (
            <button key={c} className={catFilter === c ? 'btn-primary' : 'btn-ghost'} onClick={() => setCatFilter(c)}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
          <button className="btn-primary" onClick={openCreate}>+ Add</button>
        </div>
      </div>

      {loading ? <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Loading...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
          {filtered.map((c) => (
            <div
              key={c._id}
              style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                gap: 8
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--white)' }}>{c.name}</div>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: c.category === 'hotel' ? 'var(--gold)' : 'var(--cyan)', marginTop: 3 }}>{c.category}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <button className="btn-ghost" style={{ padding: '3px 10px', fontSize: 10 }} onClick={() => openEdit(c)}>✎</button>
                <button className="btn-danger" style={{ padding: '3px 10px', fontSize: 10 }} onClick={() => remove(c._id)}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box">
            <h2 className="modal-title">{editing ? 'EDIT CLIENT' : 'NEW CLIENT'}</h2>
            <div className="modal-form">
              <div className="modal-field"><label>Client Name</label><input name="name" value={form.name} onChange={h} placeholder="HSBC"/></div>
              <div className="modal-field">
                <label>Category</label>
                <select name="category" value={form.category} onChange={h}>
                  <option value="hotel">Hotel</option>
                  <option value="corporate">Corporate</option>
                </select>
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
