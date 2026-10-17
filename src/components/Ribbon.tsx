import type { ReactNode } from 'react'

const tail = 'absolute top-[.45em] bottom-[-0.45em] w-[1.7em] bg-cherry-dark'

export function Ribbon({ children }: { children: ReactNode }) {
  return (
    <div className="relative inline-flex text-[clamp(17px,3vw,30px)]">
      <span className={`${tail} left-[-1.15em] [clip-path:polygon(0_0,100%_0,100%_100%,0_100%,38%_50%)]`} />
      <span className="relative z-1 bg-cherry px-[1.1em] pt-[.2em] pb-[.25em] font-display tracking-[.5px] whitespace-nowrap text-white italic shadow-[0_4px_0_rgb(0_0_0/0.12)] [text-shadow:0_2px_0_rgb(0_0_0/0.25)]">
        {children}
      </span>
      <span className={`${tail} right-[-1.15em] [clip-path:polygon(0_0,100%_0,62%_50%,100%_100%,0_100%)]`} />
    </div>
  )
}

export function SectionTitle({ children, left = false }: { children: ReactNode; left?: boolean }) {
  return (
    <div
      className={`absolute inset-x-0 top-[calc(var(--spacing-hud)+18px)] z-3 flex ${left ? 'justify-start pl-[clamp(40px,8vw,90px)]' : 'justify-center'}`}
    >
      <Ribbon>{children}</Ribbon>
    </div>
  )
}
