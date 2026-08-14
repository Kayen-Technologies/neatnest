# Services Scroll Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage services click carousel with a reversible, scroll-scrubbed image and copy sequence matching the supplied Joby Aviation reference.

**Architecture:** Keep `Services` as the only public component. Render an accessible static list by default, then expose a separate desktop stage only when a fine desktop layout and non-reduced motion are available; a component-scoped GSAP ScrollTrigger timeline pins that stage and moves each image through next, active, and previous roles.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, GSAP 3 with ScrollTrigger, `next/image`.

---

## File map

- Modify `src/components/services.tsx`: semantic service markup, GSAP refs, pinned timeline, synchronized active copy, cleanup.
- Create `src/lib/services-showcase.ts`: pure mapping from timeline progress to the nearest active service.
- Create `tests/services-showcase.test.mjs`: Node test for progress clamping and service boundaries.
- Modify `src/app/globals.css`: responsive visibility rules, stage geometry, image/copy base states, reduced-motion fallback.
- Verify with the existing `npm run lint` and `npm run build` scripts plus live browser checks.

### Task 1: Build the scroll-driven service stage

**Files:**
- Create: `tests/services-showcase.test.mjs`
- Create: `src/lib/services-showcase.ts`
- Modify: `src/components/services.tsx`

- [ ] **Step 1: Write a failing test for scroll progress mapping**

Create a Node test that imports `getActiveServiceIndex` and asserts that progress is clamped to the available services and rounded to the nearest timeline stop:

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { getActiveServiceIndex } from "../src/lib/services-showcase.ts";

test("maps scroll progress to the nearest service stop", () => {
  assert.equal(getActiveServiceIndex(-1, 4), 0);
  assert.equal(getActiveServiceIndex(0.16, 4), 0);
  assert.equal(getActiveServiceIndex(0.17, 4), 1);
  assert.equal(getActiveServiceIndex(0.5, 4), 2);
  assert.equal(getActiveServiceIndex(1.5, 4), 3);
});

test("returns zero when there are no service transitions", () => {
  assert.equal(getActiveServiceIndex(0.8, 0), 0);
  assert.equal(getActiveServiceIndex(0.8, 1), 0);
});
```

- [ ] **Step 2: Run the test and verify the red state**

Run: `node --test --experimental-strip-types tests/services-showcase.test.mjs`

Expected: FAIL because `src/lib/services-showcase.ts` does not exist.

- [ ] **Step 3: Add the minimal progress helper**

```ts
export function getActiveServiceIndex(progress: number, count: number) {
  if (count <= 1) return 0;

  const clampedProgress = Math.min(1, Math.max(0, progress));
  return Math.round(clampedProgress * (count - 1));
}
```

- [ ] **Step 4: Run the test and verify the green state**

Run: `node --test --experimental-strip-types tests/services-showcase.test.mjs`

Expected: 2 tests pass, 0 fail.

- [ ] **Step 5: Replace click state with timeline state and refs**

Import `useLayoutEffect`, `useRef`, GSAP, and ScrollTrigger. Track only the service nearest the current timeline stop for accessibility and the visible counter:

```tsx
const sectionRef = useRef<HTMLElement>(null);
const stageRef = useRef<HTMLDivElement>(null);
const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
const [active, setActive] = useState(0);
```

- [ ] **Step 6: Create the pinned reversible timeline**

Inside `useLayoutEffect`, register ScrollTrigger and use `gsap.matchMedia()` for `(min-width: 1024px) and (prefers-reduced-motion: no-preference)`. Initialize image 0 as active, image 1 as next, and the rest hidden. For transition `i`, animate image `i - 1` to the upper-left role, image `i` to the active role, image `i + 1` to the lower-right role, and cross-fade copy. Configure:

```tsx
scrollTrigger: {
  trigger: stageRef.current,
  start: "top top",
  end: () => `+=${Math.max(1, services.length - 1) * window.innerHeight}`,
  pin: true,
  scrub: 0.65,
  anticipatePin: 1,
  invalidateOnRefresh: true,
}
```

The timeline `onUpdate` calls `getActiveServiceIndex(timeline.progress(), services.length)` and updates state only when that index changes. Return `media.revert()` from the effect.

- [ ] **Step 7: Render layered images and synchronized copy**

Render every desktop image as an absolutely positioned `.services-showcase__image`, every copy block as `.services-showcase__copy`, and set inactive copy to `aria-hidden` with its link at `tabIndex={-1}`. Keep the static list as the complete fallback. Remove the old next button and click-carousel state.

- [ ] **Step 8: Run the unit test and component ESLint**

Run: `node --test --experimental-strip-types tests/services-showcase.test.mjs && npx eslint src/components/services.tsx src/lib/services-showcase.ts tests/services-showcase.test.mjs`

Expected: 2 tests pass and ESLint exits with code 0.

### Task 2: Add scoped responsive stage styling

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Make the static experience the default**

Add `.services-static-list { display: block; }` and `.services-scroll-showcase { display: none; }`. This makes mobile, coarse-pointer, and reduced-motion experiences complete without JavaScript animation.

- [ ] **Step 2: Enable and size the desktop experience**

Under `@media (min-width: 1024px) and (prefers-reduced-motion: no-preference)`, hide the static list and show a stage with a viewport-relative height constrained between 700px and 960px. Add base positions for the first active image, following thumbnail, copy panels, label, and counter. Keep all selectors under `.services-showcase`.

- [ ] **Step 3: Protect overflow and motion preferences**

Use `overflow: clip` on the showcase wrapper, rounded image frames, `will-change: transform, width, height, opacity`, and no CSS transition that would fight GSAP scrubbing. Retain the static layout when reduced motion is requested.

- [ ] **Step 4: Check stylesheet and component diff**

Run: `git diff --check -- src/components/services.tsx src/app/globals.css`

Expected: exit code 0 with no whitespace errors.

### Task 3: Verify the complete interaction

**Files:**
- Verify: `src/components/services.tsx`
- Verify: `src/app/globals.css`

- [ ] **Step 1: Run the full linter**

Run: `npm run lint`

Expected: exit code 0.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: exit code 0 and Next.js reports all routes generated successfully.

- [ ] **Step 3: Exercise the desktop sequence in a browser**

At a 1440px-wide viewport, confirm the first service begins active, each of the other three becomes active in order, the prior image retreats upper-left, the next image waits lower-right, copy matches the active image, reverse scrolling reverses the sequence, and the Process section appears after the pin releases.

- [ ] **Step 4: Exercise responsive fallbacks**

At a mobile viewport and with reduced motion emulation, confirm all four static service cards are present, links are keyboard reachable, no pinned scene appears, and the page has no horizontal overflow or browser console errors.

- [ ] **Step 5: Review final scope**

Run: `git status --short` and `git diff --stat`.

Expected: the implementation changes only `src/components/services.tsx` and the relevant additions to the already user-modified `src/app/globals.css`, while preserving unrelated working-tree changes.
