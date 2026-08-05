import Image from "next/image";
import Link from "next/link";

export function About() {
  return (
    <section id="about" className="shell py-20 md:py-28">
      <h2 className="max-w-3xl font-display text-[clamp(2.1rem,4.6vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.015em] text-ink">
        A quiet practice of care, consistency and craft.
      </h2>

      <div className="mt-12 grid items-end gap-10 md:mt-20 md:grid-cols-2 md:gap-16">
        <div className="relative order-2 aspect-[4/5] w-full max-w-md overflow-hidden rounded-[20px] md:order-1">
          <Image
            src="/images/about.jpg"
            alt="Natural-bristle cleaning brushes in a stoneware pot"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover object-right"
          />
        </div>

        <div className="order-1 md:order-2 md:pb-6">
          <p className="max-w-lg text-[15px] leading-[1.85] text-muted">
            At Neat Nest, we believe that a truly clean space is the foundation
            of a tranquil mind. Founded in Accra to serve the city&rsquo;s most
            discerning residents, we approach cleaning as a curated hospitality
            experience. Our team of professionals is trained in the fine art of
            discretion and precision. We don&rsquo;t just remove dust; we
            restore the architectural beauty and calm of your environment,
            ensuring your home remains your most cherished sanctuary.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center rounded-full bg-brown px-7 py-3.5 text-[15px] font-medium text-cream transition-colors hover:bg-brown-dark"
          >
            Read Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
