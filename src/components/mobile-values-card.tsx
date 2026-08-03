"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AboutValue } from "@/lib/data";

interface MobileValuesCardProps {
  values: AboutValue[];
}

export function MobileValuesCard({ values }: MobileValuesCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped((prevFlipped) => {
        // If we are currently showing the flipped (image) side, step to the next card index and show text side again
        if (prevFlipped) {
          setCurrentIndex((prevIdx) => (prevIdx + 1) % values.length);
          return false;
        }
        // If we are currently showing text side, flip to image side
        return true;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [values.length]);

  const currentVal = values[currentIndex];

  return (
    <div className="mt-10 lg:hidden flex justify-center">
      <div className="relative h-[320px] w-full max-w-[340px] [perspective:1000px]">
        <div
          className={`relative h-full w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Text side (Front: 0deg) */}
          <div className="absolute inset-0 flex h-full w-full flex-col rounded-2xl bg-white/[0.05] p-6 [backface-visibility:hidden]">
            <span className="text-sm text-cream/45">{currentVal.numeral}</span>
            <span className="mt-3 font-display text-2xl font-medium text-cream">
              {currentVal.title}
            </span>
            <p className="mt-auto pt-8 text-[13.5px] leading-relaxed text-cream/60">
              {currentVal.description}
            </p>
          </div>

          {/* Image side (Back: 180deg) */}
          <div className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <Image
              src={currentVal.image}
              alt={currentVal.title}
              fill
              sizes="80vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <span className="font-display text-lg font-medium text-cream">
                {currentVal.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
