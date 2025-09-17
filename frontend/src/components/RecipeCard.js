import React, { useState } from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const [showFullInstructions, setShowFullInstructions] = useState(false);

  if (!recipe) return null;

  const { recipe_name, ingredients, instructions } = recipe;

  const toggleInstructions = () => {
    setShowFullInstructions(!showFullInstructions);
  };

  return (
    <div className="recipe-card">
      <div className="recipe-header">
        <div className="recipe-icon">🍽️</div>
        <h2 className="recipe-title">{recipe_name}</h2>
        <div className="recipe-badge">AI Generated</div>
      </div>

      <div className="recipe-content">
        {/* Ingredients Section */}
        <div className="ingredients-section">
          <h3 className="section-title">
            <span className="section-icon">🥘</span>
            Ingredients
          </h3>
          <div className="ingredients-grid">
            {Array.isArray(ingredients) ? (
              ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-item">
                  <div className="ingredient-quantity">
                    {ingredient.quantity || ingredient.unit || '1'}
                  </div>
                  <div className="ingredient-name">
                    {ingredient.item || ingredient}
                  </div>
                </div>
              ))
            ) : (
              Object.entries(ingredients).map(([name, quantity], index) => (
                <div key={index} className="ingredient-item">
                  <div className="ingredient-quantity">{quantity}</div>
                  <div className="ingredient-name">{name}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Instructions Section */}
        <div className="instructions-section">
          <h3 className="section-title">
            <span className="section-icon">👨‍🍳</span>
            Instructions
          </h3>
          <div className="instructions-container">
            {instructions.slice(0, showFullInstructions ? instructions.length : 3).map((instruction, index) => (
              <div key={index} className="instruction-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">{instruction}</div>
              </div>
            ))}
            
            {instructions.length > 3 && (
              <button 
                className="show-more-btn"
                onClick={toggleInstructions}
              >
                {showFullInstructions ? (
                  <>
                    <span>Show Less</span>
                    <span className="btn-arrow">↑</span>
                  </>
                ) : (
                  <>
                    <span>Show {instructions.length - 3} More Steps</span>
                    <span className="btn-arrow">↓</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="recipe-footer">
        <div className="cooking-time">
          <span className="time-icon">⏱️</span>
          <span>Estimated: 30-45 mins</span>
        </div>
        <div className="difficulty">
          <span className="difficulty-icon">⭐</span>
          <span>Easy</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;