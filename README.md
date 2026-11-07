# Mark Wu: personal introduction and portfolio hub

A static Next.js (App Router, `output: "export"`) site in English, Japanese and Chinese. It introduces Mark Wu, links the two current products, and keeps earlier project work as experience.

- Tickspace: https://tickspace.markwu.xyz
- JPYC Watcher: https://jpyc-watcher.markwu.xyz

Public contact is GitHub (https://github.com/thurendous) and X (https://x.com/Markwu_crypto) only. There is no public email, mailto link, contact form or contact service, and tests enforce that.

## Develop

```bash
npm ci            # or npm install
npm run dev       # http://localhost:3000/self-intro/
```

Fonts are system stacks, so install is the only step that needs the network.

## Build and preview

```bash
npm run build                      # default base path /self-intro, output in ./out
```

`next start` does not work with `output: "export"`, so there is no `start` script. Preview the static export instead. It expects to live under `/self-intro/`. Copy `out` to `/tmp/preview/self-intro`, then serve `/tmp/preview` with any static server (for example `python3 -m http.server 3000 -d /tmp/preview`) and open `http://localhost:3000/self-intro/`.

Production-equivalent build (what the deploy workflow runs):

```bash
SITE_BASE_PATH=/ SITE_URL=https://markwu.xyz npm run build
npm run verify:export -- out root https://markwu.xyz
```

`npm run build:root` sets only `SITE_BASE_PATH=/`, so it emits a root build with no canonical. Rebuild with `npm run build` afterwards so `./out` holds the default `/self-intro` export.

## Configuration

| Variable | Default | Meaning |
| --- | --- | --- |
| `SITE_BASE_PATH` | `/self-intro` | `/` or `root` builds for a root domain. Any other value must be a plain path. |
| `SITE_URL` | unset | An https origin with no path. When set, the canonical and Open Graph URL become `SITE_URL + base path + /`. When unset, no canonical or `og:url` is emitted. |

Logic lives in `lib/site.mjs` and is unit tested. The string `/self-intro` appears in source only as the `DEFAULT_BASE_PATH` constant there; a test checks that `app/` and the other `lib/` files do not repeat it. Invalid values for either variable fail the build with a clear error instead of being guessed at. The favicon is `app/icon.png`, which Next prefixes with the base path automatically.

## Tests and checks

```bash
npm test               # vitest: translations, product links, contact privacy, base path, structure
npm run typecheck
npm run lint           # biome check: lint, format and import order, non-interactive
npm run check          # same as lint
npm run build
npm run verify:export -- out /self-intro     # default build, no canonical expected
npm run verify:export -- out root https://markwu.xyz   # production build
```

`verify:export` scans a static export for email addresses and mailto links, checks that root-relative URLs and the favicon match the base path, checks that no CNAME is shipped, and checks that canonical and `og:url` equal the expected origin (or are absent when no origin is given). It prints pass or fail only.

What the automated tests cover: translation shape and non-empty strings across EN, JA and ZH, product URLs, contact link allowlist, absence of email in source and docs, base path and canonical logic, absence of a CNAME and of PR triggers in the workflow, and structural accessibility contracts on server-rendered markup (skip link, landmarks, one h1, labelled sections, ARIA state, safe external links, content present without animation).

What they do not cover: layout, contrast, focus rings, responsive behaviour, motion and the open menu. Those need a manual browser pass.

## Dependency migration and supported Node

Next.js 14.2.35 to 16.4.5 and Vitest 2.1.9 to 4.1.12 cleared every `npm audit` finding, including `--omit=dev`, as of a 2026-11-07 snapshot. That is not a guarantee for the future. New advisories can appear at any time, so rerun `npm audit`. Next 16.4.5 is the current stable release outside the vulnerable range (the 14.x and 15.x lines are all inside it). Versions were chosen from the npm registry, not `--force`.

- **Node.** Recommended: Node 24, which is the version tested locally for this migration. The engine-compatible floors are Node 20.19 or newer, or 22.12 or newer. Next 16 needs 20.9 or newer. Vitest 4 pulls in Vite 8, which needs 20.19 or newer. These floors come from package `engines` fields and say nothing about maintenance status. CI pins `node-version: "24"`. Node 20 is end of life according to the [Node.js release schedule](https://nodejs.org/en/about/previous-releases), and 24 is an LTS line, so the workflow moved to 24 on that basis. Moving off 20 was not required by the domain switch itself. The 20.19+ and 22.12+ floors above remain what the dependencies accept for local use.
- **React.** Stays on 18. Next 16 accepts `^18.2.0 || ^19`.
- **Next.** Next rewrote `tsconfig.json` on first build (`jsx: react-jsx`, extra `.next/dev/types` include). No source changes were needed. The export is still static with the same base path behavior.
- **Vitest.** Vite 8 replaced esbuild with oxc, so `vitest.config.ts` became `vitest.config.mts` and `esbuild: { jsx }` became `oxc: { jsx: { runtime: "automatic" } }`.
- **Vitest 5 not used.** It needs Node 22.12 or newer, which would force a CI Node bump for no audit benefit.

## Design

See [docs/design.md](docs/design.md) for the direction, tokens, and critique.

## Deployment

`.github/workflows/deploy.yml` deploys on push to `main` and on manual dispatch. It has no pull request trigger. The Build step sets `SITE_BASE_PATH=/` and `SITE_URL=https://markwu.xyz`, so production serves from the root of https://markwu.xyz with canonical and `og:url` set to `https://markwu.xyz/`. Local `npm run dev` and `npm run build` keep the `/self-intro` default and emit no canonical.

## Production domain: https://markwu.xyz

The code and workflow are configured. These steps happen outside the repository and are done by the site owner.

1. Pages custom domain. In the repository, open Settings, Pages, and set the custom domain to `markwu.xyz`. This setting is stored by GitHub, not in the repo.
2. No CNAME file. GitHub documents that custom domains for sites published from a GitHub Actions workflow ignore a `CNAME` file and do not require one. The repository therefore ships none, and a test enforces that. Do not add `public/CNAME` unless the publishing source changes to a branch.
3. DNS. At the DNS provider, add the apex records GitHub Pages documents for `markwu.xyz`. No DNS settings live in this repository. Do not touch MX or TXT records, add wildcard records, or change the `tickspace` and `jpyc-watcher` subdomains.
4. `www` is not provisioned. The site does not use or redirect `www.markwu.xyz`, and no `www` record is part of this change.
5. HTTPS. Once the certificate is issued, enable Enforce HTTPS in Pages settings.
6. Deploy by merging to `main` or running the workflow manually, then check https://markwu.xyz/.
7. Old URL. The previous `/self-intro/` project path is not redirected by this change. Decide separately whether to handle it.

Before the domain is verified, a deploy built for the root will not load assets from the old project path. Merge once the Pages custom domain is set.
