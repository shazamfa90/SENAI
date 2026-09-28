"""Gera as molduras-guia (PNG) usadas nos quadros do modelo de storyboard.

Cada moldura traz: borda, grade de terços, cruz central, área segura
tracejada e um rótulo com a proporção. As linhas são bem claras para
não atrapalhar quem desenha por cima (impresso) ou cola uma imagem.

Uso: python3 gerar_molduras.py <pasta_de_saida>
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

BORDA = (175, 182, 196)
TERCOS = (226, 230, 236)
SEGURA = (200, 206, 216)
CRUZ = (180, 187, 199)
TEXTO = (165, 173, 186)

FONTES = [
    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]


def fonte(tamanho):
    for caminho in FONTES:
        if Path(caminho).exists():
            return ImageFont.truetype(caminho, tamanho)
    return ImageFont.load_default()


def retangulo_tracejado(draw, x0, y0, x1, y1, cor, largura, traco=18, espaco=12):
    def linha(xa, ya, xb, yb):
        comprimento = max(abs(xb - xa), abs(yb - ya))
        passo = traco + espaco
        for inicio in range(0, comprimento, passo):
            fim = min(inicio + traco, comprimento)
            if xa == xb:
                draw.line([(xa, ya + inicio), (xa, ya + fim)], fill=cor, width=largura)
            else:
                draw.line([(xa + inicio, ya), (xa + fim, ya)], fill=cor, width=largura)

    linha(x0, y0, x1, y0)
    linha(x0, y1, x1, y1)
    linha(x0, y0, x0, y1)
    linha(x1, y0, x1, y1)


def moldura(largura, altura, rotulo, dica, destino):
    img = Image.new("RGB", (largura, altura), "white")
    d = ImageDraw.Draw(img)
    menor = min(largura, altura)

    # Grade de terços
    for i in (1, 2):
        x = round(largura * i / 3)
        y = round(altura * i / 3)
        d.line([(x, 0), (x, altura)], fill=TERCOS, width=3)
        d.line([(0, y), (largura, y)], fill=TERCOS, width=3)

    # Área segura de título (90%)
    mx, my = round(largura * 0.05), round(altura * 0.05)
    retangulo_tracejado(d, mx, my, largura - mx, altura - my, SEGURA, 3)

    # Cruz central
    cx, cy, r = largura // 2, altura // 2, round(menor * 0.035)
    d.line([(cx - r, cy), (cx + r, cy)], fill=CRUZ, width=3)
    d.line([(cx, cy - r), (cx, cy + r)], fill=CRUZ, width=3)

    # Rótulos
    f_rotulo = fonte(round(menor * 0.045))
    d.text((mx + round(menor * 0.02), my + round(menor * 0.015)), rotulo, fill=TEXTO, font=f_rotulo)
    f_dica = fonte(round(menor * 0.04))
    caixa = d.textbbox((0, 0), dica, font=f_dica)
    tw, th = caixa[2] - caixa[0], caixa[3] - caixa[1]
    tx, ty = (largura - tw) // 2, altura - my - th - round(menor * 0.035)
    folga = round(menor * 0.015)
    d.rectangle([(tx - folga, ty - folga), (tx + tw + folga, ty + th + folga * 2)], fill="white")
    d.text((tx, ty - caixa[1]), dica, fill=TEXTO, font=f_dica)

    # Borda externa
    d.rectangle([(0, 0), (largura - 1, altura - 1)], outline=BORDA, width=7)

    img.save(destino, optimize=True)


def main():
    saida = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
    saida.mkdir(parents=True, exist_ok=True)
    moldura(1920, 1080, "16:9", "Desenhe ou cole a imagem do quadro aqui", saida / "moldura_16x9.png")
    moldura(1080, 1920, "9:16", "Desenhe ou cole aqui", saida / "moldura_9x16.png")


if __name__ == "__main__":
    main()
