const router = require('express').Router({mergeParams: true })
const controller = require('../controller/foodItemController')

// add Item
router.post('/food', controller.addItem)

// pushing category to the FoodItem
router.post('/category/:id', controller.addCategory)

// editing a category
router.put('/category/:id', controller.editCategory)

// get Items 
// search by name + range ,,, 0 range returns all
// curl -X GET "localhost:8080/recipe?name=pie&range=0" 
router.get('/food', controller.getItems)

// edit Item 
// curl -d '{"name": "not a pie", "summary": "The sweetest apple pie ever made", "category": "junk", "facts": { "fats":20, "proteins":10, "carbs":30 }}' -H "Content-Type: application/json" -X PUT  http://localhost:8080/recipe/61461803d182194ca7c4ffab 
router.put('/food/:id', controller.editItem)

module.exports = router

