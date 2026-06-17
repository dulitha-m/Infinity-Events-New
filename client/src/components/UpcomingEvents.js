import { useEffect, useState } from 'react';
import { getEvents } from '../api';
import './UpcomingEvents.css';

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    getEvents().then(({ data }) => setEvents(data)).catch(console.error);
  }, []);

  if (!events.length) return null;

  const featured = events.filter(e => e.isFeatured);
  const rest = events.filter(e => !e.isFeatured);

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d)) return dateStr;
      return {
        day: d.toLocaleDateString('en-US', { day: '2-digit' }),
        month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
        year: d.getFullYear(),
      };
    } catch {
      return { day: '--', month: '---', year: '----' };
    }
  };

  return (
    <section className="upcoming-events" id="events">
      {/* Section Header */}
      <div className="ue-header reveal">
        <p className="eyebrow">What's On</p>
        <h2 className="section-title">UPCOMING<br/>EVENTS</h2>
        <p className="ue-subtitle">Exclusive events, live performances & premium experiences curated by Infinity</p>
      </div>

      {/* Featured Events */}
      {featured.length > 0 && (
        <div className="ue-featured reveal">
          {featured.map((ev, i) => {
            const dt = formatDate(ev.date);
            return (
              <div
                key={ev._id}
                className={`ue-hero-card ${i === activeIdx ? 'active' : ''}`}
                style={{
                  backgroundImage: ev.imageUrl
                    ? `linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 100%), url(${ev.imageUrl})`
                    : undefined,
                  background: !ev.imageUrl
                    ? `linear-gradient(135deg, #1a0a00, #2a1500)`
                    : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="ue-hero-glow" style={{ '--ev-accent': ev.accentColor }} />
                <div className="ue-hero-content">
                  <div className="ue-hero-left">
                    <span className="ue-category-tag" style={{ borderColor: ev.accentColor, color: ev.accentColor }}>
                      {ev.category}
                    </span>
                    <div className="ue-hero-title">{ev.title}</div>
                    {ev.artist && <div className="ue-hero-artist">ft. {ev.artist}</div>}
                    <p className="ue-hero-desc">{ev.description}</p>
                    <div className="ue-hero-meta">
                      <span className="ue-meta-item">📍 {ev.location}</span>
                    </div>
                    {ev.ticketUrl && (
                      <a
                        href={ev.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ue-ticket-btn"
                        style={{ '--ev-accent': ev.accentColor }}
                      >
                        GET TICKETS →
                      </a>
                    )}
                  </div>
                  <div className="ue-hero-date-block" style={{ '--ev-accent': ev.accentColor }}>
                    {typeof dt === 'object' ? (
                      <>
                        <div className="ue-date-day">{dt.day}</div>
                        <div className="ue-date-month">{dt.month}</div>
                        <div className="ue-date-year">{dt.year}</div>
                      </>
                    ) : (
                      <div className="ue-date-day" style={{ fontSize: 18 }}>{dt}</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {featured.length > 1 && (
            <div className="ue-featured-dots">
              {featured.map((_, i) => (
                <button
                  key={i}
                  className={`ue-dot ${i === activeIdx ? 'active' : ''}`}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* All Other Events Grid */}
      {rest.length > 0 && (
        <div className="ue-grid reveal">
          {rest.map((ev) => {
            const dt = formatDate(ev.date);
            return (
              <div key={ev._id} className="ue-card" style={{ '--ev-accent': ev.accentColor }}>
                {ev.imageUrl && (
                  <div
                    className="ue-card-img"
                    style={{ backgroundImage: `url(${ev.imageUrl})` }}
                  />
                )}
                {!ev.imageUrl && (
                  <div
                    className="ue-card-img ue-card-img-placeholder"
                    style={{ background: `linear-gradient(135deg, #1a0010, #0a0a1a)` }}
                  >
                    <span style={{ fontSize: 40 }}>🎭</span>
                  </div>
                )}
                <div className="ue-card-body">
                  <div className="ue-card-top">
                    <span className="ue-category-tag" style={{ borderColor: ev.accentColor, color: ev.accentColor }}>
                      {ev.category}
                    </span>
                    <div className="ue-card-date">
                      {typeof dt === 'object'
                        ? `${dt.day} ${dt.month} ${dt.year}`
                        : dt}
                    </div>
                  </div>
                  <div className="ue-card-title">{ev.title}</div>
                  {ev.artist && <div className="ue-card-artist">ft. {ev.artist}</div>}
                  <div className="ue-card-location">📍 {ev.location}</div>
                  {ev.description && <p className="ue-card-desc">{ev.description}</p>}
                  {ev.ticketUrl && (
                    <a
                      href={ev.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ue-card-link"
                      style={{ color: ev.accentColor }}
                    >
                      GET TICKETS →
                    </a>
                  )}
                </div>
                <div className="ue-card-border" />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
