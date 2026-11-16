/**
 * Registro de decisões do projeto (no estilo ADR: contexto, decisão, alternativas, custo).
 * Alimenta a página /bastidores e as notas do modo Raio-X.
 */
export type Decision = {
  id: string
  n: string
  area: string
  title: string
  context: string
  decision: string
  rejected: string
  tradeoff: string
}

export const DECISIONS: Decision[] = [
  {
    id: 'leitura-fig',
    n: '01',
    area: 'Handoff',
    title: 'Ler o arquivo do Figma, não a imagem dele',
    context:
      'O design chegou como um .fig exportado, sem telas renderizadas. Recriar "no olho" a partir de prints gera espaçamentos e tamanhos aproximados.',
    decision:
      'Decodificar o binário do .fig e extrair a árvore de camadas (cerca de 18 mil nós): auto layout, cores, fontes, textos, variantes e recortes de imagem, com os números exatos.',
    rejected: 'Implementar a partir de screenshots; depender de plugin pago de exportação para código.',
    tradeoff: 'Exigiu um script descartável de leitura, que não faz parte do projeto final.',
  },
  {
    id: 'stack',
    n: '02',
    area: 'Arquitetura',
    title: 'Vite + React + TypeScript, sem framework de servidor',
    context:
      'É uma landing de página única, sem login, sem banco e sem conteúdo que muda por usuário. Mas tem partes com estado: seletor de skins, player, FAQ, menu e modal.',
    decision:
      'React para os componentes com estado, TypeScript para os dados tipados das skins, mundos e edições, e Vite para gerar um site 100% estático.',
    rejected:
      'Next.js (renderização no servidor sem necessidade, mais custo de hospedagem); HTML e JavaScript puros (o estado das interações ficaria espalhado).',
    tradeoff: 'O conteúdo aparece depois que o JavaScript carrega. Para uma landing de estudo, aceitável.',
  },
  {
    id: 'css',
    n: '03',
    area: 'Estilo',
    title: 'CSS puro com tokens, sem Tailwind nem biblioteca de UI',
    context:
      'O Figma já é um sistema fechado: 14 cores, 3 fontes, raios e sombras que se repetem. Uma biblioteca de componentes traria outro visual para "desfazer".',
    decision:
      'Um único index.css com as cores e fontes do Figma em variáveis CSS, componentes com nomes legíveis e três quebras de layout.',
    rejected: 'Tailwind (duplicaria os tokens em classes); shadcn/ui ou MUI (visual pronto que brigaria com o design).',
    tradeoff: 'Um arquivo CSS grande. Em troca, o CSS final pesa 9 KB comprimido.',
  },
  {
    id: 'conteudo',
    n: '04',
    area: 'Arquitetura',
    title: 'Conteúdo separado do layout',
    context: 'Textos, preços, skins e FAQ são o que mais muda numa landing.',
    decision: 'Todo o conteúdo mora em data.ts, tipado. As seções só leem esses dados.',
    rejected: 'Textos escritos direto dentro dos componentes.',
    tradeoff: 'Um nível a mais de indireção para quem lê o código pela primeira vez.',
  },
  {
    id: 'sprite',
    n: '05',
    area: 'Imagens',
    title: 'Recortes fiéis ao Figma com um componente só',
    context:
      'A personagem vem em folhas com várias poses e skins numa imagem só. O Figma recorta cada pose movendo a folha dentro de uma moldura.',
    decision:
      'Um componente Sprite que recebe as medidas do Figma e converte em porcentagem. O recorte fica idêntico ao design e escala em qualquer tela. O mesmo componente serve para vídeo.',
    rejected: 'Cortar e exportar cerca de 30 imagens separadas.',
    tradeoff: 'Cada folha é baixada inteira, mesmo quando só uma pose aparece.',
  },
  {
    id: 'peso',
    n: '06',
    area: 'Performance',
    title: 'Imagens em WebP e só duas dependências',
    context: 'As artes vieram em PNG de alta resolução, algumas com mais de 4 MB.',
    decision:
      'Conversão para WebP com o sharp, carregamento tardio fora da primeira dobra e cache longo dos assets na hospedagem. Em produção, só react e react-dom.',
    rejected: 'Servir os PNGs originais; carrossel, animação ou ícones de biblioteca externa.',
    tradeoff: 'Leve perda de nitidez em zoom máximo, imperceptível no tamanho exibido.',
  },
  {
    id: 'animacao',
    n: '07',
    area: 'Acessibilidade',
    title: 'Movimento só em CSS, e com freio',
    context: 'O design pede corações flutuando, aura pulsando, letreiro correndo e brilhos.',
    decision:
      'Todas as animações em CSS puro, sem biblioteca. Quem pediu "menos movimento" no sistema vê a página parada. Menu e modal fecham com Esc, e o foco é sempre visível.',
    rejected: 'Framer Motion ou GSAP para animações que o CSS resolve.',
    tradeoff: 'Animações coordenadas mais complexas ficariam mais difíceis só com CSS.',
  },
  {
    id: 'lista',
    n: '08',
    area: 'Produto',
    title: 'Lista de espera simulada de propósito',
    context: 'É um projeto de estudo: o jogo, o estúdio e os preços são fictícios.',
    decision:
      'O formulário simula o envio completo (espera, confirmação, "usar outro e-mail"), mas o e-mail fica só no navegador de quem preencheu.',
    rejected: 'Ligar a um banco ou serviço de e-mail e coletar dados reais de pessoas para algo que não existe.',
    tradeoff: 'Para virar produto real, falta trocar a simulação por um envio de verdade.',
  },
  {
    id: 'deploy',
    n: '09',
    area: 'Infra',
    title: 'Site estático no Render, com infra descrita em código',
    context: 'Sem servidor para manter, o site pode ser só arquivos.',
    decision:
      'Hospedagem estática gratuita no Render, configurada no render.yaml versionado no repositório: build, pasta publicada, cache dos assets e rota para esta página.',
    rejected: 'Configurar tudo à mão no painel, sem registro do que foi feito.',
    tradeoff: 'Mudanças de infra passam a exigir commit, o que é proposital.',
  },
]

/** Notas do modo Raio-X: onde aparecem na landing e qual decisão explicam. */
export const XRAY_NOTES: { selector: string; frame: string; decision: string; note: string }[] = [
  {
    selector: '.hero',
    frame: 'Hero · 1600×840',
    decision: 'leitura-fig',
    note: 'A arte da direita é o frame do Figma em 600×800, com cada elemento na posição exata. No celular, o mesmo bloco escala para 348×464, o tamanho do layout mobile.',
  },
  {
    selector: '.marquee',
    frame: 'Marquee',
    decision: 'animacao',
    note: 'Letreiro infinito sem JavaScript: a lista é duplicada e desliza 50% em loop.',
  },
  {
    selector: '.player',
    frame: 'Video Slot · Featured Gameplay',
    decision: 'stack',
    note: 'Player com controles próprios no visual do jogo, sobre o vídeo nativo do navegador. É aqui que o React ganha seu lugar.',
  },
  {
    selector: '.kit',
    frame: 'Kit Details',
    decision: 'sprite',
    note: 'Quatro detalhes, uma imagem só: cada card mostra um pedaço da folha de personagem com as coordenadas do Figma.',
  },
  {
    selector: '.skins',
    frame: 'Organisms/Skin Selector',
    decision: 'css',
    note: 'No Figma eram 20 variantes do componente. Aqui, um estado e uma variável CSS (--skin) que repinta nome, anel, bônus e corações.',
  },
  {
    selector: '.faq-list',
    frame: 'Molecules/FAQ Item',
    decision: 'animacao',
    note: 'O acordeão anima a altura com grid-template-rows, sem medir nada em JavaScript.',
  },
  {
    selector: '.cta-card',
    frame: 'Final CTA',
    decision: 'lista',
    note: 'O formulário simula o envio de ponta a ponta, mas não coleta dado de ninguém.',
  },
]

export const NUMBERS = [
  { value: '18 mil', label: 'camadas do Figma lidas direto do arquivo' },
  { value: '−91%', label: 'no peso das imagens: 9,7 MB viraram 842 KB' },
  { value: '2', label: 'dependências em produção: react e react-dom' },
  { value: '94 KB', label: 'de JavaScript e CSS, já comprimidos' },
]

export const STACK = ['Vite', 'React 19', 'TypeScript', 'CSS puro', 'sharp', 'Git + GitHub', 'Render']

export const PIPELINE = [
  { title: 'Design', text: 'Layout, componentes, variantes e artes no Figma.' },
  { title: 'Leitura', text: 'O .fig decodificado em medidas, textos e recortes exatos.' },
  { title: 'Arquitetura', text: 'Stack, estrutura de pastas e o que fica fora do escopo.' },
  { title: 'Implementação', text: '13 seções, 3 tamanhos de tela e as interações do design.' },
  { title: 'Publicação', text: 'Revisão, versionamento no GitHub e deploy estático.' },
]
