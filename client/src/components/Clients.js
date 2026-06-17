import { useEffect, useState } from 'react';
import { getClients } from '../api';
import './Clients.css';

export default function Clients() {
  const [tab, setTab] = useState('hotel');
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients(tab).then(({ data }) => setClients(data)).catch(console.error);
  }, [tab]);

  return (
    <section className="clients" id="clients">
      <p className="eyebrow reveal">Trusted By</p>
      <h2 className="section-title reveal">ELITE<br/>CLIENTELE</h2>
      <div className="client-tabs reveal">
        {['hotel','corporate'].map(t => (
          <button key={t} className={`tab-btn ${tab===t?'active':''}`} onClick={() => setTab(t)}>
            {t === 'hotel' ? 'Hotel Partners' : 'Corporate Clients'}
          </button>
        ))}
      </div>
      <div className="logos-grid reveal">
        {clients.map(c => (
          <div className="logo-cell" key={c._id}>
            <div className="logo-name">{c.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
