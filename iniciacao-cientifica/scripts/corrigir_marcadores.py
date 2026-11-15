"""Da um id unico a cada marcador (bookmark) do .docx.

A biblioteca que monta o documento repete o mesmo id em todos os marcadores,
e o Word espera ids diferentes para os links do sumario funcionarem bem.
Uso: python3 scripts/corrigir_marcadores.py arquivo.docx
"""
import re
import shutil
import sys
import zipfile

docx = sys.argv[1]
tmp = docx + ".tmp"
contador = 0


def inicio(m):
    global contador
    contador += 1
    return f'<w:bookmarkStart w:name="{m.group(1)}" w:id="{contador}"/>'


with zipfile.ZipFile(docx) as entrada, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as saida:
    for item in entrada.infolist():
        if item.is_dir():
            continue
        dados = entrada.read(item.filename)
        if item.filename == "word/document.xml":
            xml = dados.decode("utf8")
            xml = re.sub(r'<w:bookmarkStart w:name="([^"]+)" w:id="\d+"/>', inicio, xml)
            # cada fim vem logo depois do seu inicio, entao recebe o mesmo numero em ordem
            fim = iter(range(1, contador + 1))
            xml = re.sub(r'<w:bookmarkEnd w:id="\d+"/>', lambda m: f'<w:bookmarkEnd w:id="{next(fim)}"/>', xml)
            dados = xml.encode("utf8")
        saida.writestr(item, dados)
shutil.move(tmp, docx)
