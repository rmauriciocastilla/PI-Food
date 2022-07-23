const {Router} = require('express');
const { Diet} = require('../db');

const router = Router();

// router.get('/', async (req,res)=>{
//     try {
//         let diets = await Diet.findAll();
//         res.status(200).json(diets);
//     } catch (error) {
//         res.status(500).send({msg:error.message})
//     }    
// })

router.get('/',(req,res)=>{
    Diet.findAll()
    .then(diets=>res.status(200).json(diets.length?diets:"No hay dietas agregadas"))
    .catch(e=>res.status(500).json({msg:error.message}))    
})


//SI LAS DIETAS NO ESTAS CARGADAS, DESCOMENTA ESTE CODIGO Y COMENTA EL router.get DE ARRIBA.
//HAZ LA PETICION GET A /diets Y LUEGO VUELVE DESCOMENTA EL ANTERIOR Y COMENTA ESTE
// require('dotenv').config();
// const axios = require('axios');
// const {YOUR_API_KEY} = process.env;
// router.get('/', async (req,res)=>{
    //     try{
        //         let myDiets = await Diet.findAll();
        //         if(myDiets.length){
            //             res.status(200).json(myDiets);
            //         }else{
                //             const results = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
                //                                     .then(response=>response.data)
                //                                     .then(res=>res.results);
                //             let dietsArray = [];
                //             results.forEach(recipe => recipe.diets.forEach(diet=>{
                    //                         if(!dietsArray.find(elem=>elem===diet)){
                        //                             dietsArray.push(diet)
                        //                         }
                        //                     }
                        //                 )
                        //             )
                        //             dietsArray = dietsArray.map(diet=>Diet.create({
                            //                 name: diet
//             }))
//             await Promise.all(dietsArray)
//             dietsArray = await Diet.findAll();
//             res.status(200).json(dietsArray);
//         }
//     }
//     catch(e){
    //         res.status(500).send({msg: e.message});
    //     }
    // })
    
    
    
    module.exports = router
    
    
    


