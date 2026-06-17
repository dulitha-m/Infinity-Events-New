import './About.css';

const MISSIONS = [
  { num: '01', text: 'Work with clients for their long-term benefit' },
  { num: '02', text: 'Constantly research & develop new strategies, technologies and skills' },
  { num: '03', text: 'Provide exceptional service with constant communication' },
  { num: '04', text: 'Balance creativity with competent execution for outstanding results' },
];

const HUBS = ['🇺🇸 USA','🇦🇪 Dubai','🇲🇻 Maldives','🇮🇩 Indonesia','🇱🇰 Sri Lanka'];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-watermark">INFINITY</div>

      <div className="about-left reveal">
        <p className="eyebrow">Who We Are</p>
        <h2 className="section-title">CRAFTING<br/>THE<br/>EXTRAORDINARY</h2>
        <p className="about-text">
          <strong>Infinity Events & Entertainment™</strong> is a global provider of integrated solutions and services for events, spanning Sri Lanka and overseas. Fuelled by passion and big ideas, we deliver customized, strategic event experiences where guests connect in ways that are <strong>personally relevant and unforgettable</strong>.
        </p>
        <p className="about-text mt">
          From intimate private galas to 2,000-person state dinners for Commonwealth Heads of Government — we balance <strong>creative vision with flawless execution</strong>.
        </p>
        <div className="globe-tags">
          {HUBS.map(h => <span className="globe-tag" key={h}>{h}</span>)}
        </div>
      </div>

      <div className="about-visual reveal">
        <div className="visual-photo" />
        <div className="visual-glow" />
        <div className="mission-list">
          {MISSIONS.map(m => (
            <div className="mission-item" key={m.num}>
              <span className="mission-num">{m.num}</span>
              <p className="mission-text">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
