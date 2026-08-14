# Principles Scroll Showcase Design

## Goal

Turn the About page's "Principles" section ("The standard, gently held visit after visit.") into a scroll-scrubbed showcase: the section pins while the user scrolls, and each principle's image + text pair softly crossfades to the next before the page releases into the following section. The tone should read as calm and understated, distinct from the more elaborate orbiting-card choreography used by the homepage Services showcase.

## Chosen approach

Reuse the scroll-progress-driven pinning technique already implemented for `Services` (`src/components/services.tsx`): a tall off-screen scroll canvas holds a `position: sticky` pinned scene, and a scroll listener (throttled via `requestAnimationFrame`) computes scroll progress through that canvas to derive the active principle index. This is preferable to introducing a new animation library dependency (e.g. GSAP ScrollTrigger) since the codebase already has a working, dependency-free implementation of this exact mechanic to follow.

Unlike Services, the transition style here is a simple crossfade (opacity + slight vertical drift) between one image+text pair and the next, rather than small preview cards orbiting a large active card. This keeps the section visually lighter and matches the "gently held" framing.

## Component structure

New client component `src/components/principles-showcase.tsx`, taking the existing `aboutPrinciples` list (`src/lib/data.ts`) as a prop. It renders two mutually-exclusive branches, toggled by CSS media query on `prefers-reduced-motion` (same technique as `.services-static-intro` / `.services-scroll-showcase`):

- **Static branch** (`.principles-static-content`): the current markup — heading, then the stacked list of principles with alternating image position — unchanged, shown by default and whenever `prefers-reduced-motion: reduce` is set.
- **Scroll branch** (`.principles-scroll-showcase`): hidden by default, shown only when motion is allowed. Contains the tall scroll canvas and the sticky `.principles-showcase` pinned scene.

`src/app/about/page.tsx` replaces its inline heading + `aboutPrinciples.map(...)` block with `<PrinciplesShowcase principles={aboutPrinciples} />`, which owns both the heading and the list content for both branches (the heading must live inside the component so it can be duplicated into the pinned scene, matching how `Services` duplicates its intro heading into `.services-showcase__title`).

New helper `src/lib/principles-showcase.ts` exports `getActivePrincipleIndex(progress, count)`, computing the active index from clamped scroll progress. This mirrors `getActiveServiceIndex` in `src/lib/services-showcase.ts` but is kept as its own small file rather than shared, since the two showcases are independent features with independent tuning.

## Motion behavior

- Scroll canvas height: `(count + 1.5) * 100svh`, same formula Services uses, so each principle gets a comparable scroll allowance.
- Pinned scene title: the duplicated heading text is centered and fully visible at the top of the pinned scene when progress is near zero, then fades and drifts up slightly once scroll progress passes a small threshold (same `progress <= 0.04` cutoff Services uses for its title).
- Principle pairs: each principle's image and text are absolutely stacked in the same frame. The active pair is `opacity: 1, translateY(0)`; inactive pairs sit at `opacity: 0, translateY(15px)`. Transition is opacity/transform only, ~500ms ease — a soft crossfade, no position/size choreography.
- Alternating layout: principles at even index (0, 2, 4 — i.e. 1st, 3rd, 5th) show image on the left, text on the right; odd index (1, 3 — i.e. 2nd, 4th) show text on the left, image on the right. This matches the current static section's alternating order exactly.
- Site header visibility: while the scene is pinned (`rect.top <= 0 && rect.bottom >= window.innerHeight`), the header is hidden via a toggled class, same mechanism Services uses (`services-showcase-header-hidden`); Principles gets its own identically-defined class rather than sharing Services' class, to keep the two components decoupled.

## Responsive behavior

The pinned crossfade runs on both desktop and mobile (per product decision — unlike Services, which restricts pinning to desktop). On narrow viewports, a mobile media-query block switches each pair from side-by-side to stacked (image on top, text below, full width), matching how the current static mobile layout already presents principles — index-based left/right alternation is dropped on mobile since there is no left/right to alternate.

## Accessibility / reduced motion

Unchanged fallback: when `prefers-reduced-motion: reduce`, `.principles-static-content` is displayed and `.principles-scroll-showcase` is not rendered visually (`display: none`), exactly preserving the current non-animated behavior — same heading, same stacked list, same alt text and semantic headings. The pinned scene's images are `aria-hidden` duplicates of the same content and are not part of the static branch's DOM, avoiding duplicate announcements to assistive tech.

## Verification

- Run ESLint and a production Next.js build.
- Exercise the About page's Principles section at desktop and mobile widths: confirm all 5 principles are reachable while scrolling, reverse scrolling works, the CTA section below is released once the last principle's scroll allowance is exhausted, and there is no horizontal overflow or console errors.
- Confirm `prefers-reduced-motion: reduce` shows the static stacked list with no pinning.
- Confirm the Services showcase on the homepage is unaffected.
