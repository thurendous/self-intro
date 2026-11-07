# Design reasoning

Subject: Mark Wu, a blockchain engineer in Tokyo. Audience: collaborators and visitors arriving from the two products. Job: say who he is in a sentence and send people to the working products.

## Pass 1: plan

- Color: paper `#F2F4F1`, ink `#16202F`, soft ink `#46515F`, rule `#C6CEC8`, teal line `#5FD8BD`, indigo line `#AAB6FF`, focus blue `#1D4ED8`, signal `#F2B705` (focus on dark only).
- Type: system stacks only. A serif (Iowan/Palatino with Mincho and Songti fallbacks) for the name, headings and intro. System sans for UI and lists. No web font, so the build is offline.
- Layout: left aligned. A huge name, a three-segment line, one intro sentence. Then a dark signboard band holding the two products. Plain ruled rows below for history.
- Principles: Tokyo transit signage as the metaphor. One loud element, the signboard. Everything else is quiet and ruled.

## Review against the brief

First draft was a cream or white page with a black hero, pill tags and rounded cards. That is the generic portfolio default, so it was dropped.

Changes made:
- Dropped the stat row. The old counters were unverified and a big-number hero is the default anyway.
- Dropped pills and cards for history. Rows with a ruled top edge carry the same information as a list.
- Dropped all-caps eyebrows, numbered markers and monospace labels. Section numbers would imply a sequence that is not there.
- Products are the memorable element: each is a bordered signboard panel with a thick left edge in its own line colour and a small abstract glyph (checklist, bars). The glyphs carry no data, so they cannot imply metrics.
- The paper tint is a cool grey-green rather than cream, and the accents are teal and indigo rather than clay or acid green.

## Pass 2: critique

- Motion: one animation only, the hero line drawing once. It is gated by `prefers-reduced-motion: no-preference`. Nothing is hidden before it runs.
- Accessibility: skip link, one h1, labelled sections, disclosure menu with `aria-expanded`, Escape closes it, language buttons use `aria-pressed` and carry their own `lang`. Focus ring is 3px blue on paper and signal yellow on the dark bands. External links open in a new tab with an off-screen note. Without JavaScript the nav is shown by a `noscript` rule.
- Copy: no availability claims, testimonials or counters. Hero and about restate only what the earlier site already said. APY is labelled as an estimate.
- Accepted risks: font appearance varies by OS because fonts are system stacks. Contrast was first chosen by eye and measured later (see Pass 3). The mobile layout and the open menu have not been checked in a browser.

## Pass 3: critique after review

- Moved the role line from above the name to below it. A small line above a heading is the eyebrow pattern the design otherwise avoids, and the name should be the first thing read.
- Measured contrast with a script (WCAG relative luminance): body ink on paper 14.8, soft ink on paper 7.3, focus blue on paper 6.1, signal focus on ink 9.0, reduced-opacity text on ink 8.8 or higher. All clear AA. The teal and indigo hero line is decorative and hidden from assistive tech, so it is not held to text contrast.
- Residual weakness: the two product panels share one structure and differ only by line colour and glyph. That keeps them comparable but is close to the repeated-card pattern. Not changed, because a different layout per product would imply a ranking.
- Still unverified without a browser: real rendering, wrapping of long CJK strings, mobile menu feel.
