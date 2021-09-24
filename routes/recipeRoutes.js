const router = require('express').Router({mergeParams: true })
const controller = require('../controller/recipeController')

// main route
router.get('/', controller.main)

// add recipe
// curl -d '{"name": "pie pie", "summary": "The sweetest apple pie ever made", "category": "junk", "facts": { "fats":20, "proteins":10, "carbs":30 }}' -H "Content-Type: application/json" -X POST http://localhost:8080/recipe
router.post('/recipe', controller.addRecipe)

// get recipes
// search by name + range ,,, 0 range returns all
// curl -X GET "localhost:8080/recipe?name=pie&range=0" 
router.get('/recipe', controller.getRecipes)

// edit recipe
// curl -d '{"name": "not a pie", "summary": "The sweetest apple pie ever made", "category": "junk", "facts": { "fats":20, "proteins":10, "carbs":30 }}' -H "Content-Type: application/json" -X PUT  http://localhost:8080/recipe/61461803d182194ca7c4ffab 
router.put('/recipe/:id', controller.editRecipe)


module.exports = router
