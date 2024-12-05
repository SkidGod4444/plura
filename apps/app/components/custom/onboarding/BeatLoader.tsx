"use client";

import { motion } from "motion/react";

export default function BeatLoader() {
  return (
    <div className="flex backdrop:space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-3 h-3 bg-muted rounded-full"
          animate={{
            scale: [1, 0.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
}
