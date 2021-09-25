const Recipe = require('../../models/food/recipe')

///////////////////////////////////// RECIPE ///////////////////////////////////// 

// POST request to add food 
const addRecipe = async (req, res, err) => {

    try {
        const userData = req.body

        const newRecipe = new Recipe(userData)
        const saveRecipe = await newRecipe.save()
        if (!saveRecipe)
            res.send("Error")

        // done
        res.send(`Added a new recipe: ${newRecipe}`)

    }catch(e) {
        res.send(e.message)
    }

}

// GET : showing all recipes of range or name
const getRecipes = async (req, res, err) => {

    // getting all recipes if range is zero

    try {
        // getting the range 
        let range = req.query.range
        let name = req.query.name

        // just in case something went wrong, more security shit
        if (!range)
            range = 0

        // trying to get 
        // finding any record which have the name in it, "i" for case insensitive
        const data = await Recipe.find({name: {"$regex": name, "$options":"i"}}).limit(+range)

        if(data.length == 0)
            res.send("Empty db")
        else
            res.send(data)

    }catch(e) {
        res.send(e.message)
    }

}

// PUT : edit a recipe
const editRecipe = async (req, res, err) => {
    // don't forget to add allowed list here

    const allowedFields = ['name', 'summary', 'category', 'facts']
    const allowedSubFields = ['carbs', 'fats', 'proteins']
    const sentKeys = Object.keys(req.body)

    isVaildField = sentKeys.every( item => allowedFields.includes(item) )
    isVaildSubField = false

    // checking for sub fields : facts
    if (sentKeys.includes('facts')) {
        isVaildSubField = Object.keys(req.body.facts).every( item => allowedSubFields.includes(item) )
    }

    if (!isVaildField || !isVaildSubField)
        res.send("Request contains some parameters that can't be edited!")

    try{
        // updating the db
        // getting the id
        const id = req.params.id
        const data = await Recipe.findByIdAndUpdate(id, req.body)

        if(!data)
            res.send("Can't edit: Nothing to edit here")

        res.send(`Recipe has been edited ${data}`)

    }catch(e) {
        res.send(e.message) 
    }


}

const main =  (req, res, err) => {
    res.send("The Food API !!!")
}




// exporting the modules
module.exports = {
    main,
    addRecipe,
    getRecipes,
    editRecipe
}
