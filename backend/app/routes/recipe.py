# from fastapi import APIRouter
# from pydantic import BaseModel
# from backend.app.agents.gemini_agent import generate_recipe_from_ingredients

# router = APIRouter()

# class IngredientInput(BaseModel):
#     ingredients: list[str]

# @router.post("/generate-recipe")
# def generate_recipe(input: IngredientInput):
#     recipe = generate_recipe_from_ingredients(input.ingredients)
#     return {"recipe": recipe}

from fastapi import APIRouter
from pydantic import BaseModel
from backend.app.graph_workflow import workflow

router = APIRouter()

class RecipeWorkflowInput(BaseModel):
    ingredients: list[str]

@router.post("/recipe-workflow")
async def run_recipe_macro_workflow(input: RecipeWorkflowInput):
    state_in = {"ingredients": input.ingredients}
    state_out = workflow.invoke(state_in)
    return {
        "recipe": state_out.get("recipe"),
        "macros": state_out.get("macros")
    }
