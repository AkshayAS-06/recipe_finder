from fastapi import FastAPI
from backend.app.routes.recipe import router as recipe_router
from backend.app.routes.nutrition import router as nutrition_router

app = FastAPI()
app.include_router(recipe_router)
app.include_router(nutrition_router)
