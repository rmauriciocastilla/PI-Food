import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../redux/actions";
import './NavBar.css';
export default function NavBar(){

    const dispatch = useDispatch();
    const [search,setSearch] = useState("");
    
    function handleChange(e){
        e.preventDefault();
        setSearch(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getRecipesByName(search.trim()))
    }

    // function reload(){
    //     window.location.reload();
    // }

    return(
        <nav className="nav-container">
            <a href="/" className="h1-nav">Foody App🍱</a>
            <form className="form-nav" onSubmit={handleSubmit}>
                <input className="form-nav-input-text" type="text" placeholder="Search recipes..." value={search} onChange={handleChange}/>
                <button className="form-nav-button-submit"type="submiy"><svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="25px" height="25px"><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/></svg></button>
            </form>
            <a className="form-nav-link-create" href="/create">Create Recipe👨‍🍳</a>
        </nav>
    )
}