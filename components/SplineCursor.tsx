'use client';
import { motion, MotionValue } from 'framer-motion';

interface SplineCursorProps {
  mousePosition: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
}

export default function SplineCursor({ mousePosition }: SplineCursorProps) {
  const { x, y } = mousePosition;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 h-[35vw] w-[39vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
      style={{
        x,
        y,
        mixBlendMode: "lighten",
      }}
    >
      <iframe
        src="https://my.spline.design/3dcircularcardscopycopy-1LAho2XcQsKxRVH5wPT2LvB9-2Xk/"
        frameBorder="0"
        width="100%"
        height="180%"
        className="pointer-events-none -translate-y-[25%]"
      />
    </motion.div>
  );
}
