import type { Metadata } from "next";
import Image from "next/image";
import { CTA } from "@/components/cta";
import { aboutValues, aboutPrinciples } from "@/lib/data";
import ScrollReveal from "@/components/scroll-reveal";
import { DesktopValuesGrid } from "@/components/desktop-values-grid";
import { MobileValuesCard } from "@/components/mobile-values-card";

export const metadata: Metadata = {
  title: "About — Neat Nest",
  description:
    "The story behind the standard: a premium Accra cleaning house built on discretion, craft, consistency and care.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] max-h-[720px] min-h-[420px] w-full">
        <Image
          src="/images/about-hero.jpg"
          alt="An impeccably kept living room"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="shell absolute inset-x-0 bottom-0">
          <h1 className="max-w-3xl pb-10 font-display text-[clamp(2.4rem,5.4vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-cream md:pb-14">
            More than cleaning. We care for every space.
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="shell py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={6}
            baseRotation={1}
            containerClassName="font-display text-[clamp(2rem,4.4vw,3.3rem)] font-medium leading-[1.08] tracking-[-0.015em] text-ink"
            as="h2"
            rotationStart="top bottom"
            rotationEnd="bottom center"
            wordAnimationStart="top bottom"
            wordAnimationEnd="bottom center"
          >
            The story behind the standard.
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={8}
            baseRotation={1}
            containerClassName="mt-6 text-[15px] leading-[1.9] text-muted"
            as="p"
            rotationStart="top bottom"
            rotationEnd="bottom center"
            wordAnimationStart="top bottom"
            wordAnimationEnd="bottom center"
          >
            Neat Nest Cleaning Agency is a premium cleaning company based in
            Accra, Ghana, dedicated to delivering exceptional cleaning
            experiences for homes, offices, hotels, and real estate properties.
            Founded with a vision to redefine cleanliness standards across
            Ghana, Neat Nest combines trained professionals, quality-grade
            equipment, and a commitment to detail that consistently exceeds
            client expectations. We serve a diverse clientele from homeowners
            and property managers to corporate offices and hospitality
            establishments offering tailored solutions that fit every need and
            budget. At Neat Nest, a clean space isn&rsquo;t just a service;
            it&rsquo;s our promise.
          </ScrollReveal>
        </div>
      </section>

      {/* Values (dark) */}
      <section className="bg-ink text-cream">
        <div className="shell py-20 md:py-28">
          <h2 className="w-full font-display text-[clamp(1.7rem,3.2vw,2.6rem)] font-medium leading-[1.15] tracking-[-0.01em] text-cream">
            We care for every space with the same quiet precision, thoughtful
            craftsmanship, and unwavering attention to detail.
          </h2>

          <div className="mt-8 border-b border-white/20 pb-4" />

          {/* Mobile carousel */}
          <MobileValuesCard values={aboutValues} />

          {/* Desktop grid */}
          <DesktopValuesGrid values={aboutValues} />
        </div>
      </section>

      {/* Principles (brown) */}
      <section className="bg-brown text-cream">
        <div className="shell py-16 md:py-24">
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4.4vw,3.3rem)] font-medium leading-[1.08] tracking-[-0.015em] text-cream">
            The standard, gently held visit after visit.
          </h2>

          <div className="mt-8">
            {aboutPrinciples.map((p, i) => (
              <div
                key={p.title}
                className="relative border-t border-white/15 py-8 md:py-12"
              >
                <div
                  className={`relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-xl md:absolute md:top-1/2 md:mb-0 md:aspect-auto md:h-28 md:w-28 md:-translate-y-1/2 ${
                    i % 2 === 0 ? "md:left-0 lg:left-8" : "md:right-0 lg:right-8"
                  }`}
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 160px"
                    className="object-cover"
                  />
                </div>
                <div className="text-left md:mx-auto md:max-w-md md:text-center">
                  <h3 className="font-display text-2xl font-medium text-cream">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-cream/70">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
