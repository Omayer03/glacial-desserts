"use client";

import { motion } from "framer-motion";

const catalog = [
  {
    name: "World of Designer Desserts",
    slug: "world-of-designer-desserts",
    items: [
      "Caprizzio",
      "Cassatina",
      "Fantastica",
      "Hazelnut Bliss",
      "Luxe",
      "Mini Nordica",
      "Monte De Mint",
      "Pistachio Drop",
      "Rocky",
    ],
  },
  {
    name: "Exotic Fruits",
    slug: "exotic-fruits",
    items: [
      "Coco Choco",
      "Lemon Delight",
      "Orange Delight",
      "Pineapple Paradise",
      "Quality Ice Cream",
      "Quality Sorbet",
    ],
  },
  {
    name: "Ceramic",
    slug: "ceramic",
    items: [
      "Honey Pot",
      "Matka Pot",
      "Crème Catelena",
      "Royal Kulfi",
      "Copa Sea Salt",
    ],
  },
  {
    name: "Glass Range",
    slug: "glass-range",
    items: [
      "Berrichee",
      "Cookies & Cream",
      "Copa Tiramisu",
      "Fiorcaramel",
      "Fiorentina",
      "Limoncello",
      "Mango Delice Cup",
      "Mango Magic",
      "Piñacolada",
      "Pistachio Serenata",
      "The Ambassador",
    ],
  },
  {
    name: "Premium Cakes",
    slug: "premium-cakes",
    items: [
      "Berry Bavarege",
      "Double Decker",
      "Pistachio Cloud",
      "Toffee Tennessee",
    ],
  },
  {
    name: "Hand Made Cakes",
    slug: "hand-made-cakes",
    items: ["Banana Caramel Cheesecake", "Malteaser Cheesecake"],
  },
  {
    name: "Luxury Mini Desserts",
    slug: "luxury-mini-desserts",
    items: [
      "Black Forest Cube",
      "Blueberry Custard Cube",
      "Carrot Cube",
      "Chocolate Brownie Cube",
      "Chocolate Truffle Cube",
      "Lemon Cheesecake Cube",
      "Mango Cube",
      "Strawberry Cheesecake Cube",
      "Tiramasu Cube",
      "White Chocolate Raspberry Cube",
    ],
  },
  {
    name: "After Dinner Chocolates",
    slug: "after-dinner-chocolates",
    items: [],
  },
  {
    name: "Kids Selection",
    slug: "kids-selection",
    items: ["Barry", "Friky", "Kuaky", "Leony", "Punky", "Vacky", "Vacky"],
  },
];

export default function CatalogList() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-16">
        {catalog.map((category) => (
          <motion.div
            key={category.slug}
            id={category.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-16 scroll-mt-24 last:mb-0"
          >
            <h3 className="font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
              {category.name}
            </h3>
            {category.items.length > 0 ? (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {category.items.map((item, i) => (
                  <div
                    key={`${item}-${i}`}
                    className="flex items-center gap-2 rounded-lg border border-charcoal/10 bg-white px-4 py-3"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-raspberry" />
                    <span className="font-sans text-sm text-charcoal-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-charcoal/10 bg-white px-4 py-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal/25" />
                <span className="font-sans text-sm italic text-charcoal-600/60">
                  Coming Soon
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
