const Item = require('../../models/food/foodItem')

// get meal by id
const findMealById = (meals, mealId) => {

    return meals.findIndex(el => String(el.mealId) == mealId)

}

// user can add food to their meals 
const userAddFood = async (req, res) => {

    try {

        // getting user's info 
        const user = req.user

        // getting the food info 
        // by mealId 
        const meal = req.body

        // mealId : check if it exists in Item DB
        const mealId = meal.mealId

        const verify = await Item.findById(mealId)

        if (!verify)
            throw new Error("MealID is Invalid: Make sure it exists")

        const userMeals = user.food.meals
        const mealType = meal.categories.type

        if (! mealType)
            throw new Error("Category is required")

        // checking if mealId exists
        // it would be a great idea to create a pre 

        const mealInd = findMealById(userMeals, meal.mealId)
       
        // update
        if (mealInd != -1) {
            // counting based on the category  =>  type

            const categories = userMeals[mealInd].categories

            const ind = categories.findIndex(el => el.type == mealType)

            if (ind != -1){
                categories[ind].count += 1
            }else{
                categories.push(req.body.categories)
            }

        }else{
            // append
            userMeals.push(meal)
        }

        // saving 
        await user.save()

        res.status(200).send({
            status: true,
            message: "Added Item to food list",
            data: user.food.meals
        })
        
        
    } catch (e) {
        res.send({
            status: false,
            message: "Can't add Item",
            data: e.message
        })
    }
}

// getting all meals 
const userGetAllMeals = async (req, res) => {

    try {
       
        // getting user's info 
        const user = req.user
        const userMeals = user.food.meals

        res.status(200).send({
            status: true,
            message: "Success",
            data: userMeals
        })
        
        
    } catch (e) {
         res.send({
            status: false,
            message: "Can't get",
            data: e.message
        })       
    }

}

const getFoodByCategoryType = async (req, res) => {
    try {
       
        // getting user's info 
        const userTypes = ['breakfast', 'dinner', 'launch', 'snack']
        const userMeals = req.user.food.meals
        const finalResult = []
        // searching user for meals by type

        for (let type of userTypes) {
            
            const searchResult = []
            for (meal of userMeals) {

                const mealId = meal.mealId
                
                // getting info 
                const mealInfo = await Item.findById(mealId)
                const mealName = mealInfo.name
                const types = mealInfo.category.find(el => el.type = type)
                const mealCals = types.cals
                const facts = types.facts

                for (cate of meal.categories) {
                    if (cate.type == type){

                        // get the count 
                        searchResult.push({
                            mealId: mealId,
                            name: mealName,
                            count: cate.count,
                            cals: mealCals,
                            facts: facts
                        })
                    }
                }
            }
            finalResult.push({
                type: type,
                result: searchResult
            })
        }
        res.status(200).send({
            status: true,
            message: "Search: Success",
            data: finalResult
        })
        
        
    } catch (e) {
        console.log(e)
         res.send({
            status: false,
            message: "Can't Search, something is wrong",
            data: e.message
        })       
    }


}
// user can delete a meal from their meals
const userDeleteFood = async (req, res) => {

    try {
       
        // getting user's info 
        const user = req.user
        const userMeals = user.food.meals

        // getting the food info 
        // by mealId 
        const mealId = req.params.id

        // getting the meal we want to delete
        const mealInd = findMealById(userMeals, mealId)

        // can't happen
        if (mealInd == -1) 
            throw new Error('Meal not found')

        userMeals.splice(mealInd, 1)

        // saving 
        await user.save()

        res.status(200).send({
            status: true,
            message: "Deleted a whole meal",
            data: userMeals
        })
        
        
    } catch (e) {
         res.send({
            status: false,
            message: "Can't remove",
            data: e.message
        })       
    }
}

// user can remove one : (decrease the count)
const userDeleteFoodOne = async (req, res) => {

    try {
       
        // getting user's info 
        const user = req.user
        const userMeals = user.food.meals

        // getting the food info 
        // by mealId 
        const mealId = req.params.id
        const mealType = req.params.type

        // getting the meal we want to delete
        const mealInd = findMealById(userMeals, mealId)

        // can't happen
        if (mealInd == -1) 
            throw new Error('Meal not found')
        
        // if there is only one category
        if (userMeals[mealInd].categories.length == 1){
            userMeals[mealInd].categories.splice(mealInd, 1)

        }
        
        // meal info
        let mealIndexInCategoies = userMeals[mealInd].categories.findIndex(el => el.type == mealType)

        if (mealIndexInCategoies == -1)
            throw new Error("Category doesn't exist in this meal")

        // category exists
        const mealCount = userMeals[mealInd].categories[mealIndexInCategoies].count
        
        if (mealCount != 1){
            // decrease the count
            userMeals[mealInd].categories[mealIndexInCategoies].count -= 1

        }else{

            // delete it
            const remainLengthCategory = userMeals[mealInd].categories.length

            console.log("remaining : ", remainLengthCategory)

            // remove the thing 
            if (remainLengthCategory == 1)
                userMeals.splice(mealInd, 1)
            else
                userMeals[mealInd].categories.splice(mealIndexInCategoies, 1)
            
        }

        // saving 
        await user.save()

        res.status(200).send({
            status: true,
            message: "Removed meal",
            data: userMeals
        })
        
        
    } catch (e) {
         res.send({
            status: false,
            message: "Can't remove",
            data: e.message
        })       
    }
}

// user can add meal to favourite
const userAddFoodFavourite = async (req, res) => {

    try {

        // getting user's info 
        const user = req.user

        // by mealId 
        const meal = req.body

        const verify = await Item.findById(meal.mealId)

        if (!verify)
            throw new Error("MealID is Invalid: Make sure it exists")

        // make sure that it's a set 
        const userTypesSet = new Set(meal.types)
        meal.types = Array.from(userTypesSet)

        const userFavMeals = user.food.favourites

        const mealInd = findMealById(userFavMeals, meal.mealId)

        // add only if it doensn't exist 
        if (mealInd == -1) {
            userFavMeals.push(meal)
        }else {
            // add the type if not exists
            const types = userFavMeals[mealInd].types

            for(type of meal.types) {
                if (!types.includes(type)){
                    types.push(type)
                }
            }
        }

        // saving 
        await user.save()

        res.status(200).send({
            status: true,
            message: "Added Item to favourite list",
            data: user.food.favourites
        })
        
        
    } catch (e) {
        res.send({
            status: false,
            message: "Can't add Item to favourites",
            data: e.message
        })
    }
}

// remove fav 
const userDeleteFoodFavourite = async (req, res) => {

    try {

        // getting user's info 
        const user = req.user

        // by mealId 
        const mealId = req.params.id

        const userFavMeals = user.personal.favourites

        const mealInd = findMealById(userFavMeals, mealId)

        // add only if it doensn't exist 
        if (mealInd != -1) {
            userFavMeals.splice(mealInd, 1)
        }else{
            throw new Error("Can't delete")
        }

        // saving 
        await user.save()

        res.status(200).send({
            status: true,
            message: "Removed Item to favourite list",
            data: user.personal.favourites
        })
        
        
    } catch (e) {
        res.send({
            status: false,
            message: "Can't remove Item from favourites",
            data: e.message
        })
    }
}

// get all calories from added meals
const userGetAllCalories = async (req, res) => {

    try {

        
        // getting user's info 
        const user = req.user
        const userMeals = user.food.meals

        let totalCals = 0
        
        for (const meal of userMeals) {
            
            const mealId = meal.mealId

            // getting user's meal categories 
            const userCategories = meal.categories.filter(el => el.category)

            for (const cate of userCategories){


                const itemCate = cate.category
                const itemCount = cate.count

                // // do i have to check the id ? idk,, i think no
                const mealToSearch = await Item.findById(mealId)

                mealToSearch.category.filter(el => {
                    if (el.type == itemCate){
                        totalCals += itemCount * el.cals
                    }
                })
            }
        }

        res.status(200).send({
            status: true,
            message: "Getting calories: Success",
            data: totalCals
        })
        
    } catch (e) {
        res.send({
            status: false,
            message: "Can't get calories",
            data: e.message
        })
    }
}


module.exports = {
    userAddFood,
    userGetAllMeals,
    userDeleteFood,
    userDeleteFoodOne,
    userAddFoodFavourite,
    userDeleteFoodFavourite,
    userGetAllCalories,

}