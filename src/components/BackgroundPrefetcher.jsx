import { useEffect } from "react";
import { prefetchAllBackgrounds } from "../data/backgroundAssets";

export default function BackgroundPrefetcher() {
  useEffect(() => {
    const prefetch = () => prefetchAllBackgrounds();

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(prefetch, 1500);
    return () => window.clearTimeout(id);
  }, []);

  return null;
}
