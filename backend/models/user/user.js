const mongoose = require('mongoose')
const validator = require('validator')
const bcrybt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

/* 
Each User has :
    - Name
    - Email
    - Password
    - Pesonal 
        - Total Calories
        - Activity lvl
        - Age 
        - Height
        - Weight
    - Favorites
    - Day

*/

// mealId 
const mealId = {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true
}

function isUser() {
    return this.role === 'user'
}
            
const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: function() {
            return this.role === 'user'
        },
        unique: true,
        validate(value){
            if (!validator.isEmail(value))
                throw new Error("Invalid Email")
        }
    },
    adminEmail: {
        type: String,
        required: function() {
            return this.role === 'admin'
        },
        trim: true,
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if (!validator.isStrongPassword(value, {minLength: 6, minLowercase: 1, minUppercase: 1}))
                throw new Error("Weak Password")
        }
    },
    token: {
        type: String
    },
    personal: {
        type: {
            age: {
                type: Number,
                required: true
            },
            gender: {
                type: String,
                enum: ['male', 'female'],
                default: "male"
            },
            activity: {
                type: String,
                // [Low, Moderate, High, Very High]:
                enum: ['low', 'mod', 'high', 'ext'],
                default: "mod"
            },
            height: { // cm
                type: Number,
                required: true,
            },
            weight: { // kg
                type: Number,
                required: true
            },
            startCals: {
                type: Number,
                default: 0
            },
            needs: {
                protein: {
                    type: Number,
                    default: 0
                },
                carb: {
                    type: Number,
                    default: 0
                },
                fat: {
                    type: Number,
                    default: 0
                }
            },
            favourites: [
                {
                    // set
                    types:[
                        {
                            type: String,
                            enum: ['breakfast', 'dinner', 'launch', 'snack', 'workout'],
                            required: true
                        }
                   ],

                    mealId: mealId,
            
                }
            ],
        },
        required: function () {
            return this.role === 'user'
        }
   },

    food: {
        type:{
            meals: [{
            date: {
                type: Date,
                default: Date.now
            },
            mealId: mealId,
            categories: [{   
                type: {
                    type: String,
                    enum: ['breakfast', 'dinner', 'launch', 'snack', 'workout'],
                    required: true
                },
                count: {
                    type: Number,
                    default: 1
                },
                category: {
                    type: String,
                    required: true
                }
            }]
        }]},
        required: function() {
            return this.role === 'user'
        }
    },


}, 
{
    // logging modification
    timestamps:true, 
    // removing things from request
    toJSON:{
        transform(doc, ret) {
            delete ret.password
            delete ret.__v
            delete ret.role
            if (doc.role == 'admin')
                delete ret.mealSpecific
        }
}})

// hashing the password on save 
userSchema.pre('save', function(next){
    // getting the user
    const user = this

    // hashing the user
    if(user.isModified('password')){
        user.password = bcrybt.hashSync(user.password, 12) 
    }
    next()
})
/*

For men: BMR = 10 x weight (kg) + 6.25 x height (cm) – 5 x age (years) + 5
For women: BMR = 10 x weight (kg) + 6.25 x height (cm) – 5 x age (years) – 161

1.55 = Light: Typing, teaching, lab/shop work, some walking throughout the day
1.65 = Moderate: Walking, jogging, gardening type job with activities such as cycling, tennis, dancing, skiing or weight training 1-2 hours per day
1.80 = Heavy: Heavy manual labor such as digging, tree felling, climbing, with activities such as football, soccer or body building 2-4 hours per day
2.00 = Very Heavy: A combination of moderate and heavy activity 8 or more hours per day, plus 2-4 hours of intense training per day

Your Total Daily Energy Expenditure (TDEE) = BMR x Activity Level Multiplier

*/

// calculating the cals needed
const calorieNeeds = (age, weight, height, gender, activityLvl) => {

    //['low', 'mod', 'high', 'ext'],
    activityLvls = {
        low: 1.55,
        mod: 1.65,
        high: 1.80,
        ext: 2.00
    }

    // calculating BMR
    const bmr = {
        male: 10 * weight + 6.25 * height - 5 * age + 5,
        female: 10 * weight + 6.25 * height - 5 * age - 161,
    }

    return bmr[gender] * activityLvls[activityLvl]

}

// ref : https://www.k-state.edu/paccats/Contents/Nutrition/PDF/Needs.pdf
const proteinFatCarbNeeds = (cals, weight) => {

    // Protein : 1g for kg
    const percent = 1
    const protein = percent * weight
    const fat = (cals * 0.3) / 9 
    const carb = (cals - fat * 9 - protein * 4) / 4

    // Fat intake should equal 30% of your total days calories. 

    return [Math.round(protein), Math.round(fat), Math.round(carb)]

}

userSchema.pre('save', async function(next){

    // getting the food item
    const user = this

    // checking if the registerd user is admin
    if (user.role == "admin"){

        next()

    }
    const personal = user.personal

    // calculating the calories
    const cals = Math.round(calorieNeeds(personal.age, personal.weight, personal.height, personal.gender, personal.activity))

    // calculating protein, carb, fat
    const needs = proteinFatCarbNeeds(cals, personal.weight)
    
    //[protein, fat, carb] = needs
    const protein = needs[0]
    const fat = needs[1]
    const carb = needs[2]

    // modifiy
    user.personal.startCals = cals
    user.personal.needs.protein = protein
    user.personal.needs.fat = fat 
    user.personal.needs.carb = carb

    next()

})


// login user 
userSchema.statics.login = async (email, password, role) => {
    // finding the user by its email

    let user = null

    if (role == 'user')
        user = await User.findOne({email: email})
    else 
        user = await User.findOne({emailAdmin: email})

    if (!user)
        throw new Error("User isn't registered !")

    // checking the password
    // this should be slow 

    const valid = bcrybt.compareSync(password, user.password)

    //console.log(valid, process.env.JWTSECRET, password)

    if (!valid)
        throw new Error("Wrong password")
    
    return user

}

// generating the token 
userSchema.methods.getToken = async function() {

    const user = this

    const token = jwt.sign({_id: user._id}, process.env.JWTSECRET)

    user.token = token 

    await user.save()

    return token
}

// creating the model 
const User = mongoose.model('User', userSchema)

// exporting
module.exports = User