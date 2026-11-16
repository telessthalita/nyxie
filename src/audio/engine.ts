/**
 * Motor de áudio da landing: uma trilha só, compartilhada por quem precisa dela.
 *
 *   <audio> ─► MediaElementSource ─┬─► Analyser (graves, para a página pulsar)
 *                                  └─► Gain (fade de volume) ─► alto-falante
 *
 * O analisador fica antes do volume: a página reage à música mesmo durante o fade.
 * O AudioContext só nasce no primeiro clique, porque os navegadores bloqueiam áudio antes disso.
 */

export const TRACK = {
  src: '/assets/trilha-dead-air.mp3',
  /** Medido na própria trilha por autocorrelação de onsets. */
  bpm: 120.25,
  /** Segundos até a primeira batida (inclui o silêncio de encoder do MP3). */
  firstBeat: 0.068,
}
export const BEAT = 60 / TRACK.bpm

/** Segundos desde a última batida, para um instante da trilha. */
export const beatPhase = (time: number) => {
  const t = time - TRACK.firstBeat
  return ((t % BEAT) + BEAT) % BEAT
}

const VOLUME = 0.45

type Listener = (playing: boolean) => void

class AudioEngine {
  private el: HTMLAudioElement | null = null
  private ctx: AudioContext | null = null
  private gain: GainNode | null = null
  private analyser: AnalyserNode | null = null
  private bins: Uint8Array<ArrayBuffer> | null = null
  private listeners = new Set<Listener>()
  private stopTimer = 0
  /** Intenção, não o estado do <audio>: o botão muda na hora, mesmo durante o fade de saída. */
  private active = false

  get playing() {
    return this.active
  }

  /** Posição na trilha, em segundos. */
  get time() {
    return this.el?.currentTime ?? 0
  }

  get duration() {
    return this.el?.duration || 30.77
  }

  private setup() {
    if (this.el) return
    const el = new Audio(TRACK.src)
    el.loop = true
    el.preload = 'auto'
    el.crossOrigin = 'anonymous'
    this.el = el

    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return // sem Web Audio: a trilha toca, só a página não pulsa
    const ctx = new Ctx()
    const source = ctx.createMediaElementSource(el)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 512
    analyser.smoothingTimeConstant = 0.6
    const gain = ctx.createGain()
    gain.gain.value = 0
    source.connect(analyser)
    source.connect(gain).connect(ctx.destination)
    this.ctx = ctx
    this.gain = gain
    this.analyser = analyser
    this.bins = new Uint8Array(analyser.frequencyBinCount)
  }

  async play() {
    this.setup()
    const el = this.el!
    window.clearTimeout(this.stopTimer)
    // Primeiro o <audio>: se o navegador bloquear som sem interação, ele recusa na hora
    // (em vez de deixar o AudioContext esperando para sempre).
    await el.play()
    await this.ctx?.resume()
    this.active = true
    this.emit()
    if (this.gain && this.ctx) {
      const g = this.gain.gain
      g.cancelScheduledValues(this.ctx.currentTime)
      g.setTargetAtTime(VOLUME, this.ctx.currentTime, 0.15)
    } else {
      el.volume = VOLUME
    }
  }

  pause() {
    const el = this.el
    if (!el || !this.active) return
    this.active = false
    this.emit()
    if (this.gain && this.ctx) {
      const g = this.gain.gain
      g.cancelScheduledValues(this.ctx.currentTime)
      g.setTargetAtTime(0, this.ctx.currentTime, 0.12)
      window.clearTimeout(this.stopTimer)
      this.stopTimer = window.setTimeout(() => el.pause(), 500)
    } else {
      el.pause()
    }
  }

  /**
   * Energia dos graves agora, de 0 a 1. As faixas de ~40 a ~250 Hz carregam bumbo e baixo,
   * que é o que o ouvido sente como "a batida".
   */
  bass() {
    if (!this.analyser || !this.bins || !this.el || this.el.paused) return 0
    this.analyser.getByteFrequencyData(this.bins)
    const hz = this.ctx!.sampleRate / this.analyser.fftSize
    const from = Math.max(1, Math.floor(40 / hz))
    const to = Math.ceil(250 / hz)
    let sum = 0
    for (let i = from; i <= to; i++) sum += this.bins[i]
    return sum / ((to - from + 1) * 255)
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn)
    return () => {
      this.listeners.delete(fn)
    }
  }

  private emit() {
    this.listeners.forEach((fn) => fn(this.playing))
  }
}

export const audioEngine = new AudioEngine()

// Só em desenvolvimento: permite testar o sincronismo pelo console.
if (import.meta.env.DEV) (window as unknown as { __nyxieAudio: AudioEngine }).__nyxieAudio = audioEngine
