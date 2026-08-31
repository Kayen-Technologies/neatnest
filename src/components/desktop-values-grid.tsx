"use client";

import React from "react";
import Image from "next/image";
import { AboutValue } from "@/lib/data";

interface DesktopValuesGridProps {
  values: AboutValue[];
}

export function DesktopValuesGrid({ values }: DesktopValuesGridProps) {
  return (
    <div className="mt-12 mb-20 hidden grid-cols-4 gap-3 lg:grid">
      {values.map((v, i) => {
        // First row (indices 0 and 1) has Image first, then Text.
        // Second row (indices 2 and 3) has Text first, then Image.
        const imageFirst = i < 2;

        const ImageNode = (
          <div className="relative h-[420px] w-full overflow-hidden rounded-2xl">
            <Image
              src={v.image}
              alt={v.title}
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
        );

        const TextNode = (
          <div className="flex h-[420px] w-full flex-col rounded-xl bg-[#3C3C3C] p-6">
            <span className="text-[15px] text-white">{v.numeral}</span>
            <span className="mt-3 text-[20px] font-light text-white">
              {v.title}
            </span>
            <p className="mt-auto pt-8 text-[14px] leading-relaxed text-[#FFFFFFB2]">
              {v.description}
            </p>
          </div>
        );

        return (
          <React.Fragment key={v.title}>
            {imageFirst ? (
              <>
                {ImageNode}
                {TextNode}
              </>
            ) : (
              <>
                {TextNode}
                {ImageNode}
              </>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
