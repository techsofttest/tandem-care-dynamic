"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

import {
  Droplets,
  Activity,
  Pill,
  Stethoscope,
  BrainCircuit,
  Brain,
  Dumbbell,
  ClipboardList,
  Home,
  LucideIcon,
} from "lucide-react";

/* -----------------------------
Interfaces
----------------------------- */

interface Feature {
  id: number;
  title: string;
  description: string;
}

interface Tab {
  id: number;
  title: string;
  features: Feature[];
}

interface ClinicalData {
  id: number;
  heading: string;
  tabs: Tab[];
}

/* -----------------------------
Component
----------------------------- */

export default function ClinicalDifferentiators() {
  const [data, setData] = useState<ClinicalData | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/home-adv-support`,
          {
            cache: "no-store",
          },
        );

        const result = await response.json();

        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const switchY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);
  const switchOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const cardVariants: Variants = {
    hidden: (idx: number) => ({
      opacity: 0,
      y: 100,
      scale: 0.7,
      rotate: (idx - 1.5) * 10,
    }),

    visible: (idx: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: idx * 0.1,
      },
    }),
  };

  /* ------------------------------------
       Icons for Features
    ------------------------------------ */

  const icons: LucideIcon[] = [
    Droplets,
    Activity,
    Pill,
    Stethoscope,
    Activity,
    BrainCircuit,
    Brain,
    Activity,
    Dumbbell,
    ClipboardList,
    Home,
  ];

  if (loading || !data) {
    return <section className="py-24 text-center">Loading...</section>;
  }

  return (
    <section className="w-full py-24 bg-brand-blue/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-20 max-w-[90rem] relative z-10">
        {/* Heading */}

        <motion.div
          style={{
            y: titleY,
            opacity: titleOpacity,
          }}
          className="text-center max-w-3xl mx-auto mb-10 lg:mb-12"
        >
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-slate-900 leading-tight">
            {data.heading}
          </h2>
        </motion.div>

        {/* Tabs */}

        <motion.div
          style={{
            y: switchY,
            opacity: switchOpacity,
          }}
          className="flex flex-wrap justify-center bg-white p-1.5 rounded-3xl mb-16 md:rounded-full mx-auto w-fit shadow-sm border border-brand-blue/10"
        >
          {data.tabs.map((tab, index) => {
            const isActive = activeTab === index;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`relative px-6 md:px-8 py-3 rounded-full text-sm font-bold transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-indigo-600 rounded-full shadow-md"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}

                <span className="relative z-10">{tab.title}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Feature Cards */}

        <div className="relative w-full mx-auto">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              data.tabs[activeTab].features.length === 3
                ? "lg:grid-cols-3 max-w-5xl"
                : "lg:grid-cols-4"
            } gap-6 mx-auto`}
          >
            {data.tabs[activeTab].features.map((feature, idx) => {
              const Icon = icons[idx % icons.length];

              return (
                <motion.div
                  key={feature.id}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.4,
                  }}
                  className="w-full"
                >
                  <div className="bg-white p-8 rounded-2xl border border-slate-100 h-full flex flex-col items-start hover:border-brand-blue/30 transition-all duration-300">
                    <div className="mb-5 inline-block">
                      <Icon
                        className="w-12 h-12 text-brand-blue"
                        strokeWidth={2}
                      />
                    </div>

                    <h4 className="text-slate-900 font-bold text-lg leading-snug mb-3">
                      {feature.title}
                    </h4>

                    <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
