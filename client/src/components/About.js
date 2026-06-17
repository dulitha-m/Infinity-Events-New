import './About.css';

const SEGMENTS = [
  'Booking, Promoting, Managing International Artists , Entertainers, Performers',
  'Booking, Promoting, Managing International Events',
  'Booking, promoting, Managing fashion events and models',
  'Congresses and Conventions',
  'Cultural, Sports and Political Events,',
  'Trade Fairs, Exhibitions, Social & Private Events for Professionals, Corporate Clientele and the General Public'
];

const MISSIONS = [
  'To work with our clients for their long term benefit',
  'To constantly research and develop new strategies, technologies and skills',
  'To provide an exceptional service',
  'To maintain constant communication'
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-watermark">INFINITY</div>

      <div className="about-left reveal">
        <p className="eyebrow">ABOUT US</p>
        <h2 className="section-title">INFINITY EVENTS &<br />ENTERTAINMENT ™</h2>
        
        <p className="about-text">
          Infinity Events & Entertainment ™ is a provider of integrated solutions and services for events in Sri Lanka and Over-seas, covering the market’s six main segments:
        </p>

        <ul className="about-segments-list">
          {SEGMENTS.map((seg, idx) => (
            <li key={idx} className="about-segment-item">
              <span className="about-bullet">•</span>
              <span className="about-segment-text">{seg}</span>
            </li>
          ))}
        </ul>

        <p className="about-text mt">
          We are a full-service event planning company that provides complete planning, consulting, and supervision for both corporate and social events. Fuelled by passion and big ideas, we provide customized, strategic event experiences where guests connect with our clients in ways that are personally relevant and memorable! Our team offers the creative vision, professionalism, and event expertise to create spectacular events with a constant eye towards detail, quality, originality, and results. Infinity Events & Entertainment ™, believes 100% in the team we have put together.
        </p>

        <p className="about-text mt">
          Everything from the invitations, cocktails, wine list, music, flowers and menu will receive our expert attention so that you can relax and be a welcoming host to your guests.
        </p>
      </div>

      <div className="about-right reveal">
        <p className="eyebrow">OUR MISSION</p>
        <div className="mission-list">
          {MISSIONS.map((m, idx) => (
            <div className="mission-item" key={idx}>
              <span className="mission-num">0{idx + 1}</span>
              <p className="mission-text">{m}</p>
            </div>
          ))}
        </div>

        <div className="philosophy-box">
          <p className="philosophy-highlight">
            Successful projects require a balance of creativity and competent execution. These elements need to work together to achieve outstanding results. Too often a great idea is let down by poor production techniques, or an idea is too production orientated or over-produced and lacking in creativity.
          </p>
          <p className="philosophy-text mt">
            We offer our clients the peace of mind that comes with having a solid, secure and professional organisation dedicated to create exemplary productions and events.
          </p>
        </div>
      </div>
    </section>
  );
}

