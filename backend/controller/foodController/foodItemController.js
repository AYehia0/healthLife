const Item = require('../../models/food/foodItem')

///////////////////////////////////// FOOD ITEMS ///////////////////////////////////// 

// POST request to add food 
const addItem = async (req, res, err) => {

    try {
        const userData = req.body

        const newItem = new Item(userData)
        const saveItem = await newItem.save()
        if (!saveItem)
            res.send("Error")

        res.status(200).send({
            status: true,
            message: "Added a new item : success",
            data: newItem 
        })



    }catch(e) {
        res.send({
            status: false,
            message: e.message,
            data: ""
        }) 

    }

}

const getItemById = async (req, res) => {

    try {
        const itemId = req.params.id

        const item = await Item.findById(itemId)
        if (!item)
            throw new Error("Item not found")

        // done
        res.status(200).send({
            status: true,
            message: "Get item : success",
            data: item
        })
        
    }catch(e) {
        res.send({
            status: false,
            message: e.message,
            data: ""
        }) 

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
            res.send([])
        else
            res.send(data)

    }catch(e) {
        res.send({
            status: false,
            message: e.message,
            data: ""
        }) 

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

        res.status(200).send({
            status: true,
            message: "Added a category : success",
            data: item 
        })

    }catch(e){
        res.send({
            status: false,
            message: e.message,
            data: ""
        }) 

    }
}

// edit a category inside an item
const editCategory = async (req, res, err) => {

    try {
        const categoryId = req.params.id
        let item = await Item.findOne({'category._id':categoryId}) 

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

        res.status(200).send({
            status: true,
            message: "Updated a category : success",
            data: item 
        })
        
    } catch (e) {
        res.send({
            status: false,
            message: e.message,
            data: ""
        }) 


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

        // editing the name 
        item.name = req.body.name

        await item.save()

        res.status(200).send({
            status: true,
            message: "Edit : success",
            data: item 
        })

   }catch(e){
        res.send({
            status: false,
            message: e.message,
            data: ""
        }) 

    }
}

// PUT : Change item's name
const deleteItem = async (req, res, err) => {

    try {

        const itemId = req.params.id

        // delete the item
        const verify = await Item.findByIdAndDelete(itemId)

        if (! verify)
            throw new Error("Can't delete : Item not found ?")

        res.status(200).send({
            status: true,
            message: "Delete : success",
            data: verify
        })
        

    }catch(e){
        res.send({
            status: false,
            message: e.message,
            data: ""
        }) 

    }

}

// TODO
// delete a category
const deleteCategory = async (req, res) => {
    try {

        const cateId = req.params.id

        // delete the item
        const verify = await Item.updateOne({'category._id': cateId}, {'$pull' : {'category' :{_id : cateId } }})

        if (verify.modifiedCount == 0)
            throw new Error("Cound not delete : Item not found ")

        res.status(200).send({
            status: true,
            message: "Delete : success",
            data: ""
        })
        

    }catch(e){
        res.send({
            status: false,
            message: e.message,
            data: ""
        }) 

    }


}

// exporting the modules
module.exports = {
    addItem,
    getItemById,
    getItems,
    editItem,
    addCategory,
    editCategory,
    deleteCategory, 
    deleteItem
}

