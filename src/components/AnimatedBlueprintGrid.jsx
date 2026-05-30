import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const CELL = 14;
const MAX_DOTS = 2000;
const HOVER_RADIUS = 5;

const ACCENT = { r: 232, g: 93, b: 93 };
const BASE = { r: 255, g: 255, b: 255 };

function buildDots(width, height) {
  const cols = Math.ceil(width / CELL);
  const rows = Math.ceil(height / CELL);
  const total = cols * rows;
  const step = total > MAX_DOTS ? Math.ceil(Math.sqrt(total / MAX_DOTS)) : 1;
  const dots = [];

  for (let row = 0; row < rows; row += step) {
    for (let col = 0; col < cols; col += step) {
      dots.push({
        id: `${col}-${row}`,
        col,
        row,
        left: col * CELL + CELL / 2,
        top: row * CELL + CELL / 2,
      });
    }
  }

  return dots;
}

function hoverIntensity(col, row, hover) {
  if (!hover) return 0;

  const dist = Math.hypot(col - hover.col, row - hover.row);
  if (dist > HOVER_RADIUS) return 0;

  const t = 1 - dist / HOVER_RADIUS;
  return t * t;
}

function dotStyle(intensity) {
  if (intensity <= 0) {
    return {
      backgroundColor: "rgba(255,255,255,0.14)",
      boxShadow: "none",
      transform: "translate(-50%, -50%) scale(1)",
    };
  }

  const r = Math.round(BASE.r + (ACCENT.r - BASE.r) * intensity);
  const g = Math.round(BASE.g + (ACCENT.g - BASE.g) * intensity);
  const b = Math.round(BASE.b + (ACCENT.b - BASE.b) * intensity);
  const opacity = 0.14 + intensity * 0.78;
  const glow = intensity * 14;

  return {
    backgroundColor: `rgba(${r},${g},${b},${opacity})`,
    boxShadow: `0 0 ${glow}px rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${intensity * 0.55})`,
    transform: `translate(-50%, -50%) scale(${1 + intensity * 0.85})`,
  };
}

export default function AnimatedBlueprintGrid() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [hover, setHover] = useState(null);
  const frameRef = useRef(null);
  const pendingRef = useRef(null);

  useEffect(() => {
    const update = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const dots = useMemo(
    () => (size.width ? buildDots(size.width, size.height) : []),
    [size.width, size.height],
  );

  const flushHover = useCallback(() => {
    frameRef.current = null;
    if (pendingRef.current) {
      setHover(pendingRef.current);
    }
  }, []);

  const updateHover = useCallback(
    (clientX, clientY) => {
      pendingRef.current = {
        col: Math.floor(clientX / CELL),
        row: Math.floor(clientY / CELL),
      };

      if (frameRef.current == null) {
        frameRef.current = requestAnimationFrame(flushHover);
      }
    },
    [flushHover],
  );

  useEffect(() => {
    const onMove = (e) => updateHover(e.clientX, e.clientY);
    const onLeave = () => {
      pendingRef.current = null;
      setHover(null);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (frameRef.current != null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [updateHover]);

  if (!dots.length) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map(({ id, col, row, left, top }) => {
        const intensity = hoverIntensity(col, row, hover);
        return (
          <span
            key={id}
            className="absolute block size-[3px] rounded-full transition-[background-color,box-shadow,transform] duration-150 ease-out"
            style={{ left, top, ...dotStyle(intensity) }}
          />
        );
      })}
    </div>
  );
}
