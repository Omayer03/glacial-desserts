"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Products() {
  return (
    <section id="products" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.3em] text-raspberry">
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

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map(({ name, slug }) => (
            <motion.a
              key={slug}
              href={`/catalog#${slug}`}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-xl hover:shadow-charcoal/20"
            >
              <Image
                src={`/images/${slug}.jpg`}
                alt={name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent"
              />
              <div className="relative p-6">
                <span className="font-serif text-xl font-semibold text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] sm:text-2xl">
                  {name}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
