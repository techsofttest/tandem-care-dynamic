"use client";

import { useRef } from "react";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import type { Service } from "@/app/lib/services";

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
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
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 bg-gradient-to-br from-[#3592CF] via-white to-[#FCB040] relative overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-20 max-w-[90rem] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h3 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Comprehensive support,
              <br />
              <span className="text-slate-100">tailored to your life.</span>
            </h3>
          </div>

          <Button
            href="/services"
            variant="secondary"
            className="px-6 py-3 whitespace-nowrap"
          >
            View All Services
          </Button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.slice(0, 8).map((service) => (
            <motion.div key={service.id} variants={cardVariants}>
              <Link
                href={`/services/${service.slug}`}
                className="relative flex flex-col group h-full bg-white border border-slate-100 rounded-3xl hover:border-[#3592CF] transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#3592CF]/10 rounded-full blur-2xl" />

                <div className="absolute top-8 -left-8 w-24 h-24 bg-[#FCB040]/10 rounded-full blur-xl" />

                <div className="relative w-full h-48 p-3">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100">
                    <motion.div
                      style={{ y: imageY }}
                      className="absolute inset-0 -top-[15%] h-[130%]"
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width:640px) 100vw,
                               (max-width:1024px) 50vw,
                               25vw"
                      />
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-tr from-[#3592CF]/40 to-[#FCB040]/30 mix-blend-overlay" />
                  </div>
                </div>

                <div className="relative px-5 pb-5 pt-2 flex flex-col flex-grow">
                  <h4 className="text-lg font-bold text-slate-900 mb-3">
                    {service.title}
                  </h4>

                  <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center text-sm font-bold text-[#3592CF] group-hover:text-blue-700 transition-colors">
                    Explore Pathway
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
