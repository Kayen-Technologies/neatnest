import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="shell pt-12 pb-17 md:pt-20 md:pb-17">
        <div className="grid items-end gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12">
          <h1 className="font-display text-[clamp(2.4rem,6.5vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.02em] text-ink">
            Where every space reflects comfort{" "}
            <span className="font-normal italic">&amp;</span> excellence.
          </h1>

          <div className="md:pb-2">
            <p className="max-w-sm text-[15px] leading-relaxed text-[#5E5E5E] md:ml-auto">
              Neat Nest is a discreet, detail-obsessed cleaning house caring for
              the homes, offices and residences of Accra&rsquo;s most considered
              clients.
            </p>
            <div className="mt-6 md:flex md:justify-start md:ml-auto max-w-sm">
              <Link
                href="/services"
                className="inline-flex items-center rounded-full bg-brown-dark px-7 py-3.5 text-[15px] font-medium text-cream transition-colors hover:bg-brown-dark"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-[46vw] max-h-[640px] min-h-[300px] w-full">
        <Image
          src="/images/hero.jpg"
          alt="A meticulously kept, light-filled luxury living space"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
