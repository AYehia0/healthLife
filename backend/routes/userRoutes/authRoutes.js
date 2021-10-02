const router = require('express').Router({mergeParams: true})
const controller = require('../../controller/userController/userController')
const auth = require('../../middlewares/userAuth')


// register a user
router.post('/register', controller.register)

// login
router.post('/login', controller.login)

// logout
router.get('/logout', auth, controller.logout)

// profile
router.get('/profile', auth, controller.profile)

// edit profile
router.put('/profile', auth, controller.editProfile)


module.exports = router