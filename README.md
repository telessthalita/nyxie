# Nyxie: Dead Air

Landing page de estudo para um jogo fictício, um RPG de ritmo e ação. Estúdio, jogo e preços não existem de verdade.

Design de biatriz no Figma, código de [Thalita Teles](https://telessthalita.com.br/).

## Stack

- Vite + React + TypeScript
- CSS puro (`src/index.css`), sem biblioteca de UI
- Fontes do Google Fonts: Bagel Fat One, Pixelify Sans e Nunito

## Rodando

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
```

## Onde mexer

- `src/data.ts`: textos, skins, mundos, edições e FAQ
- `src/sections/`: as seções da página
- `src/components/ui.tsx`: ícones e peças reutilizáveis
- `public/assets/`: imagens e vídeos

O formulário da lista de espera é uma simulação: nada é enviado para servidor, o e-mail fica só no navegador.

## Hospedagem

Site estático no Render, configurado em `render.yaml` (build `npm ci && npm run build`, pasta `dist`).
