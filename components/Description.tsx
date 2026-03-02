'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, MotionValue /* , useTransform */ } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types/project';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

interface DescriptionProps {
  mousePosition: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  cursorPosition: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  projects: Project[];
  cursorVisible: boolean;
  isExiting: boolean;
  onProjectClick: (slug: string) => void;
  onExitComplete: () => void;
}

export default function Description({ mousePosition, cursorPosition, projects, cursorVisible, isExiting, onProjectClick, onExitComplete }: DescriptionProps) {
  const [index, setIndex] = useState(0);
  const [lastImageIndex, setLastImageIndex] = useState(0);
  const { x, y } = mousePosition;
  const hasImage = projects[index]?.slug !== 'resume';
  const titlesContainerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // 3D tilt: derive rotation from offset between raw cursor and lagging card position
  // const maxTilt = 12; // degrees
  // const rotateY = useTransform(
  //   [cursorPosition.x, x],
  //   ([cx, cardX]: number[]) => {
  //     const offset = cx - cardX;
  //     // Normalize by ~200px range, clamp to maxTilt
  //     return Math.max(-maxTilt, Math.min(maxTilt, (offset / 200) * maxTilt));
  //   }
  // );
  // const rotateX = useTransform(
  //   [cursorPosition.y, y],
  //   ([cy, cardY]: number[]) => {
  //     const offset = cy - cardY;
  //     // Invert: mouse below card → tilt forward (negative rotateX)
  //     return Math.max(-maxTilt, Math.min(maxTilt, -(offset / 200) * maxTilt));
  //   }
  // );

  const handleHover = (i: number) => {
    setIndex(i);
    if (projects[i]?.slug !== 'resume') {
      setLastImageIndex(i);
    }
  };

  useEffect(() => {
    if (!titlesContainerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const titles = titlesContainerRef.current.querySelectorAll('.project-title');

    // Set initial state - hidden
    gsap.set(titles, { visibility: 'visible', opacity: 0 });

    // Animate each title with rolling 3D effect, staggered
    titles.forEach((title, i) => {
      const split = SplitText.create(title, {
        type: 'chars',
        charsClass: 'rolling-char',
      });

      gsap.set(title, {
        perspective: 700,
        transformStyle: 'preserve-3d',
        opacity: 1,
      });

      const depth = -window.innerWidth / 8;

      gsap.fromTo(
        split.chars,
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
          delay: i * 0.15,
        }
      );
    });
  }, []);

  // Exit animation: reverse rolling effect
  useEffect(() => {
    if (!isExiting || !titlesContainerRef.current) return;

    const titles = titlesContainerRef.current.querySelectorAll('.project-title');
    const depth = -window.innerWidth / 8;

    const tl = gsap.timeline({
      onComplete: onExitComplete,
    });

    // Animate titles out in reverse order (last title first)
    titles.forEach((title, i) => {
      const chars = title.querySelectorAll('.rolling-char');
      tl.to(
        chars,
        {
          rotationX: 90,
          opacity: 0,
          transformOrigin: `50% 50% ${depth}px`,
          stagger: 0.02,
          duration: 0.5,
          ease: 'power3.in',
        },
        i * 0.08 // stagger between titles
      );
    });
  }, [isExiting, onExitComplete]);

  return (
    <div className="relative flex-1 w-full" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0)' }}>
      <div ref={titlesContainerRef} className="absolute flex h-full w-full flex-col items-center justify-center z-10">
        {projects.map(({ title, slug }, i) => (
          <p
            onMouseOver={() => handleHover(i)}
            onClick={() => onProjectClick(slug)}
            key={`p${i}`}
            className="project-title m-0 cursor-none text-[5.4vw] uppercase leading-none text-white"
            style={{ visibility: 'hidden' }}
          >
            {title}
          </p>
        ))}
      </div>

      {/* <div style={{ perspective: 800, position: 'fixed', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%', zIndex: 1 }}> */}
        <motion.div
          className="fixed top-0 pointer-events-none"
          style={{
            x,
            y,
            // rotateX,
            // rotateY,
            // transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: cursorVisible && hasImage && !isExiting ? 0.95 : 0,
            scale: cursorVisible && hasImage && !isExiting ? 1 : 0,
          }}
          transition={{
            duration: 1.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <div className="h-[40.3vw] w-[33.6vw] rounded-[2vw] overflow-hidden relative">
            <Image
              src={`/images/cursors/cursor_${projects[lastImageIndex].handle.split('_')[1]}.jpg`}
              alt="project preview"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* ENTER PROJECT text below cursor */}
          <div 
            className="text-white text-right mt-4 pr-2"
            style={{ 
              fontFamily: 'Helvetica', 
              fontSize: '16px', 
              fontWeight: 400,
              width: '33.6vw',
              zIndex: 9999,
            }}
          >
            ENTER PROJECT
          </div>
        </motion.div>
      {/* </div> */}
    </div>
  );
}
