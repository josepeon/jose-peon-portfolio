'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { resume } from '@/data/resume';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function ResumePage() {
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

    // 2. Name: rolling 3D
    const nameEl = containerRef.current.querySelector('.resume-name');
    if (nameEl) {
      const nameSplit = SplitText.create(nameEl, { type: 'chars', charsClass: 'rolling-char' });
      const depth = -window.innerWidth / 8;
      gsap.set(nameEl, { visibility: 'visible', perspective: 700, transformStyle: 'preserve-3d', opacity: 1 });
      tl.fromTo(
        nameSplit.chars,
        { rotationX: -90, opacity: 0, transformOrigin: `50% 50% ${depth}px` },
        { rotationX: 0, opacity: 1, transformOrigin: `50% 50% ${depth}px`, stagger: 0.02, duration: 0.8, ease: 'power3.out' },
        0.1
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
          tl.from(self.lines, { yPercent: 100, opacity: 0, duration: 0.7, stagger: 0.05, ease: 'expo.out' }, 0.4 + i * 0.06);
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
          tl.from(self.lines, { yPercent: 100, opacity: 0, duration: 0.8, stagger: 0.04, ease: 'expo.out' }, 0.5 + i * 0.08);
        },
      });
    });

    // 5. Tech tags: fade in with stagger
    const techTags = containerRef.current.querySelectorAll('.tech-tag');
    techTags.forEach((el, i) => {
      gsap.set(el, { visibility: 'visible', opacity: 0 });
      tl.to(el, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.8 + i * 0.03);
    });
  }, []);

  const handleBack = () => {
    if (!containerRef.current) {
      router.push('/');
      return;
    }

    const depth = -window.innerWidth / 8;
    const tl = gsap.timeline({ onComplete: () => router.push('/') });

    const allChars = containerRef.current.querySelectorAll('.rolling-char');
    tl.to(allChars, {
      rotationX: 90, opacity: 0, transformOrigin: `50% 50% ${depth}px`,
      stagger: 0.01, duration: 0.4, ease: 'power3.in',
    }, 0);

    const allLines = containerRef.current.querySelectorAll('.footer-line');
    tl.to(allLines, { yPercent: 100, opacity: 0, duration: 0.4, stagger: 0.02, ease: 'power3.in' }, 0);

    const techTags = containerRef.current.querySelectorAll('.tech-tag');
    tl.to(techTags, { opacity: 0, duration: 0.3, stagger: 0.02, ease: 'power3.in' }, 0);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full overflow-y-auto overflow-x-hidden relative"
      style={{ backgroundColor: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', cursor: 'none' }}
    >
      {/* Back button — top-left corner */}
      <button
        onClick={handleBack}
        className="back-link text-white text-[22px] uppercase hover:opacity-70 transition-opacity"
        style={{ position: 'fixed', top: '40px', left: '60px', background: 'none', border: 'none', fontFamily: 'inherit', visibility: 'hidden', cursor: 'none', zIndex: 50 }}
      >
        ← BACK
      </button>

      {/* Resume content */}
      <div style={{ padding: '120px 60px 80px', maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <h1
            className="resume-name text-white uppercase leading-none"
            style={{ fontSize: '5vw', margin: 0, visibility: 'hidden' }}
          >
            {resume.name}
          </h1>
          <div style={{ marginTop: '16px', display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="section-label text-white text-[16px] uppercase opacity-60" style={{ visibility: 'hidden' }}>
              {resume.title}
            </span>
            <span className="section-label text-white text-[14px] opacity-40" style={{ visibility: 'hidden' }}>
              {resume.location}
            </span>
            <span className="section-label text-white text-[14px] opacity-40" style={{ visibility: 'hidden' }}>
              {resume.email}
            </span>
            <span className="section-label text-white text-[14px] opacity-40" style={{ visibility: 'hidden' }}>
              {resume.github}
            </span>
            <span className="section-label text-white text-[14px] opacity-40" style={{ visibility: 'hidden' }}>
              {resume.portfolio}
            </span>
          </div>
        </div>

        {/* Summary */}
        <section style={{ marginBottom: '56px' }}>
          <span className="section-label text-white text-[13px] uppercase tracking-[0.25em] opacity-40 block" style={{ marginBottom: '14px', visibility: 'hidden' }}>
            SUMMARY
          </span>
          <p className="content-block text-white leading-relaxed" style={{ fontSize: '17px', opacity: 0.75, margin: 0, visibility: 'hidden' }}>
            {resume.summary}
          </p>
        </section>

        {/* Skills */}
        <section style={{ marginBottom: '56px' }}>
          <span className="section-label text-white text-[13px] uppercase tracking-[0.25em] opacity-40 block" style={{ marginBottom: '20px', visibility: 'hidden' }}>
            SKILLS
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {Object.entries(resume.skills).map(([category, items]) => (
              <div key={category}>
                <span className="section-label text-white text-[12px] uppercase tracking-[0.2em] opacity-50 block" style={{ marginBottom: '10px', visibility: 'hidden' }}>
                  {category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <span
                      key={i}
                      className="tech-tag text-white text-[13px] transition-opacity duration-300"
                      style={{ padding: '4px 12px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', visibility: 'hidden', opacity: 0 }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section style={{ marginBottom: '56px' }}>
          <span className="section-label text-white text-[13px] uppercase tracking-[0.25em] opacity-40 block" style={{ marginBottom: '24px', visibility: 'hidden' }}>
            EXPERIENCE
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {resume.experience.map((exp, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px', flexWrap: 'wrap', gap: '8px' }}>
                  <span className="content-block text-white text-[18px] uppercase" style={{ visibility: 'hidden' }}>
                    {exp.role}
                  </span>
                  <span className="content-block text-white text-[14px] opacity-40" style={{ visibility: 'hidden' }}>
                    {exp.period}
                  </span>
                </div>
                <span className="content-block text-white text-[15px] opacity-50 block" style={{ marginBottom: '12px', visibility: 'hidden' }}>
                  {exp.company} — {exp.location}
                </span>
                <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="content-block text-white leading-relaxed" style={{ fontSize: '15px', opacity: 0.65, visibility: 'hidden', paddingLeft: '16px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, opacity: 0.3 }}>·</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section style={{ marginBottom: '56px' }}>
          <span className="section-label text-white text-[13px] uppercase tracking-[0.25em] opacity-40 block" style={{ marginBottom: '24px', visibility: 'hidden' }}>
            PROJECTS
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {resume.projects.map((proj, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px', flexWrap: 'wrap', gap: '8px' }}>
                  <span className="content-block text-white text-[17px] uppercase" style={{ visibility: 'hidden' }}>
                    {proj.name}
                  </span>
                  <span className="content-block text-white text-[13px] opacity-40" style={{ visibility: 'hidden' }}>
                    {proj.tech}
                  </span>
                </div>
                <p className="content-block text-white leading-relaxed" style={{ fontSize: '15px', opacity: 0.65, margin: 0, visibility: 'hidden' }}>
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section style={{ marginBottom: '56px' }}>
          <span className="section-label text-white text-[13px] uppercase tracking-[0.25em] opacity-40 block" style={{ marginBottom: '20px', visibility: 'hidden' }}>
            EDUCATION
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {resume.education.map((edu, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                  <span className="content-block text-white text-[16px] uppercase" style={{ visibility: 'hidden' }}>
                    {edu.degree}
                  </span>
                  <span className="content-block text-white text-[14px] opacity-40" style={{ visibility: 'hidden' }}>
                    {edu.period}
                  </span>
                </div>
                <span className="content-block text-white text-[14px] opacity-50 block" style={{ visibility: 'hidden' }}>
                  {edu.institution}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section style={{ marginBottom: '80px' }}>
          <span className="section-label text-white text-[13px] uppercase tracking-[0.25em] opacity-40 block" style={{ marginBottom: '16px', visibility: 'hidden' }}>
            CERTIFICATIONS
          </span>
          <div className="flex flex-wrap gap-2">
            {resume.certifications.map((cert, i) => (
              <span
                key={i}
                className="tech-tag text-white text-[13px] transition-opacity duration-300"
                style={{ padding: '5px 14px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', visibility: 'hidden', opacity: 0 }}
              >
                {cert}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
