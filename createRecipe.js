const {Router} = require('express');
const {Recipe} = require('./api/src/db');
const router = Router();


router.post('/', async (req,res)=>{
    try{
        let {name, summary, healthScore, steps, diets} = req.body;
        if(name && summary){
            const recipe = await Recipe.create({
                name,
                summary,
                healthScore,
                steps
            })
            await recipe.addDiet(diets);
            res.status(200).send("La receta se ha creado correctamente");
        }
        else{
            res.status(400).send("Faltan datos obligatorios")
        }
    }
    catch(e){
        res.status(500).send({msg: e.message})
    }
})

module.exports = router;