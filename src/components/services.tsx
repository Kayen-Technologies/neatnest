"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/data";
import { ZoomImage } from "./zoom-image";

export function Services() {
  const [active, setActive] = useState(0);
  const count = services.length;
  const current = services[active];
  const nextIndex = (active + 1) % count;
  const next = services[nextIndex];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="services" className="bg-cream">
      <div className="shell py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.3rem)] font-medium leading-[1.08] tracking-[-0.015em] text-ink">
            Curated services, considered in every detail.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
            Each engagement is tailored from the products we choose to the
            rhythm we keep. Below are the four practices we are most often
            invited into.
          </p>
        </div>

        {/* Mobile: stacked list of all services */}
        <div className="mt-12 space-y-14 lg:hidden">
          {services.map((s) => (
            <div key={s.id}>
              <h3 className="font-display text-2xl font-medium text-ink">
                {s.name}
              </h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">
                {s.description}
              </p>
              <Link
                href="/services"
                className="mt-3 inline-block border-b border-ink/40 pb-1 text-[15px] text-ink transition-colors hover:border-brown hover:text-brown"
              >
                Discover this Service
              </Link>
              <ZoomImage
                src={s.image}
                alt={s.name}
                sizes="100vw"
                frameClassName="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-[18px]"
              />
            </div>
          ))}
        </div>

        {/* Desktop: featured carousel */}
        <div className="relative mt-16 hidden grid-cols-[1.1fr_1fr] items-center gap-16 lg:grid">
          <div
            key={current.id}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px]"
            style={{ animation: "fadeUp 0.5s ease both" }}
          >
            <ZoomImage
              src={current.image}
              alt={current.name}
              sizes="50vw"
              frameClassName="absolute inset-0"
            />
          </div>

          <div className="relative">
            <div key={current.id} style={{ animation: "fadeUp 0.5s ease both" }}>
              <span className="text-xs font-medium uppercase tracking-[0.32em] text-brown-soft">
                {pad(active + 1)} &nbsp;/&nbsp; {pad(count)}
              </span>
              <h3 className="mt-4 font-display text-[clamp(2rem,3.6vw,2.9rem)] font-medium text-ink">
                {current.name}
              </h3>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
                {current.description}
              </p>
              <Link
                href="/services"
                className="mt-5 inline-block border-b border-ink/40 pb-1 text-[15px] text-ink transition-colors hover:border-brown hover:text-brown"
              >
                Discover this Service
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setActive(nextIndex)}
              className="group mt-10 flex items-center gap-4 text-left"
              aria-label={`Next service: ${next.name}`}
            >
              <span className="relative block h-24 w-28 overflow-hidden rounded-xl ring-1 ring-black/5">
                <Image
                  src={next.image}
                  alt={next.name}
                  fill
                  sizes="120px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="text-[13px] leading-tight text-muted">
                <span className="block uppercase tracking-[0.28em] text-brown-soft">
                  Next
                </span>
                <span className="mt-1 block text-ink">{next.name}</span>
              </span>
            </button>

            <span className="pointer-events-none absolute -bottom-14 left-0 text-xs uppercase tracking-[0.32em] text-muted">
              The Services
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
