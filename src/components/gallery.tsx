"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "@/lib/data";

const geometry: Record<
  number,
  { w: number; h: number; x: number; z: number; o: number }
> = {
  0: { w: 360, h: 550, x: 0, z: 40, o: 1 },
  1: { w: 210, h: 320, x: 310, z: 30, o: 1 },
  2: { w: 200, h: 300, x: 540, z: 20, o: 0.95 },
  3: { w: 200, h: 300, x: 760, z: 10, o: 0.8 },
};

export function Gallery() {
  const [active, setActive] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const n = galleryImages.length;
  const offsets = [-3, -2, -1, 0, 1, 2, 3];

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % n), 3000);
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

  const scrollToImage = (index: number) => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const item = container.children[index] as HTMLElement | undefined;
    if (item) {
      item.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      setMobileActive(index);
    }
  };

  return (
    <section id="spaces" className="overflow-hidden py-20 md:py-30">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.0rem)] font-medium leading-[1.08] tracking-[-0.015em] text-ink">
            Spaces we&rsquo;ve quietly cared for.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-[#5E5E5E]">
            A glimpse into the homes, workplaces, and spaces we&rsquo;ve restored
            with care, precision, and quiet attention to detail.
          </p>
          <Link
            href="/spaces"
            className="mt-7 inline-flex items-center rounded-full bg-brown-dark px-7 py-3.5 text-[15px] font-medium text-cream transition-colors hover:bg-brown-dark"
          >
            View Full Gallery
          </Link>
        </div>
      </div>

      {/* Mobile Layout: swipeable gallery with peek */}
      <div className="mt-12 sm:hidden">
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 scroll-pl-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {galleryImages.map((img, i) => (
            <div key={i} className="w-[85%] shrink-0 snap-center">
              <div className="relative h-[460px] w-full overflow-hidden rounded-[15px]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="85vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => scrollToImage(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === mobileActive ? "w-6 bg-brown-dark" : "w-2 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop 3D Layout */}
      <div className="relative mt-12 hidden h-[420px] w-full [perspective:1200px] sm:block sm:h-[700px]">
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
              className="absolute left-1/2 top-1/2 transition-all duration-500 ease-out"
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
              <div className="relative h-full w-full overflow-hidden rounded-[15px]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="360px"
                  className="object-cover"
                />
              </div>

              {/* Viewfinder corners matching the image radius, wrapping outside */}
              <div
                className={`pointer-events-none absolute -inset-4 z-10 transition-opacity duration-500 ${
                  isCenter ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              >
                {/* Top-Left */}
                <span className="absolute top-0 left-0 h-10 w-10 rounded-tl-[27px] border-t-2 border-l-2 border-[#E6E6E6]" />
                {/* Top-Right */}
                <span className="absolute top-0 right-0 h-10 w-10 rounded-tr-[27px] border-t-2 border-r-2 border-[#E6E6E6]" />
                {/* Bottom-Left */}
                <span className="absolute bottom-0 left-0 h-10 w-10 rounded-bl-[27px] border-b-2 border-l-2 border-[#E6E6E6]" />
                {/* Bottom-Right */}
                <span className="absolute bottom-0 right-0 h-10 w-10 rounded-br-[27px] border-b-2 border-r-2 border-[#E6E6E6]" />
              </div>
            </button>
          );
        })}
      </div>

      {/* <div className="mt-6 flex justify-center gap-2">
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
      </div> */}
    </section>
  );
}
