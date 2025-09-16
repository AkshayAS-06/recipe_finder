from langgraph.graph import StateGraph, END
from backend.app.agents.gemini_agent import generate_recipe_from_ingredients
from backend.app.utils.nutrition import calculate_macros

def generate_recipe_node(state):
    print(">>> Ingredients passed to Gemini:", state.get("ingredients"))
    recipe = generate_recipe_from_ingredients(state["ingredients"])
    print(">>> Recipe generated:", recipe)
    if not recipe:
        recipe = {}
    return {"recipe": recipe}

def calculate_macros_node(state):
    recipe = state.get("recipe", {})
    ingredients = {}

    for ing in recipe.get("ingredients", []):
        name = ing.get("item", "").lower()
        try:
            qty = float(ing.get("quantity", 1))
        except (ValueError, TypeError):
            qty = 1
        ingredients[name] = qty

    macros = calculate_macros(ingredients)

    # Explicitly return both recipe and macros so recipe is not lost
    return {"recipe": recipe, "macros": macros}

graph = StateGraph(dict)
graph.add_node("generate_recipe", generate_recipe_node)
graph.add_node("calculate_macros", calculate_macros_node)
graph.set_entry_point("generate_recipe")
graph.add_edge("generate_recipe", "calculate_macros")
graph.add_edge("calculate_macros", END)

workflow = graph.compile()
