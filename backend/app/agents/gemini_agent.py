import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

# Load environment variables (GEMINI_API_KEY)
load_dotenv()
GOOGLE_API_KEY = os.getenv("GEMINI_API_KEY")

def build_recipe_prompt(bot_name: str, ingredients: list[str]) -> str:
    """
    Creates a formatted prompt for Gemini to generate a recipe using the user ingredients.
    """
    user_ingredient_list = ", ".join(ingredients)
    user_input = (
        "Given these ingredients: "
        f"{user_ingredient_list}. "
        "Generate a healthy, creative recipe. "
        "Return the response as structured JSON with fields: recipe_name, ingredients (with quantities), instructions (stepwise list)."
    )
    chat_template = ChatPromptTemplate.from_messages([
        ("ai", "How can I assist you?"),
        ("system", f"You are a helpful AI chef assistant. Your name is {bot_name}."),
        ("human", "{user_input}"),
    ])
    chat_prompt = chat_template.format_messages(bot_name=bot_name, user_input=user_input)
    return chat_prompt

def get_gemini_llm():
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash-lite",
        temperature=0.3,
        max_tokens=None,
        timeout=60,
        max_retries=2,
        api_key=GOOGLE_API_KEY,
    )
    return llm

def generate_recipe_from_ingredients(ingredients: list[str], bot_name: str = "Lysa"):
    llm = get_gemini_llm()
    prompt = build_recipe_prompt(bot_name=bot_name, ingredients=ingredients)
    response = llm.invoke(prompt)
    print("Gemini response:", response.content)
    # Try to parse the response as JSON dict if possible, else return as text
    try:
        import json
        return json.loads(response.content)
    except Exception:
        return {"raw_response": response.content}
