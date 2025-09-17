from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.routes.recipe import router as recipe_router
from backend.app.routes.nutrition import router as nutrition_router
from backend.app.routes.speech import router as speech_router
from backend.app.routes.image import router as image_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(recipe_router)
app.include_router(nutrition_router)
app.include_router(speech_router)
app.include_router(image_router)
