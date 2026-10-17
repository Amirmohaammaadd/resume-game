import { useCallback, useEffect, useState, type RefObject } from 'react'

// Vertical page scroll drives a horizontal world. Everything per-frame is done
// with direct DOM writes; React state only changes for HUD values.

const FAR = 0.12
const MID = 0.35
const KEY_SPEED = 9

export type HudState = {
  coins: number
  totalCoins: number
  level: number
  levelName: string
  started: boolean
  finished: boolean
}

type Refs = {
  world: RefObject<HTMLDivElement | null>
  far: RefObject<HTMLDivElement | null>
  mid: RefObject<HTMLDivElement | null>
  character: RefObject<HTMLDivElement | null>
  spacer: RefObject<HTMLDivElement | null>
}

function offsetIn(el: HTMLElement, root: HTMLElement) {
  let left = 0
  let node: HTMLElement | null = el
  while (node && node !== root) {
    left += node.offsetLeft
    node = node.offsetParent as HTMLElement | null
  }
  return left
}

const isModalOpen = () => document.body.dataset.modal === 'open'

export function useWorld(refs: Refs) {
  const [hud, setHud] = useState<HudState>({
    coins: 0,
    totalCoins: 0,
    level: 0,
    levelName: '',
    started: false,
    finished: false,
  })

  const jump = useCallback(() => {
    const c = refs.character.current
    if (!c || c.classList.contains('jumping')) return
    c.classList.add('jumping')
    window.setTimeout(() => c.classList.remove('jumping'), 560)
  }, [refs.character])

  useEffect(() => {
    const world = refs.world.current
    const far = refs.far.current
    const mid = refs.mid.current
    const character = refs.character.current
    const spacer = refs.spacer.current
    if (!world || !far || !mid || !character || !spacer) return

    const root = document.documentElement
    let maxX = 0
    let vw = 0
    let charCenter = 0
    let reveals: { el: HTMLElement; left: number; at: number }[] = []
    let coins: { el: HTMLElement; left: number; got: boolean }[] = []
    let sections: { left: number; name: string }[] = []
    let lastY = window.scrollY
    let frame = 0
    let walkTimer = 0
    let prev = ''

    const update = () => {
      frame = 0
      const y = window.scrollY
      const x = Math.min(Math.max(y, 0), maxX)
      world.style.transform = `translate3d(${-x}px,0,0)`
      far.style.transform = `translate3d(${-x * FAR}px,0,0)`
      mid.style.transform = `translate3d(${-x * MID}px,0,0)`
      root.style.setProperty('--progress', String(maxX ? x / maxX : 0))

      const dy = y - lastY
      lastY = y
      if (dy !== 0) {
        character.dataset.walking = ''
        character.dataset.dir = dy > 0 ? 'right' : 'left'
        window.clearTimeout(walkTimer)
        walkTimer = window.setTimeout(() => delete character.dataset.walking, 160)
      }

      const cx = x + charCenter
      for (const r of reveals) r.el.classList.toggle('is-on', r.left < x + vw * r.at)

      let got = 0
      for (const c of coins) {
        const g = c.left < cx
        if (g !== c.got) {
          c.got = g
          c.el.classList.toggle('got', g)
        }
        if (g) got++
      }

      let level = 0
      sections.forEach((s, i) => {
        if (s.left <= cx + vw * 0.25) level = i
      })

      const next: HudState = {
        coins: got,
        totalCoins: coins.length,
        level,
        levelName: sections[level]?.name ?? '',
        started: x > 8,
        finished: maxX > 0 && x >= maxX - 4,
      }
      const key = JSON.stringify(next)
      if (key !== prev) {
        prev = key
        setHud(next)
      }
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const measure = () => {
      vw = window.innerWidth
      const vh = window.innerHeight
      maxX = Math.max(0, world.scrollWidth - vw)
      spacer.style.height = `${maxX + vh}px`
      far.style.width = `${vw + maxX * FAR + 200}px`
      mid.style.width = `${vw + maxX * MID + 200}px`
      const cr = character.getBoundingClientRect()
      charCenter = cr.left + cr.width / 2
      reveals = Array.from(world.querySelectorAll<HTMLElement>('[data-reveal]')).map((el) => ({
        el,
        left: offsetIn(el, world),
        at: Number(el.dataset.reveal) || 0.72,
      }))
      coins = Array.from(world.querySelectorAll<HTMLElement>('[data-coin]')).map((el) => ({
        el,
        left: offsetIn(el, world),
        got: el.classList.contains('got'),
      }))
      sections = Array.from(world.querySelectorAll<HTMLElement>('[data-section]')).map((el) => ({
        left: offsetIn(el, world),
        name: el.dataset.section ?? '',
      }))
      update()
    }

    // Keyboard: ← → walk, ↑ / Space jump.
    const held = new Set<'left' | 'right'>()
    let keyFrame = 0
    const step = () => {
      const dir = (held.has('right') ? 1 : 0) - (held.has('left') ? 1 : 0)
      if (dir) window.scrollBy(0, dir * KEY_SPEED * (vw > 900 ? 1.4 : 1))
      keyFrame = held.size ? requestAnimationFrame(step) : 0
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen() || e.metaKey || e.ctrlKey || e.altKey) return
      const k = e.key
      if (k === 'ArrowRight' || k === 'd' || k === 'D') held.add('right')
      else if (k === 'ArrowLeft' || k === 'a' || k === 'A') held.add('left')
      else if (k === 'ArrowUp' || k === ' ' || k === 'w' || k === 'W') {
        if ((e.target as HTMLElement).closest('button, a')) return
        e.preventDefault()
        jump()
        return
      } else return
      e.preventDefault()
      if (!keyFrame) keyFrame = requestAnimationFrame(step)
    }
    const onKeyUp = (e: KeyboardEvent) => {
      const k = e.key
      if (k === 'ArrowRight' || k === 'd' || k === 'D') held.delete('right')
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') held.delete('left')
    }
    const onBlur = () => held.clear()

    // Trackpads / shift+wheel scroll horizontally — map that onto the page.
    const onWheel = (e: WheelEvent) => {
      if (isModalOpen()) return
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) window.scrollBy(0, e.deltaX)
    }

    // Horizontal swipes on touch screens move the player as well.
    let touch: { x: number; y: number; axis: 'x' | 'y' | null } | null = null
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      touch = { x: t.clientX, y: t.clientY, axis: null }
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!touch || isModalOpen()) return
      const t = e.touches[0]
      const dx = touch.x - t.clientX
      const dy = touch.y - t.clientY
      if (!touch.axis && Math.hypot(dx, dy) > 6) touch.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      if (touch.axis === 'x') {
        window.scrollBy(0, dx * 1.5)
        touch.x = t.clientX
        touch.y = t.clientY
      }
    }
    const onTouchEnd = () => (touch = null)

    const ro = new ResizeObserver(measure)
    ro.observe(world)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    document.fonts?.ready.then(measure)
    measure()

    return () => {
      ro.disconnect()
      cancelAnimationFrame(frame)
      cancelAnimationFrame(keyFrame)
      window.clearTimeout(walkTimer)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [refs, jump])

  return { hud, jump }
}
