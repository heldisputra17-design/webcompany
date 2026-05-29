import { useEffect, useRef } from 'react';
import AsciiWaveHero from './AsciiWaveHero';

export default function Hero() {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = indicatorRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transition = 'opacity 1s ease';
    const timer = setTimeout(() => {
      el.style.opacity = '1';
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: '#0F0F0F',
        overflow: 'hidden',
      }}
    >
      <AsciiWaveHero />

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
        className="animate-bounce-chevron"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
