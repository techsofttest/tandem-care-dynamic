"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageBannerProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: { name: string; href?: string }[];
}

export default function PageBanner({ title, subtitle, breadcrumbs }: PageBannerProps) {
    const containerVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="relative w-full bg-[#123e5e] overflow-hidden pt-8 pb-10 md:pt-10 md:pb-12 lg:pt-12 lg:pb-16">
            {/* Fading blue filled design matching Hero (Full Width) */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#246796] via-brand-blue/60 to-[#123e5e] overflow-hidden">
                {/* White arch at the top center */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-4 bg-white rounded-b-full" />

                {/* Twinkling stars */}
                {[
                    { top: 15, left: 10, size: 8, delay: 0 },
                    { top: 40, left: 22, size: 10, delay: 0.3 },
                    { top: 55, left: 80, size: 12, delay: 0.6 },
                    { top: 20, left: 85, size: 8, delay: 0.9 },
                    { top: 35, left: 65, size: 14, delay: 1.2 },
                    { top: 62, left: 15, size: 10, delay: 1.5 },
                    { top: 12, left: 45, size: 12, delay: 1.8 },
                    { top: 48, left: 88, size: 8, delay: 2.1 },
                ].map((star, i) => (
                    <motion.div
                        key={`star-${i}`}
                        className="absolute text-white pointer-events-none"
                        style={{
                            top: `${star.top}%`,
                            left: `${star.left}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                        }}
                        animate={{
                            opacity: [0.15, 0.9, 0.15],
                            scale: [0.75, 1.25, 0.75],
                            rotate: [0, 15, 0],
                        }}
                        transition={{
                            duration: 3.5,
                            delay: star.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
                        </svg>
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto px-6 lg:px-20 max-w-[90rem] relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto text-center flex flex-col items-center pt-8 pb-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Breadcrumbs */}
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <motion.nav
                            variants={itemVariants}
                            className="flex items-center space-x-2 text-xs md:text-sm font-semibold text-slate-200 mb-4 bg-slate-900/10 backdrop-blur-sm px-4 py-1.5 rounded-full overflow-x-auto whitespace-nowrap hide-scrollbar max-w-full sm:max-w-none"
                        >
                            <Link href="/" className="hover:text-white transition-colors">
                                Home
                            </Link>
                            {breadcrumbs.map((crumb, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                    <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
                                    {crumb.href ? (
                                        <Link href={crumb.href} className="hover:text-white transition-colors">
                                            {crumb.name}
                                        </Link>
                                    ) : (
                                        <span className="text-brand-orange">{crumb.name}</span>
                                    )}
                                </div>
                            ))}
                        </motion.nav>
                    )}

                    {/* Banner Title */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight tracking-tight mb-3"
                    >
                        {title}
                    </motion.h1>

                    {/* Subtitle */}
                    {subtitle && (
                        <motion.p
                            variants={itemVariants}
                            className="text-base md:text-lg text-slate-100 max-w-xl mx-auto"
                        >
                            {subtitle}
                        </motion.p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
