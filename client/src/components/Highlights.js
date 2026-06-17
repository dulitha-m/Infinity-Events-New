import { useEffect, useState } from 'react';
import { getHighlights } from '../api';
import './Highlights.css';

// Fallback images for highlight cards when no imageUrl is set
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', // concert crowd
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', // conference LED
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80', // festival stage
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80', // awards ceremony
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80', // fashion show
  'https://images.unsplash.com/photo-1488229297570-58520851e868?w=800&q=80', // corporate event
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
            {/* Real photographic background */}
            <div
              className="hl-photo"
              style={{
                backgroundImage: `url(${h.imageUrl || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length]})`
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
