"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import ScrollImageStack from "./ScrollImageStack";

interface HeroData {
  id: number;
  main_title: string;
  highlight_title: string;
  content: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
}

export default function HeroSection() {
  const [hero, setHero] = useState<HeroData | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/home-banner`,
        );

        const result = await response.json();

        if (result.success) {
          setHero(result.data);
        }
      } catch (error) {
        console.error("Error loading hero section:", error);
      }
    };

    fetchHero();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  if (!hero) {
    return (
      <section className="h-screen flex items-center justify-center">
        Loading...
      </section>
    );
  }

  return (
    <section className="relative w-full bg-white overflow-hidden pt-12 lg:pt-16">
      {/* Background */}

      <div className="absolute top-0 rounded-[1.4rem] inset-x-4 md:inset-x-6 lg:inset-x-8 bottom-4 md:bottom-6 lg:bottom-8 pointer-events-none bg-gradient-to-b from-[#246796] via-brand-blue/40 to-transparent rounded-b-[2rem] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-6 bg-white rounded-b-full" />

        {[
          { top: 10, left: 12, size: 12, delay: 0 },
          { top: 25, left: 28, size: 10, delay: 0.3 },
          { top: 45, left: 75, size: 14, delay: 0.6 },
          { top: 15, left: 88, size: 10, delay: 0.9 },
          { top: 30, left: 62, size: 16, delay: 1.2 },
          { top: 52, left: 20, size: 12, delay: 1.5 },
          { top: 8, left: 48, size: 14, delay: 1.8 },
          { top: 38, left: 83, size: 10, delay: 2.1 },
          { top: 20, left: 3, size: 12, delay: 2.4 },
        ].map((star, i) => (
          <motion.div
            key={i}
            className="absolute text-white"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [0.15, 0.9, 0.15],
              scale: [0.75, 1.25, 0.75],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 3,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Content */}

      <div className="container mx-auto px-6 lg:px-30 max-w-[90rem] relative z-10 text-center flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto">
          <motion.h1
            className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-white leading-tight tracking-tight mb-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {hero.main_title.split("").map((char, index) => (
              <motion.span key={index} variants={charVariants}>
                {char}
              </motion.span>
            ))}{" "}
            <span className="text-brand-orange">
              {hero.highlight_title.split("").map((char, index) => (
                <motion.span key={`highlight-${index}`} variants={charVariants}>
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <p className="text-lg lg:text-xl text-slate-100 mb-14 max-w-lg mx-auto">
            {hero.content}
          </p>
        </div>
      </div>

      <ScrollImageStack
        images={[
          hero.image1,
          hero.image2,
          hero.image3,
          hero.image4,
          hero.image5,
        ]}
      />
    </section>
  );
}
