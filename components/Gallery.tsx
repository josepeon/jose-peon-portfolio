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

  const scaleY = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1]);

  return (
    <div
      ref={container}
      className="relative h-[120vh] w-full"
      style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)" }}
    >
      {/* Background Image with scale animation */}
      <motion.div className="relative h-full w-full" style={{ scaleY }}>
        <Image
          src={`/images/scenes/${project.handle}.jpg`}
          alt={`${project.handle} background`}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Text overlays - outside the scaled container */}
      {/* Top Left Text */}
      <div
        className="absolute left-[97px] top-[47px] text-white"
        style={{
          fontFamily: "Helvetica",
          fontSize: "20px",
          fontWeight: 400,
          lineHeight: "1.5",
        }}
      >
        {project.topLeftText.map((line, i) => (
          <div key={i}>{line || "\u00A0"}</div>
        ))}
      </div>

      {/* Bottom Left Text */}
      <div
        className="absolute bottom-[50px] left-[97px] text-white"
        style={{ fontFamily: "Helvetica", fontSize: "20px", fontWeight: 400 }}
      >
        {project.bottomLeftText}
      </div>

      {/* Bottom Right Year */}
      <div
        className="absolute bottom-[50px] right-[73px] text-white"
        style={{ fontFamily: "Helvetica", fontSize: "20px", fontWeight: 400 }}
      >
        {project.year}
      </div>
    </div>
  );
}
