'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function Footer({ isExiting }: { isExiting?: boolean }) {
  const footerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!footerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const elements = footerRef.current.querySelectorAll('.footer-text');

    // Set initial state - hidden
    gsap.set(elements, { visibility: 'visible', opacity: 0 });

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

  // Exit animation: reverse the masked reveal
  useEffect(() => {
    if (!isExiting || !footerRef.current) return;

    const lines = footerRef.current.querySelectorAll('.footer-line');
    gsap.to(lines, {
      yPercent: 100,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power3.in',
    });
  }, [isExiting]);

  return (
    <footer
      ref={footerRef}
      className="home-footer"
      style={{
        width: '100%',
        backgroundColor: '#000000',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '22px',
        fontWeight: 400,
        color: 'white',
      }}
    >
      {/* Left - Socials */}
      <div className="footer-left" style={{ display: 'flex', gap: '24px' }}>
        <a
          href="https://instagram.com/josepeoon"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-text text-white transition-opacity duration-300 cursor-none"
          style={{ visibility: 'hidden', opacity: 0.4 }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          INSTAGRAM
        </a>
        <a
          href="https://linkedin.com/in/josepeoon"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-text text-white transition-opacity duration-300 cursor-none"
          style={{ visibility: 'hidden', opacity: 0.4 }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          LINKEDIN
        </a>
        <a
          href="https://github.com/josepeon"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-text text-white transition-opacity duration-300 cursor-none"
          style={{ visibility: 'hidden', opacity: 0.4 }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          GITHUB
        </a>
        <a
          href="/finesse"
          className="footer-text text-white transition-opacity duration-300 cursor-none"
          style={{ visibility: 'hidden', opacity: 0.4 }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          FINESSE
        </a>
      </div>

      {/* Center - Name & Contact (desktop) */}
      <div
        className="footer-center"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span className="footer-text footer-name" style={{ lineHeight: '1', marginBottom: '4px', visibility: 'hidden' }}>JOSE PEON</span>
        <a
          href="mailto:JOSE@OH.SYSTEMS"
          className="footer-text footer-email text-white transition-opacity duration-300 cursor-none"
          style={{ visibility: 'hidden', opacity: 0.4 }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          JOSE@OH.SYSTEMS
        </a>
      </div>

      {/* Right - Title (desktop) */}
      <div className="footer-right" style={{ textAlign: 'right' }}>
        <span className="footer-text" style={{ visibility: 'hidden' }}>AI ENGINEER</span>
      </div>

      {/* Mobile-only bottom rows: email centered, then name left / title right */}
      <div className="footer-mobile-bottom" style={{ display: 'none' }}>
        <a
          href="mailto:JOSE@OH.SYSTEMS"
          className="footer-text text-white transition-opacity duration-300 cursor-none"
          style={{ visibility: 'hidden', opacity: 0.4, textAlign: 'center', display: 'block' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          JOSE@OH.SYSTEMS
        </a>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          <span className="footer-text" style={{ visibility: 'hidden' }}>JOSE PEON</span>
          <span className="footer-text" style={{ visibility: 'hidden' }}>AI ENGINEER</span>
        </div>
      </div>
    </footer>
  );
}
