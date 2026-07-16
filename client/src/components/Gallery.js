import { useState } from 'react';
import './Gallery.css';

// Using high-quality custom local images
const GALLERY_ITEMS = [
  {
    id: 1,
    img: '/images/Hero1.jpg',
    label: 'Live Concert',
    title: 'International Artist Productions',
    size: 'tall',
  },
  {
    id: 2,
    img: '/images/Fashion.jpg',
    label: 'Fashion',
    title: 'High Fashion & Runway Shows',
    size: 'normal',
  },
  {
    id: 3,
    img: '/images/Wedding.jpg',
    label: 'Weddings',
    title: 'Dream Wedding Celebrations',
    size: 'normal',
  },
  {
    id: 4,
    img: '/images/Social.jpg',
    label: 'Social Events',
    title: 'Vibrant Festivals & Social Galas',
    size: 'wide',
  },
  {
    id: 5,
    img: '/images/Wedding2.jpg',
    label: 'Ceremonies',
    title: 'Exquisite Wedding Ceremonies',
    size: 'wide',
  },
  {
    id: 6,
    img: '/images/Art.jpg',
    label: 'Performing Arts',
    title: 'Theatre & Lighting Masterpieces',
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
              style={{ backgroundImage: `url("${item.img}")` }}
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
