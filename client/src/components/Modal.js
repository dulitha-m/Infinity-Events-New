import React, { useEffect } from 'react';
import './Modal.css';

const FALLBACKS = {
  1: {
    imageUrl: '/images/CORPORATE SECTOR.png',
    description: 'We specialize in brand building campaigns and product launches creating a buzz around the media, consumers, buyers and business and entertainment communities. We provide marketing services to our clients re-building brands or starting from scratch Our team of professionals also execute Media campaigns to Media conferences with a high percentage of success',
    details: 'We create custom management tools to convey the clients message to the media in a way that it will portray a positive connection to the target audience. From social media management, to press kit design and press releases, the client has the opportunity to be placed in press and media as well as executing successful events',
    offerings: []
  },
  2: {
    imageUrl: '/images/STATE EVENTS.png',
    description: 'Having first hand expertise in handling many high profile state events over the past years, we reached it’s pinnacle when we were assigned to handle The Common Wealth Heads of Business Formal Dinner of 2000 pax hosted by the president of Sri Lanka and five other major sideline events for the Commonwealth',
    details: 'Commonwealth Heads of Government meetings, which was held in Colombo, Sri Lanka during the month of November 2013.The events had to conform strictly to the guidelines given by the Commonwealth Secretariat in the United Kingdom and the Ministry of External Affairs of Sri Lanka.\n\nInfinity Events & Entertainment ™has the experience and the expertise, to handle such large scale events with excellent PR skills and knowledge in all aspects of protocol, seating plans, coordinating & meeting the requirements of VIP security & executing grand state/international events to exact precision.',
    offerings: []
  },
  3: {
    imageUrl: '/images/SOCIAL EVENTS.png',
    description: 'Whether you want to feel as if you have stepped into a whimsical land, journeyed through Paris or just want a funky fun fiesta with our “anything is possible” attitude we can help you make it happen.',
    details: 'You dream big. We make it happen. We will work with your vision and your budget and provide you with the best of our creativity, professional expertise, outstanding organizational abilities and deep knowledge of resources and contacts.',
    offerings: [
      'Fundraisers',
      'Galas',
      'Fashion shows',
      'VIP events',
      'New release parties',
      'Red carpet arrivals',
      'Sweet 16s',
      'Cocktails',
      'Engagement celebrations',
      'Private events',
      'Bridal showers',
      'Baby showers',
      'Anniversary celebrations',
      'Quinces'
    ]
  },
  4: {
    imageUrl: '/images/INTERNATIONAL EVENTS.png',
    description: 'Our International Experience in handling Mega scale Productions of – A * Listed artists is Significantly Showcased in USA , Indonesia, Maldives.',
    details: 'Total Production, from Contracting artists, Publicity, Press Conferences, PR, VIP arrangements, Flying in of Total equipment requirements per International riders, Stage Productions to Coordinations are what we have Deliveredto presission.',
    offerings: [
      'Maldives Toursit Arrival Countdown and New Year’s Party 2013',
      'Maldives Tourist Arrival Countdown and New Year’s Party 2014 ( Salim with Sulaiman and Band Live in Maldives )',
      'Maldives Tourist Arrival Music Festival January 2015 ( AKON Live In Maldives )',
      'Maldives Tourist Arrival Music festival 2015 ( Priyanka Chopra Live in Maldives )'
    ]
  },
  5: {
    imageUrl: '/images/FASHION EVENTS & MODELS.png',
    description: 'Being innovative and original is what counts in the tough world of fashion , fashion events and sourcing models for ramp, events and photoshoots. From the earliest conceptual stages to a live show we can help you deliver the right impression with impact and on budget.',
    details: '',
    offerings: []
  },
  6: {
    imageUrl: '/images/OUTDOOR EVENTS.png',
    description: 'IInfinity Events & Entertainment ™️ has vast experience in outdoor events in all types of environments.',
    details: 'From outdoorfestivals, to the most advanced LED screen constructions and large-scale building projections (video mapping). We carry a large inventory of outdoor LED screens and a large range of solutions for outdoor events of any scale.',
    offerings: []
  },
  7: {
    imageUrl: '/images/LIVE CONCERTS.png',
    description: 'Infinity Events & Entertainment ™️ is widely known for providing high intensity entertainment to its patrons. Through years of the team’s combined and diverse experiences, Infinity Events & Entertainment ™️ has developed a way of uniquely creating theatrical and awe-inspiring live productions that not only leave people breathless, but also one that allows its participating artists and patrons to leave with a story and unforgettable memories about their experience.',
    details: 'Infinity Events & Entertainment ™️ common goal is to provide its customers and artists with an environment that will allow them both to be free to enjoy an experience of a lifetime, because every stage has its platform.',
    offerings: []
  },
  8: {
    imageUrl: '/images/WEDDINGS.png',
    description: 'Weddings will be done by our wedding specialist Carren Brown ™ Which specialises in full-service wedding planning and design for the discerning couple who are looking for personalised concierge-style service. Every detail of your wedding will be meticulously managed by the exceptional planning capabilities, contacts and resources of the Caren Brown™* production team.',
    details: 'From flowers to the linens, to the hard-to-source antique china and sterling flatware, we only work with the best professionals in the industry, including nationally recognized photographers, musicians, entertainers, floral designers, caterers, venues, and other vendors. We’ll handle both the big picture and the smallest details so that you are free to enjoy every moment of your wedding with your guests.\n\nWhether your budget calls for a stunning, intimate ceremony with only your closest family members, or an over-the-top extravaganza for hundreds of your friends, we will make sure that every aspect is handled professionally. elegantly. sustainably and perfectly for you on your special day with a wedding planner who cares about the perfection of your day as much as you do.',
    offerings: []
  },
  9: {
    imageUrl: '/images/THEATRE & ARTS.png',
    description: 'Helping the performing arts conceive, design and deliver a new perspective is always an exciting challenge for Infinity Events and Entertainment ™️.',
    details: 'Thanks to an ongoing commitment to acquiring the newest video technologies and providing innovative technical solutions for our clients, we consider ourselves fortunate to be involved in many of this country’s leading Theatre & arts events.',
    offerings: []
  }
};

const POPUP_IMAGES = {
  1: '/images/popup_corporate.png',
  2: '/images/popup_state.png',
  3: '/images/popup_social.png',
  4: '/images/popup_international.png',
  5: '/images/popup_fashion.png',
  6: '/images/popup_outdoor.png',
  7: '/images/popup_concerts.png',
  8: '/images/popup_weddings.png',
  9: '/images/popup_theatre.png'
};

export default function Modal({ isOpen, onClose, item }) {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  // Resolve properties using database values or fallbacks
  const fallback = FALLBACKS[item.order] || {};
  const description = item.description || fallback.description || '';
  const details = item.details || fallback.details || '';
  const offerings = item.offerings && item.offerings.length > 0 ? item.offerings : (fallback.offerings || []);
  const imageUrl = POPUP_IMAGES[item.order] || item.imageUrl || fallback.imageUrl || '';

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={handleOverlayClick}
      style={{ '--accent': item.accentColor || '#FF2D78' }}
    >
      <div className="modal-card">
        {/* Absolute positioned close button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        {/* Modal Banner Image */}
        {imageUrl && (
          <div className="modal-banner">
            <img src={imageUrl} alt={item.title} className="modal-banner-img" />
            <div className="modal-banner-overlay" />
          </div>
        )}

        <div className="modal-card-inner">
          {/* Modal Header */}
          <header className="modal-header">
            <div className="modal-icon-box">
              <span className="modal-icon">{item.icon}</span>
            </div>
            <div className="modal-header-text">
              <span className="modal-eyebrow" style={{ color: item.accentColor }}>
                {item.label}
              </span>
              <h2 className="modal-title">{item.title}</h2>
              {item.sub && <p className="modal-subtitle">{item.sub}</p>}
            </div>
          </header>

          {/* Modal Body */}
          <div className="modal-body">
            {description && <p className="modal-desc-highlight">{description}</p>}
            {details && <p className="modal-desc-secondary" style={{ whiteSpace: 'pre-line', marginTop: '16px' }}>{details}</p>}
          </div>

          {/* Offerings Section */}
          {offerings && offerings.length > 0 && (
            <div className="modal-offerings-box">
              <h3 className="modal-offerings-title">KEY DETAILS & PROJECTS</h3>
              <ul className="modal-offerings-list">
                {offerings.map((offering, idx) => (
                  <li key={idx} className="modal-offering-item">
                    <span className="modal-bullet" style={{ backgroundColor: item.accentColor }} />
                    <span className="modal-offering-text">{offering}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
