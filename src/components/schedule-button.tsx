"use client";

import { useSchedule } from "@/lib/schedule-context";

interface ScheduleButtonProps {
  className?: string;
  children: React.ReactNode;
}

export function ScheduleButton({ className, children }: ScheduleButtonProps) {
  const { openSchedule } = useSchedule();

  return (
    <button
      type="button"
      onClick={openSchedule}
      className={`${className} cursor-pointer`}
    >
      {children}
    </button>
  );
}
