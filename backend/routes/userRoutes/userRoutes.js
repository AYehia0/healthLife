const router = require('express').Router()
const controller = require('../../controller/userController/userController')
const auth = require('../../middlewares/auth')


// register a user
router.post('/register', controller.register)

// login
router.post('/login', controller.login)

// logout
router.get('/logout', auth, controller.logout)

// profile
router.get('/profile', auth, controller.profile)




module.exports = router