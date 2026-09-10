"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Products", href: "/#products" },
  { label: "Our Catalog", href: "/catalog" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-20 w-full border-b border-white/10 bg-charcoal/30 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-16">
        <a href="/#home" aria-label="Glacial Desserts home" className="shrink-0">
          <Image
            src="/logo.svg"
            alt="Glacial Desserts"
            width={64}
            height={64}
            priority
            className="h-14 w-14 rounded-md sm:h-16 sm:w-16"
          />
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 font-sans text-xs font-medium uppercase tracking-[0.15em] text-white/80">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="relative pb-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-raspberry after:transition-all after:duration-300 after:ease-out hover:text-raspberry hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="text-white md:hidden"
        >
          {menuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 bg-charcoal/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col px-6 py-4 font-sans text-sm font-medium uppercase tracking-[0.15em] text-white/85">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="relative block w-fit py-3 transition-colors after:absolute after:bottom-2 after:left-0 after:h-px after:w-0 after:bg-raspberry after:transition-all after:duration-300 after:ease-out hover:text-raspberry hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
