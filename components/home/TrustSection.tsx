"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, HeartHandshake, Activity } from "lucide-react";

interface TrustCard {
  title: string;
  description: string;
}

interface TrustData {
  id: number;

  heading: {
    line1: string;
    line2: string;
    suffix: string;
  };

  trust_desc: string[];

  image: string;

  provider: {
    line1: string;
    line2: string;
    line3: string;
  };

  cards: TrustCard[];
}

export default function TrustSection() {
  const [trust, setTrust] = useState<TrustData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrust() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/home-blt-on-trust`,
          {
            cache: "no-store",
          },
        );

        const result = await response.json();

        if (result.success) {
          setTrust(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrust();
  }, []);

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

  const icons = [
    <ShieldCheck
      key="shield"
      className="w-12 h-12 text-brand-blue"
      strokeWidth={2.5}
    />,

    <Activity
      key="activity"
      className="w-12 h-12 text-indigo-600"
      strokeWidth={2.5}
    />,

    <HeartHandshake
      key="heart"
      className="w-12 h-12 text-brand-orange"
      strokeWidth={2.5}
    />,
  ];

  return (
    <section className="w-full py-24 bg-white relative overflow-hidden">
      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container mx-auto px-6 lg:px-20 max-w-[90rem]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
        >
          {/* Left Column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">
              {loading ? (
                "Loading..."
              ) : !trust ? (
                "Built on Trust & Care"
              ) : (
                <>
                  {trust.heading?.line1}

                  <br />

                  <span className="text-brand-blue">
                    {trust.heading?.line2}
                    {trust.heading?.suffix}
                  </span>
                </>
              )}
            </h2>

            <div className="text-lg text-slate-600 mb-10 max-w-md space-y-4">
              {trust?.trust_desc?.map((desc, index) => (
                <p key={index} className="leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>

            <div className="flex flex-row items-center gap-5 w-fit">
              <div className="relative w-50 h-50 flex-shrink-0">
                <Image
                  src={trust?.image || "/ndis-logo/ndis-logo.png"}
                  alt="NDIS Provider"
                  fill
                  sizes="200px"
                  className="object-contain"
                />
              </div>

              <p className="text-xl font-bold text-brand-blue uppercase tracking-widest leading-snug text-left">
                {trust?.provider.line1}

                <br />

                {trust?.provider.line2}

                <br />

                {trust?.provider.line3}
              </p>
            </div>
          </motion.div>

          {/* Right Column Starts Here */}
          <motion.div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {(trust?.cards || []).map((card, index) => {
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
                    className={`group h-full bg-slate-50 bg-[radial-gradient(ellipse_at_top_right,_rgba(53,146,207,0.12),_transparent_65%)] p-8 rounded-2xl border border-slate-200 cursor-pointer transition-all duration-300 ease-out transform ${rotationClass} hover:rotate-0 hover:-translate-y-2 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),_0_8px_10px_-6px_rgba(0,0,0,0.1)] hover:border-brand-blue/30`}
                  >
                    <div className="mb-6 inline-block transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      {icons[index] ?? icons[0]}
                    </div>

                    <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">
                      {card.title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
