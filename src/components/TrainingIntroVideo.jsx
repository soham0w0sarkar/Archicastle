import { useEffect, useState } from "react";
import BackgroundVideo from "./BackgroundVideo";

const GOOGLE_DRIVE_EMBED = "https://drive.google.com/file/d";

function getDirectVideoUrl() {
  const url = import.meta.env.VITE_TRAINING_VIDEO_URL?.trim();
  return url || null;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useTouchDevice() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const update = () => setTouch(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return touch;
}

export function getTrainingIntroVideoEmbedUrl(googleDriveFileId, autoplay = false) {
  if (!googleDriveFileId) return null;
  const base = `${GOOGLE_DRIVE_EMBED}/${googleDriveFileId}/preview`;
  return autoplay ? `${base}?autoplay=1` : base;
}

function PlayOverlay({ onPlay, label = "Watch intro" }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="group absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center border-0 bg-transparent p-0"
      aria-label="Play training introduction video"
    >
      <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/25 group-active:bg-black/20" />
      <span className="relative flex h-14 w-14 items-center justify-center border border-white/40 bg-black/50 text-white backdrop-blur-sm transition-all group-hover:scale-105 group-hover:border-accent group-hover:text-accent group-active:scale-95 sm:h-16 sm:w-16">
        <span className="ml-1 text-2xl leading-none sm:text-3xl" aria-hidden>
          ▶
        </span>
      </span>
      <span className="relative mt-4 text-[10px] tracking-[0.28em] text-white/80 uppercase">
        {label}
      </span>
    </button>
  );
}

function DriveStreamPlayer({ googleDriveFileId, poster, autoPlay = true }) {
  const touchDevice = useTouchDevice();
  const reducedMotion = usePrefersReducedMotion();
  const shouldAutoPlay = autoPlay && !reducedMotion;
  const [showPlayer, setShowPlayer] = useState(shouldAutoPlay);
  const [needsTap, setNeedsTap] = useState(shouldAutoPlay && touchDevice);
  const [iframeKey, setIframeKey] = useState(0);
  const embedUrl = getTrainingIntroVideoEmbedUrl(googleDriveFileId, true);

  useEffect(() => {
    if (shouldAutoPlay) {
      setShowPlayer(true);
      setNeedsTap(touchDevice);
    }
  }, [shouldAutoPlay, touchDevice]);

  const handlePlay = () => {
    setShowPlayer(true);
    setNeedsTap(false);
    setIframeKey((key) => key + 1);
  };

  if (!embedUrl) return null;

  return (
    <div className="absolute inset-0 bg-black">
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            showPlayer && !needsTap ? "opacity-20" : "opacity-100"
          }`}
        />
      )}

      {!showPlayer ? (
        <PlayOverlay onPlay={handlePlay} />
      ) : (
        <>
          <iframe
            key={iframeKey}
            src={embedUrl}
            title="Training introduction video"
            className="absolute inset-0 z-10 h-full w-full border-0"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
          {needsTap && (
            <PlayOverlay onPlay={handlePlay} label="Tap to play" />
          )}
        </>
      )}
    </div>
  );
}

/**
 * Streams large intro videos from Google Drive on demand (no full download to your site).
 * Optional VITE_TRAINING_VIDEO_URL for a small self-hosted MP4 only.
 */
export default function TrainingIntroVideo({
  googleDriveFileId,
  poster,
  autoPlay = true,
  className = "absolute inset-0 h-full w-full",
}) {
  const directUrl = getDirectVideoUrl();

  return (
    <div className={`${className} overflow-hidden bg-black`}>
      {directUrl ? (
        <BackgroundVideo
          mp4={directUrl}
          poster={poster}
          overlayClass="bg-black/15"
          videoClass=""
          className="absolute inset-0"
          priority
        />
      ) : (
        <DriveStreamPlayer
          googleDriveFileId={googleDriveFileId}
          poster={poster}
          autoPlay={autoPlay}
        />
      )}
    </div>
  );
}
