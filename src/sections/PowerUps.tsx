import type { CSSProperties } from 'react'
import { SectionTitle } from '../components/Ribbon'
import { section, Sign } from '../components/ui'
import { aiTools, aiUses, softSkills } from '../data/resume'

function BlockGroup({ title, note, items }: { title: string; note?: string; items: { icon: string; label: string }[] }) {
  return (
    <div data-reveal="0.7" className="relative flex h-full flex-none items-end gap-7.5 px-7.5 pb-ground">
      <Sign title={title} lines={note ? [note] : []} className="relative" />
      <div className="mb-[calc(var(--spacing-char)+34px)] flex gap-10">
        {items.map((it, i) => (
          <div key={it.label} style={{ '--d': `${i * 140}ms` } as CSSProperties} className="relative size-12">
            <span
              className={`absolute bottom-full left-1/2 -translate-x-1/2 translate-y-10 scale-30 rounded-full border-3 border-ink bg-white px-3 py-1.25 text-[13px] font-extrabold whitespace-nowrap opacity-0 shadow-[0_3px_0_rgb(0_0_0/0.25)] transition-[translate,scale,opacity] delay-(--d) duration-550 ease-[cubic-bezier(.34,1.56,.64,1)] on:scale-100 on:opacity-100 ${
                i % 2 ? 'on:-translate-y-15.5' : 'on:-translate-y-3.5'
              }`}
            >
              <span aria-hidden>{it.icon}</span> {it.label}
            </span>
            <span
              aria-hidden
              className="rivets absolute inset-0 z-1 grid place-items-center rounded-md border-3 border-ink bg-block font-pixel text-lg text-white shadow-[inset_-4px_-4px_0_rgb(0_0_0/0.18)] transition-colors delay-(--d) duration-0 [text-shadow:2px_2px_0_#9c5a00] on:animate-bump on:bg-block-used on:text-transparent on:text-shadow-none"
            >
              ?
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PowerUps() {
  return (
    <section data-section="POWER-UPS" className={`${section} flex px-5`}>
      <SectionTitle left>Power-Ups</SectionTitle>
      <BlockGroup title="SOFT SKILLS" items={softSkills} />
      <BlockGroup title="AI TOOLKIT" note={aiUses} items={aiTools} />
    </section>
  )
}
