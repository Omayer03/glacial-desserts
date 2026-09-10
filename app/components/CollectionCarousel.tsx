"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

type Category = { name: string; slug: string };

const LOOP_SECONDS = 48;
const RESUME_DELAY_MS = 3500;

/** Wraps a value into (-width, 0] — keeps translateX numbers bounded. */
function wrapNegative(value: number, width: number) {
  if (width <= 0) return 0;
  let v = value % width;
  if (v > 0) v -= width;
  return v;
}

function nearestIndex(traveled: number, positions: number[], width: number) {
  let best = 0;
  let bestDist = Infinity;
  positions.forEach((p, i) => {
    const raw = Math.abs(p - traveled);
    const d = Math.min(raw, width - raw);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return best;
}

/**
 * Finds the occurrence of `rawTarget` (mod `width`) closest to `current`,
 * in either direction — the shortest possible hop, never a near-full loop.
 */
function nearestTarget(rawTarget: number, current: number, width: number) {
  let target = wrapNegative(rawTarget, width);
  while (target > current + width / 2) target -= width;
  while (target < current - width / 2) target += width;
  return target;
}

export default function CollectionCarousel({
  categories,
}: {
  categories: Category[];
}) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const realCardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const cloneStartRef = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const dotPositionsRef = useRef<number[]>([]);
  const setWidthRef = useRef(0);
  const isHoveringRef = useRef(false);
  const isInteractingRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  const looped = [...categories, ...categories];

  const measure = () => {
    const track = trackRef.current;
    const clone = cloneStartRef.current;
    if (!track || !clone) return;
    const trackRect = track.getBoundingClientRect();
    dotPositionsRef.current = realCardRefs.current.map((el) =>
      el ? el.getBoundingClientRect().left - trackRect.left : 0
    );
    setWidthRef.current = clone.getBoundingClientRect().left - trackRect.left;
  };

  useEffect(() => {
    measure();
    let frame: number;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Continuous slow auto-scroll (skipped for reduced motion, hover, or
  // while the user is interacting / within the post-interaction delay).
  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;
    if (isHoveringRef.current || isInteractingRef.current) return;
    const width = setWidthRef.current;
    if (!width) return;
    const pxPerMs = width / (LOOP_SECONDS * 1000);
    x.set(wrapNegative(x.get() - pxPerMs * delta, width));
  });

  // Keep the active dot synced to the live track position.
  useEffect(() => {
    if (prefersReducedMotion) return;
    return x.on("change", (latest) => {
      const width = setWidthRef.current;
      const positions = dotPositionsRef.current;
      if (!width || positions.length === 0) return;
      const traveled = ((-latest % width) + width) % width;
      const next = nearestIndex(traveled, positions, width);
      setActiveIndex((prev) => (prev === next ? prev : next));
    });
  }, [x, prefersReducedMotion]);

  // Reduced-motion: sync the active dot from native scroll position instead.
  useEffect(() => {
    if (!prefersReducedMotion) return;
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;
    let frame: number | null = null;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const trackRect = track.getBoundingClientRect();
        const positions = realCardRefs.current.map((el) =>
          el ? el.getBoundingClientRect().left - trackRect.left : 0
        );
        const traveled = wrapper.scrollLeft;
        let best = 0;
        let bestDist = Infinity;
        positions.forEach((p, i) => {
          const d = Math.abs(p - traveled);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setActiveIndex(best);
      });
    };
    wrapper.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      wrapper.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  const clearResumeTimeout = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const scheduleResume = () => {
    clearResumeTimeout();
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, RESUME_DELAY_MS);
  };

  const runTo = (target: number, onComplete?: () => void) => {
    controlsRef.current?.stop();
    const current = x.get();
    const distance = Math.abs(current - target);
    const duration = Math.min(1.6, Math.max(0.5, distance / 300));
    controlsRef.current = animate(x, target, {
      duration,
      ease: [0.4, 0, 0.2, 1],
      onComplete: () => {
        onComplete?.();
        scheduleResume();
      },
    });
  };

  const handleDotClick = (index: number) => {
    if (prefersReducedMotion) {
      const wrapper = wrapperRef.current;
      const card = realCardRefs.current[index];
      if (wrapper && card) {
        const cardLeft = card.offsetLeft;
        wrapper.scrollTo({ left: cardLeft, behavior: "smooth" });
      }
      setActiveIndex(index);
      return;
    }

    const width = setWidthRef.current;
    const positions = dotPositionsRef.current;
    if (!width || positions[index] === undefined) return;

    isInteractingRef.current = true;
    clearResumeTimeout();

    const current = x.get();
    const target = nearestTarget(-positions[index], current, width);

    runTo(target);
  };

  const handleDragStart = () => {
    isInteractingRef.current = true;
    clearResumeTimeout();
    controlsRef.current?.stop();
  };

  const handleDragEnd = () => {
    const width = setWidthRef.current;
    const positions = dotPositionsRef.current;
    if (!width || positions.length === 0) {
      scheduleResume();
      return;
    }
    const normalized = wrapNegative(x.get(), width);
    x.set(normalized);

    const traveled = -normalized;
    const nearest = nearestIndex(traveled, positions, width);
    const target = nearestTarget(-positions[nearest], normalized, width);

    runTo(target);
  };

  return (
    <div>
      <div
        ref={wrapperRef}
        className="group relative mt-14 overflow-hidden motion-reduce:overflow-x-auto"
        onMouseEnter={() => {
          isHoveringRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveringRef.current = false;
        }}
      >
        <motion.div
          ref={trackRef}
          drag={prefersReducedMotion ? false : "x"}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={prefersReducedMotion ? undefined : { x }}
          className="flex w-max cursor-grab gap-4 pl-6 pr-0 motion-reduce:cursor-auto motion-reduce:pr-6 active:cursor-grabbing sm:gap-5 sm:pl-16 sm:motion-reduce:pr-16 lg:gap-6"
        >
          {looped.map(({ name, slug }, i) => {
            const isClone = i >= categories.length;
            return (
              <a
                key={`${slug}-${i}`}
                ref={(el) => {
                  if (isClone) {
                    if (i === categories.length) cloneStartRef.current = el;
                  } else {
                    realCardRefs.current[i] = el;
                  }
                }}
                href={`/catalog#${slug}`}
                draggable={false}
                tabIndex={isClone ? -1 : undefined}
                aria-hidden={isClone || undefined}
                className={`group/card relative flex aspect-[4/3] w-[80vw] shrink-0 flex-col justify-end overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-xl hover:shadow-espresso/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:w-[42vw] lg:w-[30vw] ${isClone ? "motion-reduce:hidden" : ""}`}
              >
                <Image
                  src={`/images/${slug}.jpg`}
                  alt={name}
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 42vw, 80vw"
                  className="pointer-events-none object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent transition-colors duration-500 group-hover/card:from-espresso/90"
                />
                <div className="relative p-6">
                  <span className="font-serif text-xl font-semibold text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] sm:text-2xl">
                    {name}
                  </span>
                  <span className="mt-1.5 flex items-center gap-1.5 font-sans text-xs font-medium uppercase tracking-[0.15em] text-gold opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                    View Collection
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </a>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-0">
        {categories.map(({ slug }, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={slug}
              type="button"
              onClick={() => handleDotClick(i)}
              aria-label={`Go to collection slide ${i + 1}`}
              aria-current={isActive ? "true" : undefined}
              className="group/dot flex h-6 w-6 items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-300 group-hover/dot:scale-110 ${
                  isActive
                    ? "h-2 w-2 bg-gold opacity-100"
                    : "h-1.5 w-1.5 bg-charcoal-400 opacity-50 group-hover/dot:opacity-75"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
