import React from "react";
import NavBar from "../NavBar/NavBar";
import Recipes from "../Recipes/Recipes";
import FilterBar from "../FilterBar/FilterBar";
import { useSelector } from "react-redux";

export default function Container(){
    let recipes = useSelector(state=>state.recipes);
    return(
        <div>
            <NavBar/>
            {Array.isArray(recipes)?<FilterBar/>:<div></div>}
            <Recipes/>
        </div>
    )
}