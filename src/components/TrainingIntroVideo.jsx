import { useState } from "react";
import { getTrainingIntroVideoEmbedUrl } from "../utils/trainingVideo";

const posterImageClass =
  "absolute inset-0 h-full w-full object-cover object-[center_22%]";

function getDirectVideoUrl() {
  const url = import.meta.env.VITE_TRAINING_VIDEO_URL?.trim();
  return url || null;
}

function PlayOverlay({ onPlay, label = "Watch intro" }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="group absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center border-0 bg-transparent p-0"
      aria-label="Play training introduction video"
    >
      <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20 group-active:bg-black/15" />
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

function DriveStreamPlayer({ googleDriveFileId, poster }) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = playing
    ? getTrainingIntroVideoEmbedUrl(googleDriveFileId, true)
    : null;

  return (
    <div className="absolute inset-0 bg-black">
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden
          className={`${posterImageClass} transition-opacity duration-500 ${
            playing ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {!playing ? (
        <PlayOverlay onPlay={() => setPlaying(true)} />
      ) : (
        embedUrl && (
          <div className="absolute inset-0 z-10 overflow-hidden">
            <iframe
              src={embedUrl}
              title="Training introduction video"
              className="absolute -top-3 -right-3 h-[calc(100%+14px)] w-[calc(100%+14px)] max-w-none border-0"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-presentation"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )
      )}
    </div>
  );
}

function NativeVideoPlayer({ src, poster }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="absolute inset-0 bg-black">
      {poster && !playing && (
        <img
          src={poster}
          alt=""
          aria-hidden
          className={posterImageClass}
        />
      )}

      {!playing ? (
        <PlayOverlay onPlay={() => setPlaying(true)} />
      ) : (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          className="absolute inset-0 z-10 h-full w-full object-cover"
        >
          <track kind="captions" />
        </video>
      )}
    </div>
  );
}

/**
 * Click-to-play intro video. Streams from Google Drive on demand (no large file in repo).
 * Optional VITE_TRAINING_VIDEO_URL for a small self-hosted MP4.
 */
export default function TrainingIntroVideo({
  googleDriveFileId,
  poster,
  className = "absolute inset-0 h-full w-full",
}) {
  const directUrl = getDirectVideoUrl();

  return (
    <div className={`${className} overflow-hidden bg-black`}>
      {directUrl ? (
        <NativeVideoPlayer src={directUrl} poster={poster} />
      ) : (
        <DriveStreamPlayer googleDriveFileId={googleDriveFileId} poster={poster} />
      )}
    </div>
  );
}
