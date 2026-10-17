import { useEffect, type CSSProperties } from 'react'
import type { Job } from '../data/resume'
import { JobHead } from './JobHead'
import { Chips } from './ui'

export function JobModal({ job, onClose }: { job: Job; onClose: () => void }) {
  useEffect(() => {
    document.body.dataset.modal = 'open'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      delete document.body.dataset.modal
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-100 grid animate-fade place-items-center bg-[rgb(10_20_60/0.55)] p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{ '--accent': job.color } as CSSProperties}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[86dvh] w-[min(580px,100%)] animate-modal-in overflow-auto rounded-2xl border-4 border-ink bg-white px-5.5 pt-5.5 pb-4.5 text-[15px] leading-[1.55] shadow-[8px_8px_0_var(--color-ink)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          autoFocus
          className="absolute top-3 right-3 size-8.5 cursor-pointer rounded-lg border-3 border-ink bg-gold font-extrabold"
        >
          ✕
        </button>
        <JobHead job={job} titleId="modal-title" />
        <ul className="mt-3.5 grid gap-2">
          {job.details.map((d) => (
            <li key={d} className="relative pl-5.5 before:absolute before:left-1 before:text-(--accent) before:content-['▸']">
              {d}
            </li>
          ))}
        </ul>
        <Chips items={job.tech} />
        <p className="mt-4 text-center font-pixel text-[9px] opacity-50">PRESS ESC TO CONTINUE</p>
      </div>
    </div>
  )
}
