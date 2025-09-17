import React, { useState } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import NutritionInfo from './NutritionInfo';
import './RecipeFinder.css';

const API_BASE_URL = 'http://127.0.0.1:8000';

const RecipeFinder = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [macros, setMacros] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    setLoading(true);
    setError(null);
    setRecipe(null);
    setMacros(null);

    try {
      const ingredientList = ingredients
        .split(',')
        .map(ing => ing.trim())
        .filter(ing => ing.length > 0);

      const response = await axios.post(`${API_BASE_URL}/recipe-workflow`, {
        ingredients: ingredientList
      });

      if (response.data.recipe && response.data.macros) {
        setRecipe(response.data.recipe);
        setMacros(response.data.macros);
      } else {
        setError('Failed to generate recipe. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to generate recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setIngredients('');
    setRecipe(null);
    setMacros(null);
    setError(null);
  };

  return (
    <div className="recipe-finder">
      {/* Floating background elements */}
      <div className="floating-elements">
        <div className="floating-element">🍳</div>
        <div className="floating-element">🥘</div>
        <div className="floating-element">🍽️</div>
        <div className="floating-element">👨‍🍳</div>
        <div className="floating-element">🥗</div>
        <div className="floating-element">🍲</div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="logo-container">
            <div className="logo-icon">🍳</div>
            <h1 className="hero-title">Recipe Finder</h1>
          </div>
          <p className="hero-subtitle">
            Transform your ingredients into delicious recipes with AI-powered cooking magic
          </p>
          
          <form onSubmit={handleSubmit} className="ingredient-form">
            <div className="input-container">
              <label htmlFor="ingredients" className="input-label">
                What ingredients do you have?
              </label>
              <div className="input-wrapper">
                <textarea
                  id="ingredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="Enter ingredients separated by commas (e.g., chicken, rice, vegetables, garlic, olive oil)"
                  className="ingredient-input"
                  rows="3"
                  disabled={loading}
                />
                <div className="input-decoration"></div>
              </div>
            </div>
            
            <div className="button-group">
              <button 
                type="submit" 
                className="find-recipe-btn"
                disabled={loading || !ingredients.trim()}
              >
                {loading ? (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                    <span>Creating Magic...</span>
                  </div>
                ) : (
                  <>
                    <span className="btn-icon">✨</span>
                    <span>Find Recipe</span>
                  </>
                )}
              </button>
              
              <button 
                type="button" 
                onClick={handleClear}
                className="clear-btn"
                disabled={loading}
              >
                <span className="btn-icon">🗑️</span>
                <span>Clear</span>
              </button>
            </div>
          </form>

          {error && (
            <div className="error-message">
              <div className="error-icon">⚠️</div>
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {(recipe || macros) && (
        <div className="results-section">
          <div className="results-container">
            {recipe && <RecipeCard recipe={recipe} />}
            {macros && <NutritionInfo macros={macros} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeFinder;