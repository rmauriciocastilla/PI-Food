require('dotenv').config();
const {Router} = require('express');
const {Recipe, Diet} = require('../db');
const {YOUR_API_KEY} = process.env;
const axios = require('axios');

const router = Router();

// router.post('/', async (req,res)=>{
//     try{
//         let {name, summary, healthScore, steps, image, diets} = req.body;
//         if(name && summary){
//             const recipe = await Recipe.create({
//                 name,
//                 summary,
//                 healthScore,
//                 steps,
//                 image
//             })
//             await recipe.addDiet(diets);
//             res.status(200).send("La receta se ha creado correctamente");
//         }
//         else{
//             res.status(400).send("Faltan datos obligatorios")
//         }
//     }
//     catch(e){
//         console.log(e)
//         res.status(500).send({msg: e.message})
//     }
// })

router.post('/', (req,res)=>{
    let {name, summary, healthScore, steps, image, diets} = req.body;
    if(name && summary){
        return Recipe.create({
                name,
                summary,
                healthScore,
                steps,
                image
        })
        .then(recipe=>recipe.addDiet(diets))
        .then(response=>{
            console.log(response);
            res.status(200).send("La receta se ha creado correctamente")
        })
        .catch(e=>{
            console.log(e)
            res.status(500).send({msg: e.message})
        })
    }
    else{
        res.status(400).send("Faltan datos obligatorios")
    }
})

// router.get('/', async (req,res)=>{
//     let {name} = req.query;
//     try{
//         const allRecipes = await searchRecipes();
//         if(name){
//             let regExp = new RegExp(name,'i');
//             let nameRecipes = allRecipes.filter(recipe => regExp.test(recipe.name));
//             res.status(200).json(nameRecipes.length?nameRecipes:"No hay recetas.");
//         }else{
//             res.status(200).json(allRecipes.length?allRecipes:"No hay recetas.")
//         }
//     }   
//     catch(e){
//         res.status(500).send({msg: e.message})
//     } 
// })

;

router.get('/', (req,res)=>{
    let {name} = req.query;
    return searchRecipes()
        .then(allRecipes=>{
            if(name){
                let regExp = new RegExp(name,'i');
                return allRecipes.filter(recipe => regExp.test(recipe.name));
            }else{
                return allRecipes;
            }  
        })
        .then(recipes=>res.status(200).json(recipes.length?recipes:"No hay recetas."))
        .catch(e=>res.status(500).send({msg: e.message}))
    }
)

// router.get('/:id', async (req,res)=>{
//     let {id} = req.params;
//     if(id-1){
//         const recipesApi = await searchAPIRecipes();
//         const recipe = recipesApi.find(recipe => recipe.id === parseInt(id));
//         res.status(200).json(recipe?recipe:`No existe receta con id ${id}`);
//     }else{
//         const recipesDB = await searchDBRecipes();
//         const recipe = recipesDB.find(recipe => recipe.id === id);
//         res.status(200).json(recipe?recipe:`No existe receta con id ${id}`);
//     }
// })

router.get('/:id', (req,res)=>{
    let {id} = req.params;
    if(id-1){
        return searchAPIRecipes()
            .then(recipesApi=>recipesApi.find(recipe => recipe.id === parseInt(id)))
            .then(recipe=>res.status(200).json(recipe?recipe:`No existe receta con id ${id}`))
            .catch(e=>console.log(e));
    }else{
        return searchDBRecipes()
            .then(recipesDB=>recipesDB.find(recipe => recipe.id === id))
            .then(recipe=>res.status(200).json(recipe?recipe:`No existe receta con id ${id}`))
            .catch(e=>console.log(e));
    }
})

// async function searchRecipes(){
//     const recipesDB = await searchDBRecipes();
//     const recipesApi = await searchAPIRecipes();
//     const allRecipes = recipesDB.concat(recipesApi);
//     return allRecipes;
// }

function searchRecipes(){
    return Promise.all([searchDBRecipes(),searchAPIRecipes()])
            .then(values=>values[0].reverse().concat(values[1]))
            .catch(e=>console.log(e));
}

// async function searchDBRecipes(){
//     try{
//         let recipesDB = await Recipe.findAll({
//                 include:{
//                     model: Diet,
//                     attributes: ['name'],
//                     through:{
//                         attributes:[]
//                     }
//                 }
//             }
//         )
        
//         recipesDB = recipesDB.map(r => {
//                 return {
//                     id: r.id,
//                     name: r.name,
//                     summary: r.summary,
//                     healthScore: r.healthScore,
//                     image: r.image,
//                     steps: r.steps,
//                     diets: r.diets.map(d=>d.name)
//                 }
//             }
//         )
//         return recipesDB;
//     }
//     catch(e){
//         return [];
//     }
// }

function searchDBRecipes(){
    return Recipe.findAll({
            include:{
                model: Diet,
                attributes: ['name'],
                through:{
                    attributes:[]
                }
            }
        }
    )
    .then(recipesDB=>recipesDB.map(r => {
            return {
                id: r.id,
                name: r.name,
                summary: r.summary,
                healthScore: r.healthScore,
                image: r.image,
                steps: r.steps,
                diets: r.diets.map(d=>d.name)
                }
            }
        )
    )
    .catch(error=>{
        console.log(error);
        return []
    })
}

// async function searchAPIRecipes(){
//     try {
//         const results = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
//                 .then(response=>response.data)
//                 .then(res=>res.results);

//         let recipesApi = results.map(recipe=>{
//             return{
//                 id: recipe.id,
//                 name: recipe.title,
//                 summary: recipe.summary,
//                 healthScore: recipe.healthScore,
//                 image: recipe.image,
//                 steps: recipe.analyzedInstructions.length && recipe.analyzedInstructions[0].steps.length?recipe.analyzedInstructions[0].steps.map(etp=>etp.step).join(" \n"):"", 
//                 diets: recipe.diets
//             }
//         })

//         return recipesApi;    
//     } catch (error) {
//         return []
//     }
    
// }

function searchAPIRecipes(){
    return axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
                .then(response=>response.data)
                .then(res=>res.results)
                .then(results=>results.map(recipe=>{
                    return{
                        id: recipe.id,
                        name: recipe.title,
                        summary: recipe.summary,
                        healthScore: recipe.healthScore,
                        image: recipe.image,
                        steps: recipe.analyzedInstructions.length && recipe.analyzedInstructions[0].steps.length?recipe.analyzedInstructions[0].steps.map(etp=>etp.step).join(" \n"):"", 
                        diets: recipe.diets
                    }
                }))
                .then(recipes=>recipes)
                .catch(error=>{
                    console.log(error);
                    return []
                })
    
}
module.exports = router