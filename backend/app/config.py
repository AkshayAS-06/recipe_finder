import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
USDA_API_KEY = os.getenv("FDC_API_KEY")