import { useState, useEffect } from 'react';
import { useCrudPanel } from './useCrudPanel';

const EMPTY = { order: 1, name: '', description: '' };

export default function ServicesPanel() {
  const { items, loading, modal, editing, openCreate, openEdit, closeModal, save, remove } = useCrudPanel('services');
  const [form, setForm] = useState(EMPTY);

  useEffect(() => { setForm(editing || EMPTY); }, [editing]);
  const h = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <div className="panel-header">
        <div>
          <h1 className="panel-title">SERVICES</h1>
          <p className="panel-sub">Manage the accordion services list</p>
        </div>
        <button className="btn-primary" onClick={openCreate}>+ Add Service</button>
      </div>

      {loading ? <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Loading...</p> : (
        <table className="admin-table">
          <thead><tr><th>#</th><th>Service Name</th><th>Description</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map((s) => (
              <tr key={s._id}>
                <td>{s.order}</td>
                <td style={{ color: 'var(--white)', fontWeight: 500 }}>{s.name}</td>
                <td style={{ maxWidth: 360, color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
                  {s.description.slice(0, 80)}...
                </td>
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
            <h2 className="modal-title">{editing ? 'EDIT SERVICE' : 'NEW SERVICE'}</h2>
            <div className="modal-form">
              <div className="modal-field"><label>Order</label><input name="order" type="number" value={form.order} onChange={h}/></div>
              <div className="modal-field"><label>Service Name</label><input name="name" value={form.name} onChange={h} placeholder="International Artist Management"/></div>
              <div className="modal-field"><label>Description</label><textarea name="description" value={form.description} onChange={h} rows={4} placeholder="Describe this service..."/></div>
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
