# Game Resume

A 2D side-scrolling resume built with Vite, React 19, TypeScript and Tailwind CSS v4. The README explains the structure. Resume content lives in `src/data/resume.ts`, the scroll/world engine in `src/hooks/useWorld.ts`, and the theme and custom variants in `src/index.css`.

## Must hold: iPhone Safari performance

The game must stay smooth on iPhone Safari, including in-app browsers like Telegram. A previous version lagged there, and these rules fixed it. Treat them as hard constraints for any change to scrolling, the HUD, the character or animations:

1. Never set a CSS custom property on `<html>` or `:root` from the scroll loop. Write `transform` directly on the element that moves.
2. In the per-frame `update()`, only write an attribute or class when its value changes. Cache the previous state, as `walking`, `dir` and `reveals[].on` do.
3. Don't re-measure or re-layout on iOS address-bar resizes. Keep the `TOOLBAR_SLACK` and `scrollWidth` guards, keep the stage at `h-lvh` (not `dvh` or `inset-0`), and keep the character `absolute` inside the stage, not `fixed`.
4. Never put CSS animations on SVG child elements (`<g>`, `<path>`, …). Animate HTML wrappers instead, the way the `Part` layers in `Character.tsx` do.
5. Animate only `transform`, `translate`, `scale`, `rotate` and `opacity`. No `top`, `left`, `width`, `height` or shadow animations. The finish flag slides by translating a pole-sized track, not by animating `top`.

Chrome's mobile emulation does not reproduce Safari's slowness. After touching any of this, ask the user to test on a real iPhone.

## Conventions

- Use canonical Tailwind classes: `h-2.25`, not `h-[9px]`; `transform-fill`, not `[transform-box:fill-box]`. The user's editor flags non-canonical ones.
- Class recipes are full literal strings (`panel`, `pop`, `btn()` in `src/components/ui.tsx`) so Tailwind can scan them. Joining whole class strings is fine, but never assemble a single class name from pieces (for example `` `bg-${color}` ``).
- Run `npm run build` (it type-checks first) before calling a change done.
