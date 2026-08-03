import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="shell pt-8 pb-8 md:pt-14 md:pb-12">
        <div className="grid items-end gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12">
          <h1 className="font-display text-[clamp(2.9rem,7.4vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.02em] text-ink">
            Where every space reflects comfort{" "}
            <span className="font-normal italic">&amp;</span> excellence.
          </h1>

          <div className="md:pb-2">
            <p className="max-w-sm text-[15px] leading-relaxed text-muted md:ml-auto">
              Neat Nest is a discreet, detail-obsessed cleaning house caring for
              the homes, offices and residences of Accra&rsquo;s most considered
              clients.
            </p>
            <div className="mt-6 md:flex md:justify-end">
              <Link
                href="/services"
                className="inline-flex items-center rounded-full bg-brown px-7 py-3.5 text-[15px] font-medium text-cream transition-colors hover:bg-brown-dark"
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
