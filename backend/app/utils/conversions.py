from fractions import Fraction

UNIT_CONVERSIONS = {
    ("rice", "cup"): 158,  # grams approx
    ("egg", "piece"): 50,
    # Add more ingredient-unit conversions
}

def normalize_name(name: str) -> str:
    return name.lower().split('(')[0].strip()

def parse_quantity(qty_str: str):
    parts = qty_str.split(maxsplit=1)
    try:
        qty = float(Fraction(parts[0]))
    except Exception:
        qty = 0.0
    unit = parts[1] if len(parts) > 1 else ""
    return qty, unit

def convert_to_grams(name: str, qty: float, unit: str) -> float:
    key = (normalize_name(name), unit.lower())
    if key in UNIT_CONVERSIONS:
        return qty * UNIT_CONVERSIONS[key]
    return qty  # fallback assuming grams
