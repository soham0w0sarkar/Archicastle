import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InlineWidget, PopupButton, PopupModal } from "react-calendly";
import { getCalendlyRootElement, getCalendlyUrl } from "../utils/calendly";

/** Embedded calendar — use on dedicated booking pages or wide sections. */
export function BookCallInline({ className = "", height = 630 }) {
  const url = getCalendlyUrl();
  if (!url) return null;

  return (
    <div className={className} style={{ minHeight: height }}>
      <InlineWidget url={url} styles={{ height: "100%", minWidth: "320px" }} />
    </div>
  );
}

/** Simple popup trigger — matches react-calendly docs. */
export function BookCallPopupButton({
  text = "Book a call",
  className = "",
  styles,
}) {
  const url = getCalendlyUrl();
  const [rootElement, setRootElement] = useState(null);

  useEffect(() => {
    setRootElement(getCalendlyRootElement());
  }, []);

  if (!url || !rootElement) return null;

  return (
    <PopupButton
      url={url}
      rootElement={rootElement}
      text={text}
      className={className}
      styles={styles}
    />
  );
}

/** Opens Calendly in a new tab — no script required. */
export function BookCallExternalLink({
  children = "Book a call",
  className = "",
}) {
  const url = getCalendlyUrl();
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

function CtaContent({ eyebrow, label, arrow }) {
  return (
    <>
      <span className="flex flex-col items-start gap-1">
        <span className="text-[9px] tracking-[0.35em] text-white/40 uppercase">
          {eyebrow}
        </span>
        <span className="text-[10px] tracking-[0.22em] text-white uppercase sm:text-xs">
          {label}
        </span>
        <span className="h-px w-6 bg-white/20 transition-all duration-300 group-hover:w-12 group-hover:bg-accent" />
      </span>
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
          className="relative text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5"
        >
          {arrow}
        </span>
      </span>
    </>
  );
}

const linkClass =
  "group relative inline-flex items-center gap-3 border-0 bg-transparent p-0 text-left no-underline";

/**
 * Styled popup trigger — same UX as PopupButton, keeps the site CTA design.
 * Falls back to the contact page when VITE_CALENDLY_URL is not set.
 */
export function BookCallCtaLink({
  eyebrow = "Get in touch",
  label = "Book a call",
  arrow = "→",
  fallbackTo = "/contact",
  fallbackState,
  className = "",
}) {
  const calendlyUrl = getCalendlyUrl();
  const [isOpen, setIsOpen] = useState(false);
  const [rootElement, setRootElement] = useState(null);

  useEffect(() => {
    setRootElement(getCalendlyRootElement());
  }, []);

  if (calendlyUrl) {
    return (
      <>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`${label} — opens scheduling calendar`}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className={`${linkClass} cursor-pointer ${className}`}
        >
          <CtaContent eyebrow={eyebrow} label={label} arrow={arrow} />
        </button>

        {rootElement && (
          <PopupModal
            url={calendlyUrl}
            open={isOpen}
            rootElement={rootElement}
            onModalClose={() => setIsOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <Link
      to={fallbackTo}
      state={fallbackState}
      className={`${linkClass} ${className}`}
    >
      <CtaContent eyebrow={eyebrow} label={label} arrow={arrow} />
    </Link>
  );
}

export default BookCallCtaLink;
