import Image from "next/image";
import type { Principle } from "@/lib/data";

export function PrinciplesShowcase({
  principles,
}: {
  principles: Principle[];
}) {
  return (
    <div className="shell py-16 md:py-24">
      {/* Title block */}
      <div className="mb-12 md:mb-14">
        <h2 className="max-w-[500px] font-display text-[clamp(2rem,4.4vw,3.3rem)] font-medium leading-[1.08] tracking-[-0.015em] text-white">
          The standard, gently held visit after visit.
        </h2>
      </div>

      {/* Decorative image - visible on tablet/desktop, positioned below title on the right */}
      <div className="mb-10 hidden w-full justify-end md:flex ">
        <div className="relative h-[250px] w-[200px] overflow-hidden rounded-xl">
          <Image
            src="/images/gallery-7.jpg"
            alt="Pristine bathroom"
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-8 mb-5">
        {principles.map((p, i) => (
          <div
            key={p.title}
            className="relative py-10 md:py-16"
          >
            {/* Gradient top line */}
            <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 md:left-[270px] md:right-[270px] md:w-auto md:translate-x-0 h-[0.5px] bg-gradient-to-r from-[#FFFFFF66] via-[#FFFFFF] to-[#FFFFFF66]" />

            {/* Gradient bottom line (only for the last item) */}
            {i === principles.length - 1 && (
              <div className="absolute bottom-0 left-1/2 hidden w-full -translate-x-1/2 md:left-[270px] md:right-[270px] md:w-auto md:translate-x-0 h-[0.5px] bg-gradient-to-r from-[#FFFFFF66] via-[#FFFFFF] to-[#FFFFFF66] md:block" />
            )}

            {/* The image (alternating left/right) */}
            <div
              className={`relative mb-6 md:mb-0 aspect-[6/5] md:aspect-auto w-full md:absolute md:top-1/2 md:-translate-y-1/2 md:h-[250px] md:w-[200px] overflow-hidden rounded-xl ${
                i % 2 === 0 ? "md:left-0" : "md:right-0"
              }`}
            >
              <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 160px" className="object-cover" />
            </div>

            {/* The text content (centered on desktop, safely padded away from images) */}
            <div className="text-left md:text-center md:px-[232px]">
              <h3 className="font-display text-xl font-medium text-white md:text-[22px]">
                {p.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white md:mx-auto md:max-w-[320px]">
                {p.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
