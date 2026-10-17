import { memo, useMemo, useRef, useState, type MouseEvent, type Ref } from 'react'
import { Character } from './components/Character'
import { CoinRow } from './components/CoinRow'
import { Hud } from './components/Hud'
import { JobModal } from './components/JobModal'
import { FarLayer, MidLayer } from './components/Scenery'
import type { Job } from './data/resume'
import { useWorld } from './hooks/useWorld'
import { About } from './sections/About'
import { Education } from './sections/Education'
import { Experience } from './sections/Experience'
import { Finale } from './sections/Finale'
import { PowerUps } from './sections/PowerUps'
import { Skills } from './sections/Skills'
import { Start } from './sections/Start'

// Memoized so HUD updates never re-render the (large) world.
const World = memo(function World({ worldRef, onOpenJob }: { worldRef: Ref<HTMLDivElement>; onOpenJob: (job: Job) => void }) {
  return (
    <div ref={worldRef} className="absolute top-0 left-0 flex h-full w-max will-change-transform">
      <Start />
      <CoinRow />
      <About />
      <CoinRow count={4} />
      <Skills />
      <CoinRow />
      <Experience onOpenJob={onOpenJob} />
      <CoinRow count={4} />
      <Education />
      <CoinRow />
      <PowerUps />
      <CoinRow count={5} bush={false} />
      <Finale />
      <div aria-hidden className="ground absolute inset-x-0 bottom-0 z-6 h-ground" />
    </div>
  )
})

export default function App() {
  const world = useRef<HTMLDivElement>(null)
  const far = useRef<HTMLDivElement>(null)
  const mid = useRef<HTMLDivElement>(null)
  const character = useRef<HTMLDivElement>(null)
  const spacer = useRef<HTMLDivElement>(null)
  const refs = useMemo(() => ({ world, far, mid, character, spacer }), [])
  const { hud, jump } = useWorld(refs)
  const [job, setJob] = useState<Job | null>(null)
  const closeJob = useMemo(() => () => setJob(null), [])

  const onStageClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('a, button, article')) return
    jump()
  }

  return (
    <>
      <main
        onClick={onStageClick}
        className="fixed inset-0 h-dvh overflow-hidden bg-[linear-gradient(var(--color-sky)_55%,var(--color-sky-2))] select-none"
      >
        <FarLayer ref={far} />
        <MidLayer ref={mid} />
        <World worldRef={world} onOpenJob={setJob} />
        <Character ref={character} />
      </main>
      <Hud hud={hud} />
      <div ref={spacer} aria-hidden className="w-px" />
      {job && <JobModal job={job} onClose={closeJob} />}
    </>
  )
}
