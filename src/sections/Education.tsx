import { SectionTitle } from '../components/Ribbon'
import { Castle, panel, pop, section } from '../components/ui'
import { education } from '../data/resume'

export function Education() {
  return (
    <section data-section="ACADEMY" className={`${section} w-[clamp(360px,90vw,680px)]`}>
      <SectionTitle>Academy</SectionTitle>
      <div data-reveal className="absolute inset-0">
        <article
          className={`${panel} ${pop} absolute inset-x-0 bottom-[calc(var(--spacing-ground)+var(--spacing-char)*1.65+86px)] mx-auto flex w-[min(88%,400px)] items-center gap-3.5`}
        >
          <span aria-hidden className="text-[40px] leading-none">
            🎓
          </span>
          <div>
            <p className="font-pixel text-[9px] text-cherry">{education.degree}</p>
            <h3 className="mt-1 mb-0.5 font-display text-[clamp(20px,2.1vw,26px)] leading-[1.1] font-normal">{education.field}</h3>
            <p className="font-extrabold opacity-75">
              {education.school} · {education.city}
            </p>
          </div>
        </article>
        <Castle flag />
      </div>
    </section>
  )
}
