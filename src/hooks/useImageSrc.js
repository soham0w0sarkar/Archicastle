import { useEffect, useState } from "react";

export function useImageSrc(src, fallback) {
  const [resolved, setResolved] = useState(fallback);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setResolved(src);
    img.onerror = () => setResolved(fallback);
    img.src = src;
  }, [src, fallback]);

  return resolved;
}
