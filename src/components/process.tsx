import { steps, type Step } from "@/lib/data";
import { Reel } from "./reel";

const toneMap: Record<
  Step["tone"],
  { card: string; eyebrow: string; step: string; numeral: string; desc: string }
> = {
  light: {
    card: "bg-[#edeae3] text-ink",
    eyebrow: "border-black/8 text-ink",
    step: "text-muted",
    numeral: "text-ink/20",
    desc: "text-muted",
  },
  cream: {
    card: "bg-cream-soft text-ink",
    eyebrow: "border-black/8 text-ink",
    step: "text-muted",
    numeral: "text-ink/25",
    desc: "text-muted",
  },
  ink: {
    card: "bg-ink text-cream",
    eyebrow: "border-white/10 text-cream",
    step: "text-cream/55",
    numeral: "text-cream/95",
    desc: "text-cream/60",
  },
  brown: {
    card: "bg-brown text-cream",
    eyebrow: "border-white/15 text-cream",
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
    <article
      className={`flex h-full min-h-[340px] flex-col overflow-hidden rounded-[26px] ${t.card}`}
    >
      <div className={`flex items-center gap-2.5 border-b px-6 py-5 ${t.eyebrow}`}>
        <StepIcon i={i} />
        <span className="text-[13px]">{s.eyebrow}</span>
      </div>
      <div className="flex flex-1 flex-col px-6 pb-8 pt-6">
        <span className={`text-[11px] uppercase tracking-[0.28em] ${t.step}`}>
          Step
        </span>
        <span
          className={`mt-4 font-display text-[76px] font-medium leading-none ${t.numeral}`}
        >
          {s.numeral}
        </span>
        <h3 className="mt-auto pt-8 font-display text-2xl font-medium">
          {s.title}
        </h3>
        <p className={`mt-3 text-[13.5px] leading-relaxed ${t.desc}`}>
          {s.description}
        </p>
      </div>
    </article>
  );
}

export function Process() {
  return (
    <section className="shell py-20 md:py-28">
      <h2 className="mx-auto max-w-2xl text-center font-display text-[clamp(2rem,4.4vw,3.3rem)] font-medium leading-[1.08] tracking-[-0.015em] text-ink">
        An experience composed in four quiet movements.
      </h2>

      {/* Mobile carousel */}
      <div className="mt-12 sm:hidden">
        <Reel itemClassName="w-[80%]">
          {steps.map((s, i) => (
            <StepCard key={s.numeral} s={s} i={i} />
          ))}
        </Reel>
      </div>

      {/* Tablet / desktop grid */}
      <div className="mt-14 hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-3.5">
        {steps.map((s, i) => (
          <StepCard key={s.numeral} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}
