import { useEffect, useState } from 'react';
import { getServices } from '../api';
import './Services.css';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then(({ data }) => setServices(data)).catch(console.error);
  }, []);

  return (
    <section className="services" id="services">
      <p className="eyebrow reveal">What We Offer</p>
      <h2 className="section-title reveal">OUR SERVICES</h2>
      
      <div className="services-grid reveal">
        {services.map((svc, i) => (
          <div className="svc-card" key={svc._id || i}>
            <span className="svc-card-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="svc-card-name">{svc.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
