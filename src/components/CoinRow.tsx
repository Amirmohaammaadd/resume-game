import { Bush } from './ui'

// A gap between levels with coins the player collects by walking past.
export function CoinRow({ count = 3, bush = true }: { count?: number; bush?: boolean }) {
  return (
    <div aria-hidden className="relative h-full w-[clamp(150px,26vw,280px)] flex-none">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          data-coin
          style={{ left: `${((i + 1) / (count + 1)) * 100}%` }}
          className="absolute bottom-[calc(var(--spacing-ground)+var(--spacing-char)*0.62)] -ml-2.75 h-7 w-5.5 transition-[translate,scale,opacity] duration-400 ease-[cubic-bezier(.2,.9,.3,1.2)] [&.got]:-translate-y-20 [&.got]:scale-60 [&.got]:opacity-0"
        >
          <span className="block size-full animate-coin rounded-full border-3 border-[#c98a00] bg-[radial-gradient(circle_at_35%_30%,#fff6c4_0_18%,var(--color-gold)_20%)] shadow-[inset_-3px_0_0_#e8b400]" />
        </span>
      ))}
      {bush && <Bush />}
    </div>
  )
}
