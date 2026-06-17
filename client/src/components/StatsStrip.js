import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { getStats } from '../api';
import './StatsStrip.css';

export default function StatsStrip() {
  const [stats, setStats] = useState([]);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    getStats().then(({ data }) => setStats(data)).catch(console.error);
  }, []);

  return (
    <div className="stats-strip reveal" ref={ref}>
      {stats.map((s) => (
        <div className="stat-item" key={s._id}>
          <div className="stat-number">
            {inView ? <CountUp end={parseInt(s.value)} duration={2} /> : '0'}
            {s.suffix}
          </div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
