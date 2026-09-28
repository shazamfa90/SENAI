// Gera o modelo de storyboard para Word (.docx e .dotx).
//
// Uso: node gerar_modelo.js <pasta_das_molduras> <saida_sem_extensao>
// Ex.: node gerar_modelo.js img ../Modelo_Storyboard_Video

const fs = require("fs");
const path = require("path");
const JSZip = require("jszip");
const {
  AlignmentType,
  BorderStyle,
  CheckBox,
  Document,
  Footer,
  Header,
  HeadingLevel,
  HeightRule,
  ImageRun,
  LevelFormat,
  Packer,
  PageNumber,
  PageOrientation,
  Paragraph,
  ShadingType,
  Tab,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TabStopType,
  TextRun,
  VerticalAlign,
  WidthType,
} = require("docx");

const [pastaImg = "img", saida = "Modelo_Storyboard_Video"] = process.argv.slice(2);
const MOLDURA_16x9 = fs.readFileSync(path.join(pastaImg, "moldura_16x9.png"));
const MOLDURA_9x16 = fs.readFileSync(path.join(pastaImg, "moldura_9x16.png"));

// ---------- Identidade visual ----------
const FONTE = "Arial";
const AZUL = "1F2A44";
const DESTAQUE = "E4572E";
const ROTULO_FUNDO = "EEF1F5";
const LINHA = "B9C0CC";
const APAGADO = "8A94A6";
const CLARO = "C9D2E3";

// A4 paisagem, medidas em DXA (1440 = 1 polegada)
const MARGEM = { top: 850, bottom: 700, left: 720, right: 720, header: 400, footer: 350 };
const LARGURA = 16838 - MARGEM.left - MARGEM.right; // 15398

// Molduras em pixels (96 dpi): 12 × 6,75 cm | 8,4 × 4,72 cm | 6 × 10,67 cm
const IMG_DETALHE = { width: 453, height: 255 };
const IMG_RASCUNHO = { width: 317, height: 178 };
const IMG_VERTICAL = { width: 227, height: 403 };

// ---------- Utilitários ----------
const borda = (cor = LINHA, tamanho = 4) => ({ style: BorderStyle.SINGLE, size: tamanho, color: cor });
const semBorda = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const BORDAS = { top: borda(), bottom: borda(), left: borda(), right: borda() };
const BORDAS_AZUL = { top: borda(AZUL), bottom: borda(AZUL), left: borda(AZUL), right: borda(AZUL) };
const SEM_BORDAS = { top: semBorda, bottom: semBorda, left: semBorda, right: semBorda };
const TABELA_SEM_BORDAS = { ...SEM_BORDAS, insideHorizontal: semBorda, insideVertical: semBorda };
const fundo = (cor) => ({ fill: cor, type: ShadingType.CLEAR, color: "auto" });

const txt = (text, o = {}) => new TextRun({ text, font: FONTE, ...o });
const rotulo = (text, o = {}) => txt(text, { bold: true, size: 14, color: AZUL, allCaps: true, characterSpacing: 6, ...o });
const dica = (text, o = {}) => txt(text, { size: 15, color: APAGADO, ...o });

const par = (children, o = {}) => new Paragraph({ children, spacing: { before: 0, after: 0 }, ...o });
const vazio = (o = {}) => par([txt("", { size: 18 })], o);
const respiro = (depois = 120, o = {}) => par([txt("", { size: 4 })], { spacing: { before: 0, after: depois }, ...o });

function celula(largura, children, o = {}) {
  return new TableCell({
    width: { size: largura, type: WidthType.DXA },
    borders: BORDAS,
    margins: { top: 50, bottom: 50, left: 90, right: 90 },
    verticalAlign: VerticalAlign.CENTER,
    children,
    ...o,
  });
}

const celulaRotulo = (largura, texto, keepNext = true) =>
  celula(largura, [par([rotulo(texto)], { keepNext })], { shading: fundo(ROTULO_FUNDO) });
const celulaValor = (largura, keepNext = true, o = {}) => celula(largura, [vazio({ keepNext })], o);
const celulaTitulo = (largura, texto, keepNext = true, o = {}) =>
  celula(largura, [par([txt(texto, { bold: true, size: 17, color: "FFFFFF", characterSpacing: 10 })], { keepNext })], {
    shading: fundo(AZUL),
    borders: BORDAS_AZUL,
    ...o,
  });
const celulaVazia = (largura) => celula(largura, [vazio()], { borders: SEM_BORDAS, margins: { top: 0, bottom: 0, left: 0, right: 0 } });

function celulaMoldura(largura, imagem, dimensoes, descricao, o = {}) {
  // Folga de ~60 DXA para a imagem não encostar nas bordas da célula
  const margem = Math.floor((largura - Math.round(dimensoes.width * 15) - 60) / 2);
  return celula(
    largura,
    [
      par(
        [
          new ImageRun({
            type: "png",
            data: imagem,
            transformation: dimensoes,
            altText: { title: "Moldura do quadro", description: descricao, name: "moldura" },
          }),
        ],
        { alignment: AlignmentType.CENTER, keepNext: true },
      ),
    ],
    { margins: { top: 60, bottom: 60, left: margem, right: margem }, ...o },
  );
}

const linha = (altura, children, o = {}) =>
  new TableRow({ height: { value: altura, rule: HeightRule.ATLEAST }, cantSplit: true, children, ...o });

const tabela = (colunas, rows, o = {}) =>
  new Table({
    width: { size: colunas.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: colunas,
    layout: TableLayoutType.FIXED,
    rows,
    ...o,
  });

const num = (n) => String(n).padStart(2, "0");

function tituloSecao(etapa, titulo, subtitulo) {
  const blocos = [
    par([txt(etapa, { bold: true, size: 15, color: DESTAQUE, characterSpacing: 20, allCaps: true })], {
      pageBreakBefore: true,
      spacing: { before: 0, after: 40 },
      keepNext: true,
    }),
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [txt(titulo)], keepNext: true }),
  ];
  if (subtitulo) blocos.push(par([dica(subtitulo, { size: 17 })], { spacing: { before: 0, after: 160 }, keepNext: true }));
  return blocos;
}

const subtitulo = (texto) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [txt(texto)], keepNext: true });

// ---------- Capa ----------
function capa() {
  const ESQ = 6000;
  const DIR = LARGURA - ESQ; // 9398
  const ROT = 2700;
  const VAL = DIR - 560 - 240 - ROT;

  const campo = (nome, conteudo = [txt("", { size: 18 })]) =>
    linha(470, [celulaRotulo(ROT, nome, false), celula(VAL, [par(conteudo)])]);
  const caixa = (texto) => [new CheckBox({ checked: false }), txt(` ${texto}    `, { size: 17 })];

  const ficha = tabela(
    [ROT, VAL],
    [
      campo("Projeto"),
      campo("Cliente / unidade"),
      campo("Curso / área"),
      campo("Roteiro"),
      campo("Direção / produção"),
      campo("Edição / animação"),
      campo("Locução / elenco"),
      campo("Duração estimada"),
      campo("Formato", [...caixa("16:9"), ...caixa("9:16"), ...caixa("1:1"), ...caixa("4:5")]),
      campo("Resolução / FPS", [dica("Ex.: 1920 × 1080 · 30 fps", { size: 17 })]),
      campo("Veiculação", [dica("Ex.: YouTube, AVA, Instagram, TV", { size: 17 })]),
      campo("Público-alvo"),
      campo("Prazo de entrega"),
    ],
  );

  const branco = (text, o = {}) => txt(text, { color: "FFFFFF", ...o });
  const painel = [
    par([txt("Pré-produção audiovisual", { bold: true, size: 17, color: DESTAQUE, allCaps: true, characterSpacing: 30 })], {
      spacing: { before: 700, after: 120 },
    }),
    par([branco("Storyboard", { bold: true, size: 88 })], { spacing: { after: 120 } }),
    par([txt("Modelo para planejamento e desenvolvimento de vídeos", { size: 24, color: CLARO })], {
      spacing: { after: 1400 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: DESTAQUE, space: 24 } },
    }),
    par([txt("Título do vídeo", { bold: true, size: 14, color: CLARO, allCaps: true, characterSpacing: 20 })], {
      spacing: { before: 400, after: 60 },
    }),
    par([branco("[Digite o título do vídeo]", { size: 32 })], { spacing: { after: 400 } }),
    par([txt("Versão", { bold: true, size: 14, color: CLARO, allCaps: true, characterSpacing: 20 })], {
      spacing: { after: 60 },
    }),
    par([branco("[1.0]  ·  [dd/mm/aaaa]", { size: 22 })]),
  ];

  return tabela(
    [ESQ, DIR],
    [
      new TableRow({
        height: { value: 10000, rule: HeightRule.ATLEAST },
        cantSplit: true,
        children: [
          celula(ESQ, painel, {
            shading: fundo(AZUL),
            borders: BORDAS_AZUL,
            verticalAlign: VerticalAlign.TOP,
            margins: { top: 200, bottom: 200, left: 520, right: 400 },
          }),
          celula(
            DIR,
            [
              par([txt("Ficha técnica", { bold: true, size: 30, color: AZUL })], { spacing: { before: 700, after: 60 } }),
              par([dica("Informações gerais do vídeo. Preencha antes de iniciar os quadros.", { size: 17 })], {
                spacing: { after: 240 },
              }),
              ficha,
              vazio(),
            ],
            { borders: SEM_BORDAS, verticalAlign: VerticalAlign.TOP, margins: { top: 200, bottom: 200, left: 560, right: 240 } },
          ),
        ],
      }),
    ],
    { borders: TABELA_SEM_BORDAS },
  );
}

// ---------- Briefing ----------
function briefing() {
  const ROT = 3400;
  const VAL = LARGURA - ROT;
  const item = (nome, ajuda, altura = 700) =>
    linha(altura, [
      celula(ROT, [par([rotulo(nome, { size: 15 })], { spacing: { after: 30 } }), par([dica(ajuda, { size: 14 })])], {
        shading: fundo(ROTULO_FUNDO),
        verticalAlign: VerticalAlign.TOP,
        margins: { top: 80, bottom: 80, left: 110, right: 110 },
      }),
      celula(VAL, [vazio()], { verticalAlign: VerticalAlign.TOP, margins: { top: 80, bottom: 80, left: 110, right: 110 } }),
    ]);

  const tabelaBriefing = tabela(
    [ROT, VAL],
    [
      item("Objetivo do vídeo", "O que o público deve saber, sentir ou fazer ao final?", 820),
      item("Mensagem principal", "Resuma a ideia central em uma frase.", 640),
      item("Público-alvo", "Perfil, conhecimento prévio e contexto em que vai assistir.", 640),
      item("Tom e estilo visual", "Didático, institucional, descontraído… Live action, animação 2D, motion graphics…", 820),
      item("Referências", "Links ou descrições de vídeos, cores, fontes e trilhas de inspiração.", 640),
      item("Recursos necessários", "Locações, elenco, figurino, objetos de cena, equipamentos, licenças.", 640),
      item("Sinopse", "Conte a história do vídeo em poucas linhas.", 1000),
    ],
  );

  const C = [2600, 8198, 2000, 2600];
  const estrutura = tabela(C, [
    linha(340, C.map((w, i) => celulaTitulo(w, ["Bloco", "O que acontece", "Quadros", "Duração"][i], false)), {
      tableHeader: true,
    }),
    ...[
      ["Abertura", "Gancho: prende a atenção nos primeiros segundos"],
      ["Desenvolvimento", "Conteúdo principal, demonstração ou história"],
      ["Fechamento", "Síntese e chamada para ação"],
    ].map(([bloco, ajuda]) =>
      linha(520, [
        celula(C[0], [par([rotulo(bloco, { size: 15 })]), par([dica(ajuda, { size: 13 })])], { shading: fundo(ROTULO_FUNDO) }),
        celulaValor(C[1], false),
        celulaValor(C[2], false),
        celulaValor(C[3], false),
      ]),
    ),
    linha(340, [
      celula(C[0], [par([rotulo("Total", { size: 15, color: DESTAQUE })])], { shading: fundo(ROTULO_FUNDO) }),
      celula(C[1], [vazio()], { shading: fundo(ROTULO_FUNDO) }),
      celulaValor(C[2], false),
      celulaValor(C[3], false),
    ]),
  ]);

  return [
    ...tituloSecao("01 · Planejamento", "Briefing do vídeo", "Defina o propósito antes de desenhar: estas respostas orientam todas as decisões do storyboard."),
    tabelaBriefing,
    subtitulo("Estrutura narrativa"),
    estrutura,
  ];
}

// ---------- Guia de linguagem audiovisual ----------
function guia() {
  const colunas = [
    {
      titulo: "Enquadramento (plano)",
      itens: [
        ["GPG", "Grande plano geral", "Paisagem ampla; situa o local da ação."],
        ["PG", "Plano geral", "Ambiente completo, personagens de corpo inteiro."],
        ["PC", "Plano de conjunto", "Grupo de pessoas e parte do cenário."],
        ["PA", "Plano americano", "Personagem cortado na altura dos joelhos."],
        ["PM", "Plano médio", "Da cintura para cima; conversas e explicações."],
        ["PP", "Primeiro plano", "Do peito para cima; destaca a expressão."],
        ["PPP", "Primeiríssimo plano (close)", "Rosto em destaque; emoção."],
        ["PD", "Plano detalhe", "Objeto ou parte do corpo: mãos, peça, tela."],
      ],
    },
    {
      titulo: "Ângulo de câmera",
      itens: [
        ["Normal", "Altura dos olhos", "Ponto de vista neutro e natural."],
        ["Plongée", "De cima para baixo", "Diminui o personagem; vulnerabilidade."],
        ["Contra-plongée", "De baixo para cima", "Engrandece o personagem; poder."],
        ["Zenital", "Vista superior", "Perpendicular ao chão; bancadas e processos."],
        ["Holandês", "Câmera inclinada", "Tensão, desequilíbrio, estranhamento."],
        ["OTS", "Sobre o ombro", "Diálogos e demonstrações para alguém."],
        ["POV", "Câmera subjetiva", "Mostra o que o personagem vê."],
      ],
    },
    {
      titulo: "Movimento de câmera",
      itens: [
        ["Fixa", "Câmera parada", "Tripé; estabilidade e foco no conteúdo."],
        ["Pan", "Panorâmica", "Gira na horizontal sobre o próprio eixo."],
        ["Tilt", "Inclinação vertical", "Gira para cima ou para baixo."],
        ["Travelling", "Deslocamento", "A câmera se move acompanhando a ação."],
        ["Dolly in/out", "Aproximação física", "A câmera avança ou recua no espaço."],
        ["Zoom in/out", "Aproximação óptica", "A lente aproxima ou afasta a imagem."],
        ["Na mão", "Câmera livre", "Realismo, urgência, bastidores."],
        ["Aérea", "Drone ou grua", "Movimentos amplos e elevados."],
      ],
    },
    {
      titulo: "Transição",
      itens: [
        ["Corte seco", "Troca direta", "A mais usada; mantém o ritmo."],
        ["Fusão", "Dissolve", "Uma imagem se dissolve na outra; passagem de tempo."],
        ["Fade in", "Surge do preto", "Abertura do vídeo ou de um bloco."],
        ["Fade out", "Escurece ao preto", "Encerramento do vídeo ou de um bloco."],
        ["Wipe", "Cortina", "Uma imagem empurra ou varre a outra."],
        ["Match cut", "Corte por semelhança", "Liga formas ou movimentos parecidos."],
        ["J / L-cut", "Áudio deslocado", "O som antecipa ou prolonga a cena."],
      ],
    },
  ];

  const W = [3850, 3850, 3849, 3849];
  const legenda = tabela(W, [
    linha(360, colunas.map((c, i) => celulaTitulo(W[i], c.titulo, false)), { tableHeader: true }),
    new TableRow({
      cantSplit: true,
      children: colunas.map((c, i) =>
        celula(
          W[i],
          c.itens.flatMap(([sigla, nome, descricao]) => [
            par([txt(sigla, { bold: true, size: 17, color: DESTAQUE }), txt(`  ${nome}`, { bold: true, size: 16, color: AZUL })], {
              spacing: { before: 70, after: 0 },
            }),
            par([dica(descricao, { size: 15 })], { spacing: { after: 30 } }),
          ]),
          { verticalAlign: VerticalAlign.TOP, margins: { top: 60, bottom: 100, left: 130, right: 110 } },
        ),
      ),
    }),
  ]);

  const passo = (partes) =>
    new Paragraph({
      numbering: { reference: "passos", level: 0 },
      spacing: { before: 0, after: 50 },
      children: partes.map(([t, negrito]) => txt(t, { size: 17, bold: !!negrito, color: negrito ? AZUL : "333A47" })),
    });

  return [
    ...tituloSecao("02 · Referência", "Guia rápido de linguagem audiovisual", "Use as siglas abaixo nos campos de cada quadro para manter a equipe falando a mesma língua."),
    legenda,
    subtitulo("Como usar este modelo"),
    passo([["Preencha a ", 0], ["ficha técnica", 1], [" e o ", 0], ["briefing", 1], [" antes de desenhar os quadros.", 0]]),
    passo([["Edite o ", 0], ["cabeçalho", 1], [" uma única vez (clique duas vezes no topo da página): projeto, versão e data se repetem em todas as páginas.", 0]]),
    passo([["Escolha o layout: ", 0], ["detalhado", 1], [" (2 quadros por página), ", 0], ["rascunho", 1], [" (6 por página) ou ", 0], ["vertical 9:16", 1], [" (4 por página). Exclua as páginas que não usar.", 0]]),
    passo([["Para usar uma imagem, clique na moldura do quadro e cole (Ctrl+V): ela substitui a moldura. Tamanho no layout detalhado: ", 0], ["12 × 6,75 cm", 1], [". Para desenhar à mão, imprima em A4 paisagem.", 0]]),
    passo([["Precisa de mais quadros? Clique na tabela do quadro, selecione-a inteira, copie e cole logo abaixo; depois atualize a numeração.", 0]]),
    passo([["Some as durações dos quadros e registre o total e as aprovações na ", 0], ["última página", 1], [".", 0]]),
  ];
}

// ---------- Storyboard detalhado (2 quadros por página) ----------
function quadroDetalhado(n) {
  const A = 6920, B = 1700, C = 2539, D = 1700, E = 2539;
  const TEXTO = C + D + E;
  const campoLongo = (altura, nome, keepNext = true) =>
    linha(altura, [
      celulaRotulo(B, nome, keepNext),
      celula(TEXTO, [vazio({ keepNext })], { columnSpan: 3, verticalAlign: VerticalAlign.TOP }),
    ]);

  return tabela([A, B, C, D, E], [
    linha(360, [celulaTitulo(A, `QUADRO ${num(n)}`), celulaRotulo(B, "Cena"), celulaValor(C), celulaRotulo(D, "Plano"), celulaValor(E)]),
    linha(380, [
      celulaMoldura(A, MOLDURA_16x9, IMG_DETALHE, `Moldura 16:9 do quadro ${num(n)}`, { rowSpan: 8 }),
      celulaRotulo(B, "Duração"),
      celulaValor(C),
      celulaRotulo(D, "Timecode"),
      celulaValor(E),
    ]),
    linha(380, [celulaRotulo(B, "Enquadramento"), celulaValor(C), celulaRotulo(D, "Ângulo"), celulaValor(E)]),
    linha(380, [celulaRotulo(B, "Movimento"), celulaValor(C), celulaRotulo(D, "Transição"), celulaValor(E)]),
    campoLongo(820, "Ação / descrição visual"),
    campoLongo(820, "Narração / diálogo"),
    campoLongo(400, "Trilha / efeitos sonoros"),
    campoLongo(400, "Texto na tela"),
    campoLongo(380, "Observações", false),
  ]);
}

function storyboardDetalhado(paginas) {
  const blocos = [
    ...tituloSecao("03 · Storyboard", "Quadros detalhados (16:9)"),
  ];
  for (let p = 0; p < paginas; p++) {
    if (p > 0) blocos.push(respiro(0, { pageBreakBefore: true }));
    blocos.push(quadroDetalhado(p * 2 + 1), respiro(200), quadroDetalhado(p * 2 + 2));
  }
  return blocos;
}

// ---------- Grade de quadros (rascunho 16:9 e vertical 9:16) ----------
function grade({ colunas, largura, espaco, imagem, dimensoes, proporcao, inicio, linhasDeQuadros, campos }) {
  const larguras = [];
  for (let i = 0; i < colunas; i++) {
    if (i > 0) larguras.push(espaco);
    larguras.push(largura);
  }
  const porColuna = (fn) => {
    const cells = [];
    for (let i = 0; i < colunas; i++) {
      if (i > 0) cells.push(celulaVazia(espaco));
      cells.push(fn(i));
    }
    return cells;
  };
  const campoTexto = (nome) => (
    celula(largura, [par([rotulo(nome, { size: 13 })], { keepNext: true }), vazio({ keepNext: true })], {
      verticalAlign: VerticalAlign.TOP,
      margins: { top: 50, bottom: 40, left: 90, right: 90 },
    })
  );
  const campoPlano = () =>
    celula(
      largura,
      [
        par([rotulo("Plano", { size: 13 }), new TextRun({ children: [new Tab()] }), rotulo("Duração", { size: 13 })], {
          tabStops: [{ type: TabStopType.LEFT, position: Math.round(largura / 2) - 90 }],
        }),
      ],
      { shading: fundo(ROTULO_FUNDO) },
    );

  const rows = [];
  for (let l = 0; l < linhasDeQuadros; l++) {
    const base = inicio + l * colunas;
    if (l > 0) rows.push(new TableRow({ height: { value: 220, rule: HeightRule.EXACT }, children: porColuna(() => celulaVazia(largura)) }));
    rows.push(linha(320, porColuna((i) => celulaTitulo(largura, `QUADRO ${num(base + i)}`))));
    rows.push(
      linha(
        Math.round(dimensoes.height * 15) + 120,
        porColuna((i) => celulaMoldura(largura, imagem, dimensoes, `Moldura ${proporcao} do quadro ${num(base + i)}`)),
      ),
    );
    for (const [nome, altura] of campos) rows.push(linha(altura, porColuna(() => campoTexto(nome))));
    rows.push(linha(340, porColuna(campoPlano)));
  }
  return tabela(larguras, rows, { borders: TABELA_SEM_BORDAS });
}

function storyboardRascunho(inicio) {
  return [
    ...tituloSecao("04 · Storyboard", "Rascunho rápido (16:9)"),
    grade({
      colunas: 3,
      largura: 4990,
      espaco: 214,
      imagem: MOLDURA_16x9,
      dimensoes: IMG_RASCUNHO,
      proporcao: "16:9",
      inicio,
      linhasDeQuadros: 2,
      campos: [["Ação", 560], ["Áudio", 560]],
    }),
  ];
}

function storyboardVertical(inicio) {
  return [
    ...tituloSecao("05 · Storyboard", "Formato vertical (9:16) · Reels, Shorts e TikTok"),
    grade({
      colunas: 4,
      largura: 3671,
      espaco: 238,
      imagem: MOLDURA_9x16,
      dimensoes: IMG_VERTICAL,
      proporcao: "9:16",
      inicio,
      linhasDeQuadros: 1,
      campos: [["Ação", 820], ["Áudio", 820], ["Texto na tela", 520]],
    }),
  ];
}

// ---------- Controle de versões e aprovação ----------
function aprovacao() {
  const V = [1600, 2000, 8598, 3200];
  const versoes = tabela(V, [
    linha(340, V.map((w, i) => celulaTitulo(w, ["Versão", "Data", "Alterações realizadas", "Responsável"][i], false)), {
      tableHeader: true,
    }),
    ...Array.from({ length: 7 }, () => linha(400, V.map((w) => celulaValor(w, false)))),
  ]);

  const R = [2300, 2500, 2300, 2500, 1600, 4198];
  const caixa = (texto) => [new CheckBox({ checked: false }), txt(` ${texto}   `, { size: 17 })];
  const resumo = tabela(R, [
    linha(440, [
      celulaRotulo(R[0], "Total de quadros", false),
      celulaValor(R[1], false),
      celulaRotulo(R[2], "Duração total", false),
      celulaValor(R[3], false),
      celulaRotulo(R[4], "Status", false),
      celula(R[5], [par([...caixa("Rascunho"), ...caixa("Em revisão"), ...caixa("Aprovado")])]),
    ]),
  ]);

  const comentarios = tabela([LARGURA], [linha(1400, [celula(LARGURA, [vazio()], { verticalAlign: VerticalAlign.TOP })])]);

  const S = [4966, 250, 4966, 250, 4966];
  const assinatura = (papel) =>
    celula(
      S[0],
      [
        par([txt("", { size: 18 })], { spacing: { before: 700 } }),
        par([txt(papel, { bold: true, size: 17, color: AZUL })], {
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: AZUL, space: 6 } },
        }),
        par([dica("Nome, assinatura e data", { size: 14 })]),
      ],
      { borders: SEM_BORDAS },
    );
  const assinaturas = tabela(
    S,
    [
      new TableRow({
        cantSplit: true,
        children: [
          assinatura("Roteiro"),
          celulaVazia(S[1]),
          assinatura("Direção / produção"),
          celulaVazia(S[3]),
          assinatura("Cliente / coordenação"),
        ],
      }),
    ],
    { borders: TABELA_SEM_BORDAS },
  );

  return [
    ...tituloSecao("06 · Fechamento", "Controle de versões e aprovação"),
    versoes,
    subtitulo("Resumo do storyboard"),
    resumo,
    subtitulo("Comentários da revisão"),
    comentarios,
    subtitulo("Aprovação"),
    assinaturas,
  ];
}

// ---------- Cabeçalho e rodapé ----------
const tabDireita = () => new Tab();
const TAB_DIREITA = [{ type: TabStopType.RIGHT, position: LARGURA }];

const cabecalho = new Header({
  children: [
    par(
      [
        txt("Storyboard", { bold: true, size: 15, color: DESTAQUE, allCaps: true, characterSpacing: 20 }),
        txt("   |   ", { size: 15, color: LINHA }),
        txt("[Nome do projeto]", { size: 16, color: AZUL }),
        new TextRun({ children: [tabDireita()] }),
        txt("Versão ", { size: 15, color: APAGADO }),
        txt("[1.0]", { size: 16, color: AZUL }),
        txt("   ·   ", { size: 15, color: LINHA }),
        txt("[dd/mm/aaaa]", { size: 16, color: AZUL }),
      ],
      { style: "Header", tabStops: TAB_DIREITA, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: LINHA, space: 4 } } },
    ),
  ],
});

const rodape = new Footer({
  children: [
    par(
      [
        dica("Modelo de storyboard para desenvolvimento de vídeos", { size: 14 }),
        new TextRun({ children: [tabDireita()] }),
        new TextRun({ font: FONTE, size: 14, color: APAGADO, children: ["Página ", PageNumber.CURRENT, " de ", PageNumber.TOTAL_PAGES] }),
      ],
      { style: "Footer", tabStops: TAB_DIREITA },
    ),
  ],
});

// ---------- Documento ----------
const doc = new Document({
  title: "Modelo de storyboard para vídeos",
  subject: "Storyboard",
  description: "Modelo de storyboard para planejamento e desenvolvimento de vídeos",
  keywords: "storyboard, vídeo, roteiro, pré-produção, audiovisual",
  styles: {
    default: { document: { run: { font: FONTE, size: 18, color: "222B3A", language: { value: "pt-BR" } } } },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { font: FONTE, size: 32, bold: true, color: AZUL },
        paragraph: { spacing: { before: 0, after: 160 }, outlineLevel: 0 },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { font: FONTE, size: 22, bold: true, color: AZUL },
        paragraph: { spacing: { before: 260, after: 110 }, outlineLevel: 1 },
      },
      { id: "Header", name: "header", basedOn: "Normal", run: { font: FONTE, size: 16, color: AZUL } },
      { id: "Footer", name: "footer", basedOn: "Normal", run: { font: FONTE, size: 14, color: APAGADO } },
    ],
  },
  numbering: {
    config: [
      {
        reference: "passos",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: {
              run: { bold: true, color: DESTAQUE, font: FONTE, size: 17 },
              paragraph: { indent: { left: 360, hanging: 300 } },
            },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        titlePage: true,
        page: {
          size: { width: 11906, height: 16838, orientation: PageOrientation.LANDSCAPE },
          margin: MARGEM,
        },
      },
      headers: { default: cabecalho, first: new Header({ children: [vazio()] }) },
      footers: { default: rodape, first: new Footer({ children: [vazio()] }) },
      children: [
        capa(),
        ...briefing(),
        ...guia(),
        ...storyboardDetalhado(3),
        ...storyboardRascunho(1),
        ...storyboardVertical(1),
        ...aprovacao(),
      ],
    },
  ],
});

(async () => {
  const zip = await JSZip.loadAsync(await Packer.toBuffer(doc));

  // Caixas de seleção: grava o símbolo como texto, como o próprio Word faz
  const corpo = await zip.file("word/document.xml").async("string");
  const simbolo = '<w:r><w:sym w:char="2610" w:font="MS Gothic"/></w:r>';
  if (!corpo.includes(simbolo)) throw new Error("Caixas de seleção não encontradas no document.xml");
  zip.file(
    "word/document.xml",
    corpo.replaceAll(
      simbolo,
      '<w:r><w:rPr><w:rFonts w:ascii="MS Gothic" w:eastAsia="MS Gothic" w:hAnsi="MS Gothic" w:hint="eastAsia"/></w:rPr><w:t>\u2610</w:t></w:r>',
    ),
  );
  const gerar = () => zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  fs.writeFileSync(`${saida}.docx`, await gerar());

  // .dotx = mesmo pacote com o tipo de conteúdo de modelo do Word
  const tipos = await zip.file("[Content_Types].xml").async("string");
  const tiposModelo = tipos.replace(
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml",
  );
  if (tiposModelo === tipos) throw new Error("Tipo de conteúdo principal não encontrado para gerar o .dotx");
  zip.file("[Content_Types].xml", tiposModelo);
  fs.writeFileSync(`${saida}.dotx`, await gerar());

  console.log(`Gerados: ${saida}.docx e ${saida}.dotx`);
})();
