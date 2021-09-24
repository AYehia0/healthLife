// the db related things goes here
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 40
    },
    summary: {
        type: String,
        trim: true,
        maxlength: 120
    },
    category: {
        type: String,
        required: true,
        lowercase: true,
        enum: ["soup", "drink", "junk", "healthy"]
    },
    facts: {
        carbs: {
            type: Number,
            default: 0
        },
        fats: {
            type: Number,
            default: 0
        },
        proteins: {
            type: Number,
            default: 0
        },
    },
})

// creating the models
const Recipe = mongoose.model('Recipe', recipeSchema) 

module.exports = Recipe
