const router = require('express').Router({mergeParams: true })
const controller = require('../../controller/foodController/foodItemController')
const auth = require('../../middlewares/adminAuth')

// add Item
router.post('/food', auth, controller.addItem)

// pushing category to the FoodItem
router.post('/category/:id', auth, controller.addCategory)

// editing a category
router.put('/category/:id', auth, controller.editCategory)

// get Items 
// search by name + range ,,, 0 range returns all
// curl -X GET "localhost:8080/food?name=pie&range=0" 
router.get('/food', controller.getItems)

// get item by id
router.get('/food/:id', controller.getItemById)

// edit Item 
router.put('/food/:id', auth,  controller.editItem)

module.exports = router

