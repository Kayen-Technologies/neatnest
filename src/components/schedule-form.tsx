"use client";

import { useState } from "react";
import { scheduleOptions } from "@/lib/data";
import { useSchedule } from "@/lib/schedule-context";

const fieldClass =
  "w-full rounded-xl bg-background px-4 py-3.5 text-[15px] text-ink placeholder:text-muted outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-brown/40";

export function ScheduleForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Client-side capture. To persist, POST these fields to a Next.js
    // route handler (e.g. /api/schedule) — the form is already structured for it.
    setSubmitted(true);
  };

  const { closeSchedule } = useSchedule();

  if (submitted) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl bg-background/60 p-10 text-center ring-1 ring-black/5">
        <h2 className="font-display text-3xl font-medium text-ink">
          Request received.
        </h2>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
          Thank you. A member of the Neat Nest team will be in touch shortly to
          confirm your assessment and arrange a visit.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            closeSchedule();
          }}
          className="mt-8 rounded-full bg-brown px-7 py-3 text-[15px] font-medium text-cream transition-colors hover:bg-brown-dark cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[450px]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-medium text-ink">
          Cleaning Assessment Request
        </h2>
        <button
          type="button"
          onClick={closeSchedule}
          aria-label="Close"
          className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink cursor-pointer"
        >
          <span className="hidden md:inline">Close</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background ring-1 ring-black/5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="block md:hidden">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="hidden md:inline">&times;</span>
          </span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input required name="name" placeholder="Full Name *" className={fieldClass} />
        <input
          required
          type="email"
          name="email"
          placeholder="Email Address *"
          className={fieldClass}
        />

        <div className="flex gap-3">
          <span className="flex items-center rounded-xl bg-background px-4 text-[15px] text-ink ring-1 ring-black/5">
            +233
          </span>
          <input
            name="phone"
            inputMode="tel"
            placeholder="Your phone number"
            className={fieldClass}
          />
        </div>

        <select required name="property" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Property Information *
          </option>
          {scheduleOptions.propertyTypes.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <select required name="service" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Service Needed *
          </option>
          {scheduleOptions.services.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <select required name="size" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Property Size *
          </option>
          {scheduleOptions.sizes.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <input
          required
          type="date"
          name="date"
          aria-label="Preferred Date"
          className={fieldClass}
        />

        <textarea
          name="notes"
          rows={4}
          placeholder="Tell us about your space or any special requests."
          className={`${fieldClass} resize-none`}
        />

        <button
          type="submit"
          className="w-full rounded-full bg-brown py-4 text-[15px] font-medium text-cream transition-colors hover:bg-brown-dark"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
