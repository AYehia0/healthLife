// the db related things goes here
const mongoose = require('mongoose')

// connection to the db
const dbNAME = "Foods"
const modelNAMES ={
    meal: {
        tname: "Recipe",
        schema: {
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

        }
    }
} 
const dbURL = `mongodb://localhost:27017/${dbNAME}`

mongoose.connect(dbURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    autoIndex: true
}).catch(e => {
    console.log(e.message)
})


// creating the models
const Recipe = mongoose.model(modelNAMES.meal.tname, modelNAMES.meal.schema)


module.exports = Recipe
