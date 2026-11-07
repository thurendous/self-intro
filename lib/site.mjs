export const DEFAULT_BASE_PATH = "/self-intro";

const SEGMENT = /^\/[A-Za-z0-9._~-]+(\/[A-Za-z0-9._~-]+)*$/;

/**
 * SITE_BASE_PATH unset or empty keeps the default. "/" or "root" selects root hosting.
 * Anything else must be a plain path such as "/self-intro".
 */
export function normalizeBasePath(raw) {
  if (raw === undefined || raw === null || raw.trim() === "") return DEFAULT_BASE_PATH;
  const value = raw.trim();
  if (value === "/" || value === "root") return "";
  const trimmed = value.replace(/\/+$/, "");
  const dotSegment = trimmed.split("/").some((segment) => segment === "." || segment === "..");
  if (!SEGMENT.test(trimmed) || dotSegment) {
    throw new Error(`Invalid SITE_BASE_PATH: expected "/", "root" or a path like "/self-intro".`);
  }
  return trimmed;
}

/**
 * SITE_URL is opt-in. Unset means no canonical or Open Graph URL is emitted.
 * It must be an https origin without a path, so the base path is only ever set in one place.
 */
export function normalizeSiteUrl(raw) {
  if (raw === undefined || raw === null || raw.trim() === "") return undefined;
  const value = raw.trim();
  if (/[?#\\\s]/.test(value)) {
    throw new Error("Invalid SITE_URL: expected an https origin with no path, credentials, query or hash.");
  }
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("Invalid SITE_URL: expected an absolute https origin.");
  }
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/") {
    throw new Error("Invalid SITE_URL: expected an https origin with no path, credentials, query or hash.");
  }
  return url.origin;
}

export function resolveSiteConfig(env = {}) {
  const basePath = normalizeBasePath(env.SITE_BASE_PATH);
  const siteUrl = normalizeSiteUrl(env.SITE_URL);
  const canonicalUrl = siteUrl ? `${siteUrl}${basePath}/` : undefined;
  return { basePath, siteUrl, canonicalUrl };
}
