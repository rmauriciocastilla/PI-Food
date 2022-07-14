import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../redux/actions";

export default function NavBar(){

    const dispatch = useDispatch();
    const [search,setSearch] = useState("");
    
    function handleChange(e){
        e.preventDefault();
        setSearch(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getRecipesByName(search))
    }

    return(
        <nav>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search recipe" value={search} onChange={handleChange}/>
                <input type="submit" value="Find"/>
            </form>

            <Link to="/create">Create Recipe</Link>
        </nav>
    )
}