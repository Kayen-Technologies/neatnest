# Services Scroll Showcase Design

## Goal

Replace the homepage services click carousel with a scroll-scrubbed editorial showcase inspired by Joby Aviation's Experience Highlights section. The interaction must preserve Neat Nest's existing warm, restrained visual language and make all four services easy to understand.

## Chosen approach

Use GSAP ScrollTrigger, which is already available in the project, to pin a desktop stage and animate each service between three spatial roles:

- previous: a small portrait in the upper-left corner;
- active: a large portrait occupying the center-left of the stage;
- next: a small portrait in the lower-right corner.

The active service's number, name, description, and link appear in a copy column to the right. Every transition is tied directly to scroll progress, so reversing the scroll reverses the animation without separate navigation state.

This is preferable to a custom requestAnimationFrame controller because ScrollTrigger owns pinning, refresh, cleanup, and scrub synchronization. CSS scroll-driven animations were rejected because the coordinated multi-element timeline and browser support would be less predictable.

## Component structure

`Services` remains the public section component and keeps its existing intro copy.

- A mobile and reduced-motion branch renders the existing semantic stacked list.
- A desktop showcase contains one sticky/pinned stage with all images and copy panels layered in the DOM.
- Element refs are collected by service index and passed to one GSAP timeline created inside a layout effect.
- ScrollTrigger refreshes after layout and is fully reverted when the component unmounts or its media query stops matching.

No service content moves out of `src/lib/data.ts`.

## Motion sequence

The first service begins active, with the second service waiting in the lower-right. For each subsequent stage:

1. The active image reduces in size and moves to the upper-left.
2. Its copy fades and shifts slightly upward.
3. The waiting image simultaneously grows and travels into the main frame.
4. The new copy fades into its fixed right-side position.
5. The following image appears in the lower-right once space is available.

Images retain rounded corners and use `object-fit: cover`. The stage is approximately one viewport high; the pinned scroll distance is proportional to the number of transitions so every service receives an intentional pause.

## Responsive and accessibility behavior

The pinned experience is enabled only on desktop-width, fine-pointer layouts. Smaller screens keep the stacked service cards, which avoids cramped thumbnails and excessive scroll capture.

When `prefers-reduced-motion: reduce` is active, no pinning or scrubbed transform is created; the static stacked presentation remains available. All images keep meaningful alt text, service details remain real headings and paragraphs, and links remain keyboard accessible.

## Failure handling

If JavaScript is unavailable or GSAP does not initialize, the desktop stage's base CSS still exposes the first service while the complete mobile/static list remains available to reduced-motion and smaller layouts. The timeline is scoped to the component and cleaned up to prevent duplicate triggers during Next.js navigation and development remounts.

## Verification

- Run ESLint and a production Next.js build.
- Exercise the homepage at desktop and mobile widths.
- Confirm all four service stages are reachable, reverse scrolling works, the following section is released after the pin, and there are no horizontal overflow or console errors.
- Confirm reduced-motion uses the non-pinned presentation.

