// components/ScrollReveal.tsx
"use client";
import { Children, ReactNode, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  cascade?: boolean;
  stagger?: number;
  from?: "start" | "center" | "end";
  className?: string;
};

export default function ScrollReveal({
  children,
  y = 16,
  x = 0,
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.35,
  cascade = false,
  stagger = 0.07,
  from = "start",
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(el);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  const ease = [0.22, 0.65, 0.3, 1] as const;

  if (!cascade) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0, y, x }}
        animate={visible ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
        transition={{ duration, delay, ease }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    );
  }

  const items = useMemo(() => Children.toArray(children), [children]);
  const mid = Math.floor(items.length / 2);
  const getDelay = (i: number) =>
    from === "start"
      ? delay + i * stagger
      : from === "end"
      ? delay + (items.length - 1 - i) * stagger
      : delay + Math.abs(i - mid) * stagger;

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <motion.div
          key={(isValidElement(child) && (child as any).key) ?? i}
          initial={{ opacity: 0, y, x }}
          animate={visible ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
          transition={{ duration, delay: getDelay(i), ease }}
          style={{ willChange: "transform, opacity" }}
        >
          {isValidElement(child) ? cloneElement(child as any) : child}
        </motion.div>
      ))}
    </div>
  );
}
