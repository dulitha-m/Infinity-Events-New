import './Ticker.css';

const ITEMS = ['AKON LIVE','SEAN PAUL LIVE','SHREYA GHOSHAL LIVE','CHOGM 2013','SUN FEST 2015','MISS UNIVERSE SRI LANKA','PRIYANKA CHOPRA LIVE','HIRU GOLDEN FILM AWARDS'];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            {item} <span className="ticker-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
