#!/usr/bin/env python3
"""
Prépare des photographies pour le site : redimensionnement, conversion WebP,
suppression des métadonnées (GPS, appareil, auteur…).

Usage (Python 3 + Pillow) :
    python3 scripts/optimiser-photos.py chemin/photo.jpg nom-de-la-photo [autre.jpg autre-nom ...]

Pour chaque photo, le script crée dans public/images/photos/ :
    nom-de-la-photo-480.webp, nom-de-la-photo-960.webp, nom-de-la-photo-1600.webp

Il affiche ensuite la largeur et la hauteur d'origine à reporter dans
src/data/photos.ts. Les fichiers d'origine ne sont pas modifiés et ne
doivent pas être placés dans le dépôt (ils sont lourds).
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

SORTIE = Path(__file__).resolve().parent.parent / "public" / "images" / "photos"
LARGEURS = (480, 960, 1600)
QUALITE = 72


def traiter(source: Path, nom: str) -> None:
    image = Image.open(source)
    image = ImageOps.exif_transpose(image).convert("RGB")  # applique l'orientation, puis abandonne l'EXIF
    largeur, hauteur = image.size
    SORTIE.mkdir(parents=True, exist_ok=True)
    tailles = []
    for cible in LARGEURS:
        if cible > largeur:
            continue
        h = round(hauteur * cible / largeur)
        copie = image.resize((cible, h), Image.LANCZOS)
        fichier = SORTIE / f"{nom}-{cible}.webp"
        copie.save(fichier, "WEBP", quality=QUALITE, method=6)  # aucune métadonnée n'est écrite
        tailles.append(f"{cible}px {fichier.stat().st_size // 1024} Ko")
    ratio = hauteur / largeur
    print(f"{nom} : {largeur}×{hauteur} (ratio {ratio:.3f}) → {', '.join(tailles)}")


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args or len(args) % 2:
        print(__doc__)
        sys.exit(1)
    for i in range(0, len(args), 2):
        traiter(Path(args[i]), args[i + 1])
