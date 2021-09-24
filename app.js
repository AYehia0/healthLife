// the db
require('./models/db')
const express = require('express')
const recipeRouter = require('./routes/recipeRoutes')
const foodItemRouter = require('./routes/foodItemRoutes')
const app = express()

// middlewares

// accepting json from POST requests
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// using the routes
app.use(recipeRouter)
app.use(foodItemRouter)

module.exports = app
