import Link from "next/link";

type LogoProps = {
  className?: string;
  tone?: "dark" | "light";
};

export function Logo({ className = "", tone = "dark" }: LogoProps) {
  const text = tone === "light" ? "text-cream" : "text-ink";
  const sub = tone === "light" ? "text-cream/70" : "text-muted";
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Neat Nest home">
      <BuildingMark className={tone === "light" ? "text-cream" : "text-brown"} />
      <span className="leading-none">
        <span className={`font-display block text-[22px] font-semibold tracking-tight ${text}`}>
          Neat<span className="ml-[1px]">Nest</span>
        </span>
        <span className={`mt-[3px] block text-[8px] font-medium uppercase tracking-[0.42em] ${sub}`}>
          Cleaning Services
        </span>
      </span>
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
