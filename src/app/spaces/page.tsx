import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { beforeAfterPairs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Spaces We Care For — Neat Nest",
  description:
    "A closer look at the homes, offices and commercial spaces Neat Nest has transformed across Accra.",
};

export default function SpacesPage() {
  return (
    <>
      <PageHero
        title="A closer look at our work."
        description="Explore a collection of homes, offices, and commercial spaces we've transformed with attention to detail, professionalism, and a commitment to exceptional results."
        image="/images/spaces-hero.jpg"
        imageAlt="Neat Nest cleaning supplies"
      />

      <section className="shell py-16 md:py-24">
        <div className="space-y-6 md:space-y-12">
          {beforeAfterPairs.map((pair, i) => (
            <div
              key={pair.label}
              className={`flex gap-3 md:gap-5 ${
                i % 2 === 1 ? "md:justify-end" : "md:justify-start"
              }`}
            >
              <Figure src={pair.before} alt={`${pair.label} before`} label="Before" />
              <Figure src={pair.after} alt={`${pair.label} after`} label="After" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Figure({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <figure className="relative aspect-[4/5] w-1/2 overflow-hidden rounded-[20px] md:aspect-[3/4] md:w-[320px]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, 320px"
        className="object-cover"
      />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent pb-4 pt-10 text-center text-sm text-cream">
        {label}
      </span>
    </figure>
  );
}
