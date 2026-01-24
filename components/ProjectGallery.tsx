'use client';

import { Project } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface ProjectMedia {
  src: string;
  type: 'image' | 'video';
  name: string;
}

interface ProjectGalleryProps {
  project: Project;
  media: ProjectMedia[];
  heroMedia?: ProjectMedia;
}

export default function ProjectGallery({ project, media, heroMedia }: ProjectGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<ProjectMedia | null>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });

  // Text stays fixed until we scroll past the hero section
  const textPosition = useTransform(
    scrollYProgress,
    [0, 0.62, 0.62],
    ["fixed", "fixed", "absolute"]
  );

  // Scroll to top on mount
  useEffect(() => {
    // Immediate scroll
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Also scroll after a brief delay to ensure it happens after render
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-start p-12">
        <Link
          href="/"
          className="text-white hover:opacity-70 transition-opacity"
          style={{ fontFamily: 'Helvetica', fontSize: '16px' }}
        >
          BACK
        </Link>
        <div
          className="text-right"
          style={{ fontFamily: 'Helvetica', fontSize: '16px' }}
        >
          {project.year}
        </div>
      </header>

      {/* Project Title Section */}
      <section ref={heroSectionRef} className="min-h-screen flex flex-col justify-center items-center relative">
        {/* Hero Background Video/Image */}
        {heroMedia && (
          <div className="w-full">
            {heroMedia.type === 'video' ? (
              <video
                src={heroMedia.src}
                className="w-full h-auto"
                muted
                loop
                playsInline
                autoPlay
              />
            ) : (
              <Image
                src={heroMedia.src}
                alt="Hero background"
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority
                quality={80}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECABEhMf/aAAwDAQACEQMRAD8AzOC+1TTNPiiiuJI7WVmd4w5CuTxkj7Sqb/UNQumDXV5cXBXgGWVnx/dKUqllZMXZ//Z"
              />
            )}
          </div>
        )}

        {/* Centered Categories */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex gap-4 flex-wrap justify-center max-w-2xl px-8"
            style={{ fontFamily: 'Helvetica', fontSize: '14px' }}
          >
            {project.topLeftText.filter(text => text).map((text, i) => (
              <span key={i} className="opacity-60">{text}</span>
            ))}
          </motion.div>
        </div>

        {/* Text Overlay - Bottom Left */}
        <motion.div
          className="bottom-[50px] left-[97px] z-10 pointer-events-none"
          style={{
            position: textPosition as any,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              fontFamily: 'Helvetica',
              fontSize: '48px',
              fontWeight: 400,
            }}
          >
            {project.bottomLeftText}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mt-[11px] max-w-md"
            style={{
              fontFamily: 'Helvetica',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '1.6',
              opacity: 0.7,
            }}
          >
            OH exists to redefine e-commerce by turning online shopping into immersive, spatial experiences. This is the foundation for a new kind of digital reality.
          </motion.p>
        </motion.div>
      </section>

      {/* Media Gallery - 2-1-2-1 Layout with aligned rows */}
      <section className="pb-32">
        <div className="flex flex-col">
          {(() => {
            const rows: ProjectMedia[][] = [];
            let i = 0;
            let rowType = 2;
            while (i < media.length) {
              rows.push(media.slice(i, i + rowType));
              i += rowType;
              rowType = rowType === 2 ? 1 : 2;
            }
            return rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={row.length === 2 ? 'flex flex-row items-stretch' : 'w-full'}
              >
                {row.map((item) => (
                  <div
                    key={item.name}
                    className={`cursor-pointer ${row.length === 2 ? 'w-1/2 bg-black flex items-center justify-center' : 'w-full'}`}
                    onClick={() => setSelectedMedia(item)}
                  >
                    {item.type === 'image' ? (
                      <Image
                        src={item.src}
                        alt={item.name}
                        width={1920}
                        height={1080}
                        className={row.length === 2 ? 'w-full h-full object-cover' : 'w-full h-auto'}
                        sizes={row.length === 2 ? '50vw' : '100vw'}
                        priority={rowIndex < 2}
                        loading={rowIndex < 2 ? 'eager' : 'lazy'}
                        quality={75}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECABEhMf/aAAwDAQACEQMRAD8AzOC+1TTNPiiiuJI7WVmd4w5CuTxkj7Sqb/UNQumDXV5cXBXgGWVnx/dKUqllZMXZ//Z"
                      />
                    ) : (
                      <video
                        src={item.src}
                        className={row.length === 2 ? 'w-full h-full object-cover' : 'w-full h-auto'}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload={rowIndex < 2 ? 'auto' : 'metadata'}
                      />
                    )}
                  </div>
                ))}
              </div>
            ));
          })()}
        </div>
      </section>

      {/* Lightbox */}
      {selectedMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-pointer"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            className="absolute top-8 right-8 text-white hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'Helvetica', fontSize: '16px' }}
            onClick={() => setSelectedMedia(null)}
          >
            CLOSE
          </button>
          <div className="relative w-[90vw] h-[90vh]">
            {selectedMedia.type === 'image' ? (
              <Image
                src={selectedMedia.src}
                alt={selectedMedia.name}
                fill
                className="object-contain"
                sizes="90vw"
              />
            ) : (
              <video
                src={selectedMedia.src}
                className="w-full h-full object-contain"
                controls
                autoPlay
              />
            )}
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="py-12 text-center">
        <Link
          href="/"
          className="text-white/60 hover:text-white transition-colors"
          style={{ fontFamily: 'Helvetica', fontSize: '14px' }}
        >
          BACK TO ALL PROJECTS
        </Link>
      </footer>
    </main>
  );
}
