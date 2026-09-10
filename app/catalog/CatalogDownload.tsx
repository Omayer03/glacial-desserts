"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";

export default function CatalogDownload() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-start gap-6 rounded-3xl bg-espresso px-8 py-10 md:flex-row md:items-center md:justify-between md:px-12 md:py-12"
        >
          <div className="flex items-center gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold/15">
              <FileText className="h-7 w-7 text-gold" />
            </span>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
                Full Catalogue
              </h2>
              <p className="mt-1 font-sans text-sm font-light text-white/70">
                Every category, every item, in one downloadable PDF.
              </p>
            </div>
          </div>
          <motion.a
            href="/catalogue/glacial-desserts-catalogue.pdf"
            download
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-gold px-8 py-3 font-sans text-sm font-medium uppercase tracking-[0.15em] text-espresso shadow-lg shadow-black/25 transition-colors duration-300 hover:bg-gold-600"
          >
            <Download className="h-4 w-4" />
            Download Full Catalogue (PDF)
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
