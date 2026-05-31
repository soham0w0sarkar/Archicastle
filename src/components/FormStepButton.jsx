function BlueprintArrowBox({ arrow, className = "" }) {
  return (
    <span
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center border border-white/25 text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white group-disabled:border-white/15 group-disabled:text-white/30 sm:h-10 sm:w-10 ${className}`}
    >
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
        className={`relative text-base leading-none transition-transform duration-200 ${arrow === "←" ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"}`}
      >
        {arrow}
      </span>
    </span>
  );
}

export default function FormStepButton({
  direction = "next",
  eyebrow,
  label,
  onClick,
  disabled = false,
  className = "",
}) {
  const isBack = direction === "back";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center gap-3 disabled:cursor-not-allowed disabled:opacity-45 ${className}`}
    >
      {isBack && <BlueprintArrowBox arrow="←" />}

      <span className="flex flex-col items-start gap-1">
        <span className="text-[9px] tracking-[0.35em] text-white/40 uppercase">
          {eyebrow}
        </span>
        <span className="text-[10px] tracking-[0.22em] text-white uppercase sm:text-xs">
          {label}
        </span>
        <span
          className={`h-px w-6 bg-white/20 transition-all duration-300 group-hover:w-12 group-hover:bg-accent group-disabled:group-hover:w-6 group-disabled:group-hover:bg-white/20`}
        />
      </span>

      {!isBack && <BlueprintArrowBox arrow="→" />}
    </button>
  );
}
