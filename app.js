const express = require('express')
const app = express()


// max range
const maxRange = 10

// middlewares
// accepting json from POST requests
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// dummy data
const foods = [{
        id: 1,
        name: 'Kushari',
        description: 'Rice, pasta and more, served with some hot souce',
        category: "junk",
        facts: {
            carbs: 21,
            proteins: 20,
            fats: 9
        }
    },

    {
        id: 2,
        name: 'Pasta',
        description: 'pasta, weeeeee',
        category: "junk",
        facts: {
            carbs: 30,
            proteins: 10,
            fats: 2
        }
    },
    {
        id: 3,
        name: 'Something, idk',
        description: 'hmmm, hungry',
        category: "healthy",
        facts: {
            carbs: 10,
            proteins: 30,
            fats: 20
        }    
    }
]

// make a controller for db, insertion and deletion

// GET routes
app.get('/', (req, res, err) => {
    res.send("The Food API !!!")
})

// getting all the food, first with range
app.get('/food/:range', (req, res, err) => {
    // getting from params

    const range = req.params.range

    // range is smoll
    if (range <= 0) res.send("Error: range must be greater than 0")

    // out of range
    if (range > maxRange) res.send(`Error: out of range, max range is ${maxRange}`)

    // no errors on range
    // fetch the data from a db and show it 

    // checking the size of the db first 
    const food = foods.slice(0, range)
    res.json(food)

})

module.exports = app
