"use client";

import Image from "next/image";
import { useSchedule } from "@/lib/schedule-context";

export function CTA() {
  const { openSchedule } = useSchedule();

  return (
    <section id="contact" className="relative overflow-hidden">
      <Image
        src="/images/cta-bg.jpg"
        alt="A Neat Nest professional at work"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="relative shell py-28 md:py-50">
        <div className="relative overflow-hidden rounded-[20px] bg-cream px-6 py-10 md:pb-7 md:px-7 md:pt-40">
          <div className="absolute right-6 top-6 h-36 w-36 overflow-hidden rounded-2xl ring-1 ring-black/5 md:h-50 md:w-40">
            <Image
              src="/images/cta-bg.jpg"
              alt="On-site detailing"
              fill
              sizes="(max-width: 768px) 144px, 160px"
              className="object-cover"
            />
          </div>
          <div className="max-w-lg pt-44 md:pt-20">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.015em] text-ink">
              Bring comfort back to your space.
            </h2>
            <button
              type="button"
              onClick={openSchedule}
              className="mt-7 inline-flex items-center rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-brown hover:text-cream cursor-pointer"
            >
              Schedule a Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
