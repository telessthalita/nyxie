import { useState } from 'react'
import type { FormEvent } from 'react'
import { EDITIONS, FAQ, HUB_ITEMS, NAV, SOCIALS, WORLDS } from '../data'
import { FloatingHeart, Heart, Logo, Play, SectionDivider, SectionHeader, Sprite } from '../components/ui'

export function Worlds() {
  return (
    <section className="section has-divider" id="mundos">
      <SectionDivider />
      <SectionHeader eyebrow="CAPÍTULO 04 · MUNDOS" title="Quatro mundos. Quatro playlists." />
      <ul className="worlds scroll-row">
        {WORLDS.map((w) => (
          <li
            className="world hoverable"
            key={w.n}
            style={{ background: `linear-gradient(180deg, ${w.from}, ${w.to})` }}
          >
            <span className="vinyl v1" />
            <span className="vinyl v2" />
            <span className="vinyl v3" />
            <span className="world-n">{w.n}</span>
            <div className="world-body">
              <span className="bpm">{w.bpm}</span>
              <h3>{w.name}</h3>
              <p>{w.text}</p>
              <p className="world-boss">
                <Heart size={16} color="#ffeaf4" />
                {w.boss}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Hub() {
  return (
    <section className="hub">
      <img className="hub-bg" src="/assets/hub-walk.webp" alt="Nyxie andando pelo quarto, o hub do jogo" loading="lazy" />
      <span className="hub-overlay" />
      <span className="badge hub-badge">
        <Play size={14} color="#ffa8cf" />
        GAMEPLAY · VÍDEO 5s
      </span>
      <div className="hub-text">
        <p className="eyebrow">O HUB · O QUARTO DA NYXIE</p>
        <h2>Entre no quarto. Saia com o set perfeito.</h2>
        <p>
          Entre uma descida e outra, Nyxie volta para casa: customize fones e roupas, decore as paredes com troféus de
          chefes e chame um amigo para o duelo de dueto.
        </p>
        <ul className="check-list">
          {HUB_ITEMS.map((t) => (
            <li key={t}>
              <Heart size={18} color="#f06ba8" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Editions() {
  return (
    <section className="section alt" id="edicoes">
      <SectionHeader
        eyebrow="CAPÍTULO 05 · EDIÇÕES"
        title="Escolha sua edição."
        text="Pré-venda abre junto com o beta fechado. Quem entra na lista de desejos recebe a skin “Noite Clássica” de graça."
      />
      <ul className="editions scroll-row">
        {EDITIONS.map((e) => (
          <li className={`card edition hoverable${e.featured ? ' is-featured' : ''}`} key={e.name}>
            <div className="edition-head">
              <h3>{e.name}</h3>
              {e.featured && <span className="tag">MAIS POPULAR</span>}
            </div>
            <p className="edition-price">{e.price}</p>
            <p className="edition-text">{e.text}</p>
            <hr />
            <ul className="check-list">
              {e.items.map((t) => (
                <li key={t}>
                  <Heart size={18} color="#f06ba8" />
                  {t}
                </li>
              ))}
            </ul>
            <a className={`btn ${e.featured ? 'btn-primary' : 'btn-secondary'}`} href="#lista">
              Adicionar à lista
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="section has-divider faq" id="faq">
      <SectionDivider />
      <header className="section-header faq-header">
        <p className="eyebrow">FAQ</p>
        <h2 className="section-title">Dúvidas antes de apertar o play.</h2>
      </header>
      <ul className="faq-list">
        {FAQ.map((f, i) => {
          const isOpen = open === i
          return (
            <li className={`card faq-item${isOpen ? ' is-open' : ''}`} key={f.q}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {f.q}
                  <span className="faq-icon" aria-hidden="true" />
                </button>
              </h3>
              <div className="faq-answer" id={`faq-${i}`} role="region">
                <p>{f.a}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

const WAITLIST_KEY = 'nyxie-waitlist-email'

export function FinalCta() {
  // Simulação: nada é enviado para servidor. O e-mail fica só no navegador de quem preencheu.
  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem(WAITLIST_KEY) ?? ''
    } catch {
      return ''
    }
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>(email ? 'done' : 'idle')
  const sent = status === 'done'

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = String(new FormData(e.currentTarget).get('email') ?? '').trim()
    if (!value || status === 'sending') return
    setStatus('sending')
    // Espera falsa, só para parecer um envio de verdade.
    window.setTimeout(() => {
      try {
        localStorage.setItem(WAITLIST_KEY, value)
      } catch {
        // sem armazenamento disponível: segue só com o estado em memória
      }
      setEmail(value)
      setStatus('done')
    }, 1200)
  }
  const reset = () => {
    try {
      localStorage.removeItem(WAITLIST_KEY)
    } catch {
      // nada a limpar
    }
    setEmail('')
    setStatus('idle')
  }
  return (
    <section className="final-cta" id="lista">
      <div className="cta-card">
        <FloatingHeart x={50} y={4.4} size={64} tone="light" />
        <FloatingHeart x={72.1} y={44.2} size={54} tone="light" delay={0.7} />
        <FloatingHeart x={92.1} y={4.4} size={70} tone="light" delay={1.3} />
        <FloatingHeart x={45.7} y={59} size={60} tone="dark" delay={0.4} />
        <FloatingHeart x={80.7} y={8.8} size={46} tone="dark" delay={1.7} />
        <FloatingHeart x={1.7} y={2.4} size={50} tone="dark" delay={1} />
        <FloatingHeart x={37.1} y={3.5} size={56} tone="pink" delay={0.2} />
        <FloatingHeart x={64.3} y={63.4} size={66} tone="pink" delay={1.5} />
        <FloatingHeart x={95} y={62} size={52} tone="pink" delay={0.9} />
        <div className="cta-text">
          <p className="eyebrow dark">LISTA DE ESPERA · BETA FECHADO</p>
          <h2>Entre na plateia.</h2>
          <p className="cta-lead">
            Deixe seu e-mail e receba o convite do beta, trilhas inéditas e a skin “Noite Clássica” no dia do
            lançamento.
          </p>
          {sent ? (
            <div className="cta-done" role="status">
              <p>
                <Heart size={20} color="#0a0510" /> Você está na plateia!
              </p>
              <p className="cta-done-text">
                O convite do beta vai para <strong>{email}</strong> quando as portas abrirem.
              </p>
              <button className="cta-reset" type="button" onClick={reset}>
                Usar outro e-mail
              </button>
            </div>
          ) : (
            <form className="email-form" onSubmit={onSubmit} aria-busy={status === 'sending'}>
              <label className="sr-only" htmlFor="email">
                Seu e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="seu@email.com"
                autoComplete="email"
                readOnly={status === 'sending'}
              />
              <button className="btn btn-dark" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Enviando...' : 'Quero o beta'}
              </button>
            </form>
          )}
          <p className="cta-note">
            {sent
              ? 'Simulação de estudo: nenhum e-mail é enviado nem guardado em servidor.'
              : 'Sem spam. Só música alta e novidades do jogo.'}
          </p>
        </div>
        <Sprite
          src="/assets/poses.webp"
          crop={{ fw: 397, fh: 622, w: 2363, h: 1329, x: -1883, y: -688 }}
          className="cta-pose"
          blend
          alt="Nyxie comemorando de braços abertos"
        />
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Logo small />
        <ul className="footer-links">
          {NAV.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
          <li>
            <a className="footer-bts" href="/bastidores">
              {'</>'} Bastidores
            </a>
          </li>
        </ul>
        <ul className="socials">
          {SOCIALS.map((s) => (
            <li key={s}>
              <a href="#topo">{s}</a>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="footer-legal">
        <p>© 2027 Dead Air Studio. Projeto conceitual: estúdio, jogo e preços são fictícios.</p>
        <p className="footer-credit">
          Todos os direitos reservados · Desenvolvido por
          <img src="/assets/logo-biatriz.webp" alt="Biatriz" width={60} height={17} />
          e
          <a
            className="footer-tt"
            href="https://telessthalita.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Thalita Teles, abrir site em nova aba"
          >
            <img src="/assets/tt.svg" alt="TT" width={22} height={22} />
          </a>
        </p>
      </div>
    </footer>
  )
}
