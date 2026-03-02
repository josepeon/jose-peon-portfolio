'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useSpring } from 'framer-motion';
import { Project } from '@/types/project';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const cursorSpring = {
  stiffness: 150,
  damping: 15,
  mass: 0.1,
};

interface ProjectPageProps {
  project: Project;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const hasMovedRef = useRef(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const router = useRouter();
  const cursorX = useSpring(0, cursorSpring);
  const cursorY = useSpring(0, cursorSpring);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hasMovedRef.current) {
      hasMovedRef.current = true;
      setCursorVisible(true);
      cursorX.jump(e.clientX);
      cursorY.jump(e.clientY);
      return;
    }
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const titleEl = containerRef.current.querySelector('.project-page-title');
    const detailEls = containerRef.current.querySelectorAll('.project-detail');
    const descriptionEl = containerRef.current.querySelector('.project-description');
    const backEl = containerRef.current.querySelector('.back-link');

    // Hide everything initially
    gsap.set([titleEl, ...detailEls, descriptionEl, backEl].filter(Boolean), { visibility: 'visible', opacity: 0 });

    const tl = gsap.timeline();

    // 1. Title: rolling 3D animation (like homepage titles)
    if (titleEl) {
      const titleSplit = SplitText.create(titleEl, {
        type: 'chars',
        charsClass: 'rolling-char',
      });

      gsap.set(titleEl, {
        perspective: 700,
        transformStyle: 'preserve-3d',
        opacity: 1,
      });

      const depth = -window.innerWidth / 8;

      tl.fromTo(
        titleSplit.chars,
        {
          rotationX: -90,
          opacity: 0,
          transformOrigin: `50% 50% ${depth}px`,
        },
        {
          rotationX: 0,
          opacity: 1,
          transformOrigin: `50% 50% ${depth}px`,
          stagger: 0.03,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.2
      );
    }

    // 2. Detail items: text masking reveal (like footer)
    detailEls.forEach((el, i) => {
      SplitText.create(el, {
        type: 'words,lines',
        linesClass: 'footer-line',
        mask: 'lines',
        onSplit: (self) => {
          gsap.set(el, { opacity: 1 });
          tl.from(
            self.lines,
            {
              yPercent: 100,
              opacity: 0,
              duration: 0.8,
              stagger: 0.05,
              ease: 'expo.out',
            },
            0.6 + i * 0.15
          );
        },
      });
    });

    // 3. Description: text masking
    if (descriptionEl) {
      SplitText.create(descriptionEl, {
        type: 'words,lines',
        linesClass: 'footer-line',
        mask: 'lines',
        onSplit: (self) => {
          gsap.set(descriptionEl, { opacity: 1 });
          tl.from(
            self.lines,
            {
              yPercent: 100,
              opacity: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: 'expo.out',
            },
            1.0
          );
        },
      });
    }

    // 4. Back link: rolling 3D
    if (backEl) {
      const backSplit = SplitText.create(backEl, {
        type: 'chars',
        charsClass: 'rolling-char',
      });

      gsap.set(backEl, {
        perspective: 700,
        transformStyle: 'preserve-3d',
        opacity: 1,
      });

      const depth = -window.innerWidth / 12;

      tl.fromTo(
        backSplit.chars,
        {
          rotationX: -90,
          opacity: 0,
          transformOrigin: `50% 50% ${depth}px`,
        },
        {
          rotationX: 0,
          opacity: 1,
          transformOrigin: `50% 50% ${depth}px`,
          stagger: 0.03,
          duration: 0.6,
          ease: 'power3.out',
        },
        0.4
      );
    }
  }, []);

  const handleBack = () => {
    if (!containerRef.current) {
      router.push('/');
      return;
    }

    const titleEl = containerRef.current.querySelector('.project-page-title');
    const detailEls = containerRef.current.querySelectorAll('.project-detail');
    const descriptionEl = containerRef.current.querySelector('.project-description');
    const backEl = containerRef.current.querySelector('.back-link');
    const depth = -window.innerWidth / 8;

    const tl = gsap.timeline({
      onComplete: () => router.push('/'),
    });

    // Reverse: rolling chars out
    if (titleEl) {
      const chars = titleEl.querySelectorAll('.rolling-char');
      tl.to(chars, {
        rotationX: 90,
        opacity: 0,
        transformOrigin: `50% 50% ${depth}px`,
        stagger: 0.02,
        duration: 0.5,
        ease: 'power3.in',
      }, 0);
    }

    // Reverse: mask lines out
    const allLines = containerRef.current.querySelectorAll('.footer-line');
    tl.to(allLines, {
      yPercent: 100,
      opacity: 0,
      duration: 0.4,
      stagger: 0.03,
      ease: 'power3.in',
    }, 0);

    // Reverse: back link
    if (backEl) {
      const chars = backEl.querySelectorAll('.rolling-char');
      tl.to(chars, {
        rotationX: 90,
        opacity: 0,
        stagger: 0.02,
        duration: 0.4,
        ease: 'power3.in',
      }, 0);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full cursor-none flex flex-col"
      style={{ backgroundColor: '#000000', fontFamily: 'Helvetica, Arial, sans-serif' }}
    >
      {/* Custom circle cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          width: 12,
          height: 12,
          borderRadius: '50%',
          border: '1px solid white',
          translateX: '-50%',
          translateY: '-50%',
          opacity: cursorVisible ? 1 : 0,
        }}
      />

      {/* Header */}
      <div className="flex justify-between items-start" style={{ padding: '40px 60px' }}>
        <button
          onClick={handleBack}
          className="back-link text-white cursor-none text-[22px] uppercase hover:opacity-70 transition-opacity"
          style={{ background: 'none', border: 'none', fontFamily: 'inherit', visibility: 'hidden' }}
        >
          ← BACK
        </button>
        <span className="project-detail text-white text-[22px] uppercase" style={{ visibility: 'hidden' }}>{project.year}</span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center" style={{ padding: '0 60px' }}>
        {/* Title */}
        <h1
          className="project-page-title text-white text-center uppercase leading-none"
          style={{ fontSize: '8vw', margin: 0, visibility: 'hidden' }}
        >
          {project.title}
        </h1>

        {/* Detail tags */}
        {project.topLeftText && project.topLeftText.filter(Boolean).length > 0 && (
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-12">
            {project.topLeftText.filter(Boolean).map((text, i) => (
              <span key={i} className="project-detail text-white text-[18px] uppercase opacity-60" style={{ visibility: 'hidden' }}>
                {text}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        {project.description && (
          <p
            className="project-description text-white text-center mt-12 max-w-2xl leading-relaxed"
            style={{ fontSize: '18px', opacity: 0.8, visibility: 'hidden' }}
          >
            {project.description}
          </p>
        )}
      </div>

      {/* Footer area */}
      <div
        className="flex justify-between items-end"
        style={{ padding: '40px 60px' }}
      >
        <span className="project-detail text-white text-[18px] uppercase opacity-60" style={{ visibility: 'hidden' }}>
          {project.bottomLeftText}
        </span>
        <span className="project-detail text-white text-[18px] uppercase opacity-60" style={{ visibility: 'hidden' }}>
          JOSE PEON
        </span>
      </div>
    </div>
  );
}
