import { useCallback, useEffect, useRef, useState } from "react";

const CELL = 64;
const PADDING = 48;

function isInsidePaddedRect(x, y, rect, padding) {
  return (
    x >= rect.left - padding &&
    x <= rect.right + padding &&
    y >= rect.top - padding &&
    y <= rect.bottom + padding
  );
}

function isOverInteractive(target) {
  return Boolean(
    target.closest("a, button, nav, header, input, textarea, label"),
  );
}

function getExcludeRects(containerBounds, excludeRefs, padding) {
  return excludeRefs
    .map((ref) => ref.current?.getBoundingClientRect())
    .filter(Boolean)
    .map((rect) => ({
      left: rect.left - containerBounds.left - padding,
      right: rect.right - containerBounds.left + padding,
      top: rect.top - containerBounds.top - padding,
      bottom: rect.bottom - containerBounds.top + padding,
    }));
}

function clipVerticalLine(x, height, rects) {
  let segments = [[0, height]];

  for (const rect of rects) {
    if (x < rect.left || x > rect.right) continue;

    segments = segments.flatMap(([start, end]) => {
      const next = [];
      if (start < rect.top) next.push([start, Math.min(end, rect.top)]);
      if (end > rect.bottom) next.push([Math.max(start, rect.bottom), end]);
      return next.filter(([a, b]) => b - a > 0);
    });
  }

  return segments;
}

function clipHorizontalLine(y, width, rects) {
  let segments = [[0, width]];

  for (const rect of rects) {
    if (y < rect.top || y > rect.bottom) continue;

    segments = segments.flatMap(([start, end]) => {
      const next = [];
      if (start < rect.left) next.push([start, Math.min(end, rect.left)]);
      if (end > rect.right) next.push([Math.max(start, rect.right), end]);
      return next.filter(([a, b]) => b - a > 0);
    });
  }

  return segments;
}

export default function InteractiveGrid({ excludeRefs = [] }) {
  const containerRef = useRef(null);
  const excludeRefsRef = useRef(excludeRefs);
  const [crosshair, setCrosshair] = useState(null);

  excludeRefsRef.current = excludeRefs;

  const updateCrosshair = useCallback((clientX, clientY, target) => {
    const container = containerRef.current;
    if (!container) return;

    const bounds = container.getBoundingClientRect();
    const insideContainer =
      clientX >= bounds.left &&
      clientX <= bounds.right &&
      clientY >= bounds.top &&
      clientY <= bounds.bottom;

    if (!insideContainer || isOverInteractive(target)) {
      setCrosshair(null);
      return;
    }

    for (const ref of excludeRefsRef.current) {
      const el = ref.current;
      if (
        el &&
        isInsidePaddedRect(
          clientX,
          clientY,
          el.getBoundingClientRect(),
          PADDING,
        )
      ) {
        setCrosshair(null);
        return;
      }
    }

    const x = Math.round((clientX - bounds.left) / CELL) * CELL;
    const y = Math.round((clientY - bounds.top) / CELL) * CELL;
    const excludeRects = getExcludeRects(
      bounds,
      excludeRefsRef.current,
      PADDING,
    );

    setCrosshair({
      x,
      y,
      vertical: clipVerticalLine(x, bounds.height, excludeRects),
      horizontal: clipHorizontalLine(y, bounds.width, excludeRects),
    });
  }, []);

  useEffect(() => {
    const onMove = (e) => updateCrosshair(e.clientX, e.clientY, e.target);
    const onLeave = () => setCrosshair(null);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [updateCrosshair]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: `${CELL}px ${CELL}px`,
        }}
      />

      {crosshair && (
        <>
          {crosshair.vertical.map(([top, bottom], index) => (
            <div
              key={`v-${index}`}
              className="absolute w-px bg-accent/55 transition-[left,top,height] duration-75 ease-out"
              style={{
                left: crosshair.x,
                top,
                height: bottom - top,
              }}
            />
          ))}

          {crosshair.horizontal.map(([left, right], index) => (
            <div
              key={`h-${index}`}
              className="absolute h-px bg-accent/55 transition-[left,top,width] duration-75 ease-out"
              style={{
                top: crosshair.y,
                left,
                width: right - left,
              }}
            />
          ))}

          <div
            className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent bg-accent/80 shadow-[0_0_12px_rgba(232,93,93,0.6)] transition-[left,top] duration-75 ease-out"
            style={{
              left: crosshair.x,
              top: crosshair.y,
            }}
          />
        </>
      )}
    </div>
  );
}
