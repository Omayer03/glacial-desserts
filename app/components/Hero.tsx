"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.28]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, -35]);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative h-screen w-full overflow-hidden bg-charcoal"
    >
      <motion.video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{ scale: videoScale, y: videoY }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </motion.video>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-charcoal/30 via-charcoal/10 to-charcoal/35"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-charcoal/75 via-charcoal/30 to-transparent"
      />

      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-16">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-5 flex items-center font-sans text-xs font-medium uppercase tracking-[0.3em] text-white/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-raspberry" />
            Global Sourcing &middot; Est. 2016
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="font-serif text-4xl font-semibold leading-[1.15] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl"
          >
            Bringing The Best From Around The World
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="mt-6 max-w-md font-sans text-base font-light leading-relaxed text-white/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] sm:text-lg"
          >
            Premium frozen desserts and hospitality products, sourced
            globally, delivered across the UK since 2016.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="mt-10"
          >
            <motion.a
              href="#products"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group inline-flex items-center gap-3 rounded-full bg-raspberry px-8 py-3 font-sans text-sm font-medium uppercase tracking-[0.15em] text-cream shadow-lg shadow-black/25 transition-colors duration-300 hover:bg-raspberry-600"
            >
              Explore Our Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
