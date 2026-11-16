# Nyxie: Dead Air

Landing page de estudo para um jogo fictício: um RPG de ritmo e ação com estética gótica e kawaii. Estúdio, jogo e preços não existem de verdade.

O layout chegou pronto no Figma. Este repositório é a outra metade do trabalho: transformar o design em um site real, decidir como ele é construído e colocar no ar.

## Quem fez o quê

| Papel | Quem | O quê |
|---|---|---|
| Design | biatriz | Layout em três tamanhos de tela, componentes com variantes e direção de arte no Figma |
| Direção técnica e entrega | [Thalita Teles](https://telessthalita.com.br/) | Escopo, revisão de cada etapa, decisões de produto, versionamento e publicação |
| Desenvolvimento assistido por IA | Claude | Leitura do arquivo do Figma e implementação do código, guiada e revisada |

## O que tem na página

- 13 seções fiéis ao Figma, em desktop, tablet e celular
- Seletor com 10 visuais da personagem, trocando cores, palco e bônus
- Player de gameplay com controles próprios e modal de trailer
- FAQ em acordeão, menu mobile em tela cheia e animações em CSS
- Lista de espera simulada (veja a decisão 08)
- Trilha sonora com botão de liga e desliga, que pausa sozinha quando um vídeo com som toca
- **Modo Raio-X**: um botão flutuante (ou a tecla `X`) desenha os frames do Figma por cima da página e mostra a decisão técnica de cada parte

## Em números

| | |
|---|---|
| Camadas do Figma lidas direto do arquivo | ~18 mil |
| Peso das imagens | 9,7 MB → 842 KB (−91%) |
| Dependências em produção | 2 (`react` e `react-dom`) |
| JavaScript + CSS, comprimidos | ~95 KB |

## Decisões técnicas

O design diz como a página parece. Estas decisões dizem como ela é construída, mantida e entregue. Cada uma segue o formato de registro de decisão de arquitetura: contexto, decisão, alternativas descartadas e o custo assumido.

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
- **Custo:** o conteúdo aparece depois que o JavaScript carrega. Aceitável para uma landing de estudo.

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

## Stack

Vite · React 19 · TypeScript · CSS puro · sharp · Git e GitHub · Render

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
- `src/raio-x/`: o modo Raio-X e as notas de cada decisão
- `public/assets/`: imagens, vídeos e áudio
