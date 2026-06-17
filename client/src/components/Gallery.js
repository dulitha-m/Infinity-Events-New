import { useState } from 'react';
import './Gallery.css';

// Using high-quality Unsplash images — real event/concert photography
const GALLERY_ITEMS = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=900&q=80',
    label: 'Live Concert',
    title: 'International Artist Productions',
    size: 'tall',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=80',
    label: 'Festivals',
    title: 'Outdoor Music Festivals',
    size: 'normal',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80',
    label: 'Corporate',
    title: 'Brand & Corporate Events',
    size: 'normal',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1000&q=80',
    label: 'State Events',
    title: 'Gala Dinners & State Events',
    size: 'wide',
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?w=700&q=80',
    label: 'Fashion',
    title: 'Fashion Shows & Pageants',
    size: 'normal',
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1478147427282-58a87a433a74?w=700&q=80',
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
