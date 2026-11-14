#!/usr/bin/env bash
# Gera figuras, monta o .docx, converte para PDF e preenche as paginas do sumario.
# Uso: bash scripts/montar.sh   (a partir da pasta iniciacao-cientifica)
set -euo pipefail
cd "$(dirname "$0")/.."
NOME="Contaminacao_nas_Escolas_Iniciacao_Cientifica"

python3 scripts/gerar_figuras.py > /dev/null
for passo in 1 2 3; do
  node scripts/gerar_documento.js > /dev/null
  python3 scripts/corrigir_marcadores.py "$NOME.docx"
  soffice --headless --convert-to pdf "$NOME.docx" > /dev/null 2>&1
  python3 scripts/paginas.py "$NOME.pdf" && break
done
echo "pronto: $NOME.docx e $NOME.pdf"
