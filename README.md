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
