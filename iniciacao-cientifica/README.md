# Contaminação dentro das escolas

Trabalho de Iniciação Científica da 3ª Série (Escola SESI de Referência Paragominas),
unidade curricular Aplicando Conhecimentos e Propondo Soluções.

Pesquisa bibliográfica na SciELO com cinco fichas de estudo, uma para cada via de
contaminação no ambiente escolar: água, solo, alimentos, mãos e ar.

## Arquivos

| Arquivo | O que é |
|---|---|
| `Contaminacao_nas_Escolas_Iniciacao_Cientifica.docx` | Trabalho escrito, editável no Word, nas normas da ABNT |
| `Contaminacao_nas_Escolas_Iniciacao_Cientifica.pdf` | Mesma versão, pronta para imprimir ou enviar |
| `Contaminacao_nas_Escolas_Slides.html` | Slides animados em um único arquivo; abre em qualquer navegador, sem internet (setas ou clique para avançar, F para tela cheia) |
| `slides-fonte/` | Fontes, foto e código de cada slide; `python3 scripts/gerar_slides_html.py` remonta o HTML |
| `figuras/` | Gráficos, esquema, foto e códigos QR usados no trabalho |
| `scripts/` | Código que gera as figuras e monta o documento |

Os slides da apresentação ficam em https://claude.ai/artifact/9G2yrV4PS9CxP4DdFdgSdv
(o link é privado até ser compartilhado pelo menu Share; por lá também dá para
baixar em PowerPoint ou PDF).

## Artigos fichados

1. MORAES *et al.* (2018), água de bebedouros, Santa Rita (PB). https://doi.org/10.1590/S1413-41522018159099
2. NUNES *et al.* (2000), areia das áreas de lazer, Araçatuba (SP). https://doi.org/10.1590/S0034-89102000000600015
3. CARDOSO *et al.* (2010), produção da merenda, Salvador (BA). https://doi.org/10.1590/S1415-52732010000500010
4. COSTA *et al.* (2023), higienização das mãos, Álvares Machado (SP). https://doi.org/10.1590/1983-1447.2023.20220344.pt
5. FERREIRA; CARDOSO (2013), qualidade do ar, Coimbra (Portugal). https://doi.org/10.1590/S0034-8910.2013047004810

## Normas seguidas no documento

- NBR 14724: estrutura, margens (3 cm superior e esquerda, 2 cm inferior e direita),
  fonte 12, entrelinhas 1,5, paginação a partir da Introdução no canto superior direito.
- NBR 6024 e 6027: numeração progressiva das seções e sumário.
- NBR 6028: resumo e palavras-chave.
- NBR 10520:2023: citações no sistema autor-data, citação longa com recuo de 4 cm.
- NBR 6023:2018: referências em ordem alfabética.

## Como gerar de novo

Depois de alterar o texto em `scripts/conteudo.js`:

```bash
pip install matplotlib qrcode   # só na primeira vez
npm install docx                # só na primeira vez
bash scripts/montar.sh
```

O script refaz as figuras, monta o `.docx`, converte para PDF (LibreOffice) e
preenche sozinho os números de página do sumário e da lista de ilustrações.

## Antes de entregar

- Conferir a grafia dos nomes na capa e o nome da professora orientadora.
- A capa informa "3ª Série do Ensino Médio"; ajustar em `scripts/conteudo.js` se for diferente.
- A foto da Figura 1 é do NIAID (domínio público), obtida no Wikimedia Commons.
