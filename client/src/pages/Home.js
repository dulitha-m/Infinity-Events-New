import { useEffect } from 'react';
import Hero from '../components/Hero';
import StatsStrip from '../components/StatsStrip';
import About from '../components/About';
import Ticker from '../components/Ticker';
import Segments from '../components/Segments';
import Services from '../components/Services';
import Stage3D from '../components/Stage3D';
import Gallery from '../components/Gallery';
import Highlights from '../components/Highlights';
import Clients from '../components/Clients';
import UpcomingEvents from '../components/UpcomingEvents';
import Contact from '../components/Contact';
import ScrollToTop from '../components/ScrollToTop';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <StatsStrip />
      <About />
      <Ticker />
      <Segments />
      <Services />
      <Stage3D />
      <Gallery />
      <Highlights />
      <Clients />
      <UpcomingEvents />
      <Contact />
      <ScrollToTop />
    </>
  );
}
