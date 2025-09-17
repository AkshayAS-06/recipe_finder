from fastapi import APIRouter, UploadFile, File
from backend.app.agents.image_agent import extract_ingredients_from_image

router = APIRouter()

@router.post("/ingredients-from-image")
async def ingredients_from_image(file: UploadFile = File(...)):
    contents = await file.read()
    temp_path = f"/tmp/{file.filename}"
    with open(temp_path, "wb") as f:
        f.write(contents)
    ingredients = extract_ingredients_from_image(temp_path)
    return {"ingredients": ingredients}
