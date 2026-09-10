"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

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

type Allergens = { contains?: string; mayContain?: string };

const allergenData: Record<string, Allergens> = {
  caprizzio: {
    contains: "Milk",
    mayContain: "Egg, soya, gluten, nuts, peanuts (cross-contamination risk)",
  },
  fantastica: { contains: "Milk, soya, nuts" },
  luxe: { contains: "Milk", mayContain: "Traces of nuts" },
  "mini-nordica": {
    contains: "Milk",
    mayContain: "Egg, soya, nuts (cross-contamination risk)",
  },
  "monte-de-mint": { contains: "Milk, egg, soya, nuts" },
  rocky: { contains: "Milk, soya, gluten, egg, nuts" },
  "coco-choco": { contains: "Milk, soya" },
  "lemon-delight": {
    contains: "Water, sugar, lemon juice, glucose, milk powder, coconut oil",
    mayContain: "Milk",
  },
  "orange-delight": { mayContain: "Traces via cross-contamination" },
  "pineapple-paradise": { contains: "Milk" },
  "honey-pot": { contains: "Milk, egg, nuts" },
  "matka-pot": {
    contains: "Milk, almonds, pistachios",
    mayContain: "Peanuts, gluten, soya, sulphites",
  },
  "copa-sea-salt": { contains: "Milk, egg, soya, nuts, peanuts" },
  berrichee: { contains: "Milk, egg, nuts" },
  "cookies-and-cream": { contains: "Milk, gluten", mayContain: "Traces of egg" },
  "copa-tiramisu": {
    contains: "Milk, egg, wheat/gluten",
    mayContain: "Traces of nuts",
  },
  fiorentina: {
    contains: "Milk, eggs, gluten/wheat, soya, pistachios (tree nuts)",
  },
  limoncello: {
    contains: "Milk, soya, gluten, egg",
    mayContain: "Traces of nuts",
  },
  "mango-delice-cup": { contains: "Nuts", mayContain: "Milk" },
  "mango-magic": { contains: "Milk", mayContain: "Traces of nuts" },
  pinacolada: { contains: "Milk" },
  "pistachio-serenata": {
    contains: "Milk, egg, soya, gluten, pistachios",
    mayContain: "Traces of nuts",
  },
  "the-ambassador": {
    contains: "Milk, soya, hazelnuts, wheat/gluten, almond",
    mayContain: "Peanuts, sulphites",
  },
  "malteaser-cheesecake": {
    contains: "Milk, wheat/gluten, egg, soya",
    mayContain: "Peanuts, nuts, sulphites",
  },
  barry: { contains: "Milk, egg, nuts" },
  friky: { contains: "Milk", mayContain: "Traces via cross-contamination" },
  kuaky: {
    contains: "Milk",
    mayContain: "Egg, gluten (cross-contamination risk)",
  },
  leony: { contains: "Milk, egg, nuts" },
  punky: { contains: "Milk", mayContain: "Traces via cross-contamination" },
  "vacky-1": { contains: "Milk, egg, nuts" },
  "vacky-2": { contains: "Milk, egg, nuts" },
};

const placeholderTints = [
  "bg-raspberry/12",
  "bg-mango/15",
  "bg-pistachio/15",
  "bg-charcoal/6",
];

const imageExtensions = ["jpg", "png"];

function ProductPhoto({
  product,
  sizes,
  placeholderClassName,
  showNameOverlay = false,
}: {
  product: Product;
  sizes: string;
  placeholderClassName?: string;
  showNameOverlay?: boolean;
}) {
  const [extIndex, setExtIndex] = useState(0);
  const outOfExtensions = extIndex >= imageExtensions.length;

  if (outOfExtensions) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-1.5 p-3 text-center ${placeholderClassName ?? "bg-charcoal/6"}`}
      >
        <span className="font-sans text-sm font-medium text-charcoal">
          {product.name}
        </span>
        <span className="font-sans text-[10px] font-medium uppercase tracking-[0.15em] text-charcoal-400">
          Photo coming soon
        </span>
      </div>
    );
  }

  return (
    <>
      <Image
        key={imageExtensions[extIndex]}
        src={`/images/products/${product.slug}.${imageExtensions[extIndex]}`}
        alt={product.name}
        fill
        sizes={sizes}
        className="object-cover"
        onError={() => setExtIndex((i) => i + 1)}
      />
      {showNameOverlay && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent"
          />
          <span className="pointer-events-none absolute inset-x-3 bottom-3 font-sans text-sm font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            {product.name}
          </span>
        </>
      )}
    </>
  );
}

function ProductCard({
  product,
  tintIndex,
  onSelect,
}: {
  product: Product;
  tintIndex: number;
  onSelect: (product: Product) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(product)}
      className="group relative aspect-[4/3] overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-raspberry focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
    >
      <ProductPhoto
        product={product}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 50vw"
        placeholderClassName={placeholderTints[tintIndex % placeholderTints.length]}
        showNameOverlay
      />
    </button>
  );
}

function AllergenSection({ product }: { product: Product }) {
  const info = allergenData[product.slug];

  if (!info) {
    return (
      <p className="mt-4 rounded-lg bg-charcoal/5 px-4 py-3 font-sans text-sm text-charcoal-600">
        Allergen info coming soon — please ask a member of staff.
      </p>
    );
  }

  return (
    <div className="mt-4 space-y-2">
      {info.contains && (
        <p className="font-sans text-sm leading-relaxed text-charcoal">
          <span className="font-medium">Contains:</span> {info.contains}
        </p>
      )}
      {info.mayContain && (
        <p className="font-sans text-sm leading-relaxed text-charcoal">
          <span className="font-medium">May contain:</span> {info.mayContain}
        </p>
      )}
    </div>
  );
}

function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-cream shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/50 text-white backdrop-blur-sm transition-colors hover:bg-charcoal/70"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-[4/3] w-full">
          <ProductPhoto
            product={product}
            sizes="(min-width: 640px) 32rem, 100vw"
            placeholderClassName="bg-raspberry/10"
          />
        </div>

        <div className="px-6 py-6 sm:px-8 sm:py-8">
          <h3 className="font-serif text-2xl font-semibold text-charcoal">
            {product.name}
          </h3>
          <p className="mt-1 font-sans text-xs font-medium uppercase tracking-[0.15em] text-charcoal-400">
            Allergen &amp; Ingredient Information
          </p>

          <AllergenSection product={product} />

          <p className="mt-5 font-sans text-xs text-charcoal-400">
            For full ingredient details, please speak to a member of staff.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CatalogList() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    null
  );

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
                    onSelect={setSelectedProduct}
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

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
