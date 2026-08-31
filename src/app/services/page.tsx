import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CTA } from "@/components/cta";
import { serviceDetails } from "@/lib/data";
import { ServicesShowcase } from "@/components/services-showcase";

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

      <ServicesShowcase services={serviceDetails} />

      <CTA />
    </>
  );
}
