import React, { useState } from "react";
import "./Searchbar.css";

function SearchBar({onSearch}) {
   const [query,setQuery]=useState("")
  const handleChange=(e)=>{
 setQuery(e.target.value)
    onSearch(e.target.value)
 }
    return(
   <div className="search-bar">
  <input 
     type="text"
        value={query}
   onChange={handleChange}
 placeholder="Search recipes..."
   />
     </div>
 )
}
export default SearchBar
