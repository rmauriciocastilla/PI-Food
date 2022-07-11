require('dotenv').config();
const {Router} = require('express');
const {Recipe, Diet} = require('../db');
const {YOUR_API_KEY} = process.env;

const router = Router();

router.get('/', async (req,res)=>{
    try{
        const recipes = await Recipe.findAll({
            include:{
                model: Diet,
                attributes: ['name'],
                through:{
                    attributes:[]
                }
            }
        })

        const recipesDB = await recipes.map(r => {
            return {
                id: r.id,
                name: r.name,
                summary: r.summary,
                healthScore: r.healthScore,
                image: r.image,
                steps: r.steps,
                diets: r.diets.map(d=>d.name)
            }
        })
        res.status(200).json(recipesDB.length?recipesDB:"No hay recetas creadas")
    }   
    catch(e){
        res.status(500).send({msg: e.message})
    } 
})

module.exports = router