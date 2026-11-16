// Gera public/og-image.jpg (1200x630), a imagem que aparece ao compartilhar o link.
// Abre scripts/og-card.html no Chrome sem janela, tira um print e comprime com o sharp.
// Uso: npm run og   (CHROME=/caminho/do/chrome para usar outro navegador)
import { execFileSync } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import sharp from 'sharp'

const root = fileURLToPath(new URL('..', import.meta.url))
const candidates = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean)
const chrome = candidates.find((p) => existsSync(p))
if (!chrome) throw new Error('Chrome não encontrado. Use CHROME=/caminho/do/chrome npm run og')

const tmp = `${root}.og-tmp.png`
execFileSync(chrome, [
  '--headless=new',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--window-size=1200,630',
  '--virtual-time-budget=8000',
  `--screenshot=${tmp}`,
  pathToFileURL(`${root}scripts/og-card.html`).href,
])
const info = await sharp(tmp).resize(1200, 630).jpeg({ quality: 86, mozjpeg: true }).toFile(`${root}public/og-image.jpg`)
rmSync(tmp)
console.log(`public/og-image.jpg: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB`)
