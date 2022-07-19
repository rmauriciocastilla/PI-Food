import axios from 'axios';

export const GET_DIETS = "GET_DIETS";
export const GET_DETAILS = "GET_DETAILS";
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const POST_RECIPE = "POST_RECIPE";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_SCORE = "FILTER_BY_SCORE";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_BY_RECIPES = "FILTER_BY_RECIPES";

export const getRecipes = ()=>(dispatch)=>{
  return axios.get('http://localhost:3001/recipes')
          .then(response=>response.data)
          .then(recipes => dispatch({type: GET_RECIPES, payload: recipes}))
          .catch(e => console.log(e.msg))
}

export const getRecipesByName = (name)=>(dispatch)=>{
  return axios.get(`http://localhost:3001/recipes?name=${name}`)
          .then(response=>response.data)
          .then(recipes => dispatch({type: GET_RECIPES_BY_NAME, payload: recipes}))
          .catch(e => console.log(e))
}

export const getDetails = (id)=>(dispatch)=>{
  return axios.get(`http://localhost:3001/recipes/${id}`)
          .then(response=>response.data)
          .then(recipe => dispatch({type: GET_DETAILS, payload: recipe}))
          .catch(e => console.log(e))
}

export const getDiets = ()=>(dispatch)=>{
  return axios.get('http://localhost:3001/diets')
          .then(response=>response.data)
          .then(diets => dispatch({type: GET_DIETS, payload: diets}))
          .catch(e => console.log(e.msg))
}

export const postRecipe = (recipe)=>()=>{
  return axios.post('http://localhost:3001/recipes', recipe)
          .then(response=>response.data)
          .then(e=>alert(e))
          .catch(e=>console.log(e));
}

export const filterByOrder = (order) => {
  return {
    type: FILTER_BY_NAME,
    payload: order
  }
}

export const filterByScore = (order) =>{
  return {
    type: FILTER_BY_SCORE,
    payload: order
  }
}

export const filterByDiet = (diet) =>{
  return {
    type: FILTER_BY_DIET,
    payload: diet
  }
}

export const filterByRecipes = (recipeType)=>{
  return{
    type: FILTER_BY_RECIPES,
    payload: recipeType
  }
}