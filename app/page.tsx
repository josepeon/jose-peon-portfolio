'use client';
import { useEffect, useRef } from 'react';
import { useSpring } from 'framer-motion';
import Lenis from 'lenis';
import Gallery from '@/components/Gallery';
import Description from '@/components/Description';
import { projects } from '@/data/projects';

const spring = {
  stiffness: 150,
  damping: 15,
  mass: 0.1,
};

export default function Home() {
  const mouseX = useSpring(0, spring);
  const mouseY = useSpring(0, spring);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const mousePosition = {
    x: mouseX,
    y: mouseY,
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const targetX = clientX - (window.innerWidth / 2) * 0.25;
    const targetY = clientY - (window.innerWidth / 2) * 0.3;
    mouseX.set(targetX);
    mouseY.set(targetY);
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

    // Auto-snap to closest section after 1.5 seconds of inactivity
    const handleUserInteraction = () => {
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set new timeout for 1.5 seconds
      scrollTimeoutRef.current = setTimeout(() => {
        if (!lenisRef.current) return;
        
        const windowHeight = window.innerHeight;
        const scrollY = lenisRef.current.scroll;
        
        // All sections (Gallery and Description) are 120vh
        const sectionHeight = windowHeight * 1.2;
        const totalSections = projects.length + 1;
        
        // Find which section we're closest to
        const currentSectionIndex = Math.round(scrollY / sectionHeight);
        const targetSection = Math.max(0, Math.min(currentSectionIndex, totalSections - 1));
        
        // Calculate target scroll position to completely show the section
        let targetScroll: number;
        
        if (targetSection === 0) {
          targetScroll = 0;
        } else {
          // Section 1: 135vh, Section 2: 255vh, Section 3: 375vh, etc.
          // Pattern: 135 + (section - 1) * 120
          targetScroll = windowHeight * (1.35 + (targetSection - 1) * 1.2);
        }
        
        const currentDistance = Math.abs(scrollY - targetScroll);

        console.log('Snap check:', { 
          scrollY, 
          sectionHeight, 
          currentSectionIndex, 
          targetSection, 
          targetScroll,
          currentDistance 
        });

        // Only snap if we're more than 2% away from target
        if (currentDistance < sectionHeight * 0.02) {
          console.log('Already snapped, skipping');
          return;
        }

        console.log('Snapping to section:', targetSection, 'scroll:', targetScroll);
        
        lenisRef.current.scrollTo(targetScroll, {
          duration: 2.5,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
      }, 1500);
    };

    // Listen to Lenis scroll events
    lenis.on('scroll', handleUserInteraction);

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      lenis.destroy();
    };
  }, []);

  return (
    <main onMouseMove={handleMouseMove} className="relative cursor-none">
      {projects.map((project, i) => (
        <Gallery mousePosition={mousePosition} project={project} key={i} />
      ))}
      <Description mousePosition={mousePosition} projects={projects} />
    </main>
  );
}

