import { useEffect, useRef, useState } from "react";

function deferNonBlocking(callback) {
  let idleId;
  let timeoutId;

  const raf = requestAnimationFrame(() => {
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(callback, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(callback, 400);
    }
  });

  return () => {
    cancelAnimationFrame(raf);
    if (idleId !== undefined) {
      window.cancelIdleCallback(idleId);
    }
    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId);
    }
  };
}

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
  const [loadVideo, setLoadVideo] = useState(false);

  const videoClasses = [
    "pointer-events-none absolute left-1/2 top-1/2 h-auto w-auto min-h-full min-w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-700",
    videoClass,
    videoReady ? "opacity-100" : "opacity-0",
  ]
    .filter(Boolean)
    .join(" ");

  const posterClasses = [
    "pointer-events-none absolute left-1/2 top-1/2 h-auto w-auto min-h-full min-w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-700",
    videoClass,
    videoReady ? "opacity-0" : "opacity-100",
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    setVideoReady(false);
    setLoadVideo(false);

    return deferNonBlocking(() => setLoadVideo(true));
  }, [mp4, webm]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loadVideo) return;

    let cancelled = false;

    const applyRate = () => {
      video.playbackRate = playbackRate;
    };

    const handleReady = () => {
      if (!cancelled) {
        setVideoReady(true);
      }
    };

    applyRate();
    video.addEventListener("loadedmetadata", applyRate);
    video.addEventListener("canplay", handleReady);
    video.addEventListener("playing", handleReady);

    video.load();
    video.play().catch(() => {});

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      handleReady();
    }

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", applyRate);
      video.removeEventListener("canplay", handleReady);
      video.removeEventListener("playing", handleReady);
      video.pause();
    };
  }, [loadVideo, playbackRate, mp4, webm]);

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
          decoding="async"
        />
      )}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className={videoClasses}
      >
        {loadVideo && webm && <source src={webm} type="video/webm" />}
        {loadVideo && <source src={mp4} type="video/mp4" />}
      </video>
      <div className={`absolute inset-0 ${overlayClass}`} aria-hidden />
    </div>
  );
}
