const router = require('express').Router({mergeParams: true })
const controller = require('../../controller/foodController/foodItemController')

// add Item
router.post('/food', controller.addItem)

// pushing category to the FoodItem
router.post('/category/:id', controller.addCategory)

// editing a category
router.put('/category/:id', controller.editCategory)

// get Items 
// search by name + range ,,, 0 range returns all
// curl -X GET "localhost:8080/food?name=pie&range=0" 
router.get('/food', controller.getItems)

// edit Item 
router.put('/food/:id', controller.editItem)

module.exports = router

