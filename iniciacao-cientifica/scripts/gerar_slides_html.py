"""Junta os slides em um unico arquivo HTML que abre sem internet.

Embute fontes, foto e estilos, e acrescenta a navegacao (setas, espaco, clique)
e o reinicio das animacoes a cada slide. Uso: python3 scripts/gerar_slides_html.py
"""
import base64
import json
import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
FONTE = RAIZ / "slides-fonte"
ordem = json.loads((FONTE / "deck.json").read_text(encoding="utf8"))["order"]


def b64(p):
    return base64.b64encode(p.read_bytes()).decode()


faces = []
for arq, fam, estilo, peso in [
    ("Caveat-normal-0.woff2", "Caveat", "normal", "500 700"),
    ("Fraunces-italic-1.woff2", "Fraunces", "italic", "400 900"),
    ("Fraunces-normal-2.woff2", "Fraunces", "normal", "400 900"),
    ("Karla-normal-3.woff2", "Karla", "normal", "400 800"),
]:
    faces.append(f"@font-face{{font-family:'{fam}';font-style:{estilo};font-weight:{peso};"
                 f"src:url(data:font/woff2;base64,{b64(FONTE / 'fontes' / arq)}) format('woff2')}}")

foto = "data:image/jpeg;base64," + b64(FONTE / "ecoli-capa.jpg")
secoes = []
for sid in ordem:
    h = (FONTE / "slides" / f"{sid}.html").read_text(encoding="utf8")
    h = re.sub(r'src="/_blob/[0-9a-f]+"', f'src="{foto}"', h)
    # animacoes SMIL com hora marcada passam a ser disparadas pelo script, a cada entrada no slide
    h = re.sub(r'(<animate\b[^>]*?)begin="([\d.]+)s"', r'\1begin="indefinite" data-inicio="\2"', h)
    secoes.append(h)

BASE = """
* { margin: 0 }
html, body { height: 100%; background: #111; overflow: hidden }
#palco { position: absolute; left: 50%; top: 50%; width: 1920px; height: 1080px; transform-origin: 0 0 }
#palco > section { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; overflow: hidden; box-sizing: border-box; isolation: isolate; visibility: hidden }
#palco > section.atual { visibility: visible }
p, li, h1, h2, h3, td, th { overflow-wrap: break-word; text-wrap: pretty }
table { width: 100%; border-collapse: separate; border-spacing: 0; border: solid #0003; border-width: 2px 0 0 2px }
th, td { padding: .35em .6em; text-align: left; border: solid #0003; border-width: 0 2px 2px 0 }
.furos, .abas, .pontos { z-index: -1 }
section > div, section > p { min-height: 0 }
.n { animation: none !important }
#ajuda { position: fixed; right: 14px; bottom: 10px; font: 13px Arial, sans-serif; color: #888; opacity: .8 }
@media print { html, body { overflow: visible; background: none } #palco { position: static; transform: none !important }
  #palco > section { position: relative; visibility: visible; break-after: page } #ajuda { display: none }
  * { animation: none !important } .fragment { opacity: 1 !important; transform: none !important } }
@page { size: 1920px 1080px; margin: 0 }
"""

JS = r"""
const palco = document.getElementById('palco');
const moldes = [...palco.children].map(s => s.cloneNode(true));
let i = 0;
function ajusta() {
  const k = Math.min(innerWidth / 1920, innerHeight / 1080);
  palco.style.transform = `scale(${k}) translate(-50%, -50%)`;
}
function conta(sec) {
  sec.querySelectorAll('.n').forEach(el => {
    const m = el.textContent.match(/^(\d+)(.*)$/); if (!m) return;
    const alvo = +m[1], t0 = performance.now();
    (function passo(t) { const p = Math.min(1, (t - t0) / 1200), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(alvo * e) + m[2]; if (p < 1) requestAnimationFrame(passo); })(t0);
  });
}
function smil(sec) {
  sec.querySelectorAll('animate[data-inicio]').forEach(a => {
    const dono = a.parentNode, attr = a.getAttribute('attributeName'), fim = dono.getAttribute(attr);
    dono.setAttribute(attr, a.getAttribute('from'));
    a.addEventListener('endEvent', () => dono.setAttribute(attr, fim), { once: true });
    a.beginElementAt(parseFloat(a.dataset.inicio));
  });
}
function mostra(n, tudo) {
  i = Math.max(0, Math.min(moldes.length - 1, n));
  const novo = moldes[i].cloneNode(true);           // clone novo = animacoes recomecam
  palco.replaceChild(novo, palco.children[i]);
  [...palco.children].forEach((s, k) => s.classList.toggle('atual', k === i));
  if (tudo) novo.querySelectorAll('.fragment').forEach(f => f.classList.add('visible'));
  conta(novo); smil(novo); location.hash = i + 1;
}
function avanca() {
  const f = palco.children[i].querySelector('.fragment:not(.visible)');
  if (f) f.classList.add('visible'); else if (i < moldes.length - 1) mostra(i + 1);
}
function volta() {
  const fs = palco.children[i].querySelectorAll('.fragment.visible');
  if (fs.length) fs[fs.length - 1].classList.remove('visible'); else if (i > 0) mostra(i - 1, true);
}
addEventListener('keydown', e => {
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); avanca(); }
  else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); volta(); }
  else if (e.key === 'Home') mostra(0); else if (e.key === 'End') mostra(moldes.length - 1, true);
  else if (e.key.toLowerCase() === 'f') document.documentElement.requestFullscreen?.();
});
addEventListener('click', e => { (e.clientX < innerWidth * 0.25 ? volta : avanca)(); });
let x0 = null;
addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
addEventListener('touchend', e => { if (x0 === null) return; const d = e.changedTouches[0].clientX - x0; x0 = null;
  if (Math.abs(d) > 40) { e.preventDefault(); (d < 0 ? avanca : volta)(); } });
addEventListener('resize', ajusta);
ajusta(); mostra((parseInt(location.hash.slice(1)) || 1) - 1);
setTimeout(() => document.getElementById('ajuda').remove(), 6000);
"""

css = (FONTE / "deck.css").read_text(encoding="utf8")
html = ("<!doctype html>\n<html lang=\"pt-BR\">\n<head>\n<meta charset=\"utf-8\">\n"
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n"
        "<title>Contaminação dentro das escolas</title>\n<style>\n" + "\n".join(faces) + "\n" + css + BASE +
        "</style>\n</head>\n<body>\n<div id=\"palco\">\n" + "\n".join(secoes) +
        "</div>\n<div id=\"ajuda\">setas ou clique para avançar · F para tela cheia</div>\n<script>" + JS + "</script>\n</body>\n</html>\n")
saida = RAIZ / "Contaminacao_nas_Escolas_Slides.html"
saida.write_text(html, encoding="utf8")
print("gerado:", saida, f"{saida.stat().st_size / 1024:.0f} KB")
