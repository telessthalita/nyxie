import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Endereço público do site, usado na prévia de compartilhamento (og:image precisa de URL completa).
 * Ordem: SITE_URL (se definida no Render) → RENDER_EXTERNAL_URL (o Render preenche) → padrão.
 */
const SITE_URL = (process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || 'https://nyxie-umes.onrender.com').replace(/\/$/, '')

const siteUrl = (): Plugin => ({
  name: 'site-url',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', SITE_URL),
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteUrl()],
})
