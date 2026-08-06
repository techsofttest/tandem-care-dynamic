"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Button from "../ui/Button";

interface CTASection {
  heading: {
    line1: string;
    line2: string;
    suffix: string;
  };
  description: string[];
  images: string[];
}

interface CTAData {
  id: number;
  sections: CTASection[];
}

export default function CtaSection() {
  const [cta, setCta] = useState<CTAData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCTA() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/ready-to-exp`,
          {
            cache: "no-store",
          },
        );

        const result = await response.json();

        if (result.success) {
          setCta(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCTA();
  }, []);

  const firstSection = cta?.sections?.[0];
  const secondSection = cta?.sections?.[1];

  return (
    <section className="relative overflow-hidden py-24 bg-white">
      {/* Floating Image 1 */}
      {secondSection?.images?.[0] && (
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="hidden xl:block absolute top-16 left-[4%] w-32 h-32 rounded-2xl overflow-hidden shadow-xl rotate-[-6deg] z-0"
        >
          <Image
            src={secondSection.images[0]}
            alt="Image 1"
            fill
            sizes="128px"
            className="object-cover"
          />
        </motion.div>
      )}

      {/* Floating Image 2 */}
      {secondSection?.images?.[1] && (
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="hidden xl:block absolute bottom-16 left-[10%] w-24 h-24 rounded-full overflow-hidden shadow-lg rotate-[12deg] z-0"
        >
          <Image
            src={secondSection.images[1]}
            alt="Image 2"
            fill
            sizes="96px"
            className="object-cover"
          />
        </motion.div>
      )}

      {/* Floating Image 3 */}
      {secondSection?.images?.[2] && (
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="hidden xl:block absolute top-12 right-[2%] w-40 h-40 rounded-full overflow-hidden shadow-2xl rotate-[8deg] z-0"
        >
          <Image
            src={secondSection.images[2]}
            alt="Image 3"
            fill
            sizes="160px"
            className="object-cover"
          />
        </motion.div>
      )}

      {/* Floating Image 4 */}
      {secondSection?.images?.[3] && (
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="hidden xl:block absolute bottom-20 right-[8%] w-28 h-28 rounded-2xl overflow-hidden shadow-lg rotate-[-12deg] z-0"
        >
          <Image
            src={secondSection.images[3]}
            alt="Image 4"
            fill
            sizes="112px"
            className="object-cover"
          />
        </motion.div>
      )}

      <div className="container mx-auto px-6 lg:px-20 max-w-[90rem] relative z-10">
        {cta?.sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`flex flex-col items-center text-center max-w-4xl mx-auto ${
              index === 1 ? "mt-20" : ""
            }`}
          >
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-slate-900 mb-6 leading-tight">
              {section.heading.line1}{" "}
              <span className="text-brand-blue">
                {section.heading.line2}
                {section.heading.suffix}
              </span>
            </h2>

            <div className="space-y-5 mb-10 max-w-3xl">
              {section.description
                .filter((text) => text.trim() !== "")
                .map((text, i) => (
                  <p key={i} className="text-lg text-slate-600 leading-relaxed">
                    {text}
                  </p>
                ))}
            </div>
          </motion.div>
        ))}

        {/* Common Buttons - Display only once */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
          <Button
            href="/contact"
            variant="primary"
            className="group flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-brand-blue/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Make an Enquiry
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            href="/referrals"
            variant="secondary"
            className="group flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg border border-brand-blue text-brand-blue hover:border-brand-blue hover:text-brand-blue transition-all duration-300 hover:-translate-y-1"
          >
            Make a Referral
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
