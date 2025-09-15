# Multi-Modal AI Recipe Finder

An open-source AI-powered application that suggests recipes based on a user’s available ingredients, providing nutritional information and explainable recommendations. Built for modular multi-modal expansion.

---

##  Core Features

- **Ingredient-Based Recipe Search:** Enter available ingredients (text input, extensible to voice & image).
- **Macro and Calorie Calculation:** Nutrition estimates for every suggested recipe.
- **AI Recipe Generation:** If no perfect match, LLM-powered generation creates recipes from scratch.
- **Explainability:** Shows reasoning behind every recommendation—ingredients, substitutions, logic path.

---

##  Implementation Approach

- **Serverless MVP First:** Start with open-source LLM and API calls, cache results as needed.
- **Progressive Caching:** Introduce lightweight caching (file-based or minimal DB) for frequent recipes and user favorites.
- **Text-Only (MVP):** Begin with text-based ingredient input for ease of development.
- **Simple Data:** Avoid full recipe dataset ingestion—generate or fetch as needed.

---

##  How It Works

1. User enters ingredients as free text.
2. Backend calls open-source LLMs or recipe APIs for results.
3. Nutrition module estimates macros and calories per result.
4. If no recipe matches, the system dynamically generates a suitable recipe.
5. Reasoning (explainability) module displays decision process to the user.

---

##  Team Roles & Responsibilities

| Role                   | Responsibilities                                                   |
| ---------------------- | ------------------------------------------------------------------ |
| Frontend Engineer      | UI for text input, displaying results, macros/calories, explainability. |
| Backend/API Engineer   | APIs for user input, LLM orchestration, serverless deployment logic.   |
| AI/ML Engineer         | Multi-modal model hooks (text first), nutrition and macro calculators.  |
| Agent/Orchestration    | Implement AI agent workflows, recipe logic, traceable explanation.     |
| DevOps/Data Engineer   | Local/cloud setup for LLMs, lightweight caching, simple ops/scripts.   |

---

##  Tech Stack

- **Frontend:** React.js (TypeScript)
- **Backend:** FastAPI (Python), LangChain, LangGraph
- **AI/ML:** Open-source LLMs (GPT-4o, LLaMA, transformers), open recipes datasets
- **Cache/Storage:** File-based or lightweight DB (SQLite)
- **DevOps:** Docker, basic local scripts

---

##  Open Source Commitment

- Only open-source LLMs, models, and datasets.
- Codebase, workflows, and data fully open and hackable.

---



