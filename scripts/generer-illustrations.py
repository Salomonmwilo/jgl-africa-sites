#!/usr/bin/env python3
"""
Génère les illustrations originales du site (SVG) dans public/images/illustrations/.

Ces illustrations ont été créées spécialement pour le projet : elles ne
représentent aucune personne et ne reprennent aucune œuvre existante.
Elles évoquent les paysages de la région des Grands Lacs (collines en
terrasses, lac Kivu, volcan) et les thèmes des programmes.

Usage (facultatif, Python 3 sans dépendance) :
    python3 scripts/generer-illustrations.py

Les fichiers SVG produits sont versionnés : il n'est pas nécessaire de relancer
ce script, sauf pour modifier les illustrations.
"""
import math
import random
from pathlib import Path

SORTIE = Path(__file__).resolve().parent.parent / "public" / "images" / "illustrations"
SORTIE.mkdir(parents=True, exist_ok=True)

# Palette (identique aux variables CSS de src/styles/global.css)
NUIT = "#0e2a47"
NUIT_700 = "#1e4468"
LAC = "#1b6f69"
LAC_CLAIR = "#dcedea"
BRUME = "#eef3f2"
MAIS = "#e8b13a"
CIEL_HAUT = "#e4eef0"
CIEL_BAS = "#f7f9f7"
EAU = "#4f8ea3"
EAU_CLAIRE = "#86b6c4"
LOINTAIN = "#a9c1c8"
VOLCAN = "#8aa5b2"
COLLINE_1 = "#5f9488"
COLLINE_2 = "#2f7a6f"
COLLINE_3 = LAC
TERRE = "#c98a4a"


def f(v: float) -> str:
    return f"{v:.1f}".rstrip("0").rstrip(".")


def ligne_crete(x0, x1, base, harmoniques, pas=20):
    """Points d'une ligne de crête définie par une somme de sinusoïdes."""
    pts = []
    x = x0
    while x <= x1 + 0.1:
        y = base + sum(a * math.sin(fr * x + ph) for a, fr, ph in harmoniques)
        pts.append((x, y))
        x += pas
    return pts


def chemin_lisse(pts):
    """Courbe lissée (Catmull-Rom convertie en Bézier cubiques)."""
    d = f"M{f(pts[0][0])} {f(pts[0][1])}"
    for i in range(len(pts) - 1):
        p0 = pts[i - 1] if i > 0 else pts[i]
        p1 = pts[i]
        p2 = pts[i + 1]
        p3 = pts[i + 2] if i + 2 < len(pts) else p2
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C{f(c1[0])} {f(c1[1])} {f(c2[0])} {f(c2[1])} {f(p2[0])} {f(p2[1])}"
    return d


def colline(pts, bas, couleur, extra=""):
    d = chemin_lisse(pts)
    d += f" L{f(pts[-1][0])} {f(bas)} L{f(pts[0][0])} {f(bas)} Z"
    return f'<path d="{d}" fill="{couleur}" {extra}/>'


def terrasses(pts, bas, couleur, ecart=18, decalage=10, epaisseur=1.6, opacite=0.35, graine=1):
    """Lignes de terrasses suivant la forme d'une colline (cultures en courbes de niveau)."""
    rnd = random.Random(graine)
    lignes = []
    k = 1
    while True:
        dy = k * ecart
        dec = [(x, y + dy + 4 * math.sin(x / 60 + k)) for x, y in pts]
        if min(y for _, y in dec) > bas:
            break
        lignes.append(
            f'<path d="{chemin_lisse(dec)}" fill="none" stroke="{couleur}" '
            f'stroke-width="{f(epaisseur)}" opacity="{f(opacite)}" '
            f'stroke-dasharray="{rnd.randint(60,140)} {rnd.randint(8,22)}"/>'
        )
        k += 1
    return lignes


def courbes_niveau(largeur, hauteur, sommets, couleur, fond=None, opacite=0.5, epaisseur=1.2):
    """Motif de courbes de niveau autour de plusieurs sommets."""
    morceaux = []
    if fond:
        morceaux.append(f'<rect width="{largeur}" height="{hauteur}" fill="{fond}"/>')
    for (cx, cy, rmax, n, graine) in sommets:
        rnd = random.Random(graine)
        ph = [rnd.uniform(0, 6.28) for _ in range(4)]
        for k in range(1, n + 1):
            r = rmax * k / n
            pts = []
            for i in range(0, 41):
                t = 2 * math.pi * i / 40
                rr = r * (1 + 0.12 * math.sin(3 * t + ph[0] + k * 0.15) + 0.07 * math.sin(5 * t + ph[1]) + 0.04 * math.sin(2 * t + ph[2]))
                pts.append((cx + rr * math.cos(t), cy + rr * 0.72 * math.sin(t)))
            morceaux.append(
                f'<path d="{chemin_lisse(pts)} Z" fill="none" stroke="{couleur}" '
                f'stroke-width="{f(epaisseur)}" opacity="{f(opacite)}"/>'
            )
    return morceaux


def ecrire(nom, largeur, hauteur, titre, contenu):
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {largeur} {hauteur}" '
        f'width="{largeur}" height="{hauteur}" role="img">\n'
        f"<title>{titre}</title>\n" + "\n".join(contenu) + "\n</svg>\n"
    )
    (SORTIE / nom).write_text(svg, encoding="utf-8")
    print(f"  {nom} ({len(svg) // 1024} Ko)")


def ciel(largeur, hauteur, ident="ciel", haut=CIEL_HAUT, bas=CIEL_BAS):
    return [
        f'<defs><linearGradient id="{ident}" x1="0" y1="0" x2="0" y2="1">'
        f'<stop offset="0" stop-color="{haut}"/><stop offset="1" stop-color="{bas}"/></linearGradient></defs>',
        f'<rect width="{largeur}" height="{hauteur}" fill="url(#{ident})"/>',
    ]


def lac(y, largeur, hauteur, graine=3):
    rnd = random.Random(graine)
    c = [f'<rect x="0" y="{f(y)}" width="{largeur}" height="{f(hauteur - y)}" fill="{EAU}"/>']
    yy = y + 14
    while yy < hauteur:
        x = rnd.uniform(-40, largeur * 0.4)
        while x < largeur:
            l = rnd.uniform(40, 180)
            c.append(
                f'<path d="M{f(x)} {f(yy)}h{f(l)}" stroke="{EAU_CLAIRE}" stroke-width="2" '
                f'stroke-linecap="round" opacity="0.55"/>'
            )
            x += l + rnd.uniform(60, 260)
        yy += rnd.uniform(18, 30)
    return c


# ---------------------------------------------------------------------------
# 1. Paysage principal (page d'accueil)
# ---------------------------------------------------------------------------
def paysage_accueil():
    L, H = 1600, 1000
    c = ciel(L, H)
    c.append(f'<circle cx="1190" cy="250" r="92" fill="{MAIS}" opacity="0.92"/>')
    # Volcan (évocation du Nyiragongo) avec un léger panache
    c.append(
        f'<path d="M150 600 C300 560 380 380 470 300 L560 300 C650 380 760 560 930 600 Z" fill="{VOLCAN}"/>'
    )
    c.append(f'<path d="M470 300 C500 292 530 292 560 300 C540 310 490 310 470 300 Z" fill="#6f8c9a"/>')
    for cx, cy, rx, ry, op in [(522, 268, 34, 22, 0.75), (548, 238, 40, 26, 0.6), (586, 214, 46, 28, 0.45)]:
        c.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="#ffffff" opacity="{op}"/>')
    # Chaîne lointaine
    lointain = ligne_crete(0, L, 590, [(18, 0.006, 1.0), (10, 0.017, 2.3), (6, 0.04, 0.4)])
    c.append(colline(lointain, 640, LOINTAIN))
    # Lac
    c += lac(620, L, H)
    # Îles
    c.append(f'<path d="M640 700 C700 668 790 660 860 690 C820 706 700 712 640 700 Z" fill="{COLLINE_2}"/>')
    c.append(f'<path d="M980 660 C1010 646 1060 646 1086 662 C1060 670 1010 670 980 660 Z" fill="{COLLINE_1}"/>')
    # Rive gauche (collines en terrasses)
    rive_g = ligne_crete(-20, 780, 640, [(-70, 0.006, 0.2), (26, 0.02, 1.4), (10, 0.05, 0.3)])
    rive_g = [(x, y + max(0, (x - 360)) * 0.8) for x, y in rive_g]
    c.append(colline(rive_g, H, COLLINE_1))
    c += terrasses(rive_g, H, "#ffffff", ecart=22, opacite=0.28, graine=2)
    # Rive droite
    rive_d = ligne_crete(900, L + 20, 700, [(60, 0.004, 3.6), (22, 0.018, 0.8), (8, 0.06, 2.0)])
    rive_d = [(x, y + max(0, (1180 - x)) * 0.9) for x, y in rive_d]
    c.append(colline(rive_d, H, COLLINE_2))
    c += terrasses(rive_d, H, "#ffffff", ecart=20, opacite=0.22, graine=5)
    # Premier plan
    avant = ligne_crete(-20, L + 20, 905, [(38, 0.004, 0.6), (16, 0.013, 2.2), (6, 0.05, 1.1)])
    c.append(colline(avant, H, NUIT))
    c += terrasses(avant, H, "#3d6a92", ecart=16, opacite=0.6, graine=9, epaisseur=1.8)
    ecrire("paysage-kivu.svg", L, H, "Illustration : collines en terrasses, lac et volcan de la région du Kivu", c)


# ---------------------------------------------------------------------------
# 2. Motifs de courbes de niveau (fonds décoratifs)
# ---------------------------------------------------------------------------
def motifs():
    sommets = [(260, 220, 380, 12, 1), (1250, 640, 460, 14, 2), (820, 120, 220, 7, 3)]
    ecrire(
        "courbes-niveau.svg", 1600, 900, "Motif de courbes de niveau",
        courbes_niveau(1600, 900, sommets, LAC, fond=BRUME, opacite=0.35),
    )
    ecrire(
        "courbes-niveau-sombre.svg", 1600, 900, "Motif de courbes de niveau",
        courbes_niveau(1600, 900, sommets, "#7fa4c4", fond=None, opacite=0.16),
    )


# ---------------------------------------------------------------------------
# 3. Illustrations des programmes (640 × 480)
# ---------------------------------------------------------------------------
L, H = 640, 480


def fond_programme(ident, horizon=330, soleil=(500, 120), couleur_soleil=MAIS):
    c = ciel(L, H, ident)
    if soleil:
        c.append(f'<circle cx="{soleil[0]}" cy="{soleil[1]}" r="52" fill="{couleur_soleil}" opacity="0.9"/>')
    loin = ligne_crete(0, L, horizon, [(14, 0.012, 1.0), (8, 0.03, 2.0)], pas=16)
    c.append(colline(loin, H, LOINTAIN))
    return c


def avant_plan(graine, base=400, couleur=COLLINE_2):
    pts = ligne_crete(-10, L + 10, base, [(22, 0.008, graine), (9, 0.03, graine * 2)], pas=16)
    return [colline(pts, H, couleur)] + terrasses(pts, H, "#ffffff", ecart=14, opacite=0.25, graine=graine)


def academie():
    c = fond_programme("ciel-a")
    c += lac(350, L, H, graine=4)[:12]
    c += avant_plan(1, base=405)
    # Livre ouvert
    c.append(f'<path d="M320 190 C280 160 210 152 150 162 L150 352 C210 342 280 350 320 380 Z" fill="#ffffff" stroke="{NUIT}" stroke-width="5" stroke-linejoin="round"/>')
    c.append(f'<path d="M320 190 C360 160 430 152 490 162 L490 352 C430 342 360 350 320 380 Z" fill="#ffffff" stroke="{NUIT}" stroke-width="5" stroke-linejoin="round"/>')
    c.append(f'<path d="M320 190 V380" stroke="{NUIT}" stroke-width="5"/>')
    for i, y in enumerate(range(200, 330, 24)):
        c.append(f'<path d="M180 {y + 4} C220 {y - 4} 260 {y} 296 {y + 10}" fill="none" stroke="{LAC}" stroke-width="5" stroke-linecap="round" opacity="0.8"/>')
        if i < 4:
            c.append(f'<path d="M344 {y + 10} C380 {y} 420 {y - 4} 460 {y + 4}" fill="none" stroke="{LAC}" stroke-width="5" stroke-linecap="round" opacity="0.8"/>')
    ecrire("academie-droits-humains.svg", L, H, "Illustration : livre ouvert devant les collines", c)


def ecole():
    c = fond_programme("ciel-e", soleil=(150, 110))
    pts = ligne_crete(-10, L + 10, 300, [(-90, 0.006, 0.0), (10, 0.03, 1.0)], pas=16)
    pts = [(x, y + abs(x - 420) * 0.35) for x, y in pts]
    c.append(colline(pts, H, COLLINE_1))
    c += terrasses(pts, H, "#ffffff", ecart=18, opacite=0.3, graine=4)
    # Chemin sinueux vers le sommet
    c.append('<path d="M120 480 C220 440 160 400 260 380 C360 360 300 320 380 300 C420 290 410 270 420 262" '
             f'fill="none" stroke="{TERRE}" stroke-width="16" stroke-linecap="round"/>')
    c.append('<path d="M120 480 C220 440 160 400 260 380 C360 360 300 320 380 300 C420 290 410 270 420 262" '
             'fill="none" stroke="#f3d9b5" stroke-width="4" stroke-linecap="round" stroke-dasharray="10 14"/>')
    # Édifice à colonnes au sommet (gouvernance)
    x0, y0 = 370, 170
    c.append(f'<path d="M{x0} {y0 + 30} L{x0 + 50} {y0} L{x0 + 100} {y0 + 30} Z" fill="{NUIT}"/>')
    for i in range(4):
        c.append(f'<rect x="{x0 + 10 + i * 24}" y="{y0 + 36}" width="10" height="44" fill="{NUIT}"/>')
    c.append(f'<rect x="{x0 - 4}" y="{y0 + 80}" width="108" height="10" fill="{NUIT}"/>')
    c += avant_plan(3, base=440, couleur=NUIT)
    ecrire("ecole-leader-gouvernance.svg", L, H, "Illustration : chemin menant à un édifice à colonnes au sommet d'une colline", c)


def enfants():
    c = fond_programme("ciel-c", soleil=(480, 130))
    c += avant_plan(5, base=390, couleur=COLLINE_1)
    # Jeune arbre protégé par deux grandes feuilles (symbole de protection, sans personne)
    c.append(f'<path d="M320 400 C318 340 322 300 320 250" stroke="#6b4a2b" stroke-width="10" stroke-linecap="round" fill="none"/>')
    c.append(f'<path d="M320 300 C280 290 262 262 266 236 C298 240 318 262 320 300 Z" fill="{LAC}"/>')
    c.append(f'<path d="M320 270 C360 262 380 236 378 206 C344 212 324 236 320 270 Z" fill="{COLLINE_2}"/>')
    c.append(f'<path d="M320 250 C306 220 310 196 322 180 C334 198 336 222 320 250 Z" fill="{LAC}"/>')
    # Feuilles protectrices
    c.append(f'<path d="M180 410 C170 300 230 190 330 160 C270 220 240 320 250 410 Z" fill="{NUIT}" opacity="0.92"/>')
    c.append(f'<path d="M460 410 C470 300 410 190 310 160 C370 220 400 320 390 410 Z" fill="{NUIT_700}" opacity="0.92"/>')
    c.append(f'<path d="M150 410 H490" stroke="#6b4a2b" stroke-width="6" stroke-linecap="round"/>')
    ecrire("children-in-need.svg", L, H, "Illustration : jeune arbre abrité par deux grandes feuilles", c)


def clinique():
    c = fond_programme("ciel-j", soleil=None)
    c += lac(340, L, H, graine=7)[:10]
    c += avant_plan(7, base=410, couleur=COLLINE_2)
    # Balance de la justice
    c.append(f'<path d="M320 110 V370 M250 380 H390" stroke="{NUIT}" stroke-width="10" stroke-linecap="round"/>')
    c.append(f'<path d="M180 150 H460" stroke="{NUIT}" stroke-width="8" stroke-linecap="round"/>')
    c.append(f'<circle cx="320" cy="110" r="14" fill="{MAIS}" stroke="{NUIT}" stroke-width="5"/>')
    for x in (180, 460):
        c.append(f'<path d="M{x} 150 L{x - 50} 250 M{x} 150 L{x + 50} 250" stroke="{NUIT}" stroke-width="4"/>')
        c.append(f'<path d="M{x - 66} 250 H{x + 66} C{x + 56} 290 {x - 56} 290 {x - 66} 250 Z" fill="{MAIS}" stroke="{NUIT}" stroke-width="5" stroke-linejoin="round"/>')
    ecrire("clinique-juridique.svg", L, H, "Illustration : balance de la justice au-dessus du lac", c)


def observatoire():
    c = fond_programme("ciel-o", horizon=300, soleil=(510, 300))
    c += lac(310, L, H, graine=11)
    pts = ligne_crete(-10, 560, 330, [(-40, 0.01, 0.0), (8, 0.04, 1.0)], pas=16)
    pts = [(x, y + max(0, x - 200) * 0.9) for x, y in pts]
    c.append(colline(pts, H, NUIT))
    c += terrasses(pts, H, "#3d6a92", ecart=14, opacite=0.6, graine=12)
    # Colombe en vol
    c.append(f'<path d="M330 170 C372 150 402 154 430 176 C410 176 396 184 390 196 C374 186 356 180 330 170 Z" fill="#ffffff" stroke="{NUIT}" stroke-width="4" stroke-linejoin="round"/>')
    c.append(f'<path d="M372 160 C384 120 420 104 452 104 C440 128 420 150 392 168 Z" fill="#ffffff" stroke="{NUIT}" stroke-width="4" stroke-linejoin="round"/>')
    c.append(f'<path d="M430 176 L448 172 L434 184 Z" fill="{MAIS}"/>')
    # Point d'observation : longue-vue sur trépied
    c.append(f'<path d="M150 300 L120 360 M150 300 L180 360 M150 300 V362" stroke="{MAIS}" stroke-width="7" stroke-linecap="round"/>')
    c.append(f'<path d="M110 300 L210 262" stroke="{MAIS}" stroke-width="18" stroke-linecap="round"/>')
    ecrire("observatoire-jeunesse-paix.svg", L, H, "Illustration : longue-vue tournée vers le lac et colombe en vol", c)


def generique():
    """Illustration par défaut des pages (contact, soutien…)."""
    c = fond_programme("ciel-g", soleil=(140, 120))
    c += lac(330, L, H, graine=21)
    pts = ligne_crete(260, L + 10, 330, [(-30, 0.01, 2.0), (10, 0.04, 0.0)], pas=16)
    pts = [(x, y + max(0, 420 - x) * 0.9) for x, y in pts]
    c.append(colline(pts, H, COLLINE_2))
    c += terrasses(pts, H, "#ffffff", ecart=16, opacite=0.25, graine=22)
    c += avant_plan(23, base=440, couleur=NUIT)
    ecrire("paysage-lac.svg", L, H, "Illustration : lac et collines en terrasses", c)


if __name__ == "__main__":
    print("Génération des illustrations :")
    paysage_accueil()
    motifs()
    academie()
    ecole()
    enfants()
    clinique()
    observatoire()
    generique()
