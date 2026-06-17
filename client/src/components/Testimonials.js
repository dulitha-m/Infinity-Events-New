import { useState, useEffect } from 'react';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    quote: "Infinity Events transformed our CHOGM state dinner into an extraordinary experience. The flawless execution, the scale of the LED wall installation — everything surpassed our highest expectations.",
    name: "Ministry of Foreign Affairs",
    role: "Government of Sri Lanka",
    category: "State Event",
    accent: "#00F5FF"
  },
  {
    quote: "Working with Infinity on the Akon Live concert in Maldives was seamless from start to finish. Their international artist management expertise and production standards are world-class.",
    name: "Maldives Tourism Authority",
    role: "Tourist Arrival Festival Organiser",
    category: "Live Concert",
    accent: "#FF2D78"
  },
  {
    quote: "Our Microsoft regional summit demanded perfection — tight timelines, complex AV requirements, and global brand standards. Infinity delivered on every single count.",
    name: "Microsoft Sri Lanka",
    role: "Corporate Events Director",
    category: "Corporate",
    accent: "#FFB800"
  },
  {
    quote: "The Hiru Golden Film Awards 2018 was the most spectacular ceremony we've ever staged. The pyrotechnics, the choreography, the production quality — audiences are still talking about it.",
    name: "Hiru TV",
    role: "Head of Production",
    category: "Awards Show",
    accent: "#9B30FF"
  },
  {
    quote: "Infinity managed the Miss Universe Sri Lanka national pageant with absolute professionalism. From lighting to choreography to stage design — the international benchmark was fully met.",
    name: "Miss Universe Sri Lanka",
    role: "National Pageant Director",
    category: "Pageant",
    accent: "#FF2D78"
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (idx) => {
    if (animating || idx === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 350);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      go((active + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [active]);

  const t = TESTIMONIALS[active];

  return (
    <section className="testimonials">
      <div className="testi-glow" style={{ '--t-accent': t.accent }} />
      <div className="testi-inner">
        <div className="testi-left reveal">
          <p className="eyebrow">Client Voices</p>
          <h2 className="section-title">WHAT THEY<br/>SAY</h2>
          <div className="testi-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`testi-dot ${i === active ? 'active' : ''}`}
                onClick={() => go(i)}
                style={i === active ? { background: t.accent, borderColor: t.accent } : {}}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
          <div className="testi-counter">
            <span className="testi-num">{String(active + 1).padStart(2, '0')}</span>
            <span className="testi-sep">/</span>
            <span className="testi-total">{String(TESTIMONIALS.length).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="testi-right reveal">
          <div className={`testi-card ${animating ? 'fading' : ''}`}>
            <span className="testi-category" style={{ color: t.accent, borderColor: t.accent }}>{t.category}</span>
            <div className="testi-quote-mark" style={{ color: t.accent }}>"</div>
            <p className="testi-quote">{t.quote}</p>
            <div className="testi-author">
              <div className="testi-avatar" style={{ '--t-accent': t.accent }}>
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-role">{t.role}</div>
              </div>
            </div>
          </div>

          <div className="testi-nav">
            <button className="testi-arrow" onClick={() => go((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}>←</button>
            <button className="testi-arrow" onClick={() => go((active + 1) % TESTIMONIALS.length)}>→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
