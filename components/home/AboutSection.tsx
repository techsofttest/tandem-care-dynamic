"use client";

import { useRef, useEffect, useState } from "react";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Users, Target, ShieldCheck, Eye, LucideIcon } from "lucide-react";

/* ---------------------------------------
Interfaces
---------------------------------------- */

interface Card {
  title: string;
  description: string;
}

interface AboutData {
  id: number;
  heading: {
    line1: string;
    line2: string;
    suffix: string;
  };

  who_desc: string[];

  image: string;
  cards: Card[];
}

export default function AboutSection() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/who-we-are`,
          {
            cache: "no-store",
          },
        );

        const result = await response.json();

        if (result.success) {
          setAbout(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAbout();
  }, []);

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const icons: LucideIcon[] = [Target, Eye, ShieldCheck];

  const iconColors = ["text-brand-blue", "text-purple-600", "text-indigo-600"];

  const hoverBorders = [
    "hover:border-brand-blue/30",
    "hover:border-purple-600/30",
    "hover:border-indigo-600/30",
  ];

  const backgrounds = [
    "bg-[radial-gradient(ellipse_at_top_right,_rgba(53,146,207,0.12),_transparent_65%)]",
    "bg-[radial-gradient(ellipse_at_top_right,_rgba(107,33,168,0.08),_transparent_65%)]",
    "bg-[radial-gradient(ellipse_at_top_right,_rgba(79,70,229,0.10),_transparent_65%)]",
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 bg-white relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-20 max-w-[90rem] relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={containerVariants}
          className="grid lg:grid-cols-12 gap-16 items-start"
        >
          {/* Left Side */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative flex justify-center lg:justify-start lg:sticky lg:top-32 h-fit"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-[#3592CF]/10 to-[#FCB040]/10 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="relative w-full max-w-md aspect-[4/5] rounded-[1.5rem] overflow-hidden">
              <motion.div
                style={{ y: imageY }}
                className="absolute inset-0 -top-[15%] -bottom-[15%] w-full h-[130%] bg-slate-100"
              >
                <Image
                  src={about?.image || "/services/Home Support Services.jpg"}
                  alt="Tandem Care"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px)100vw,450px"
                />
              </motion.div>

              <div className="absolute inset-0 bg-brand-blue/10 mix-blend-overlay pointer-events-none" />

              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-white"
              >
                <div className="relative w-24 h-24">
                  <Image
                    src="/logo/logo2.png"
                    alt="Logo"
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side */}

          {/* Right Side */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <h2 className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-3">
              Who We Are
            </h2>

            <h3 className="text-3xl lg:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">
              {loading ? (
                "Loading..."
              ) : !about ? (
                "Empowering Independence & Care"
              ) : (
                <>
                  {about.heading?.line1}
                  <br />

                  <span className="text-brand-blue">
                    {about.heading?.line2}
                    {about.heading?.suffix}
                  </span>
                </>
              )}
            </h3>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl">
              {about?.who_desc?.[0]}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
              {(about?.cards || []).map((card, index) => {
                const Icon = icons[index % icons.length];

                const rotationClass =
                  index === 0
                    ? "-rotate-3"
                    : index === 1
                      ? "rotate-3"
                      : "-rotate-2";

                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={
                      index === 2 ? "sm:col-span-2 sm:w-2/3 sm:mx-auto" : ""
                    }
                  >
                    <div
                      className={`group h-full bg-slate-50 ${
                        backgrounds[index % backgrounds.length]
                      } p-8 rounded-2xl border border-slate-200 cursor-pointer transition-all duration-300 ease-out transform ${rotationClass} hover:rotate-0 hover:-translate-y-2 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),_0_8px_10px_-6px_rgba(0,0,0,0.1)] ${
                        hoverBorders[index % hoverBorders.length]
                      }`}
                    >
                      <div className="mb-6 inline-block transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                        <Icon
                          className={`w-12 h-12 ${
                            iconColors[index % iconColors.length]
                          }`}
                          strokeWidth={2.5}
                        />
                      </div>

                      <h4 className="text-xl font-heading font-bold text-slate-900 mb-3">
                        {card.title}
                      </h4>

                      <p className="text-slate-600 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
