import { Ribbon } from '../components/Ribbon'
import { btn, Castle, panel, pop, section } from '../components/ui'
import { profile } from '../data/resume'

export function Finale() {
  return (
    <section data-section="GOAL!" data-reveal="0.45" className={`${section} w-[max(100vw,380px)]`}>
      {/* flagpole */}
      <div
        aria-hidden
        className="absolute bottom-ground left-[calc(var(--spacing-char-left)+var(--spacing-char)*0.64+28px)] h-[62%] w-1.5 border-2 border-b-0 border-ink bg-[#e8e8e8]"
      >
        <span className="absolute -top-4.5 left-1/2 -ml-2.25 size-4.5 rounded-full border-2 border-ink bg-leaf" />
        <span className="absolute top-2.5 left-1 h-10 w-13 bg-cherry transition-[top] duration-1400 ease-[cubic-bezier(.5,0,.3,1)] [clip-path:polygon(0_0,100%_50%,0_100%)] on:top-[calc(100%-70px)]" />
        <span className="absolute bottom-0 left-1/2 -ml-3.75 size-7.5 border-3 border-ink bg-block-used" />
      </div>

      <div className="absolute inset-x-0 top-[calc(var(--spacing-hud)+18px)] bottom-[calc(var(--spacing-ground)+var(--spacing-char)+18px)] z-2 flex flex-col items-center justify-center gap-3.5 px-4 min-[600px]:gap-5.5 min-[900px]:left-[28%]">
        <Ribbon>Course Clear!</Ribbon>
        <article className={`${panel} ${pop} max-h-full w-[min(500px,100%)] overflow-auto text-center`}>
          <h2 className="font-display text-[clamp(22px,2.6vw,30px)] font-normal">Thanks for playing!</h2>
          <p className="mt-1.5">Looking for a frontend engineer who ships fast, scalable UIs? Let&apos;s team up.</p>
          <div className="mt-3.5 flex flex-wrap justify-center gap-2.5">
            <a className={btn()} href={`mailto:${profile.email}`}>
              ✉ Email
            </a>
            <a className={btn()} href={profile.phoneHref}>
              ☎ Call
            </a>
            <a className={btn()} href={profile.portfolio} target="_blank" rel="noreferrer">
              ★ Portfolio
            </a>
            <a className={btn('gold')} href={profile.cv} download>
              ⬇ Download CV
            </a>
          </div>
          <p className="mt-3 text-xs font-bold wrap-break-word opacity-65">
            {profile.email} · {profile.phone}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-3 animate-blink-text cursor-pointer border-0 bg-transparent p-1 font-pixel text-[10px]"
          >
            ▲ PLAY AGAIN
          </button>
        </article>
      </div>

      <Castle end />
    </section>
  )
}
