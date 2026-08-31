import Image from "next/image";

type PageHeroProps = {
  title: React.ReactNode;
  description: string;
  image: string;
  imageAlt: string;
};

export function PageHero({ title, description, image, imageAlt }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="shell pb-8 pt-10 md:pb-12 md:pt-20">
        <div className="grid items-end gap-6 md:grid-cols-[1.45fr_1fr] md:gap-12">
          <h1 className="font-display text-[clamp(2.6rem,6.4vw,5rem)] font-medium leading-[0.98] tracking-[-0.02em] text-ink">
            {title}
          </h1>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#5E5E5E] md:ml-auto md:pb-2">
            {description}
          </p>
        </div>
      </div>
      <div className="relative h-[46vw] max-h-[620px] min-h-[280px] w-full">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
