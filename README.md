# Neat Nest

Marketing website for **Neat Nest**, a luxury cleaning service in Accra, Ghana. Built from the [Figma design](https://www.figma.com/design/6fsqn21MmMDIAm9kugbqlJ/Neat-Nest) — a five-page site.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (theme tokens live in `src/app/globals.css` under `@theme`)
- Fonts via `next/font`: Playfair Display (display serif) + Inter (UI/body)

## Getting started

```bash
npm run dev     # start the dev server → http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Pages

| Route        | Page               |
| ------------ | ------------------ |
| `/`          | Homepage           |
| `/about`     | About              |
| `/services`  | Services           |
| `/spaces`    | Spaces We Care For |
| `/schedule`  | Schedule a Visit (assessment form) |

## Structure

```
src/
  app/
    layout.tsx        # fonts, metadata, global header + footer
    page.tsx          # homepage (composes the section components)
    about/page.tsx
    services/page.tsx
    spaces/page.tsx
    schedule/page.tsx
    globals.css       # Tailwind import + brand theme tokens
  components/         # header/footer, section + page building blocks
  lib/
    data.ts           # all copy + structured content (nav, services, values, testimonials, before/after, form options)
public/images/        # photography exported from the design
```

All page copy and lists live in `src/lib/data.ts`, so content edits never require touching components.

## Adding a backend later

The site is a static App Router project, so backend features drop in without restructuring:

- **Schedule form** — `src/components/schedule-form.tsx` captures the fields client-side and shows a confirmation. To persist, add `src/app/api/schedule/route.ts` and `fetch("/api/schedule", { method: "POST", ... })` from the submit handler (email, DB, CRM, etc.).
- **API routes** — add `src/app/api/<name>/route.ts` for any endpoint.
- **Dynamic content** — sections read from `src/lib/data.ts`; swap that module for a DB/CMS call (Server Components) and the components are unchanged.

## Content notes

- **Homepage services carousel** only exposed *Residential* in the shared prototype, so its other three panels use brand-consistent copy. The full **/services** page copy (Residential, Deep, Post-Construction, Hotel & Office) is taken verbatim from the design.
- **Testimonial** names/neighbourhoods on the homepage are realistic placeholders (the prototype repeated one). Replace with real quotes in `src/lib/data.ts`.
- The **before/after** pairs on `/spaces` reuse the project photography from the design; swap in true paired shots as they become available.
- The logo mark (`src/components/logo.tsx`) and the broom illustration on `/schedule` are lightweight inline SVGs, so they stay crisp at any size.
```
# neatnest
