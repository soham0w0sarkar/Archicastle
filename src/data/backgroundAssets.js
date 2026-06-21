import publicUrl from "../utils/publicUrl";

export const PAGE_BACKGROUNDS = {
  home: publicUrl("/images/hero.avif"),
  about: publicUrl("/videos/about/poster.webp"),
  contact: publicUrl("/images/contact.webp"),
  services: publicUrl("/videos/services/poster.webp"),
  training: publicUrl("/images/training/background.png"),
};

export const ABOUT_VIDEO = {
  mp4: publicUrl("/videos/about/hero.mp4"),
  webm: publicUrl("/videos/about/hero.webm"),
  poster: PAGE_BACKGROUNDS.about,
};

export const ROUTE_BACKGROUNDS = {
  "/": PAGE_BACKGROUNDS.home,
  "/about": PAGE_BACKGROUNDS.about,
  "/contact": PAGE_BACKGROUNDS.contact,
  "/services": PAGE_BACKGROUNDS.services,
  "/training": PAGE_BACKGROUNDS.training,
};

const prefetched = new Set();

export function prefetchBackground(url) {
  if (!url || prefetched.has(url)) return;
  prefetched.add(url);

  const img = new Image();
  img.decoding = "async";
  img.src = url;
}

export function prefetchBackgroundForRoute(path) {
  if (path.startsWith("/services")) {
    prefetchBackground(PAGE_BACKGROUNDS.services);
    return;
  }

  prefetchBackground(ROUTE_BACKGROUNDS[path]);
}

export function prefetchAllBackgrounds() {
  Object.values(PAGE_BACKGROUNDS).forEach(prefetchBackground);
}
