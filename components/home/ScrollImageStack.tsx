"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface ScrollImageStackProps {
  images: string[];
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: "0%",
    rotate: 0,
    y: 40,
  },

  visible: (i: number) => {
    const xOffsets = ["-150%", "-75%", "0%", "75%", "150%"];
    const rotations = [-12, -6, 0, 6, 12];
    const zIndexes = [10, 20, 30, 20, 10];

    return {
      opacity: 1,
      x: xOffsets[i] ?? "0%",
      rotate: rotations[i] ?? 0,
      y: 0,
      zIndex: zIndexes[i] ?? 10,

      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.2,
        delay: 0.1,
      },
    };
  },

  hover: {
    scale: 1.05,
    rotate: 0,
    y: -15,
    zIndex: 50,

    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function ScrollImageStack({ images }: ScrollImageStackProps) {
  // Remove empty/null images
  const validImages = images.filter(Boolean);

  return (
    <div className="relative w-full pt-16 pb-20 lg:pt-8 bg-transparent overflow-hidden flex flex-col items-center justify-center">
      <div className="relative flex h-[220px] sm:h-[280px] lg:h-[350px] w-full items-center justify-center">
        {validImages.map((image, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{
              once: true,
            }}
            className="absolute origin-bottom w-[25vw] min-w-[120px] max-w-[280px] h-full rounded-2xl overflow-hidden bg-slate-200 cursor-pointer shadow-xl"
          >
            <Image
              src={image}
              alt={`Hero Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width:768px) 30vw,20vw"
              priority={index < 3}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
