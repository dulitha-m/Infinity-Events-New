import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  useEffect(() => {
    const move = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (dot.current) { dot.current.style.left = mouseX + 'px'; dot.current.style.top = mouseY + 'px'; }
    };
    document.addEventListener('mousemove', move);

    let raf;
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ring.current) { ring.current.style.left = ringX + 'px'; ring.current.style.top = ringY + 'px'; }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => { document.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
