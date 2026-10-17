import type { ReactNode, Ref } from 'react'

/**
 * Each moving body part is its own HTML layer holding a full-size SVG slice of the drawing.
 * Safari runs CSS animations on SVG <g> elements on the main thread (and repaints the SVG every
 * frame), but animates transforms on HTML elements on the compositor — so the limbs swing on
 * the GPU instead of competing with the scroll handler.
 *
 * `origin` is the pivot (hip / shoulder / eye centre) as a percentage of the 64×100 viewBox.
 */
function Part({ origin, className = '', children }: { origin?: string; className?: string; children: ReactNode }) {
  return (
    <div className={`absolute inset-0 ${className}`} style={origin ? { transformOrigin: origin } : undefined}>
      <svg viewBox="0 0 64 100" className="block size-full overflow-visible">
        {children}
      </svg>
    </div>
  )
}

const BACK_HIP = '42.2% 62%'
const FRONT_HIP = '57.8% 62%'
const LEFT_SHOULDER = '23.4% 42%'
const RIGHT_SHOULDER = '76.6% 42%'
const EYES = '50.4% 26.5%'

export function Character({ ref }: { ref: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-dir="right"
      aria-hidden
      className="char pointer-events-none absolute bottom-[calc(var(--spacing-ground)-3px)] left-char-left z-30 aspect-64/100 h-char"
    >
      <span className="absolute -bottom-1.25 left-[14%] h-2.25 w-[72%] rounded-[50%] bg-black/20 jumping:animate-shadow" />
      <div className="size-full jumping:animate-jump">
        <div className="relative size-full transition-transform duration-120 facing-left:-scale-x-100">
          {/* legs */}
          <Part origin={BACK_HIP} className="walking:animate-swing-rev jumping:rotate-18">
            <rect x="23" y="62" width="8" height="28" rx="3" fill="#183153" />
            <rect x="21" y="87" width="14" height="8" rx="3" fill="#c81d22" />
          </Part>
          <Part origin={FRONT_HIP} className="walking:animate-swing jumping:rotate-[-24deg]">
            <rect x="33" y="62" width="8" height="28" rx="3" fill="#1f3f6b" />
            <rect x="31" y="87" width="14" height="8" rx="3" fill="#e8262b" />
          </Part>

          <div className="absolute inset-0 walking:animate-bob">
            {/* arms (behind the body) */}
            <Part origin={LEFT_SHOULDER} className="walking:animate-swing jumping:rotate-150">
              <rect x="11" y="42" width="8" height="21" rx="4" fill="#e0801a" />
              <circle cx="15" cy="64" r="4.2" fill="#f2c094" />
            </Part>
            <Part origin={RIGHT_SHOULDER} className="walking:animate-swing-rev jumping:rotate-150">
              <rect x="45" y="42" width="8" height="21" rx="4" fill="#e0801a" />
              <circle cx="49" cy="64" r="4.2" fill="#f2c094" />
            </Part>

            {/* cape, body and head */}
            <Part>
              <path d="M18 42 Q14 66 22 72 L42 72 Q50 66 46 42Z" fill="#c81d22" />
              <rect x="17" y="39" width="30" height="28" rx="8" fill="#f7941d" />
              <rect x="25" y="45" width="14" height="14" rx="3" fill="#e8262b" />
              <text x="32" y="56.5" textAnchor="middle" fontFamily="Lilita One, sans-serif" fontSize="12" fill="#ffd23f">
                A
              </text>
              <rect x="17" y="62" width="30" height="5" rx="2" fill="#183153" />
              <circle cx="17.5" cy="26" r="3.5" fill="#e9b07f" />
              <circle cx="46.5" cy="26" r="3.5" fill="#e9b07f" />
              <circle cx="32" cy="24" r="15" fill="#f2c094" />
              <path
                d="M16.5 25C15 10 25 5.5 33 5.5c9.5 0 16 6 14.6 19.5C45 18 40 15.5 33 15.8c-6.5.2-12 3-16.5 9.2Z"
                fill="#1d1d1b"
              />
              <path d="M22 9c3-4 9-5 12-3-4 0-8 1.5-12 3Z" fill="#1d1d1b" />
              <path d="M28.5 34.2q3.5 2.8 7 0" stroke="#8a3d1c" strokeWidth="1.7" fill="none" strokeLinecap="round" />
            </Part>

            {/* glasses + eyes (blink) */}
            <Part origin={EYES} className="animate-blink">
              <circle cx="26" cy="26.5" r="5" fill="#fff" stroke="#e8262b" strokeWidth="2" />
              <circle cx="38.5" cy="26.5" r="5" fill="#fff" stroke="#e8262b" strokeWidth="2" />
              <path d="M31 26.5h2.5" stroke="#e8262b" strokeWidth="2" />
              <circle cx="27.3" cy="27" r="1.9" fill="#1d1d1b" />
              <circle cx="39.8" cy="27" r="1.9" fill="#1d1d1b" />
            </Part>
          </div>
        </div>
      </div>
    </div>
  )
}
