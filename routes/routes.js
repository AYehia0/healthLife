const router = require('express').Router({mergeParams: true })
const controller = require('../controller/controller')

// main route
router.get('/', controller.main)

// add recipe
router.post('/recipe', controller.addRecipe)

// get recipes
router.get('/recipe', controller.getRecipes)

// edit recipe
router.put('/recipe/:id', controller.editRecipe)


module.exports = router
