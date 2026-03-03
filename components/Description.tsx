'use client';
import { useEffect, useRef } from 'react';
import { Project } from '@/types/project';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

interface DescriptionProps {
  projects: Project[];
  isExiting: boolean;
  onProjectClick: (slug: string, projectIndex: number) => void;
  onTitlesExitComplete: () => void;
  onHover: (index: number) => void;
}

export default function Description({ projects, isExiting, onProjectClick, onTitlesExitComplete, onHover }: DescriptionProps) {
  const titlesContainerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!titlesContainerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const titles = titlesContainerRef.current.querySelectorAll('.project-title');
    gsap.set(titles, { visibility: 'visible', opacity: 0 });

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
        { rotationX: -90, opacity: 0, transformOrigin: `50% 50% ${depth}px` },
        { rotationX: 0, opacity: 1, transformOrigin: `50% 50% ${depth}px`, stagger: 0.03, duration: 0.8, ease: 'power3.out', delay: i * 0.15 }
      );
    });
  }, []);

  // Exit animation: reverse rolling effect on titles only
  useEffect(() => {
    if (!isExiting || !titlesContainerRef.current) return;

    const titles = titlesContainerRef.current.querySelectorAll('.project-title');
    const depth = -window.innerWidth / 8;

    const tl = gsap.timeline({ onComplete: onTitlesExitComplete });

    titles.forEach((title, i) => {
      const chars = title.querySelectorAll('.rolling-char');
      tl.to(chars, {
        rotationX: 90, opacity: 0,
        transformOrigin: `50% 50% ${depth}px`,
        stagger: 0.02, duration: 0.5, ease: 'power3.in',
      }, i * 0.08);
    });
  }, [isExiting, onTitlesExitComplete]);

  return (
    <div className="relative flex-1 w-full">
      <div ref={titlesContainerRef} className="absolute flex h-full w-full flex-col items-center justify-center" style={{ zIndex: 60 }}>
        {projects.map(({ title, slug }, i) => (
          <p
            onMouseOver={() => { if (!isExiting) onHover(i); }}
            onClick={() => onProjectClick(slug, i)}
            key={`p${i}`}
            className="project-title m-0 cursor-none text-[5.4vw] uppercase leading-none text-white"
            style={{ visibility: 'hidden' }}
          >
            {title}
          </p>
        ))}
      </div>
    </div>
  );
}
