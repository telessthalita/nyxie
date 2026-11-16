// Pré-renderização: roda depois do `vite build`.
// Pega o HTML que o React gera no servidor e coloca dentro do index.html final,
// para a página aparecer antes mesmo do JavaScript carregar.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const indexPath = `${root}dist/index.html`
const ssrEntry = pathToFileURL(`${root}dist-ssr/entry-server.js`).href

const { render } = await import(ssrEntry)
const html = await readFile(indexPath, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error('Não achei <div id="root"></div> no dist/index.html')

const app = render()
await writeFile(indexPath, html.replace(marker, `<div id="root">${app}</div>`))
await rm(`${root}dist-ssr`, { recursive: true, force: true })

console.log(`Pré-renderizado: ${(app.length / 1024).toFixed(1)} KB de HTML dentro do dist/index.html`)
