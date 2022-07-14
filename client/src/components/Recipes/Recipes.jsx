import React, {useEffect} from "react";
import Recipe from "../Recipe/Recipe";
import {useDispatch, useSelector} from "react-redux";
import {getRecipes } from "../../redux/actions";

export default function Recipes(){
    let recipesFiltered = useSelector(state=>state.recipesFiltered);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getRecipes())
    },[])

    return(
        <div className="container-recipes">
            {!recipesFiltered.length?"No hay recetas":recipesFiltered.map(recipe=>(
                <Recipe
                    key={recipe.id}
                    id={recipe.id}
                    name={recipe.name}
                    summary={recipe.summary}
                    healthScore={recipe.healthScore}
                    image={recipe.image}
                    steps={recipe.steps}
                    diets={recipe.diets}
                />
            ))}
        </div>
    )
}