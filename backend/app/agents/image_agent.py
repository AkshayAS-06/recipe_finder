import os
from dotenv import load_dotenv
from PIL import Image
import google.generativeai as genai

# Load Gemini API key from env file
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("Please set GEMINI_API_KEY in your .env file")
genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")

def extract_ingredients_from_image(image_path: str) -> list[str]:
    if not os.path.isfile(image_path):
        raise FileNotFoundError(f"File not found: {image_path}")

    img = Image.open(image_path)
    img = img.resize((512, 512))  # Optional: speeds up processing

    prompt = (
        "You are an AI that identifies food items and ingredients in images. "
        "Only list the ingredients visible in the image, in plain text."
        "Do NOT generate recipes or extra text."
        "Example output:\nbanana, milk, sugar"
    )

    response = model.generate_content([prompt, img])
    ingredients_text = response.text.strip()
    ingredients = [i.strip() for i in ingredients_text.split(",") if i.strip()]
    return ingredients
