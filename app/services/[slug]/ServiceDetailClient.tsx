"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  Heart,
  FileText,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PageBanner from "@/components/global/PageBanner";
import Button from "@/components/ui/Button";

interface Faq {
  id: number;
  question: string;
  answer: string;
}

interface Service {
  id: number;
  title: string;
  slug: string;
  banner_content: string;
  description: string;
  key_service_heading: string;
  key_points: string[];
  image: string;

  meta_title: string;
  meta_desc: string;
  meta_key: string;

  faqs: Faq[];
}

interface ServiceDetailClientProps {
  slug: string;
  initialService: Service;
}

export default function ServiceDetailClient({
  slug,
  initialService,
}: ServiceDetailClientProps) {
  const [service] = useState<Service>(initialService);

  const [services, setServices] = useState<Service[]>([]);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    loadData();
  }, [slug]);

  const loadData = async () => {
    try {
      const servicesRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/home-service`,
        {
          cache: "no-store",
        },
      );

      const servicesJson = await servicesRes.json();

      if (servicesJson.success) {
        setServices(servicesJson.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const relatedServices = service
    ? services.filter((item) => item.id !== service.id)
    : [];

  const faqs = service?.faqs ?? [];

  const handlePrev = () => {
    setIsTransitioning(true);

    setCurrentIndex((prev) => {
      if (prev === 0) {
        setIsTransitioning(false);

        setCurrentIndex(relatedServices.length);

        setTimeout(() => {
          setIsTransitioning(true);
          setCurrentIndex(relatedServices.length - 1);
        }, 50);

        return relatedServices.length;
      }

      return prev - 1;
    });
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  // Carousel responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Reset loop when transition ends on clone item
  useEffect(() => {
    if (relatedServices.length > 0 && currentIndex >= relatedServices.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const totalDots = relatedServices.length;
  const dots = Array.from({ length: totalDots });

  if (!service || services.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Consistent Banner Design */}
      <PageBanner
        title={service.title}
        subtitle={service.banner_content?.replace(/<[^>]*>/g, "") ?? ""}
        breadcrumbs={[
          { name: "Services", href: "/services" },
          { name: service.title },
        ]}
      />

      {/* Editorial Content Layout */}
      <section className="w-full py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-6 lg:px-20 max-w-[90rem]">
          <div className="max-w-4xl mx-auto flex flex-col">
            {/* Main Editorial Image */}
            <div className="relative w-full h-[25rem] md:h-[32rem] rounded-3xl overflow-hidden mb-12 border border-slate-200">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Long Reading Description (Editorial Typography) */}
            <article className="prose prose-slate lg:prose-lg max-w-none mb-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-6">
                About {service.title}
              </h2>
              <div
                className="text-slate-700 text-base md:text-lg leading-relaxed space-y-5"
                dangerouslySetInnerHTML={{
                  __html: service.description,
                }}
              />
            </article>

            {/* Features Checklist */}
            <div className="mb-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-xl md:text-2xl font-heading font-bold text-slate-900 mb-6 flex items-center">
                {/* <CheckCircle2 className="w-6 h-6 text-brand-blue mr-3 shrink-0" /> */}
                {service.key_service_heading}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.key_points.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 shrink-0" />
                    <span className="text-sm md:text-base text-slate-700 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Accordion Section */}
            {faqs.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 mb-12 relative overflow-hidden">
                <h3 className="text-xl md:text-2xl font-heading font-bold text-slate-900 mb-6">
                  Frequently Asked Questions
                </h3>

                <div className="space-y-4">
                  {faqs.map((faq, index) => {
                    const isOpen = openFaqIndex === index;

                    return (
                      <div
                        key={faq.id}
                        className="border-b border-slate-100 last:border-0 pb-4 last:pb-0"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                          className="flex justify-between items-center w-full text-left font-bold text-slate-800 hover:text-brand-blue py-2 transition-colors focus:outline-none"
                        >
                          <span className="pr-4">{faq.question}</span>

                          {isOpen ? (
                            <Minus className="w-5 h-5 text-brand-blue shrink-0" />
                          ) : (
                            <Plus className="w-5 h-5 text-slate-400 shrink-0" />
                          )}
                        </button>

                        {isOpen && (
                          <div
                            className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: faq.answer,
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* CTA Box */}
          <div className="mt-10 bg-gradient-to-br from-[#246796] to-brand-blue rounded-3xl p-8 md:p-10 text-white border border-[#246796]/40 relative overflow-hidden flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex-grow max-w-2xl">
              <h3 className="text-2xl font-heading font-bold mb-3">
                Ready to request this service?
              </h3>
              <p className="text-slate-100 mb-6 text-base">
                Contact our care pathway planners today to discuss your goals or
                to make a referral under NDIS.
              </p>

              {/* Direct Contact Links inside CTA Box */}
              <div className="flex flex-wrap gap-6 text-sm">
                <a
                  href="tel:+61434693751"
                  className="flex items-center transition-colors group"
                >
                  <div className="w-10 h-10 flex items-center justify-center text-white mr-3 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-white/70 block uppercase tracking-wider font-semibold">
                      Call Us
                    </span>
                    <span className="font-bold text-white group-hover:text-brand-orange transition-colors">
                      +61 434 693 751
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:info@tandemcare.com.au"
                  className="flex items-center transition-colors group"
                >
                  <div className="w-10 h-10 flex items-center justify-center text-white mr-3 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-white/70 block uppercase tracking-wider font-semibold">
                      Email Us
                    </span>
                    <span className="font-bold text-white group-hover:text-brand-orange transition-colors">
                      info@tandemcare.com.au
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 shrink-0">
              <Button
                href="/contact"
                variant="secondary"
                className="px-6 py-3 rounded-xl hover:bg-slate-50 whitespace-nowrap"
              >
                General Enquiry
              </Button>
              <Button
                href="/referrals"
                variant="primary"
                className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-[#e09b30] border-transparent shadow-none whitespace-nowrap"
              >
                <Heart className="w-4 h-4 mr-2 fill-current" />
                Make a Referral
              </Button>
            </div>
          </div>

          {/* Bottom Section: Other NDIS Services Carousel */}
          {relatedServices.length > 0 && (
            <div className="mt-20 overflow-hidden w-full">
              <div className="flex justify-between items-end mb-10 gap-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 leading-tight">
                    Our NDIS Services
                  </h3>
                  <p className="text-sm text-slate-500 mt-2">
                    Explore our full range of support pathways designed to
                    empower your wellness.
                  </p>
                </div>

                {/* Carousel Control Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full border border-slate-400 bg-white text-slate-600 hover:bg-slate-50 hover:text-brand-blue flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full border border-slate-400 bg-white text-slate-600 hover:bg-slate-50 hover:text-brand-blue flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative w-full overflow-hidden">
                {/* Single Related Service */}
                {relatedServices.length === 1 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {relatedServices.map((item) => (
                      <div key={item.id} className="px-3">
                        <Link
                          href={`/services/${item.slug}`}
                          className="relative flex flex-col group h-full bg-white border border-slate-200 rounded-3xl hover:border-brand-blue transition-all duration-300 overflow-hidden hover:-translate-y-1"
                        >
                          {/* Background */}
                          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none z-0" />
                          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#3592CF]/10 rounded-full blur-2xl pointer-events-none z-0" />
                          <div className="absolute top-8 -left-8 w-24 h-24 bg-[#FCB040]/10 rounded-full blur-xl pointer-events-none z-0" />

                          {/* Image */}
                          <div className="relative w-full h-48 p-3 z-10">
                            <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw"
                              />

                              <div className="absolute inset-0 bg-gradient-to-tr from-[#3592CF]/40 to-[#FCB040]/30 mix-blend-overlay pointer-events-none z-10" />
                              <div className="absolute inset-0 bg-slate-900/5 pointer-events-none z-10" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="relative px-5 pb-5 pt-1 flex flex-col flex-grow z-10">
                            <h4 className="text-base font-heading font-bold text-slate-900 mb-3 leading-snug">
                              {item.title}
                            </h4>

                            <p className="text-xs text-slate-600 leading-relaxed mb-6 flex-grow">
                              {item.description}
                            </p>

                            <div className="mt-auto flex items-center text-xs font-bold text-brand-blue group-hover:text-indigo-600 transition-colors">
                              Explore Pathway
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {/* Carousel */}
                    <div
                      className={`flex ${
                        isTransitioning
                          ? "transition-transform duration-500 ease-in-out"
                          : ""
                      } -mx-3`}
                      style={{
                        transform: `translateX(-${
                          currentIndex * (100 / itemsPerPage)
                        }%)`,
                      }}
                    >
                      {[
                        ...relatedServices,
                        ...relatedServices.slice(0, itemsPerPage),
                      ].map((item, index) => (
                        <div
                          key={`${item.slug}-${index}`}
                          className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 shrink-0 px-3"
                        >
                          <Link
                            href={`/services/${item.slug}`}
                            className="relative flex flex-col group h-full bg-white border border-slate-200 rounded-3xl hover:border-brand-blue transition-all duration-300 overflow-hidden hover:-translate-y-1"
                          >
                            {/* Background */}
                            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none z-0" />
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#3592CF]/10 rounded-full blur-2xl pointer-events-none z-0" />
                            <div className="absolute top-8 -left-8 w-24 h-24 bg-[#FCB040]/10 rounded-full blur-xl pointer-events-none z-0" />

                            {/* Image */}
                            <div className="relative w-full h-48 p-3 z-10">
                              <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                                  sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw"
                                />

                                <div className="absolute inset-0 bg-gradient-to-tr from-[#3592CF]/40 to-[#FCB040]/30 mix-blend-overlay pointer-events-none z-10" />
                                <div className="absolute inset-0 bg-slate-900/5 pointer-events-none z-10" />
                              </div>
                            </div>

                            {/* Content */}
                            <div className="relative px-5 pb-5 pt-1 flex flex-col flex-grow z-10">
                              <h4 className="text-base font-heading font-bold text-slate-900 mb-3 leading-snug">
                                {item.title}
                              </h4>

                              <p className="text-xs text-slate-600 leading-relaxed mb-6 flex-grow">
                                {item.description}
                              </p>

                              <div className="mt-auto flex items-center text-xs font-bold text-brand-blue group-hover:text-indigo-600 transition-colors">
                                Explore Pathway
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Carousel Indicators */}
              {dots.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {dots.map((_, idx) => {
                    const activeDotIndex = currentIndex % services.length;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setIsTransitioning(true);
                          setCurrentIndex(idx);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          activeDotIndex === idx
                            ? "w-6 bg-brand-blue"
                            : "w-2 bg-slate-300 hover:bg-slate-400"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
