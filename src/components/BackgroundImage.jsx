/**
 * Drop images into public/images/ — see public/images/README.md
 */
export default function BackgroundImage({
  src,
  alt = "",
  overlayClass = "bg-black/45",
  imageClass = "grayscale",
  className = "z-0",
  rotate = 0,
}) {
  const imgClass = rotate
    ? `absolute left-1/2 top-1/2 min-h-[100vw] min-w-[100vh] -translate-x-1/2 -translate-y-1/2 object-cover ${imageClass} ${rotate === 90 ? "rotate-90" : rotate === -90 ? "-rotate-90" : rotate === 180 ? "rotate-180" : ""}`
    : `h-full w-full object-cover ${imageClass}`;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <img src={src} alt={alt} className={imgClass} />
      <div className={`absolute inset-0 ${overlayClass}`} aria-hidden />
    </div>
  );
}
