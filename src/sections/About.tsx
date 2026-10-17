import { SectionTitle } from '../components/Ribbon'
import { panel, pop, section } from '../components/ui'
import { profile } from '../data/resume'

const stats = [
  ['BASE', `📍 ${profile.location}`],
  ['XP', `⚡ ${profile.years} years`],
  ['WORLDS', `🌍 ${profile.domains.join(' · ')}`],
]

export function About() {
  return (
    <section data-section="PLAYER PROFILE" className={`${section} w-[clamp(380px,100vw,1100px)]`}>
      <SectionTitle>Player Profile</SectionTitle>
      <div
        data-reveal
        className="absolute inset-x-0 top-[calc(var(--spacing-hud)+84px)] bottom-[calc(var(--spacing-ground)+var(--spacing-char)+24px)] flex items-center justify-center"
      >
        <article className={`${panel} ${pop} max-h-full w-[min(580px,88vw)] overflow-auto`}>
          <header className="flex items-center gap-3">
            <div
              aria-hidden
              className="grid size-13 flex-none place-items-center rounded-xl border-3 border-ink bg-tangerine shadow-[inset_0_-6px_0_rgb(0_0_0/0.15)]"
            >
              <span className="grid size-7 place-items-center rounded-md bg-cherry font-display text-xl text-gold">A</span>
            </div>
            <div>
              <h2 className="font-display text-[clamp(18px,2vw,24px)] leading-[1.1] font-normal">{profile.name}</h2>
              <p className="font-extrabold text-cherry">
                {profile.title} · {profile.subtitle}
              </p>
            </div>
          </header>
          <dl className="my-3 grid gap-1.5">
            {stats.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[70px_1fr] items-center gap-2">
                <dt className="font-pixel text-[9px] text-[#777]">{k}</dt>
                <dd className="font-extrabold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="border-t-2 border-dashed border-[#ddd] pt-2.5">{profile.summary}</p>
        </article>
      </div>
    </section>
  )
}
