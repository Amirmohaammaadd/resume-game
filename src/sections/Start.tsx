import { Ribbon } from '../components/Ribbon'
import { Bush, Kbd, section } from '../components/ui'
import { profile } from '../data/resume'

export function Start() {
  return (
    <section data-section="START" className={`${section} w-[max(100vw,360px)]`}>
      <span
        aria-hidden
        className="absolute bottom-[calc(var(--spacing-ground)-2px)] left-0 h-[min(16vh,150px)] w-[min(14vw,180px)] bg-dirt-dark [clip-path:polygon(0_0,100%_100%,0_100%)]"
      />
      <div className="absolute inset-x-0 top-[calc(var(--spacing-hud)+4vh)] bottom-[calc(var(--spacing-ground)+var(--spacing-char)+16px)] flex flex-col items-center justify-center gap-[clamp(14px,2.6vh,26px)] px-4 text-center text-white">
        <h1 className="flex animate-float flex-col font-display text-[clamp(36px,8.5vw,104px)] leading-[.95] font-normal tracking-[1px] [text-shadow:3px_3px_0_var(--color-cherry),6px_7px_0_var(--color-ink)]">
          <span>{profile.firstName}</span>
          <span>{profile.lastName}</span>
        </h1>
        <Ribbon>{profile.title}</Ribbon>
        <p className="flex flex-col gap-1 font-display text-[clamp(16px,2.2vw,24px)] [text-shadow:2px_2px_0_rgb(0_0_0/0.25)]">
          {profile.stack.join(' • ')}
          <span className="text-[.8em] opacity-90">& {profile.subtitle}</span>
        </p>
        <p className="animate-blink-text font-pixel text-[clamp(11px,1.3vw,15px)] text-gold [text-shadow:2px_2px_0_var(--color-ink)]">
          ▶ PRESS START
        </p>
        <p className="max-w-[34ch] text-[clamp(12px,1.2vw,14px)] leading-[1.9] font-bold">
          Scroll, swipe or use <Kbd>←</Kbd> <Kbd>→</Kbd> to walk · <Kbd>Space</Kbd> / tap to jump
        </p>
      </div>
      <Bush className="right-[12%]" />
    </section>
  )
}
