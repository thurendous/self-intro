import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contactLinks, experience, products, sectionIds, skillGroups } from "@/lib/siteData";
import { translations } from "@/lib/translations";

const langs = Object.keys(translations) as (keyof typeof translations)[];

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (typeof value === "function") return "function";
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => [k, shape(v)])
    );
  }
  return typeof value;
}

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    if (["node_modules", ".next", "out", ".git"].includes(name) || name.startsWith("out-")) return [];
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

describe("translations", () => {
  it("provide EN, JA and ZH", () => {
    expect(langs.sort()).toEqual(["en", "ja", "zh"]);
  });

  it("share one key structure across languages", () => {
    for (const lang of langs) expect(shape(translations[lang])).toEqual(shape(translations.en));
  });

  it("have no empty strings", () => {
    for (const lang of langs) for (const s of strings(translations[lang])) expect(s.trim()).not.toBe("");
  });

  it("cover every section nav id, product, experience item and skill group", () => {
    for (const lang of langs) {
      const t = translations[lang];
      for (const id of sectionIds) expect(t.nav[id]).toBeTruthy();
      for (const p of products) expect(t.products.items[p.id].name).toBeTruthy();
      for (const e of experience) expect(t.experience.items[e.id].title).toBeTruthy();
      for (const g of skillGroups) expect(t.skills.groups[g.id]).toBeTruthy();
      for (const c of contactLinks) expect(t.contact.links[c.id]).toBeTruthy();
    }
  });

  it("are written in the right script", () => {
    expect(translations.ja.hero.intro).toMatch(/[぀-ヿ]/);
    expect(translations.zh.hero.intro).toMatch(/[一-鿿]/);
    expect(translations.zh.hero.intro).not.toMatch(/[぀-ヿ]/);
  });

  it("hero intro keeps the approved wording and real-world business in every language", () => {
    expect(translations.zh.hero.intro).toBe(
      "我编写并审计智能合约，也自己开发小型 Web 产品。我做现实世界的真实的生意。我的工作语言是中文、日语和英语。"
    );
    expect(translations.en.hero.intro).toContain("run a business in the real world");
    expect(translations.ja.hero.intro).toContain("現実の世界でもビジネスを営んでいます");
    for (const lang of langs) {
      expect(translations[lang].hero.intro).not.toMatch(/@|mailto/i);
    }
  });

  it("use the Mark Wu brand and drop the old brand, counters and availability claims", () => {
    for (const lang of langs) {
      const all = strings(translations[lang]).join("\n");
      expect(all).toContain("Mark Wu");
      expect(all).not.toMatch(/Mark\.dev/i);
      expect(all).not.toMatch(/\d+\s*\+/);
      expect(all).not.toMatch(/GitHub Stars|Stars/i);
      expect(all).not.toMatch(/available for|open to work|受付中|承ります|欢迎.*(咨询|合作)/i);
    }
  });
});

describe("product links", () => {
  it("point at the three live products", () => {
    expect(Object.fromEntries(products.map((p) => [p.id, p.url]))).toEqual({
      tickspace: "https://tickspace.markwu.xyz",
      jpycWatcher: "https://jpyc-watcher.markwu.xyz",
      recom: "https://recordmoney.markwu.xyz",
    });
  });

  it("describe each product in every language", () => {
    for (const lang of langs) {
      expect(translations[lang].products.items.tickspace.name).toBe("Tickspace");
      expect(translations[lang].products.items.jpycWatcher.name).toBe("JPYC Watcher");
      expect(translations[lang].products.items.recom.name).toBe("RecoM");
    }
  });

  it("keeps RecoM copy to verified features and avoids family wording for the Space", () => {
    for (const lang of langs) {
      const { name, summary, note } = translations[lang].products.items.recom;
      const copy = [name, summary, note].join("\n");
      expect(copy).not.toMatch(/家庭|家族|household|family/i);
      expect(copy).not.toMatch(/固定|定期|recurring|fixed/i);
    }
  });

  it("derives the products intro from the count", () => {
    const { en, ja, zh } = translations;
    expect(en.products.intro(3)).toBe("Three products you can open and use now.");
    expect(en.products.intro(products.length)).toBe(en.products.intro(3));
    expect(en.products.intro(2)).toContain("Two");
    expect(en.products.intro(4)).toContain("Four");
    expect(en.products.intro(42)).toContain("42");
    expect(ja.products.intro(3)).toBe("今すぐ開いて使える3つのプロダクトです。");
    expect(zh.products.intro(3)).toBe("三个现在就能打开使用的产品。");
    expect(zh.products.intro(2)).toContain("两");
    expect(zh.products.intro(42)).toContain("42");
    for (const lang of langs) {
      const intro = translations[lang].products.intro;
      expect(typeof intro).toBe("function");
      expect(intro(2)).not.toBe(intro(4));
      expect(intro(3).trim()).not.toBe("");
    }
  });
});

describe("contact privacy", () => {
  it("offers only the verified GitHub and X URLs", () => {
    expect(contactLinks.map((c) => c.url)).toEqual(["https://github.com/thurendous", "https://x.com/Markwu_crypto"]);
  });

  it("contains no email address or mailto anywhere in tracked source and docs", () => {
    const email = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/;
    const root = process.cwd();
    const offenders = walk(root)
      .filter((f) => !/^(tests|scripts)\//.test(f.slice(root.length + 1)))
      .filter((f) => /\.(ts|tsx|mjs|js|json|md|css|yml|yaml|html)$/.test(f) && !f.endsWith("package-lock.json"))
      .filter((f) => {
        const text = readFileSync(f, "utf8");
        return email.test(text) || /mailto:/i.test(text);
      })
      .map((f) => f.slice(root.length + 1));
    expect(offenders).toEqual([]);
  });

  it("does not link LinkedIn or other unverified contact URLs", () => {
    const all = JSON.stringify([translations, contactLinks, products, experience]);
    expect(all).not.toMatch(/linkedin/i);
  });
});
