'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import Lenis from 'lenis';
// import Gallery from '@/components/Gallery';
import Description from '@/components/Description';
import Footer from '@/components/Footer';
import { projects } from '@/data/projects';

const spring = {
  stiffness: 150,
  damping: 15,
  mass: 0.1,
};

// Slower, lazier spring for the cursor image
const imageSpring = {
  stiffness: 50,
  damping: 20,
  mass: 0.5,
};

export default function Home() {
  const mouseX = useSpring(0, imageSpring);
  const mouseY = useSpring(0, imageSpring);
  const cursorX = useSpring(0, spring);
  const cursorY = useSpring(0, spring);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const hasMovedRef = useRef(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  const mousePosition = {
    x: mouseX,
    y: mouseY,
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Cursor image dimensions: 33.6vw x 40.3vw + ~40px for text
    const imgW = vw * 0.336;
    const imgH = vw * 0.403 + 40;

    // Account for footer height
    const footer = document.querySelector('footer');
    const footerH = footer ? footer.offsetHeight : 0;

    // Desired offset from mouse
    const offsetX = clientX - (vw / 2) * 0.25;
    const offsetY = clientY - (vw / 2) * 0.3;

    // Clamp so the image stays within viewport and above footer
    const clampedX = Math.max(0, Math.min(offsetX, vw - imgW));
    const clampedY = Math.max(0, Math.min(offsetY, vh - footerH - imgH));

    // On first move, jump instantly to position (no spring animation from 0,0)
    if (!hasMovedRef.current) {
      hasMovedRef.current = true;
      setCursorVisible(true);
      mouseX.jump(clampedX);
      mouseY.jump(clampedY);
      cursorX.jump(clientX);
      cursorY.jump(clientY);
      return;
    }

    mouseX.set(clampedX);
    mouseY.set(clampedY);

    // Circle cursor follows actual mouse
    cursorX.set(clientX);
    cursorY.set(clientY);
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
    <main onMouseMove={handleMouseMove} className="relative cursor-none h-screen flex flex-col overflow-hidden">
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
      <Description mousePosition={mousePosition} cursorPosition={{ x: cursorX, y: cursorY }} projects={projects} cursorVisible={cursorVisible} />
      <Footer />
    </main>
  );
}

