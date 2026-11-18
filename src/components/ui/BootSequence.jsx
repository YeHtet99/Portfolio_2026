import { useLayoutEffect, useState } from 'react'
import { markBootSequenceSeen } from '../../lib/boot'

export function BootSequence({ onDone }) {
  const [leaving, setLeaving] = useState(false)

  useLayoutEffect(() => {
    const root = document.documentElement
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    let revealTimer
    let removeTimer

    root.classList.add('is-booting')
    markBootSequenceSeen()

    const reveal = () => {
      setLeaving(true)
      root.classList.remove('is-booting')
      window.dispatchEvent(new Event('portfolio:booted'))
      removeTimer = window.setTimeout(onDone, reducedMotion ? 0 : 220)
    }

    revealTimer = window.setTimeout(reveal, reducedMotion ? 0 : 680)
    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(removeTimer)
      root.classList.remove('is-booting')
    }
  }, [onDone])

  return <div className={`boot-sequence${leaving ? ' is-leaving' : ''}`} aria-hidden="true">
    <div className="boot-grid" />
    <div className="boot-content">
      <div className="boot-mark">YM<span>H</span></div>
      <div className="boot-line" />
      <p>SOFTWARE ENGINEER</p>
    </div>
  </div>
}
