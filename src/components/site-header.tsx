"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { navLinks } from "@/lib/data";
import { useSchedule } from "@/lib/schedule-context";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { openSchedule } = useSchedule();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="shell flex items-center justify-between py-4">
        <Logo />

        {/* Desktop nav pill */}
        <div className="hidden items-center rounded-full bg-cream-soft/90 py-1.5 pl-8 pr-1.5 shadow-[0_1px_0_rgba(0,0,0,0.03)] backdrop-blur lg:flex">
          <nav className="flex items-center gap-8 text-[15px] text-ink/85">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative py-1 transition-colors hover:text-brown ${
                    active ? "font-medium text-brown" : ""
                  }`}
                >
                  {l.label}
                  {active && (
                    <span className="absolute -bottom-1 left-1/2 h-[2.5px] w-4 -translate-x-1/2 rounded-full bg-brown transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={openSchedule}
            className="ml-8 rounded-full bg-brown px-6 py-3 text-[15px] font-medium text-cream transition-colors hover:bg-brown-dark cursor-pointer"
          >
            Schedule a Visit
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-soft text-ink lg:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-[1.5px] w-5 bg-current transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-cream lg:hidden">
          <div className="shell flex h-full flex-col pb-8 pt-4">
            <div className="flex justify-end">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-background text-ink shadow-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav className="mt-8 flex flex-col">
              {navLinks.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`flex items-center justify-between border-b border-ink/10 py-5 text-xl transition-colors hover:text-brown ${
                      active ? "font-medium text-brown" : "text-ink"
                    }`}
                  >
                    <span>{l.label}</span>
                    {active && (
                      <span className="h-[2px] w-5 rounded-full bg-brown" />
                    )}
                  </Link>
                );
              })}
            </nav>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openSchedule();
              }}
              className="mt-auto rounded-full bg-brown py-4 text-center text-[15px] font-medium text-cream transition-colors hover:bg-brown-dark cursor-pointer"
            >
              Schedule a Visit
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
