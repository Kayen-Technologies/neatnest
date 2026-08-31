"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { scheduleOptions } from "@/lib/data";
import { useSchedule } from "@/lib/schedule-context";
import { showError, showSuccess } from "@/lib/toast";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
} from "@/components/ui/combobox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const fieldClass =
  "w-full rounded-lg bg-background px-4 text-[15px] text-[#5E5E5E] placeholder:text-[#5E5E5E] outline-none focus:ring-2 focus:ring-brown/40 border-0";

export function ScheduleForm() {
  const [date, setDate] = useState<Date>();
  const [resetKey, setResetKey] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!date) {
      showError("Please select a preferred date.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(form);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: `${formData.get("countryCode") || ''} ${formData.get("phone") || ''}`.trim(),
        property: formData.get("property") || undefined,
        service: formData.get("service") || undefined,
        size: formData.get("size") || undefined,
        date: formData.get("date") || undefined,
        notes: formData.get("notes") || undefined,
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to submit request.");
      }

      form.reset();
      setDate(undefined);
      setResetKey((prev) => prev + 1);
      showSuccess("Your request has been submitted successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
      showError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { closeSchedule } = useSchedule();

  const handleClose = () => {
    const form = document.getElementById("schedule-form") as HTMLFormElement;
    if (form) form.reset();
    setDate(undefined);
    setResetKey((prev) => prev + 1);
    closeSchedule();
  };



  return (
    <div className="relative flex items-start justify-between gap-3 h-full pt-12 lg:pt-0">
      {/* Left side (Title + Form) */}
      <div className="flex flex-1 flex-col justify-between h-full">
        <h2 className="font-display text-2xl lg:text-4xl font-bold text-ink mt-6 lg:mt-10 mb-8 lg:mb-0 pr-12 lg:pr-0">
          Cleaning Assessment Request
        </h2>

        <form key={resetKey} id="schedule-form" onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="space-y-4 lg:space-y-7">
            <Input required name="name" placeholder="Full Name *" className={`${fieldClass} h-[52px]`} />
            <Input
              required
              type="email"
              name="email"
              placeholder="Email Address *"
              className={`${fieldClass} h-[52px]`}
            />

            <div className="flex gap-3 h-[52px]">
              <Combobox name="countryCode" items={["+233", "+1", "+44", "+234", "+27"]}>
                <ComboboxInput
                  placeholder="+233"
                  className="h-full w-[100px] rounded-lg bg-background px-2 text-[15px] text-ink outline-none focus:ring-2 focus:ring-brown/40 border-0"
                />
                <ComboboxContent>
                  <ComboboxList>
                    {(o) => (
                      <ComboboxItem key={o} value={o}>
                        {o}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <Input
                name="phone"
                inputMode="tel"
                placeholder="Your phone number"
                className={`${fieldClass} h-full`}
              />
            </div>

            <Combobox name="property" items={scheduleOptions.propertyTypes}>
              <ComboboxInput required placeholder="Property Information *" className={`${fieldClass} h-[52px]`} />
              <ComboboxContent>
                <ComboboxList>
                  {(o) => (
                    <ComboboxItem key={o} value={o}>
                      {o}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            <Combobox name="service" items={scheduleOptions.services}>
              <ComboboxInput required placeholder="Service Needed *" className={`${fieldClass} h-[52px]`} />
              <ComboboxContent>
                <ComboboxList>
                  {(o) => (
                    <ComboboxItem key={o} value={o}>
                      {o}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            <Combobox name="size" items={scheduleOptions.sizes}>
              <ComboboxInput required placeholder="Property Size *" className={`${fieldClass} h-[52px]`} />
              <ComboboxContent>
                <ComboboxList>
                  {(o) => (
                    <ComboboxItem key={o} value={o}>
                      {o}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            <Popover>
              <PopoverTrigger
                type="button"
                data-empty={!date}
                className={`${fieldClass} flex items-center h-[52px] justify-between text-left font-normal data-[empty=true]:text-[#5E5E5E] hover:bg-background`}
              >
                {date ? format(date, "PPP") : <span>Preferred Date *</span>}
                <Image src="/images/icons/cal.png" alt="Calendar" width={20} height={20} data-icon="inline-end" />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  defaultMonth={date}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </PopoverContent>
            </Popover>
            {date && <input type="hidden" name="date" value={format(date, "yyyy-MM-dd")} />}

            <Textarea
              name="notes"
              placeholder="Tell us about your space or any special requests."
              className={`${fieldClass} min-h-[160px] py-4 resize-none`}
            />
          </div>
        </form>
        <div className="mt-8 lg:mt-0 pb-6 lg:pb-0">
          <button
            type="submit"
            form="schedule-form"
            disabled={isSubmitting}
            className="w-full rounded-full bg-brown-dark py-4 text-[15px] font-medium text-white transition-colors hover:bg-brown-dark disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      {/* Right side: Close button */}
      <div className="absolute right-0 top-2 lg:relative lg:top-auto lg:right-auto lg:mt-9">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink cursor-pointer"
        >
          <span className="hidden lg:inline text-[#5E5E5E]">Close</span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background">
            <Image src="/images/icons/arrleft.png" alt="Back" width={22} height={22} className="block lg:hidden" />
            <Image src="/images/icons/close.png" alt="Close" width={22} height={22} className="hidden lg:block" />
          </span>
        </button>
      </div>
    </div>
  );
}
