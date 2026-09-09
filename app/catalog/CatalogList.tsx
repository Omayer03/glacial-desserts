"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Product = { name: string; slug: string };
type Category = { name: string; slug: string; items: Product[] };

const catalog: Category[] = [
  {
    name: "World of Designer Desserts",
    slug: "world-of-designer-desserts",
    items: [
      { name: "Caprizzio", slug: "caprizzio" },
      { name: "Cassatina", slug: "cassatina" },
      { name: "Fantastica", slug: "fantastica" },
      { name: "Hazelnut Bliss", slug: "hazelnut-bliss" },
      { name: "Luxe", slug: "luxe" },
      { name: "Mini Nordica", slug: "mini-nordica" },
      { name: "Monte De Mint", slug: "monte-de-mint" },
      { name: "Pistachio Drop", slug: "pistachio-drop" },
      { name: "Rocky", slug: "rocky" },
    ],
  },
  {
    name: "Exotic Fruits",
    slug: "exotic-fruits",
    items: [
      { name: "Coco Choco", slug: "coco-choco" },
      { name: "Lemon Delight", slug: "lemon-delight" },
      { name: "Orange Delight", slug: "orange-delight" },
      { name: "Pineapple Paradise", slug: "pineapple-paradise" },
      { name: "Quality Ice Cream", slug: "quality-ice-cream" },
      { name: "Quality Sorbet", slug: "quality-sorbet" },
    ],
  },
  {
    name: "Ceramic",
    slug: "ceramic",
    items: [
      { name: "Honey Pot", slug: "honey-pot" },
      { name: "Matka Pot", slug: "matka-pot" },
      { name: "Crème Catelena", slug: "creme-catelena" },
      { name: "Royal Kulfi", slug: "royal-kulfi" },
      { name: "Copa Sea Salt", slug: "copa-sea-salt" },
    ],
  },
  {
    name: "Glass Range",
    slug: "glass-range",
    items: [
      { name: "Berrichee", slug: "berrichee" },
      { name: "Cookies & Cream", slug: "cookies-and-cream" },
      { name: "Copa Tiramisu", slug: "copa-tiramisu" },
      { name: "Fiorcaramel", slug: "fiorcaramel" },
      { name: "Fiorentina", slug: "fiorentina" },
      { name: "Limoncello", slug: "limoncello" },
      { name: "Mango Delice Cup", slug: "mango-delice-cup" },
      { name: "Mango Magic", slug: "mango-magic" },
      { name: "Piñacolada", slug: "pinacolada" },
      { name: "Pistachio Serenata", slug: "pistachio-serenata" },
      { name: "The Ambassador", slug: "the-ambassador" },
    ],
  },
  {
    name: "Premium Cakes",
    slug: "premium-cakes",
    items: [
      { name: "Berry Bavarege", slug: "berry-bavarege" },
      { name: "Double Decker", slug: "double-decker" },
      { name: "Pistachio Cloud", slug: "pistachio-cloud" },
      { name: "Toffee Tennessee", slug: "toffee-tennessee" },
    ],
  },
  {
    name: "Hand Made Cakes",
    slug: "hand-made-cakes",
    items: [
      { name: "Banana Caramel Cheesecake", slug: "banana-caramel-cheesecake" },
      { name: "Malteaser Cheesecake", slug: "malteaser-cheesecake" },
    ],
  },
  {
    name: "Luxury Mini Desserts",
    slug: "luxury-mini-desserts",
    items: [
      { name: "Black Forest Cube", slug: "black-forest-cube" },
      { name: "Blueberry Custard Cube", slug: "blueberry-custard-cube" },
      { name: "Carrot Cube", slug: "carrot-cube" },
      { name: "Chocolate Brownie Cube", slug: "chocolate-brownie-cube" },
      { name: "Chocolate Truffle Cube", slug: "chocolate-truffle-cube" },
      { name: "Lemon Cheesecake Cube", slug: "lemon-cheesecake-cube" },
      { name: "Mango Cube", slug: "mango-cube" },
      { name: "Strawberry Cheesecake Cube", slug: "strawberry-cheesecake-cube" },
      { name: "Tiramasu Cube", slug: "tiramasu-cube" },
      {
        name: "White Chocolate Raspberry Cube",
        slug: "white-chocolate-raspberry-cube",
      },
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
    items: [
      { name: "Barry", slug: "barry" },
      { name: "Friky", slug: "friky" },
      { name: "Kuaky", slug: "kuaky" },
      { name: "Leony", slug: "leony" },
      { name: "Punky", slug: "punky" },
      { name: "Vacky 1", slug: "vacky-1" },
      { name: "Vacky 2", slug: "vacky-2" },
    ],
  },
];

const placeholderTints = [
  "bg-raspberry/12",
  "bg-mango/15",
  "bg-pistachio/15",
  "bg-charcoal/6",
];

function ProductCard({
  product,
  tintIndex,
}: {
  product: Product;
  tintIndex: number;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-xl">
      {!imgError ? (
        <>
          <Image
            src={`/images/products/${product.slug}.jpg`}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover"
            onError={() => setImgError(true)}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent"
          />
          <span className="pointer-events-none absolute inset-x-3 bottom-3 font-sans text-sm font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            {product.name}
          </span>
        </>
      ) : (
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-1.5 p-3 text-center ${placeholderTints[tintIndex % placeholderTints.length]}`}
        >
          <span className="font-sans text-sm font-medium text-charcoal">
            {product.name}
          </span>
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.15em] text-charcoal-400">
            Photo coming soon
          </span>
        </div>
      )}
    </div>
  );
}

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
                  <ProductCard
                    key={`${item.slug}-${i}`}
                    product={item}
                    tintIndex={i}
                  />
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
