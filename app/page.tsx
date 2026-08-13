import { Metadata } from "next";

import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import ServicesSection from "@/components/home/ServicesSection";
import ClinicalDifferentiators from "@/components/home/ClinicalDifferentiators";
import TestimonialSection from "@/components/home/TestimonialSection";
import NewsSection from "@/components/home/NewsSection";
import CtaSection from "@/components/home/CtaSection";
import AboutSection from "@/components/home/AboutSection";

import { getServices } from "@/app/lib/services";

async function getSEO() {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    return null; // API URL not configured yet — skip SEO fetch
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/seo/home`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    const text = await res.text();

    if (!res.ok) {
      throw new Error(`Failed to fetch SEO (${res.status})`);
    }

    return JSON.parse(text);
  } catch (err) {
    console.warn("[SEO] Failed to fetch home SEO data:", err);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const result = await getSEO();

  if (!result) return {};

  const seo = result.data;

  const description = seo.meta_desc?.replace(/<[^>]+>/g, "").trim() || "";

  return {
    title: seo.meta_title || seo.title,

    description,

    keywords: seo.meta_key || undefined,

    openGraph: {
      title: seo.meta_title || seo.title,
      description,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: seo.meta_title || seo.title,
      description,
    },
  };
}

export default async function Home() {
  const services = await getServices();

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <HeroSection />

      <ServicesSection services={services} />

      <TrustSection />
      <ClinicalDifferentiators />
      <AboutSection />
      {/* <TestimonialSection /> */}
      <NewsSection />
      <CtaSection />
    </div>
  );
}
