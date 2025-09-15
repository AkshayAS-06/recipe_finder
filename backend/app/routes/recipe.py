from fastapi import APIRouter
from typing import List


router = APIRouter()

@router.post("/search")
async def search_recipes(ingredients: List[str]):
    # Replace with real logic later
    return {"recipes": ["Test Recipe 1", "Test Recipe 2"], "ingredients": ingredients}
