import React, { useState } from 'react';
import './NutritionInfo.css';

const NutritionInfo = ({ macros }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  if (!macros) return null;

  const { calories, protein, fat, carbs, fiber, sugar, breakdown } = macros;

  const toggleBreakdown = () => {
    setShowBreakdown(!showBreakdown);
  };

  const nutritionItems = [
    {
      label: 'Calories',
      value: Math.round(calories),
      unit: 'kcal',
      icon: '🔥',
      color: '#ff6b6b',
      percentage: 100
    },
    {
      label: 'Protein',
      value: Math.round(protein),
      unit: 'g',
      icon: '💪',
      color: '#4ecdc4',
      percentage: Math.min((protein / 50) * 100, 100)
    },
    {
      label: 'Carbs',
      value: Math.round(carbs),
      unit: 'g',
      icon: '🌾',
      color: '#feca57',
      percentage: Math.min((carbs / 200) * 100, 100)
    },
    {
      label: 'Fat',
      value: Math.round(fat),
      unit: 'g',
      icon: '🥑',
      color: '#ff9ff3',
      percentage: Math.min((fat / 65) * 100, 100)
    },
    {
      label: 'Fiber',
      value: Math.round(fiber),
      unit: 'g',
      icon: '🌿',
      color: '#96ceb4',
      percentage: Math.min((fiber / 25) * 100, 100)
    },
    {
      label: 'Sugar',
      value: Math.round(sugar),
      unit: 'g',
      icon: '🍯',
      color: '#f38ba8',
      percentage: Math.min((sugar / 50) * 100, 100)
    }
  ];

  return (
    <div className="nutrition-info">
      <div className="nutrition-header">
        <div className="nutrition-icon">📊</div>
        <h2 className="nutrition-title">Nutrition Facts</h2>
        <div className="nutrition-badge">Per Serving</div>
      </div>

      <div className="nutrition-grid">
        {nutritionItems.map((item, index) => (
          <div key={index} className="nutrition-card">
            <div className="nutrition-card-header">
              <div className="nutrition-icon-small">{item.icon}</div>
              <div className="nutrition-label">{item.label}</div>
            </div>
            <div className="nutrition-value">
              <span className="value-number">{item.value}</span>
              <span className="value-unit">{item.unit}</span>
            </div>
            <div className="nutrition-bar">
              <div 
                className="nutrition-progress"
                style={{ 
                  width: `${item.percentage}%`,
                  backgroundColor: item.color
                }}
              ></div>
            </div>
            <div className="nutrition-percentage">
              {Math.round(item.percentage)}% of daily value
            </div>
          </div>
        ))}
      </div>

      {breakdown && Object.keys(breakdown).length > 0 && (
        <div className="breakdown-section">
          <button 
            className="breakdown-toggle"
            onClick={toggleBreakdown}
          >
            <span className="breakdown-icon">🔍</span>
            <span>{showBreakdown ? 'Hide' : 'Show'} Ingredient Breakdown</span>
            <span className="toggle-arrow">
              {showBreakdown ? '↑' : '↓'}
            </span>
          </button>

          {showBreakdown && (
            <div className="breakdown-content">
              <h3 className="breakdown-title">Per Ingredient</h3>
              <div className="breakdown-grid">
                {Object.entries(breakdown).map(([ingredient, nutrition], index) => (
                  <div key={index} className="breakdown-item">
                    <div className="breakdown-ingredient">
                      {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                    </div>
                    <div className="breakdown-stats">
                      <div className="breakdown-stat">
                        <span className="stat-value">{Math.round(nutrition.calories)}</span>
                        <span className="stat-label">cal</span>
                      </div>
                      <div className="breakdown-stat">
                        <span className="stat-value">{Math.round(nutrition.protein)}</span>
                        <span className="stat-label">p</span>
                      </div>
                      <div className="breakdown-stat">
                        <span className="stat-value">{Math.round(nutrition.carbs)}</span>
                        <span className="stat-label">c</span>
                      </div>
                      <div className="breakdown-stat">
                        <span className="stat-value">{Math.round(nutrition.fat)}</span>
                        <span className="stat-label">f</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="nutrition-footer">
        <div className="nutrition-note">
          <span className="note-icon">ℹ️</span>
          <span>Values are approximate and may vary based on ingredient quality and preparation methods.</span>
        </div>
      </div>
    </div>
  );
};

export default NutritionInfo;