import { useEffect, useRef, useState } from 'react'
import { audioEngine } from '../audio/engine'
import { onWake } from '../wake'

const PREF_KEY = 'nyxie-trilha'

const readPref = () => {
  try {
    // Ligada por padrão: só fica desligada se a pessoa desligou antes.
    return localStorage.getItem(PREF_KEY) !== 'off'
  } catch {
    return true
  }
}
const savePref = (on: boolean) => {
  try {
    localStorage.setItem(PREF_KEY, on ? 'on' : 'off')
  } catch {
    // sem armazenamento: só não lembra a escolha
  }
}

/** Liga a trilha a partir de qualquer lugar da página (ex.: o botão Jogar do HUD). */
export async function startSoundtrack() {
  wanted.on = true
  savePref(true)
  await audioEngine.play()
}
const wanted = { on: false, pausedByVideo: false }

/**
 * Botão da trilha sonora. Começa desligada (navegadores bloqueiam som sem clique).
 * Se a pessoa já tinha ligado antes, volta a tocar no primeiro clique ou tecla na página.
 * Quando um vídeo com som começa, a trilha pausa e volta quando ele para.
 */
export function Soundtrack() {
  const [on, setOn] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const button = useRef<HTMLButtonElement>(null)

  useEffect(() => audioEngine.subscribe(setOn), [])

  const play = async () => {
    try {
      await startSoundtrack()
      setBlocked(false)
    } catch {
      setBlocked(true)
    }
  }

  const toggle = () => {
    if (audioEngine.playing) {
      wanted.on = false
      savePref(false)
      audioEngine.pause()
    } else {
      wanted.pausedByVideo = false
      void play()
    }
  }

  // Trilha ligada por padrão. Tenta tocar ao abrir; os navegadores quase sempre bloqueiam
  // som antes de qualquer interação, então ela começa no primeiro toque, clique ou tecla.
  useEffect(() => {
    if (!readPref()) return
    wanted.on = true
    const cleanup = () => {
      window.removeEventListener('pointerdown', resume, true)
      window.removeEventListener('keydown', resume, true)
    }
    const resume = (e: Event) => {
      cleanup()
      if (button.current?.contains(e.target as Node)) return // o próprio botão já decide
      if (wanted.on && !audioEngine.playing) void play()
    }
    window.addEventListener('pointerdown', resume, true)
    window.addEventListener('keydown', resume, true)
    // Tenta assim que a página acorda (mexer o mouse, rolar...). Se o navegador ainda
    // não liberar o som, o clique ou a tecla de cima resolvem.
    const offWake = onWake(() => {
      if (wanted.on && !audioEngine.playing) audioEngine.play().then(cleanup, () => {})
    })
    return () => {
      offWake()
      cleanup()
    }
  }, [])

  // Vídeo com som tocando: a trilha dá licença.
  useEffect(() => {
    const onPlay = (e: Event) => {
      const v = e.target
      if (!(v instanceof HTMLVideoElement) || v.muted || !audioEngine.playing) return
      wanted.pausedByVideo = true
      audioEngine.pause()
    }
    const onPause = (e: Event) => {
      if (!(e.target instanceof HTMLVideoElement) || !wanted.pausedByVideo || !wanted.on) return
      const otherPlaying = [...document.querySelectorAll('video')].some((v) => !v.paused && !v.muted)
      if (otherPlaying) return
      wanted.pausedByVideo = false
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
  }, [])

  return (
    <button
      ref={button}
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
