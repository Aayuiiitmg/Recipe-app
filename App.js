import React, { useState } from "react";
import recipesData from "./recipes.json";

function Header(){
   const headerStyle={
  display:"flex",
     alignItems:"center",
 justifyContent:"center",
  background:"linear-gradient(90deg,#1826bf,#ac109c)",
 padding:"20px 30px",
 color:"white",
 fontSize:"28px",
 fontWeight:"bold",
 boxShadow:"0 4px 15px rgba(172,16,156,0.8)",
 position:"sticky",
 top:0,
 zIndex:1000,
 borderRadius:"10px"
}
const logoStyle={
 fontSize:"32px",
 fontWeight:700,
 letterSpacing:"2px",
 cursor:"pointer",
 transition:"transform 0.3s ease,color 0.3s ease"
}
  return(
    <header style={headerStyle}>
      <div style={logoStyle}>Recipes</div>
    </header>
  )
}

function Footer(){
   const footerStyle={
  background:"linear-gradient(90deg,#1926b5,#ffcc80)",
    color:"white",
   textAlign:"center",
padding:"20px",
marginTop:"40px",
fontSize:"14px"
 }
  return(
    <footer style={footerStyle}>
      <p>© {new Date().getFullYear()} Recipe App. All rights reserved.</p>
    </footer>
  )
}

function SearchBar({onSearch}){
   const barStyle={display:"flex",justifyContent:"center",margin:"20px 0"}
   const inputStyle={
     width:"60%",
 maxWidth:"400px",
 padding:"10px 15px",
 border:"2px solid #ccc",
 borderRadius:"25px",
 fontSize:"16px",
 outline:"none"
 }
  return(
   <div style={barStyle}>
    <input style={inputStyle} type="text" placeholder="Search recipes..." 
   onChange={(e)=>onSearch(e.target.value)}/>
   </div>
 )
}

function App(){
  const parsed=JSON.parse(recipesData.content)
  const recipes=parsed.recipes
  const [feedback,setFeedback]=useState("")
  const [submittedFeedback,setSubmittedFeedback]=useState([])
  const [searchQuery,setSearchQuery]=useState("")

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(feedback.trim()){
      setSubmittedFeedback([...submittedFeedback,feedback])
      setFeedback("")
    }
  }

 const appStyle={display:"flex",flexDirection:"column",minHeight:"100vh",fontFamily:"Poppins,Arial,sans-serif",background:"#fdfdfd",color:"#333"}
 const cardContainerStyle={display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"20px",padding:"20px"}
 const cardStyle={background:"white",borderRadius:"16px",padding:"15px",boxShadow:"0 4px 12px rgba(0,0,0,0.1)",transition:"transform 0.2s"}
 const cardImgStyle={width:"100%",borderRadius:"12px"}
 const cardTitleStyle={fontSize:"20px",margin:"10px 0",color:"#222"}
 const feedbackSectionStyle={padding:"20px",background:"#fafafa",borderTop:"2px solid #eee",textAlign:"center"}
 const feedbackTitleStyle={fontSize:"24px",marginBottom:"15px"}
 const textareaStyle={width:"80%",maxWidth:"500px",height:"100px",padding:"10px",border:"2px solid #2d1070",borderRadius:"10px",fontFamily:"Poppins,sans-serif",marginBottom:"10px",resize:"none"}
 const buttonStyle={background:"linear-gradient(90deg,#172e71,#07711a)",color:"white",border:"none",padding:"10px 20px",fontSize:"16px",borderRadius:"8px",cursor:"pointer"}
 const feedbackListStyle={marginTop:"15px",textAlign:"left",display:"inline-block"}

 const filtered=recipes.filter(r=>r.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return(
    <div style={appStyle}>
      <Header/>
      <SearchBar onSearch={setSearchQuery}/>
      <div style={cardContainerStyle}>
        {filtered.map((recipe)=>(
          <div style={cardStyle} key={recipe.id}>
            <img src={recipe.image} alt={recipe.name} style={cardImgStyle}/>
            <h3 style={cardTitleStyle}>{recipe.name}</h3>
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
            <p><strong>Instructions:</strong> {recipe.instructions.join(" ")}</p>
            <p><strong>Rating:</strong> ⭐ {recipe.rating}</p>
          </div>
        ))}
      </div>
      <div style={feedbackSectionStyle}>
        <h2 style={feedbackTitleStyle}>PLEASE DO GIVE A FEEDBACK</h2>
        <form onSubmit={handleSubmit}>
          <textarea value={feedback} onChange={(e)=>setFeedback(e.target.value)} placeholder="Share your thoughts..." style={textareaStyle}></textarea>
          <br/>
          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
        {submittedFeedback.length>0&&(
          <div style={feedbackListStyle}>
            <h3>Previous Feedback</h3>
            <ul>
              {submittedFeedback.map((fb,index)=>(<li key={index}>{fb}</li>))}
            </ul>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  )
}

export default App
