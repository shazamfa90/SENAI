"""Gera as figuras do trabalho (graficos e esquema) em PNG.

Todos os numeros vem dos artigos fichados; a fonte de cada um esta na legenda
da figura dentro do documento. Uso: python3 scripts/gerar_figuras.py
"""
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import qrcode
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch

OUT = Path(__file__).resolve().parent.parent / "figuras"
OUT.mkdir(exist_ok=True)

AZUL = "#2a78d6"
LARANJA = "#e0763a"
CINZA = "#b9b8b2"
TINTA = "#0b0b0b"
TINTA2 = "#52514e"
GRADE = "#e4e3de"

plt.rcParams.update({
    "font.family": ["Liberation Sans", "DejaVu Sans"],
    "font.size": 11,
    "axes.edgecolor": CINZA,
    "axes.linewidth": 0.8,
    "axes.spines.top": False,
    "axes.spines.right": False,
    "xtick.color": TINTA2,
    "ytick.color": TINTA2,
    "text.color": TINTA,
    "axes.labelcolor": TINTA2,
    "figure.dpi": 200,
    "savefig.dpi": 200,
    "savefig.facecolor": "white",
})

LARG = 6.3  # 16 cm, largura da mancha de texto


def pct(v):
    return f"{v:.1f}".replace(".", ",") + "%"


def milhar(v):
    return f"{v:,.0f}".replace(",", ".")


def salvar(fig, nome):
    fig.savefig(OUT / nome, bbox_inches="tight", pad_inches=0.12)
    plt.close(fig)
    print("ok", nome)


# Figura 1: esquema dos cinco caminhos -------------------------------------
def fig_caminhos():
    fig, ax = plt.subplots(figsize=(LARG, 4.3))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 68)
    ax.axis("off")

    caminhos = [
        ("ÁGUA", "bebedouros e caixas-d'água", "ingestão"),
        ("SOLO", "areia do parquinho e do pátio", "contato com a pele"),
        ("ALIMENTOS", "preparo e distribuição da merenda", "ingestão"),
        ("MÃOS", "higienização incompleta", "mão–boca"),
        ("AR", "salas cheias e pouco ventiladas", "respiração"),
    ]
    y0, passo, alt = 58, 12.6, 9.6
    for i, (nome, onde, via) in enumerate(caminhos):
        y = y0 - i * passo
        ax.add_patch(FancyBboxPatch((1, y - alt / 2), 43, alt,
                                    boxstyle="round,pad=0,rounding_size=1.2",
                                    fc="#eef4fc", ec=AZUL, lw=1))
        ax.text(3.5, y + 1.6, nome, fontsize=10.5, fontweight="bold", va="center")
        ax.text(3.5, y - 2.0, onde, fontsize=9, color=TINTA2, va="center")
        alvo = 32.8 + (2 - i) * 3.2
        ax.plot([44.6, 66], [y, y], color=TINTA2, lw=1, solid_capstyle="butt")
        ax.add_patch(FancyArrowPatch((66, y), (74.4, alvo),
                                     arrowstyle="-|>", mutation_scale=11,
                                     lw=1, color=TINTA2, shrinkA=0, shrinkB=0))
        ax.text(55.3, y, via, fontsize=8.5, color=TINTA2, ha="center", va="center",
                bbox=dict(fc="white", ec="none", pad=1.5))

    ax.add_patch(FancyBboxPatch((75, 22), 24, 21.6,
                                boxstyle="round,pad=0,rounding_size=1.6",
                                fc=TINTA, ec=TINTA))
    ax.text(87, 36.2, "ESTUDANTE", color="white", fontsize=11.5,
            fontweight="bold", ha="center", va="center")
    ax.text(87, 29.6, "passa boa parte\ndo dia na escola", color="#d8d7d2",
            fontsize=9, ha="center", va="center", linespacing=1.25)
    salvar(fig, "fig1_caminhos.png")


# Figura 3: agua (Moraes et al., 2018) --------------------------------------
def fig_agua():
    fig, (a, b) = plt.subplots(1, 2, figsize=(LARG, 3.0),
                               gridspec_kw={"width_ratios": [1, 1.25], "wspace": 1.05})
    nomes = ["Coliformes\ntotais", "Coliformes\ntermotolerantes"]
    vals = [100, 33.33]
    barras = a.bar(nomes, vals, width=0.52, color=AZUL)
    for r, v in zip(barras, vals):
        a.text(r.get_x() + r.get_width() / 2, v + 2.5,
               "100%" if v == 100 else pct(v), ha="center",
               fontsize=10.5, fontweight="bold")
    a.set_ylim(0, 118)
    a.set_yticks([0, 50, 100])
    a.set_yticklabels(["0", "50", "100%"])
    a.yaxis.grid(True, color=GRADE, lw=0.8)
    a.set_axisbelow(True)
    a.tick_params(length=0)
    a.set_title("Amostras fora do padrão", fontsize=10.5, loc="left", pad=10)

    freq = ["A cada 6 meses", "1 vez por ano", "Entre 1 e 2 anos",
            "Mais de 2 anos", "Sem informação"]
    v2 = [6, 29, 15, 30, 20]
    cores = [AZUL, AZUL, AZUL, LARANJA, LARANJA]
    bs = b.barh(freq[::-1], v2[::-1], height=0.58, color=cores[::-1])
    for r, v in zip(bs, v2[::-1]):
        b.text(v + 0.8, r.get_y() + r.get_height() / 2, f"{v}%", va="center",
               fontsize=10.5, fontweight="bold")
    b.set_xlim(0, 37)
    b.set_xticks([])
    b.spines["bottom"].set_visible(False)
    b.tick_params(length=0)
    b.set_title("Limpeza dos reservatórios", fontsize=10.5, loc="left", pad=10)
    salvar(fig, "fig3_agua.png")


# Figura 4: areia (Nunes et al., 2000) --------------------------------------
def fig_areia():
    fig, ax = plt.subplots(figsize=(LARG * 0.72, 3.0))
    nomes = ["Verão\n(jan. 1997)", "Inverno\n(jul. 1997)"]
    vals = [35.7, 46.4]
    frac = ["10 de 28 escolas", "13 de 28 escolas"]
    bs = ax.bar(nomes, vals, width=0.5, color=AZUL)
    for r, v, f in zip(bs, vals, frac):
        ax.text(r.get_x() + r.get_width() / 2, v + 2, pct(v), ha="center",
                fontsize=11, fontweight="bold")
        ax.text(r.get_x() + r.get_width() / 2, v / 2, f, ha="center", va="center",
                fontsize=9.5, color="white")
    ax.set_ylim(0, 62)
    ax.set_yticks([0, 20, 40, 60])
    ax.set_yticklabels(["0", "20", "40", "60%"])
    ax.yaxis.grid(True, color=GRADE, lw=0.8)
    ax.set_axisbelow(True)
    ax.tick_params(length=0)
    salvar(fig, "fig4_areia.png")


# Figura 5: merenda (Cardoso et al., 2010) ----------------------------------
def fig_merenda():
    fig, ax = plt.subplots(figsize=(LARG, 2.9))
    nomes = ["Crítico", "Insatisfatório", "Regular", "Bom", "Excelente"]
    vals = [0, 57.0, 42.6, 0.4, 0]
    n = [0, 134, 100, 1, 0]
    bs = ax.bar(nomes, vals, width=0.8, color=[AZUL, LARANJA, AZUL, AZUL, AZUL])
    for r, v, q in zip(bs, vals, n):
        rot = pct(v) if v else "0"
        ax.text(r.get_x() + r.get_width() / 2, v + 2, rot, ha="center",
                fontsize=10.5, fontweight="bold")
        if q > 1:
            ax.text(r.get_x() + r.get_width() / 2, v / 2, f"{q} escolas",
                    ha="center", va="center", fontsize=9, color="white")
    ax.set_ylim(0, 70)
    ax.set_yticks([0, 20, 40, 60])
    ax.set_yticklabels(["0", "20", "40", "60%"])
    ax.yaxis.grid(True, color=GRADE, lw=0.8)
    ax.set_axisbelow(True)
    ax.tick_params(length=0)
    salvar(fig, "fig5_merenda.png")


# Figura 6: maos (Costa et al., 2023) ---------------------------------------
def fig_maos():
    fig, ax = plt.subplots(figsize=(LARG * 0.82, 3.1))
    grupos = ["Estudantes da\nárea urbana", "Estudantes da\nárea rural"]
    antes = [61.1, 49.5]
    depois = [76.8, 75.9]
    x = [0, 1]
    w = 0.3
    b1 = ax.bar([i - w / 2 - 0.012 for i in x], antes, width=w, color=CINZA,
                label="Antes da atividade")
    b2 = ax.bar([i + w / 2 + 0.012 for i in x], depois, width=w, color=AZUL,
                label="Depois da atividade")
    for bs in (b1, b2):
        for r in bs:
            ax.text(r.get_x() + r.get_width() / 2, r.get_height() + 1.8,
                    pct(r.get_height()), ha="center", fontsize=10.5, fontweight="bold")
    ax.set_xticks(x)
    ax.set_xticklabels(grupos)
    ax.set_ylim(0, 100)
    ax.set_yticks([0, 25, 50, 75, 100])
    ax.set_yticklabels(["0", "25", "50", "75", "100%"])
    ax.yaxis.grid(True, color=GRADE, lw=0.8)
    ax.set_axisbelow(True)
    ax.tick_params(length=0)
    ax.legend(frameon=False, loc="upper center", bbox_to_anchor=(0.5, 1.2), ncol=2,
              fontsize=9.5, handlelength=1.2)
    salvar(fig, "fig6_maos.png")


# Figura 7: ar (Ferreira; Cardoso, 2013) ------------------------------------
def fig_ar():
    fig, ax = plt.subplots(figsize=(LARG * 0.8, 2.6))
    nomes = ["Limite de referência", "Maior média de\numa escola",
             "Maior pico registrado"]
    vals = [984, 1942, 5320]
    bs = ax.barh(nomes[::-1], vals[::-1], height=0.56, color=[LARANJA, LARANJA, CINZA])
    for r, v in zip(bs, vals[::-1]):
        ax.text(v + 70, r.get_y() + r.get_height() / 2, f"{milhar(v)} ppm",
                va="center", fontsize=11, fontweight="bold")
    ax.axvline(984, color=TINTA2, lw=0.9, ls=(0, (4, 3)))
    ax.set_xlim(0, 7000)
    ax.set_xticks([])
    ax.tick_params(axis="y", labelsize=10.5)
    ax.spines["bottom"].set_visible(False)
    ax.tick_params(length=0)
    salvar(fig, "fig7_ar.png")


# QR codes para os artigos originais ----------------------------------------
def qrs():
    dois = {
        "qr1_agua.png": "https://doi.org/10.1590/S1413-41522018159099",
        "qr2_areia.png": "https://doi.org/10.1590/S0034-89102000000600015",
        "qr3_merenda.png": "https://doi.org/10.1590/S1415-52732010000500010",
        "qr4_maos.png": "https://doi.org/10.1590/1983-1447.2023.20220344.pt",
        "qr5_ar.png": "https://doi.org/10.1590/S0034-8910.2013047004810",
    }
    for nome, url in dois.items():
        q = qrcode.QRCode(border=1, box_size=10,
                          error_correction=qrcode.constants.ERROR_CORRECT_M)
        q.add_data(url)
        q.make(fit=True)
        q.make_image(fill_color="black", back_color="white").save(OUT / nome)
        print("ok", nome)


if __name__ == "__main__":
    fig_caminhos()
    fig_agua()
    fig_areia()
    fig_merenda()
    fig_maos()
    fig_ar()
    qrs()
