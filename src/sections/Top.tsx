import { useEffect, useRef, useState } from 'react'
import { FEATURED_STATS, MARQUEE, NAV, SOCIALS } from '../data'
import { Close, FloatingHeart, Heart, Logo, Pause, Play, SectionHeader, Sparkle, Sprite } from '../components/ui'

export function Navbar({ onMenu }: { onMenu: () => void }) {
  return (
    <nav className="navbar" aria-label="Principal">
      <Logo />
      <ul className="nav-links">
        {NAV.map((l) => (
          <li key={l.href}>
            <a className="nav-link" href={l.href}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <a className="btn btn-primary nav-cta" href="#lista">
        Entrar na lista
      </a>
      <button className="menu-btn" type="button" onClick={onMenu} aria-label="Abrir menu">
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}

export function MobileMenu({ open, onClose, onTrailer }: { open: boolean; onClose: () => void; onTrailer: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
      <span className="mobile-menu-glow" />
      <FloatingHeart x={82} y={18} size={56} tone="light" />
      <FloatingHeart x={6} y={30} size={48} tone="pink" delay={0.8} />
      <FloatingHeart x={88} y={55} size={52} tone="pink" delay={1.4} />
      <FloatingHeart x={10} y={82} size={44} tone="light" delay={0.4} />
      <div className="mobile-menu-top">
        <Logo small />
        <button className="round-close" type="button" onClick={onClose} aria-label="Fechar menu">
          <Close size={24} color="#0a0510" />
        </button>
      </div>
      <ul className="mobile-menu-links">
        {NAV.map((l, i) => (
          <li key={l.href}>
            <a href={l.href} onClick={onClose}>
              <span className="mobile-menu-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="mobile-menu-label">{l.label}</span>
              <Sparkle size={20} color={i % 2 ? '#c9a2f5' : '#ffa8cf'} />
            </a>
          </li>
        ))}
      </ul>
      <div className="mobile-menu-actions">
        <a className="btn btn-primary" href="#lista" onClick={onClose}>
          Entrar na lista
        </a>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            onClose()
            onTrailer()
          }}
        >
          Assistir ao trailer
        </button>
      </div>
      <ul className="socials">
        {SOCIALS.map((s) => (
          <li key={s}>
            <a href="#topo" onClick={onClose}>
              {s}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Hero({ onTrailer }: { onTrailer: () => void }) {
  return (
    <section className="hero" id="topo">
      <span className="glow glow-pink" />
      <span className="glow glow-purple" />
      <div className="hero-text">
        <p className="chip">
          <Sparkle size={16} color="#ffa8cf" />
          LISTA DE DESEJOS ABERTA · LANÇAMENTO 2027
        </p>
        <h1 className="hero-title">
          <span>NYXIE</span>
          <span className="hero-title-2">DEAD AIR</span>
        </h1>
        <p className="hero-sub">
          Um RPG de ritmo e ação onde cada batida é um golpe. Vista os fones assombrados, acorde o esqueleto da trilha e
          devolva o som à cidade que o silêncio engoliu.
        </p>
        <div className="hero-ctas">
          <a className="btn btn-primary" href="#lista">
            Adicionar à lista de desejos
          </a>
          <button className="btn btn-secondary" type="button" onClick={onTrailer}>
            Assistir ao trailer
          </button>
        </div>
        <div className="platforms">
          <span className="platforms-label">DISPONÍVEL EM</span>
          {['PC', 'PS5', 'SWITCH 2'].map((p) => (
            <span className="platform" key={p}>
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="hero-art-wrap">
        <div className="hero-art">
          <div className="aura" aria-hidden="true">
            <span className="aura-glow" />
            <span className="aura-ring aura-ring-1" />
            <span className="aura-ring aura-ring-2" />
            {Array.from({ length: 12 }, (_, i) => (
              <span
                className="aura-spark"
                key={i}
                style={{ ['--a' as string]: `${i * 30}deg`, ['--d' as string]: `${260 + (i % 3) * 50}px` }}
              >
                <Sparkle size={[26, 40, 20, 48][i % 4]} color={i % 2 ? '#c9a2f5' : '#ffa8cf'} />
              </span>
            ))}
          </div>
          <span className="ring ring-outer" />
          <span className="ring ring-inner" />
          <div className="hero-video">
            <Sprite
              src="/assets/hero-loop.mp4"
              crop={{ fw: 380, fh: 802, w: 1669, h: 931, x: -633, y: -98 }}
              alt="Nyxie em loop de animação"
            />
            <span className="badge badge-video">
              <Play size={14} color="#ffa8cf" />
              VÍDEO · LOOP 5s
            </span>
          </div>
          <Sparkle className="abs" size={30} color="#ffa8cf" style={{ left: 470, top: 230 }} />
          <Sparkle className="abs" size={22} color="#c9a2f5" style={{ left: 30, top: 330 }} />
          <Sparkle className="abs" size={24} color="#f06ba8" style={{ left: 300, top: 20 }} />
          <div className="mini-card" style={{ left: 0, top: 600, width: 248 }}>
            <span className="mini-card-tag">COMPANHEIRO</span>
            <strong>Bones, o fone assombrado</strong>
            <span className="mini-card-text">Um crânio que só obedece ao volume máximo.</span>
          </div>
          <div className="mini-card" style={{ left: 400, top: 330, width: 210 }}>
            <span className="mini-card-tag">CLASSE</span>
            <strong>Cantora Sombria</strong>
            <span className="mini-card-text">Ritmo · Magia sonora · Stealth</span>
          </div>
          <FloatingHeart x={3.3} y={11.25} size={54} tone="pink" />
          <FloatingHeart x={83.3} y={3.75} size={60} tone="light" delay={0.6} />
          <FloatingHeart x={86.7} y={58.75} size={52} tone="pink" delay={1.2} />
          <FloatingHeart x={5} y={67.5} size={48} tone="light" delay={1.8} />
          <FloatingHeart x={45} y={92.5} size={44} tone="pink" delay={0.9} />
        </div>
      </div>
    </section>
  )
}

export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div className="marquee-group" key={k}>
            {items.map((t, i) => (
              <span className="marquee-item" key={i}>
                {t}
                <Sparkle size={20} color="#0a0510" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

export function Featured() {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(5)

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) void v.play()
    else v.pause()
  }
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = ref.current
    if (!v) return
    const r = e.currentTarget.getBoundingClientRect()
    v.currentTime = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * duration
  }
  const pct = duration ? (time / duration) * 100 : 0

  return (
    <section className="section featured">
      <SectionHeader
        center
        eyebrow="EM DESTAQUE · GAMEPLAY"
        title="Veja a Nyxie em ação."
        text="Uma volta pelo quarto, ao vivo no motor do jogo: câmera solta, trilha tocando e cada passo no compasso."
      />
      <div className={`player${playing ? ' is-playing' : ''}`}>
        <video
          ref={ref}
          src="/assets/gameplay.mp4"
          poster="/assets/poster-gameplay.webp"
          playsInline
          loop
          preload="metadata"
          onClick={toggle}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 5)}
        />
        <span className="player-shade player-shade-top" />
        <span className="player-shade player-shade-bottom" />
        <span className="badge player-rec">
          <i />
          REC · GAMEPLAY
        </span>
        <span className="badge player-build">BUILD 0.4 · 60 FPS</span>
        <button className="play-btn" type="button" onClick={toggle} aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}>
          <span className="play-btn-disc">
            {playing ? <Pause size={52} color="#0a0510" /> : <Play size={52} color="#0a0510" />}
          </span>
        </button>
        <div className="player-info">
          <h3>Uma noite em Velvet Static</h3>
          <p>Exploração livre · hub da Nyxie · trilha “Dead Air (Lo-Fi Mix)”</p>
        </div>
        <span className="player-time">
          {fmt(time)} / {fmt(duration)}
        </span>
        <div className="timeline" onClick={seek} role="presentation">
          <span className="timeline-fill" style={{ width: `${pct}%` }} />
          <Heart className="timeline-handle" size={24} color="#ffa8cf" style={{ left: `${pct}%` }} />
        </div>
      </div>
      <ul className="stats-row scroll-row">
        {FEATURED_STATS.map((s) => (
          <li className="card stat-card" key={s.value}>
            <strong>{s.value}</strong>
            <span>{s.text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function TrailerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Trailer oficial">
      <button className="modal-scrim" type="button" onClick={onClose} aria-label="Fechar trailer" />
      <div className="modal-card">
        <span className="modal-glow" />
        <FloatingHeart x={-3.5} y={5.3} size={64} tone="light" />
        <FloatingHeart x={95.5} y={39.5} size={70} tone="pink" delay={0.5} />
        <FloatingHeart x={94.6} y={80.3} size={56} tone="light" delay={1.1} />
        <FloatingHeart x={-2.6} y={73.7} size={60} tone="pink" delay={1.6} />
        <FloatingHeart x={36.5} y={-9.2} size={52} tone="light" delay={0.8} />
        <FloatingHeart x={74.7} y={-7.9} size={56} tone="pink" delay={1.3} />
        <p className="modal-eyebrow">TRAILER OFICIAL</p>
        <h2 className="modal-title">Nyxie: Dead Air</h2>
        <button className="round-close modal-close" type="button" onClick={onClose} aria-label="Fechar trailer">
          <Close size={26} color="#0a0510" />
        </button>
        <video
          className="modal-video"
          src="/assets/gameplay.mp4"
          poster="/assets/poster-gameplay.webp"
          controls
          autoPlay
          loop
          playsInline
        />
      </div>
    </div>
  )
}
