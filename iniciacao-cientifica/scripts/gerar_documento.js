// Monta o trabalho em .docx seguindo a ABNT (NBR 14724, 6023, 6024, 6027, 6028, 10520).
// Uso: node scripts/gerar_documento.js   (as paginas do sumario vem de paginas.json)
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell,
  Header, AlignmentType, WidthType, BorderStyle, ShadingType, VerticalAlign,
  TabStopType, LeaderType, Tab, PageNumber, PageBreak, Bookmark, InternalHyperlink,
  SectionType, LineRuleType,
} = require("docx");
const C = require("./conteudo.js");

const RAIZ = path.resolve(__dirname, "..");
const FIG = path.join(RAIZ, "figuras");
const PAG = fs.existsSync(path.join(__dirname, "paginas.json"))
  ? JSON.parse(fs.readFileSync(path.join(__dirname, "paginas.json"), "utf8"))
  : {};

// Medidas (twips; 567 twips = 1 cm)
const CM = 567;
const MARGENS = { top: 3 * CM, left: 3 * CM, right: 2 * CM, bottom: 2 * CM, header: 2 * CM, footer: 1.25 * CM };
const LARGURA = 16 * CM; // mancha de texto: 21 - 3 - 2
const FONTE = "Arial";
const T12 = 24, T10 = 20;
const L15 = 360, L10 = 240; // entrelinhas 1,5 e simples
const RECUO = Math.round(1.25 * CM);
const PX = 37.795; // px por cm (96 dpi)

// ---- texto com marcacao **negrito** e *italico* ---------------------------
function runs(texto, base = {}) {
  const out = [];
  const partes = texto.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  for (const p of partes) {
    if (p.startsWith("**")) out.push(new TextRun({ ...base, text: p.slice(2, -2), bold: true }));
    else if (p.startsWith("*")) out.push(new TextRun({ ...base, text: p.slice(1, -1), italics: true }));
    else out.push(new TextRun({ ...base, text: p }));
  }
  return out;
}
const limpo = (t) => t.replace(/\*/g, "");

function par(texto, o = {}) {
  return new Paragraph({
    alignment: o.align ?? AlignmentType.JUSTIFIED,
    indent: o.indent ?? { firstLine: RECUO },
    spacing: { line: o.line ?? L15, lineRule: LineRuleType.AUTO, before: o.before ?? 0, after: o.after ?? 0 },
    keepNext: o.keepNext,
    keepLines: o.keepLines,
    pageBreakBefore: o.pageBreakBefore,
    children: o.children ?? runs(texto, { font: FONTE, size: o.size ?? T12, bold: o.bold }),
  });
}
const vazio = (n = 1, line = L15) =>
  Array.from({ length: n }, () => par("", { indent: {}, line }));

// ---- titulos ---------------------------------------------------------------
function titulo(texto, nivel, id, primeiroDaPagina, quebra) {
  const estilo = {
    1: { bold: true },
    2: { bold: false },
    3: { bold: true },
  }[nivel];
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    outlineLevel: nivel - 1,
    pageBreakBefore: nivel === 1 || !!quebra,
    keepNext: true,
    spacing: { lineRule: LineRuleType.AUTO, line: L15, before: primeiroDaPagina || quebra || nivel === 1 ? 0 : L15, after: L15 },
    children: [new Bookmark({ id, children: [new TextRun({ text: texto, font: FONTE, size: T12, ...estilo })] })],
  });
}
function tituloCentral(texto, id, quebra = true) {
  const r = new TextRun({ text: texto, font: FONTE, size: T12, bold: true });
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    pageBreakBefore: quebra,
    keepNext: true,
    spacing: { lineRule: LineRuleType.AUTO, line: L15, before: 0, after: L15 },
    children: id ? [new Bookmark({ id, children: [r] })] : [r],
  });
}

// ---- ilustracoes -----------------------------------------------------------
function legenda(texto, id) {
  const filhos = runs(texto, { font: FONTE, size: T10 });
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    keepNext: true,
    spacing: { lineRule: LineRuleType.AUTO, line: L10, before: 240, after: 80 },
    children: id ? [new Bookmark({ id, children: filhos })] : filhos,
  });
}
function fonte(texto) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { lineRule: LineRuleType.AUTO, line: L10, before: 80, after: 240 },
    children: runs(texto, { font: FONTE, size: T10 }),
  });
}
function tamanhoImagem(arquivo, largCm) {
  const buf = fs.readFileSync(path.join(FIG, arquivo));
  let w, h;
  if (arquivo.endsWith(".png")) { w = buf.readUInt32BE(16); h = buf.readUInt32BE(20); }
  else { // JPEG: procura o marcador SOF
    let i = 2;
    while (i < buf.length) {
      const m = buf[i + 1], len = buf.readUInt16BE(i + 2);
      if (m >= 0xc0 && m <= 0xc3) { h = buf.readUInt16BE(i + 5); w = buf.readUInt16BE(i + 7); break; }
      i += 2 + len;
    }
  }
  return { buf, width: Math.round(largCm * PX), height: Math.round((largCm * PX * h) / w) };
}
function figura(f) {
  const im = tamanhoImagem(f.arquivo, f.largCm);
  return [
    legenda(`Figura ${f.n} – ${f.titulo}`, f.id),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { lineRule: LineRuleType.AUTO, line: L10, before: 0, after: 0 },
      children: [new ImageRun({
        type: f.tipo, data: im.buf,
        transformation: { width: im.width, height: im.height },
        altText: { title: `Figura ${f.n}`, description: limpo(f.titulo), name: `Figura ${f.n}` },
      })],
    }),
    fonte(f.fonte),
  ];
}

// ---- quadros ---------------------------------------------------------------
const BORDA = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
const BORDAS = { top: BORDA, bottom: BORDA, left: BORDA, right: BORDA };
const MARG = { top: 60, bottom: 60, left: 100, right: 100 };

function celula(conteudo, larg, o = {}) {
  const filhos = Array.isArray(conteudo) ? conteudo : [new Paragraph({
    alignment: o.align ?? AlignmentType.LEFT,
    keepNext: o.junto !== false,
    spacing: { lineRule: LineRuleType.AUTO, line: L10, before: 0, after: 0 },
    children: runs(conteudo, { font: FONTE, size: T10, bold: o.bold }),
  })];
  return new TableCell({
    width: { size: larg, type: WidthType.DXA },
    borders: BORDAS, margins: MARG,
    verticalAlign: o.valign ?? VerticalAlign.TOP,
    shading: o.cinza ? { type: ShadingType.CLEAR, fill: "EDEDED", color: "auto" } : undefined,
    children: filhos,
  });
}
function tabela(larguras, linhas) {
  return new Table({
    width: { size: larguras.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: larguras,
    alignment: AlignmentType.CENTER,
    rows: linhas,
  });
}
function quadro(q) {
  const cab = new TableRow({
    tableHeader: true, cantSplit: true,
    children: q.cabecalho.map((c, i) => celula(c, q.larguras[i], { bold: true, cinza: true, align: AlignmentType.CENTER, valign: VerticalAlign.CENTER })),
  });
  const corpo = q.linhas.map((l) => new TableRow({
    cantSplit: true,
    children: l.map((c, i) => celula(c, q.larguras[i], { bold: i === 0 })),
  }));
  return [legenda(`Quadro ${q.n} – ${q.titulo}`, q.id), tabela(q.larguras, [cab, ...corpo]), fonte(q.fonte)];
}
function ficha(f, n) {
  const L = [1900, LARGURA - 1900];
  const linha = (rotulo, texto) => new TableRow({
    cantSplit: true,
    children: [celula(rotulo, L[0], { bold: true, cinza: true }), celula(texto, L[1])],
  });
  const qr = tamanhoImagem(f.qr, 1.9);
  const acesso = new Table({
    width: { size: L[1] - 200, type: WidthType.DXA },
    columnWidths: [1250, L[1] - 1450],
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE } },
    rows: [new TableRow({ children: [
      new TableCell({
        width: { size: 1250, type: WidthType.DXA },
        borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
        children: [new Paragraph({ keepNext: true, spacing: { lineRule: LineRuleType.AUTO, line: L10 }, children: [new ImageRun({
          type: "png", data: qr.buf, transformation: { width: qr.width, height: qr.height },
          altText: { title: "Código QR", description: `Código QR para ${f.doi}`, name: f.qr },
        })] })],
      }),
      new TableCell({
        width: { size: L[1] - 1450, type: WidthType.DXA },
        verticalAlign: VerticalAlign.CENTER,
        borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
        children: [
          new Paragraph({ keepNext: true, spacing: { lineRule: LineRuleType.AUTO, line: L10, after: 60 }, children: runs("Aponte a câmera do celular para o código ou acesse:", { font: FONTE, size: T10 }) }),
          new Paragraph({ keepNext: true, spacing: { lineRule: LineRuleType.AUTO, line: L10 }, children: runs(f.doi, { font: FONTE, size: T10 }) }),
        ],
      }),
    ] })],
  });
  const linhas = [
    linha("Referência", f.ref),
    linha("Tipo de estudo e local", f.tipo),
    linha("Objetivo", f.objetivo),
    linha("Como foi feito", f.metodo),
    linha("Principais resultados", f.resultados),
    linha("Conclusão dos autores", f.conclusao),
    linha("Citação direta", f.citacao),
    new TableRow({ cantSplit: true, children: [
      celula("Artigo original", L[0], { bold: true, cinza: true }),
      celula([acesso], L[1]),
    ] }),
  ];
  return [
    legenda(`Quadro ${n} – ${f.titulo}`, f.id),
    tabela(L, linhas),
    fonte(`Fonte: elaborado pelos autores (2026), com base em ${f.fonteCit}.`),
  ];
}

// ---- sumario e lista de ilustracoes ---------------------------------------
const pg = (id) => String(PAG[id] ?? "0");
function linhaSumario(rotulo, id, o = {}) {
  const [num, ...resto] = o.semNumero ? ["", rotulo] : rotulo.split(" ");
  const tit = o.semNumero ? rotulo : resto.join(" ");
  const base = { font: FONTE, size: T12, bold: o.bold };
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { lineRule: LineRuleType.AUTO, line: L15, before: 0, after: 0 },
    tabStops: [
      { type: TabStopType.LEFT, position: 1000 },
      { type: TabStopType.RIGHT, position: LARGURA, leader: LeaderType.DOT },
    ],
    indent: { left: 1000, hanging: 1000 },
    children: [new InternalHyperlink({ anchor: id, children: [
      new TextRun({ ...base, text: num }),
      new TextRun({ ...base, children: [new Tab(), tit] }),
      new TextRun({ font: FONTE, size: T12, children: [new Tab(), pg(id)] }),
    ] })],
  });
}
function linhaLista(rotulo, tit, id) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { lineRule: LineRuleType.AUTO, line: L15, before: 0, after: 0 },
    tabStops: [
      { type: TabStopType.LEFT, position: 1350 },
      { type: TabStopType.RIGHT, position: LARGURA, leader: LeaderType.DOT },
    ],
    indent: { left: 1350, hanging: 1350 },
    children: [new InternalHyperlink({ anchor: id, children: [
      new TextRun({ font: FONTE, size: T12, text: `${rotulo} –` }),
      ...[new TextRun({ font: FONTE, size: T12, children: [new Tab()] })],
      ...runs(tit, { font: FONTE, size: T12 }),
      new TextRun({ font: FONTE, size: T12, children: [new Tab(), pg(id)] }),
    ] })],
  });
}

// ---- pre-textuais ----------------------------------------------------------
const centro = (texto, o = {}) => par(texto, { align: AlignmentType.CENTER, indent: {}, ...o });
const M = C.meta;

const capa = [
  centro(M.escola, { bold: true }),
  ...vazio(4),
  ...M.autores.map((a) => centro(a)),
  ...vazio(5),
  centro(`${M.titulo}:`, { bold: true }),
  centro(M.subtitulo),
  ...vazio(11),
  centro(M.local),
  centro(M.ano),
];

const folhaRosto = [
  ...M.autores.map((a) => centro(a)),
  ...vazio(5),
  centro(`${M.titulo}:`, { bold: true }),
  centro(M.subtitulo),
  ...vazio(3),
  par(M.natureza, { indent: { left: LARGURA / 2 }, line: L10, size: T12, align: AlignmentType.LEFT }),
  par("", { indent: {}, line: L10 }),
  par(M.orientadora, { indent: { left: LARGURA / 2 }, line: L10, align: AlignmentType.LEFT }),
  ...vazio(9),
  centro(M.local),
  centro(M.ano),
];

const figuras = C.corpo.filter((b) => b.fig).map((b) => b.fig);
const quadros = [];
for (const b of C.corpo) {
  if (b.quadro) quadros.push({ n: b.quadro.n, id: b.quadro.id, titulo: b.quadro.titulo });
  if (b.ficha !== undefined) { const f = C.fichas[b.ficha]; quadros.push({ n: b.n, id: f.id, titulo: f.titulo }); }
}
quadros.sort((a, b) => a.n - b.n);

const preTextuais = [
  ...folhaRosto,
  tituloCentral("RESUMO"),
  par(C.resumo.texto, { indent: {} }),
  par("", { indent: {} }),
  par("", { indent: {}, children: [
    new TextRun({ text: "Palavras-chave: ", font: FONTE, size: T12, bold: true }),
    new TextRun({ text: C.resumo.chaves, font: FONTE, size: T12 }),
  ] }),
  tituloCentral("ABSTRACT"),
  par(C.abstract.texto, { indent: {} }),
  par("", { indent: {} }),
  par("", { indent: {}, children: [
    new TextRun({ text: "Keywords: ", font: FONTE, size: T12, bold: true }),
    new TextRun({ text: C.abstract.chaves, font: FONTE, size: T12 }),
  ] }),
  tituloCentral("LISTA DE ILUSTRAÇÕES"),
  ...figuras.map((f) => linhaLista(`Figura ${f.n}`, f.titulo, f.id)),
  par("", { indent: {} }),
  ...quadros.map((q) => linhaLista(`Quadro ${q.n}`, q.titulo, q.id)),
  tituloCentral("SUMÁRIO"),
  ...C.corpo.filter((b) => b.h1 || b.h2 || b.h3).map((b) => {
    if (b.h1) return linhaSumario(b.h1, b.id, { bold: true });
    if (b.h2) return linhaSumario(b.h2, b.id);
    return linhaSumario(b.h3, b.id, { bold: true });
  }),
  linhaSumario("REFERÊNCIAS", "refs", { bold: true, semNumero: true }),
  linhaSumario(C.apendice.titulo, C.apendice.id, { bold: true, semNumero: true }),
];

// ---- textuais --------------------------------------------------------------
const textuais = [];
let anterior = null;
for (const b of C.corpo) {
  if (b.h1) textuais.push(titulo(b.h1, 1, b.id));
  else if (b.h2) textuais.push(titulo(b.h2, 2, b.id, false, b.novaPagina));
  else if (b.h3) textuais.push(titulo(b.h3, 3, b.id, anterior && anterior.h2));
  else if (b.p) textuais.push(par(b.p));
  else if (b.cit) textuais.push(par(b.cit, { indent: { left: 4 * CM }, line: L10, size: T10, before: 240, after: 360 }));
  else if (b.alineas) {
    b.alineas.forEach((a, i) => textuais.push(par(`${String.fromCharCode(97 + i)}) ${a}`, {
      indent: { left: RECUO + 400, hanging: 400 },
    })));
  } else if (b.fig) textuais.push(...figura(b.fig));
  else if (b.quadro) textuais.push(...quadro(b.quadro));
  else if (b.ficha !== undefined) textuais.push(...ficha(C.fichas[b.ficha], b.n));
  else if (b.comentario !== undefined) textuais.push(par(C.fichas[b.comentario].comentario));
  anterior = b;
}

// referencias
textuais.push(tituloCentral("REFERÊNCIAS", "refs"));
for (const r of C.referencias) {
  textuais.push(par(r, { align: AlignmentType.LEFT, indent: {}, line: L10, after: 240, keepLines: true }));
}

// apendice
const A = C.apendice;
textuais.push(tituloCentral(A.titulo, A.id));
textuais.push(par(A.intro));
textuais.push(par("", { indent: {}, line: L10 }));
textuais.push(tabela(A.larguras, [
  new TableRow({ tableHeader: true, cantSplit: true, children: A.cabecalho.map((c, i) =>
    celula(c, A.larguras[i], { bold: true, cinza: true, align: AlignmentType.CENTER, valign: VerticalAlign.CENTER })) }),
  ...A.linhas.map((l) => new TableRow({ cantSplit: true, height: { value: 520, rule: "atLeast" }, children: [
    celula(l[0], A.larguras[0], { bold: true }),
    celula(l[1], A.larguras[1]),
    celula("", A.larguras[2]), celula("", A.larguras[3]), celula("", A.larguras[4]),
  ] })),
]));
textuais.push(fonte(AUTQ()));
function AUTQ() { return "Fonte: elaborado pelos autores (2026), com base nos artigos fichados."; }

// ---- documento -------------------------------------------------------------
const pagina = { size: { width: 11906, height: 16838 }, margin: MARGENS };
const doc = new Document({
  creator: "Grupo de Iniciação Científica – 3ª Série",
  title: `${M.titulo}: ${M.subtitulo}`,
  description: "Trabalho de Iniciação Científica – Escola SESI de Referência Paragominas",
  styles: { default: { document: { run: { font: FONTE, size: T12, language: { value: "pt-BR" } } } } },
  sections: [
    { properties: { page: pagina }, children: capa },
    { properties: { type: SectionType.NEXT_PAGE, page: { ...pagina, pageNumbers: { start: 1 } } }, children: preTextuais },
    {
      properties: { type: SectionType.NEXT_PAGE, page: pagina },
      headers: { default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ font: FONTE, size: T10, children: [PageNumber.CURRENT] })],
      })] }) },
      children: textuais,
    },
  ],
});

const saida = path.join(RAIZ, "Contaminacao_nas_Escolas_Iniciacao_Cientifica.docx");
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(saida, buf); console.log("gerado:", saida); });
