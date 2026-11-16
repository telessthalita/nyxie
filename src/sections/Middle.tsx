import { useState } from 'react'
import type { CSSProperties } from 'react'
import { CHAPTERS, CHAR_STATS, HUD_NOTES, KIT, PILLARS, POSES, RUN_STEPS, SKINS, TURNTABLE } from '../data'
import { Heart, Play, SectionDivider, SectionHeader, Sparkle, Sprite } from '../components/ui'

export function Story() {
  return (
    <section className="section" id="historia">
      <SectionHeader eyebrow="CAPÍTULO 01 · A HISTÓRIA" title="A cidade onde o silêncio venceu." />
      <div className="story-row">
        <div className="story-text">
          <p className="strong">
            Em Velvet Static, a cidade nunca dormia, porque nunca parava de tocar. Até a noite do Grande Apagão: um
            silêncio denso, quase vivo, engoliu cada rádio, cada palco, cada voz.
          </p>
          <p>
            Nyxie era só a garota dos fones de gatinho que cantava nos becos. Quando o silêncio levou a irmã dela, os
            fones tossiram uma risada: dentro deles vivia Bones, um crânio que sobreviveu ao último show do mundo.
          </p>
          <p>
            Agora cada batida é um golpe e cada refrão é um feitiço. Para trazer a música de volta, Nyxie precisa descer
            ao Subsolo, onde o Silêncio guarda tudo o que roubou.
          </p>
          <blockquote className="quote">
            <p>“Se o mundo ficou mudo, eu aumento o volume.”</p>
            <cite>— NYXIE, CAPÍTULO 1</cite>
          </blockquote>
        </div>
        <ul className="chapter-cards">
          {CHAPTERS.map((c, i) => (
            <li className={`card chapter-card hoverable${i === 0 ? ' is-active' : ''}`} key={c.n}>
              <span className="chapter-n">{c.n}</span>
              <div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Character() {
  return (
    <section className="section alt" id="personagem">
      <SectionHeader eyebrow="CAPÍTULO 02 · A PERSONAGEM" title="Conheça Nyxie, a cantora que não pede licença." />
      <div className="character-row">
        <div className="arch-video">
          <Sprite
            src="/assets/giro-360.mp4"
            crop={{ fw: 400, fh: 830, w: 1488, h: 830, x: -525, y: 0 }}
            alt="Nyxie girando 360 graus"
          />
        </div>
        <div className="character-info">
          <div className="character-head">
            <p className="eyebrow lilac small">FICHA DA PERSONAGEM</p>
            <h3>Nyxie “Noite” Valência</h3>
            <p>
              17 anos · cantora de rua · portadora dos fones Bones. Doce por fora, barulhenta por dentro: o que ela não
              resolve na conversa, resolve no refrão.
            </p>
          </div>
          <ul className="char-stats">
            {CHAR_STATS.map((s) => (
              <li key={s.label}>
                <div className="char-stat-head">
                  <span>{s.label}</span>
                  <span className="char-stat-value">{s.value}</span>
                </div>
                <div className="bar">
                  <span style={{ width: `${s.value * 0.73}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <ul className="kit">
            {KIT.map((k) => (
              <li key={k.label}>
                <Sprite src="/assets/character-sheet.webp" crop={k.crop} className="kit-detail" alt={k.label} />
                <span>{k.label}</span>
              </li>
            ))}
          </ul>
          <div className="card skill">
            <span className="icon-disc" style={{ background: '#f06ba8', width: 64, height: 64 }}>
              <Sparkle size={30} color="#0a0510" />
            </span>
            <div>
              <p className="eyebrow tiny">GOLPE ASSINATURA</p>
              <h4>Drop do Baixo</h4>
              <p>Segure o compasso por 4 tempos e solte: Bones abre a boca e o volume vira onda de choque.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card turntable">
        <div className="turntable-head">
          <p className="eyebrow big">GIRO 360° · POSES</p>
          <p className="turntable-hint">Cinco ângulos, cinco humores da personagem</p>
        </div>
        <ul className="turntable-views scroll-row">
          {TURNTABLE.map((v) => (
            <li key={v.label}>
              <Sprite src="/assets/poses-strip.webp" crop={v.crop} blend alt={`Nyxie, pose ${v.label}`} />
              <span>{v.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Skins() {
  const [index, setIndex] = useState(0)
  const skin = SKINS[index]
  return (
    <section className="section darkest">
      <SectionHeader
        eyebrow="PERSONALIZAÇÃO · 10 VISUAIS"
        title="Qual é o seu visual?"
        text="Cada cor muda a Nyxie, o palco e o bônus de set. Escolha um visual para ver a troca."
      />
      <div className="skins" style={{ ['--skin' as string]: skin.color } as CSSProperties}>
        <div className="skin-stage" style={{ background: skin.bg }}>
          {SKINS.map((s, i) => (
            <div className={`skin-char${i === index ? ' is-active' : ''}`} style={{ background: s.bg }} key={s.id}>
              <Sprite src="/assets/skins.webp" crop={s.crop} blend alt={i === index ? `Nyxie no visual ${s.name}` : ''} />
              <span className="skin-mask left" style={{ background: s.bg }} />
              <span className="skin-mask right" style={{ background: s.bg }} />
            </div>
          ))}
          <span className="skin-ring" />
          <Heart className="abs" size={34} color={skin.color} style={{ left: '6.8%', top: '8.6%', rotate: '12deg' }} />
          <Heart className="abs" size={26} color={skin.color} style={{ left: '84%', top: '17%', rotate: '-12deg' }} />
          <Heart className="abs" size={40} color={skin.color} style={{ left: '85.7%', top: '74.3%', rotate: '-10deg' }} />
          <Heart className="abs" size={24} color={skin.color} style={{ left: '7.1%', top: '80%', rotate: '8deg' }} />
          <span className="skin-flash" key={skin.id} />
        </div>
        <div className="skin-panel" aria-live="polite">
          <p className="skin-counter">
            VISUAL {String(index + 1).padStart(2, '0')}/{SKINS.length}
          </p>
          <h3 className="skin-name">{skin.name}</h3>
          <p className="skin-tagline">{skin.tagline}</p>
          <p className="skin-perk">
            <Heart size={18} color={skin.color} />
            {skin.perk}
          </p>
          <p className="skin-label">ESCOLHA A COR</p>
          <div className="swatches" role="radiogroup" aria-label="Cor do visual">
            {SKINS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={i === index}
                aria-label={s.name}
                title={s.name}
                className={`swatch${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
              >
                <span style={{ background: s.color, borderColor: s.bg }} />
              </button>
            ))}
          </div>
          <p className="skin-hint">Clique em uma cor para trocar o visual da Nyxie.</p>
        </div>
      </div>
    </section>
  )
}

export function Poses() {
  return (
    <section className="section has-divider">
      <SectionDivider />
      <SectionHeader eyebrow="GALERIA · EXPRESSÕES" title="Doce por fora. Barulhenta por dentro." />
      <ul className="pose-cards scroll-row">
        <li className="pose-card wide hoverable">
          <Sprite
            src="/assets/poster-poses.webp"
            crop={{ fw: 428, fh: 332, w: 596, h: 332, x: -54, y: 0 }}
            className="pose-frame"
            alt="Nyxie em várias poses"
          >
            <span className="badge badge-video">
              <Play size={14} color="#ffa8cf" />
              ANIMAÇÃO · VÍDEO
            </span>
          </Sprite>
          <div className="pose-caption left">
            <h3>Nyxie em movimento</h3>
            <p>CICLO DE POSES · 5s</p>
          </div>
        </li>
        {POSES.map((p) => (
          <li className="pose-card hoverable" key={p.title}>
            <Sprite src="/assets/poses.webp" crop={p.crop} className="pose-frame" blend alt={`Nyxie: ${p.title}`} />
            <div className="pose-caption">
              <h3>{p.title}</h3>
              <p>{p.tag}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Gameplay() {
  return (
    <section className="section alt" id="jogabilidade">
      <SectionHeader
        eyebrow="CAPÍTULO 03 · JOGABILIDADE"
        title="Cada batida é um golpe."
        text="Nyxie: Dead Air mistura combate em tempo real com ritmo. Acerte o tempo, encadeie combos e transforme a trilha em arma."
      />
      <div className="card hud" aria-hidden="true">
        <span className="hud-glow" />
        <span className="hud-lane" />
        <span className="hud-hit" />
        {HUD_NOTES.map((n, i) => (
          <span className="hud-note" key={i} style={{ left: `${(n.x / 1400) * 100}%`, background: n.color }}>
            <Heart size={22} color="#0a0510" style={{ opacity: n.op }} />
          </span>
        ))}
        <span className="hud-judgement">¡PERFEITO!</span>
        <span className="hud-combo">
          <small>COMBO</small>
          x24
        </span>
        <span className="hud-volume">
          <small>VOLUME DO BAIXO</small>
          <span className="bar">
            <span style={{ width: '75%' }} />
          </span>
        </span>
      </div>
      <ul className="pillars scroll-row">
        {PILLARS.map((p) => (
          <li className="card pillar hoverable" key={p.title}>
            <span className="icon-disc" style={{ background: p.color }}>
              {p.icon === 'heart' ? <Heart size={26} color="#0a0510" /> : <Sparkle size={26} color="#0a0510" />}
            </span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ul>
      <div className="card run-loop">
        <p className="eyebrow">O CICLO DE UMA RUN</p>
        <ol>
          {RUN_STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="step-n">{i + 1}</span>
              <div>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
              {i < RUN_STEPS.length - 1 && <Sparkle className="step-sep" size={22} color="#c9a2f5" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
