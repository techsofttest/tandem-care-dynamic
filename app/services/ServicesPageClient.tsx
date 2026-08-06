"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageBanner from "@/components/global/PageBanner";

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
}

interface Banner {
  title: string;
  content: string;
}

interface Seo {
  title: string;
  meta_title: string;
  meta_desc: string;
  meta_key: string;
}

interface ApiResponse {
  success: boolean;
  seo: Seo;
  banner: Banner;
  data: Service[];
}

interface ServicesPageClientProps {
  initialData: ApiResponse;
}

export default function ServicesPageClient({
  initialData,
}: ServicesPageClientProps) {
  const services = initialData.data;
  const banner = initialData.banner;

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <PageBanner
        title={banner.title}
        subtitle={banner.content}
        breadcrumbs={[{ name: "Services" }]}
      />

      <section className="w-full py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-20 max-w-[90rem] relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.id} variants={cardVariants}>
                <Link
                  href={`/services/${service.slug}`}
                  className="relative flex flex-col group h-full bg-white border border-slate-200 rounded-3xl hover:border-brand-blue transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none z-0" />

                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#3592CF]/10 rounded-full blur-2xl pointer-events-none z-0" />

                  <div className="absolute top-8 -left-8 w-24 h-24 bg-[#FCB040]/10 rounded-full blur-xl pointer-events-none z-0" />

                  <div className="relative w-full h-48 p-3 z-10">
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width:640px) 100vw,
                               (max-width:1024px) 50vw,
                               25vw"
                      />

                      <div className="absolute inset-0 bg-gradient-to-tr from-[#3592CF]/40 to-[#FCB040]/30 mix-blend-overlay pointer-events-none z-10" />

                      <div className="absolute inset-0 bg-slate-900/5 pointer-events-none z-10" />
                    </div>
                  </div>

                  <div className="relative px-5 pb-5 pt-1 flex flex-col flex-grow z-10">
                    <h4 className="text-lg font-heading font-bold text-slate-900 mb-3 leading-snug">
                      {service.title}
                    </h4>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>

                    <div className="mt-auto flex items-center text-sm font-bold text-brand-blue group-hover:text-indigo-600 transition-colors">
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
    </div>
  );
}
