from langgraph.graph import StateGraph, END
from backend.app.agents.gemini_agent import generate_recipe_from_ingredients
from backend.app.utils.nutrition_usda import calculate_nutrition_usda

def generate_recipe_node(state):
    print(">>> Ingredients passed to Gemini:", state.get("ingredients"))
    recipe = generate_recipe_from_ingredients(state["ingredients"])
    print(">>> Recipe generated:", recipe)
    if not recipe:
        recipe = {}
    return {"recipe": recipe}

def calculate_macros_node(state):
    recipe = state.get("recipe", {})
    ingredients = recipe.get("ingredients", [])
    macros = calculate_nutrition_usda(ingredients)

    # Explicitly return both recipe and macros so recipe is not lost
    return {"recipe": recipe, "macros": macros}

graph = StateGraph(dict)
graph.add_node("generate_recipe", generate_recipe_node)
graph.add_node("calculate_macros", calculate_macros_node)
graph.set_entry_point("generate_recipe")
graph.add_edge("generate_recipe", "calculate_macros")
graph.add_edge("calculate_macros", END)

workflow = graph.compile()
