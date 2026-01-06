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
}

export default function Description({ mousePosition, projects }: DescriptionProps) {
  const [index, setIndex] = useState(0);
  const { x, y } = mousePosition;

  return (
    <div className="relative h-[120vh] w-full" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0)' }}>
      <div className="absolute flex h-full w-full flex-col items-center justify-center z-10">
        {projects.map(({ title }, i) => (
          <p
            onMouseOver={() => setIndex(i)}
            key={`p${i}`}
            className="m-0 cursor-default text-[7vw] uppercase leading-none text-white"
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
      >
        <div className="h-[30vw] w-[25vw] rounded-[1.5vw] overflow-hidden relative">
          <Image
            src={`/images/cursors/cursor_${projects[index].handle.split('_')[1]}.jpg`}
            alt="project preview"
            fill
            className="object-cover"
          />
        </div>
        
        {/* ENTER PROJECT text below cursor */}
        <div 
          className="text-white text-right mt-4 pr-2"
          style={{ 
            fontFamily: 'Helvetica', 
            fontSize: '16px', 
            fontWeight: 400,
            width: '25vw',
            zIndex: 9999,
          }}
        >
          ENTER PROJECT
        </div>
      </motion.div>
    </div>
  );
}
