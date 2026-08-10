"use client";

import Image from "next/image";
import { useSchedule } from "@/lib/schedule-context";
import { ScheduleForm } from "./schedule-form";

export function ScheduleDrawer() {
  const { isOpen, closeSchedule } = useSchedule();

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={closeSchedule}
      />

      {/* Modal Card */}
      <div
        className={`relative z-10 w-full max-w-4xl bg-cream rounded-[28px] shadow-2xl transition-all duration-300 max-h-[90vh] overflow-y-auto ${
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        <div className="flex w-full flex-col p-6 sm:p-12 md:flex-row md:gap-16">
          {/* Left panel (desktop only) */}
          <div className="hidden flex-col justify-between md:flex md:w-[40%] min-h-[380px]">
            <div>
              <Image
                src="/broom.png"
                alt="Neat Nest Broom"
                width={120}
                height={90}
                className="object-contain"
              />
            </div>
            <h1 className="font-display text-[clamp(2rem,3vw,2.8rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink mt-auto">
              Calm Spaces Begin Here.
            </h1>
          </div>

          {/* Form panel */}
          <div className="w-full md:w-[60%]">
            <ScheduleForm />
          </div>
        </div>
      </div>
    </div>
  );
}
