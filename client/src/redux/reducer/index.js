import { GET_DIETS, GET_RECIPES, GET_RECIPES_BY_NAME, GET_DETAILS, FILTER_BY_NAME, FILTER_BY_SCORE, FILTER_BY_DIET} from "../actions"

const initialState ={
    recipes: [],
    recipesFiltered: [],
    diets: [],
    detailRecipe: {}
}

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                recipesFiltered: action.payload
            }
        
        case GET_RECIPES_BY_NAME:
            return{
                ...state,
                recipes: action.payload,
                recipesFiltered: action.payload
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
            if(action.payload === 'up'){
                return{
                    ...state,
                    recipesFiltered: state.recipesFiltered.slice().sort((a,b)=>{
                        if(a.name>b.name){
                            return 1;
                        }
                        if(a.name<b.name){
                            return -1;
                        }
                        return 0;
                    })
                }
            }
            else{
                return{
                    ...state,
                    recipesFiltered: state.recipesFiltered.slice().sort((a,b)=>{
                        if(a.name<b.name){
                            return 1;
                        }
                        if(a.name>b.name){
                            return -1;
                        }
                        return 0;
                    })
                }
            }

        case FILTER_BY_SCORE:
            if(action.payload === 'scoreUp'){
                return{
                    ...state,
                    recipesFiltered: state.recipesFiltered.slice().sort((a,b)=>{
                        if(a.healthScore>b.healthScore){
                            return 1;
                        }
                        if(a.healthScore<b.healthScore){
                            return -1;
                        }
                        return 0;
                    })
                }
            }
            else{
                return{
                    ...state,
                    recipesFiltered: state.recipesFiltered.slice().sort((a,b)=>{
                        if(a.healthScore<b.healthScore){
                            return 1;
                        }
                        if(a.healthScore>b.healthScore){
                            return -1;
                        }
                        return 0;
                    })
                }
            }

        case FILTER_BY_DIET:
            if(action.payload === "allDiets"){
                return{
                    ...state,
                    recipesFiltered: state.recipes.slice()
                }
            }
            return{
                ...state,
                recipesFiltered: state.recipes.slice().filter(recipe=>recipe.diets.includes(action.payload))
            }
            
        default:
            return {...state}
    }
}