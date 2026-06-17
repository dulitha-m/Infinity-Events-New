import { useEffect, useState } from 'react';
import { getContacts, updateContactStatus, deleteContact } from '../../api';
import toast from 'react-hot-toast';

const STATUS_COLORS = { new: 'status-new', read: 'status-read', replied: 'status-replied' };

export default function InboxPanel() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await getContacts(filter ? { status: filter } : {});
      setContacts(data.inquiries || []);
    } catch { toast.error('Failed to load inquiries'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [filter]);

  const setStatus = async (id, status) => {
    try {
      await updateContactStatus(id, status);
      toast.success('Status updated');
      load();
      if (selected?._id === id) setSelected({ ...selected, status });
    } catch { toast.error('Failed to update'); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await deleteContact(id);
      toast.success('Deleted');
      setSelected(null);
      load();
    } catch { toast.error('Failed to delete'); }
  };

  const fmt = (d) => new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div>
      <div className="panel-header">
        <div>
          <h1 className="panel-title">INQUIRIES</h1>
          <p className="panel-sub">{contacts.length} inquiries {filter && `· filtered: ${filter}`}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['', 'new', 'read', 'replied'].map((s) => (
            <button
              key={s}
              className={filter === s ? 'btn-primary' : 'btn-ghost'}
              onClick={() => setFilter(s)}
            >
              {s || 'All'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: 24 }}>
        {/* Table */}
        <div>
          {loading ? (
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Loading...</p>
          ) : contacts.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>No inquiries found.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr
                    key={c._id}
                    onClick={() => setSelected(c)}
                    style={{ cursor: 'pointer', background: selected?._id === c._id ? 'rgba(0,245,255,0.04)' : '' }}
                  >
                    <td>
                      <div style={{ fontWeight: 500, color: 'var(--white)' }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{c.email}</div>
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>{c.eventType}</td>
                    <td style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>{fmt(c.createdAt)}</td>
                    <td><span className={`status-badge ${STATUS_COLORS[c.status]}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail pane */}
        {selected && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <span className={`status-badge ${STATUS_COLORS[selected.status]}`}>{selected.status}</span>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 18, cursor: 'pointer' }}>✕</button>
            </div>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 28, letterSpacing: 2, marginBottom: 4 }}>{selected.name}</h3>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{selected.email}</p>
            {selected.phone && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{selected.phone}</p>}
            <p style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>{selected.eventType} · {fmt(selected.createdAt)}</p>
            <div style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', marginBottom: 28, padding: '16px', background: 'rgba(255,255,255,0.03)', borderLeft: '2px solid var(--cyan)' }}>
              {selected.message}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['new','read','replied'].map((s) => (
                <button
                  key={s}
                  className={selected.status === s ? 'btn-primary' : 'btn-ghost'}
                  onClick={() => setStatus(selected._id, s)}
                >
                  Mark {s}
                </button>
              ))}
              <button className="btn-danger" onClick={() => remove(selected._id)}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
