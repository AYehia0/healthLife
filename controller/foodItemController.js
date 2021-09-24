const Item = require('../models/foodItem')

///////////////////////////////////// FOOD ITEMS ///////////////////////////////////// 

// POST request to add food 
const addItem = async (req, res, err) => {

    try {
        const userData = req.body

        const newItem = new Item(userData)
        const saveItem = await newItem.save()
        if (!saveItem)
            res.send("Error")

        // done
        res.send(`Added a new item: ${newItem}`)

    }catch(e) {
        res.send(e.message)
    }

}
// GET : showing all recipes of range or name
const getItems = async (req, res, err) => {

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
        const data = await Item.find({name: {"$regex": name, "$options":"i"}}).limit(+range)

        if(data.length == 0)
            res.send("Empty db")
        else
            res.send(data)

    }catch(e) {
        res.send(e.message)
    }

}

// add category to one item that exist
/*
    {
        type : "something",
        facts: {
            protein: 39,
            carb: 20,
            fat: 10
        }
    }
*/
const addCategory = async (req, res, err) => {

    try {
        // getting the foodItem by its id
        const id = req.params.id

        const item = await Item.findOne({_id:id})

        if (!item)
            throw new Error('Item not found')

        item.category.push(req.body)

        // saving 
        await item.save()

        res.send(`Added Category to : ${item}`)

    }catch(e){
        res.send(e.message) 
    }
}

// edit a category inside an item
const editCategory = async (req, res, err) => {

    try {
        const categoryId = req.params.id
        let item = await Item.findOne({'category.facts._id':categoryId}) 

        if (!item)
            throw new Error("Item not found")

        // editing the category
        const categoryInd = item.category.findIndex(el => {
            if (el._id == categoryId)
                return el
        })

        if (categoryInd == -1)
            throw new Error("Can't find category inside")


        // updating 
        // probably sending 
        item.category[categoryInd] = req.body

        // saving
        await item.save()

        res.send(`Updated a category ${categoryInd} : ${item}`)
        
    } catch (e) {
        res.send(e.message) 
    }
}

// PUT : Change item's name
const editItem = async (req, res, err) => {

    try {
        const allowedFields = ['name']
        const sentKeys = Object.keys(req.body)

        isVaildField = sentKeys.every( item => allowedFields.includes(item) )

        if (!isVaildField)
            throw new Error("Request contains some parameters that can't be edited!")

        // updating the db
        // getting the id
        const id = req.params.id
        let item = await Item.findOne({'_id':id}) // for some reasons pre.save doesn't work with update , and item.save() also doesn't work lol

        if(!item)
            throw new Error("Can't edit: Nothing to edit here")

        res.send(`Item has been edited ${data}`)

        // editing the name 
        item.name = req.body.name

        await item.save()

    }catch(e){
        res.send(e.message) 
    }
}

// exporting the modules
module.exports = {
    addItem,
    getItems,
    editItem,
    addCategory,
    editCategory
}

