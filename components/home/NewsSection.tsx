"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

/* ------------------------------------
Interfaces
------------------------------------ */

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  created_at: string;
}

/* ------------------------------------
Component
------------------------------------ */

export default function NewsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  /* ------------------------------------
  Fetch News
  ------------------------------------ */

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/home-news`,
          {
            cache: "no-store",
          },
        );

        const result = await response.json();

        if (result.success) {
          setNewsItems(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch news", error);
      }
    }

    fetchNews();
  }, []);

  /* ------------------------------------
  Scroll Progress
  ------------------------------------ */

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

    const scrollable = scrollWidth - clientWidth;

    if (scrollable > 0) {
      setProgress((scrollLeft / scrollable) * 100);
    }
  };

  useEffect(() => {
    handleScroll();

    window.addEventListener("resize", handleScroll);

    return () => window.removeEventListener("resize", handleScroll);
  }, [newsItems]);

  /* ------------------------------------
  Animation Variants
  ------------------------------------ */

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,

      transition: {
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
        stiffness: 60,
      },
    },
  };

  /* ------------------------------------
  Carousel Buttons
  ------------------------------------ */

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -800 : 800,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-24 bg-white relative overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
        variants={containerVariants}
        className="container mx-auto px-6 lg:px-20 max-w-[90rem]"
      >
        {/* Heading */}

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-slate-900 text-center">
            The latest from us!
          </h2>
        </motion.div>

        {/* Carousel */}

        <motion.div
          variants={itemVariants}
          className="relative w-full overflow-hidden"
        >
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-10 lg:gap-16 snap-x snap-mandatory pb-4 pt-4 hide-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
                .hide-scrollbar::-webkit-scrollbar{
                    display:none;
                }
              `,
              }}
            />

            {newsItems.map((item) => (
              <div
                key={item.id}
                className="flex-none w-[90vw] lg:w-[calc(50%-2rem)] snap-start"
              >
                <div className="group flex flex-col sm:flex-row gap-6 lg:gap-10 items-center sm:items-start h-full">
                  {/* Image */}

                  <div className="flex-shrink-0 relative mt-2">
                    <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden bg-slate-100">
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width:1024px) 192px,224px"
                      />
                    </div>
                  </div>

                  {/* Content */}

                  <div className="flex flex-col flex-grow text-center sm:text-left pt-2">
                    {/* Date */}

                    <p className="text-sm text-brand-blue font-semibold mb-2">
                      {item.created_at}
                    </p>

                    {/* Title */}

                    <h3 className="text-xl lg:text-2xl font-bold text-black mb-4 leading-snug">
                      <Link
                        href={`/news/${item.slug}`}
                        className="hover:text-brand-blue transition-colors"
                      >
                        {item.title}
                      </Link>
                    </h3>

                    {/* Description */}

                    <p className="text-slate-700 text-sm leading-relaxed mb-6">
                      {item.description.length > 170
                        ? item.description.substring(0, 170) + "..."
                        : item.description}
                    </p>

                    {/* Read More */}

                    <div className="mt-auto flex justify-center sm:justify-start">
                      <Link
                        href={`/news/${item.slug}`}
                        className="inline-flex items-center text-sm font-bold text-brand-blue hover:text-indigo-600 transition-colors"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Controls */}

        <motion.div
          variants={itemVariants}
          className="mt-8 flex items-center justify-between gap-8"
        >
          {/* Progress Bar */}

          <div className="w-full flex-1 max-w-md h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-blue rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${Math.max(progress, 2)}%`,
              }}
            />
          </div>

          {/* Navigation Buttons */}

          <div className="flex gap-4 flex-shrink-0">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:border-brand-blue hover:text-white hover:shadow-lg transition-all duration-300"
              aria-label="Previous News"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:border-brand-blue hover:text-white hover:shadow-lg transition-all duration-300"
              aria-label="Next News"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
