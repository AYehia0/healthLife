const User = require('../../models/user/user')


// add a user to the database
const register = async (req, res) => {
    try {
        // getting the user's info : req.body
        const userData = req.body

        const user = new User(userData)

        // saving
        await user.save()

        res.send(`User has been created : ${user}`)
        
    } catch (e) {
       res.send(e.message) 
    }

}

// login a user
const login = async (req, res) => {
    try {
        // getting the user's info : req.body
        const userData = req.body

        // finding the user
        const user = await User.login(userData.email, userData.password)

        // generate the token 
        const token = await user.getToken()


        // sending the token in th
        res.send({token: token})
        
    } catch (e) {

        console.log(e)
       res.send(e) 
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
        
        res.send("Logged out !!!")
        
    } catch (e) {
       res.send(e.message) 
    }
}


// the profile route isn't needed as the data will be found in the headers if authorized
const profile = async (req, res) => {

    try {

        // showing the user 
        const user = req.user

        res.send(user)
        
    } catch (e) {
       res.send(e.message) 
    }
}


module.exports = {
    register,
    login,
    logout,
    profile
}