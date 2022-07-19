import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByOrder, filterByScore, getDiets, filterByDiet, filterByRecipes } from "../../redux/actions";
import './FilterBar.css'

export default function FilterBar(){
    let [filterOrder,setFilterOrder] = useState("Filter by Order");
    let [filterScore,setFilterScore] = useState("Filter by Score");
    let [filterDiet,setFilterDiet] = useState("Filter by Diets");
    let [filterRecipes, setFilterRecipes] = useState("Filter by Recipes");

    const dispatch = useDispatch();
    const diets = useSelector(state=>state.diets);
    const recipes = useSelector(state=>state.recipes);
    const recipesDB = useSelector(state=>state.recipesDB);
    const recipesApi = useSelector(state=>state.recipesApi);
    const recipesAll = useSelector(state=>state.recipesAll);

    useEffect(()=>{
        dispatch(getDiets());
    },[])

    useEffect(()=>{
        setFilterDiet("Filter by Diets")
    },[recipes])

    useEffect(()=>{
        setFilterRecipes("Filter by Recipes");
    },[recipesAll])

    function handleName(e){
        e.preventDefault();
        setFilterOrder(e.target.value)
        setFilterScore("Filter by Score")
        dispatch(filterByOrder(e.target.value))   
    }

    function handleScore(e){
        e.preventDefault();
        setFilterOrder("Filter by Order")
        setFilterScore(e.target.value);
        dispatch(filterByScore(e.target.value))
    }

    function handleDiet(e){
        e.preventDefault();
        setFilterDiet(e.target.value)
        setFilterOrder("Filter by Order")
        setFilterScore("Filter by Score")
        dispatch(filterByDiet(e.target.value))
    }

    function handleRecipes(e){
        e.preventDefault();
        setFilterRecipes(e.target.value)
        setFilterDiet("Filter by Diets")
        setFilterOrder("Filter by Order")
        setFilterScore("Filter by Score")
        dispatch(filterByRecipes(e.target.value))
    }

    return(
        <div>
            <select value={filterOrder} onChange={handleName} className="filterbar-select">
                            <option disabled>Filter by Order</option>
                            <option value = 'Upward'>Upward</option>
                            <option value = 'Descendant'>Descendant</option>
            </select>

            <select value={filterScore} onChange={handleScore} className="filterbar-select">
                            <option disabled>Filter by Score</option>
                            <option value = 'Score Upward'>Score Upward</option>
                            <option value = 'score Down'>Score Descendant</option>
            </select>
            
            <select value={filterDiet} onChange={handleDiet} className="filterbar-select">
                            <option disabled>Filter by Diets</option>
                            <option value='All Diets'>All Diets</option>
                            {diets.length && diets.map(diet=>(
                                <option key={diet.name} value={diet.name}>{diet.name}</option>
                            ))}
            </select>

            <select value={filterRecipes} onChange={handleRecipes} className="filterbar-select">
                            <option disabled>Filter by Recipes</option>
                            <option value = 'All Recipes'>All Recipes</option>
                            <option value = 'Api Recipes'>Api Recipes</option>
                            <option value = 'DB Recipes'>DB Recipes</option>
            </select>

        </div>
    )
}