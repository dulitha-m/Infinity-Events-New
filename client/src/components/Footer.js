import './Footer.css';

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/images/Logo.png" alt="Infinity Logo" className="footer-logo-img" />
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
