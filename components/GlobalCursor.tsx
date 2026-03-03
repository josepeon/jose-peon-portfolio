'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const spring = {
  stiffness: 150,
  damping: 15,
  mass: 0.1,
};

export default function GlobalCursor() {
  const cursorX = useSpring(0, spring);
  const cursorY = useSpring(0, spring);
  const hasMovedRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setVisible(true);
        cursorX.jump(e.clientX);
        cursorY.jump(e.clientY);
        return;
      }
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
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
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
