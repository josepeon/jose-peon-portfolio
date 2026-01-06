"use client";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Project } from "@/types/project";

interface GalleryProps {
  project: Project;
  mousePosition: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
}

export default function Gallery({ project, mousePosition }: GalleryProps) {
  const { x, y } = mousePosition;
  const sceneNumber = project.handle.split("_")[1];
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const yPosition = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const scaleY = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.2, 1.15]);

  // Separate transitions for top and bottom text due to 120vh container
  const bottomTextPosition = useTransform(
    scrollYProgress,
    [0, 0.545, 0.548],
    ["fixed", "fixed", "absolute"]
  );

  const topTextPosition = useTransform(
    scrollYProgress,
    [0, 0.455, 1.0],
    ["fixed", "fixed", "absolute"]
  );

  return (
    <div
      ref={container}
      className="relative h-[120vh] w-full overflow-hidden"
      style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)" }}
    >
      {/* Background Image */}
      <motion.div
        className="fixed top-0 left-0 h-[120vh] w-full"
        style={{ y: yPosition, scaleY }}
      >
        <Image
          src={`/images/scenes/${project.handle}.jpg`}
          alt={`${project.handle} background`}
          fill
          className="object-cover"
          style={{ objectPosition: "center" }}
          priority
        />
      </motion.div>

      {/* Text overlays - revealed by previous scene's background scrolling away */}
      {/* Top Left Text */}
      <motion.div
        className="left-[97px] top-[47px] text-white"
        style={{
          position: topTextPosition as any,
          zIndex: 10,
          fontFamily: "Helvetica",
          fontSize: "20px",
          fontWeight: 400,
          lineHeight: "1.5",
        }}
      >
        {project.topLeftText.map((line, i) => (
          <div key={i}>{line || "\u00A0"}</div>
        ))}
      </motion.div>

      {/* Bottom Left Text */}
      <motion.div
        className="bottom-[50px] left-[97px] text-white"
        style={{
          position: bottomTextPosition as any,
          zIndex: 10,
          fontFamily: "Helvetica",
          fontSize: "20px",
          fontWeight: 400,
        }}
      >
        {project.bottomLeftText}
      </motion.div>

      {/* Bottom Right Year */}
      <motion.div
        className="bottom-[50px] right-[73px] text-white"
        style={{
          position: bottomTextPosition as any,
          zIndex: 10,
          fontFamily: "Helvetica",
          fontSize: "20px",
          fontWeight: 400,
        }}
      >
        {project.year}
      </motion.div>

      {/* Vignette - fixed position, clipped by parent */}
      <motion.div
        className="fixed top-0 pointer-events-none"
        style={{
          x,
          y,
        }}
      >
        <div className="h-[30vw] w-[25vw] rounded-[1.5vw] overflow-hidden relative">
          <Image
            src={`/images/cursors/cursor_${sceneNumber}.jpg`}
            alt={`${project.handle} cursor`}
            fill
            className="object-cover"
          />
        </div>

        {/* ENTER PROJECT text below cursor */}
        <div
          className="text-white text-right mt-4 pr-2"
          style={{
            fontFamily: "Helvetica",
            fontSize: "16px",
            fontWeight: 400,
            width: "25vw",
            zIndex: 9999,
          }}
        >
          ENTER PROJECT
        </div>
      </motion.div>
    </div>
  );
}
