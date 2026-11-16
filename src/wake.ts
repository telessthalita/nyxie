/**
 * "Acordar" a página: o HTML chega pronto e parado, e o que é só enfeite em movimento
 * (animações em loop, vídeos decorativos) começa na primeira interação da pessoa:
 * mexer o mouse, rolar, tocar ou apertar uma tecla. É também o momento em que a trilha pode tocar.
 *
 * Por quê: animações e vídeos rodando desde o primeiro quadro disputam a thread principal
 * com o carregamento. Medido no Lighthouse (desktop): 56 com tudo rodando de cara, 95 sem.
 */
const EVENTS = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'] as const
const callbacks = new Set<() => void>()
let awake = false

export const isAwake = () => awake

/** Roda `fn` quando a página acordar (ou já, se ela já acordou). Devolve como cancelar. */
export function onWake(fn: () => void) {
  if (awake) {
    fn()
    return () => {}
  }
  callbacks.add(fn)
  return () => {
    callbacks.delete(fn)
  }
}

export function setupWake() {
  if (awake || typeof window === 'undefined') return
  const wake = () => {
    if (awake) return
    awake = true
    EVENTS.forEach((e) => window.removeEventListener(e, wake))
    document.documentElement.classList.add('is-awake')
    callbacks.forEach((fn) => fn())
    callbacks.clear()
  }
  EVENTS.forEach((e) => window.addEventListener(e, wake, { passive: true, once: true }))
}
