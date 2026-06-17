import './Ticker.css';

const ITEMS = ['AKON LIVE','SEAN PAUL LIVE','SHREYA GHOSHAL LIVE','CHOGM 2013','SUN FEST 2015','MISS UNIVERSE SRI LANKA','PRIYANKA CHOPRA LIVE','HIRU GOLDEN FILM AWARDS'];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker-container reveal">
      <div className="ticker-header">
        <p className="eyebrow">Collaborative Success</p>
        <h2 className="ticker-heading">PARTNER EVENTS</h2>
      </div>
      <div className="ticker-wrap">
        <div className="ticker-track">
          {doubled.map((item, i) => (
            <span key={i} className="ticker-item">
              {item} <span className="ticker-dot">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
