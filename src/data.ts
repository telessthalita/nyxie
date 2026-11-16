export const NAV = [
  { label: 'História', href: '/#historia' },
  { label: 'Personagem', href: '/#personagem' },
  { label: 'Jogabilidade', href: '/#jogabilidade' },
  { label: 'Mundos', href: '/#mundos' },
  { label: 'Edições', href: '/#edicoes' },
  { label: 'FAQ', href: '/#faq' },
]

export const SOCIALS = ['TikTok', 'Discord', 'YouTube', 'Steam']

export const MARQUEE = ['RITMO', 'AÇÃO', 'ROGUELIKE', 'GÓTICO', 'KAWAII', 'TRILHA AUTORAL', 'MODO COOP']

export const FEATURED_STATS = [
  { value: '4 mundos', text: 'Para atravessar a pé e no ritmo.' },
  { value: '80+ peças', text: 'Para vestir no guarda-roupa do hub.' },
  { value: '2 jogadores', text: 'Dueto local e online com troca de visual.' },
]

export const CHAPTERS = [
  { n: '01', title: 'O Apagão', text: 'A noite em que Velvet Static perdeu a voz e ninguém percebeu a tempo.' },
  { n: '02', title: 'Os fones de Bones', text: 'Um pacto: ela empresta a voz, ele empresta o volume. Ninguém lê o contrato.' },
  { n: '03', title: 'A Descida', text: 'Quatro mundos, um chefe por trilha e uma irmã no fim da playlist.' },
]

export const CHAR_STATS = [
  { label: 'RITMO', value: 95 },
  { label: 'ATAQUE SÔNICO', value: 72 },
  { label: 'FURTIVIDADE', value: 84 },
  { label: 'FOFURA LETAL', value: 100 },
]

/** Recorte de uma folha de imagens: moldura (fw x fh) e posição/tamanho da folha dentro dela. */
export type Crop = { fw: number; fh: number; w: number; h: number; x: number; y: number }

export const KIT: { label: string; crop: Crop }[] = [
  { label: 'Fones “Bones”', crop: { fw: 172, fh: 251, w: 2222.8, h: 1243.7, x: -855, y: -955.9 } },
  { label: 'Suéter caveira', crop: { fw: 172, fh: 229, w: 2027.8, h: 1134.6, x: -395.3, y: -872.1 } },
  { label: 'Corrente de coração', crop: { fw: 172, fh: 229, w: 2027.8, h: 1134.6, x: -585.4, y: -872.1 } },
  { label: 'Botas plataforma', crop: { fw: 172, fh: 240, w: 2120.8, h: 1186.6, x: -998.9, y: -912.1 } },
]

const tt = (x: number): Crop => ({ fw: 216, fh: 403, w: 1440, h: 429.8, x, y: -20.2 })
export const TURNTABLE = [
  { label: '0° · OLÁ', crop: tt(-59) },
  { label: '45° · PAZ E CAOS', crop: tt(-314.6) },
  { label: '90° · PERFIL', crop: tt(-595.4) },
  { label: '135° · TEDDY', crop: tt(-872.6) },
  { label: '180° · COSTAS', crop: tt(-1162.8) },
]

export type Skin = {
  id: string
  name: string
  tagline: string
  perk: string
  color: string
  bg: string
  crop: Crop
}
const sk = (w: number, h: number, x: number, y: number): Crop => ({ fw: 560, fh: 700, w, h, x, y })
export const SKINS: Skin[] = [
  { id: 'rosa', name: 'Rosa Noturna', tagline: 'A original: doce, barulhenta e um pouco assombrada.', perk: 'Visual padrão · sem bônus', color: '#f06ba8', bg: '#ffd9ea', crop: sk(2959.5, 1664.7, 25.7, -116.5) },
  { id: 'roxa', name: 'Roxa Eclipse', tagline: 'Surge só depois da meia-noite, quando o baixo fica mais grave.', perk: '+8% de dano sônico', color: '#9b5de0', bg: '#e9d9ff', crop: sk(2942.5, 1655.2, -399.9, -112.1) },
  { id: 'azul', name: 'Azul Sinal', tagline: 'Fria, calculista e sempre no tempo certo.', perk: '+10% de janela de acerto', color: '#4c7dff', bg: '#d9e6ff', crop: sk(2959.5, 1664.7, -815.4, -116.5) },
  { id: 'vermelha', name: 'Vermelha Distorção', tagline: 'Guitarra no talo, cada acerto crítico vira um estouro.', perk: '+12% de dano crítico', color: '#e5384f', bg: '#ffd9dc', crop: sk(2959.5, 1664.7, -1603.8, -116.5) },
  { id: 'verde', name: 'Verde Fita', tagline: 'Cheiro de cassete antigo e cura para o Dueto.', perk: '+15% de cura no Dueto', color: '#3fbf6b', bg: '#d8f5e0', crop: sk(2959.5, 1664.7, -2021.2, -116.5) },
  { id: 'lilas', name: 'Lilás Pastel', tagline: 'A versão fofa: combos longos e muito glitter.', perk: '+10% de combo sustentado', color: '#a98bea', bg: '#efe6ff', crop: sk(2959.5, 1664.7, -2416.5, -116.5) },
  { id: 'prata', name: 'Prata Vinil', tagline: 'Brilha como disco novo e desliza entre os golpes.', perk: '+8% de esquiva no tempo', color: '#9a9ab4', bg: '#ececf4', crop: sk(2828.7, 1591.2, -585.7, -785.4) },
  { id: 'ciano', name: 'Ciano Neon', tagline: 'Neon de Velvet Static, recarrega o set em segundos.', perk: '+10% de recarga de habilidade', color: '#12b8b8', bg: '#d3f3f3', crop: sk(2813.2, 1582.4, -1129.9, -780.8) },
  { id: 'dourada', name: 'Dourada Disco', tagline: 'Disco de ouro: cada nota perfeita vale mais.', perk: '+20% de notas douradas', color: '#e0a800', bg: '#fff0c9', crop: sk(2813.2, 1582.4, -1679.9, -777.5) },
  { id: 'violeta', name: 'Violeta Noite', tagline: 'Some no escuro e reaparece no refrão.', perk: '+10% de furtividade', color: '#7e3fc7', bg: '#e3d5f5', crop: sk(2813.2, 1582.4, -2284.8, -780.8) },
]

export const POSES: { title: string; tag: string; crop: Crop }[] = [
  { title: 'Olá, plateia!', tag: 'ABERTURA DE FASE', crop: { fw: 208, fh: 300, w: 1114, h: 626.6, x: -26.1, y: -26.1 } },
  { title: 'Paz e caos', tag: 'COMBO PERFEITO', crop: { fw: 208, fh: 300, w: 1114, h: 626.6, x: -224.5, y: -26.1 } },
  { title: 'Pausa no hub', tag: 'MENU DE EQUIPAMENTO', crop: { fw: 208, fh: 300, w: 1301.9, h: 732.3, x: -35.6, y: -401.8 } },
  { title: 'Hora do show!', tag: 'FINAL DE CHEFE', crop: { fw: 208, fh: 300, w: 1238.3, h: 696.6, x: -989.2, y: -372.5 } },
]

export const HUD_NOTES = [
  { x: 70, color: '#9b5de0', op: 0.25 },
  { x: 130, color: '#f06ba8', op: 0.4 },
  { x: 330, color: '#f06ba8', op: 1 },
  { x: 450, color: '#9b5de0', op: 1 },
  { x: 590, color: '#f06ba8', op: 1 },
  { x: 690, color: '#f06ba8', op: 1 },
  { x: 830, color: '#9b5de0', op: 1 },
  { x: 950, color: '#f06ba8', op: 1 },
]

export const PILLARS = [
  { icon: 'heart', color: '#f06ba8', title: 'Bata no ritmo', text: 'Ataques, esquivas e defesas só funcionam no compasso. Acertou o tempo? Dano dobrado e coração extra.' },
  { icon: 'sparkle', color: '#9b5de0', title: 'Combos Mixtape', text: 'Encadeie golpes para gravar sequências. Cada combo vira um loop que passa a tocar de fundo.' },
  { icon: 'heart', color: '#ffa8cf', title: 'Fones modulares', text: 'Troque drivers, cabos e adesivos. Cada peça muda o som: pesado, agudo ou lo-fi.' },
  { icon: 'sparkle', color: '#c9a2f5', title: 'Roguelike noturno', text: 'Salas, relíquias e remixes mudam a cada descida. Morreu? A fita volta ao início.' },
] as const

export const RUN_STEPS = [
  { title: 'Monte o set', text: 'Escolha fones, cabos e a trilha de abertura.' },
  { title: 'Desça ao mundo', text: 'Salas, inimigos e relíquias em ritmo crescente.' },
  { title: 'Enfrente o chefe', text: 'Cada chefe é uma música com fases e solos.' },
  { title: 'Volte ao palco', text: 'Gaste notas, desbloqueie faixas e recomece.' },
]

export const WORLDS = [
  { n: '01', bpm: '96 BPM', name: 'Velvet Static', text: 'Os becos neon da cidade-rádio, onde tudo começou.', boss: 'Chefe: O Locutor Mudo', from: '#f06ba8', to: '#5c1f52' },
  { n: '02', bpm: '120 BPM', name: 'Cemitério de Fitas', text: 'Lápides de cassete e fantasmas de refrão.', boss: 'Chefe: A Dama do Reverb', from: '#9c5ce0', to: '#331a5c' },
  { n: '03', bpm: '140 BPM', name: 'Catedral de Vinil', text: 'Vitrais que giram a 33 rotações por minuto.', boss: 'Chefe: O Maestro Riscado', from: '#b83d7d', to: '#290f33' },
  { n: '04', bpm: '??? BPM', name: 'O Subsolo Lo-Fi', text: 'Onde o Silêncio guarda tudo o que roubou.', boss: 'Chefe: O Silêncio', from: '#592e91', to: '#0f0817' },
]

export const HUB_ITEMS = [
  'Guarda-roupa com 80+ peças cosméticas',
  'Troféus de chefes viram decoração viva',
  'Dueto local e online no tapete caveira',
]

export const EDITIONS = [
  { name: 'Standard', price: 'R$ 119,90', text: 'O jogo completo para começar a descida.', items: ['Jogo base completo', 'Trilha original (digital)', 'Skin “Noite Clássica”'], featured: false },
  { name: 'Deluxe Gótica', price: 'R$ 169,90', text: 'Para quem quer chegar ao Subsolo com estilo.', items: ['Tudo da Standard', 'Skin “Rainha do Subsolo”', 'Pack de adesivos para os fones', 'Acesso ao beta fechado'], featured: true },
  { name: 'Colecionador', price: 'R$ 599,90', text: 'Edição limitada de 5.000 unidades.', items: ['Tudo da Deluxe', 'Estátua da Nyxie (25 cm)', 'Vinil duplo da trilha', 'Pelúcia do fone Bones'], featured: false },
]

export const FAQ = [
  { q: 'Quando o jogo lança?', a: 'Nyxie: Dead Air chega em 2027. Quem entra na lista de desejos ganha acesso ao beta fechado e a uma demo jogável.' },
  { q: 'Em quais plataformas vai sair?', a: 'PC (Steam), PlayStation 5 e Nintendo Switch 2, com progresso salvo na nuvem entre elas.' },
  { q: 'Preciso ter “ouvido musical”?', a: 'Não. O Modo Assistido amplia a janela de acerto e mostra a batida com pistas visuais e vibração.' },
  { q: 'Dá para jogar em dupla?', a: 'Sim. No Dueto, uma pessoa canta (defesa e cura) e a outra ataca. Funciona local e online.' },
  { q: 'Terá legendas em português?', a: 'Sim: interface e legendas em PT-BR, EN, ES e JP desde o lançamento.' },
]
