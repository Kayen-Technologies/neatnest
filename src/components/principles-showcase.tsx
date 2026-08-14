"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Principle } from "@/lib/data";
import { getActivePrincipleIndex } from "@/lib/principles-showcase";

type ShowcaseState = {
  activeIndex: number;
  titleVisible: boolean;
};

export function PrinciplesShowcase({
  principles,
}: {
  principles: Principle[];
}) {
  const scrollCanvasRef = useRef<HTMLDivElement>(null);
  const [showcase, setShowcase] = useState<ShowcaseState>({
    activeIndex: -1,
    titleVisible: true,
  });
  const count = principles.length;

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
      const activeIndex = getActivePrincipleIndex(progress, count);
      const titleVisible = progress <= 0.04;
      const sceneIsPinned = rect.top <= 0 && rect.bottom >= window.innerHeight;

      setShowcase((current) =>
        current.activeIndex === activeIndex &&
        current.titleVisible === titleVisible
          ? current
          : { activeIndex, titleVisible },
      );

      siteHeader?.classList.toggle(
        "principles-showcase-header-hidden",
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
      siteHeader?.classList.remove("principles-showcase-header-hidden");
    };
  }, [count]);

  return (
    <>
      {/* Static list: always in the DOM, shown by default and for prefers-reduced-motion */}
      <div className="principles-static-content shell py-16 md:py-24">
        <h2 className="max-w-2xl font-display text-[clamp(2rem,4.4vw,3.3rem)] font-medium leading-[1.08] tracking-[-0.015em] text-cream">
          The standard, gently held visit after visit.
        </h2>

        <div className="mt-8">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="relative border-t border-white/15 py-8 md:py-12"
            >
              <div
                className={`relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-xl md:absolute md:top-1/2 md:mb-0 md:aspect-auto md:h-28 md:w-28 md:-translate-y-1/2 ${
                  i % 2 === 0 ? "md:left-0 lg:left-8" : "md:right-0 lg:right-8"
                }`}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 160px"
                  className="object-cover"
                />
              </div>
              <div className="text-left md:mx-auto md:max-w-md md:text-center">
                <h3 className="font-display text-2xl font-medium text-cream">
                  {p.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-cream/70">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll-pinned crossfade: shown only when motion is allowed */}
      <div
        ref={scrollCanvasRef}
        className="principles-scroll-showcase"
        style={{ height: `${(count + 1.5) * 100}svh` }}
      >
        <div className="principles-showcase" aria-label="Our principles">
          <h2
            className={`principles-showcase__title${
              showcase.titleVisible ? "" : " is-hidden"
            }`}
          >
            The standard, gently held visit after visit.
          </h2>

          <div className="principles-showcase__pairs shell">
            {principles.map((p, index) => {
              const isActive = showcase.activeIndex === index;
              const imageOnLeft = index % 2 === 0;

              return (
                <div
                  key={p.title}
                  className={`principles-showcase__pair${
                    isActive ? " is-active" : ""
                  }`}
                  aria-hidden={!isActive}
                >
                  <div className="principles-showcase__row">
                    <div
                      className={`relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-xl md:absolute md:top-1/2 md:mb-0 md:aspect-auto md:h-28 md:w-28 md:-translate-y-1/2 ${
                        imageOnLeft
                          ? "md:left-0 lg:left-8"
                          : "md:right-0 lg:right-8"
                      }`}
                    >
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 160px"
                        className="object-cover"
                        priority={index < 2}
                      />
                    </div>
                    <div className="text-left md:mx-auto md:max-w-md md:text-center">
                      <h3 className="font-display text-2xl font-medium text-cream">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-cream/70">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
