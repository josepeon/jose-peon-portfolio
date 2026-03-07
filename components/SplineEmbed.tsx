'use client';

import { useRef, useState, useCallback } from 'react';
import Spline from '@splinetool/react-spline';

interface SplineEmbedProps {
  scene: string;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  onLoaded?: () => void;
}

export default function SplineEmbed({ scene, active, onActivate, onDeactivate, onLoaded }: SplineEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    // Wait for the GPU to actually render the first frame(s)
    // before revealing — onLoad fires when data is ready,
    // but WebGL still needs a couple of paint cycles.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLoaded(true);
        onLoaded?.();
      });
    });
  }, [onLoaded]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      onMouseLeave={onDeactivate}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease-out',
        }}
      >
        <Spline
          scene={scene}
          onLoad={handleLoad}
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: active ? 'auto' : 'none',
          }}
        />
      </div>

      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-[12px] uppercase tracking-[0.15em] opacity-50">
            Loading 3D scene...
          </span>
        </div>
      )}

      {/* Click-to-activate overlay */}
      {!active && loaded && (
        <div
          className="absolute inset-0"
          style={{ cursor: 'none', zIndex: 2 }}
          onClick={onActivate}
        />
      )}
    </div>
  );
}
