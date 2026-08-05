"use client";

import Image from "next/image";
import { useScrollZoom } from "@/lib/use-scroll-zoom";

type ZoomImageProps = {
  src: string;
  alt: string;
  sizes: string;
  frameClassName: string;
  max?: number;
};

// A fixed-size frame (overflow-hidden) containing an image that rises and
// grows as it scrolls through the viewport — the frame never moves or
// resizes, only the picture inside it lifts up and zooms in. Modeled on the
// "Nowhere to go but up" section of jobyaviation.com.
export function ZoomImage({
  src,
  alt,
  sizes,
  frameClassName,
  max = 1.3,
}: ZoomImageProps) {
  const { ref, scale, y } = useScrollZoom<HTMLDivElement>({ max });

  return (
    <div className={frameClassName}>
      <div
        ref={ref}
        className="absolute inset-0"
        style={{
          transform: `translateY(${y}px) scale(${scale})`,
          willChange: "transform",
        }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}
