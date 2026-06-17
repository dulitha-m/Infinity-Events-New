import { useState } from 'react';
import './Gallery.css';

// Using high-quality custom local images
const GALLERY_ITEMS = [
  {
    id: 1,
    img: '/images/popup_concerts.png',
    label: 'Live Concert',
    title: 'International Artist Productions',
    size: 'tall',
  },
  {
    id: 2,
    img: '/images/popup_outdoor.png',
    label: 'Festivals',
    title: 'Outdoor Music Festivals',
    size: 'normal',
  },
  {
    id: 3,
    img: '/images/popup_corporate.png',
    label: 'Corporate',
    title: 'Brand & Corporate Events',
    size: 'normal',
  },
  {
    id: 4,
    img: '/images/popup_state.png',
    label: 'State Events',
    title: 'Gala Dinners & State Events',
    size: 'wide',
  },
  {
    id: 5,
    img: '/images/popup_fashion.png',
    label: 'Fashion',
    title: 'Fashion Shows & Pageants',
    size: 'normal',
  },
  {
    id: 6,
    img: '/images/popup_theatre.png',
    label: 'Theatre',
    title: 'Theatre & Performing Arts',
    size: 'normal',
  },
];

export default function Gallery() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="gallery" id="gallery">
      <div className="gallery-header reveal">
        <p className="eyebrow">Visual Showcase</p>
        <h2 className="section-title">THE INFINITY<br/>EXPERIENCE</h2>
        <p className="gallery-sub">Two decades of landmark productions — from intimate galas to stadium spectacles</p>
      </div>

      <div className="gallery-grid reveal">
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`gallery-item ${item.size} ${hovered === item.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="gallery-img"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            <div className="gallery-overlay">
              <span className="gallery-label">{item.label}</span>
              <p className="gallery-title">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
