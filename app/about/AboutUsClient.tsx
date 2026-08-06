"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import {
  Target,
  Eye,
  Users,
  ShieldCheck,
  Heart,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import PageBanner from "@/components/global/PageBanner";
import Button from "@/components/ui/Button";
import CtaSection from "@/components/home/CtaSection";

interface BannerData {
  id: number;
  title: string;
  subtitle: string;
}

interface StoryCard {
  title: string;
  description: string;
}

interface WhoWeAreData {
  id: number;
  heading: {
    line1: string;
    line2: string;
    suffix: string;
  };
  description1: string;
  description2: string;
  image: string;
  cards: StoryCard[];
}

interface philosophyData {
  id: number;
  cms_title: string;
}

interface CorePillarCard {
  title: string;
  description: string;
}

interface whyChooseUsData {
  id: number;
  heading: string;
  description: string;
  image: string;
  provider: {
    line1: string;
    line2: string;
    line3: string;
  };
  cards: CorePillarCard[];
}

interface AboutUsClientProps {
  bannerData: BannerData;
  whoWeAreData: WhoWeAreData;
  philosophyData: philosophyData;
  whyChooseUsData: whyChooseUsData;
}

export default function AboutUsClient({
  bannerData,
  whoWeAreData,
  philosophyData,
  whyChooseUsData,
}: AboutUsClientProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Header Banner */}
      <PageBanner
        title={bannerData.title}
        subtitle={bannerData.subtitle}
        breadcrumbs={[{ name: bannerData.title }]}
      />

      {/* Our Story Section */}
      <section className="w-full py-16 md:py-24 relative overflow-hidden z-10">
        <div className="container mx-auto px-6 lg:px-20 max-w-[90rem]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Story Content (7 cols on lg) */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3 py-1.5 rounded-full mb-6 inline-block">
                Our Story
              </span>

              <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">
                {whoWeAreData.heading.line1}
                <br />

                {(whoWeAreData.heading.line2 ||
                  whoWeAreData.heading.suffix) && (
                  <span className="text-brand-blue">
                    {whoWeAreData.heading.line2}
                    {whoWeAreData.heading.suffix}
                  </span>
                )}
              </h2>

              <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-6">
                {whoWeAreData.description1}
              </p>

              <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">
                {whoWeAreData.description2}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  href="/services"
                  variant="primary"
                  className="px-6 py-3 rounded-xl"
                >
                  Explore Services
                </Button>
                <Button
                  href="/contact"
                  variant="secondary"
                  className="px-6 py-3 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100/50"
                >
                  Get In Touch
                </Button>
              </div>
            </motion.div>

            {/* Story Image (5 cols on lg) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5 relative flex justify-center"
            >
              {/* Decorative background shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-br from-brand-blue/5 to-brand-orange/5 rounded-full blur-3xl pointer-events-none -z-10" />

              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border-2 border-slate-200/80 bg-slate-100">
                <Image
                  src="/services/Home Support Services.jpg"
                  alt="Tandem Care Support"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 450px"
                  priority
                />
                <div className="absolute inset-0 bg-brand-blue/5 mix-blend-overlay pointer-events-none" />

                {/* Floating Branding Badge */}
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200">
                  <div className="relative w-20 h-20">
                    <Image
                      src="/logo/logo2.png"
                      alt="Tandem Care Logo"
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vision, Mission & Values */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-20 max-w-[90rem] relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3 py-1.5 rounded-full mb-4 inline-block">
              Our Philosophy
            </span>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">
              {philosophyData.cms_title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whoWeAreData.cards.map((card, index) => {
              const icons = [
                <Target
                  key="target"
                  className="w-12 h-12 text-brand-blue"
                  strokeWidth={2.5}
                />,
                <Eye
                  key="eye"
                  className="w-12 h-12 text-purple-600"
                  strokeWidth={2.5}
                />,
                <ShieldCheck
                  key="shield"
                  className="w-12 h-12 text-emerald-600"
                  strokeWidth={2.5}
                />,
              ];

              const backgrounds = [
                "bg-[radial-gradient(ellipse_at_top_right,_rgba(53,146,207,0.12),_transparent_65%)] hover:border-brand-blue/30",
                "bg-[radial-gradient(ellipse_at_top_right,_rgba(107,33,168,0.08),_transparent_65%)] hover:border-purple-600/30",
                "bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.10),_transparent_65%)] hover:border-emerald-600/30",
              ];

              return (
                <div
                  key={index}
                  className={`group h-full bg-slate-50 ${
                    backgrounds[index] ?? ""
                  } p-8 rounded-2xl border border-slate-200 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),_0_8px_10px_-6px_rgba(0,0,0,0.1)]`}
                >
                  <div className="mb-6 inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {icons[index]}
                  </div>

                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">
                    {card.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Pillars / Values (Tilted & Scattered Design Matching Home Page) */}
      <section className="w-full py-16 md:py-24 relative overflow-hidden z-10">
        <div className="container mx-auto px-6 lg:px-20 max-w-[90rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full mb-4 inline-block">
                Why Choose Us
              </span>

              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6 leading-tight">
                {whyChooseUsData.heading}
              </h2>

              <p className="text-slate-600 leading-relaxed mb-6">
                {whyChooseUsData.description}
              </p>

              <div className="flex flex-row items-center gap-5 w-fit transition-all mt-8">
                <div className="relative w-50 h-50 flex-shrink-0">
                  <Image
                    src={whyChooseUsData.image}
                    alt="Registered Provider"
                    fill
                    sizes="200px"
                    className="object-contain"
                  />
                </div>

                <p className="text-xl font-bold text-brand-blue uppercase tracking-widest leading-snug text-left">
                  {whyChooseUsData.provider.line1}
                  <br />
                  {whyChooseUsData.provider.line2}
                  <br />
                  {whyChooseUsData.provider.line3}
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {whyChooseUsData.cards.map((card, index) => {
                const icons = [
                  <Heart
                    key="heart"
                    className="w-8 h-8 text-rose-500 shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110"
                  />,
                  <Sparkles
                    key="sparkles"
                    className="w-8 h-8 text-[#FCB040] shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110"
                  />,
                  <Users
                    key="users"
                    className="w-8 h-8 text-blue-600 shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110"
                  />,
                  <ShieldAlert
                    key="shield"
                    className="w-8 h-8 text-indigo-600 shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110"
                  />,
                ];

                const backgrounds = [
                  "bg-[radial-gradient(ellipse_at_top_right,_rgba(244,63,94,0.08),_transparent_65%)] hover:border-rose-500/30 -rotate-1 hover:rotate-0",
                  "bg-[radial-gradient(ellipse_at_top_right,_rgba(252,176,64,0.08),_transparent_65%)] hover:border-[#FCB040]/30 rotate-1 hover:rotate-0",
                  "bg-[radial-gradient(ellipse_at_top_right,_rgba(53,146,207,0.08),_transparent_65%)] hover:border-brand-blue/30 -rotate-1 hover:rotate-0",
                  "bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.08),_transparent_65%)] hover:border-indigo-600/30 rotate-1 hover:rotate-0",
                ];

                return (
                  <div
                    key={index}
                    className={`group h-full bg-slate-50 ${backgrounds[index]} p-6 rounded-2xl border border-slate-200 cursor-pointer transition-all duration-300 ease-out transform hover:-translate-y-2 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),_0_8px_10px_-6px_rgba(0,0,0,0.1)] flex gap-4`}
                  >
                    {icons[index]}

                    <div>
                      <h3 className="font-bold text-slate-900 mb-2">
                        {card.title}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </div>
  );
}
