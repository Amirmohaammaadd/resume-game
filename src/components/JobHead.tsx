import type { Job } from '../data/resume'

/** Logo, company, role and period — shared by the job card and the modal. Expects `--accent` on an ancestor. */
export function JobHead({ job, titleId }: { job: Job; titleId?: string }) {
  return (
    <>
      <header className="flex items-center gap-2.5 pr-7.5">
        {job.logo ? (
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            className="size-12 flex-none rounded-xl border-3 border-ink bg-(--accent) object-cover"
          />
        ) : (
          <span className="grid size-12 flex-none place-items-center rounded-xl border-3 border-ink bg-(--accent) font-display text-[24px] text-white [text-shadow:1px_2px_0_rgb(0_0_0/0.25)]">
            {job.company[0]}
          </span>
        )}
        <div>
          <h3 id={titleId} className="font-display text-[clamp(18px,1.9vw,22px)] leading-[1.1] font-normal">
            {job.company}
          </h3>
          <p className="font-extrabold opacity-70">{job.role}</p>
        </div>
      </header>
      <p className="mt-2 font-pixel text-[9px] text-[color-mix(in_srgb,var(--accent)_80%,#000)]">{job.period}</p>
    </>
  )
}
