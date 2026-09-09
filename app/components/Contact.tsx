"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const details = [
  {
    icon: Phone,
    label: "Phone",
    value: "+44 7938 953742",
    href: "tel:+447938953742",
  },
  {
    icon: Mail,
    label: "Email",
    value: "connect@glacialdesserts.uk",
    href: "mailto:connect@glacialdesserts.uk",
  },
  {
    icon: MapPin,
    label: "Address",
    value:
      "Innovation Centre & Business Base, 110 Great Marlings, Butterfield, Luton, LU2 8DL",
    href: undefined,
  },
];

const emptyForm = { name: "", email: "", subject: "", message: "" };

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in your name, email, and message.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm(emptyForm);
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please try again, or email us directly at connect@glacialdesserts.uk."
      );
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-charcoal"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/contact-bg.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal/45 via-charcoal/20 to-charcoal/50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/30 to-transparent"
      />

      <div className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.3em] text-raspberry">
              Contact
            </p>
            <h2 className="font-serif text-3xl font-semibold leading-[1.15] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl">
              Get In Touch
            </h2>
            <p className="mt-6 font-sans text-base font-light leading-relaxed text-white/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] sm:text-lg">
              Have a question about our range, or want to discuss a bulk
              order? We&rsquo;d love to hear from you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col gap-8">
              {details.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                      <Icon className="h-5 w-5 text-raspberry" />
                    </span>
                    <div>
                      <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                        {label}
                      </p>
                      <p className="mt-1 font-sans text-base text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
                        {value}
                      </p>
                    </div>
                  </div>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    className="transition-opacity hover:opacity-70"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.15em] text-white/75"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-charcoal/10 bg-white/90 px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal-400 backdrop-blur-sm focus:border-raspberry focus:outline-none focus:ring-1 focus:ring-raspberry"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.15em] text-white/75"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-charcoal/10 bg-white/90 px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal-400 backdrop-blur-sm focus:border-raspberry focus:outline-none focus:ring-1 focus:ring-raspberry"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.15em] text-white/75"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-charcoal/10 bg-white/90 px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal-400 backdrop-blur-sm focus:border-raspberry focus:outline-none focus:ring-1 focus:ring-raspberry"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.15em] text-white/75"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your enquiry..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-charcoal/10 bg-white/90 px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal-400 backdrop-blur-sm focus:border-raspberry focus:outline-none focus:ring-1 focus:ring-raspberry"
                />
              </div>

              {status === "success" && (
                <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-sans text-sm text-white backdrop-blur-sm">
                  Thanks! We&rsquo;ll be in touch soon.
                </div>
              )}

              {status === "error" && (
                <div className="rounded-xl border border-raspberry/30 bg-raspberry/15 px-4 py-3 font-sans text-sm text-white backdrop-blur-sm">
                  {errorMessage}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-raspberry px-8 py-3 font-sans text-sm font-medium uppercase tracking-[0.15em] text-cream shadow-lg shadow-black/25 transition-colors duration-300 hover:bg-raspberry-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Submit"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
