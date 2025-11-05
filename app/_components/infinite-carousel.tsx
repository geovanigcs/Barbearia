"use client";

import { motion, useAnimation, useMotionValue, PanInfo } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface InfiniteCarouselProps {
  children: React.ReactNode[];
  speed?: number; // pixels per second
}

export function InfiniteCarousel({
  children,
  speed = 30,
}: InfiniteCarouselProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, [children]);

  // Calcular duração baseado na largura e velocidade
  const duration = contentWidth / speed;

  // Animação automática quando não está arrastando
  useEffect(() => {
    if (!isDragging && contentWidth > 0) {
      const animate = async () => {
        await controls.start({
          x: [-contentWidth / 2, 0],
          transition: {
            duration: duration,
            repeat: Infinity,
            ease: "linear",
          },
        });
      };
      animate();
    }
  }, [isDragging, contentWidth, duration, controls]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    // Retomar a animação após o arrasto
    const currentX = x.get();
    const normalizedX = ((currentX % (contentWidth / 2)) + (contentWidth / 2)) % (contentWidth / 2);
    x.set(normalizedX);
  };

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div
        ref={contentRef}
        className="flex gap-4 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -contentWidth / 2, right: 0 }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x }}
      >
        {/* Renderizar duas vezes para efeito infinito */}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
