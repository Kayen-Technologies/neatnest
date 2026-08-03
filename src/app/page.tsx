import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Gallery } from "@/components/gallery";
import { Testimonials } from "@/components/testimonials";
import { CTA } from "@/components/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Process />
      <Gallery />
      <Testimonials />
      <CTA />
    </>
  );
}
