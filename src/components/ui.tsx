import type { ReactNode } from 'react'

// Shared class recipes. Keep them as full literal strings so Tailwind can scan them.

export const section = 'relative h-full flex-none'

export const panel =
  'rounded-[14px] border-3 border-ink bg-white px-4 py-3.5 text-[clamp(12.5px,1.25vw,15px)] leading-[1.45] shadow-[0_6px_0_rgb(0_0_0/0.28)] select-text'

/** "Pops out" once an ancestor gets `.is-on` (see the `on:` variant). */
export const pop =
  'origin-bottom translate-y-7.5 scale-60 opacity-0 transition-[translate,scale,opacity] duration-450 ease-[cubic-bezier(.34,1.56,.64,1)] on:translate-y-0 on:scale-100 on:opacity-100'

const btnBase =
  'inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border-3 border-ink font-display tracking-[.3px] no-underline shadow-[0_4px_0_var(--color-ink)] transition hover:brightness-108 active:translate-y-0.75 active:shadow-[0_1px_0_var(--color-ink)]'

const btnTones = {
  red: 'bg-cherry text-white',
  gold: 'bg-gold text-ink',
  accent: 'bg-(--accent) text-white',
}

const btnSizes = {
  md: 'px-3.5 py-2 text-[15px]',
  sm: 'px-3 py-1.25 text-[13px]',
}

export const btn = (tone: keyof typeof btnTones = 'red', size: keyof typeof btnSizes = 'md') =>
  `${btnBase} ${btnTones[tone]} ${btnSizes[size]}`

export function Chips({ items }: { items: string[] }) {
  return (
    <div className="mt-2.5 flex flex-wrap gap-1.25">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-full border-[1.5px] border-[color-mix(in_srgb,var(--accent,var(--color-tangerine))_45%,#fff)] bg-[color-mix(in_srgb,var(--accent,var(--color-tangerine))_14%,#fff)] px-2 py-0.5 text-[.82em] font-extrabold text-[color-mix(in_srgb,var(--accent,var(--color-tangerine))_80%,#000)]"
        >
          {t}
        </span>
      ))}
    </div>
  )
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="rounded bg-black/18 px-1.25 py-0.5 font-pixel text-[.75em]">{children}</kbd>
}

export function Bush({ className = 'left-[30%]' }: { className?: string }) {
  return <span aria-hidden className={`bush absolute bottom-[calc(var(--spacing-ground)-4px)] z-2 ${className}`} />
}

/** Wooden signpost standing on the ground. */
export function Sign({ title, lines, className, boardClassName = '' }: { title: string; lines: string[]; className: string; boardClassName?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className={`flex max-w-55 flex-col items-center gap-0.5 rounded-lg border-3 border-ink bg-wood px-4 py-2.5 text-center text-xs font-extrabold text-white shadow-[inset_0_-5px_0_rgb(0_0_0/0.15)] [text-shadow:1px_1px_0_rgb(0_0_0/0.3)] ${boardClassName}`}
      >
        <b className="mb-1 font-pixel text-[11px] font-normal text-gold">{title}</b>
        {lines.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <span className="h-pipe w-3 border-3 border-t-0 border-ink bg-bark" />
    </div>
  )
}

export function Castle({ flag = false, end = false }: { flag?: boolean; end?: boolean }) {
  const position = end ? 'right-[6vw] max-[600px]:hidden' : 'left-1/2 ml-[calc(-0.85*var(--spacing-char))]'
  return (
    <div
      aria-hidden
      className={`bricks crenels absolute bottom-ground h-[calc(var(--spacing-char)*1.1)] w-[calc(var(--spacing-char)*1.7)] border-3 border-b-0 border-ink ${position}`}
    >
      {flag && (
        <span className="absolute bottom-[calc(100%+var(--spacing-char)*0.5+18px)] left-1/2 h-11.5 w-1 bg-ink after:absolute after:top-0.5 after:left-1 after:h-5.5 after:w-7.5 after:origin-left after:animate-wave after:bg-cherry after:[clip-path:polygon(0_0,100%_50%,0_100%)] after:content-['']" />
      )}
      <span className="bricks crenels absolute bottom-[calc(100%+3px)] left-1/2 h-[calc(var(--spacing-char)*0.5)] w-[42%] -translate-x-1/2 border-3 border-b-0 border-ink" />
      <span className="absolute bottom-0 left-1/2 h-[52%] w-[32%] -translate-x-1/2 rounded-t-full bg-ink" />
    </div>
  )
}
