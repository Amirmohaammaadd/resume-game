import type { CSSProperties } from 'react'
import { JobHead } from '../components/JobHead'
import { SectionTitle } from '../components/Ribbon'
import { btn, Chips, panel, pop, section, Sign } from '../components/ui'
import { jobs, profile, type Job } from '../data/resume'

export function Experience({ onOpenJob }: { onOpenJob: (job: Job) => void }) {
  return (
    <section data-section="CAREER QUEST" className={`${section} flex`}>
      <div className="relative h-full w-[clamp(300px,64vw,440px)] flex-none">
        <SectionTitle left>Career Quest</SectionTitle>
        <div data-reveal className="absolute inset-0">
          <Sign
            title={`${jobs.length} STAGES`}
            lines={[`${profile.years} years of shipping`, '2022 → Present']}
            className="absolute bottom-ground left-1/2 -translate-x-1/2"
            boardClassName={pop}
          />
        </div>
      </div>

      {jobs.map((job) => (
        <div key={job.company} data-reveal="0.66" className="relative h-full w-[clamp(320px,86vw,470px)] flex-none">
          <article
            style={{ '--accent': job.color } as CSSProperties}
            className={`${panel} ${pop} absolute inset-x-0 bottom-[calc(var(--spacing-ground)+var(--spacing-pipe)+22px)] mx-auto max-h-[calc(100%-var(--spacing-hud)-var(--spacing-ground)-var(--spacing-pipe)-44px)] w-[min(90%,370px)] overflow-auto`}
          >
            <JobHead job={job} />
            <ul className="mt-2 grid gap-1">
              {job.highlights.map((h) => (
                <li key={h} className="relative pl-4.5 before:absolute before:left-0 before:text-(--accent) before:content-['★']">
                  {h}
                </li>
              ))}
            </ul>
            <Chips items={job.tech} />
            <button type="button" className={`${btn('accent', 'sm')} mt-3`} onClick={() => onOpenJob(job)}>
              Full mission log ▸
            </button>
          </article>

          {/* warp pipe */}
          <div
            aria-hidden
            className="absolute bottom-ground left-1/2 -ml-8.75 h-pipe w-17.5 border-3 border-b-0 border-ink bg-[linear-gradient(90deg,#1e7a1e,#6fdc5f_28%,#3fb43a_55%,#1f7d1f)]"
          >
            <span className="absolute -top-1.5 -right-2.75 -left-2.75 h-6.5 rounded border-3 border-ink bg-[linear-gradient(90deg,#1e7a1e,#6fdc5f_28%,#3fb43a_55%,#1f7d1f)]" />
            <span className="absolute inset-x-0 top-8.5 text-center font-pixel text-[10px] text-white [text-shadow:2px_2px_0_var(--color-ink)]">
              {job.year}
            </span>
          </div>
        </div>
      ))}
    </section>
  )
}
