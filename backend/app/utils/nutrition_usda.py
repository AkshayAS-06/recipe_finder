# from backend.app.agents.usda_client import search_food, get_food_by_id
# from backend.app.utils.conversions import normalize_name, parse_quantity, convert_to_grams

# def calculate_nutrition_usda(ingredients: list[dict]) -> dict:
#     totals = {"calories": 0, "protein": 0, "fat": 0, "carbs": 0}
    
#     for ing in ingredients:
#         name = normalize_name(ing.get("item", ""))
#         qty_str = ing.get("quantity", "1")
#         unit = ing.get("unit", "")
#         qty = parse_quantity(qty_str)
#         grams = convert_to_grams(name, qty, unit)

#         # Search USDA for best matching food
#         foods = search_food(name)
#         if not foods:
#             continue
#         food = foods[0]  # Take first match for simplicity
        
#         # Get detailed food info for nutrients
#         food_detail = get_food_by_id(food.fdc_id)
#         nutrient_map = {n.name.lower(): n.amount for n in food_detail.nutrients}
        
#         # Aggregate macros, scaled by grams/100g
#         scale = grams / 100.0
#         totals['calories'] += nutrient_map.get('energy', 0) * scale
#         totals['protein'] += nutrient_map.get('protein', 0) * scale
#         totals['fat'] += nutrient_map.get('total lipid (fat)', 0) * scale
#         totals['carbs'] += nutrient_map.get('carbohydrate, by difference', 0) * scale
    
#     return totals

from backend.app.agents.usda_client import search_food, get_food_by_id
from backend.app.utils.conversions import normalize_name, parse_quantity, convert_to_grams

def calculate_nutrition_usda(ingredients: list[dict]) -> dict:
    totals = {"calories": 0.0, "protein": 0.0, "fat": 0.0, "carbs": 0.0}
    
    for ing in ingredients:
        # Handle both dict formats
        if isinstance(ing, dict):
            name = normalize_name(ing.get("item") or list(ing.keys())[0])
            qty_str = ing.get("quantity") or list(ing.values())[0]
        else:
            # Skip if malformed
            continue
        
        # Parse into (qty, unit)
        qty, unit = parse_quantity(qty_str)
        grams = convert_to_grams(name, qty, unit)

        # Search USDA
        foods = search_food(name)
        if not foods:
            continue
        food = foods[0]
        food_detail = get_food_by_id(food.fdc_id)

        # Normalize nutrient keys
        nutrient_map = {n.name.lower().strip(): n.amount for n in food_detail.nutrients}
        
        scale = grams / 100.0
        totals['calories'] += nutrient_map.get('energy', 0) * scale
        totals['protein'] += nutrient_map.get('protein', 0) * scale
        totals['fat'] += nutrient_map.get('total lipid (fat)', nutrient_map.get('fat', 0)) * scale
        totals['carbs'] += nutrient_map.get('carbohydrate, by difference', nutrient_map.get('carbohydrate', 0)) * scale
    
    # Round for cleaner output
    return {k: round(v, 2) for k, v in totals.items()}