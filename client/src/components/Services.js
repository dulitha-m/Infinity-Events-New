import { useEffect, useState } from 'react';
import { getServices } from '../api';
import './Services.css';

export default function Services() {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    getServices().then(({ data }) => setServices(data)).catch(console.error);
  }, []);

  return (
    <section className="services" id="services">
      <p className="eyebrow reveal">Our Capabilities</p>
      <h2 className="section-title reveal">THE INFINITY<br/>ARSENAL</h2>
      <div className="services-list">
        {services.map((svc, i) => (
          <div className={`svc-item ${open === i ? 'open' : ''}`} key={svc._id}>
            <button className="svc-header" onClick={() => setOpen(open === i ? null : i)}>
              <div className="svc-left">
                <span className="svc-num">{String(i+1).padStart(2,'0')}</span>
                <span className="svc-name">{svc.name}</span>
              </div>
              <div className="svc-toggle">+</div>
            </button>
            <div className="svc-body">
              <p className="svc-content">{svc.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
