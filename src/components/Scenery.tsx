import type { Ref } from 'react'

const svgUrl = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`

const cloud = (x: number, y: number, s: number) =>
  `<g transform='translate(${x} ${y}) scale(${s})' fill='#fff'><rect x='0' y='40' width='170' height='46' rx='23'/><circle cx='55' cy='42' r='32'/><circle cx='105' cy='34' r='40'/></g>`

const CLOUDS = svgUrl(
  `<svg xmlns='http://www.w3.org/2000/svg' width='1400' height='420' viewBox='0 0 1400 420'>${cloud(60, 60, 1)}${cloud(520, 170, 0.75)}${cloud(860, 30, 1.1)}${cloud(1200, 200, 0.6)}</svg>`,
)

const HILLS = svgUrl(
  `<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='400' viewBox='0 0 1600 400' preserveAspectRatio='none'>
    <path d='M-40 400 C80 120 260 90 420 400Z' fill='#4fb848'/>
    <path d='M300 400 C430 200 600 200 720 400Z' fill='#6ccb4f'/>
    <path d='M640 400 C800 40 1040 40 1200 400Z' fill='#4fb848'/>
    <path d='M1120 400 C1260 220 1420 220 1560 400Z' fill='#6ccb4f'/>
    <g fill='#3e9a3a'><ellipse cx='250' cy='300' rx='10' ry='18'/><ellipse cx='290' cy='250' rx='8' ry='14'/><ellipse cx='900' cy='230' rx='12' ry='22'/><ellipse cx='960' cy='300' rx='9' ry='16'/></g>
  </svg>`,
)

const layer = 'pointer-events-none absolute left-0 bg-size-[auto_100%] bg-repeat-x will-change-transform'

export function FarLayer({ ref }: { ref: Ref<HTMLDivElement> }) {
  return <div ref={ref} aria-hidden className={`${layer} top-hud h-[55%] opacity-95`} style={{ backgroundImage: CLOUDS }} />
}

export function MidLayer({ ref }: { ref: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      aria-hidden
      className={`${layer} bottom-[calc(var(--spacing-ground)-6px)] h-[34%] bg-bottom-left`}
      style={{ backgroundImage: HILLS }}
    />
  )
}
