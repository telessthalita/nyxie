import { useEffect } from 'react'
import { Heart, Logo, Sparkle } from '../components/ui'
import { Footer } from '../sections/Bottom'
import { DECISIONS, NUMBERS, PIPELINE, STACK } from './decisions'

const ROLES = [
  {
    who: 'biatriz',
    role: 'Design',
    text: 'Layout em três tamanhos de tela, componentes com variantes, protótipo e direção de arte no Figma.',
    color: '#c9a2f5',
  },
  {
    who: 'Thalita Teles',
    role: 'Direção técnica e entrega',
    text: 'Definição de escopo, revisão do que foi construído, decisões de produto (como a lista simulada), versionamento e publicação.',
    color: '#f06ba8',
    href: 'https://telessthalita.com.br/',
  },
  {
    who: 'Claude',
    role: 'Desenvolvimento assistido por IA',
    text: 'Leitura do arquivo do Figma e implementação do código, guiada e revisada a cada etapa.',
    color: '#ffa8cf',
  },
]

export function Bastidores() {
  useEffect(() => {
    document.title = 'Bastidores · Nyxie: Dead Air'
    // Vindo de uma nota do Raio-X: espera as fontes carregarem para rolar até a decisão certa.
    const id = window.location.hash.slice(1)
    if (!id) return
    history.scrollRestoration = 'manual'
    void document.fonts.ready.then(() =>
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }), 50),
    )
  }, [])

  return (
    <div className="bts">
      <nav className="navbar" aria-label="Principal">
        <Logo />
        <a className="btn btn-secondary bts-back" href="/">
          ← Voltar<span className="bts-back-long"> para a landing</span>
        </a>
      </nav>

      <main>
        <header className="bts-hero">
          <span className="glow glow-pink" />
          <p className="eyebrow">BASTIDORES · CASE DE DESENVOLVIMENTO</p>
          <h1>
            Do Figma ao ar,
            <br />
            <span>com uma decisão em cada camada.</span>
          </h1>
          <p className="bts-lead">
            A landing do Nyxie chegou pronta no Figma. Transformar o design em site exigiu escolher stack, estrutura,
            o que otimizar e o que deixar de fora. Esta página mostra essas escolhas e o porquê de cada uma.
          </p>
          <p className="bts-tip">
            <Sparkle size={16} color="#ffa8cf" />
            Na landing, aperte <kbd>X</kbd> ou use o botão <strong>Raio-X</strong> para ver as decisões em cima de
            cada seção.
          </p>
        </header>

        <section className="section bts-section" aria-labelledby="bts-quem">
          <header className="section-header">
            <p className="eyebrow">QUEM FEZ O QUÊ</p>
            <h2 className="section-title" id="bts-quem">
              Três papéis, uma entrega.
            </h2>
          </header>
          <ul className="bts-roles">
            {ROLES.map((r) => (
              <li className="card" key={r.who} style={{ borderTopColor: r.color }}>
                <span className="bts-role" style={{ color: r.color }}>
                  {r.role.toUpperCase()}
                </span>
                <h3>{r.href ? <a href={r.href}>{r.who}</a> : r.who}</h3>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section bts-section alt" aria-labelledby="bts-processo">
          <header className="section-header">
            <p className="eyebrow">O CAMINHO</p>
            <h2 className="section-title" id="bts-processo">
              Do arquivo ao link.
            </h2>
          </header>
          <ol className="bts-pipeline">
            {PIPELINE.map((p, i) => (
              <li key={p.title}>
                <span className="step-n">{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
          <ul className="bts-numbers">
            {NUMBERS.map((n) => (
              <li className="card" key={n.label}>
                <strong>{n.value}</strong>
                <span>{n.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="section bts-section" aria-labelledby="bts-decisoes">
          <header className="section-header">
            <p className="eyebrow">REGISTRO DE DECISÕES</p>
            <h2 className="section-title" id="bts-decisoes">
              Nove escolhas que não estavam no Figma.
            </h2>
            <p className="section-lead">
              O design diz como a página parece. Estas decisões dizem como ela é construída, mantida e entregue.
            </p>
          </header>
          <ol className="bts-decisions">
            {DECISIONS.map((d) => (
              <li className="card bts-decision" id={d.id} key={d.id}>
                <div className="bts-decision-head">
                  <span className="bts-decision-n">{d.n}</span>
                  <span className="bts-area">{d.area}</span>
                </div>
                <h3>{d.title}</h3>
                <dl>
                  <div>
                    <dt>Contexto</dt>
                    <dd>{d.context}</dd>
                  </div>
                  <div className="is-key">
                    <dt>Decisão</dt>
                    <dd>{d.decision}</dd>
                  </div>
                  <div>
                    <dt>Descartado</dt>
                    <dd>{d.rejected}</dd>
                  </div>
                  <div>
                    <dt>Custo assumido</dt>
                    <dd>{d.tradeoff}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </section>

        <section className="section bts-section alt bts-stack" aria-labelledby="bts-stack">
          <p className="eyebrow" id="bts-stack">
            STACK FINAL
          </p>
          <ul>
            {STACK.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <a className="btn btn-primary" href="/">
            <Heart size={18} color="#0a0510" />
            &nbsp;Ver a landing com Raio-X
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}
