// the db
require('./models/db')
require('dotenv').config()
const express = require('express')

// meals things
const recipeRouter = require('./routes/foodRoutes/recipeRoutes')
const foodItemRouter = require('./routes/foodRoutes/foodItemRoutes')

// user things
const userRoutes = require('./routes/userRoutes/userRoutes')

const app = express()

// middlewares

// accepting json from POST requests
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// using the routes
app.use(recipeRouter)
app.use(foodItemRouter)
app.use('/user', userRoutes)

module.exports = app
