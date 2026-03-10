'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { finesseIntro, finesseExperiments, finesseProposal } from '@/data/finesse';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function FinessePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const tl = gsap.timeline();

    // 1. Back link: rolling 3D
    const backEl = containerRef.current.querySelector('.back-link');
    if (backEl) {
      const backSplit = SplitText.create(backEl, { type: 'chars', charsClass: 'rolling-char' });
      gsap.set(backEl, { visibility: 'visible', perspective: 700, transformStyle: 'preserve-3d', opacity: 1 });
      tl.fromTo(
        backSplit.chars,
        { rotationX: -90, opacity: 0, transformOrigin: '50% 50% -30px' },
        { rotationX: 0, opacity: 1, transformOrigin: '50% 50% -30px', stagger: 0.03, duration: 0.6, ease: 'power3.out' },
        0.1
      );
    }

    // 2. Page title: rolling 3D
    const titleEl = containerRef.current.querySelector('.page-title');
    if (titleEl) {
      const titleSplit = SplitText.create(titleEl, { type: 'chars', charsClass: 'rolling-char' });
      const depth = -window.innerWidth / 10;
      gsap.set(titleEl, { visibility: 'visible', perspective: 700, transformStyle: 'preserve-3d', opacity: 1 });
      tl.fromTo(
        titleSplit.chars,
        { rotationX: -90, opacity: 0, transformOrigin: `50% 50% ${depth}px` },
        { rotationX: 0, opacity: 1, transformOrigin: `50% 50% ${depth}px`, stagger: 0.02, duration: 0.8, ease: 'power3.out' },
        0.15
      );
    }

    // 3. Section labels: text masking reveal
    const sectionLabels = containerRef.current.querySelectorAll('.section-label');
    sectionLabels.forEach((el, i) => {
      SplitText.create(el, {
        type: 'words,lines',
        linesClass: 'footer-line',
        mask: 'lines',
        onSplit: (self) => {
          gsap.set(el, { visibility: 'visible', opacity: 1 });
          tl.from(self.lines, { yPercent: 100, opacity: 0, duration: 0.7, stagger: 0.05, ease: 'expo.out' }, 0.4 + i * 0.04);
        },
      });
    });

    // 4. Content blocks: text masking reveal
    const contentBlocks = containerRef.current.querySelectorAll('.content-block');
    contentBlocks.forEach((el, i) => {
      SplitText.create(el, {
        type: 'words,lines',
        linesClass: 'footer-line',
        mask: 'lines',
        onSplit: (self) => {
          gsap.set(el, { visibility: 'visible', opacity: 1 });
          tl.from(self.lines, { yPercent: 100, opacity: 0, duration: 0.8, stagger: 0.04, ease: 'expo.out' }, 0.5 + i * 0.05);
        },
      });
    });

    // 5. Tags: fade in
    const tags = containerRef.current.querySelectorAll('.tag-item');
    tags.forEach((el, i) => {
      gsap.set(el, { visibility: 'visible', opacity: 0 });
      tl.to(el, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.7 + i * 0.02);
    });

    // 6. Experiment cards: staggered fade + slide up
    const cards = containerRef.current.querySelectorAll('.experiment-card');
    cards.forEach((el, i) => {
      gsap.set(el, { visibility: 'visible', opacity: 0, y: 40 });
      tl.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.6 + i * 0.1);
    });
  }, []);

  const handleBack = () => {
    if (!containerRef.current) {
      router.push('/');
      return;
    }

    const depth = -window.innerWidth / 10;
    const tl = gsap.timeline({ onComplete: () => router.push('/') });

    const allChars = containerRef.current.querySelectorAll('.rolling-char');
    tl.to(allChars, {
      rotationX: 90, opacity: 0, transformOrigin: `50% 50% ${depth}px`,
      stagger: 0.01, duration: 0.4, ease: 'power3.in',
    }, 0);

    const allLines = containerRef.current.querySelectorAll('.footer-line');
    tl.to(allLines, { yPercent: 100, opacity: 0, duration: 0.4, stagger: 0.02, ease: 'power3.in' }, 0);

    const tags = containerRef.current.querySelectorAll('.tag-item');
    tl.to(tags, { opacity: 0, duration: 0.3, stagger: 0.01, ease: 'power3.in' }, 0);

    const cards = containerRef.current.querySelectorAll('.experiment-card');
    tl.to(cards, { opacity: 0, y: -20, duration: 0.4, stagger: 0.04, ease: 'power3.in' }, 0);
  };

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen relative"
      style={{ backgroundColor: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', cursor: 'none', overflowX: 'hidden' }}
    >
      {/* Fixed back button */}
      <button
        onClick={handleBack}
        className="back-link text-white text-[22px] uppercase hover:opacity-70 transition-opacity fixed finesse-back"
        style={{ top: '40px', left: '60px', background: 'none', border: 'none', fontFamily: 'inherit', visibility: 'hidden', cursor: 'none', zIndex: 50 }}
      >
        ← BACK
      </button>

      {/* Header section */}
      <div className="finesse-header" style={{ padding: '120px 60px 0 60px', maxWidth: '900px' }}>
        <h1
          className="page-title text-white uppercase leading-none finesse-title"
          style={{ fontSize: '2.8vw', margin: 0, visibility: 'hidden', whiteSpace: 'nowrap' }}
        >
          {finesseIntro.heading}
        </h1>

        <p
          className="section-label text-white leading-relaxed"
          style={{ fontSize: '17px', opacity: 0.6, marginTop: '32px', maxWidth: '700px', visibility: 'hidden' }}
        >
          {finesseIntro.description}
        </p>
      </div>

      {/* Role Proposal Section */}
      <div className="proposal-section" style={{ padding: '80px 60px', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '60px' }}>
        <h2
          className="proposal-title section-label text-white uppercase leading-none"
          style={{ fontSize: '2vw', margin: 0, visibility: 'hidden', letterSpacing: '0.05em' }}
        >
          {finesseProposal.heading}
        </h2>

        <div className="proposal-roles" style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {finesseProposal.roles.map((role) => (
            <div
              key={role.id}
              className="role-card experiment-card"
              style={{
                visibility: 'hidden',
                backgroundColor: 'rgba(255,255,255,0.02)',
                padding: '48px 40px',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Role Number + Title */}
              <div>
                <span
                  className="text-white uppercase tracking-[0.3em] block"
                  style={{ fontSize: '12px', opacity: 0.3, marginBottom: '8px' }}
                >
                  ROLE {String(role.id).padStart(2, '0')}
                </span>
                <h3
                  className="text-white uppercase leading-tight"
                  style={{ fontSize: '24px', margin: 0, letterSpacing: '0.02em' }}
                >
                  {role.title}
                </h3>
              </div>

              {/* Overview */}
              <p
                className="text-white leading-relaxed"
                style={{ fontSize: '15px', opacity: 0.7, margin: '24px 0', maxWidth: '800px' }}
              >
                {role.overview}
              </p>

              {/* Responsibilities */}
              <div style={{ marginTop: '32px' }}>
                <span
                  className="text-white uppercase tracking-[0.2em] block"
                  style={{ fontSize: '11px', opacity: 0.35, marginBottom: '12px' }}
                >
                  KEY RESPONSIBILITIES
                </span>
                <ul style={{ margin: 0, paddingLeft: '16px', listStyle: 'none' }}>
                  {role.responsibilities.map((item, i) => (
                    <li
                      key={i}
                      className="text-white"
                      style={{ fontSize: '14px', opacity: 0.6, marginBottom: '8px', position: 'relative', paddingLeft: '12px' }}
                    >
                      <span style={{ position: 'absolute', left: 0, opacity: 0.3 }}>-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Initial Initiatives */}
              <div style={{ marginTop: '32px' }}>
                <span
                  className="text-white uppercase tracking-[0.2em] block"
                  style={{ fontSize: '11px', opacity: 0.35, marginBottom: '12px' }}
                >
                  INITIAL INITIATIVES
                </span>
                <ul style={{ margin: 0, paddingLeft: '16px', listStyle: 'none' }}>
                  {role.initiatives.map((item, i) => (
                    <li
                      key={i}
                      className="text-white"
                      style={{ fontSize: '14px', opacity: 0.6, marginBottom: '8px', position: 'relative', paddingLeft: '12px' }}
                    >
                      <span style={{ position: 'absolute', left: 0, opacity: 0.3 }}>-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact */}
              <div style={{ marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px' }}>
                <span
                  className="text-white uppercase tracking-[0.2em] block"
                  style={{ fontSize: '11px', opacity: 0.35, marginBottom: '10px' }}
                >
                  IMPACT
                </span>
                <p
                  className="text-white leading-relaxed"
                  style={{ fontSize: '14px', opacity: 0.6, margin: 0 }}
                >
                  {role.impact}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Compensation Section */}
        <div
          className="compensation-section experiment-card"
          style={{
            visibility: 'hidden',
            marginTop: '80px',
            backgroundColor: 'rgba(255,255,255,0.02)',
            padding: '48px 40px',
            borderRadius: '4px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <h3
            className="text-white uppercase leading-tight"
            style={{ fontSize: '20px', margin: 0, letterSpacing: '0.05em' }}
          >
            COMPENSATION EXPECTATIONS
          </h3>

          <p
            className="text-white leading-relaxed"
            style={{ fontSize: '15px', opacity: 0.7, margin: '24px 0', maxWidth: '800px' }}
          >
            {finesseProposal.compensation.intro}
          </p>

          <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap', marginTop: '24px' }}>
            <div>
              <span
                className="text-white uppercase tracking-[0.2em] block"
                style={{ fontSize: '11px', opacity: 0.35, marginBottom: '8px' }}
              >
                BASE SALARY
              </span>
              <span className="text-white" style={{ fontSize: '18px', opacity: 0.9 }}>
                {finesseProposal.compensation.baseSalary}
              </span>
            </div>
            <div>
              <span
                className="text-white uppercase tracking-[0.2em] block"
                style={{ fontSize: '11px', opacity: 0.35, marginBottom: '8px' }}
              >
                EQUITY
              </span>
              <span className="text-white" style={{ fontSize: '18px', opacity: 0.9 }}>
                {finesseProposal.compensation.equity}
              </span>
            </div>
          </div>

          <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px' }}>
            <span
              className="text-white uppercase tracking-[0.2em] block"
              style={{ fontSize: '11px', opacity: 0.35, marginBottom: '12px' }}
            >
              {finesseProposal.compensation.alternativeIntro}
            </span>
            <ul style={{ margin: 0, paddingLeft: '16px', listStyle: 'none' }}>
              {finesseProposal.compensation.alternativeItems.map((item, i) => (
                <li
                  key={i}
                  className="text-white"
                  style={{ fontSize: '14px', opacity: 0.6, marginBottom: '6px', position: 'relative', paddingLeft: '12px' }}
                >
                  <span style={{ position: 'absolute', left: 0, opacity: 0.3 }}>-</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p
            className="text-white leading-relaxed"
            style={{ fontSize: '14px', opacity: 0.5, margin: '32px 0 0 0', fontStyle: 'italic' }}
          >
            {finesseProposal.compensation.goal}
          </p>
        </div>

        {/* Availability Section */}
        <div
          className="availability-section experiment-card"
          style={{
            visibility: 'hidden',
            marginTop: '40px',
            backgroundColor: 'rgba(255,255,255,0.02)',
            padding: '32px 40px',
            borderRadius: '4px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <h3
            className="text-white uppercase leading-tight"
            style={{ fontSize: '16px', margin: 0, letterSpacing: '0.05em' }}
          >
            LOCATION & AVAILABILITY
          </h3>
          <p
            className="text-white leading-relaxed"
            style={{ fontSize: '15px', opacity: 0.7, margin: '16px 0 0 0' }}
          >
            {finesseProposal.availability.intro}
          </p>
          <p
            className="text-white leading-relaxed"
            style={{ fontSize: '14px', opacity: 0.5, margin: '12px 0 0 0' }}
          >
            {finesseProposal.availability.details}
          </p>
        </div>

        {/* Closing Note */}
        <div className="closing-note" style={{ marginTop: '80px', maxWidth: '800px' }}>
          <p
            className="content-block text-white leading-relaxed"
            style={{ fontSize: '16px', opacity: 0.6, margin: 0, visibility: 'hidden' }}
          >
            {finesseProposal.closingNote}
          </p>
        </div>
      </div>

      {/* Divider before experiments */}
      <div style={{ padding: '0 60px' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '60px' }}></div>
        <h2
          className="section-label text-white uppercase"
          style={{ fontSize: '1.5vw', opacity: 0.5, marginBottom: '40px', visibility: 'hidden', letterSpacing: '0.1em' }}
        >
          AI CONCEPT EXPLORATIONS
        </h2>
      </div>

      {/* Experiment cards */}
      <div className="finesse-cards" style={{ padding: '60px 60px 100px 60px' }}>
        <div className="grid gap-px finesse-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
          {finesseExperiments.map((exp) => (
            <div
              key={exp.id}
              className="experiment-card"
              style={{
                visibility: 'hidden',
                backgroundColor: '#000000',
                padding: '48px 40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              {/* Number + Title */}
              <div>
                <span
                  className="text-white uppercase tracking-[0.3em] block"
                  style={{ fontSize: '12px', opacity: 0.3, marginBottom: '8px' }}
                >
                  {String(exp.id).padStart(2, '0')}
                </span>
                <h2
                  className="text-white uppercase leading-tight"
                  style={{ fontSize: '28px', margin: 0, letterSpacing: '0.02em' }}
                >
                  {exp.title}
                </h2>
                <span
                  className="text-white uppercase tracking-[0.15em] block"
                  style={{ fontSize: '12px', opacity: 0.4, marginTop: '6px' }}
                >
                  {exp.subtitle}
                </span>
              </div>

              {/* Concept */}
              <p
                className="text-white leading-relaxed"
                style={{ fontSize: '15px', opacity: 0.7, margin: 0 }}
              >
                {exp.concept}
              </p>

              {/* How it works */}
              <div>
                <span
                  className="text-white uppercase tracking-[0.2em] block"
                  style={{ fontSize: '11px', opacity: 0.35, marginBottom: '10px' }}
                >
                  HOW IT WORKS
                </span>
                <ul style={{ margin: 0, paddingLeft: '16px', listStyle: 'none' }}>
                  {exp.howItWorks.map((step, i) => (
                    <li
                      key={i}
                      className="text-white"
                      style={{ fontSize: '14px', opacity: 0.6, marginBottom: '6px', position: 'relative', paddingLeft: '12px' }}
                    >
                      <span style={{ position: 'absolute', left: 0, opacity: 0.3 }}>-</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why it works */}
              <div>
                <span
                  className="text-white uppercase tracking-[0.2em] block"
                  style={{ fontSize: '11px', opacity: 0.35, marginBottom: '10px' }}
                >
                  WHY IT WORKS
                </span>
                <ul style={{ margin: 0, paddingLeft: '16px', listStyle: 'none' }}>
                  {exp.whyItWorks.map((point, i) => (
                    <li
                      key={i}
                      className="text-white"
                      style={{ fontSize: '14px', opacity: 0.6, marginBottom: '4px', position: 'relative', paddingLeft: '12px' }}
                    >
                      <span style={{ position: 'absolute', left: 0, opacity: 0.3 }}>-</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prototype includes */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', marginTop: 'auto' }}>
                <div className="flex flex-wrap gap-2">
                  {exp.prototypeIncludes.map((item, i) => (
                    <span
                      key={i}
                      className="tag-item text-white text-[12px] uppercase"
                      style={{
                        padding: '4px 12px',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '100px',
                        opacity: 0.5,
                        visibility: 'hidden',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom framework note */}
      <div className="finesse-footer-note" style={{ padding: '0 60px 80px 60px', maxWidth: '700px' }}>
        <span
          className="section-label text-white uppercase tracking-[0.2em] block"
          style={{ fontSize: '12px', opacity: 0.35, marginBottom: '16px', visibility: 'hidden' }}
        >
          EXPERIMENTAL FRAMEWORK
        </span>
        <p
          className="content-block text-white leading-relaxed"
          style={{ fontSize: '15px', opacity: 0.55, margin: 0, visibility: 'hidden' }}
        >
          Each concept is a rapid prototype experiment built quickly and tested with small audiences. The goal is to explore how AI can transform fashion creation, product development, online shopping, and community participation.
        </p>
      </div>

      {/* Footer signature */}
      <div className="finesse-footer-sig" style={{ padding: '0 60px 60px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
        <span
          className="section-label text-white text-[14px] uppercase tracking-[0.15em]"
          style={{ opacity: 0.3, visibility: 'hidden' }}
        >
          JOSE PEON
        </span>
        <span
          className="section-label text-white text-[14px] uppercase tracking-[0.15em]"
          style={{ opacity: 0.3, visibility: 'hidden' }}
        >
          2026
        </span>
      </div>
    </div>
  );
}
