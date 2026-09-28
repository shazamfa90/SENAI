# Modelo de storyboard para vídeos (Word)

Modelo em A4 paisagem para planejar e desenvolver vídeos, da ideia à aprovação.

| Arquivo | Para que serve |
|---|---|
| `Modelo_Storyboard_Video.dotx` | Modelo do Word: cada clique duplo cria um documento novo a partir dele. |
| `Modelo_Storyboard_Video.docx` | Mesmo conteúdo como documento comum (abre também no Google Docs e no LibreOffice). |
| `Modelo_Storyboard_Video.pdf` | Versão para imprimir e desenhar os quadros à mão. |

## Conteúdo (9 páginas)

1. **Capa e ficha técnica**: projeto, equipe, duração, formato (16:9, 9:16, 1:1, 4:5), resolução, veiculação e prazo.
2. **Briefing**: objetivo, mensagem principal, público, tom e estilo, referências, recursos e sinopse, com a estrutura narrativa (abertura, desenvolvimento e fechamento).
3. **Guia rápido de linguagem audiovisual**: siglas de enquadramento, ângulo, movimento de câmera e transição, além das instruções de uso.
4. **Quadros detalhados (16:9)**: 2 por página, 6 no total. Cada quadro tem cena, plano, duração, timecode, enquadramento, ângulo, movimento, transição, ação, narração, trilha/SFX, texto na tela e observações.
5. **Rascunho rápido (16:9)**: 6 quadros por página para esboçar a sequência.
6. **Formato vertical (9:16)**: 4 quadros por página para Reels, Shorts e TikTok.
7. **Controle de versões e aprovação**: histórico, resumo (total de quadros e duração), comentários e assinaturas.

## Como usar

- Edite o **cabeçalho** uma única vez (clique duas vezes no topo da página). Nome do projeto, versão e data aparecem em todas as páginas.
- Para usar uma imagem no quadro, clique na moldura e cole (Ctrl+V): a imagem substitui a moldura. No layout detalhado o tamanho é 12 × 6,75 cm.
- Para ter mais quadros, selecione a tabela de um quadro, copie e cole logo abaixo. Depois ajuste a numeração.
- Exclua as páginas dos layouts que você não for usar.

## Gerar novamente

Os arquivos são gerados por script. Para mudar cores, campos ou a quantidade de quadros, edite `gerador/gerar_modelo.js` e rode:

```bash
cd gerador
pip install pillow
npm install
npm run gerar
```
