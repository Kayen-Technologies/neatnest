"use client";

import { Children, useRef, useState, type ReactNode } from "react";

type ReelProps = {
  children: ReactNode;
  itemClassName?: string;
  className?: string;
  tone?: "dark" | "light";
};

// Touch-friendly horizontal snap carousel with synced dots. Intended for
// mobile; wrap in a `lg:hidden` container and render the desktop layout separately.
export function Reel({
  children,
  itemClassName = "w-[85%]",
  className = "",
  tone = "dark",
}: ReelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const node = c as HTMLElement;
      const cc = node.offsetLeft + node.offsetWidth / 2;
      const d = Math.abs(cc - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  };

  const scrollTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const node = el.children[i] as HTMLElement;
    el.scrollTo({
      left: node.offsetLeft - (el.clientWidth - node.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div
        ref={ref}
        onScroll={onScroll}
        className={`flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 no-scrollbar ${className}`}
      >
        {items.map((child, i) => (
          <div key={i} className={`shrink-0 snap-center ${itemClassName}`}>
            {child}
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to item ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`h-3 w-3 rounded-full transition-all ${
              i === active
                ? tone === "light"
                  ? "bg-[#222B4A33]"
                  : "bg-[#222B4ACC]"
                : tone === "light"
                  ? "bg-[#222B4A33]"
                  : "bg-[#222B4A33]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
