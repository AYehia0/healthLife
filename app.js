const express = require('express')
const routers = require('./routes/routes')
const app = express()


// max range
const maxRange = 10

// middlewares
// accepting json from POST requests
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// using the routes
app.use(routers)

module.exports = app
