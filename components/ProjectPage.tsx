'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Project } from '@/types/project';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

interface ProjectPageProps {
  project: Project;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const router = useRouter();

  const imageNumber = project.handle.split('_')[1];
  const hasProjectImage = project.slug !== 'resume' && imageNumber;

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const rightContent = containerRef.current.querySelectorAll('.animate-in');

    // Hide all text content initially
    gsap.set(rightContent, { visibility: 'visible', opacity: 0 });

    const tl = gsap.timeline();

    // 1. Image: already at full opacity from cursor transition — no animation needed

    // 2. Title: rolling 3D chars
    const titleEl = containerRef.current.querySelector('.project-page-title');
    if (titleEl) {
      const titleSplit = SplitText.create(titleEl, {
        type: 'chars',
        charsClass: 'rolling-char',
      });

      gsap.set(titleEl, { perspective: 700, transformStyle: 'preserve-3d', opacity: 1 });
      const depth = -window.innerWidth / 8;

      tl.fromTo(
        titleSplit.chars,
        { rotationX: -90, opacity: 0, transformOrigin: `50% 50% ${depth}px` },
        { rotationX: 0, opacity: 1, transformOrigin: `50% 50% ${depth}px`, stagger: 0.03, duration: 0.8, ease: 'power3.out' },
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
          gsap.set(el, { opacity: 1 });
          tl.from(self.lines, { yPercent: 100, opacity: 0, duration: 0.7, stagger: 0.05, ease: 'expo.out' }, 0.5 + i * 0.1);
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
          gsap.set(el, { opacity: 1 });
          tl.from(self.lines, { yPercent: 100, opacity: 0, duration: 0.8, stagger: 0.06, ease: 'expo.out' }, 0.7 + i * 0.12);
        },
      });
    });

    // 5. Tech tags: fade in with stagger
    const techTags = containerRef.current.querySelectorAll('.tech-tag');
    techTags.forEach((el, i) => {
      gsap.set(el, { opacity: 0 });
      tl.to(el, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, 0.9 + i * 0.08);
    });

    // 6. Back link: rolling 3D
    const backEl = containerRef.current.querySelector('.back-link');
    if (backEl) {
      const backSplit = SplitText.create(backEl, { type: 'chars', charsClass: 'rolling-char' });
      gsap.set(backEl, { perspective: 700, transformStyle: 'preserve-3d', opacity: 1 });

      tl.fromTo(
        backSplit.chars,
        { rotationX: -90, opacity: 0, transformOrigin: '50% 50% -30px' },
        { rotationX: 0, opacity: 1, transformOrigin: '50% 50% -30px', stagger: 0.03, duration: 0.6, ease: 'power3.out' },
        0.3
      );
    }
  }, []);

  const handleBack = () => {
    if (!containerRef.current) {
      router.push('/');
      return;
    }

    const depth = -window.innerWidth / 8;
    const tl = gsap.timeline({ onComplete: () => router.push('/') });

    // Reverse all rolling chars
    const allChars = containerRef.current.querySelectorAll('.rolling-char');
    tl.to(allChars, {
      rotationX: 90, opacity: 0, transformOrigin: `50% 50% ${depth}px`,
      stagger: 0.01, duration: 0.4, ease: 'power3.in',
    }, 0);

    // Reverse all masked lines
    const allLines = containerRef.current.querySelectorAll('.footer-line');
    tl.to(allLines, { yPercent: 100, opacity: 0, duration: 0.4, stagger: 0.02, ease: 'power3.in' }, 0);

    // Fade out tech tags
    const techTags = containerRef.current.querySelectorAll('.tech-tag');
    tl.to(techTags, { opacity: 0, duration: 0.3, stagger: 0.02, ease: 'power3.in' }, 0);

    // Fade out and scale down the image
    if (imageRef.current) {
      tl.to(imageRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: 'power3.in',
      }, 0);
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full flex overflow-hidden relative"
      style={{ backgroundColor: '#000000', fontFamily: 'Helvetica, Arial, sans-serif', cursor: 'none' }}
    >
      {/* Back button — top-left corner */}
      <button
        onClick={handleBack}
        className="back-link animate-in text-white text-[22px] uppercase hover:opacity-70 transition-opacity"
        style={{ position: 'absolute', top: '40px', left: '60px', background: 'none', border: 'none', fontFamily: 'inherit', visibility: 'hidden', cursor: 'none', zIndex: 10 }}
      >
        ← BACK
      </button>

      {/* Bottom-left project name */}
      <span
        className="section-label animate-in text-white text-[16px] uppercase opacity-40"
        style={{ position: 'absolute', bottom: '40px', left: '60px', visibility: 'hidden', zIndex: 10 }}
      >
        {project.bottomLeftText}
      </span>

      {/* Left side: Project image */}
      <div className="flex-shrink-0 flex flex-col justify-center" style={{ padding: '40px 0 40px 60px' }}>
        {hasProjectImage && (
          <div
            ref={imageRef}
            className="rounded-[2vw] overflow-hidden relative"
            style={{ width: '33.6vw', height: '40.3vw', willChange: 'transform, opacity' }}
          >
            <Image
              src={`/images/cursors/cursor_${imageNumber}.jpg`}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>

      {/* Right side: Project content */}
      <div className="flex-1 flex flex-col justify-between" style={{ padding: '40px 60px 40px 48px' }}>
        {/* Top: Year */}
        <div className="flex justify-end items-start">

          <span className="section-label animate-in text-white text-[18px] uppercase opacity-50" style={{ visibility: 'hidden' }}>
            {project.year}
          </span>
        </div>

        {/* Middle: Title + Content */}
        <div className="flex-1 flex flex-col justify-center" style={{ gap: '36px' }}>
          <h1
            className="project-page-title animate-in text-white uppercase leading-none"
            style={{ fontSize: '3vw', margin: 0, visibility: 'hidden' }}
          >
            {project.title}
          </h1>

          {/* Overview */}
          <div>
            <span className="section-label animate-in text-white text-[14px] uppercase tracking-[0.2em] opacity-40 block" style={{ marginBottom: '12px', visibility: 'hidden' }}>
              OVERVIEW
            </span>
            <p className="content-block animate-in text-white leading-relaxed" style={{ fontSize: '17px', opacity: 0.75, margin: 0, maxWidth: '560px', visibility: 'hidden' }}>
              {project.description || 'Project description placeholder. Details about the AI system architecture, goals, and outcomes.'}
            </p>
          </div>

          {/* Approach */}
          {project.topLeftText && project.topLeftText.filter(Boolean).length > 0 && (
            <div>
              <span className="section-label animate-in text-white text-[14px] uppercase tracking-[0.2em] opacity-40 block" style={{ marginBottom: '12px', visibility: 'hidden' }}>
                APPROACH
              </span>
              <p className="content-block animate-in text-white leading-relaxed" style={{ fontSize: '17px', opacity: 0.75, margin: 0, maxWidth: '560px', visibility: 'hidden' }}>
                {project.topLeftText.filter(Boolean).join(' · ')}
              </p>
            </div>
          )}

          {/* Tech Stack */}
          {project.technologies.length > 0 && (
            <div>
              <span className="section-label animate-in text-white text-[14px] uppercase tracking-[0.2em] opacity-40 block" style={{ marginBottom: '12px', visibility: 'hidden' }}>
                STACK
              </span>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="tech-tag animate-in text-white text-[15px] uppercase transition-opacity duration-300"
                    style={{ padding: '6px 16px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', visibility: 'hidden', opacity: 0 }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom: Name */}
        <div className="flex justify-end items-end">
          <span className="section-label animate-in text-white text-[16px] uppercase opacity-40" style={{ visibility: 'hidden' }}>
            JOSE PEON · AI ENGINEER
          </span>
        </div>
      </div>
    </div>
  );
}
