import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { DECISIONS, XRAY_NOTES } from './decisions'

type Target = { el: Element; frame: string; note: string; n: string; title: string; id: string }

/**
 * Modo Raio-X: mostra, por cima da landing, os frames do Figma e a decisão técnica de cada parte.
 * Liga pelo botão flutuante ou pela tecla X.
 */
export function Xray() {
  const [on, setOn] = useState(false)
  const [targets, setTargets] = useState<Target[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle('xray-on', on)
    if (!on) {
      setTargets([])
      return
    }
    const found: Target[] = []
    for (const x of XRAY_NOTES) {
      const el = document.querySelector(x.selector)
      const d = DECISIONS.find((d) => d.id === x.decision)
      if (!el || !d) continue
      el.setAttribute('data-xray', x.frame)
      found.push({ el, frame: x.frame, note: x.note, n: d.n, title: d.title, id: d.id })
    }
    setTargets(found)
    return () => found.forEach((t) => t.el.removeAttribute('data-xray'))
  }, [on])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof Element && e.target.closest('input, textarea, select, [contenteditable]')
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'x' || e.key === 'X') setOn((v) => !v)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        className={`xray-toggle${on ? ' is-on' : ''}`}
        aria-pressed={on}
        onClick={() => setOn((v) => !v)}
        title="Atalho: tecla X"
      >
        <span className="xray-toggle-icon" aria-hidden="true">
          {'</>'}
        </span>
        <span className="xray-toggle-text">
          Raio-X <small>{on ? 'ligado' : 'ver as decisões'}</small>
        </span>
        <span className="xray-switch" aria-hidden="true" />
      </button>
      {on && (
        <div className="xray-banner" role="status">
          Modo Raio-X: cada nota mostra uma decisão técnica.{' '}
          <a href="/bastidores">Ver o case completo</a>
        </div>
      )}
      {targets.map((t) =>
        createPortal(
          <aside className="xray-note">
            <span className="xray-note-tag">DECISÃO {t.n}</span>
            <strong>{t.title}</strong>
            <p>{t.note}</p>
            <a href={`/bastidores#${t.id}`}>Por que assim →</a>
          </aside>,
          t.el,
          t.id + t.frame,
        ),
      )}
    </>
  )
}
