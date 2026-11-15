"""Le o PDF gerado e grava em paginas.json a pagina de cada titulo e ilustracao.

A numeracao segue a ABNT: a capa nao conta; a folha de rosto e a pagina 1.
Sai com codigo 0 quando paginas.json ja estava correto (sumario estavel).
"""
import json
import re
import subprocess
import sys
from pathlib import Path

pdf = sys.argv[1]
aqui = Path(__file__).resolve().parent
txt = subprocess.run(["pdftotext", "-layout", pdf, "-"], capture_output=True, text=True).stdout
paginas = txt.split("\f")

conteudo = (aqui / "conteudo.js").read_text(encoding="utf8")
titulos = re.findall(r'\{ h[123]: "([^"]+)", id: "([^"]+)"', conteudo)
alvos = [(t, i) for t, i in titulos]
alvos.append(("REFERÊNCIAS", "refs"))
alvos.append(("APÊNDICE A", "apA"))
figs = re.findall(r'n: (\d+), id: "(fig\d+)"', conteudo)
alvos += [(f"Figura {n} –", i) for n, i in figs]
quadros = re.findall(r'n: (\d+), id: "(q\d+)"', conteudo)
alvos += [(f"Quadro {n} –", i) for n, i in quadros]
fichas = re.findall(r'\{ ficha: (\d+), n: (\d+) \}', conteudo)
alvos += [(f"Quadro {n} –", f"ficha{int(k) + 1}") for k, n in fichas]


def norm(s):
    return re.sub(r"\s+", " ", s).strip()


# primeira pagina textual: a que comeca com "1 INTRODUCAO" depois do sumario
inicio = next(i for i, p in enumerate(paginas)
              if re.search(r"^\s*\d*\s*\n*\s*1 INTRODUÇÃO\s*$", p[:400], re.M) and "SUMÁRIO" not in p)
resultado = {}
for texto, ident in alvos:
    for i in range(inicio, len(paginas)):
        linhas = [norm(l) for l in paginas[i].split("\n")]
        if any(l.startswith(texto) for l in linhas):
            resultado[ident] = i  # indice fisico i -> pagina i (capa = 0)
            break
    else:
        print("NAO ENCONTRADO:", texto)

arq = aqui / "paginas.json"
antigo = json.loads(arq.read_text()) if arq.exists() else {}
arq.write_text(json.dumps(resultado, indent=1, ensure_ascii=False))
sys.exit(0 if antigo == resultado else 1)
