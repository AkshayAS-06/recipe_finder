// import React, { useState } from 'react';
// import axios from 'axios';
// import RecipeCard from './RecipeCard';
// import NutritionInfo from './NutritionInfo';
// import './RecipeFinder.css';

// const API_BASE_URL = 'http://127.0.0.1:8000';

// const RecipeFinder = () => {
//   const [ingredients, setIngredients] = useState('');
//   const [recipe, setRecipe] = useState(null);
//   const [macros, setMacros] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!ingredients.trim()) return;

//     setLoading(true);
//     setError(null);
//     setRecipe(null);
//     setMacros(null);

//     try {
//       const ingredientList = ingredients
//         .split(',')
//         .map(ing => ing.trim())
//         .filter(ing => ing.length > 0);

//       const response = await axios.post(`${API_BASE_URL}/recipe-workflow`, {
//         ingredients: ingredientList
//       });

//       if (response.data.recipe && response.data.macros) {
//         setRecipe(response.data.recipe);
//         setMacros(response.data.macros);
//       } else {
//         setError('Failed to generate recipe. Please try again.');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       setError('Failed to generate recipe. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setIngredients('');
//     setRecipe(null);
//     setMacros(null);
//     setError(null);
//   };

//   return (
//     <div className="recipe-finder">
//       {/* Floating background elements */}
//       <div className="floating-elements">
//         <div className="floating-element">🍳</div>
//         <div className="floating-element">🥘</div>
//         <div className="floating-element">🍽️</div>
//         <div className="floating-element">👨‍🍳</div>
//         <div className="floating-element">🥗</div>
//         <div className="floating-element">🍲</div>
//       </div>

//       {/* Hero Section */}
//       <div className="hero-section">
//         <div className="hero-content">
//           <div className="logo-container">
//             <div className="logo-icon">🍳</div>
//             <h1 className="hero-title">Recipe Finder</h1>
//           </div>
//           <p className="hero-subtitle">
//             Transform your ingredients into delicious recipes with AI-powered cooking magic
//           </p>
          
//           <form onSubmit={handleSubmit} className="ingredient-form">
//             <div className="input-container">
//               <label htmlFor="ingredients" className="input-label">
//                 What ingredients do you have?
//               </label>
//               <div className="input-wrapper">
//                 <textarea
//                   id="ingredients"
//                   value={ingredients}
//                   onChange={(e) => setIngredients(e.target.value)}
//                   placeholder="Enter ingredients separated by commas (e.g., chicken, rice, vegetables, garlic, olive oil)"
//                   className="ingredient-input"
//                   rows="3"
//                   disabled={loading}
//                 />
//                 <div className="input-decoration"></div>
//               </div>
//             </div>
            
//             <div className="button-group">
//               <button 
//                 type="submit" 
//                 className="find-recipe-btn"
//                 disabled={loading || !ingredients.trim()}
//               >
//                 {loading ? (
//                   <div className="loading-spinner">
//                     <div className="spinner"></div>
//                     <span>Creating Magic...</span>
//                   </div>
//                 ) : (
//                   <>
//                     <span className="btn-icon">✨</span>
//                     <span>Find Recipe</span>
//                   </>
//                 )}
//               </button>
              
//               <button 
//                 type="button" 
//                 onClick={handleClear}
//                 className="clear-btn"
//                 disabled={loading}
//               >
//                 <span className="btn-icon">🗑️</span>
//                 <span>Clear</span>
//               </button>
//             </div>
//           </form>

//           {error && (
//             <div className="error-message">
//               <div className="error-icon">⚠️</div>
//               <span>{error}</span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Results Section */}
//       {(recipe || macros) && (
//         <div className="results-section">
//           <div className="results-container">
//             {recipe && <RecipeCard recipe={recipe} />}
//             {macros && <NutritionInfo macros={macros} />}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeFinder;

import React, { useState, useRef } from 'react';
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

  // Audio recording state
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Image upload state
  const [imageFile, setImageFile] = useState(null);

  // --- AUDIO RECORDING FUNCTIONS ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new window.MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      setError('Could not access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecording(false);
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const handleAudioUpload = async () => {
    if (!audioBlob) return;
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      const res = await axios.post(`${API_BASE_URL}/ingredients-from-speech`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Fill the ingredients box with the result for further editing/confirmation
      if (res.data.ingredients) {
        setIngredients(res.data.ingredients.join(', '));
      } else {
        setError('No ingredients detected from speech.');
      }
    } catch (err) {
      setError('Failed to analyze audio.');
    } finally {
      setLoading(false);
    }
  };

  // --- IMAGE UPLOAD FUNCTIONS ---
  const handleImageChange = (e) => {
    if (e.target.files.length) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      const res = await axios.post(`${API_BASE_URL}/ingredients-from-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.ingredients) {
        setIngredients(res.data.ingredients.join(', '));
      } else {
        setError('No ingredients detected from image.');
      }
    } catch (err) {
      setError('Failed to analyze image.');
    } finally {
      setLoading(false);
    }
  };

  // --- TEXT SUBMIT AS BEFORE ---
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
    setAudioBlob(null);
    setImageFile(null);
  };

  return (
    <div className="recipe-finder">
      <div className="floating-elements">
        <div className="floating-element">🍳</div>
        <div className="floating-element">🥘</div>
        <div className="floating-element">🍽️</div>
        <div className="floating-element">👨‍🍳</div>
        <div className="floating-element">🥗</div>
        <div className="floating-element">🍲</div>
      </div>

      <div className="hero-section">
        <div className="hero-content">
          <div className="logo-container">
            <div className="logo-icon">🍳</div>
            <h1 className="hero-title">Recipe Finder</h1>
          </div>
          <p className="hero-subtitle">
            Transform your ingredients into delicious recipes with AI-powered cooking magic
          </p>

          {/* Ingredient input (text area) */}
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

            {/* AUDIO RECORDING/UPLOAD */}
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
              <div>
                <strong>Or record your ingredients:</strong><br />
                <button type="button" onClick={startRecording} disabled={recording}>
                  {recording ? 'Recording...' : '🎤 Start Recording'}
                </button>
                <button type="button" onClick={stopRecording} disabled={!recording}>
                  Stop Recording
                </button>
              </div>
              {audioBlob && (
                <div>
                  <audio controls src={URL.createObjectURL(audioBlob)} />
                  <button type="button" onClick={handleAudioUpload}>Use Speech Ingredients</button>
                </div>
              )}
            </div>

            {/* IMAGE UPLOAD & EXTRACT */}
            <div style={{ marginBottom: '10px' }}>
              <div>
                <strong>Or upload a food image:</strong><br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                  style={{ marginTop: '5px' }}
                />
                {imageFile && (
                  <div>
                    <span>{imageFile.name}</span>
                    <button type="button" onClick={handleImageUpload}>Use Image Ingredients</button>
                  </div>
                )}
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
