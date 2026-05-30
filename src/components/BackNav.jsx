import { Link } from "react-router-dom";

export default function BackNav({
  to,
  eyebrow = "Return",
  label,
  className = "",
}) {
  return (
    <Link
      to={to}
      className={`group relative inline-flex items-center gap-3 no-underline ${className}`}
    >
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center border border-white/25 text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white sm:h-10 sm:w-10">
        <span
          className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/35 transition-colors group-hover:border-white"
          aria-hidden
        />
        <span
          className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-white/35 transition-colors group-hover:border-white"
          aria-hidden
        />
        <span
          aria-hidden
          className="relative text-base leading-none transition-transform duration-200 group-hover:-translate-x-0.5"
        >
          ←
        </span>
      </span>

      <span className="flex flex-col items-start gap-1">
        <span className="text-[9px] tracking-[0.35em] text-white/40 uppercase">
          {eyebrow}
        </span>
        <span className="text-[10px] tracking-[0.22em] text-white uppercase sm:text-xs">
          {label}
        </span>
        <span className="h-px w-6 bg-white/20 transition-all duration-300 group-hover:w-12 group-hover:bg-accent" />
      </span>
    </Link>
  );
}
