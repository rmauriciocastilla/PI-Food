import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByOrder, filterByScore, getDiets, filterByDiet } from "../../redux/actions";
export default function FilterBar(){

    const dispatch = useDispatch();
    const diets = useSelector(state=>state.diets);
    
    useEffect(()=>{
        dispatch(getDiets());
    },[])

    function handleName(e){
        e.preventDefault();
        dispatch(filterByOrder(e.target.value))    
    }

    function handleScore(e){
        e.preventDefault();
        dispatch(filterByScore(e.target.value))
    }

    function handleDiet(e){
        e.preventDefault();
        dispatch(filterByDiet(e.target.value))
    }

    return(
        <div>
            <select defaultValue='Filter by Order' onChange={handleName}>
                            <option disabled>Filter by Order</option>
                            <option key= 'up' value = 'up'>Upward</option>
                            <option key= 'down' value = 'down'>Descendant</option>
            </select>

            <select defaultValue='Filter by Score' onChange={handleScore}>
                            <option disabled>Filter by Score</option>
                            <option key= 'scoreUp' value = 'scoreUp'>Score Upward</option>
                            <option key= 'scoreDown' value = 'scoreDown'>Score Descendant</option>
            </select>
            
            <select defaultValue='Filter by Diets' onChange={handleDiet}>
                            <option disabled>Filter by Diets</option>
                            <option key='allDiets' value='allDiets'>All Diets</option>
                            {diets.length && diets.map(diet=>(
                                <option key={diet.name} value={diet.name}>{diet.name}</option>
                            ))}
            </select>
        </div>
    )
}