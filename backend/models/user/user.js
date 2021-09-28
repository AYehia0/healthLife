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
            favourites: [
                {
                    type: {
                        type: String,
                        enum: ['breakfast', 'dinner', 'launch', 'snack', 'workout'],
                        required: true
                    },
                    mealId: mealId
                }
            ],
            meals: [{
                    date: {
                        type: Date,
                        default: Date.now
                    },
                    //workout: []
                }]
        },
        required: isUser()
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
userSchema.pre('save', function(){
    // getting the user
    const user = this

    // hashing the user
    if(user.isModified('password')){
        user.password = bcrybt.hashSync(user.password, 12) 
    }

})

// login user 
userSchema.statics.login = async (email, password) => {
    // finding the user by its email
    const user = await User.findOne({email: email})

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