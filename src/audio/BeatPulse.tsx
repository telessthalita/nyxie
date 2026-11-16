import { useEffect } from 'react'
import { audioEngine, beatPhase } from './engine'
import './beat.css'

/**
 * Faz a página pulsar com a trilha. A cada quadro lê os graves e publica duas variáveis CSS
 * no <html>, e o CSS decide o que pulsa:
 *   --bass  energia contínua do grave, de 0 a 1
 *   --kick  pico curto em cada batida forte, de 0 a 1, que decai sozinho
 * Nenhum estado React muda por quadro: só duas propriedades de estilo.
 */
export function BeatPulse() {
  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let bass = 0
    let kick = 0
    let last = 0

    const frame = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016)
      last = t
      const raw = reduce.matches ? 0 : audioEngine.bass()
      // sobe rápido, desce devagar: parece "respirar" no compasso
      bass += (raw - bass) * (raw > bass ? 0.6 : 0.12)
      // A batida vem do relógio da trilha + BPM medido (cai sempre no tempo);
      // a força dela vem do grave real (some quando a música some).
      if (audioEngine.playing && !reduce.matches) {
        const phase = beatPhase(audioEngine.time)
        kick = Math.max(0, 1 - phase / 0.16) * Math.min(1, 0.35 + bass)
      } else {
        kick = Math.max(0, kick - dt * 5)
      }
      root.style.setProperty('--bass', bass.toFixed(3))
      root.style.setProperty('--kick', kick.toFixed(3))

      if (audioEngine.playing || bass > 0.001 || kick > 0) raf = requestAnimationFrame(frame)
      else {
        root.style.removeProperty('--bass')
        root.style.removeProperty('--kick')
        root.classList.remove('is-beating')
      }
    }

    const start = (playing: boolean) => {
      root.classList.toggle('is-beating', playing && !reduce.matches)
      if (playing) {
        cancelAnimationFrame(raf)
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }
    const off = audioEngine.subscribe(start)
    return () => {
      off()
      cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
