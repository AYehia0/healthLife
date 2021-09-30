// the db
require('./models/db')
require('dotenv').config()
const express = require('express')
const cors = require('cors')

// meals things
const recipeRouter = require('./routes/foodRoutes/recipeRoutes')
const foodItemRouter = require('./routes/foodRoutes/foodItemRoutes')

// user things
const userAuthRoutes = require('./routes/userRoutes/authRoutes')
const userFoodRoutes = require('./routes/userRoutes/userFoodRoutes')
const adminRoutes = require('./routes/adminRoutes/adminRoutes')

const app = express()

// middlewares
app.use(cors())

// accepting json from POST requests
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// using the routes
app.use(recipeRouter)
app.use(foodItemRouter)
app.use('/user', userAuthRoutes)
app.use('/user', userFoodRoutes)
app.use('/topSecretRoute', adminRoutes)

module.exports = app
