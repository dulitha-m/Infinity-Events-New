import { useEffect, useState } from 'react';
import { getServices } from '../api';
import './Services.css';

export default function Services() {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    getServices().then(({ data }) => setServices(data)).catch(console.error);
  }, []);

  const handleSeeMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, services.length));
  };

  const handleSeeLess = () => {
    setVisibleCount(6);
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="services" id="services">
      <p className="eyebrow reveal">Our Capabilities</p>
      <h2 className="section-title reveal">THE INFINITY<br/>ARSENAL</h2>
      <div className="services-list">
        {services.slice(0, visibleCount).map((svc, i) => (
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

      {services.length > 6 && (
        <div className="see-more-container reveal visible">
          {visibleCount < services.length ? (
            <button className="see-more-btn" onClick={handleSeeMore}>
              <span>See More Capabilities</span>
              <span className="btn-arrow">↓</span>
            </button>
          ) : (
            <button className="see-more-btn see-less" onClick={handleSeeLess}>
              <span>See Less</span>
              <span className="btn-arrow">↑</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
}

