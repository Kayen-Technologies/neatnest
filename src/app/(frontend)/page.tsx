import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Gallery } from "@/components/gallery";
import { Testimonials } from "@/components/testimonials";
import { CTA } from "@/components/cta";
import { getServices, getTestimonials } from "@/lib/payload";
import { services as staticServices, testimonials as staticTestimonials } from "@/lib/data";

export default async function Home() {
  let servicesData;
  let testimonialsData;

  try {
    servicesData = await getServices();
    testimonialsData = await getTestimonials();
  } catch {
    servicesData = staticServices;
    testimonialsData = staticTestimonials;
  }

  return (
    <>
      <Hero />
      <About />
      <Services services={servicesData} />
      <Process />
      <Gallery />
      <Testimonials testimonials={testimonialsData} />
      <CTA />
    </>
  );
}
