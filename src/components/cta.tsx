import Image from "next/image";
import Link from "next/link";

export function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <Image
        src="/images/cta-bg.jpg"
        alt="A Neat Nest professional at work"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="relative shell pb-40 pt-14 md:pb-52 md:pt-16">
        <div className="relative overflow-hidden rounded-[28px] bg-cream p-8 md:p-14">
          <div className="absolute right-5 top-5 h-24 w-28 overflow-hidden rounded-2xl ring-1 ring-black/5 md:h-32 md:w-40">
            <Image
              src="/images/cta-thumb.jpg"
              alt="On-site detailing"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
          <div className="max-w-md pt-16 md:pt-20">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.015em] text-ink">
              Bring comfort back to your space.
            </h2>
            <Link
              href="/schedule"
              className="mt-7 inline-flex items-center rounded-full bg-background px-7 py-3.5 text-[15px] font-medium text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] transition-colors hover:bg-brown hover:text-cream"
            >
              Schedule a Visit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
