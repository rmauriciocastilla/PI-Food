const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require('./getRecipes');
const diets = require('./getDiets')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes',recipes);
router.use('/diets',diets);

module.exports = router;
