import './Footer.css';

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg viewBox="0 0 48 28" fill="none" className="footer-svg">
              <ellipse cx="14" cy="14" rx="10" ry="10" stroke="white" strokeWidth="2" fill="none" opacity="0.4"/>
              <ellipse cx="34" cy="14" rx="10" ry="10" stroke="white" strokeWidth="2" fill="none" opacity="0.4"/>
              <line x1="6" y1="5" x2="42" y2="23" stroke="white" strokeWidth="1.5" opacity="0.3"/>
            </svg>
            <span className="footer-logo-text">INFINITY EVENTS & ENTERTAINMENT™</span>
          </div>
          <p className="footer-tagline">Total Event Solutions · Beyond Boundaries</p>
          <div className="footer-hubs">
            {['🇺🇸 USA','🇦🇪 Dubai','🇲🇻 Maldives','🇮🇩 Indonesia','🇱🇰 Sri Lanka'].map(h => (
              <span key={h} className="footer-hub">{h}</span>
            ))}
          </div>
        </div>

        <div className="footer-nav-col">
          <p className="footer-col-title">Navigate</p>
          {['about','segments','services','highlights','clients','contact'].map(id => (
            <button key={id} className="footer-nav-btn" onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>

        <div className="footer-contact-col">
          <p className="footer-col-title">Contact</p>
          <div className="footer-contact-row">
            <span className="fc-label">WhatsApp</span>
            <a href="https://wa.me/13322224827" target="_blank" rel="noopener noreferrer" className="fc-val">+1 (332) 222-4827</a>
          </div>
          <div className="footer-contact-row">
            <span className="fc-label">Email</span>
            <a href="mailto:info@infinityeventsint.com" className="fc-val">info@infinityeventsint.com</a>
          </div>
          <div className="footer-contact-row">
            <span className="fc-label">Web</span>
            <a href="https://www.infinityeventsint.com" target="_blank" rel="noopener noreferrer" className="fc-val">www.infinityeventsint.com</a>
          </div>
          <div className="footer-socials">
            {[
              { label: 'f', href: 'https://facebook.com' },
              { label: 'in', href: 'https://instagram.com' },
              { label: '▶', href: 'https://youtube.com' },
              { label: '𝕏', href: 'https://twitter.com' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-icon">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">
          © {new Date().getFullYear()} Infinity Events & Entertainment Pvt Ltd · All Rights Reserved
        </div>
        <div className="footer-credit">
          Made by <a href="https://dubatech.solutions" target="_blank" rel="noopener noreferrer" className="footer-link">DuBaTeCh Solutions</a>
        </div>
      </div>
    </footer>
  );
}
