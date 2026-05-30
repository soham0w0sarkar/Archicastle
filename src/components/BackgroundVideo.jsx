import { useEffect, useRef } from "react";

export default function BackgroundVideo({
  mp4,
  webm,
  poster,
  overlayClass = "bg-black/45",
  videoClass = "grayscale",
  className = "z-0",
  playbackRate = 1,
}) {
  const videoRef = useRef(null);
  const videoClasses = [
    "absolute left-1/2 top-1/2 h-auto w-auto min-h-full min-w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover",
    videoClass,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applyRate = () => {
      video.playbackRate = playbackRate;
    };

    applyRate();
    video.addEventListener("loadedmetadata", applyRate);
    return () => video.removeEventListener("loadedmetadata", applyRate);
  }, [playbackRate, mp4, webm]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        className={videoClasses}
      >
        {webm && <source src={webm} type="video/webm" />}
        <source src={mp4} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 ${overlayClass}`} aria-hidden />
    </div>
  );
}
