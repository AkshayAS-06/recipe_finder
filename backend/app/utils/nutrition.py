NUTRITION_DB = {
    "egg": {"calories": 68, "protein": 6, "fat": 5, "carbs": 1},
    "rice": {"calories": 130, "protein": 2.7, "fat": 0.3, "carbs": 28},
    # Extend with more ingredients and data!
}

def calculate_macros(ingredients: dict) -> dict:
    # ingredients: {"egg": 2, "rice": 100}
    totals = {"calories": 0, "protein": 0, "fat": 0, "carbs": 0}
    for name, qty in ingredients.items():
        data = NUTRITION_DB.get(name)
        if data:
            for k in totals:
                totals[k] += data[k] * qty
    return totals
