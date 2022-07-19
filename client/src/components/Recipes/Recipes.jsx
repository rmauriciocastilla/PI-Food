import React, {useState,useEffect} from "react";
import Recipe from "../Recipe/Recipe";
import {useDispatch, useSelector} from "react-redux";
import {getRecipes } from "../../redux/actions";
import Paginacion from "../Paginacion/Paginacion";
import './Recipes.css'

export default function Recipes(){
    let recipesFiltered = useSelector(state=>state.recipesFiltered);
    let allRecipes = useSelector(state=>state.recipes);
    let recipesDB = useSelector(state=>state.recipesDB);
    let recipesApi = useSelector(state=>state.recipesApi);
    let recipesAll = useSelector(state=>state.recipesAll)
    const [maximo,setMaximo] = useState(0);
    const [pagina,setPagina] = useState(1);
    const [porPagina,setPorPagina] = useState(9);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getRecipes())
    },[])

    useEffect(()=>{
        console.log("holi")
        setMaximo(Math.ceil(recipesFiltered.length/9));
        setPagina(1);
    },[recipesFiltered])

    if(Array.isArray(recipesFiltered)){
        if(recipesFiltered.length){
            return (<div>
                <Paginacion 
                pagina={pagina}
                setPagina={setPagina}
                maximo={maximo}
                />
                <div className="container-recipes">
                    {recipesFiltered.slice((pagina-1)*porPagina,(pagina-1)*porPagina+porPagina).map(recipe=>(
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
            </div>
        )
        }
        else if(allRecipes.length || (!recipesDB.length&&recipesAll.length) || (!recipesApi.length&&recipesAll.length)){
            return (
                <div className="container-loading">
                    <h2 className="container-loading-h2">❌No recipes😖</h2>
                </div>
            )
        }
        else{
            return(
                <div className="container-loading">
                    <h2 className="container-loading-h2">Loading recipes...</h2>
                </div>
            )
        }
    }else{
        return (
            <div className="container-loading">
                <h2 className="container-loading-h2">❌No recipes😖</h2>
            </div>
        )
    }
    
}