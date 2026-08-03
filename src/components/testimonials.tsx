"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const n = testimonials.length;
  const t = testimonials[active];

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % n), 7000);
    return () => clearInterval(id);
  }, [n]);

  const initials = t.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <section className="overflow-hidden bg-cream">
      <div className="shell py-20 text-center md:py-28">
        <p className="font-display text-lg text-ink/80 md:text-xl">
          Trusted by those who notice the details.
        </p>

        <blockquote
          key={active}
          className="mx-auto mt-8 max-w-4xl font-display text-[clamp(1.5rem,3.7vw,2.7rem)] font-medium leading-[1.28] tracking-[-0.01em] text-ink md:mt-10"
          style={{ animation: "fadeUp 0.5s ease both" }}
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        <div
          key={`meta-${active}`}
          className="mt-10 flex flex-col items-center"
          style={{ animation: "fadeUp 0.5s ease both" }}
        >
          <div className="relative h-16 w-16 overflow-hidden rounded-2xl ring-1 ring-black/5">
            {t.avatar ? (
              <Image src={t.avatar} alt={t.name} fill sizes="64px" className="object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center bg-brown font-display text-lg text-cream">
                {initials}
              </span>
            )}
          </div>
          <p className="mt-4 text-sm font-semibold text-ink">{t.name}</p>
          <p className="mt-1 text-[13px] text-muted">{t.detail}</p>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-ink" : "w-1.5 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
