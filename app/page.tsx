'use client';
import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import Gallery from '@/components/Gallery';
import Description from '@/components/Description';
import SplineCursor from '@/components/SplineCursor';
import { projects } from '@/data/projects';

const spring = {
  stiffness: 150,
  damping: 15,
  mass: 0.1,
};

export default function Home() {
  const mouseX = useSpring(0, spring);
  const mouseY = useSpring(0, spring);

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
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main onMouseMove={handleMouseMove} className="relative">
      {projects.map((project, i) => (
        <Gallery mousePosition={mousePosition} project={project} key={i} />
      ))}
      <Description mousePosition={mousePosition} projects={projects} />
      <SplineCursor mousePosition={mousePosition} />
    </main>
  );
}

