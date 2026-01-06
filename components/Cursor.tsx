'use client';
import { motion, MotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';

interface CursorProps {
  mousePosition: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  cursorIndex: number;
}

export default function Cursor({ mousePosition, cursorIndex }: CursorProps) {
  const { x, y } = mousePosition;

  return (
    <motion.div
      className="pointer-events-none fixed left-1/2 top-1/2 h-[500px] w-[350px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl"
      style={{
        x,
        y,
      }}
    >
      <Image
        src={`/images/cursors/cursor_${cursorIndex}.jpg`}
        alt={`cursor ${cursorIndex}`}
        fill
        className="object-cover"
        key={`cursor-${cursorIndex}`}
      />
    </motion.div>
  );
}
