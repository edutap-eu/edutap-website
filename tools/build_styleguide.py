"""Build the eduTAP styleguide as a single self-contained HTML page.

Every colour value carries the source it was taken from, because the four colour
systems eduTAP works with have very different authority: some values are binding
(the European emblem), some are house style (LMU), and some were read straight
out of a logo file or a live stylesheet (EUGLOH).

Expected location: edutap-website/tools/build_styleguide.py

Run:  uv run python tools/build_styleguide.py [output.html]

The page is an internal reference: it is written to the repository root, not to
public/, so the Astro build never picks it up and it stays off edutap.eu.

Logo files are read from public/ in this repository and from the ecc-documentation
checkout next to it. Fonts and the EU funding-statement pack are downloaded once and
cached in the system temp directory, so nothing lands in the repository that does not
belong there.
"""

from __future__ import annotations

import base64
import html
import math
import pathlib
import re
import sys
import tempfile
import urllib.request
import zipfile
from dataclasses import dataclass, field

REPO = pathlib.Path(__file__).resolve().parent.parent  # edutap-website
WORKSPACES = REPO.parent  # the directory holding the eduTAP checkouts

WEBSITE_PUBLIC = REPO / "public"  # Astro's static directory, formerly Gatsby's static/
ECC_STATIC = WORKSPACES / "ecc-documentation" / "source" / "_static"

CACHE = pathlib.Path(tempfile.gettempdir()) / "edutap-styleguide-assets"
DEFAULT_OUTPUT = REPO / "edutap-styleguide.html"

CO_FUNDED_ZIP_URL = (
    "https://ec.europa.eu/regional_policy/sources/information-sources/"
    "logo-download-center/co-funded_en.zip"
)
CO_FUNDED_MEMBERS = {
    "eu_cofunded_pos": "co-funded_EN/horizontal/RGB/PNG/EN_Co-fundedbytheEU_RGB_POS.png",
    "eu_cofunded_neg": "co-funded_EN/horizontal/RGB/PNG/EN_Co-fundedbytheEU_RGB_NEG.png",
}


# --------------------------------------------------------------------------- #
# Asset embedding
# --------------------------------------------------------------------------- #

MIME_BY_SUFFIX = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2",
}

GOOGLE_FONT_FILES = {
    # Lato is the typeface of the eduTAP wordmark and of the EUGLOH headlines.
    "lato-400": "https://fonts.gstatic.com/s/lato/v25/S6uyw4BMUTPHjx4wXiWtFCc.woff2",
    "lato-700": "https://fonts.gstatic.com/s/lato/v25/S6u9w4BMUTPHh6UVSwiPGQ3q5d0.woff2",
    # Open Sans is the EUGLOH body face (variable, covers 400 and 600).
    "open-sans-var": (
        "https://fonts.gstatic.com/s/opensans/v44/"
        "memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-mu0SC55I.woff2"
    ),
    # Roboto Medium is the typeface the Erasmus+ visual guidelines prescribe.
    "roboto-500": (
        "https://fonts.gstatic.com/s/roboto/v51/"
        "KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWub2bVmUiAr0klQmz24.woff2"
    ),
}


def data_uri(path: pathlib.Path) -> str:
    mime = MIME_BY_SUFFIX[path.suffix.lower()]
    raw = path.read_bytes()
    if path.suffix.lower() == ".svg":
        raw = sanitise_svg(raw.decode("utf-8")).encode("utf-8")
    payload = base64.b64encode(raw).decode("ascii")
    return f"data:{mime};base64,{payload}"


def sanitise_svg(markup: str) -> str:
    """Make an SVG file safe to reference from an <img> element.

    An SVG loaded as an image is parsed as XML, which is stricter than the HTML
    parser the same file survives when it is pasted inline. Two things trip it up
    in this project's assets:

    * a DOCTYPE pointing at the SVG 1.1 DTD, which the image sandbox cannot fetch;
    * a bare ampersand, which public/logo.svg carried inside a commented-out @import
      until it was escaped during the Astro port.

    Both repairs stay in place as a guard: the next hand-edited SVG will hit the same
    two traps, and a logo that silently fails to render is expensive to notice.
    """
    markup = re.sub(r"<\?xml[^>]*\?>", "", markup)
    markup = re.sub(r"<!DOCTYPE[^>]*>", "", markup, flags=re.IGNORECASE)
    markup = re.sub(r"&(?!(?:[a-zA-Z][a-zA-Z0-9]*|#[0-9]+|#x[0-9a-fA-F]+);)", "&amp;", markup)
    return markup.lstrip()


def svg_data_uri(markup: str) -> str:
    payload = base64.b64encode(markup.encode("utf-8")).decode("ascii")
    return f"data:image/svg+xml;base64,{payload}"


def cached_download(url: str, filename: str) -> pathlib.Path:
    """Download a remote asset once, then reuse the cached copy."""
    CACHE.mkdir(parents=True, exist_ok=True)
    target = CACHE / filename
    if not target.exists():
        print(f"  downloading {filename}")
        request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(request) as response:
            target.write_bytes(response.read())
    return target


def co_funded_logos() -> dict[str, pathlib.Path]:
    """Pull the two funding-statement PNGs out of the Commission's logo pack."""
    extracted = {token: CACHE / pathlib.PurePath(member).name for token, member in CO_FUNDED_MEMBERS.items()}
    if all(path.exists() for path in extracted.values()):
        return extracted

    archive = cached_download(CO_FUNDED_ZIP_URL, "co-funded_en.zip")
    with zipfile.ZipFile(archive) as bundle:
        for token, member in CO_FUNDED_MEMBERS.items():
            extracted[token].write_bytes(bundle.read(member))
    return extracted


def european_emblem(blue: str, yellow: str) -> str:
    """Draw the European emblem to the proportions of the official graphics guide.

    Rectangle ratio 3:2. Twelve stars stand upright on an invisible circle whose
    radius is one third of the flag height, positioned like the hours on a clock.
    Each star is inscribed in a circle with a radius of one eighteenth of the height.
    """
    height = 200.0
    width = height * 1.5
    centre_x, centre_y = width / 2, height / 2
    star_circle_radius = height / 3
    star_radius = height / 18
    inner_ratio = 0.382  # waist of a regular five-pointed star

    stars = []
    for hour in range(12):
        hour_angle = math.radians(hour * 30)
        star_x = centre_x + star_circle_radius * math.sin(hour_angle)
        star_y = centre_y - star_circle_radius * math.cos(hour_angle)
        corners = []
        for corner in range(10):
            radius = star_radius if corner % 2 == 0 else star_radius * inner_ratio
            corner_angle = math.radians(corner * 36)
            corners.append(
                f"{star_x + radius * math.sin(corner_angle):.2f},"
                f"{star_y - radius * math.cos(corner_angle):.2f}"
            )
        stars.append(f'<polygon points="{" ".join(corners)}"/>')

    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" '
        'width="300" height="200" role="img" aria-label="European emblem">'
        f'<rect width="300" height="200" fill="{blue}"/>'
        f'<g fill="{yellow}">{"".join(stars)}</g></svg>'
    )


def collect_assets() -> dict[str, str]:
    fonts = {
        name: data_uri(cached_download(url, f"{name}.woff2"))
        for name, url in GOOGLE_FONT_FILES.items()
    }
    funding = {token: data_uri(path) for token, path in co_funded_logos().items()}
    return {
        **funding,
        "edutap_logo": data_uri(WEBSITE_PUBLIC / "logo.svg"),
        "edutap_logo_portrait": data_uri(WEBSITE_PUBLIC / "logo-portarit.svg"),
        "eugloh_logo": data_uri(ECC_STATIC / "eugloh-logo.svg"),
        "eugloh_logo_white": data_uri(WEBSITE_PUBLIC / "eugloh-white.webp"),
        "lmu_logo": data_uri(WEBSITE_PUBLIC / "lmu-logo.svg"),
        "eu_emblem_web": svg_data_uri(european_emblem("#003399", "#FFCC00")),
        "eu_emblem_print": svg_data_uri(european_emblem("#004494", "#FFED00")),
        **fonts,
    }


# --------------------------------------------------------------------------- #
# Colour model
# --------------------------------------------------------------------------- #


@dataclass
class Swatch:
    """One colour, plus whatever the source document states about it."""

    name: str
    hex_value: str
    rgb: str = ""  # as printed in the source, which is not always == hex_value
    cmyk: str = ""
    reference: str = ""  # Pantone / HKS / RAL
    token: str = ""  # CSS custom property or other machine name
    role: str = ""  # what it is used for
    caveat: str = ""

    def __post_init__(self) -> None:
        if not self.rgb:
            red, green, blue = parse_hex(self.hex_value)
            self.rgb = f"{red}, {green}, {blue}"


@dataclass
class Palette:
    """A group of swatches sharing one source of truth."""

    title: str
    source_label: str
    source_url: str
    provenance: str  # how the values in this group were obtained
    intro: str = ""
    swatches: list[Swatch] = field(default_factory=list)
    footnote: str = ""


@dataclass
class System:
    """One identity system: marks, palettes and the rules that bind them."""

    slug: str
    name: str
    kicker: str
    lede: str
    marks: list[dict] = field(default_factory=list)
    palettes: list[Palette] = field(default_factory=list)
    typography: list[dict] = field(default_factory=list)
    rules: list[str] = field(default_factory=list)
    links: list[tuple[str, str]] = field(default_factory=list)


def parse_hex(value: str) -> tuple[int, int, int]:
    digits = value.lstrip("#")
    if len(digits) == 3:
        digits = "".join(digit * 2 for digit in digits)
    return int(digits[0:2], 16), int(digits[2:4], 16), int(digits[4:6], 16)


def relative_luminance(hex_value: str) -> float:
    """WCAG 2.1 relative luminance."""

    def channel(value: int) -> float:
        srgb = value / 255
        return srgb / 12.92 if srgb <= 0.04045 else ((srgb + 0.055) / 1.055) ** 2.4

    red, green, blue = parse_hex(hex_value)
    return 0.2126 * channel(red) + 0.7152 * channel(green) + 0.0722 * channel(blue)


def contrast_ratio(first: str, second: str) -> float:
    lighter, darker = sorted(
        (relative_luminance(first), relative_luminance(second)), reverse=True
    )
    return (lighter + 0.05) / (darker + 0.05)


def contrast_note(hex_value: str) -> tuple[str, str, str]:
    """Pick the partner colour that reads best on this swatch and grade it."""
    on_white = contrast_ratio(hex_value, "#ffffff")
    on_black = contrast_ratio(hex_value, "#000000")
    if on_white >= on_black:
        partner, ratio = "white", on_white
    else:
        partner, ratio = "black", on_black
    if ratio >= 7:
        grade = "AAA"
    elif ratio >= 4.5:
        grade = "AA"
    elif ratio >= 3:
        grade = "AA large"
    else:
        grade = "decorative"
    return partner, f"{ratio:.1f}:1", grade


# --------------------------------------------------------------------------- #
# The data
# --------------------------------------------------------------------------- #

EUGLOH_LOGO_SOURCE = "eugloh-logo.svg (official logo file, ecc-documentation/source/_static)"
EUGLOH_CSS_SOURCE = "eugloh.eu — compiled site stylesheet, read 2026-07-30"


def build_systems() -> list[System]:
    edutap = System(
        slug="edutap",
        name="eduTAP",
        kicker="House marks",
        lede=(
            "eduTAP has no colour system of its own. It runs on the EUGLOH palette, "
            "with the deep blue and the orange doing the work in the wordmark."
        ),
        marks=[
            {
                "asset": "edutap_logo",
                "label": "Horizontal logo",
                "file": "edutap-website/public/logo.svg",
                "note": "Wordmark, slogan, reader and card in one lockup. Used in this page's header.",
                "background": "light",
            },
            {
                "asset": "edutap_logo_portrait",
                "label": "Portrait logo",
                "file": "edutap-website/public/logo-portarit.svg",
                "note": "For narrow placements.",
                "background": "light",
                "flag": "Filename carries a typo: <em>portarit</em>.",
            },
        ],
        palettes=[
            Palette(
                title="Wordmark and icon",
                source_label="logo.svg",
                source_url="",
                provenance="Read out of the logo file",
                intro="Exactly the values the SVG paints with — nothing interpreted.",
                swatches=[
                    Swatch("eduTAP Blue", "#115794", role='Wordmark "edu", innermost NFC wave'),
                    Swatch("eduTAP Orange", "#d76525", role='Wordmark "TAP", mortarboard, outer wave'),
                    Swatch("eduTAP Light Blue", "#4097be", role="Slogan, second NFC wave"),
                    Swatch("eduTAP Orange Light", "#f07129", role="Third NFC wave"),
                    Swatch("Mortarboard rim", "#c85f22", role="Depth on the board edge"),
                    Swatch("Mortarboard shadow", "#b8541f", role="Shadow inside the cap band"),
                    Swatch("Device grey", "#b8bec6", role="Phone and reader outlines, NFC hint waves"),
                ],
                footnote=(
                    "The first four are EUGLOH web palette values. The three that follow exist "
                    "only inside the logo artwork."
                ),
            )
        ],
        typography=[
            {
                "family": "Lato",
                "css": "Lato, Arial, sans-serif",
                "weights": "700 for the wordmark and the slogan",
                "sample": "eduTAP — no app, just tap!",
                "font": "lato",
                "weight": 700,
            }
        ],
        rules=[
            "The wordmark splits at the syllable: <strong>edu</strong> in blue, "
            "<strong>TAP</strong> in orange. Never one colour, never reversed.",
            "The slogan is <em>no app, just tap!</em> — lowercase, exclamation mark included.",
            "Keep the NFC waves in their four-step colour run; they read as one gesture, "
            "not as four decorations.",
        ],
        links=[("eduTAP website", "https://edutap.eu/")],
    )

    eugloh = System(
        slug="eugloh",
        name="EUGLOH",
        kicker="Alliance",
        lede=(
            "The European University Alliance for Global Health, the frame eduTAP was born in. "
            "Two sets of values circulate: the ones inside the logo file and the ones the "
            "website ships. They are close, but not the same."
        ),
        marks=[
            {
                "asset": "eugloh_logo",
                "label": "Primary logo",
                "file": "ecc-documentation/source/_static/eugloh-logo.svg",
                "note": "Three-colour version for light backgrounds.",
                "background": "light",
            },
            {
                "asset": "eugloh_logo_white",
                "label": "Reversed logo",
                "file": "edutap-website/public/eugloh-white.webp",
                "note": "White version. Use on the alliance blue or on photography.",
                "background": "blue",
            },
        ],
        palettes=[
            Palette(
                title="Logo colours",
                source_label=EUGLOH_LOGO_SOURCE,
                source_url="",
                provenance="Read out of the official logo file",
                intro="What the logo actually paints with. Use these when you place the mark.",
                swatches=[
                    Swatch("EUGLOH Blue", "#2b5a9d", role="Wordmark and the sweep under it"),
                    Swatch("EUGLOH Orange", "#d95b29", role="Upper ribbon"),
                    Swatch("EUGLOH Light Blue", "#4d99c0", role="Lower ribbon"),
                ],
            ),
            Palette(
                title="Web palette",
                source_label=EUGLOH_CSS_SOURCE,
                source_url="https://www.eugloh.eu/",
                provenance="Read from the live site stylesheet",
                intro=(
                    "The custom properties eugloh.eu runs on, read straight from the compiled "
                    "site stylesheet. This page is now the record of them."
                ),
                swatches=[
                    Swatch("Main", "#D76525", token="--mainColor", role="Primary accent, buttons, links"),
                    Swatch("Main light", "#F07129", token="--mainColorLight", role="Hover state of the accent"),
                    Swatch("Second", "#4097BE", token="--secondColor", role="Secondary accent"),
                    Swatch("Second dark", "#115794", token="--secondColorDark", role="Headlines, dark accent areas"),
                    Swatch("Gradient start", "#44A3D0", token="--secondColorGradient", role="linear-gradient(90deg, … 0%"),
                    Swatch("Gradient end", "#2D7FB1", token="--secondColorGradient", role="… 100%)"),
                    Swatch("Font", "#262626", token="--fontColor", role="Body text"),
                    Swatch("Font light", "#767676", token="--fontColorLight", role="Muted text, also --formBorderColor"),
                    Swatch("Font dark", "#151515", token="--fontColorDark", role="Strong text"),
                    Swatch("Background", "#F7F7FB", token="--backgroundColor", role="Page ground"),
                    Swatch("Border", "#E3E3EF", token="--borderColor", role="Hairlines, card edges"),
                    Swatch("Warning", "#b10000", token="--warningColor", role="Errors, form validation"),
                ],
                footnote=(
                    "The stylesheet also carries --contrastColor #000 and --contrastColorInverted #fff "
                    "with their RGB triples, plus two computed tints written as "
                    "rgb(25.5, 25.5, 25.5) and rgb(229.5, 229.5, 229.5) — fractional channels that "
                    "browsers round. Copy them as #1a1a1a and #e6e6e6 if you need them by hand."
                ),
            ),
        ],
        typography=[
            {
                "family": "Lato",
                "css": '--headline: "Lato", Arial, sans-serif',
                "weights": "Headlines",
                "sample": "European University Alliance for Global Health",
                "font": "lato",
                "weight": 700,
            },
            {
                "family": "Open Sans",
                "css": '--mainFont: "Open Sans", Arial, sans-serif',
                "weights": "Body copy",
                "sample": "Body text is set in Open Sans, with Arial as the fallback.",
                "font": "open-sans",
                "weight": 400,
            },
        ],
        rules=[
            "The base font size on eugloh.eu is fluid: "
            "<code>clamp(1rem, 0.8875rem + 0.4vw, 1.1875rem)</code>.",
            "Logo blue <code>#2b5a9d</code> and web blue <code>#115794</code> are different colours. "
            "Match the mark to its own value, not to the website's.",
        ],
        links=[("EUGLOH", "https://www.eugloh.eu/")],
    )

    lmu = System(
        slug="lmu",
        name="LMU München",
        kicker="Host institution",
        lede=(
            "Ludwig-Maximilians-Universität München hosts eduTAP. Its corporate design is "
            "documented down to HKS and Pantone, so there is nothing to interpret here."
        ),
        marks=[
            {
                "asset": "lmu_logo",
                "label": "LMU logo",
                "file": "edutap-website/public/lmu-logo.svg",
                "note": "The current mark in LMU-Grün, taken from lmu.de. Vector, so it stays sharp at any size.",
                "background": "light",
            }
        ],
        palettes=[
            Palette(
                title="Primary colours",
                source_label="LMU Brand Guide — Farben",
                source_url=(
                    "https://www.lmu.de/de/die-lmu/struktur/zentrale-universitaetsverwaltung/"
                    "presse-und-kommunikation-puk/lmu-brand-guide/designgrundsaetze/farben/"
                ),
                provenance="Official corporate design manual",
                swatches=[
                    Swatch(
                        "LMU-Grün",
                        "#00883A",
                        rgb="0, 136, 58",
                        cmyk="100 / 0 / 95 / 15",
                        reference="Pantone 348 C/U · HKS 57",
                        role="The house colour",
                    ),
                    Swatch("Schwarz", "#232323", rgb="35, 35, 35", cmyk="0 / 0 / 0 / 100", role="Text, rules"),
                    Swatch("Weiß", "#FFFFFF", rgb="255, 255, 255", cmyk="0 / 0 / 0 / 0", role="Ground"),
                ],
            ),
            Palette(
                title="Secondary greys",
                source_label="LMU Brand Guide — Farben",
                source_url="",
                provenance="Official corporate design manual",
                intro="Layout elements, diagrams and background areas.",
                swatches=[
                    Swatch("Dunkelgrau", "#626468", rgb="98, 100, 104", cmyk="0 / 0 / 0 / 85"),
                    Swatch("Mittelgrau", "#C0C1C3", rgb="192, 193, 195", cmyk="0 / 0 / 0 / 50"),
                    Swatch("Hellgrau", "#E6E6E7", rgb="230, 230, 231", cmyk="0 / 0 / 0 / 25"),
                    Swatch("Lichtgrau", "#F5F5F5", rgb="245, 245, 245", cmyk="0 / 0 / 0 / 6"),
                ],
            ),
            Palette(
                title="Accent colours",
                source_label="LMU Brand Guide — Farben",
                source_url="",
                provenance="Official corporate design manual",
                intro="To be used sparingly — the manual is explicit about that.",
                swatches=[
                    Swatch("Blau", "#0F1987", rgb="15, 25, 135", cmyk="100 / 75 / 0 / 20"),
                    Swatch("Cyan", "#009FE3", rgb="0, 159, 227", cmyk="100 / 0 / 0 / 0"),
                    Swatch("Violett", "#8C4091", rgb="140, 64, 145", cmyk="55 / 85 / 0 / 0"),
                    Swatch("Rot", "#D71919", rgb="215, 25, 25", cmyk="5 / 100 / 100 / 0"),
                    Swatch("Orange", "#F18700", rgb="241, 135, 0", cmyk="0 / 55 / 100 / 0"),
                ],
            ),
        ],
        rules=[
            "Green, black, white and the four greys carry the design. Accents are seasoning.",
            "Screen work uses the HEX or RGB values; standard offset printing uses CMYK.",
        ],
        links=[
            (
                "LMU Brand Guide",
                "https://www.lmu.de/de/die-lmu/struktur/zentrale-universitaetsverwaltung/"
                "presse-und-kommunikation-puk/lmu-brand-guide/",
            )
        ],
    )

    european_union = System(
        slug="european-union",
        name="European Union",
        kicker="Funding frame",
        lede=(
            "The emblem is the one mark on this page whose use is regulated rather than "
            "recommended. Its colours also come in two flavours — the web palette from the "
            "graphics guide and the print values the Erasmus+ guidelines print."
        ),
        marks=[
            {
                "asset": "eu_emblem_web",
                "label": "European emblem",
                "file": "drawn to the official geometry, web palette",
                "note": "Twelve upright stars on a circle of one third the flag height.",
                "background": "light",
            },
            {
                "asset": "eu_cofunded_pos",
                "label": '"Co-funded by the European Union"',
                "file": "co-funded_EN/horizontal/RGB/PNG/…_POS.png",
                "note": "Positive version. The wording required on EU-funded output.",
                "background": "light",
            },
            {
                "asset": "eu_cofunded_neg",
                "label": "Reversed funding statement",
                "file": "co-funded_EN/horizontal/RGB/PNG/…_NEG.png",
                "note": "For dark grounds. A monochrome and a black version ship alongside.",
                "background": "dark",
            },
        ],
        palettes=[
            Palette(
                title="Emblem — web palette",
                source_label="Graphics guide to the European emblem",
                source_url=(
                    "https://style-guide.europa.eu/o/opportal-service/isg?resource=en/"
                    "annex-a1-graphics-guide-european-emblem.html"
                ),
                provenance="Binding specification",
                intro="Pantone Reflex Blue and Pantone Yellow as the guide maps them for screen use.",
                swatches=[
                    Swatch("Reflex Blue", "#003399", rgb="0, 51, 153", reference="Pantone Reflex Blue", role="Field"),
                    Swatch("Yellow", "#FFCC00", rgb="255, 204, 0", reference="Pantone Yellow", role="Stars"),
                ],
            ),
            Palette(
                title="Emblem — Erasmus+ print values",
                source_label="Erasmus+ Visual guidelines 2021–2027, p. 8",
                source_url="https://ec.europa.eu/assets/eac/promo/ErasmusPlus_2021_27-visual_guidelines_2023.pdf",
                provenance="Programme guidelines",
                intro="The same emblem, converted for four-colour print. Do not mix the two sets.",
                swatches=[
                    Swatch("EU Emblem Blue", "#004494", rgb="0, 68, 148", cmyk="100 / 80 / 0 / 0"),
                    Swatch("EU Emblem Yellow", "#FFED00", rgb="255, 237, 0", cmyk="0 / 0 / 100 / 0"),
                ],
            ),
            Palette(
                title="EU web design system",
                source_label="Europa Component Library v3.13",
                source_url="https://ec.europa.eu/component-library/v3.13.0/eu/guidelines/colours",
                provenance="Digital design system",
                intro=(
                    "For EU digital products. A different blue from the emblem on purpose — "
                    "it is a UI palette, not the flag. Each of these has a full tint ramp from 5 to 140."
                ),
                swatches=[
                    Swatch("EU Blue 100", "#0E47CB", role="Primary interface blue"),
                    Swatch("EU Yellow 100", "#FFCC00", role="Primary interface yellow"),
                    Swatch("EU Grey 100", "#262B38", role="Text and structure"),
                    Swatch("EU Orange 100", "#FF6200", role="Notification"),
                    Swatch("EU Green 100", "#00C991", role="Notification"),
                    Swatch("EU Red 100", "#EF0044", role="Notification"),
                    Swatch("EU Accent Blue 100", "#00E9FF", role="Accent, use sparingly"),
                ],
            ),
        ],
        rules=[
            "The emblem is a rectangle 3:2. Twelve stars sit at the clock-hour positions on an "
            "invisible circle of radius one third of the height; each star fits a circle of "
            "one eighteenth of the height and stands on one point.",
            "Never redraw, restyle or recolour the emblem, and never add the number of "
            "member states to it.",
            "EU-funded work carries the emblem together with the wording "
            "<em>Co-funded by the European Union</em>. Both must be legible at the size used.",
        ],
        links=[
            ("EU emblem graphics guide", "https://style-guide.europa.eu/"),
            (
                "Funding statement, all 24 EU languages (ZIP)",
                "https://ec.europa.eu/regional_policy/sources/information-sources/"
                "logo-download-center/co-funded_en.zip",
            ),
        ],
    )

    erasmus = System(
        slug="erasmus-plus",
        name="Erasmus+",
        kicker="Programme",
        lede=(
            "The 2021–2027 identity is typographic: the programme name set in Roboto Medium, "
            "the EU emblem alongside it. There is no separate picture mark to place."
        ),
        marks=[
            {
                "asset": "eu_emblem_print",
                "label": "Emblem in print values",
                "file": "drawn to the official geometry",
                "note": "The emblem accompanies the wordmark. Print values #004494 / #FFED00.",
                "background": "light",
            }
        ],
        palettes=[
            Palette(
                title="Primary colours",
                source_label="Erasmus+ Visual guidelines 2021–2027, p. 8",
                source_url="https://ec.europa.eu/assets/eac/promo/ErasmusPlus_2021_27-visual_guidelines_2023.pdf",
                provenance="Programme guidelines",
                swatches=[
                    Swatch("EU Emblem Blue", "#004494", rgb="0, 68, 148", cmyk="100 / 80 / 0 / 0", role="Emblem field"),
                    Swatch("EU Emblem Yellow", "#FFED00", rgb="255, 237, 0", cmyk="0 / 0 / 100 / 0", role="Emblem stars"),
                    Swatch(
                        "Erasmus+ Blue",
                        "#007fc7",
                        rgb="0, 127, 200",
                        cmyk="100 / 31 / 0 / 0",
                        role="Wordmark fill, header and footer bands",
                        caveat="The guidelines print #007fc7 next to RGB 0/127/200, which is #007FC8.",
                    ),
                ],
            ),
            Palette(
                title="Topic colours",
                source_label="Erasmus+ Visual guidelines 2021–2027, p. 8",
                source_url="",
                provenance="Programme guidelines — suggestions, not rules",
                intro=(
                    "The guidelines are explicit: no colour is attributed to a sector. Pick by "
                    "topic instead — green for a sustainability project, and so on."
                ),
                swatches=[
                    Swatch("Blue", "#007fc7", rgb="0, 127, 200", cmyk="83 / 1 / 0 / 0"),
                    Swatch("Deep teal", "#004a6c", rgb="0, 75, 108", cmyk="100 / 27 / 10 / 56"),
                    Swatch("Violet", "#6434c8", rgb="100, 52, 200", cmyk="80 / 80 / 0 / 0"),
                    Swatch("Aqua", "#5dbfbe", rgb="94, 191, 190", cmyk="62 / 0 / 30 / 0"),
                    Swatch("Coral", "#e86f6f", rgb="232, 111, 111", cmyk="3 / 68 / 47 / 0"),
                    Swatch("Green", "#689f38", rgb="104, 159, 56", cmyk="65 / 16 / 96 / 2"),
                    Swatch("Amber", "#f59e2d", rgb="245, 158, 45", cmyk="0 / 45 / 87 / 0"),
                ],
                footnote=(
                    "Four of the seven HEX values are one unit off their printed RGB triples "
                    "(#007fc7 vs 0/127/200, #004a6c vs 0/75/108, #5dbfbe vs 94/191/190). Both are "
                    "reproduced here as printed; the HEX is what the guidelines set in type."
                ),
            ),
        ],
        typography=[
            {
                "family": "EC Square Sans Pro",
                "css": "not embeddable — licensed to the European Commission",
                "weights": "Light, Regular, Medium, Bold, Extra Black",
                "sample": "Mandatory when the layout follows the EC charter.",
                "font": "open-sans",
                "weight": 400,
            },
            {
                "family": "Roboto",
                "css": "Roboto, Arial, sans-serif",
                "weights": "Medium for the wordmark; Light to Black available",
                "sample": "Erasmus+ — Enriching lives, opening minds.",
                "font": "roboto",
                "weight": 500,
            },
        ],
        rules=[
            "Write the name in full, capital E, <strong>no space before the plus sign</strong>: "
            "<em>Erasmus+</em>.",
            "The tagline <em>Enriching lives, opening minds.</em> may follow at roughly 1/23 of the "
            "name's size — 26 pt name to 11 pt tagline in the guidelines' own example. It exists in "
            "all languages; German is <em>Neue Perspektiven, Neue Horizonte.</em>",
            "Wordmark in blue or dark blue on light grounds, white on dark grounds.",
            "Outside the EC charter, Roboto is preferred and Arial is an acceptable substitute. "
            "Serif faces are ruled out.",
            "Where a gradient background is used, the guidelines fix the composition — start 0 %, "
            "mix 50 %, end 100 %, or start 15 %, mix 65 %, end 100 % — while leaving the colour pair "
            "to the material.",
        ],
        links=[
            (
                "Erasmus+ Visual guidelines 2021–2027 (PDF)",
                "https://ec.europa.eu/assets/eac/promo/ErasmusPlus_2021_27-visual_guidelines_2023.pdf",
            ),
            (
                "EACEA visual identity",
                "https://www.eacea.ec.europa.eu/grants/visual-identity/"
                "visual-identity-programming-period-2021-2027_en",
            ),
            ("Roboto on Google Fonts", "https://fonts.google.com/specimen/Roboto"),
        ],
    )

    return [edutap, eugloh, lmu, european_union, erasmus]


CONFLICTS = [
    {
        "title": "LMU has three greens in circulation",
        "colours": [
            ("#00883A", "LMU-Grün, current brand guide"),
            ("#009f56", "eduTAP Wallet pass assets"),
            ("#2f854c", "the PNG this site used until August 2026"),
        ],
        "body": (
            "Only the first is current — it is what the brand guide specifies and what lmu.de "
            "ships. The website now uses it. The Wallet pass artwork in the shared image folder "
            "is still cut in the older #009f56 and wants re-exporting; #2f854c came from a "
            "retired PNG and should not reappear anywhere."
        ),
    },
    {
        "title": "Two European blues, both correct",
        "colours": [
            ("#003399", "emblem, web palette"),
            ("#004494", "emblem, Erasmus+ print values"),
        ],
        "body": (
            "The graphics guide maps Reflex Blue to #003399 for screen; the Erasmus+ guidelines "
            "print #004494 for CMYK work. Choose one per medium and stay in it — an emblem in "
            "#004494 next to a heading in #003399 reads as a mistake."
        ),
    },
    {
        "title": "EUGLOH's logo blue is not EUGLOH's web blue",
        "colours": [
            ("#2b5a9d", "logo file"),
            ("#115794", "--secondColorDark"),
        ],
        "body": (
            "The mark and the website were coloured independently. Keep the logo on its own "
            "value and let the surrounding interface use the web palette."
        ),
    },
    {
        "title": "The EU's interface blue is not the emblem's blue",
        "colours": [
            ("#003399", "emblem, binding"),
            ("#0E47CB", "EU Blue 100, Europa Component Library"),
        ],
        "body": (
            "Searching for \"the official EU blue\" turns up both. The Component Library value is "
            "a UI colour for EU digital products; the emblem's is fixed by specification. Never "
            "paint the flag in <code>#0E47CB</code>, and do not reach for it just because it looks "
            "brighter on screen."
        ),
    },
]


# --------------------------------------------------------------------------- #
# Rendering
# --------------------------------------------------------------------------- #

CSS = """
:root {
  --ink: #115794;
  --ink-strong: #0d3f6c;
  --accent: #d76525;
  --accent-light: #f07129;
  --text: #262626;
  --text-muted: #767676;
  --ground: #f7f7fb;
  --card: #ffffff;
  --rule: #e3e3ef;
  --dark: #10233a;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--ground);
  color: var(--text);
  font-family: "Open Sans", Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: "Lato", Arial, sans-serif;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.1;
  margin: 0;
  letter-spacing: -0.02em;
}

a { color: var(--ink); text-decoration-color: var(--rule); text-underline-offset: 3px; }
a:hover { color: var(--accent); text-decoration-color: currentColor; }
code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.92em; }

.wrap { max-width: 1140px; margin: 0 auto; padding: 0 clamp(1rem, 4vw, 3rem); }

/* ---------- top bar ---------- */

.bar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(247, 247, 251, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--rule);
}
.bar-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.5rem;
  align-items: baseline;
  padding: 0.7rem clamp(1rem, 4vw, 3rem);
  max-width: 1140px;
  margin: 0 auto;
}
.bar-mark {
  font-family: "Lato", Arial, sans-serif;
  font-weight: 700;
  color: var(--ink);
  margin-right: auto;
}
.bar-mark span { color: var(--accent); }
.bar nav { display: flex; flex-wrap: wrap; gap: 0 1.1rem; font-size: 0.84rem; }
.bar nav a { text-decoration: none; color: var(--text-muted); }
.bar nav a:hover { color: var(--accent); }

/* ---------- hero ---------- */

.hero { padding: clamp(3rem, 9vw, 6rem) 0 clamp(2rem, 5vw, 3.5rem); }
.hero-logo { width: min(100%, 520px); height: auto; display: block; margin-bottom: 1.5rem; }
.hero h1 { font-size: clamp(2.4rem, 6vw, 4.1rem); max-width: 22ch; }
.hero p {
  max-width: 58ch;
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  color: var(--text-muted);
  margin: 1.2rem 0 0;
}
.hero-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 2rem;
  padding: 0.4rem 0.9rem 0.4rem 0.55rem;
  border: 1px solid var(--rule);
  border-radius: 999px;
  background: var(--card);
  font-size: 0.85rem;
  color: var(--text-muted);
}
.hero-hint svg { flex: none; }

.tally {
  display: flex;
  flex-wrap: wrap;
  gap: 0 2.5rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--rule);
  font-size: 0.86rem;
  color: var(--text-muted);
}
.tally b {
  display: block;
  font-family: "Lato", Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.2;
}

/* ---------- sections ---------- */

.system { padding: clamp(2.5rem, 6vw, 4.5rem) 0; border-top: 1px solid var(--rule); }
.system-head { display: grid; gap: 1rem 3rem; grid-template-columns: minmax(0, 1fr); }
@media (min-width: 900px) {
  .system-head { grid-template-columns: minmax(0, 20rem) minmax(0, 1fr); }
}
.kicker {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.6rem;
}
.system-head h2 { font-size: clamp(1.9rem, 4vw, 2.7rem); }
.system-head p { margin: 0; color: var(--text-muted); max-width: 62ch; }

h3.block {
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  margin: 3rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--rule);
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 1rem;
}
h3.block .provenance {
  font-family: "Open Sans", Arial, sans-serif;
  font-weight: 400;
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-left: auto;
}
.block-intro { margin: 0 0 1.2rem; font-size: 0.92rem; color: var(--text-muted); max-width: 70ch; }
.block-note {
  margin: 1rem 0 0;
  font-size: 0.82rem;
  color: var(--text-muted);
  max-width: 78ch;
  padding-left: 0.9rem;
  border-left: 2px solid var(--rule);
}

/* ---------- marks ---------- */

.marks { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr)); }
.mark { border: 1px solid var(--rule); background: var(--card); border-radius: 3px; overflow: hidden; }
.mark-stage {
  display: grid;
  place-items: center;
  padding: 1.6rem;
  min-height: 9.5rem;
}
.mark-stage img { max-width: 100%; max-height: 6.5rem; height: auto; }
.mark-stage.blue { background: #115794; }
.mark-stage.dark { background: var(--dark); }
.mark-meta { padding: 0.85rem 1rem 1rem; border-top: 1px solid var(--rule); }
.mark-meta strong { font-size: 0.9rem; display: block; }
.mark-meta span { display: block; font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem; }
.mark-meta code { display: block; font-size: 0.72rem; color: var(--text-muted); margin-top: 0.45rem; word-break: break-all; }
.mark-meta .flag {
  display: block;
  margin-top: 0.6rem;
  padding-left: 0.7rem;
  border-left: 2px solid var(--accent);
  font-size: 0.78rem;
  color: var(--accent);
}

/* ---------- swatches ---------- */

.swatches { display: grid; gap: 0.9rem; grid-template-columns: repeat(auto-fill, minmax(min(100%, 15.5rem), 1fr)); }

.swatch {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: 1px solid var(--rule);
  border-radius: 3px;
  background: var(--card);
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow 0.18s ease, transform 0.18s ease;
}
.swatch:hover { box-shadow: 0 6px 18px rgba(17, 87, 148, 0.1); transform: translateY(-2px); }
.swatch:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

.chip { display: block; position: relative; height: 5.5rem; overflow: hidden; }
.chip canvas { position: absolute; inset: 0; width: 100%; height: 100%; }

.values { display: block; padding: 0.75rem 0.9rem 0.9rem; }
.values .name {
  display: block;
  font-family: "Lato", Arial, sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--ink);
}
.values .table {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.1rem 0.6rem;
  margin-top: 0.5rem;
  font-size: 0.76rem;
}
.values .key { color: var(--text-muted); }
.values .val {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  overflow-wrap: anywhere;
}
.values .role { display: block; margin-top: 0.55rem; font-size: 0.78rem; color: var(--text-muted); }
.values .caveat { display: block; margin-top: 0.45rem; font-size: 0.74rem; color: var(--accent); }
.grade {
  position: absolute;
  top: 0.55rem;
  right: 0.55rem;
  padding: 0.1rem 0.4rem;
  border-radius: 2px;
  font-size: 0.66rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  letter-spacing: 0.03em;
  background: rgba(255, 255, 255, 0.85);
  color: #262626;
}
.grade.on-black { background: rgba(0, 0, 0, 0.6); color: #ffffff; }

.copied {
  position: absolute;
  inset: auto 0 0 0;
  padding: 0.3rem 0.9rem;
  background: var(--ink);
  color: #fff;
  font-size: 0.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  transform: translateY(100%);
  transition: transform 0.2s ease;
}
.swatch.is-copied .copied { transform: translateY(0); }

/* ---------- rules and typography ---------- */

.rules { margin: 1rem 0 0; padding: 0; list-style: none; display: grid; gap: 0.7rem; }
.rules li {
  position: relative;
  padding-left: 1.6rem;
  font-size: 0.92rem;
  max-width: 76ch;
}
.rules li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 0.7rem;
  height: 0.7rem;
  border: 2px solid var(--accent);
  border-left-color: transparent;
  border-bottom-color: transparent;
  border-radius: 0 100% 0 0;
}

.type-specimens { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr)); }
.specimen { border: 1px solid var(--rule); background: var(--card); border-radius: 3px; padding: 1.2rem 1.3rem 1.3rem; }
.specimen .sample { font-size: 1.5rem; line-height: 1.25; color: var(--ink); margin-bottom: 0.9rem; }
.specimen .sample.lato { font-family: "Lato", Arial, sans-serif; }
.specimen .sample.open-sans { font-family: "Open Sans", Arial, sans-serif; }
.specimen .sample.roboto { font-family: "Roboto", Arial, sans-serif; }
.specimen h4 { font-size: 0.95rem; }
.specimen p { margin: 0.3rem 0 0; font-size: 0.8rem; color: var(--text-muted); }
.specimen code { font-size: 0.74rem; }

.links { margin: 2.5rem 0 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; font-size: 0.85rem; }

/* ---------- conflicts ---------- */

#conflicts { background: var(--dark); color: #dbe3ec; border-top: none; }
#conflicts h2, #conflicts h3 { color: #fff; }
#conflicts .kicker { color: var(--accent-light); }
#conflicts .system-head p { color: #9fb0c2; }
.conflict-grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr)); margin-top: 2.5rem; }
.conflict {
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 3px;
  padding: 1.3rem;
  background: rgba(255, 255, 255, 0.03);
}
.conflict h3 { font-size: 1.05rem; margin-bottom: 0.9rem; }
.conflict p { margin: 0; font-size: 0.86rem; color: #b9c6d4; }
.versus { display: flex; align-items: stretch; gap: 0; margin-bottom: 1rem; border-radius: 2px; overflow: hidden; }
.versus div { flex: 1; padding: 0.85rem 0.7rem; min-height: 4.5rem; display: flex; flex-direction: column; justify-content: flex-end; }
.versus code { font-size: 0.78rem; display: block; }
.versus small { display: block; font-size: 0.68rem; opacity: 0.85; margin-top: 0.15rem; line-height: 1.35; }

/* ---------- footer ---------- */

footer { border-top: 1px solid var(--rule); padding: 2.5rem 0 4rem; font-size: 0.83rem; color: var(--text-muted); }
footer p { max-width: 74ch; }
footer .eu-strip { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.8rem; }
footer .eu-strip img { height: 3rem; width: auto; }

@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
  .swatch:hover { transform: none; }
}

@media print {
  .bar, .hero-hint { display: none; }
  body { background: #fff; }
  .system, #conflicts { break-inside: avoid; }
  #conflicts { background: #fff; color: #262626; }
  #conflicts h2, #conflicts h3 { color: #115794; }
  .swatch { break-inside: avoid; }
}
"""

JS = """
// Tap a swatch to copy its HEX. The ripple echoes the NFC waves in the eduTAP mark.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function ripple(canvas, colour, originX, originY) {
  if (reduceMotion) return;
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  const context = canvas.getContext('2d');
  context.scale(ratio, ratio);

  const start = performance.now();
  const duration = 620;
  const maxRadius = Math.hypot(width, height);

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    context.clearRect(0, 0, width, height);
    context.strokeStyle = colour;
    context.lineCap = 'round';
    for (let wave = 0; wave < 3; wave += 1) {
      const offset = progress - wave * 0.16;
      if (offset <= 0) continue;
      const eased = 1 - Math.pow(1 - Math.min(offset, 1), 2);
      context.globalAlpha = Math.max(0, 0.55 * (1 - eased));
      context.lineWidth = 3;
      context.beginPath();
      context.arc(originX, originY, eased * maxRadius * 0.75, -Math.PI / 3, Math.PI / 3);
      context.stroke();
    }
    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      context.clearRect(0, 0, width, height);
    }
  }
  requestAnimationFrame(frame);
}

document.querySelectorAll('.swatch').forEach((swatch) => {
  swatch.addEventListener('click', async (event) => {
    const value = swatch.dataset.hex;
    const chip = swatch.querySelector('.chip');
    const canvas = swatch.querySelector('canvas');
    const bounds = chip.getBoundingClientRect();

    ripple(canvas, swatch.dataset.ripple, event.clientX - bounds.left, event.clientY - bounds.top);

    try {
      await navigator.clipboard.writeText(value);
      swatch.querySelector('.copied').textContent = 'Copied ' + value;
    } catch (error) {
      swatch.querySelector('.copied').textContent = value + ' — select and copy';
    }
    swatch.classList.add('is-copied');
    clearTimeout(swatch.dataset.timer);
    swatch.dataset.timer = setTimeout(() => swatch.classList.remove('is-copied'), 1600);
  });
});
"""


def render_swatch(swatch: Swatch) -> str:
    partner, ratio, grade = contrast_note(swatch.hex_value)
    ripple_colour = "#ffffff" if partner == "white" else "#000000"

    rows = [("HEX", html.escape(swatch.hex_value.upper())), ("RGB", html.escape(swatch.rgb))]
    if swatch.cmyk:
        rows.append(("CMYK", html.escape(swatch.cmyk)))
    if swatch.reference:
        rows.append(("Ref", html.escape(swatch.reference)))
    if swatch.token:
        rows.append(("CSS", html.escape(swatch.token)))
    definitions = "".join(
        f'<span class="key">{label}</span><span class="val">{value}</span>'
        for label, value in rows
    )

    role = f'<span class="role">{swatch.role}</span>' if swatch.role else ""
    caveat = f'<span class="caveat">{html.escape(swatch.caveat)}</span>' if swatch.caveat else ""

    return f"""<button class="swatch" type="button" data-hex="{swatch.hex_value.upper()}"
        data-ripple="{ripple_colour}"
        aria-label="Copy {html.escape(swatch.name)} {swatch.hex_value.upper()}">
  <span class="chip" style="background:{swatch.hex_value}">
    <canvas aria-hidden="true"></canvas>
    <span class="grade{' on-black' if partner == 'black' else ''}">{grade} · {ratio} on {partner}</span>
  </span>
  <span class="values">
    <span class="name">{html.escape(swatch.name)}</span>
    <span class="table">{definitions}</span>
    {role}{caveat}
  </span>
  <span class="copied">Copied</span>
</button>"""


def render_palette(palette: Palette) -> str:
    source = html.escape(palette.source_label)
    if palette.source_url:
        source = f'<a href="{palette.source_url}" target="_blank" rel="noopener">{source}</a>'
    intro = f'<p class="block-intro">{palette.intro}</p>' if palette.intro else ""
    footnote = f'<p class="block-note">{palette.footnote}</p>' if palette.footnote else ""
    swatches = "\n".join(render_swatch(swatch) for swatch in palette.swatches)
    return f"""<h3 class="block">{html.escape(palette.title)}
  <span class="provenance">{html.escape(palette.provenance)} · {source}</span>
</h3>
{intro}
<div class="swatches">
{swatches}
</div>
{footnote}"""


def render_marks(marks: list[dict], assets: dict[str, str]) -> str:
    if not marks:
        return ""
    cards = []
    for mark in marks:
        stage_class = mark.get("background", "light")
        cards.append(
            f"""<figure class="mark">
  <div class="mark-stage {stage_class}">
    <img src="{assets[mark['asset']]}" alt="{html.escape(mark['label'])}">
  </div>
  <figcaption class="mark-meta">
    <strong>{html.escape(mark['label'])}</strong>
    <span>{mark['note']}</span>
    <code>{html.escape(mark['file'])}</code>
    {f'<span class="flag">{mark["flag"]}</span>' if mark.get("flag") else ""}
  </figcaption>
</figure>"""
        )
    return f"""<h3 class="block">Marks</h3>
<div class="marks">
{chr(10).join(cards)}
</div>"""


def render_typography(specimens: list[dict]) -> str:
    if not specimens:
        return ""
    cards = []
    for specimen in specimens:
        cards.append(
            f"""<div class="specimen">
  <p class="sample {specimen['font']}" style="font-weight:{specimen['weight']}">{html.escape(specimen['sample'])}</p>
  <h4>{html.escape(specimen['family'])}</h4>
  <p>{html.escape(specimen['weights'])}</p>
  <p><code>{html.escape(specimen['css'])}</code></p>
</div>"""
        )
    return f"""<h3 class="block">Typography</h3>
<div class="type-specimens">
{chr(10).join(cards)}
</div>"""


def render_system(system: System, assets: dict[str, str]) -> str:
    rules = ""
    if system.rules:
        items = "\n".join(f"<li>{rule}</li>" for rule in system.rules)
        rules = f'<h3 class="block">Rules</h3>\n<ul class="rules">\n{items}\n</ul>'

    links = ""
    if system.links:
        items = "\n".join(
            f'<li><a href="{url}" target="_blank" rel="noopener">{html.escape(label)} ↗</a></li>'
            for label, url in system.links
        )
        links = f'<ul class="links">\n{items}\n</ul>'

    palettes = "\n".join(render_palette(palette) for palette in system.palettes)

    return f"""<section class="system" id="{system.slug}">
  <div class="wrap">
    <div class="system-head">
      <div>
        <p class="kicker">{html.escape(system.kicker)}</p>
        <h2>{html.escape(system.name)}</h2>
      </div>
      <p>{system.lede}</p>
    </div>
    {render_marks(system.marks, assets)}
    {palettes}
    {render_typography(system.typography)}
    {rules}
    {links}
  </div>
</section>"""


def render_conflicts() -> str:
    cards = []
    for conflict in CONFLICTS:
        panels = []
        for hex_value, label in conflict["colours"]:
            on_white = contrast_ratio(hex_value, "#ffffff")
            text = "#fff" if on_white >= contrast_ratio(hex_value, "#000000") else "#000"
            panels.append(
                f'<div style="background:{hex_value};color:{text}">'
                f"<code>{hex_value.upper()}</code><small>{html.escape(label)}</small></div>"
            )
        cards.append(
            f"""<article class="conflict">
  <h3>{html.escape(conflict['title'])}</h3>
  <div class="versus">
{"".join(panels)}
  </div>
  <p>{conflict['body']}</p>
</article>"""
        )
    return f"""<section class="system" id="conflicts">
  <div class="wrap">
    <div class="system-head">
      <div>
        <p class="kicker">Watch out</p>
        <h2>Where the values collide</h2>
      </div>
      <p>Four places where one idea carries more than one defensible value. Each has bitten a
      slide deck already.</p>
    </div>
    <div class="conflict-grid">
{chr(10).join(cards)}
    </div>
  </div>
</section>"""


def render_page(systems: list[System], assets: dict[str, str]) -> str:
    swatch_count = sum(len(palette.swatches) for system in systems for palette in system.palettes)
    mark_count = sum(len(system.marks) for system in systems)

    nav = "\n".join(
        f'<a href="#{system.slug}">{html.escape(system.name)}</a>' for system in systems
    )
    sections = "\n".join(render_system(system, assets) for system in systems)

    font_faces = f"""
@font-face {{ font-family: "Lato"; font-style: normal; font-weight: 400;
  font-display: swap; src: url({assets['lato-400']}) format("woff2"); }}
@font-face {{ font-family: "Lato"; font-style: normal; font-weight: 700;
  font-display: swap; src: url({assets['lato-700']}) format("woff2"); }}
@font-face {{ font-family: "Open Sans"; font-style: normal; font-weight: 300 800;
  font-display: swap; src: url({assets['open-sans-var']}) format("woff2"); }}
@font-face {{ font-family: "Roboto"; font-style: normal; font-weight: 500;
  font-display: swap; src: url({assets['roboto-500']}) format("woff2"); }}
"""

    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>eduTAP Styleguide — colours, marks and rules</title>
<meta name="description" content="Every colour, mark and rule eduTAP shares with EUGLOH, LMU M&uuml;nchen, the European Union and Erasmus+ — with sources.">
<style>{font_faces}{CSS}</style>
</head>
<body>

<div class="bar">
  <div class="bar-inner">
    <span class="bar-mark">edu<span>TAP</span> styleguide</span>
    <nav>
{nav}
      <a href="#conflicts">Collisions</a>
    </nav>
  </div>
</div>

<header class="hero">
  <div class="wrap">
    <img class="hero-logo" src="{assets['edutap_logo']}" alt="eduTAP — no app, just tap!">
    <h1>Four identities, one card.</h1>
    <p>eduTAP puts a student card on a phone. Doing that in public means borrowing the visual
    language of the alliance that started it, the university that hosts it, and the programme
    that funds it. This page holds every colour, mark and rule those four systems bring —
    each one with the source it came from, because they do not all carry the same weight.</p>
    <div class="hero-hint">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 6.5C7.2 8.6 7.2 11.4 5 13.5" stroke="#115794" stroke-width="2" stroke-linecap="round"/>
        <path d="M9 4.5C12.4 7.6 12.4 12.4 9 15.5" stroke="#4097be" stroke-width="2" stroke-linecap="round"/>
        <path d="M13 3C17.6 7.1 17.6 12.9 13 17" stroke="#d76525" stroke-width="2" stroke-linecap="round"/>
      </svg>
      Tap any colour to copy its HEX
    </div>
    <div class="tally">
      <div><b>{swatch_count}</b> colours, all sourced</div>
      <div><b>{mark_count}</b> marks, embedded</div>
      <div><b>1</b> file, no network</div>
    </div>
  </div>
</header>

{sections}

{render_conflicts()}

<footer>
  <div class="wrap">
    <div class="eu-strip">
      <img src="{assets['eu_cofunded_pos']}" alt="Co-funded by the European Union">
      <img src="{assets['lmu_logo']}" alt="Ludwig-Maximilians-Universit&auml;t M&uuml;nchen">
      <img src="{assets['eugloh_logo']}" alt="EUGLOH">
    </div>
    <p>Assembled for the eduTAP team. Colour values are quoted from the sources named in each
    block: the LMU Brand Guide, the graphics guide to the European emblem, the Erasmus+ Visual
    guidelines 2021&ndash;2027, the EUGLOH logo file and the live eugloh.eu stylesheet. Where a
    source prints HEX and RGB values that disagree, both are reproduced as printed.</p>
    <p>Logos remain the property of their owners and are embedded here for internal reference and
    correct reproduction. The European emblem on this page is drawn to the proportions given in the
    official graphics guide; for any published material, use the emblem files supplied by the
    Commission rather than a redrawing.</p>
  </div>
</footer>

<script>{JS}</script>
</body>
</html>
"""


def main() -> None:
    output = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_OUTPUT
    assets = collect_assets()
    systems = build_systems()
    output.write_text(render_page(systems, assets), encoding="utf-8")

    swatches = sum(len(palette.swatches) for system in systems for palette in system.palettes)
    size_kb = output.stat().st_size / 1024
    print(f"wrote {output} — {swatches} swatches, {size_kb:,.0f} KB")


if __name__ == "__main__":
    main()
