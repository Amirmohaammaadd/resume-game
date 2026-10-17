import type { ReactNode } from 'react'
import type { HudState } from '../hooks/useWorld'
import { profile } from '../data/resume'

const pad = (n: number) => String(n).padStart(2, '0')

const hudBtn =
  'grid size-9.5 cursor-pointer place-items-center rounded-[10px] border-3 border-ink bg-cherry text-lg leading-none text-white shadow-[0_4px_0_var(--color-ink)] transition active:translate-y-0.75 active:shadow-[0_1px_0_var(--color-ink)]'

function Cell({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 whitespace-nowrap ${className}`}>
      <span className="text-[.8em] opacity-85">{label}</span>
      <span>{children}</span>
    </div>
  )
}

export function Hud({ hud }: { hud: HudState }) {
  const goEnd = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  const goStart = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex h-hud items-center gap-[clamp(10px,4vw,56px)] px-[clamp(12px,3vw,32px)] pt-[env(safe-area-inset-top)] font-pixel text-[clamp(9px,1.1vw,13px)] text-white [text-shadow:2px_2px_0_rgb(0_0_0/0.35)]">
        <Cell label="PLAYER">{profile.tag}</Cell>
        <Cell label="COINS">
          <i className="mr-1 inline-block h-[1em] w-[.8em] rounded-full border-2 border-[#c98a00] bg-gold align-[-2px]" />×{pad(hud.coins)}
        </Cell>
        <Cell label="WORLD">1-{hud.level + 1}</Cell>
        <Cell label="XP">{profile.years} YRS</Cell>
        <div className="pointer-events-auto ml-auto flex gap-2">
          {hud.started && (
            <button type="button" className={hudBtn} onClick={goStart} title="Back to start" aria-label="Back to start">
              ⟲
            </button>
          )}
          <button type="button" className={hudBtn} onClick={goEnd} title="Skip to contact" aria-label="Skip to contact">
            ✉
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-black/15">
          <i className="block h-full origin-left bg-gold transform-[scaleX(var(--progress,0))]" />
        </div>
      </header>
      {hud.started && (
        <div
          key={hud.level}
          aria-live="polite"
          className="pointer-events-none fixed inset-x-0 bottom-[calc(var(--spacing-ground)/2-22px)] z-49 flex animate-toast flex-col items-center gap-2 font-pixel text-[9px] text-white [text-shadow:2px_2px_0_var(--color-ink)]"
        >
          WORLD 1-{hud.level + 1}
          <b className="text-xs font-normal">{hud.levelName}</b>
        </div>
      )}
    </>
  )
}
