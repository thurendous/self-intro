import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DEFAULT_BASE_PATH, normalizeBasePath, normalizeSiteUrl, resolveSiteConfig } from "@/lib/site.mjs";

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

describe("base path", () => {
  it("defaults to /self-intro", () => {
    expect(DEFAULT_BASE_PATH).toBe("/self-intro");
    expect(normalizeBasePath(undefined)).toBe("/self-intro");
    expect(normalizeBasePath("")).toBe("/self-intro");
  });

  it("switches to root only when asked explicitly", () => {
    expect(normalizeBasePath("/")).toBe("");
    expect(normalizeBasePath("root")).toBe("");
  });

  it("normalizes trailing slashes and whitespace", () => {
    expect(normalizeBasePath("/self-intro/")).toBe("/self-intro");
    expect(normalizeBasePath("  /self-intro  ")).toBe("/self-intro");
    expect(normalizeBasePath("   ")).toBe("/self-intro");
    expect(normalizeBasePath("/a/b")).toBe("/a/b");
  });

  it("rejects malformed, traversal and look-alike values", () => {
    const bad = [
      "self-intro",
      "ROOT",
      "Root",
      "/a/../b",
      "/..",
      "/.",
      "/a/./b",
      "//evil",
      "/a//b",
      "//",
      "///",
      "/a b",
      "/a?x=1",
      "/a#x",
      "/a\\b",
      "/%2e%2e",
      "https://x.test",
    ];
    for (const value of bad) expect(() => normalizeBasePath(value), value).toThrow();
  });

  it("errors never echo a bad value back", () => {
    expect(() => normalizeBasePath("/bad value")).toThrow(/SITE_BASE_PATH/);
    try {
      normalizeBasePath("/bad value");
    } catch (error) {
      expect(String(error)).not.toContain("bad value");
    }
  });
});

describe("canonical metadata", () => {
  it("is absent in the local default so development never claims markwu.xyz", () => {
    const cfg = resolveSiteConfig({});
    expect(cfg.siteUrl).toBeUndefined();
    expect(cfg.canonicalUrl).toBeUndefined();
  });

  it("combines SITE_URL and base path when opted in", () => {
    expect(resolveSiteConfig({ SITE_URL: "https://example.test" }).canonicalUrl).toBe(
      "https://example.test/self-intro/"
    );
    expect(resolveSiteConfig({ SITE_URL: "https://example.test", SITE_BASE_PATH: "/" }).canonicalUrl).toBe(
      "https://example.test/"
    );
  });

  it("accepts a clean origin and normalizes case, trailing slash, whitespace and port", () => {
    expect(normalizeSiteUrl("https://Example.TEST/")).toBe("https://example.test");
    expect(normalizeSiteUrl("  https://example.test  ")).toBe("https://example.test");
    expect(normalizeSiteUrl("https://example.test:8443")).toBe("https://example.test:8443");
    expect(normalizeSiteUrl("")).toBeUndefined();
    expect(normalizeSiteUrl("   ")).toBeUndefined();
    expect(normalizeSiteUrl(undefined)).toBeUndefined();
  });

  it("rejects non-https origins and URLs carrying paths, credentials, query or hash", () => {
    const bad = [
      "http://example.test",
      "ftp://example.test",
      "//example.test",
      "example.test",
      "https://example.test/self-intro",
      "https://example.test//",
      "https://u:p@example.test",
      "https://example.test?x=1",
      "https://example.test/?",
      "https://example.test#frag",
      "https://example.test#",
      "https://exa mple.test",
      "https://example.test\\evil",
      "nope",
    ];
    for (const value of bad) expect(() => normalizeSiteUrl(value), value).toThrow();
  });

  it("errors do not echo the input, which could carry credentials", () => {
    try {
      normalizeSiteUrl("https://user:secret@example.test");
    } catch (error) {
      expect(String(error)).not.toContain("secret");
    }
    expect.assertions(1);
  });

  it("resolveSiteConfig surfaces invalid input from either variable", () => {
    expect(() => resolveSiteConfig({ SITE_BASE_PATH: "nope" })).toThrow();
    expect(() => resolveSiteConfig({ SITE_URL: "http://example.test" })).toThrow();
  });
});

describe("production domain", () => {
  const wf = readFileSync(".github/workflows/deploy.yml", "utf8");
  const buildStep = wf.match(/- name: Build\n[\s\S]*?(?=\n\s*- name:)/)?.[0] ?? "";

  it("the workflow build step sets the root base path and the markwu.xyz origin", () => {
    expect(buildStep).toMatch(/run: npm run build\n/);
    expect(buildStep).toMatch(/SITE_BASE_PATH: \/\n/);
    expect(buildStep).toMatch(/SITE_URL: https:\/\/markwu\.xyz\s*$/);
  });

  it("resolves the workflow env to a root canonical at https://markwu.xyz/", () => {
    const cfg = resolveSiteConfig({ SITE_BASE_PATH: "/", SITE_URL: "https://markwu.xyz" });
    expect(cfg).toEqual({ basePath: "", siteUrl: "https://markwu.xyz", canonicalUrl: "https://markwu.xyz/" });
  });

  it("keeps the local default on /self-intro with no canonical", () => {
    expect(resolveSiteConfig({})).toEqual({
      basePath: "/self-intro",
      siteUrl: undefined,
      canonicalUrl: undefined,
    });
  });

  it("pins Node 24 (Node 20 is end of life) and never uses www", () => {
    expect(wf).toMatch(/node-version: "24"/);
    expect(wf).not.toMatch(/node-version: "20"/);
    expect(wf).not.toMatch(/www\./);
  });

  it("preserves triggers, permissions and concurrency", () => {
    expect(wf).toMatch(/on:\n {2}push:\n {4}branches:\n {6}- main[^\n]*\n {2}workflow_dispatch:\n/);
    expect(wf).toMatch(/permissions:\n {2}contents: read\n {2}pages: write\n {2}id-token: write\n/);
    expect(wf).toMatch(/concurrency:\n {2}group: "pages"\n {2}cancel-in-progress: false\n/);
  });
});

describe("deployment safety", () => {
  it("needs no CNAME file because Actions deployments ignore it, and has no PR trigger", () => {
    expect(existsSync("CNAME")).toBe(false);
    expect(existsSync("public/CNAME")).toBe(false);
    const wf = readFileSync(".github/workflows/deploy.yml", "utf8");
    expect(wf).not.toMatch(/pull_request/);
  });

  it("keeps /self-intro only as the default constant and references no missing favicon", () => {
    const files = ["app", "lib", "next.config.mjs"].flatMap((entry) =>
      statSync(entry).isDirectory() ? walk(entry) : [entry]
    );
    const mentions = files.filter((f) => /\.(ts|tsx|mjs|css)$/.test(f) && /self-intro/.test(readFileSync(f, "utf8")));
    expect(mentions).toEqual(["lib/site.mjs"]);
    expect(readFileSync("app/layout.tsx", "utf8")).not.toMatch(/favicon\.jpg/);
    expect(existsSync("app/icon.png")).toBe(true);
  });

  it("uses a static-export-safe script set: no next start, lint is non-interactive Biome", () => {
    const scripts = JSON.parse(readFileSync("package.json", "utf8")).scripts as Record<string, string>;
    expect(scripts.start).toBeUndefined();
    expect(scripts.lint).toBe("biome check .");
    for (const doc of ["README.md", "DEPLOY.md"]) {
      expect(readFileSync(doc, "utf8")).not.toMatch(/npm (run )?start/);
    }
  });

  it("does not depend on Google Fonts at build time", () => {
    expect(readFileSync("app/layout.tsx", "utf8")).not.toMatch(/next\/font\/google/);
    expect(readFileSync("app/globals.css", "utf8")).not.toMatch(/fonts\.googleapis|@import url/);
  });
});
