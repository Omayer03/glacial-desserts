"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Products", href: "/#products" },
  { label: "Our Catalog", href: "/catalog" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-espresso-950">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-16 sm:py-28">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-serif text-lg font-semibold text-cream">
              Glacial Desserts
            </h3>
            <p className="mt-2 font-sans text-sm font-light text-cream/60">
              Premium frozen desserts and hospitality products, sourced
              globally, delivered across the UK since 2016.
            </p>
          </div>

          <div>
            <h4 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Quick Links
            </h4>
            <ul className="mt-4 flex flex-col gap-3 font-sans text-sm font-light text-cream/60">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Contact
            </h4>
            <div className="mt-4 flex flex-col gap-3 font-sans text-sm font-light text-cream/60">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  Innovation Centre &amp; Business Base, 110 Great Marlings,
                  Butterfield, Luton, LU2 8DL
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <span>+44 7938 953742</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <span>connect@glacialdesserts.uk</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Our Collection
            </h4>
            <p className="mt-4 font-sans text-sm font-light text-cream/60">
              Browse the full range of desserts and hospitality products we
              bring in from around the world.
            </p>
            <motion.a
              href="/#products"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mt-5 inline-flex w-fit items-center gap-3 rounded-full bg-gold px-8 py-3 font-sans text-sm font-medium uppercase tracking-[0.15em] text-espresso shadow-lg shadow-black/25 transition-colors duration-300 hover:bg-gold-600"
            >
              Explore Our Collection
            </motion.a>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/10 pt-8 font-sans text-sm font-light text-cream/60 sm:flex sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Glacial Desserts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
