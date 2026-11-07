// Usage: node scripts/verify-export.mjs <exportDir> <expectedBasePath|root> [siteUrl]
// With siteUrl, also asserts the canonical, og:url and favicon for that origin. Without it, asserts none is emitted.
// Scans a static export for public email addresses and checks root-relative asset URLs.
// Prints sanitized pass/fail lines only. Matches are never echoed.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const [dir, base, siteUrl] = process.argv.slice(2);
if (!dir || !base) {
  console.error("usage: verify-export.mjs <exportDir> <basePath|root>");
  process.exit(2);
}
const basePath = base === "root" ? "" : base;

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/;
const MAILTO = /mailto:/i;
const TEXT = /\.(html|js|css|json|txt|xml|map|svg|webmanifest)$/;

function walk(d) {
  return readdirSync(d).flatMap((name) => {
    const p = join(d, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(dir);
let emailHits = 0;
let badUrls = 0;
let htmlFiles = 0;
let hasCname = false;
let indexHtml = "";

for (const file of files) {
  if (file.endsWith("CNAME")) hasCname = true;
  if (!TEXT.test(file)) continue;
  const text = readFileSync(file, "utf8");
  if (EMAIL.test(text) || MAILTO.test(text)) emailHits++;
  if (file.endsWith(".html")) {
    htmlFiles++;
    if (file === join(dir, "index.html")) indexHtml = text;
    for (const m of text.matchAll(/\b(?:href|src)="(\/[^"/][^"]*|\/)"/g)) {
      const url = m[1];
      const ok = basePath === "" ? true : url === basePath || url.startsWith(`${basePath}/`);
      if (!ok && !url.startsWith("//")) badUrls++;
    }
    if (basePath === "") {
      for (const m of text.matchAll(/\b(?:href|src)="(\/self-intro[^"]*)"/g)) if (m[1]) badUrls++;
    }
  }
}

const expectedUrl = siteUrl ? `${siteUrl.replace(/\/+$/, "")}${basePath}/` : undefined;
const canonical = indexHtml.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/)?.[1];
const ogUrl = indexHtml.match(/<meta[^>]*property="og:url"[^>]*content="([^"]*)"/)?.[1];
const icon = indexHtml.match(/<link[^>]*rel="icon"[^>]*href="([^"?]*)/)?.[1] ?? "";

const checks = [
  ["index.html found", indexHtml !== ""],
  [`canonical ${expectedUrl ?? "absent"}`, canonical === expectedUrl],
  [`og:url ${expectedUrl ?? "absent"}`, ogUrl === expectedUrl],
  [`favicon under base path "${basePath || "/"}"`, icon.startsWith(`${basePath}/`)],
  ["export has html", htmlFiles > 0],
  ["no email or mailto in export", emailHits === 0],
  [`root-relative URLs match base path "${basePath || "/"}"`, badUrls === 0],
  ["no CNAME in export", !hasCname],
];
let failed = false;
for (const [name, ok] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`);
  if (!ok) failed = true;
}
process.exit(failed ? 1 : 0);
