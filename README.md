# Multi-Modal AI Recipe Finder

An open-source, agentic AI application that suggests recipes based on a user’s available ingredients. It provides detailed nutritional information and can be extended for multi-modal inputs like voice and image.

---
## Team Members

* Aditya DP (22n203)
* Ajay P (22n205)
* Akshay AS (22n206)
* Dhanush AS (22n214)
* Mehul Dinesh (22n232)

---

## Core Features

- **Ingredient-Based Recipe Search:** Enter your available ingredients to get a custom recipe.
- **Agentic Workflows:** Uses LangGraph to create a reliable, multi-step agent that finds recipes and calculates nutrition.
- **Macro and Calorie Calculation:** Fetches and computes nutritional estimates for every suggested recipe using the USDA FoodData Central API.
- **AI Recipe Generation:** Leverages the Gemini large language model to generate recipes from scratch if no suitable match is found.
- **Multi-Modal Ready:** Includes API endpoints for speech and image processing, ready for frontend integration.

---

## How It Works

The application uses an agentic backend built with FastAPI and LangGraph.

1.  A user submits a list of ingredients via the React frontend.
2.  The FastAPI backend receives the request and triggers the LangGraph workflow.
3.  The **`generate_recipe`** node calls the Gemini agent to create a recipe based on the ingredients.
4.  The output is passed to the **`calculate_macros`** node, which uses a client for the USDA API to find and calculate the nutritional information for the generated ingredient list.
5.  The final recipe and its nutritional data are returned to the user.

---

## Tech Stack

- **Frontend:** React.js, Axios
- **Backend:** FastAPI, LangGraph, LangChain
- **AI/ML:** Google Gemini (via `langchain-google-genai`), SpeechRecognition
- **Data:** USDA FoodData Central API (`usda_fdc`)

---

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js and npm
- A Google AI API Key for the Gemini model.
- A USDA FoodData Central API Key.

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a virtual environment and activate it:**
    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

3.  **Install Python dependencies:**
    ```bash
    pip install -r ../requirements.txt
    ```

4.  **Set up your environment variables:**
    Create a `.env` file in the `backend/` directory and add your API keys:
    ```
    GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY"
    USDA_API_KEY="YOUR_USDA_API_KEY"
    ```

5.  **Run the backend server:**
    From the `recipe_finder` root directory, run:
    ```bash
    uvicorn backend.app.main:app --reload
    ```
    The API will be available at `http://127.0.0.1:8000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```

3.  **Start the frontend application:**
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`.

---

## Project Structure

```
/
├── backend/
│   ├── app/
│   │   ├── agents/      # AI agents (Gemini, Speech, etc.)
│   │   ├── routes/      # API endpoint definitions
│   │   ├── utils/       # Utility functions (nutrition, conversions)
│   │   ├── graph_workflow.py # Core agentic workflow using LangGraph
│   │   └── main.py      # FastAPI application entrypoint
│   └── tests/           # Backend tests
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   └── App.js       # Main application component
│   └── package.json     # Frontend dependencies
├── requirements.txt     # Python dependencies
└── README.md            # This file
```