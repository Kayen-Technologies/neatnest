import Image from "next/image";
import Link from "next/link";
import { contact } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <div className="shell">
        <div className="grid gap-8 pt-10 lg:grid-cols-[280px_1fr] lg:gap-14">
          {/* Portrait — desktop only */}
          <div className="relative hidden aspect-[5/6] w-full max-w-[300px] overflow-hidden lg:-mt-16 lg:block">
            <Image
              src="/images/footer.jpg"
              alt="A Neat Nest cleaning professional"
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex min-w-0 flex-col gap-8 pt-4 font-display text-[17px] font-normal text-cream/90 lg:grid lg:grid-cols-3 lg:pt-6">
            <ul className="order-1 space-y-3 lg:order-3">
              {contact.footerNav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="order-2 min-w-0 space-y-3 lg:order-1">
              <li>{contact.location}</li>
              <li>{contact.phone}</li>
              <li className="min-w-0 break-all text-[15px] tracking-tight">
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-cream">
                  {contact.email}
                </a>
              </li>
            </ul>

            <ul className="order-3 space-y-3 lg:order-2">
              {contact.socials.map((s) => (
                <li key={s}>
                  <a href="#" className="text-cream/85 transition-colors hover:text-cream">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pointer-events-none select-none pt-10 lg:pt-6">
          <span className="block text-left font-display text-[clamp(3rem,17vw,15rem)] font-semibold leading-[0.85] tracking-[-0.02em] text-cream lg:text-center">
            Neat Nest
          </span>
        </div>

        <div className="flex flex-col items-start gap-2 border-t border-white/10 py-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <a href="#" className="order-2 transition-colors hover:text-cream/80 sm:order-1">
            Terms of Service
          </a>
          <span className="order-1 sm:order-2">© 2026 Neat Nest</span>
          <a href="#" className="order-3 transition-colors hover:text-cream/80">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
