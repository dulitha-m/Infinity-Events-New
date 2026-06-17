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

  const NAV_ITEMS = ['about','segments','services','stage','clients','highlights'];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg viewBox="0 0 48 28" fill="none" className="logo-svg">
            <ellipse cx="14" cy="14" rx="10" ry="10" stroke="white" strokeWidth="2.5" fill="none"/>
            <ellipse cx="34" cy="14" rx="10" ry="10" stroke="white" strokeWidth="2.5" fill="none"/>
            <line x1="6" y1="5" x2="42" y2="23" stroke="white" strokeWidth="2" opacity="0.6"/>
            <line x1="6" y1="3" x2="42" y2="21" stroke="white" strokeWidth="1.5" opacity="0.3"/>
          </svg>
          INFINITY
        </div>

        <ul className="nav-links">
          {NAV_ITEMS.map(id => (
            <li key={id}>
              <button onClick={() => scrollTo(id)} className="nav-btn">
                {id.charAt(0).toUpperCase() + id.slice(1)}
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
          {NAV_ITEMS.map(id => (
            <li key={id}>
              <button onClick={() => scrollTo(id)} className="mobile-btn">
                {id.charAt(0).toUpperCase() + id.slice(1)}
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
