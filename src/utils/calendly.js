export function getCalendlyUrl() {
  const url = import.meta.env.VITE_CALENDLY_URL?.trim();
  return url || null;
}

export function getCalendlyRootElement() {
  if (typeof document === "undefined") return null;
  return document.getElementById("root");
}
