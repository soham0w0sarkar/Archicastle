import logo from "../assets/archicastle_logo.png";

export default function Logo({ className = "" }) {
  return (
    <img
      src={logo}
      alt="ArchiCastle"
      className={`h-9 w-auto origin-left translate-y-[7px] scale-[3.25] sm:scale-[3.75] md:scale-[4.25] ${className}`}
    />
  );
}
