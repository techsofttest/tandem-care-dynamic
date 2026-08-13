"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../ui/Button";

interface Testimonial {
  id: number;
  name: string;
  description: string;
  image: string | null;
}

export default function TestimonialSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isInteracting, setIsInteracting] = useState(false);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const isDragging = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/home-testimonial`,
        );

        const result = await response.json();

        if (result.success) {
          setTestimonials(result.data);
        }
      } catch (error) {
        console.error("Failed to load testimonials", error);
      }
    };

    fetchTestimonials();
  }, []);

  const loopedData =
    testimonials.length > 0
      ? [...testimonials, ...testimonials, ...testimonials]
      : [];

  // Auto Scroll
  useEffect(() => {
    let animationFrameId: number;

    const scroll = () => {
      if (scrollRef.current && !isInteracting && !isDragging.current) {
        scrollRef.current.scrollTop += 0.5;

        const halfwayPoint = scrollRef.current.scrollHeight / 3;

        if (scrollRef.current.scrollTop >= halfwayPoint * 2) {
          scrollRef.current.scrollTop = halfwayPoint;
        }
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInteracting]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;

    isDragging.current = true;
    setIsInteracting(true);

    startY.current = e.pageY - scrollRef.current.offsetTop;
    scrollTop.current = scrollRef.current.scrollTop;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    setIsInteracting(false);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setIsInteracting(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;

    e.preventDefault();

    const y = e.pageY - scrollRef.current.offsetTop;
    const walk = (y - startY.current) * 1.5;

    scrollRef.current.scrollTop = scrollTop.current - walk;
  };

  return (
    <section className="w-full py-32 bg-gradient-to-br from-[#3592CF] via-white to-[#FCB040] relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20 max-w-[90rem] flex flex-col items-center">
        {/* Header */}

        <div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-30">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-slate-900 leading-tight">
              Real stories from <br />
              <span className="text-white">our community.</span>
            </h2>
          </div>

          <Button
            href="/testimonials"
            variant="secondary"
            className="px-6 py-3 whitespace-nowrap bg-white/90 backdrop-blur-sm"
          >
            Read All Stories
          </Button>
        </div>

        {/* Cards */}

        <div
          className="relative w-full max-w-5xl"
          style={{ perspective: "1200px" }}
        >
          <div
            ref={scrollRef}
            className="h-[650px] w-full overflow-y-auto cursor-grab active:cursor-grabbing pb-4 relative z-10 px-4 md:px-10"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              transformStyle: "preserve-3d",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
              maskImage:
                "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            }}
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => setIsInteracting(false)}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
                                div::-webkit-scrollbar {
                                    display:none;
                                }
                            `,
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 py-[350px]">
              {loopedData.map((testimonial, index) => {
                const isRightColumn = index % 2 === 1;

                return (
                  <motion.div
                    key={`${testimonial.id}-${index}`}
                    initial={{
                      opacity: 0.2,
                      scale: 0.85,
                      rotateX: 35,
                      y: 40,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      rotateX: 0,
                      y: 0,
                    }}
                    viewport={{
                      root: scrollRef,
                      margin: "-25% 0px -25% 0px",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 20,
                    }}
                    className={`bg-white p-8 md:p-10 rounded-3xl border border-white flex flex-col gap-6 w-full origin-center will-change-transform ${
                      isRightColumn ? "md:mt-24" : ""
                    }`}
                  >
                    {/* Avatar */}

                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0 w-14 h-14 rounded-full overflow-hidden bg-brand-blue border-2 border-white">
                        {testimonial.image ? (
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                            {testimonial.name.charAt(0)}
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">
                          {testimonial.name}
                        </h3>

                        <div className="w-8 h-1 bg-[#FCB040] rounded-full mt-1"></div>
                      </div>
                    </div>

                    {/* Description */}

                    <p className="text-slate-700 italic leading-relaxed">
                      "{testimonial.description}"
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
