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

Root-mode build, for checking only:

```bash
npm run build:root                 # same as SITE_BASE_PATH=/ next build
```

Rebuild with `npm run build` afterwards so `./out` holds the default export.

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
npm run verify:export -- out /self-intro     # or: -- out root
```

`verify:export` scans a static export for email addresses and mailto links, checks that root-relative URLs match the base path, and checks that no CNAME is shipped. It prints pass or fail only.

What the automated tests cover: translation shape and non-empty strings across EN, JA and ZH, product URLs, contact link allowlist, absence of email in source and docs, base path and canonical logic, absence of a CNAME and of PR triggers in the workflow, and structural accessibility contracts on server-rendered markup (skip link, landmarks, one h1, labelled sections, ARIA state, safe external links, content present without animation).

What they do not cover: layout, contrast, focus rings, responsive behaviour, motion and the open menu. Those need a manual browser pass.

## Dependency migration and supported Node

Next.js 14.2.35 to 16.4.5 and Vitest 2.1.9 to 4.1.12 cleared every `npm audit` finding, including `--omit=dev`, as of a 2026-11-07 snapshot. That is not a guarantee for the future. New advisories can appear at any time, so rerun `npm audit`. Next 16.4.5 is the current stable release outside the vulnerable range (the 14.x and 15.x lines are all inside it). Versions were chosen from the npm registry, not `--force`.

- **Node.** Recommended: Node 24, which is the version tested locally for this migration. The engine-compatible floors are Node 20.19 or newer, or 22.12 or newer. Next 16 needs 20.9 or newer. Vitest 4 pulls in Vite 8, which needs 20.19 or newer. These floors come from package `engines` fields and say nothing about maintenance status. CI pins `node-version: "20"`, which resolves to the latest 20.x. That is engine-compatible, but this README does not claim Node 20 is currently supported or LTS. The workflow is unchanged by scope.
- **React.** Stays on 18. Next 16 accepts `^18.2.0 || ^19`.
- **Next.** Next rewrote `tsconfig.json` on first build (`jsx: react-jsx`, extra `.next/dev/types` include). No source changes were needed. The export is still static with the same base path behavior.
- **Vitest.** Vite 8 replaced esbuild with oxc, so `vitest.config.ts` became `vitest.config.mts` and `esbuild: { jsx }` became `oxc: { jsx: { runtime: "automatic" } }`.
- **Vitest 5 not used.** It needs Node 22.12 or newer, which would force a CI Node bump for no audit benefit.

## Design

See [docs/design.md](docs/design.md) for the direction, tokens, and critique.

## Deployment

`.github/workflows/deploy.yml` deploys on push to `main` and on manual dispatch. It has no pull request trigger and was not changed. It runs `npm run build` with no variables, so it produces the default `/self-intro` build.

## Future root migration

Do not do this piecemeal. Coordinate it as one change and stop at the gate below.

1. Stop gate. Confirm what currently serves `markwu.xyz` and its DNS. If any record or site already uses the apex or `www` for something else, stop and resolve it first. Never touch MX or TXT records, never add wildcard records, and never change the Tickspace or JPYC Watcher products or their subdomains.
2. Base path and assets. Build with `SITE_BASE_PATH=/` and run `npm run verify:export -- out root`. Check the favicon and every asset resolve from `/`.
3. Pages and CNAME. In the same change, set the custom domain in the repository Pages settings and add a `CNAME` file (for example `public/CNAME`) containing the chosen host. Update the workflow environment so the build uses `SITE_BASE_PATH=/`.
4. DNS. Add only the records GitHub Pages requires for the chosen host (apex A/AAAA or a `www` CNAME).
5. Canonical and Open Graph. Set `SITE_URL` to the final https origin only after DNS resolves. This is what turns on canonical and `og:url`.
6. HTTPS. Wait for GitHub to issue the certificate, then enable Enforce HTTPS.
7. Verify the root URL, then decide how `/self-intro/` should redirect.

Until all of that is done, the repository must keep the default base path, no CNAME, and no canonical.
