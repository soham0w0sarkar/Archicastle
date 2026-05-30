import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { prefetchBackgroundForRoute } from "../data/backgroundAssets";
import Logo from "./Logo";

const linkClass = ({ isActive }) =>
  [
    "block px-3 py-2 text-md font-light tracking-wide text-white transition-colors sm:py-1",
    isActive
      ? "border border-accent"
      : "border border-transparent hover:border-accent hover:bg-accent hover:text-white",
  ].join(" ");

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About us" },
  { to: "/contact", label: "Contact" },
];

export default function Header({ variant = "overlay" }) {
  const location = useLocation();
  const [menuOpenPath, setMenuOpenPath] = useState(null);
  const menuOpen = menuOpenPath === location.pathname;

  const closeMenu = () => setMenuOpenPath(null);
  const toggleMenu = () => {
    setMenuOpenPath((path) =>
      path === location.pathname ? null : location.pathname,
    );
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const barClass =
    variant === "bar" || variant === "solid"
      ? "relative z-30 shrink-0 bg-black"
      : "absolute inset-x-0 top-0 z-30 bg-transparent";

  return (
    <header className={barClass}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 md:px-10">
        <NavLink
          to="/"
          className="relative z-50 flex h-10 shrink-0 items-center overflow-visible no-underline"
          onClick={closeMenu}
        >
          <Logo />
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex md:gap-2 lg:gap-4">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={linkClass}
              onMouseEnter={() => prefetchBackgroundForRoute(to)}
              onFocus={() => prefetchBackgroundForRoute(to)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        >
          <span
            className={`h-px w-6 bg-white transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-6 bg-white transition-transform ${menuOpen ? "translate-y-[-7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}

      <nav
        className={`fixed inset-x-0 top-0 z-40 flex flex-col gap-1 bg-black px-4 pb-6 pt-20 transition-transform duration-300 md:hidden ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        {navLinks.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={linkClass}
            onClick={closeMenu}
            onMouseEnter={() => prefetchBackgroundForRoute(to)}
            onFocus={() => prefetchBackgroundForRoute(to)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
