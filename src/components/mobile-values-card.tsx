"use client";

import { useRef, useState } from "react";
import { AboutValue } from "@/lib/data";

interface MobileValuesCardProps {
  values: AboutValue[];
}

export function MobileValuesCard({ values }: MobileValuesCardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // Total scrollable area
    const maxScrollLeft = scrollWidth - clientWidth;
    
    // Prevent divide by zero
    if (maxScrollLeft <= 0) return;
    
    // Proportion of scroll progress (0 to 1)
    const scrollProgress = scrollLeft / maxScrollLeft;
    
    // Map progress directly to an index
    const index = Math.round(scrollProgress * (values.length - 1));
    setActiveIndex(index);
  };

  return (
    <div className="mt-10 lg:hidden">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scroll-pl-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {values.map((val) => (
          <div
            key={val.numeral}
            className="relative flex h-[380px] w-[85vw] max-w-[320px] flex-none snap-start flex-col rounded-xl bg-[#3C3C3C] p-6"
          >
            <span className="text-sm text-white">{val.numeral}</span>
            <span className="mt-3 text-lg font-medium text-white">
              {val.title}
            </span>
            <p className="mt-auto pt-8 text-[13.5px] leading-relaxed text-[#FFFFFFB2]">
              {val.description}
            </p>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {values.map((_, idx) => (
          <div
            key={idx}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              activeIndex === idx ? "bg-[#FFFFFFCC]" : "bg-[#FFFFFF33]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
