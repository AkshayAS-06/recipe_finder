from fastapi import APIRouter
from pydantic import BaseModel
from backend.app.utils.nutrition import calculate_macros

router = APIRouter()

class NutritionInput(BaseModel):
    ingredients: dict[str, float]  # e.g., {"egg": 2, "rice": 100}

@router.post("/nutrition")
def nutrition_endpoint(input: NutritionInput):
    macros = calculate_macros(input.ingredients)
    return {"macros": macros}
