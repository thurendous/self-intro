import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { sectionIds } from "@/lib/siteData";

// These are structural contracts on server-rendered markup (default language).
// They do not replace browser checks of layout, contrast, focus rings or motion.
const html = renderToStaticMarkup(<Home />);

describe("accessibility structure", () => {
  it("has a skip link that targets the main landmark", () => {
    expect(html).toMatch(/<a class="skip-link" href="#main">/);
    expect(html).toMatch(/<main id="main"/);
  });

  it("has exactly one h1 and a labelled heading for every section", () => {
    expect(html.match(/<h1[ >]/g)).toHaveLength(1);
    for (const id of sectionIds) {
      expect(html).toContain(`id="${id}"`);
      expect(html).toContain(`href="#${id}"`);
      expect(html).toContain(`aria-labelledby="${id}-title"`);
      expect(html).toContain(`id="${id}-title"`);
    }
  });

  it("exposes the menu toggle and language switch with ARIA state", () => {
    expect(html).toMatch(
      /aria-expanded="false"[^>]*aria-controls="site-nav"|aria-controls="site-nav"[^>]*aria-expanded="false"/
    );
    expect(html).toMatch(/<fieldset[^>]*><legend class="sr-only">/);
    for (const lang of ["en", "ja", "zh"]) expect(html).toContain(`lang="${lang}"`);
    expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
  });

  it("opens every external link safely and announces new tabs", () => {
    const anchors = html.match(/<a [^>]*href="https?:\/\/[^"]+"[^>]*>/g) ?? [];
    expect(anchors.length).toBeGreaterThanOrEqual(4);
    for (const a of anchors)
      expect(a).toMatch(/target="_blank"[^>]*rel="noopener noreferrer"|rel="noopener noreferrer"[^>]*target="_blank"/);
  });

  it("keeps all content in the initial markup without animation gating", () => {
    expect(html).not.toMatch(/opacity:\s*0/);
    expect(html).not.toMatch(/hidden=""/);
    expect(html).toContain("Tickspace");
    expect(html).toContain("JPYC Watcher");
  });

  it("marks decorative art as hidden from assistive tech", () => {
    for (const svg of html.match(/<svg [^>]*>/g) ?? []) expect(svg).toContain('aria-hidden="true"');
  });
});
