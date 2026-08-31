import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { beforeAfterPairs } from "@/lib/data";
import { getBeforeAfterPairs } from "@/lib/payload";
import { SpacesShowcase } from "@/components/spaces-showcase";

export const metadata: Metadata = {
  title: "Spaces We Care For — Neat Nest",
  description:
    "A closer look at the homes, offices and commercial spaces Neat Nest has transformed across Accra.",
};

export default async function SpacesPage() {
  let pairs;
  try {
    pairs = await getBeforeAfterPairs();
  } catch {
    // Fallback to static data if Payload is unavailable
    pairs = beforeAfterPairs;
  }

  return (
    <>
      <PageHero
        title="A closer look at our work."
        description="Explore a collection of homes, offices, and commercial spaces we've transformed with attention to detail, professionalism, and a commitment to exceptional results."
        image="/images/spaces-hero.jpg"
        imageAlt="Neat Nest cleaning supplies"
      />

      <SpacesShowcase pairs={pairs} />
    </>
  );
}

