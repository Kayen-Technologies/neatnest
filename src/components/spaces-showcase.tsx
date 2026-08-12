"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { BeforeAfter } from "@/lib/data";
import { getActiveSpaceIndex } from "@/lib/spaces-showcase";

export function SpacesShowcase({ pairs }: { pairs: BeforeAfter[] }) {
  const scrollCanvasRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const count = pairs.length;

  useEffect(() => {
    const scrollCanvas = scrollCanvasRef.current;
    if (!scrollCanvas) return;

    const siteHeader = document.querySelector<HTMLElement>("body > header");
    let frame = 0;

    const updateLayout = () => {
      frame = 0;

      const rect = scrollCanvas.getBoundingClientRect();
      const totalScrollable = Math.max(
        1,
        scrollCanvas.offsetHeight - window.innerHeight,
      );
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      const nextActiveIndex = getActiveSpaceIndex(progress, count);
      const sceneIsPinned = rect.top <= 0 && rect.bottom >= window.innerHeight;

      setActiveIndex((current) =>
        current === nextActiveIndex ? current : nextActiveIndex,
      );

      siteHeader?.classList.toggle(
        "spaces-showcase-header-hidden",
        sceneIsPinned,
      );
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateLayout);
    };

    updateLayout();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      siteHeader?.classList.remove("spaces-showcase-header-hidden");
    };
  }, [count]);

  return (
    <>
      {/* Static list: always in the DOM, shown by default and for prefers-reduced-motion */}
      <div className="spaces-static-content shell py-16 md:py-24">
        <div className="space-y-6 md:space-y-12">
          {pairs.map((pair, i) => (
            <div
              key={pair.label}
              className={`flex flex-col gap-3 md:flex-row md:gap-5 ${
                i % 2 === 1 ? "md:justify-end" : "md:justify-start"
              }`}
            >
              <Figure
                src={pair.before}
                alt={`${pair.label} before`}
                label="Before"
              />
              <Figure
                src={pair.after}
                alt={`${pair.label} after`}
                label="After"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll-pinned crossfade: shown only when motion is allowed */}
      <div
        ref={scrollCanvasRef}
        className="spaces-scroll-showcase"
        style={{ height: `${(count + 1.5) * 100}svh` }}
      >
        <div className="spaces-showcase" aria-label="Spaces we care for">
          <div className="spaces-showcase__pairs shell">
            {pairs.map((pair, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={pair.label}
                  className={`spaces-showcase__pair${
                    isActive ? " is-active" : ""
                  }`}
                  aria-hidden={!isActive}
                >
                  <div
                    className={`flex gap-3 md:gap-5 ${
                      index % 2 === 1 ? "md:justify-end" : "md:justify-start"
                    }`}
                  >
                    <Figure
                      src={pair.before}
                      alt=""
                      label="Before"
                      priority={index < 2}
                    />
                    <Figure
                      src={pair.after}
                      alt=""
                      label="After"
                      priority={index < 2}
                    />
                  </div>
                  <p className="spaces-showcase__label">{pair.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function Figure({
  src,
  alt,
  label,
  priority,
}: {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
}) {
  return (
    <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] md:aspect-[3/4] md:w-[320px]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 320px"
        className="object-cover"
        priority={priority}
      />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent pb-4 pt-10 text-center text-sm text-cream">
        {label}
      </span>
    </figure>
  );
}
