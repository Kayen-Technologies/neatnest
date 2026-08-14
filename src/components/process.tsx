"use client";

import { useEffect, useState } from "react";
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
    headerBg: "bg-[#f5f5f3]",
    bodyBg: "bg-[#f5f5f3] text-ink",
    headerText: "text-ink",
    bodyText: "text-ink",
    step: "text-muted",
    numeral: "text-ink/15",
    desc: "text-muted",
  },
  cream: {
    headerBg: "bg-[#faf7f2]",
    bodyBg: "bg-[#f2ebe1] text-ink",
    headerText: "text-ink",
    bodyText: "text-ink",
    step: "text-muted",
    numeral: "text-ink/20",
    desc: "text-muted",
  },
  ink: {
    headerBg: "bg-[#5a5a5a]",
    bodyBg: "bg-[#1a1a1a] text-cream",
    headerText: "text-cream",
    bodyText: "text-cream",
    step: "text-cream/55",
    numeral: "text-cream/95",
    desc: "text-cream/60",
  },
  brown: {
    headerBg: "bg-[#998475]",
    bodyBg: "bg-[#5c4b3f] text-cream",
    headerText: "text-cream",
    bodyText: "text-cream",
    step: "text-cream/60",
    numeral: "text-cream/95",
    desc: "text-cream/65",
  },
};

function StepIcon({ i, className }: { i: number; className?: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
  switch (i) {
    case 0: // consultation — chat
      return (
        <svg {...common} aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
        </svg>
      );
    case 1: // scheduling — calendar
      return (
        <svg {...common} aria-hidden="true">
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M3 9h18M8 2v4M16 2v4" />
        </svg>
      );
    case 2: // cleaning — sparkle
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z" />
        </svg>
      );
    default: // inspection — check badge
      return (
        <svg {...common} aria-hidden="true">
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

function StepCard({ s, i }: { s: Step; i: number }) {
  const t = toneMap[s.tone];
  return (
    <article className="flex h-full flex-col">
      {/* Top Header Card */}
      <div
        className={`flex items-center gap-2.5 rounded-[15px] px-6 py-4 ${t.headerBg} ${t.headerText}`}
      >
        <StepIcon i={i} />
        <span className="text-[13px] font-medium">{s.eyebrow}</span>
      </div>

      {/* Bottom Body Card */}
      <div className={`flex flex-1 flex-col rounded-[20px] px-6 pb-8 pt-6 ${t.bodyBg}`}>
        <span className={`text-[11px] uppercase tracking-[0.28em] ${t.step}`}>
          Step
        </span>
        <span
          className={`mt-3 font-display text-[76px] font-medium leading-none ${t.numeral}`}
        >
          {s.numeral}
        </span>
        <h3 className="mt-auto pt-6 font-display text-2xl font-medium">
          {s.title}
        </h3>
        <p className={`mt-3 text-[13.5px] leading-relaxed ${t.desc}`}>
          {s.description}
        </p>
      </div>
    </article>
  );
}

// A fixed-position slot whose displayed step rotates every tick. All 4 steps
// are stacked and cross-faded via opacity — the slot itself never moves, only
// its content changes, so several slots side by side read as "shifting" in
// sync without anything actually sliding.
function Slot({ slotIndex, rotation }: { slotIndex: number; rotation: number }) {
  const n = steps.length;
  const activeStep = (slotIndex + rotation) % n;
  return (
    <div className="relative h-[400px] sm:h-[360px] lg:h-[400px]">
      {steps.map((s, i) => (
        <div
          key={s.numeral}
          aria-hidden={i !== activeStep}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === activeStep ? 1 : 0 }}
        >
          <StepCard s={s} i={i} />
        </div>
      ))}
    </div>
  );
}

export function Process() {
  const n = steps.length;
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRotation((r) => (r + 1) % n), 3000);
    return () => clearInterval(id);
  }, [n]);

  return (
    <section className="shell py-20 md:py-28">
      <h2 className="mx-auto max-w-2xl text-center font-display text-[clamp(2rem,4.4vw,3.3rem)] font-medium leading-[1.08] tracking-[-0.015em] text-ink">
        An experience composed in four quiet movements.
      </h2>

      {/* Mobile: one rotating card */}
      <div className="mt-12 sm:hidden">
        <div className="mx-auto max-w-md">
          <Slot slotIndex={0} rotation={rotation} />
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show step ${i + 1}`}
              onClick={() => setRotation(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === rotation ? "w-6 bg-ink" : "w-1.5 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tablet / desktop: all 4 fixed slots, content rotates through them */}
      <div className="mt-14 hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-3.5">
        {Array.from({ length: n }, (_, slot) => (
          <Slot key={slot} slotIndex={slot} rotation={rotation} />
        ))}
      </div>
    </section>
  );
}
