const router = require('express').Router({mergeParams: true})
const controller = require('../../controller/userController/userFoodController')
const auth = require('../../middlewares/userAuth')


// user add food 
router.post('/food', auth, controller.userAddFood )

// get all meals
router.get('/foodall', auth, controller.userGetAllMeals )

// user delete food
router.delete('/food/:id', auth, controller.userDeleteFood )

// delete one 
router.delete('/foodone/:id/:type', auth, controller.userDeleteFoodOne )

// user add to favs
router.post('/foodfav', auth, controller.userAddFoodFavourite )

// user remove from favs
router.delete('/foodfav/:id', auth, controller.userDeleteFoodFavourite )

// sum up calories
router.get('/foodcals', auth, controller.userGetAllCalories)




module.exports = router