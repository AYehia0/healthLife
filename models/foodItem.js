// the generic food items like potato, meat, beans, apple, etc....
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
Each Item has :
    - Name 
    - Facts : protiens, fats, and carbs

Note: an item has multiple types : 
    example : a potato
        - 1 g 
        - medium 
        - large
        - serving
        - ...etc
*/
const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category: [{
        type: {
            type: String,
            required: true,
            trim: true
        },
        facts: {
            protein: {
                type: Number,
                required: true
            },
            fat: {
                type: Number,
                required: true
            },
            carb: {
                type: Number,
                required: true
            }
        },
        cals: {
            type: Number,
            default: 0
        }
    }]
})

// Carbohydrates provide 4 calories per gram, protein provides 4 calories per gram, and fat provides 9 calories per gram
const convertToCals = (protein, fat, carb) => {

    return protein*4 + fat*9 + carb*4

}

// calculating the cals on save 
itemSchema.pre('save', function(){
    // getting the food item
    const item = this

    const itemFacts = item.category

    // checking if any of facts field has been changed
    itemFacts.forEach( element => {

        if (element.isModified()){
        
            console.log("Trying to add/edit")
            // get all the properties
            const p = element.facts.protein
            const f = element.facts.fat
            const c = element.facts.carb

            // changing the cals
            element.cals = convertToCals(p, f, c)

            }
        }   
    ) 
})

// itemSchema.pre('updateOne', ()=>{
//     console.log("Trying to add/edit")
// })const cors = require('cors')

const FoodItem = mongoose.model('Item', itemSchema)

module.exports = FoodItem