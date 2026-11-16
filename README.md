# Nyxie: Dead Air

Landing page de estudo para um jogo fictício: um RPG de ritmo e ação com estética gótica e kawaii. Estúdio, jogo e preços não existem de verdade.

**No ar:** https://nyxie-umes.onrender.com

O layout chegou pronto no Figma. Este repositório é a outra metade do trabalho: transformar o design em um site real, decidir como ele é construído e colocar no ar.

## Quem fez o quê

| Papel | Quem | O quê |
|---|---|---|
| Design | [biatriz](https://portfoliobiatriz.beatrizvieiradesigner.workers.dev/) | Layout em três tamanhos de tela, componentes com variantes e direção de arte no Figma |
| Direção técnica e entrega | [Thalita Teles](https://telessthalita.com.br/) | Escopo, revisão de cada etapa, decisões de produto, versionamento e publicação |
| Desenvolvimento assistido por IA | Claude | Leitura do arquivo do Figma e implementação do código, guiada e revisada |

## O que tem na página

- 13 seções fiéis ao Figma, em desktop, tablet e celular
- Seletor com 10 visuais da personagem, trocando cores, palco e bônus
- Player de gameplay com controles próprios e modal de trailer
- FAQ em acordeão, menu mobile em tela cheia e animações em CSS
- Lista de espera simulada (veja a decisão 08)
- Trilha sonora ligada por padrão, com botão de sino, que pausa sozinha quando um vídeo com som toca
- **A página pulsa no ritmo da trilha**: brilhos, anéis e corações reagem ao grave da música em tempo real
- **Mini-jogo de ritmo**: o HUD da seção de jogabilidade vira jogável, sincronizado com a trilha

## Em números

| | |
|---|---|
| Camadas do Figma lidas direto do arquivo | ~18 mil |
| Peso das imagens | 9,7 MB → 842 KB (−91%) |
| Dependências em produção | 2 (`react` e `react-dom`) |
| JavaScript + CSS, comprimidos | ~95 KB |
| Lighthouse, desktop | 99 performance · 100 acessibilidade · 96 boas práticas · 100 SEO |
| Lighthouse, celular | 95 performance · 100 acessibilidade · 100 boas práticas · 100 SEO |

Lighthouse 12 medido no build de produção servido localmente, antes do deploy. No servidor real os números podem variar um pouco.

## Decisões técnicas

O design diz como a página parece. Estas decisões dizem como ela é construída, mantida e entregue. Cada uma segue o formato de registro de decisão de arquitetura: contexto, decisão, alternativas descartadas e o custo assumido.

As decisões 10 a 14 são os diferenciais: o que esta landing faz e o Figma não pedia.

<a id="leitura-fig"></a>

### 01. Ler o arquivo do Figma, não a imagem dele

- **Contexto:** o design chegou como um `.fig` exportado, sem telas renderizadas. Recriar "no olho" a partir de prints gera espaçamentos e tamanhos aproximados.
- **Decisão:** decodificar o binário do `.fig` e extrair a árvore de camadas: auto layout, cores, fontes, textos, variantes e recortes de imagem, com os números exatos.
- **Descartado:** implementar a partir de screenshots; plugin pago de exportação para código.
- **Custo:** um script descartável de leitura, que não faz parte do projeto final.

<a id="stack"></a>

### 02. Vite + React + TypeScript, sem framework de servidor

- **Contexto:** landing de página única, sem login, sem banco e sem conteúdo por usuário. Mas com estado: seletor de skins, player, FAQ, menu, modal e trilha.
- **Decisão:** React para os componentes com estado, TypeScript para os dados tipados e Vite para gerar um site 100% estático.
- **Descartado:** Next.js (renderização no servidor sem necessidade); HTML e JavaScript puros (o estado das interações ficaria espalhado).
- **Custo:** com React só no navegador, o conteúdo apareceria depois do JavaScript. Resolvido na decisão 12.

<a id="css"></a>

### 03. CSS puro com tokens, sem Tailwind nem biblioteca de UI

- **Contexto:** o Figma já é um sistema fechado: 14 cores, 3 fontes, raios e sombras que se repetem. Uma biblioteca de componentes traria outro visual para "desfazer".
- **Decisão:** as cores e fontes do Figma viram variáveis CSS; componentes com nomes legíveis e três quebras de layout.
- **Descartado:** Tailwind (duplicaria os tokens em classes); shadcn/ui ou MUI (visual pronto que brigaria com o design).
- **Custo:** um arquivo CSS grande. Em troca, o CSS final pesa 9 KB comprimido.

<a id="conteudo"></a>

### 04. Conteúdo separado do layout

- **Contexto:** textos, preços, skins e FAQ são o que mais muda numa landing.
- **Decisão:** todo o conteúdo mora em `src/data.ts`, tipado. As seções só leem esses dados.
- **Descartado:** textos escritos direto dentro dos componentes.
- **Custo:** um nível a mais de indireção para quem lê o código pela primeira vez.

<a id="sprite"></a>

### 05. Recortes fiéis ao Figma com um componente só

- **Contexto:** a personagem vem em folhas com várias poses numa imagem só. O Figma recorta cada pose movendo a folha dentro de uma moldura.
- **Decisão:** um componente `Sprite` recebe as medidas do Figma e converte em porcentagem. O recorte fica idêntico ao design e escala em qualquer tela. O mesmo componente serve para vídeo.
- **Descartado:** cortar e exportar cerca de 30 imagens separadas.
- **Custo:** cada folha é baixada inteira, mesmo quando só uma pose aparece.

<a id="peso"></a>

### 06. Imagens em WebP e só duas dependências

- **Contexto:** as artes vieram em PNG de alta resolução, algumas com mais de 4 MB.
- **Decisão:** conversão para WebP com o `sharp`, carregamento tardio fora da primeira dobra e cache dos assets na hospedagem. Em produção, só `react` e `react-dom`.
- **Descartado:** servir os PNGs originais; carrossel, animação ou ícones de biblioteca externa.
- **Custo:** leve perda de nitidez em zoom máximo, imperceptível no tamanho exibido.

<a id="animacao"></a>

### 07. Movimento só em CSS, e com freio

- **Contexto:** o design pede corações flutuando, aura pulsando, letreiro correndo e brilhos.
- **Decisão:** animações em CSS puro. Quem ativou "reduzir movimento" no sistema vê a página parada. Menu e modal fecham com Esc e o foco é sempre visível.
- **Descartado:** Framer Motion ou GSAP para o que o CSS resolve.
- **Custo:** animações coordenadas mais complexas ficariam mais difíceis só com CSS.

<a id="lista"></a>

### 08. Lista de espera simulada de propósito

- **Contexto:** é um projeto de estudo: jogo, estúdio e preços são fictícios.
- **Decisão:** o formulário simula o envio completo (espera, confirmação, "usar outro e-mail"), mas o e-mail fica só no navegador de quem preencheu.
- **Descartado:** ligar a um banco ou serviço de e-mail e coletar dados reais de pessoas para algo que não existe.
- **Custo:** para virar produto real, falta trocar a simulação por um envio de verdade.

<a id="deploy"></a>

### 09. Site estático no Render, com infra descrita em código

- **Contexto:** sem servidor para manter, o site pode ser só arquivos.
- **Decisão:** hospedagem estática gratuita no Render, configurada no `render.yaml` versionado: build, pasta publicada e cache dos assets.
- **Descartado:** configurar tudo à mão no painel, sem registro do que foi feito.
- **Custo:** mudanças de infra passam a exigir commit, o que é proposital.

<a id="ritmo"></a>

### 10. A página pulsa no ritmo da própria trilha

- **Contexto:** o jogo é um "RPG de ritmo", mas uma landing comum só toca música de fundo.
- **Decisão:** a trilha passa por um grafo da Web Audio API (`<audio>` → analisador de frequências → volume → alto-falante). A cada quadro, a energia dos graves (40 a 250 Hz) vira a variável CSS `--bass`, e a batida vira `--kick`. A batida vem do relógio da trilha mais o BPM, que eu medi na própria música por autocorrelação de onsets (≈120,25 BPM, primeira batida em 0,068 s). Brilho, anéis, corações e letreiro reagem a essas duas variáveis, sem nenhum estado React mudando por quadro.
- **Descartado:** detectar a batida só pelo volume (falhava nesta trilha, que tem grave constante); bibliotecas de visualização de áudio.
- **Custo:** a medição do BPM vale para esta faixa. Trocar a trilha exige medir de novo.

<a id="hud-jogavel"></a>

### 11. O HUD do design virou um mini-jogo de ritmo

- **Contexto:** o Figma mostra um HUD ilustrativo ("¡PERFEITO!", "x24"). Mostrar a mecânica jogando vale mais que descrevê-la.
- **Decisão:** em "Jogar no ritmo", as notas correm pela pista e a pessoa toca, ou aperta espaço, quando o coração chega no anel. A posição de cada nota é calculada a partir do `currentTime` do áudio a cada quadro, e não por `setTimeout`: assim a nota nunca escorrega do tempo, mesmo se a aba travar. Os acertos são julgados por janela: até 70 ms dá PERFEITO, até 140 ms dá BOM, e acima disso ERROU ou QUASE. As notas são um pool fixo de elementos movidos com `transform`, sem recriar nada a cada quadro.
- **Descartado:** motor de jogo ou canvas (pesado demais para uma pista); timers do JavaScript para sincronizar com música.
- **Custo:** a latência de saída de áudio de cada aparelho não é compensada. Em fones Bluetooth, o "no tempo" fica um pouco atrasado.

<a id="prerender"></a>

### 12. HTML pré-renderizado no build

- **Contexto:** o custo assumido na decisão 02: com React só no navegador, a página fica em branco até o JavaScript carregar.
- **Decisão:** depois do `vite build`, um segundo build roda o React no Node (`renderToString`) e injeta o HTML da landing no `index.html` (`scripts/prerender.mjs`). No navegador, o React só "hidrata" o que já está na tela. Quem chega vê a página inteira na primeira resposta do servidor, e buscadores e prévias de link leem o conteúdo.
- **Descartado:** migrar para Next.js ou Astro só para ter pré-renderização.
- **Custo:** o código precisa rodar no servidor também. Tudo que usa `window` ou `localStorage` foi para dentro de efeitos.

<a id="acordar"></a>

### 13. A página "acorda" na primeira interação

- **Contexto:** a primeira medição no Lighthouse deu 56 de performance no desktop. Uma cópia da página sem animações nem vídeo automático deu 95. O que pesava era o enfeite em movimento disputando a thread principal com o carregamento.
- **Decisão:** a página chega completa e parada, com a capa no lugar do vídeo. No primeiro movimento de mouse, rolagem, toque ou tecla, ela acorda: animações em loop, vídeos decorativos e a trilha (ligada por padrão) começam juntos (`src/wake.ts`). Vídeos fora da tela só baixam quando chegam perto e pausam quando saem.
- **Descartado:** cortar as animações do design; tocar som sem interação, que os navegadores bloqueiam.
- **Custo:** quem abre a página e não mexe em nada vê o hero parado. O Lighthouse também não interage, então a nota mede justamente esse estado inicial.

<a id="previa"></a>

### 14. Prévia de link feita para ser compartilhada

- **Decisão:** tags Open Graph e Twitter Card com uma arte própria de 1200×630 (`public/og-image.jpg`). A arte é gerada a partir de um HTML (`scripts/og-card.html`) com as fontes e cores do design, fotografado pelo Chrome sem janela (`npm run og`). O endereço do site vem de uma variável de ambiente no build.
- **Descartado:** usar um print da página como prévia.

## Stack

Vite · React 19 (com pré-renderização) · TypeScript · CSS puro · Web Audio API · sharp · Git e GitHub · Render

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
- `src/components/`: ícones, peças reutilizáveis e a trilha sonora
- `src/audio/`: motor de áudio, BPM medido e o pulso da página
- `src/sections/HudGame.tsx`: o mini-jogo de ritmo
- `src/wake.ts`: o "acordar" da página na primeira interação
- `scripts/`: pré-renderização e geração da imagem de prévia (`npm run og`)
- `public/assets/`: imagens, vídeos e áudio
