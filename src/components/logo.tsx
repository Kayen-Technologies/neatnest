import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  className?: string;
  tone?: "dark" | "light";
};

export function Logo({ className = "", tone = "dark" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Neat Nest home"
    >
      <Image
        src="/images/logo1.png"
        alt="Neat Nest Logo"
        width={500}
        height={180}
        priority
        className={`h-16 md:h-20 w-auto max-w-[340px] md:max-w-[480px] object-contain ${
          tone === "light" ? "brightness-0 invert" : ""
        }`}
      />
    </Link>
  );
}

function BuildingMark({ className = "" }: { className?: string }) {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* tall tower */}
      <rect x="13" y="4" width="9" height="26" stroke="currentColor" strokeWidth="1.3" />
      {/* left low block */}
      <rect x="5" y="14" width="8" height="16" stroke="currentColor" strokeWidth="1.3" />
      {/* right block */}
      <rect x="22" y="10" width="7" height="20" stroke="currentColor" strokeWidth="1.3" />
      {/* windows on tall tower */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.85">
        <line x1="15.5" y1="8" x2="15.5" y2="27" />
        <line x1="19.5" y1="8" x2="19.5" y2="27" />
        <line x1="13" y1="11" x2="22" y2="11" />
        <line x1="13" y1="18" x2="22" y2="18" />
        <line x1="13" y1="25" x2="22" y2="25" />
      </g>
      {/* ground line */}
      <line x1="3" y1="30.2" x2="31" y2="30.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
