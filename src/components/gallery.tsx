"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "@/lib/data";

const geometry: Record<
  number,
  { w: number; h: number; x: number; z: number; o: number }
> = {
  0: { w: 360, h: 440, x: 0, z: 40, o: 1 },
  1: { w: 210, h: 320, x: 300, z: 30, o: 1 },
  2: { w: 200, h: 300, x: 520, z: 20, o: 0.95 },
  3: { w: 200, h: 300, x: 735, z: 10, o: 0.8 },
};

export function Gallery() {
  const [active, setActive] = useState(0);
  const n = galleryImages.length;
  const offsets = [-3, -2, -1, 0, 1, 2, 3];

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % n), 3000);
    return () => clearInterval(id);
  }, [n]);

  return (
    <section id="spaces" className="overflow-hidden py-20 md:py-28">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.3rem)] font-medium leading-[1.08] tracking-[-0.015em] text-ink">
            Spaces we&rsquo;ve quietly cared for.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-muted">
            A glimpse into the homes, workplaces, and spaces we&rsquo;ve restored
            with care, precision, and quiet attention to detail.
          </p>
          <Link
            href="/spaces"
            className="mt-7 inline-flex items-center rounded-full bg-brown px-7 py-3.5 text-[15px] font-medium text-cream transition-colors hover:bg-brown-dark"
          >
            View Full Gallery
          </Link>
        </div>
      </div>

      <div className="relative mt-12 h-[420px] w-full [perspective:1200px] sm:h-[440px]">
        {offsets.map((off) => {
          const idx = (active + off + n * 3) % n;
          const g = geometry[Math.abs(off)];
          const sign = off < 0 ? -1 : 1;
          const item = galleryImages[idx];
          const isCenter = off === 0;
          return (
            <button
              key={off}
              type="button"
              onClick={() => !isCenter && setActive(idx)}
              aria-label={isCenter ? item.alt : `View ${item.alt}`}
              className="absolute left-1/2 top-1/2 overflow-hidden rounded-[20px] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)] transition-all duration-500 ease-out"
              style={{
                width: g.w,
                height: g.h,
                zIndex: g.z,
                opacity: g.o,
                transform: `translate(calc(-50% + ${sign * g.x}px), -50%)`,
                cursor: isCenter ? "default" : "pointer",
              }}
              tabIndex={isCenter ? -1 : 0}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="360px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {galleryImages.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to image ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-brown" : "w-1.5 bg-ink/20 hover:bg-ink/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
