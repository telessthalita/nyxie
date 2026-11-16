import { useEffect, useRef, useState } from 'react'
import { HUD_NOTES } from '../data'
import { Close, Heart, Play } from '../components/ui'
import { audioEngine, BEAT, TRACK } from '../audio/engine'
import { startSoundtrack } from '../components/Soundtrack'

/** Quais batidas de cada compasso (4 tempos) viram nota. Pausas deixam jogável. */
const PATTERN = [1, 1, 1, 0, 1, 0, 1, 1]
/** Quanto tempo a nota leva da direita até o anel. */
const LOOKAHEAD = BEAT * 4
/** Janelas de acerto, em segundos de distância da batida. */
const PERFECT = 0.07
const GOOD = 0.14
const MISS = 0.2
const POOL = 12

type Judgement = { text: string; tone: 'perfect' | 'good' | 'miss'; id: number }

/** Batidas de uma volta da trilha que viram nota. */
function beatMap(duration: number) {
  const times: number[] = []
  for (let k = 0; ; k++) {
    const t = TRACK.firstBeat + k * BEAT
    if (t > duration - 0.15) break
    if (PATTERN[k % PATTERN.length]) times.push(t)
  }
  return times
}

/**
 * HUD da seção de jogabilidade. Parado, é a ilustração do Figma.
 * Jogando, as notas correm sincronizadas pelo relógio da trilha (não por timers):
 * a posição de cada nota é calculada a partir do currentTime do áudio a cada quadro,
 * então ela nunca escorrega do tempo, mesmo se a aba travar.
 */
export function HudGame() {
  const [active, setActive] = useState(false)
  const [judgement, setJudgement] = useState<Judgement | null>(null)
  const [combo, setCombo] = useState(0)
  const [best, setBest] = useState(0)
  const hud = useRef<HTMLDivElement>(null)
  const hit = useRef<HTMLSpanElement>(null)
  const notes = useRef<(HTMLSpanElement | null)[]>([])
  const game = useRef({ hits: new Set<number>(), misses: new Set<number>(), loops: 0, lastTime: 0, combo: 0 })

  // Música desligada pelo botão do sino: o jogo para junto.
  useEffect(() => audioEngine.subscribe((playing) => !playing && setActive(false)), [])

  useEffect(() => {
    if (!active) return
    const g = game.current
    g.hits.clear()
    g.misses.clear()
    g.loops = 0
    g.lastTime = audioEngine.time
    g.combo = 0
    setCombo(0)
    setJudgement(null)

    const map = beatMap(audioEngine.duration)
    const dur = audioEngine.duration
    /** Tempo contínuo: soma as voltas da trilha em loop. */
    const now = () => {
      const t = audioEngine.time
      if (t + 1 < g.lastTime) g.loops++
      g.lastTime = t
      return g.loops * dur + t
    }
    const upcoming = (from: number, to: number) => {
      const out: number[] = []
      for (let loop = Math.floor(from / dur); loop <= Math.floor(to / dur); loop++)
        for (const t of map) {
          const abs = loop * dur + t
          if (abs >= from && abs <= to) out.push(abs)
        }
      return out
    }

    const ring = hit.current
    let judgeId = 0
    const judge = (text: string, tone: Judgement['tone']) => setJudgement({ text, tone, id: ++judgeId })

    let raf = 0
    const frame = () => {
      const el = hud.current
      if (!el || !ring) return
      const t = now()
      // primeiro todas as leituras de layout, depois as escritas (evita recalcular layout por nota)
      const width = el.clientWidth
      const hitX = ring.offsetLeft + ring.offsetWidth / 2
      const noteW = notes.current[0]?.offsetWidth ?? 52
      const startX = width - 40
      const visible = upcoming(t - MISS, t + LOOKAHEAD)

      // nota que passou do anel sem ser tocada: erro e combo zerado
      for (const n of upcoming(t - 1, t - MISS))
        if (!g.hits.has(n) && !g.misses.has(n)) {
          g.misses.add(n)
          g.combo = 0
          setCombo(0)
          judge('ERROU', 'miss')
        }

      let i = 0
      for (const n of visible) {
        if (g.hits.has(n) || i >= POOL) continue
        const node = notes.current[i++]
        if (!node) continue
        const x = hitX + ((n - t) / LOOKAHEAD) * (startX - hitX)
        node.style.display = ''
        node.style.transform = `translateX(${(x - noteW / 2).toFixed(1)}px)`
        node.style.opacity = n < t - 0.05 ? '0.35' : '1'
        node.dataset.tone = Math.round((n - TRACK.firstBeat) / BEAT) % 2 ? 'b' : 'a'
      }
      for (; i < POOL; i++) if (notes.current[i]) notes.current[i]!.style.display = 'none'
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const tap = () => {
      const t = now()
      const candidates = upcoming(t - MISS, t + MISS).filter((n) => !g.hits.has(n) && !g.misses.has(n))
      if (!candidates.length) return
      const n = candidates.reduce((a, b) => (Math.abs(b - t) < Math.abs(a - t) ? b : a))
      const d = Math.abs(n - t)
      g.hits.add(n)
      ring?.classList.remove('is-hit')
      void ring?.offsetWidth // reinicia a animação do anel
      ring?.classList.add('is-hit')
      if (d <= GOOD) {
        g.combo++
        setCombo(g.combo)
        setBest((b) => Math.max(b, g.combo))
        if (d <= PERFECT) judge('¡PERFEITO!', 'perfect')
        else judge('BOM!', 'good')
      } else {
        g.combo = 0
        setCombo(0)
        judge('QUASE', 'miss')
      }
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return setActive(false)
      if (e.repeat || !['Space', 'Enter', 'KeyF', 'KeyJ'].includes(e.code)) return
      const typing = e.target instanceof Element && e.target.closest('input, textarea, select, button, a')
      if (typing && e.code !== 'Space') return
      e.preventDefault() // espaço não rola a página durante o jogo
      tap()
    }
    const onPointer = (e: PointerEvent) => {
      if ((e.target as Element).closest('.hud-exit')) return
      tap()
    }
    const el = hud.current
    window.addEventListener('keydown', onKey)
    el?.addEventListener('pointerdown', onPointer)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
      el?.removeEventListener('pointerdown', onPointer)
    }
  }, [active])

  const start = async () => {
    try {
      if (!audioEngine.playing) await startSoundtrack()
      setActive(true)
      hud.current?.focus({ preventScroll: true })
    } catch {
      // navegador bloqueou o áudio: o botão continua lá para tentar de novo
    }
  }

  return (
    <div
      ref={hud}
      className={`card hud${active ? ' is-playing' : ''}`}
      tabIndex={active ? -1 : undefined}
      aria-label={active ? 'Mini-jogo de ritmo em andamento' : undefined}
    >
      <span className="hud-glow" aria-hidden="true" />
      <span className="hud-lane" aria-hidden="true" />
      <span className="hud-hit" ref={hit} aria-hidden="true" />

      {active
        ? Array.from({ length: POOL }, (_, i) => (
            <span
              className="hud-note is-live"
              key={i}
              ref={(n) => {
                notes.current[i] = n
              }}
              style={{ display: 'none' }}
              aria-hidden="true"
            >
              <Heart size={22} color="#0a0510" />
            </span>
          ))
        : HUD_NOTES.map((n, i) => (
            <span className="hud-note" key={i} style={{ left: `${(n.x / 1400) * 100}%`, background: n.color }} aria-hidden="true">
              <Heart size={22} color="#0a0510" style={{ opacity: n.op }} />
            </span>
          ))}

      <span className={`hud-judgement${judgement ? ` is-${judgement.tone}` : ''}`} key={judgement?.id ?? 0} aria-hidden="true">
        {active ? judgement?.text ?? 'NO TEMPO!' : '¡PERFEITO!'}
      </span>
      <span className="hud-combo" aria-hidden="true">
        <small>COMBO</small>x{active ? combo : 24}
      </span>
      <span className="hud-volume" aria-hidden="true">
        <small>{active && best ? `MELHOR COMBO: x${best}` : 'VOLUME DO BAIXO'}</small>
        <span className="bar">
          <span style={{ width: '75%' }} />
        </span>
      </span>

      {active ? (
        <button className="hud-exit" type="button" onClick={() => setActive(false)} aria-label="Sair do mini-jogo">
          <Close size={18} color="#ffeaf4" />
        </button>
      ) : (
        <div className="hud-start">
          <button className="btn btn-primary" type="button" onClick={start}>
            <Play size={18} color="#0a0510" />
            &nbsp;Jogar no ritmo
          </button>
          <p>
            Toque ou aperte <kbd>espaço</kbd> quando o coração chegar no anel.
          </p>
        </div>
      )}
    </div>
  )
}
