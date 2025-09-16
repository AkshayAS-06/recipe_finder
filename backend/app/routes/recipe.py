from fastapi import APIRouter
from pydantic import BaseModel
from backend.app.agents.gemini_agent import generate_recipe_from_ingredients

router = APIRouter()

class IngredientInput(BaseModel):
    ingredients: list[str]

@router.post("/generate-recipe")
def generate_recipe(input: IngredientInput):
    recipe = generate_recipe_from_ingredients(input.ingredients)
    return {"recipe": recipe}
