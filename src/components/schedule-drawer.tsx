"use client";

import Image from "next/image";
import { useSchedule } from "@/lib/schedule-context";
import { ScheduleForm } from "./schedule-form";

export function ScheduleDrawer() {
  const { isOpen, closeSchedule } = useSchedule();

  return (
    <div
      className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-300 ${isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
          }`}
        onClick={closeSchedule}
      />

      {/* Drawer Panel */}
      <div
        className={`relative z-10 w-full bg-[#F5EFE6] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] h-full overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex min-h-full w-full flex-col px-5 pb-6 sm:pb-10 lg:flex-row lg:gap-12 xl:gap-20 lg:pr-10 xl:pr-16">
          {/* Left panel (desktop only) */}
          <div className="hidden flex-col justify-between lg:flex flex-5">
            <div>
              <Image
                src="/broom.png"
                alt="Neat Nest Broom"
                width={150}
                height={120}
                className="object-contain"
              />
            </div>
            <h1 className="mt-auto font-display pl-7 text-6xl font-medium leading-[1.05] tracking-[-0.02em] text-ink">
              Calm Spaces Begin Here.
            </h1>
          </div>

          {/* Form panel */}
          <div className="flex w-full flex-col justify-center flex-4">
            <ScheduleForm />
          </div>
        </div>
      </div>
    </div>
  );
}
