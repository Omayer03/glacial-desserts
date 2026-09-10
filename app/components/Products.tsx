"use client";

import { motion } from "framer-motion";
import CollectionCarousel from "./CollectionCarousel";

const categories = [
  { name: "World of Designer Desserts", slug: "world-of-designer-desserts" },
  { name: "Exotic Fruits", slug: "exotic-fruits" },
  { name: "Ceramic", slug: "ceramic" },
  { name: "Glass Range", slug: "glass-range" },
  { name: "Premium Cakes", slug: "premium-cakes" },
  { name: "Hand Made Cakes", slug: "hand-made-cakes" },
  { name: "Luxury Mini Desserts", slug: "luxury-mini-desserts" },
  { name: "After Dinner Chocolates", slug: "after-dinner-chocolates" },
  { name: "Kids Selection", slug: "kids-selection" },
];

export default function Products() {
  return (
    <section id="products" className="overflow-hidden bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Products
          </p>
          <h2 className="font-serif text-3xl font-semibold leading-[1.15] text-charcoal sm:text-4xl md:text-5xl">
            Our Collection
          </h2>
          <p className="mt-6 font-sans text-base font-light leading-relaxed text-charcoal-600/80 sm:text-lg">
            A curated range of premium frozen desserts and hospitality
            products, each selected for exceptional quality.
          </p>
        </motion.div>
      </div>

      <CollectionCarousel categories={categories} />
    </section>
  );
}
