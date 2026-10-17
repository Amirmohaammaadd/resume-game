# Game Resume — Amir Mohammad Abdollahi

A side-scrolling 2D platformer resume, built with Vite + React + TypeScript + Tailwind CSS v4 (no game engine, no UI library).

Scrolling the page moves the world sideways. The character walks while you scroll, coins get collected, and each resume section pops in as you reach it.

| World | Section |
| --- | --- |
| 1-1 | Start screen |
| 1-2 | Player Profile (summary) |
| 1-3 | Skill Tree (piranha-plant skill chart) |
| 1-4 | Career Quest (one warp pipe per job, "Full mission log" opens the details) |
| 1-5 | Academy (education) |
| 1-6 | Power-Ups (soft skills + AI toolkit) |
| 1-7 | Goal: contact info and CV download |

## Controls

- Scroll, swipe, or use `←` `→` / `A` `D` to walk
- `Space` / `↑` / tap to jump
- The ✉ button in the HUD skips to the contact page

## Run

```bash
npm install
npm run dev
```

`npm run build` writes a static site to `dist/`, which you can deploy anywhere (Vercel, Netlify, GitHub Pages).

## Editing content

All the resume text is in [`src/data/resume.ts`](src/data/resume.ts). That includes the skill levels (1–5), the job highlights and full bullet lists, the soft skills and the contact links. The downloadable CV is `public/AmirMohammad_Abdollahi_Resume.docx`.

## How it works

- `src/hooks/useWorld.ts` maps `scrollY` to the world's `translateX`, with parallax layers for the clouds and hills. It writes to the DOM directly every frame, so React only re-renders when a HUD value changes.
- Any element with `data-reveal` gets the `is-on` class once it enters the screen. `data-coin` marks collectible coins, and `data-section` sets the HUD world name.

## Styling (Tailwind)

The theme lives in `src/index.css`:

- **Colors:** `bg-sky`, `bg-cherry`, `text-gold`, `bg-tangerine` and so on.
- **Fonts:** `font-display`, `font-pixel`, plus Nunito as `font-sans`.
- **Animations:** `animate-chomp`, `animate-coin` and the rest.
- **Game geometry as spacing:** `bottom-ground`, `h-char`, `left-char-left`, `h-pipe`, `top-hud`. Change these once and the whole world rescales.

Custom variants drive the game states:

| Variant | Applies when |
| --- | --- |
| `on:` | an ancestor has been revealed (`.is-on`) |
| `walking:` | the character is walking |
| `jumping:` | the character is jumping |
| `facing-left:` | the character faces left |

Shared class recipes and small UI pieces (`panel`, `pop`, `btn()`, `Chips`, `Sign`, `Castle`) are in `src/components/ui.tsx`. A few pixel-art patterns stay as plain CSS in `@layer components`, because they'd be unreadable as utility classes: the zigzag ground, castle bricks, block rivets and bushes.

## Performance rules (iPhone Safari)

An earlier version lagged on iPhone Safari while the character walked. These rules fixed it. Keep them when you change the scroll or animation code, and test on a real iPhone afterwards.

1. **Never write a CSS variable on `<html>` per frame.** Changing a custom property on the root makes Safari recalculate styles for the whole page. Write `transform` directly on the element that moves instead. The HUD progress bar works this way, through `data-progress`.
2. **Only touch the DOM when a value changes.** Inside the scroll loop, cache the last state and write `data-walking`, `data-dir`, `is-on` and `got` only when they flip. Writing an attribute, even with the same value, re-styles that subtree.
3. **Ignore iOS address-bar resizes.** Safari fires `resize` and changes `dvh` every time the address bar collapses or expands. `useWorld` only re-measures when the width changes or the height changes by more than `TOOLBAR_SLACK`. For the same reason the stage uses `h-lvh` (not `dvh` or `inset-0`), and the character is `absolute` inside the stage rather than `fixed`, so it stays on the ground.
4. **Animate HTML elements, not SVG parts.** Safari runs CSS animations on SVG `<g>` elements on the main thread and repaints the SVG every frame. In `Character.tsx` each limb is its own HTML layer holding an SVG slice, so the swing, bob, blink and jump run on the GPU.
5. **Animate only `transform` and `opacity`.** Animating anything else (`top`, `width`, `box-shadow`, colors) triggers layout or paint on every frame.
