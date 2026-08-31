"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const n = testimonials.length;
  const t = testimonials[active];

  // Auto-advance for desktop
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % n), 10000);
    return () => clearInterval(id);
  }, [n]);

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const el = child as HTMLElement;
      const childCenter = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setMobileActive(closestIndex);
  };

  const scrollToTestimonial = (index: number) => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const item = container.children[index] as HTMLElement | undefined;
    if (item) {
      item.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      setMobileActive(index);
    }
  };

  const initials = t.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <section className="overflow-hidden bg-cream">
      <div className="shell py-20 text-center md:py-30">
        <p className="font-display text-lg text-ink md:text-xl">
          Trusted by those who notice the details.
        </p>

        {/* Mobile Swipeable View */}
        <div className="md:hidden">
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="mt-8 flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((item, i) => {
              const itemInitials = item.name
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("");
              return (
                <div key={i} className="w-full shrink-0 snap-center flex flex-col items-center">
                  <blockquote className="mx-auto font-display text-[clamp(1.4rem,4.5vw,1.85rem)] font-medium !leading-[1.45] tracking-[-0.01em] text-ink">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  <div className="mt-10 flex flex-col items-center">
                    <div className="relative h-16 w-16 overflow-hidden rounded-[10px]">
                      {item.avatar ? (
                        <Image src={item.avatar} alt={item.name} fill sizes="64px" className="object-cover" />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center bg-brown font-display text-lg text-white">
                          {itemInitials}
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-sm font-semibold text-ink">{item.name}</p>
                    <p className="mt-1 text-[13px] text-[#5E5E5ECC]">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => scrollToTestimonial(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === mobileActive ? "w-6 bg-[#1E1E1E]" : "w-1.5 bg-[#D9D9D9]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <blockquote
            key={active}
            className="mx-auto mt-15 max-w-4xl font-display text-[clamp(1.5rem,3.7vw,2.7rem)] font-medium !leading-[1.5] tracking-[-0.01em] text-ink"
            style={{ animation: "fadeUp 0.5s ease both" }}
          >
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          <div
            key={`meta-${active}`}
            className="mt-13 flex flex-col items-center"
            style={{ animation: "fadeUp 0.5s ease both" }}
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-[10px]">
              {t.avatar ? (
                <Image src={t.avatar} alt={t.name} fill sizes="64px" className="object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-brown font-display text-lg text-white">
                  {initials}
                </span>
              )}
            </div>
            <p className="mt-4 text-sm font-semibold text-ink">{t.name}</p>
            <p className="mt-1 text-[13px] text-[#5E5E5ECC]">{t.detail}</p>
          </div>

          <div className="mt-15 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-[#1E1E1E]" : "w-1.5 bg-[#D9D9D9] hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
