from fastapi.testclient import TestClient
import sys, os

# Add project root (recipe_finder/) to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from backend.app.main import app  # ✅ match main.py import

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_recipe_search():
    response = client.post("/recipes/search", json={"ingredients": ["tomato", "onion"]})  # ✅ include /recipes prefix
    assert response.status_code == 200
    data = response.json()
    assert "recipes" in data
    assert "ingredients" in data