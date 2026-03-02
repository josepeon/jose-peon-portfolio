'use client';
import { useState } from 'react';
import { motion, MotionValue } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types/project';

interface DescriptionProps {
  mousePosition: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  projects: Project[];
  cursorVisible: boolean;
}

export default function Description({ mousePosition, projects, cursorVisible }: DescriptionProps) {
  const [index, setIndex] = useState(0);
  const [lastImageIndex, setLastImageIndex] = useState(0);
  const { x, y } = mousePosition;
  const hasImage = projects[index]?.slug !== 'resume';

  const handleHover = (i: number) => {
    setIndex(i);
    if (projects[i]?.slug !== 'resume') {
      setLastImageIndex(i);
    }
  };

  return (
    <div className="relative flex-1 w-full" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0)' }}>
      <div className="absolute flex h-full w-full flex-col items-center justify-center z-10">
        {projects.map(({ title }, i) => (
          <p
            onMouseOver={() => handleHover(i)}
            key={`p${i}`}
            className="m-0 cursor-none text-[5.4vw] uppercase leading-none text-white"
            style={{ textShadow: '0 0.15em 0.3em rgba(0, 0, 0, 0.5)' }}
          >
            {title}
          </p>
        ))}
      </div>

      <motion.div
        className="fixed top-0 pointer-events-none"
        style={{
          x,
          y,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: cursorVisible && hasImage ? 0.95 : 0,
          scale: cursorVisible && hasImage ? 1 : 0,
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
    </div>
  );
}
