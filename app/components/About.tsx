"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function About() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section
      id="about"
      className="relative flex min-h-[70vh] w-full items-center overflow-hidden bg-charcoal sm:min-h-[80vh]"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/about-bg.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal/65 via-charcoal/35 to-charcoal/60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-charcoal via-charcoal/70 to-transparent"
      />

      <div className="relative w-full py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.3em] text-raspberry">
              About Us
            </p>
            <h2 className="font-serif text-3xl font-semibold leading-[1.15] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl">
              Bringing The Best From Around The World
            </h2>
            <p className="mt-6 font-sans text-base font-light leading-relaxed text-white/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] sm:text-lg">
              Founded in 2016, we are a premier frozen desserts distribution
              company dedicated to sourcing and delivering the finest sweet
              indulgences from across the globe. With a passion for quality
              and innovation, our mission is to introduce unique, high-end
              desserts and luxury hospitality products to the UK market. We
              cater to restaurants, caf&eacute;s, bars, hotels, event
              organizers, and individuals who seek exceptional dessert
              experiences.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-raspberry px-8 py-3 font-sans text-sm font-medium uppercase tracking-[0.15em] text-cream shadow-lg shadow-black/25 transition-colors duration-300 hover:bg-raspberry-600"
            >
              Contact Now
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
