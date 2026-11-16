import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './bastidores/bastidores.css'
import App from './App.tsx'
import { Bastidores } from './bastidores/Bastidores.tsx'

// Duas páginas só: não vale um roteador inteiro para isso.
const isBastidores = window.location.pathname.replace(/\/$/, '') === '/bastidores'

createRoot(document.getElementById('root')!).render(<StrictMode>{isBastidores ? <Bastidores /> : <App />}</StrictMode>)
