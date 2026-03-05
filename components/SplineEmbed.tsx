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
    setLoaded(true);
    onLoaded?.();
  }, [onLoaded]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      onMouseLeave={onDeactivate}
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

      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
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
