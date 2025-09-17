from usda_fdc import FdcClient
from backend.app.config import USDA_API_KEY

client = FdcClient(USDA_API_KEY)

def search_food(food_name: str):
    results = client.search(food_name, page_size=5)
    return results.foods

def get_food_by_id(fdc_id: int):
    return client.get_food(fdc_id)
