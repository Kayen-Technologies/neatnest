"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/data";
import {
  getActiveServiceIndex,
  getServiceCardState,
} from "@/lib/services-showcase";


type ShowcaseState = {
  activeIndex: number;
  titleVisible: boolean;
};

export function Services() {
  const scrollCanvasRef = useRef<HTMLDivElement>(null);
  const [showcase, setShowcase] = useState<ShowcaseState>({
    activeIndex: -1,
    titleVisible: true,
  });
  const count = services.length;
  const pad = (value: number) => String(value).padStart(2, "0");

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
      const activeIndex = getActiveServiceIndex(progress, count);
      const titleVisible = progress <= 0.04;
      const sceneIsPinned = rect.top <= 0 && rect.bottom >= window.innerHeight;

      setShowcase((current) =>
        current.activeIndex === activeIndex &&
          current.titleVisible === titleVisible
          ? current
          : { activeIndex, titleVisible },
      );

      siteHeader?.classList.toggle(
        "services-showcase-header-hidden",
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
      siteHeader?.classList.remove("services-showcase-header-hidden");
    };
  }, [count]);

  return (
    <section id="services" className="bg-[#F5EFE6]">
      <div className="services-static-intro shell pt-20 md:pt-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.3rem)] font-medium leading-[1.08] tracking-[-0.015em] text-[#1A1A1A]">
            <span className="block">Curated services,</span>
            <span className="block">considered in every detail.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#5E5E5E]">
            Each engagement is tailored from the products we choose to the
            rhythm we keep. Below are the four practices we are most often
            invited into.
          </p>
        </div>
      </div>

      <div className="services-static-list shell pb-25 pt-20 md:pb-28">
        <div className="space-y-14">
          {services.map((service) => (
            <article key={service.id}>
              <h3 className="font-display text-2xl font-medium text-[#1A1A1A]">
                {service.name}
              </h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[#5E5E5E]">
                {service.description}
              </p>
              <Link
                href="/services"
                className="mt-3 inline-block border-b border-[#5E5E5E] pb-[0.3px] leading-tight text-[18px] text-[#5E5E5E] transition-colors hover:border-brown hover:text-brown"
              >
                Discover this Service
              </Link>
              <div className="relative mt-10 aspect-[4/5] w-full overflow-hidden rounded-[18px]">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        ref={scrollCanvasRef}
        className="services-scroll-showcase"
        style={{ height: `${(count + 1.5) * 100}svh` }}
      >
        <div className="services-showcase" aria-label="Our services">
          <div
            className={`services-showcase__title${showcase.titleVisible ? "" : " is-hidden"}`}
          >
            <span className="text-[#1A1A1A]" >Curated services,</span>
            <span className="text-[#1A1A1A]">considered in every detail.</span>
            <p className="mx-auto mt-8 max-w-xl text-[15px] md:text-[16px]  font-normal leading-relaxed text-[#5E5E5E] font-sans tracking-normal">
              Each engagement is tailored from the products we choose to the
              rhythm we keep. Below are the four practices we are most often
              invited into.
            </p>
          </div>

          <div className="services-showcase__cards">
            {services.map((service, index) => {
              const cardState = getServiceCardState(
                index,
                showcase.activeIndex,
              );

              return (
                <div
                  key={service.id}
                  className={`services-showcase__card is-${cardState}`}
                  data-card-index={index}
                  aria-hidden="true"
                >
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 40vw, 82vw"
                    className="object-cover"
                    priority={index < 2}
                  />
                </div>
              );
            })}

            <div className="services-showcase__content">
              {services.map((service, index) => {
                const isActive = showcase.activeIndex === index;

                return (
                  <article
                    key={service.id}
                    className={`services-showcase__copy${isActive ? " is-active" : ""}`}
                    aria-hidden={!isActive}
                  >
                    <p className="services-showcase__eyebrow">{service.name}</p>
                    <h3>{service.description}</h3>
                    <Link href="/services" tabIndex={isActive ? 0 : -1}>
                      Discover this Service
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>

          <span className="services-showcase__label" aria-hidden="true">
            The Services
          </span>
        </div>
      </div>
    </section>
  );
}
