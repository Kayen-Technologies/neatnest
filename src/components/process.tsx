"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { steps, type Step } from "@/lib/data";

const toneMap: Record<
  Step["tone"],
  {
    headerBg: string;
    bodyBg: string;
    headerText: string;
    bodyText: string;
    step: string;
    numeral: string;
    desc: string;
  }
> = {
  light: {
    headerBg: "bg-[#F8F8F8]",
    bodyBg: "bg-[#F5F5F5] text-ink",
    headerText: "text-#1E1E1E",
    bodyText: "text-ink",
    step: "text-[#A8A4A4]",
    numeral: "text-[#1E1E1E1A]",
    desc: "text-[#A8A4A4]",
  },
  cream: {
    headerBg: "bg-[#F5EFE6B2]",
    bodyBg: "bg-[#F5EFE6] text-ink",
    headerText: "text-[#1A1A1A]",
    bodyText: "text-ink",
    step: "text-[#A8A4A4]",
    numeral: "text-[#1E1E1E1A]",
    desc: "text-[#A8A4A4]",
  },
  ink: {
    headerBg: "bg-[#1A1A1AB2]",
    bodyBg: "bg-[#1a1a1a] text-cream",
    headerText: "text-white",
    bodyText: "text-cream",
    step: "text-white",
    numeral: "text-white",
    desc: "text-white",
  },
  brown: {
    headerBg: "bg-[#6B4F3AB2]",
    bodyBg: "bg-[#6B4F3A] text-cream",
    headerText: "text-white",
    bodyText: "text-white",
    step: "text-white",
    numeral: "text-[#FFFFFFCC]",
    desc: "text-white",
  },
};

function StepIcon({ i, className }: { i: number; className?: string }) {
  const images = [
    "/images/icons/home/experience/men.jpg",
    "/images/icons/home/experience/check.jpg",
    "/images/icons/home/experience/broom.jpg",
    "/images/icons/home/experience/tick.jpg",
  ];

  return (
    <div className={`relative h-4 w-4 overflow-hidden rounded-full ${className || ""}`}>
      <Image
        src={images[i] || images[0]}
        alt=""
        fill
        sizes="16px"
        className="object-cover"
      />
    </div>
  );
}

function StepCard({ s, i }: { s: Step; i: number }) {
  const t = toneMap[s.tone];
  return (
    <article className="flex h-full flex-col">
      {/* Top Header Card */}
      <div
        className={`flex flex-col justify-start items-start gap-2.5 rounded-[20px] px-6 py-4 ${t.headerBg} ${t.headerText}`}
      >
        <StepIcon i={i} />
        <span className="text-[13px] font-medium">{s.eyebrow}</span>
      </div>

      {/* Bottom Body Card */}
      <div className={`flex flex-1 flex-col rounded-[20px] px-6 pb-15 pt-6 ${t.bodyBg}`}>
        <span className={`text-[11px] uppercase tracking-[0.28em] ${t.step}`}>
          Step
        </span>
        <span
          className={`mt-17 mb-8 font-display text-[76px] flex justify-center font-medium leading-none ${t.numeral}`}
        >
          {s.numeral}
        </span>
        <h3 className="mt-auto pt-6 font-display text-2xl font-medium">
          {s.title}
        </h3>
        <p className={`mt-5 text-[13.5px] leading-relaxed ${t.desc}`}>
          {s.description}
        </p>
      </div>
    </article>
  );
}

export function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
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

    setActiveIndex(closestIndex);
  };

  const scrollToStep = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[index] as HTMLElement | undefined;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      setActiveIndex(index);
    }
  };

  return (
    <section className="shell py-20 md:py-30">
      <h2 className="mx-auto max-w-2xl text-center font-display text-[clamp(2rem,4.4vw,3.3rem)] font-medium leading-[1.08] tracking-[-0.015em] text-ink">
        An experience composed in four quiet movements.
      </h2>

      {/* Mobile: swipeable cards with scroll snap */}
      <div className="mt-12 sm:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-6 px-6 scroll-pl-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {steps.map((s, i) => (
            <div key={s.numeral} className="w-[85%] shrink-0 snap-center">
              <div className="h-[500px]">
                <StepCard s={s} i={i} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-15 flex justify-center gap-2.5">
          {steps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show step ${i + 1}`}
              onClick={() => scrollToStep(i)}
              className={`h-3 w-3 rounded-full transition-colors ${
                i === activeIndex ? "bg-[#222B4ACC]" : "bg-[#222B4A33]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tablet / desktop: all 4 fixed slots */}
      <div className="mt-20 hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-3.5">
        {steps.map((s, i) => (
          <div key={s.numeral} className="h-[500px] sm:h-[540px] lg:h-[400px]">
            <StepCard s={s} i={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
