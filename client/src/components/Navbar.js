import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const NAV_ITEMS = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'segments', label: 'Segments' },
    { id: 'services', label: 'Services' },
    { id: 'stage', label: 'Stage' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'clients', label: 'Clients' },
    { id: 'events', label: 'Events' }
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/images/Logo.png" alt="Infinity Logo" className="nav-logo-img" />
        </div>

        <ul className="nav-links">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button onClick={() => scrollTo(item.id)} className="nav-btn">
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="nav-cta" onClick={() => scrollTo('contact')}>
            Get In Touch
          </button>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="mobile-links">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button onClick={() => scrollTo(item.id)} className="mobile-btn">
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <button onClick={() => scrollTo('contact')} className="mobile-btn mobile-cta">
              Get In Touch
            </button>
          </li>
        </ul>
        <div className="mobile-footer">
          <p>USA · Dubai · Maldives · Indonesia · Sri Lanka</p>
        </div>
      </div>
    </>
  );
}
