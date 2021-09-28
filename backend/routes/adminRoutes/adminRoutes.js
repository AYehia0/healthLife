const router = require('express').Router()
const controller = require('../../controller/adminController/adminController')
const auth = require('../../middlewares/auth')


// register a user
router.post('/register-admin', controller.register)

// login
router.post('/login-admin', controller.login)

// logout
router.get('/logout-admin', auth, controller.logout)

// profile
router.get('/profile-admin', auth, controller.profile)



module.exports = router