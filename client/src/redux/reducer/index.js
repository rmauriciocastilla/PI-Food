import { 
    GET_DIETS, 
    GET_RECIPES, 
    GET_RECIPES_BY_NAME, 
    GET_DETAILS, 
    FILTER_BY_NAME, 
    FILTER_BY_SCORE, 
    FILTER_BY_DIET} from "../actions"

const initialState ={
    recipes: [],
    recipesFiltered: [],
    diets: [],
    detailRecipe: {},
}

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                recipesFiltered: action.payload,
            }
        
        case GET_RECIPES_BY_NAME:
            return{
                ...state,
                recipes: action.payload,
                recipesFiltered: action.payload,
            }

        case GET_DETAILS:
            return{
                ...state,
                detailRecipe: action.payload
            }

        case GET_DIETS:
            return{
                ...state,
                diets: action.payload
            }

        case FILTER_BY_NAME:
            let auxName;

            if(action.payload === 'up'){
                auxName = state.recipesFiltered.slice().sort((a,b)=>{
                    if(a.name.toLowerCase()>b.name.toLowerCase()){
                        return 1;
                    }
                    if(a.name.toLowerCase()<b.name.toLowerCase()){
                        return -1;
                    }
                    return 0;
                })
            }
            else{
                auxName = state.recipesFiltered.slice().sort((a,b)=>{
                    if(a.name.toLowerCase()<b.name.toLowerCase()){
                        return 1;
                    }
                    if(a.name.toLowerCase()>b.name.toLowerCase()){
                        return -1;
                    }
                    return 0;
                })
            }
            return{
                ...state,
                recipesFiltered: auxName.slice(),
            }

        case FILTER_BY_SCORE:
            let auxScore;
            if(action.payload === 'scoreUp'){
                auxScore = state.recipesFiltered.slice().sort((a,b)=>{
                    if(a.healthScore>b.healthScore){
                        return 1;
                    }
                    if(a.healthScore<b.healthScore){
                        return -1;
                    }
                    return 0;
                })
            }
            else{
                auxScore = state.recipesFiltered.slice().sort((a,b)=>{
                    if(a.healthScore<b.healthScore){
                        return 1;
                    }
                    if(a.healthScore>b.healthScore){
                        return -1;
                    }
                    return 0;
                })
            }
            return{
                ...state,
                recipesFiltered: auxScore.slice(),
            }

        case FILTER_BY_DIET:
            let aux = state.recipes.slice();
            if(action.payload === "allDiets"){
                return{
                    ...state,
                    recipesFiltered: aux.slice(),
                }
            }
            return{
                ...state,
                recipesFiltered: aux.slice().filter(recipe=>recipe.diets.includes(action.payload)),
            }
            
        default:
            return {...state}
    }
}