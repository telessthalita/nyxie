import type { CSSProperties, ReactNode } from 'react'
import type { Crop } from '../data'

type IconProps = { size?: number; color?: string; className?: string; style?: CSSProperties }

const svg = (size: number, className: string | undefined, style: CSSProperties | undefined, children: ReactNode) => (
  <svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    {children}
  </svg>
)

export const Heart = ({ size = 24, color = 'currentColor', className, style }: IconProps) =>
  svg(
    size,
    className,
    style,
    <path
      fill={color}
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />,
  )

export const Sparkle = ({ size = 24, color = 'currentColor', className, style }: IconProps) =>
  svg(size, className, style, <path fill={color} d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2z" />)

export const Play = ({ size = 24, color = 'currentColor', className, style }: IconProps) =>
  svg(size, className, style, <path fill={color} d="M8 5v14l11-7L8 5z" />)

export const Pause = ({ size = 24, color = 'currentColor', className, style }: IconProps) =>
  svg(size, className, style, <path fill={color} d="M7 5h4v14H7zM13 5h4v14h-4z" />)

export const Close = ({ size = 24, color = 'currentColor', className, style }: IconProps) =>
  svg(size, className, style, <path stroke={color} strokeWidth="3" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />)

/** Mostra um pedaço de uma folha de imagens (ou vídeo), do jeito que foi recortado no Figma. */
export function Sprite({
  src,
  crop,
  className = '',
  alt = '',
  blend = false,
  children,
}: {
  src: string
  crop: Crop
  className?: string
  alt?: string
  blend?: boolean
  children?: ReactNode
}) {
  const inner: CSSProperties = {
    width: `${(crop.w / crop.fw) * 100}%`,
    height: `${(crop.h / crop.fh) * 100}%`,
    left: `${(crop.x / crop.fw) * 100}%`,
    top: `${(crop.y / crop.fh) * 100}%`,
  }
  return (
    <div className={`sprite ${className}`} style={{ aspectRatio: `${crop.fw} / ${crop.fh}` }}>
      {src.endsWith('.mp4') ? (
        <video style={inner} src={src} autoPlay muted loop playsInline aria-label={alt} />
      ) : (
        <img style={inner} className={blend ? 'blend' : ''} src={src} alt={alt} loading="lazy" draggable={false} />
      )}
      {children}
    </div>
  )
}

const HEART_COLORS = { light: '#ffeaf4', dark: '#0a0510', pink: '#b83c7e' }

/** Coração que flutua para cima e para baixo. x/y em % do pai, size = largura em px do desenho original. */
export function FloatingHeart({
  x,
  y,
  size,
  tone,
  delay = 0,
}: {
  x: number
  y: number
  size: number
  tone: keyof typeof HEART_COLORS
  delay?: number
}) {
  const s = size / 90
  return (
    <span
      className="fheart"
      style={{ left: `${x}%`, top: `${y}%`, width: 90 * s, height: 140 * s, animationDelay: `${delay}s` }}
    >
      <Heart size={60 * s} color={HEART_COLORS[tone]} />
    </span>
  )
}

export function SectionDivider() {
  return (
    <div className="divider" aria-hidden="true">
      <span className="divider-line" />
      <span className="divider-center">
        <Sparkle size={22} color="#ffa8cf" className="divider-spark" />
        <Heart size={30} color="#f06ba8" className="divider-heart" />
        <Sparkle size={22} color="#c9a2f5" className="divider-spark" />
      </span>
      <span className="divider-line" />
    </div>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow: string
  title: string
  text?: string
  center?: boolean
}) {
  return (
    <header className={`section-header${center ? ' center' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {text && <p className="section-lead">{text}</p>}
    </header>
  )
}

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <a className={`logo${small ? ' small' : ''}`} href="/#topo" aria-label="Nyxie: Dead Air, voltar ao topo">
      <Heart size={small ? 26 : 28} color="#f06ba8" />
      <span className="logo-name">NYXIE</span>
      <span className="logo-sub">DEAD AIR</span>
    </a>
  )
}
