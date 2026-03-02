'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!footerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const elements = footerRef.current.querySelectorAll('.footer-text');

    // Set initial state - hidden
    gsap.set(elements, { opacity: 0 });

    // Animate each footer element with masked reveal
    elements.forEach((el) => {
      SplitText.create(el, {
        type: 'words,lines',
        linesClass: 'footer-line',
        mask: 'lines',
        onSplit: (self) => {
          gsap.set(el, { opacity: 1 });
          gsap.from(self.lines, {
            duration: 0.8,
            yPercent: 100,
            opacity: 0,
            stagger: 0.1,
            ease: 'expo.out',
            delay: 1.5, // Start after title animations
          });
        },
      });
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        width: '100%',
        backgroundColor: '#000000',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '22px',
        fontWeight: 400,
        color: 'white',
        padding: '18px 60px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'end',
      }}
    >
      {/* Left - Socials */}
      <div style={{ display: 'flex', gap: '24px' }}>
        <a
          href="https://instagram.com/josepeoon"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-text text-white hover:opacity-70 transition-opacity cursor-none"
        >
          INSTAGRAM
        </a>
        <a
          href="https://linkedin.com/in/josepeoon"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-text text-white hover:opacity-70 transition-opacity cursor-none"
        >
          LINKEDIN
        </a>
        <a
          href="https://github.com/josepeon"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-text text-white hover:opacity-70 transition-opacity cursor-none"
        >
          GITHUB
        </a>
      </div>

      {/* Center - Name & Contact */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span className="footer-text" style={{ lineHeight: '1', marginBottom: '4px' }}>JOSE PEON</span>
        <a
          href="mailto:JOSE@OH.SYSTEMS"
          className="footer-text text-white hover:opacity-70 transition-opacity cursor-none"
        >
          JOSE@OH.SYSTEMS
        </a>
      </div>

      {/* Right - Title */}
      <div style={{ textAlign: 'right' }}>
        <span className="footer-text">AI ENGINEER</span>
      </div>
    </footer>
  );
}
