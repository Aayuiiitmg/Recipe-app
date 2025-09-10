import React, { useState } from "react";
import recipesData from "./recipes.json";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import SearchBar from "./Searchbar";

function App(){
  const parsed=JSON.parse(recipesData.content);
  const recipes=parsed.recipes;

  const [feedback, setFeedback]=useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState([]);
  const handleSubmit=(e)=>{
    e.preventDefault();
    if (feedback.trim()){
      setSubmittedFeedback([...submittedFeedback, feedback]);
      setFeedback("");
    }
  };

  return (
    <div className="app">
      <Header />
      <SearchBar onSearch={(query)=>console.log("Searching for:",query)}/>
      <div className="card-container">
        {recipes.map((recipe)=>(
          <div className="card" key={recipe.id}>
            <img src={recipe.image} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            <p>
              <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
            </p>
            <p>
              <strong>Instructions:</strong> {recipe.instructions.join(" ")}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {recipe.rating}
            </p>
          </div>
        ))}
      </div>
      {}
      <div className="feedback-section">
        <h2>PLEASE DO GIVE A FEEDBACK</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={feedback}
            onChange={(e)=>setFeedback(e.target.value)}
            placeholder="Share your thoughts..."
          ></textarea>
          <button type="submit">Submit</button>
        </form>
        {submittedFeedback.length>0&&(
          <div className="feedback-list">
            <h3>Previous Feedback</h3>
            <ul>
              {submittedFeedback.map((fb,index)=>(
                <li key={index}>{fb}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
