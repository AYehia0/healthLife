const User = require('../../models/user/user')


// add a user to the database
const register = async (req, res) => {
    try {
        // getting the user's info : req.body
        const userData = req.body

        const user = new User(userData)

        // saving
        await user.save()

        res.status(200).send({
            status: true,
            message: "Register is done!",
            data: userData
        })
        
    } catch (e) {
        let message = e.message.includes('E11000') ? "Email Already Exists" : e.message
        res.send({
            status: false,
            message: message,
            data: ""
        }) 
    }
}

// login a user
const login = async (req, res) => {
    try {
        // getting the user's info : req.body
        const userData = req.body

        // finding the user
        const user = await User.login(userData.email, userData.password, 'user')

        // generate the token 
        const token = await user.getToken()


        // sending the token in th
         res.status(200).send({
            status: true,
            message: "Login: success",
            data: token
        })
        
    } catch (e) {
        res.send({
            status: false,
            message: e.message,
            data: ""
        }) 
    }
}

// Routes that needs auth

// logout
const logout = async (req, res) => {
    try {

        // simply remove the token 
        const user = req.user
        
        if (!user)
            throw new Error("Can't logout, are you sure you're logged it first ?")

        user.token = ""

        await user.save()

        res.status(200).send({
            status: true,
            message: "Logged out !!!",
            data: ""
        })
        
    } catch (e) {
        res.send({
                status: false,
                message: e.message,
                data: ""
        }) 
    }
}


// the profile route isn't needed as the data will be found in the headers if authorized
const profile = async (req, res) => {

    try {
        // showing the user 
        const user = req.user
        
        res.status(200).send({
            status: true,
            message: "",
            data: user
        })
        
       
    } catch (e) {
        res.send({
                status: false,
                message: e.message,
                data: ""
        }) 
    }
}


module.exports = {
    register,
    login,
    logout,
    profile
}