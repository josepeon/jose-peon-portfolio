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
        className="fixed top-0 h-[30vw] w-[25vw] overflow-hidden"
        style={{
          x,
          y,
          borderRadius: '1.5vw',
        }}
      >
        <Image
          src={`/images/cursors/cursor_${projects[index].handle.split('_')[1]}.jpg`}
          alt="project preview"
          fill
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
