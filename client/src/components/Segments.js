import { useEffect, useState } from 'react';
import { getSegments } from '../api';
import './Segments.css';

export default function Segments() {
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    getSegments().then(({ data }) => setSegments(data)).catch(console.error);
  }, []);

  return (
    <section className="segments" id="segments">
      <div className="seg-header reveal">
        <p className="eyebrow">What We Do</p>
        <h2 className="section-title">THE UNIVERSE<br/>OF INFINITY</h2>
      </div>
      <div className="bento-grid reveal">
        {segments.map((seg) => (
          <div
            key={seg._id}
            className={`bento-card ${seg.isWide ? 'wide' : ''}`}
            style={{
              '--accent': seg.accentColor,
              '--span': seg.gridSpan,
              background: seg.imageUrl
                ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${seg.imageUrl})`
                : seg.bgGradient
            }}
          >
            <div className="card-number">{String(seg.order).padStart(2,'0')}</div>
            <div className="card-border" style={{ '--accent': seg.accentColor }} />
            <div className="card-body">
              <div className="card-icon">{seg.icon}</div>
              <div className="card-label" style={{ color: seg.accentColor }}>{seg.label}</div>
              <div className="card-title">{seg.title}</div>
              <div className="card-sub">{seg.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
