"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AboutValue } from "@/lib/data";

interface DesktopValuesGridProps {
  values: AboutValue[];
}

export function DesktopValuesGrid({ values }: DesktopValuesGridProps) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 hidden grid-cols-4 gap-3 lg:grid">
      {values.map((v, i) => {
        // Position 0 & 3 start as Image, 1 & 2 start as Text
        const isInitiallyImage = i === 0 || i === 3;
        const showImage = flipped ? !isInitiallyImage : isInitiallyImage;

        return (
          <div
            key={v.title}
            className="relative h-[320px] w-full [perspective:1000px]"
          >
            <div
              className={`relative h-full w-full duration-700 ease-in-out [transform-style:preserve-3d] ${
                showImage ? "" : "[transform:rotateY(180deg)]"
              }`}
            >
              {/* Image side (Front when showImage, Back when flipped) */}
              <div className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl [backface-visibility:hidden]">
                <Image
                  src={v.image}
                  alt={v.title}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>

              {/* Text side (Back when showImage, Front when flipped) */}
              <div className="absolute inset-0 flex h-full w-full flex-col rounded-2xl bg-white/[0.05] p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <span className="text-sm text-cream/45">{v.numeral}</span>
                <span className="mt-3 font-display text-2xl font-medium text-cream">
                  {v.title}
                </span>
                <p className="mt-auto pt-8 text-[13.5px] leading-relaxed text-cream/60">
                  {v.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
