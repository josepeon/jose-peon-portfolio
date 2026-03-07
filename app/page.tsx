'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Lenis from 'lenis';
import Description from '@/components/Description';
import Footer from '@/components/Footer';
import { projects } from '@/data/projects';
import gsap from 'gsap';

// Slower, lazier spring for the cursor image
const imageSpring = {
  stiffness: 50,
  damping: 20,
  mass: 0.5,
};

export default function Home() {
  const mouseX = useSpring(0, imageSpring);
  const mouseY = useSpring(0, imageSpring);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const hasMovedRef = useRef(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [titlesReady, setTitlesReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [lastImageIndex, setLastImageIndex] = useState(0);
  const cursorImageRef = useRef<HTMLDivElement>(null);
  const isExitingRef = useRef(false);
  const exitSlugRef = useRef('');
  const cursorAnimDone = useRef(false);
  const titlesAnimDone = useRef(false);
  const router = useRouter();

  const hasImage = projects[hoveredIndex]?.slug !== 'resume';

  const handleEntryComplete = useCallback(() => {
    setTitlesReady(true);
  }, []);

  // Navigate only when BOTH title exit and cursor image animations are done
  const tryNavigate = useCallback(() => {
    if (cursorAnimDone.current && titlesAnimDone.current) {
      router.push(`/projects/${exitSlugRef.current}`);
    }
  }, [router]);

  const handleHover = useCallback((i: number) => {
    if (isExitingRef.current) return; // Don't change image during exit
    setHoveredIndex(i);
    if (projects[i]?.slug !== 'resume') {
      setLastImageIndex(i);
    }
  }, []);

  const handleProjectClick = useCallback((slug: string, _projectIndex: number) => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;
    exitSlugRef.current = slug;
    setIsExiting(true);

    // Resume, embed, and Spline projects have no cursor image — skip image animation
    const clickedProject = projects.find(p => p.slug === slug);
    if (slug === 'resume' || clickedProject?.embedUrl || clickedProject?.splineScene) {
      cursorAnimDone.current = true;
      // Hide cursor image immediately
      const el = cursorImageRef.current;
      if (el) gsap.to(el, { opacity: 0, duration: 0.3, ease: 'power2.out' });
      return;
    }

    const el = cursorImageRef.current;
    if (!el) return;

    // Calculate target: match ProjectPage layout exactly
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const imgH = vw * 0.403;
    const targetX = 60;
    const targetY = (vh - imgH) / 2;

    // Animate from current position to target — overwrite auto handles in-progress tweens gracefully
    gsap.to(el, {
      x: targetX,
      y: targetY,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.inOut',
      overwrite: 'auto',
      onComplete: () => {
        cursorAnimDone.current = true;
        tryNavigate();
      },
    });

    // Fade out "ENTER PROJECT" text
    const textEl = el.querySelector('.enter-project-text');
    if (textEl) {
      gsap.to(textEl, { opacity: 0, duration: 0.3, ease: 'power2.out' });
    }
  }, [tryNavigate]);

  const handleTitlesExitComplete = useCallback(() => {
    titlesAnimDone.current = true;
    tryNavigate();
  }, [tryNavigate]);

  // Initialize cursor image as hidden and offscreen until first mouse move
  useEffect(() => {
    const el = cursorImageRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, x: -9999, y: -9999 });
  }, []);

  // Subscribe to spring values — drive cursor image position via GSAP (no framer-motion on the element)
  useEffect(() => {
    const el = cursorImageRef.current;
    if (!el) return;

    const setX = gsap.quickSetter(el, 'x', 'px');
    const setY = gsap.quickSetter(el, 'y', 'px');

    const onChangeX = (v: number) => { if (!isExitingRef.current) setX(v); };
    const onChangeY = (v: number) => { if (!isExitingRef.current) setY(v); };

    const unsubX = mouseX.on('change', onChangeX);
    const unsubY = mouseY.on('change', onChangeY);

    return () => { unsubX(); unsubY(); };
  }, [mouseX, mouseY]);

  // Animate cursor image visibility based on hover state (opacity only, no scale)
  useEffect(() => {
    const el = cursorImageRef.current;
    if (!el || isExitingRef.current) return;

    const shouldShow = cursorVisible && hasImage && titlesReady;
    gsap.to(el, {
      opacity: shouldShow ? 0.85 : 0,
      duration: shouldShow ? 0.6 : 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, [cursorVisible, hasImage, titlesReady]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isExitingRef.current) return;

    const { clientX, clientY } = e;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const imgW = vw * 0.336;
    const imgH = vw * 0.403 + 40;

    const footer = document.querySelector('footer');
    const footerH = footer ? footer.offsetHeight : 0;

    const offsetX = clientX - (vw / 2) * 0.25;
    const offsetY = clientY - (vw / 2) * 0.3;

    const clampedX = Math.max(0, Math.min(offsetX, vw - imgW));
    const clampedY = Math.max(0, Math.min(offsetY, vh - footerH - imgH));

    if (!hasMovedRef.current) {
      hasMovedRef.current = true;
      setCursorVisible(true);
      mouseX.jump(clampedX);
      mouseY.jump(clampedY);
      return;
    }

    mouseX.set(clampedX);
    mouseY.set(clampedY);
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.7,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleUserInteraction = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (!lenisRef.current) return;

        const windowHeight = window.innerHeight;
        const scrollY = lenisRef.current.scroll;

        const sectionHeight = windowHeight * 1.2;
        const totalSections = projects.length + 1;

        const currentSectionIndex = Math.round(scrollY / sectionHeight);
        const targetSection = Math.max(0, Math.min(currentSectionIndex, totalSections - 1));

        let targetScroll: number;

        if (targetSection === 0) {
          targetScroll = 0;
        } else {
          targetScroll = windowHeight * (1.35 + (targetSection - 1) * 1.2);
        }

        const currentDistance = Math.abs(scrollY - targetScroll);

        if (currentDistance < sectionHeight * 0.02) return;

        lenisRef.current.scrollTo(targetScroll, {
          duration: 2.5,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
      }, 1500);
    };

    lenis.on('scroll', handleUserInteraction);

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      lenis.destroy();
    };
  }, []);

  // Image source for cursor
  const imageNumber = projects[lastImageIndex]?.handle?.split('_')[1];

  return (
    <main onMouseMove={handleMouseMove} className="relative cursor-none h-screen flex flex-col overflow-hidden">
      <Description
        projects={projects}
        isExiting={isExiting}
        onProjectClick={handleProjectClick}
        onTitlesExitComplete={handleTitlesExitComplete}
        onEntryComplete={handleEntryComplete}
        onHover={handleHover}
      />
      <Footer isExiting={isExiting} />

      {/* Cursor image — plain div driven entirely by GSAP, no framer-motion conflict */}
      <div
        ref={cursorImageRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{ zIndex: 50, willChange: 'transform, opacity' }}
      >
        <div className="h-[40.3vw] w-[33.6vw] rounded-[2vw] overflow-hidden relative">
          {imageNumber && (
            <Image
              src={`/images/cursors/cursor_${imageNumber}.jpg`}
              alt="project preview"
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
        <div
          className="enter-project-text text-white text-right mt-4 pr-2"
          style={{
            fontFamily: 'Helvetica',
            fontSize: '16px',
            fontWeight: 400,
            width: '33.6vw',
          }}
        >
          ENTER PROJECT
        </div>
      </div>
    </main>
  );
}

