from fastapi import FastAPI
from backend.app.routes import recipe
app = FastAPI()

@app.get("/health")
async def health_check():
    return {"status": "ok"}
app.include_router(recipe.router, prefix="/recipes", tags=["recipes"])