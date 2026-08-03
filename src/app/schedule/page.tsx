import type { Metadata } from "next";
import Image from "next/image";
import { ScheduleForm } from "@/components/schedule-form";

export const metadata: Metadata = {
  title: "Schedule a Visit — Neat Nest",
  description:
    "Request a cleaning assessment. Tell us about your space and a member of the Neat Nest team will arrange a visit.",
};

export default function SchedulePage() {
  return (
    <section className="bg-cream">
      <div className="shell grid gap-10 py-12 md:min-h-[calc(100vh-88px)] md:grid-cols-2 md:gap-16 md:py-16">
        {/* Left panel */}
        <div className="hidden flex-col md:flex">
          <BroomMark className="text-ink" />
          <div className="mt-auto pt-10">
            <h1 className="font-display text-[clamp(2.4rem,4.5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
              Calm Spaces Begin Here.
            </h1>
            <div className="relative mt-8 hidden aspect-[16/9] w-full overflow-hidden rounded-[20px] md:block">
              <Image
                src="/images/spaces-hero.jpg"
                alt="Neat Nest cleaning supplies"
                fill
                sizes="45vw"
                className="object-cover object-bottom"
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="md:pt-2">
          <ScheduleForm />
        </div>
      </div>
    </section>
  );
}

function BroomMark({ className = "" }: { className?: string }) {
  return (
    <svg
      width="120"
      height="90"
      viewBox="0 0 120 90"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* broom handle */}
      <line x1="46" y1="6" x2="20" y2="52" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      {/* broom head binding */}
      <path d="M14 50 L30 58" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      {/* broom bristles */}
      <path
        d="M14 50 C6 60 2 74 4 84 L34 84 C34 74 34 64 30 58 Z"
        fill="currentColor"
      />
      <g stroke="#f5efe5" strokeWidth="1.1" opacity="0.6">
        <line x1="10" y1="66" x2="8" y2="84" />
        <line x1="16" y1="62" x2="16" y2="84" />
        <line x1="22" y1="60" x2="24" y2="84" />
      </g>
      {/* dustpan */}
      <path
        d="M52 60 L110 60 L110 66 C110 78 100 86 86 86 L64 86 C56 86 52 80 52 72 Z"
        fill="currentColor"
      />
      <line x1="88" y1="60" x2="112" y2="52" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
