"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface DraggableCarouselProps {
  children: React.ReactNode[];
}

export function DraggableCarousel({ children }: DraggableCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const scrollWidth = carousel.scrollWidth;
      const clientWidth = carousel.parentElement?.clientWidth || 0;
      
      // Define os limites de arrasto
      setDragConstraints({
        left: -(scrollWidth - clientWidth),
        right: 0,
      });
    }
  }, [children]);

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={carouselRef}
        drag="x"
        dragConstraints={dragConstraints}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        className="flex gap-4 cursor-grab active:cursor-grabbing"
        style={{
          pointerEvents: isDragging ? "none" : "auto",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
