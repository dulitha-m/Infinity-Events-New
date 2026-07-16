import { useEffect, useState } from 'react';
import { getHighlights } from '../api';
import './Highlights.css';

// Fallback images for highlight cards when no imageUrl is set
const FALLBACK_IMAGES = [
  '/images/popup_concerts.png', // concert crowd
  '/images/popup_state.png',    // conference LED / State Event
  '/images/popup_outdoor.png',  // festival stage
  '/images/popup_theatre.png',  // awards ceremony / Performing Arts
  '/images/popup_fashion.png',  // fashion show
  '/images/popup_corporate.png',// corporate event
];

export default function Highlights() {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    getHighlights().then(({ data }) => setHighlights(data)).catch(console.error);
  }, []);

  return (
    <section className="highlights" id="highlights">
      <p className="eyebrow reveal">Landmark Moments</p>
      <h2 className="section-title reveal">PORTFOLIO<br/>HIGHLIGHTS</h2>
      <div className="hl-grid reveal">
        {highlights.map((h, idx) => (
          <div
            key={h._id}
            className="hl-card"
            style={{ '--h-accent': h.accentColor }}
          >
            <div
              className="hl-photo"
              style={{
                backgroundImage: `url("${h.imageUrl || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length]}")`
              }}
            />
            {/* Gradient overlay */}
            <div className="hl-bg" style={{ background: h.bgGradient }} />
            <div className="hl-lines" />
            <div className="hl-year">{h.year}</div>
            <div className="hl-arrow">→</div>
            <div className="hl-content">
              <span
                className="hl-tag"
                style={{ color: h.accentColor, borderColor: h.accentColor }}
              >
                {h.tag}
              </span>
              <div className="hl-name">{h.name}</div>
              <div className="hl-desc">{h.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
