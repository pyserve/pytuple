"use client";

import { SparklesCore } from "@/components/main/ui/sparkles";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Active Users", value: 125000, suffix: "+" },
  { label: "Languages Supported", value: 50, suffix: "+" },
  { label: "Countries", value: 120, suffix: "+" },
  { label: "Call Minutes", value: 10, suffix: "M+" },
];

export function StatsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="rounded-lg bg-slate-900/50 border border-slate-800 p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <SparklesCore
              id={`statSparkles-${index}`}
              background="transparent"
              minSize={0.3}
              maxSize={0.8}
              particleDensity={15}
              className="w-full h-full"
              particleColor="#8B5CF6"
              speed={0.3}
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={hasAnimated ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 to-neutral-400 relative z-10"
          >
            <CountUp
              to={stat.value}
              isInView={hasAnimated}
              duration={2}
              suffix={stat.suffix}
            />
          </motion.div>
          <p className="mt-2 text-sm text-slate-400 relative z-10">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

interface CountUpProps {
  to: number;
  isInView: boolean;
  duration: number;
  suffix?: string;
}

function CountUp({ to, isInView, duration, suffix = "" }: CountUpProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const progressPercent = Math.min(progress / (duration * 1000), 1);

      // Ease out cubic: y = 1 - (1 - x)^3
      const easeOutValue = 1 - Math.pow(1 - progressPercent, 3);
      const nextCount = Math.floor(easeOutValue * to);

      if (nextCount !== countRef.current) {
        countRef.current = nextCount;
        setCount(nextCount);
      }

      if (progressPercent < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      startTimeRef.current = null;
    };
  }, [isInView, to, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}
