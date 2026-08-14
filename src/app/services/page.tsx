import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CTA } from "@/components/cta";
import { serviceDetails } from "@/lib/data";
import { Reel } from "@/components/reel";
import { ScheduleButton } from "@/components/schedule-button";

export const metadata: Metadata = {
  title: "Services — Neat Nest",
  description:
    "Residential, deep, post-construction and hotel & office cleaning tailored to your space in Accra.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="A cleaning service that fits your needs."
        description="From homes and offices to post-construction projects, we provide professional cleaning services tailored to your needs. Every visit is carried out with care, attention to detail."
        image="/images/services-hero.jpg"
        imageAlt="A Neat Nest professional cleaning a surface"
      />

      {serviceDetails.map((s, i) => (
        <section
          key={s.id}
          className={i % 2 === 1 ? "bg-cream" : "bg-background"}
        >
          <div className="shell py-16 md:py-24">
            <h2 className="font-display text-[clamp(1.8rem,3.8vw,2.9rem)] font-medium leading-[1.1] tracking-[-0.015em] text-ink">
              {s.name}
            </h2>
            <div className="mt-6 max-w-4xl space-y-4">
              {s.paragraphs.map((p, j) => (
                <p key={j} className="text-[15px] leading-[1.8] text-muted">
                  {p}
                </p>
              ))}
            </div>

            {/* Mobile carousel */}
            <div className="mt-10 md:hidden">
              <Reel itemClassName="w-[85%]">
                {[s.feature, ...s.gallery].map((src, k) => (
                  <div
                    key={k}
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px]"
                  >
                    <Image
                      src={src}
                      alt={`${s.name} detail ${k + 1}`}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </Reel>
            </div>

            {/* Desktop collage */}
            <div className="mt-10 hidden gap-3 md:grid md:grid-cols-2 md:gap-4">
              <div className="relative overflow-hidden rounded-[20px]">
                <Image
                  src={s.feature}
                  alt={s.name}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-rows-3 gap-3 md:gap-4">
                {s.gallery.map((src, k) => (
                  <div
                    key={k}
                    className="relative min-h-[130px] overflow-hidden rounded-[20px]"
                  >
                    <Image
                      src={src}
                      alt={`${s.name} detail ${k + 1}`}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <ScheduleButton className="inline-flex items-center rounded-full bg-brown px-7 py-3.5 text-[15px] font-medium text-cream transition-colors hover:bg-brown-dark">
                Schedule a Visit
              </ScheduleButton>
            </div>
          </div>
        </section>
      ))}

      <CTA />
    </>
  );
}
