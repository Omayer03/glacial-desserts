"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import ProductPhoto from "./ProductPhoto";
import type { Product } from "./products";

type View = "details" | "enquiry";
type Status = "idle" | "loading" | "success" | "error";

const emptyEnquiry = {
  name: "",
  business: "",
  email: "",
  phone: "",
  quantity: "",
  message: "",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-gold">
      {children}
    </p>
  );
}

function ProductInformation({ product }: { product: Product }) {
  const { allergens } = product;

  if (!allergens || (!allergens.contains && !allergens.mayContain)) {
    return (
      <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal-600">
        Ingredients, allergens, pack sizes and full product specifications
        are available on request.
      </p>
    );
  }

  return (
    <div className="mt-2 space-y-1.5">
      {allergens.contains && (
        <p className="font-sans text-sm leading-relaxed text-charcoal">
          <span className="font-medium">Contains:</span> {allergens.contains}
        </p>
      )}
      {allergens.mayContain && (
        <p className="font-sans text-sm leading-relaxed text-charcoal">
          <span className="font-medium">May contain:</span>{" "}
          {allergens.mayContain}
        </p>
      )}
      <p className="pt-1 font-sans text-xs text-charcoal-400">
        Full product specifications available on request.
      </p>
    </div>
  );
}

function ProductDetailsView({
  product,
  onEnquire,
  titleRef,
}: {
  product: Product;
  onEnquire: () => void;
  titleRef: React.RefObject<HTMLHeadingElement>;
}) {
  return (
    <>
      <div className="relative aspect-[4/3] w-full">
        <ProductPhoto
          product={product}
          sizes="(min-width: 640px) 32rem, 100vw"
          placeholderClassName="bg-gold/10"
        />
      </div>

      <div className="px-6 py-6 sm:px-8 sm:py-8">
        <h3
          ref={titleRef}
          tabIndex={-1}
          className="font-serif text-2xl font-semibold text-charcoal outline-none"
        >
          {product.name}
        </h3>
        <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal-600">
          {product.shortDescription}
        </p>

        {product.keyIngredients && product.keyIngredients.length > 0 && (
          <div className="mt-5 border-t border-gold/20 pt-5">
            <SectionLabel>Key Ingredients</SectionLabel>
            <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal">
              {product.keyIngredients.join(" · ")}
            </p>
          </div>
        )}

        <div className="mt-5 border-t border-gold/20 pt-5">
          <SectionLabel>Product Information</SectionLabel>
          <ProductInformation product={product} />
        </div>

        <button
          type="button"
          onClick={onEnquire}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-sans text-xs font-medium uppercase tracking-[0.15em] text-espresso shadow-lg shadow-black/25 transition-colors duration-300 hover:bg-gold-600 sm:w-auto"
        >
          Enquire About This Product
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </>
  );
}

function EnquiryView({
  product,
  onBack,
  titleRef,
}: {
  product: Product;
  onBack: () => void;
  titleRef: React.RefObject<HTMLHeadingElement>;
}) {
  const [form, setForm] = useState(emptyEnquiry);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in your name and email.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          business: form.business,
          phone: form.phone,
          quantity: form.quantity,
          message: form.message,
          product: product.name,
          subject: `Enquire about ${product.name}`,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm(emptyEnquiry);
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please try again, or email us directly at connect@glacialdesserts.uk."
      );
    }
  };

  const fieldClassName =
    "w-full rounded-xl border border-charcoal/10 bg-white px-4 py-2.5 font-sans text-sm text-charcoal placeholder:text-charcoal-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
  const labelClassName =
    "mb-1.5 block font-sans text-xs font-medium uppercase tracking-[0.15em] text-charcoal-400";

  return (
    <div className="px-6 py-6 sm:px-8 sm:py-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 font-sans text-xs font-medium uppercase tracking-[0.15em] text-charcoal-400 transition-colors hover:text-gold"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      <h3
        ref={titleRef}
        tabIndex={-1}
        className="font-serif text-2xl font-semibold text-charcoal outline-none"
      >
        Enquire About This Product
      </h3>
      <p className="mt-1 font-sans text-sm text-charcoal-600">
        Tell us a little about your requirements and we&rsquo;ll be in touch.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <div>
          <label className={labelClassName}>Selected Product</label>
          <input
            type="text"
            value={product.name}
            readOnly
            aria-readonly="true"
            className="w-full cursor-not-allowed rounded-xl border border-gold/30 bg-gold/10 px-4 py-2.5 font-sans text-sm font-medium text-charcoal"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClassName}>
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className={fieldClassName}
            />
          </div>
          <div>
            <label htmlFor="business" className={labelClassName}>
              Business / Organisation
            </label>
            <input
              id="business"
              type="text"
              placeholder="Optional"
              value={form.business}
              onChange={handleChange}
              className={fieldClassName}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClassName}>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className={fieldClassName}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClassName}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Optional"
              value={form.phone}
              onChange={handleChange}
              className={fieldClassName}
            />
          </div>
        </div>

        <div>
          <label htmlFor="quantity" className={labelClassName}>
            Quantity / Requirements
          </label>
          <input
            id="quantity"
            type="text"
            placeholder="Optional"
            value={form.quantity}
            onChange={handleChange}
            className={fieldClassName}
          />
        </div>

        <div>
          <label htmlFor="message" className={labelClassName}>
            Message
          </label>
          <textarea
            id="message"
            rows={3}
            placeholder="Optional"
            value={form.message}
            onChange={handleChange}
            className={`${fieldClassName} resize-none`}
          />
        </div>

        {status === "success" && (
          <div className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 font-sans text-sm text-charcoal">
            Thank you — your enquiry about {product.name} has been sent.
            We&rsquo;ll be in touch soon.
          </div>
        )}

        {status === "error" && (
          <div className="rounded-xl border border-gold/30 bg-gold/15 px-4 py-3 font-sans text-sm text-charcoal">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-sans text-xs font-medium uppercase tracking-[0.15em] text-espresso shadow-lg shadow-black/25 transition-colors duration-300 hover:bg-gold-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "Sending..." : "Send Enquiry"}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}

export default function ProductDetailModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [view, setView] = useState<View>("details");
  const titleRef = useRef<HTMLHeadingElement>(null);

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

  useEffect(() => {
    titleRef.current?.focus();
  }, [view]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/60 px-4 py-8 backdrop-blur-sm"
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
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-espresso/50 text-white backdrop-blur-sm transition-colors hover:bg-espresso/70"
        >
          <X className="h-4 w-4" />
        </button>

        {view === "details" ? (
          <ProductDetailsView
            product={product}
            onEnquire={() => setView("enquiry")}
            titleRef={titleRef}
          />
        ) : (
          <EnquiryView
            product={product}
            onBack={() => setView("details")}
            titleRef={titleRef}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
