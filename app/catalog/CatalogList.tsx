"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { catalog, type Product } from "./products";
import ProductPhoto from "./ProductPhoto";
import ProductDetailModal from "./ProductDetailModal";

const placeholderTints = [
  "bg-gold/12",
  "bg-mango/15",
  "bg-pistachio/15",
  "bg-charcoal/6",
];

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
      className="group relative aspect-[4/3] overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
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
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
