'use client';
import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
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

    // Auto-snap to closest section after 2 seconds of inactivity
    const handleUserInteraction = () => {
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set new timeout for 1.5 seconds
      scrollTimeoutRef.current = setTimeout(() => {
        if (!lenisRef.current) return;
        
        const windowHeight = window.innerHeight;
        const scrollY = lenisRef.current.scroll; // Use Lenis scroll position
        const totalSections = projects.length + 1; // +1 for Description section
        
        // Calculate which section we're currently in
        const currentSectionFloat = scrollY / windowHeight;
        const currentSection = Math.floor(currentSectionFloat);
        const progress = currentSectionFloat - currentSection;

        console.log('Snap check:', { scrollY, currentSection, progress });

        // Check if we're already snapped (within 2% threshold)
        if (progress < 0.02 || progress > 0.98) {
          console.log('Already snapped, skipping');
          return;
        }

        // Determine which section to snap to
        let targetSection: number;
        
        if (Math.abs(progress - 0.5) < 0.02) {
          // Close to 50/50, choose random
          targetSection = Math.random() < 0.5 ? currentSection : currentSection + 1;
          console.log('50/50 split, chose:', targetSection);
        } else if (progress < 0.5) {
          // Closer to current section
          targetSection = currentSection;
        } else {
          // Closer to next section
          targetSection = currentSection + 1;
        }

        // Ensure we don't go beyond bounds
        targetSection = Math.max(0, Math.min(targetSection, totalSections - 1));

        // Snap to target section
        const targetScroll = targetSection * windowHeight;
        console.log('Snapping to section:', targetSection, 'scroll:', targetScroll);
        
        lenisRef.current.scrollTo(targetScroll, {
          duration: 1.5,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
      }, 500);
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
        <Gallery mousePosition={mousePosition} project={project} index={i} key={i} />
      ))}
      <Description mousePosition={mousePosition} projects={projects} />
    </main>
  );
}

