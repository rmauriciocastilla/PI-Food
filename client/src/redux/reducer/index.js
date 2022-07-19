import { 
    GET_DIETS, 
    GET_RECIPES, 
    GET_RECIPES_BY_NAME, 
    GET_DETAILS, 
    FILTER_BY_NAME, 
    FILTER_BY_SCORE, 
    FILTER_BY_DIET,
    FILTER_BY_RECIPES} from "../actions"

const initialState ={
    recipes: [],
    recipesFiltered: [],
    recipesAll: [],
    recipesApi:[],
    recipesDB:[],
    diets: [],
    detailRecipe: {},
}

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                recipesAll: action.payload,
                recipesFiltered: action.payload,
                recipesApi: Array.isArray(action.payload)?action.payload.filter(diet=>Number.isInteger(diet.id-1)):action.payload,
                recipesDB: Array.isArray(action.payload)?action.payload.filter(diet=>!Number.isInteger(diet.id-1)):action.payload,
            }
        
        case GET_RECIPES_BY_NAME:
            return{
                ...state,
                recipes: action.payload,
                recipesAll: action.payload,
                recipesFiltered: action.payload,
                recipesApi: Array.isArray(action.payload)?action.payload.filter(diet=>Number.isInteger(diet.id-1)):action.payload,
                recipesDB: Array.isArray(action.payload)?action.payload.filter(diet=>!Number.isInteger(diet.id-1)):action.payload,
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

            if(action.payload === 'Upward'){
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
            if(action.payload === 'Score Upward'){
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
            if(action.payload === "All Diets"){
                return{
                    ...state,
                    recipesFiltered: aux.slice(),
                }
            }
            return{
                ...state,
                recipesFiltered: aux.slice().filter(recipe=>recipe.diets.includes(action.payload)),
            }
            
        case FILTER_BY_RECIPES:
            if(action.payload === "Api Recipes"){
                return{
                    ...state,
                    recipes: state.recipesApi.slice(),
                    recipesFiltered: state.recipesApi.slice()
                }
            }
            else if(action.payload === "DB Recipes"){
                return{
                    ...state,
                    recipes: state.recipesDB.slice(),
                    recipesFiltered: state.recipesDB.slice()
                }
            }
            else{
                return{
                    ...state,
                    recipes: state.recipesAll.slice(),
                    recipesFiltered: state.recipesAll.slice()
                }
            }
            
        default:
            return {...state}
    }
}