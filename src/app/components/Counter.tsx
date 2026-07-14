"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

export function Counter({
  to,
  suffix = "",
  label,
}: {
  to: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1.4, bounce: 0 });

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, to, motionVal]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toString();
    });
  }, [spring]);

  return (
    <div className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-gradient">
        <span ref={ref}>0</span>
        {suffix}
      </div>
      <div className="mt-2 text-sm text-muted">{label}</div>
    </div>
  );
}

export function StatsRow({
  stats,
}: {
  stats: { to: number; suffix?: string; label: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-8 glass rounded-2xl p-8"
    >
      {stats.map((s) => (
        <Counter key={s.label} {...s} />
      ))}
    </motion.div>
  );
}