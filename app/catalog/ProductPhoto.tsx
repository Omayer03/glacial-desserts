"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "./products";

const imageExtensions = ["jpg", "png"];

export default function ProductPhoto({
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
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/15 to-transparent"
          />
          <span className="pointer-events-none absolute inset-x-3 bottom-3 font-sans text-sm font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            {product.name}
          </span>
        </>
      )}
    </>
  );
}
