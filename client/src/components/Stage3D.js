import { Suspense, useState, lazy } from 'react';
import './Stage3D.css';

const Stage3DScene = lazy(() => import('./Stage3DScene'));

const PALETTES = {
  gold: { name: 'Gold', primary: '#C9973A', secondary: '#E8B84B', laser: '#FFD27A' },
  crimson: { name: 'Crimson', primary: '#C2185B', secondary: '#FF4D8D', laser: '#FF6FA8' },
  violet: { name: 'Violet', primary: '#7C3AED', secondary: '#A78BFA', laser: '#B79CFF' },
  ice: { name: 'Ice', primary: '#38BDF8', secondary: '#7DD3FC', laser: '#9CE8FF' },
};

export default function Stage3D() {
  const [paletteKey, setPaletteKey] = useState('gold');
  const palette = PALETTES[paletteKey];

  return (
    <section className="stage3d" id="stage">
      <div className="stage3d-header reveal">
        <p className="eyebrow">Live Production</p>
        <h2 className="section-title">THE STAGE<br/>EXPERIENCE</h2>
        <p className="stage3d-sub">
          An interactive look at the production scale Infinity brings to every show —
          trussing, LED walls, moving lights and laser arrays. Drag to explore, and
          switch the show mode below.
        </p>
        <div className="mode-switcher">
          {Object.entries(PALETTES).map(([key, p]) => (
            <button
              key={key}
              className={`mode-btn ${paletteKey === key ? 'active' : ''}`}
              style={{ '--mode-color': p.primary }}
              onClick={() => setPaletteKey(key)}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="stage3d-canvas-wrap reveal">
        <Suspense fallback={<div className="stage3d-loading">Loading 3D scene…</div>}>
          <Stage3DScene palette={palette} />
        </Suspense>
        <div className="stage3d-hint">Drag to rotate · Scroll to zoom</div>
      </div>
    </section>
  );
}
