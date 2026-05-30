import { useEffect, useRef, useState } from "react";

export default function BackgroundVideo({
  mp4,
  webm,
  poster,
  overlayClass = "bg-black/45",
  videoClass = "grayscale",
  className = "z-0",
  playbackRate = 1,
  priority = false,
}) {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  const videoClasses = [
    "absolute left-1/2 top-1/2 h-auto w-auto min-h-full min-w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-500",
    videoClass,
    videoReady ? "opacity-100" : "opacity-0",
  ]
    .filter(Boolean)
    .join(" ");

  const posterClasses = [
    "absolute left-1/2 top-1/2 h-auto w-auto min-h-full min-w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-500",
    videoClass,
    videoReady ? "opacity-0" : "opacity-100",
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    setVideoReady(false);
  }, [mp4, webm]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applyRate = () => {
      video.playbackRate = playbackRate;
    };

    const handleReady = () => {
      setVideoReady(true);
    };

    applyRate();
    video.addEventListener("loadedmetadata", applyRate);
    video.addEventListener("canplay", handleReady);
    video.addEventListener("playing", handleReady);

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      handleReady();
    }

    return () => {
      video.removeEventListener("loadedmetadata", applyRate);
      video.removeEventListener("canplay", handleReady);
      video.removeEventListener("playing", handleReady);
    };
  }, [playbackRate, mp4, webm]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden
          className={posterClasses}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
        />
      )}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
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
