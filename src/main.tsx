import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Em produção o HTML já vem pré-renderizado: o React só "acorda" o que está na tela.
// No `npm run dev` a div vem vazia e o React desenha do zero.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
