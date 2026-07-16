import { useEffect, useRef, useState, useCallback } from 'react';
import './Hero.css';

// Full-screen cinematic event slides
const SLIDES = [
  {
    id: 1,
    img: '/images/Hero1.jpg',
    label: 'Live Entertainment',
    title: 'International\nConcerts',
    sub: 'Akon · Sean Paul · Priyanka Chopra',
    accent: '#C9973A',
  },
  {
    id: 2,
    img: '/images/Fashion.jpg',
    label: 'Fashion & Pageants',
    title: 'Fashion\nShowcase',
    sub: 'Miss Universe Sri Lanka · Mister International SL',
    accent: '#C9973A',
  },
  {
    id: 3,
    img: '/images/Wedding.jpg',
    label: 'Bespoke Planners',
    title: 'Dream\nWeddings',
    sub: 'Weddings by Carren Brown™ · Full-service concierge planning',
    accent: '#9B30FF',
  },
  {
    id: 4,
    img: '/images/Social.jpg',
    label: 'Elite Social',
    title: 'Social\nEvents',
    sub: 'VIP Red Carpets · Creative Theme Extravaganzas · Private Celebrations',
    accent: '#FF2D78',
  },
  {
    id: 5,
    img: '/images/Wedding2.jpg',
    label: 'Exquisite Settings',
    title: 'Bespoke\nCathedrals',
    sub: 'Meticulous details for a perfect, timeless ceremony',
    accent: '#FFB800',
  },
  {
    id: 6,
    img: '/images/Art.jpg',
    label: 'Visual Artistry',
    title: 'Theatre\n& Arts',
    sub: 'Projection mapping · Architectural lighting · National productions',
    accent: '#00F5FF',
  },
];

const TICKER_ITEMS = [
  'AKON LIVE', 'SEAN PAUL LIVE', 'SHREYA GHOSHAL LIVE',
  'CHOGM 2013', 'SUN FEST 2015', 'MISS UNIVERSE SRI LANKA',
  'PRIYANKA CHOPRA LIVE', 'HIRU GOLDEN FILM AWARDS',
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);
  const timerRef = useRef(null);
  const DURATION = 5000;

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.1,
      color: ['#C9973A','#C2185B','#7C3AED','#38BDF8'][Math.floor(Math.random() * 4)]
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  // Auto-slide with progress
  const goTo = useCallback((idx) => {
    if (transitioning) return;
    setPrev(current);
    setTransitioning(true);
    setProgress(0);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
      setPrev(null);
    }, 700);
  }, [current, transitioning]);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed < DURATION) {
        timerRef.current = requestAnimationFrame(tick);
      } else {
        goTo((current + 1) % SLIDES.length);
      }
    };
    timerRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(timerRef.current);
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section className="hero" id="hero" style={{ '--accent': slide.accent }}>

      {/* Slide backgrounds */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`slide-bg ${i === current ? 'active' : ''} ${i === prev ? 'exiting' : ''}`}
          style={{ backgroundImage: `url("${s.img}")` }}
        />
      ))}

      {/* Dark cinematic overlay */}
      <div className="slide-overlay" />

      {/* Accent colour vignette */}
      <div className="slide-vignette" style={{ '--accent': slide.accent }} />

      {/* Particle layer */}
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Left edge accent bar */}
      <div className="hero-edge-bar" style={{ background: slide.accent }} />

      {/* Main Content */}
      <div className="hero-content">
        {/* Category label */}
        <div className={`hero-category ${transitioning ? 'fade-exit' : 'fade-enter'}`} key={`cat-${current}`}>
          <span className="category-line" style={{ background: slide.accent }} />
          <span className="category-text" style={{ color: slide.accent }}>{slide.label}</span>
        </div>

        {/* Eyebrow */}
        <p className="hero-eyebrow">Total Event Solutions · Beyond Boundaries</p>

        {/* Big title */}
        <h1 className={`hero-title ${transitioning ? 'title-exit' : 'title-enter'}`} key={`title-${current}`}>
          <span className="line-1">INFINITY</span>
          <span className="line-2" style={{
            background: `linear-gradient(135deg, ${slide.accent} 0%, #fff 60%, ${slide.accent} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>EVENTS</span>
        </h1>

        {/* Sub line */}
        <p className={`hero-sub ${transitioning ? 'fade-exit' : 'fade-enter'}`} key={`sub-${current}`}>
          {slide.sub}
        </p>

        <p className="hero-tagline">USA · Dubai · Maldives · Indonesia · Sri Lanka</p>

        <div className="hero-actions">
          <button
            className="hero-cta primary"
            style={{ '--btn-accent': slide.accent }}
            onClick={() => document.getElementById('segments')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Experience The Infinity</span>
            <span className="cta-arrow">→</span>
          </button>
          <button
            className="hero-cta secondary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Get In Touch</span>
          </button>
        </div>
      </div>

      {/* Right-side slide navigator */}
      <div className="hero-nav">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            className={`slide-nav-btn ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={s.label}
            style={i === current ? { '--btn-accent': s.accent } : {}}
          >
            <span className="nav-dot" style={i === current ? { background: s.accent } : {}} />
            {i === current && (
              <span className="nav-label" style={{ color: s.accent }}>{s.label}</span>
            )}
          </button>
        ))}
      </div>

      {/* Bottom progress bar */}
      <div className="hero-progress-wrap">
        <div className="hero-progress-slides">
          {SLIDES.map((s, i) => (
            <div key={s.id} className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: i === current ? `${progress}%` : i < current ? '100%' : '0%',
                  background: s.accent,
                }}
              />
            </div>
          ))}
        </div>
        <div className="progress-counter">
          <span className="p-cur">{String(current + 1).padStart(2, '0')}</span>
          <span className="p-sep"> / </span>
          <span className="p-tot">{String(SLIDES.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Running event ticker */}
      <div className="hero-ticker">
        <div className="hero-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="hero-ticker-item">
              {item} <span className="ticker-gem">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll">
        <span className="scroll-label">Scroll</span>
        <div className="scroll-line" style={{ background: `linear-gradient(to bottom, ${slide.accent}, transparent)` }} />
      </div>
    </section>
  );
}
