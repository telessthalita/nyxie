import { useEffect, useRef, useState } from 'react'

const SRC = '/assets/trilha-dead-air.mp3'
const VOLUME = 0.45
const PREF_KEY = 'nyxie-trilha'

const readPref = () => {
  try {
    return localStorage.getItem(PREF_KEY) === 'on'
  } catch {
    return false
  }
}
const savePref = (on: boolean) => {
  try {
    localStorage.setItem(PREF_KEY, on ? 'on' : 'off')
  } catch {
    // sem armazenamento: só não lembra a escolha
  }
}

/**
 * Trilha sonora da landing. Começa desligada (navegadores bloqueiam som sem clique).
 * Se a pessoa já tinha ligado antes, volta a tocar no primeiro clique ou tecla na página.
 * Quando um vídeo com som começa, a trilha pausa e volta quando ele para.
 */
export function Soundtrack() {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [on, setOn] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const wantsOn = useRef(false)
  const pausedByVideo = useRef(false)

  const getAudio = () => {
    if (!audio.current) {
      const a = new Audio(SRC)
      a.loop = true
      a.volume = 0
      a.preload = 'auto'
      audio.current = a
    }
    return audio.current
  }

  const fadeId = useRef(0)
  const fade = (a: HTMLAudioElement, to: number, done?: () => void) => {
    const id = ++fadeId.current // um fade novo cancela o anterior (ex.: ligar no meio do desligar)
    const from = a.volume
    const start = performance.now()
    const step = (t: number) => {
      if (id !== fadeId.current) return
      const k = Math.min(1, (t - start) / 600)
      a.volume = from + (to - from) * k
      if (k < 1) requestAnimationFrame(step)
      else done?.()
    }
    requestAnimationFrame(step)
  }

  const play = async () => {
    const a = getAudio()
    try {
      await a.play()
      fade(a, VOLUME)
      setOn(true)
      setBlocked(false)
      return true
    } catch {
      setBlocked(true)
      return false
    }
  }

  const stop = () => {
    const a = audio.current
    setOn(false)
    if (!a) return
    fade(a, 0, () => a.pause())
  }

  const toggle = () => {
    if (on) {
      wantsOn.current = false
      savePref(false)
      stop()
    } else {
      wantsOn.current = true
      savePref(true)
      pausedByVideo.current = false
      void play()
    }
  }

  // Quem já tinha ligado a trilha: volta a tocar na primeira interação com a página.
  useEffect(() => {
    if (!readPref()) return
    wantsOn.current = true
    const resume = (e: Event) => {
      if ((e.target as Element | null)?.closest?.('.sound-toggle')) return
      if (wantsOn.current) void play()
      cleanup()
    }
    const cleanup = () => {
      window.removeEventListener('pointerdown', resume)
      window.removeEventListener('keydown', resume)
    }
    window.addEventListener('pointerdown', resume)
    window.addEventListener('keydown', resume)
    return cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Vídeo com som tocando: a trilha dá licença.
  useEffect(() => {
    const onPlay = (e: Event) => {
      const v = e.target
      if (!(v instanceof HTMLVideoElement) || v.muted) return
      if (audio.current && !audio.current.paused) {
        pausedByVideo.current = true
        stop()
      }
    }
    const onPause = (e: Event) => {
      if (!(e.target instanceof HTMLVideoElement) || !pausedByVideo.current || !wantsOn.current) return
      const otherPlaying = [...document.querySelectorAll('video')].some((v) => !v.paused && !v.muted)
      if (otherPlaying) return
      pausedByVideo.current = false
      void play()
    }
    document.addEventListener('play', onPlay, true)
    document.addEventListener('pause', onPause, true)
    document.addEventListener('emptied', onPause, true)
    return () => {
      document.removeEventListener('play', onPlay, true)
      document.removeEventListener('pause', onPause, true)
      document.removeEventListener('emptied', onPause, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => () => audio.current?.pause(), [])

  return (
    <button
      type="button"
      className={`sound-toggle${on ? ' is-on' : ''}${blocked ? ' is-blocked' : ''}`}
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Desligar trilha sonora' : 'Ligar trilha sonora'}
      title={on ? 'Desligar trilha' : 'Ligar trilha “Dead Air”'}
    >
      {on ? (
        <>
          <img className="sound-frame f1" src="/assets/sino-on-1.png" alt="" width={69} height={64} />
          <img className="sound-frame f2" src="/assets/sino-on-2.png" alt="" width={74} height={64} />
        </>
      ) : (
        <img src="/assets/sino-off.png" alt="" width={64} height={64} />
      )}
      <span className="sound-label" aria-hidden="true">
        {on ? 'TRILHA ON' : 'TRILHA OFF'}
      </span>
    </button>
  )
}
