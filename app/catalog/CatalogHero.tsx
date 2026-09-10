"use client";

import { motion } from "framer-motion";

export default function CatalogHero() {
  return (
    <section className="bg-espresso pb-20 pt-36 sm:pb-28 sm:pt-44">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-6xl px-6 sm:px-16"
      >
        <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.3em] text-gold">
          Our Catalog
        </p>
        <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
          Our Full Catalogue
        </h1>
        <p className="mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-white/75 sm:text-lg">
          Browse our complete range, or download the full catalogue to share
          with your team.
        </p>
      </motion.div>
    </section>
  );
}
