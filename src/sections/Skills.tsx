import { useState, type CSSProperties } from 'react'
import { SectionTitle } from '../components/Ribbon'
import { section } from '../components/ui'
import { LEVELS, skills } from '../data/resume'

function PiranhaHead({ delayed }: { delayed: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      style={{ animationDelay: delayed ? '-0.7s' : undefined }}
      className="relative z-1 -mb-1.5 aspect-square w-[min(72%,11vh,86px)] flex-none origin-[50%_85%] animate-chomp"
    >
      <circle cx="50" cy="56" r="40" fill="#e8262b" />
      <path d="M18 34 30 12l8 18 8-20 8 20 8-20 8 20 12-16 2 22Q50 22 18 34Z" fill="#fff" />
      <circle cx="30" cy="58" r="8" fill="#fff" />
      <circle cx="66" cy="74" r="13" fill="#fff" />
    </svg>
  )
}

export function Skills() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      data-section="SKILL TREE"
      className={`${section} w-[calc(var(--labels)+8*var(--col)+60px)] [--col:clamp(94px,11vw,126px)] [--labels:clamp(110px,12vw,150px)]`}
    >
      <SectionTitle>Skill Tree</SectionTitle>
      <div data-reveal="0.8" className="absolute inset-x-0 top-[calc(var(--spacing-hud)+132px)] bottom-ground">
        {LEVELS.map((name, i) => (
          <div
            key={name}
            style={{ '--i': i + 1 } as CSSProperties}
            className="absolute inset-x-3 bottom-[calc(var(--i)*20%)] border-t-2 border-white/55"
          >
            <span className="absolute bottom-1.5 left-1 font-display text-[clamp(11px,1.1vw,14px)] tracking-[.5px] text-white">
              {name.toUpperCase()}
            </span>
          </div>
        ))}

        <div className="absolute inset-y-0 left-(--labels) flex">
          {skills.map((s, i) => {
            const isOpen = open === i
            return (
              <div key={s.label} className={`relative h-full w-(--col) hover:z-8 ${isOpen ? 'z-8' : ''}`}>
                <span className="absolute -top-12.5 left-1/2 -translate-x-1/2 bg-tangerine px-2 py-1 font-display text-[clamp(11px,1.05vw,14px)] tracking-[.5px] whitespace-nowrap text-white uppercase shadow-[0_0_0_2px_#ffb04d,0_3px_0_rgb(0_0_0/0.15)]">
                  {s.label}
                </span>
                <button
                  type="button"
                  style={{ '--lvl': s.level, '--d': `${i * 110}ms` } as CSSProperties}
                  onClick={() => setOpen(isOpen ? null : i)}
                  onMouseLeave={() => setOpen(null)}
                  aria-label={`${s.label}: ${LEVELS[s.level - 1]} — ${s.items.join(', ')}`}
                  className="group absolute inset-x-0 bottom-0 flex h-[calc(var(--lvl)*20%+6%)] translate-y-[calc(100%+30px)] cursor-pointer flex-col items-center border-0 bg-transparent p-0 transition-[translate] delay-(--d) duration-900 ease-[cubic-bezier(.3,1.25,.5,1)] on:translate-y-0"
                >
                  <span
                    className={`pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-2 flex w-45 -translate-x-1/2 flex-col gap-0.5 rounded-[10px] border-3 border-ink bg-white px-2.5 py-2 text-center text-xs leading-[1.4] font-bold shadow-[0_4px_0_rgb(0_0_0/0.25)] transition ${
                      isOpen
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100'
                    }`}
                  >
                    <b className="font-pixel text-[9px] font-normal text-cherry">{LEVELS[s.level - 1]}</b>
                    {s.items.join(' · ')}
                  </span>
                  <PiranhaHead delayed={i % 2 === 1} />
                  <span
                    aria-hidden
                    className="flex w-full flex-none flex-col gap-0.75 bg-[linear-gradient(90deg,transparent_calc(50%-2.5px),var(--color-stem)_0_calc(50%+2.5px),transparent_0)]"
                  >
                    {[0, 1, 2, 3].map((n) => (
                      <span key={n} className="flex justify-center gap-1">
                        <i className="h-[min(17px,2.4vh)] w-[42%] rounded-[50%] bg-[linear-gradient(#7cc043_50%,#4f9a2e_50%)]" />
                        <i className="h-[min(17px,2.4vh)] w-[42%] rounded-[50%] bg-[linear-gradient(#7cc043_50%,#4f9a2e_50%)]" />
                      </span>
                    ))}
                  </span>
                  <span aria-hidden className="w-1.25 flex-1 bg-stem" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
