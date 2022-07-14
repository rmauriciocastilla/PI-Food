import React from "react";
import NavBar from "../NavBar/NavBar";
import Recipes from "../Recipes/Recipes";
import FilterBar from "../FilterBar/FilterBar";

export default function Container(){
    return(
        <div>
            <NavBar/>
            <FilterBar/>
            <Recipes/>
        </div>
    )
}