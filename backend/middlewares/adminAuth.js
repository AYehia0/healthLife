// Authorization middleware for Admin

const jwt = require('jsonwebtoken')
const User = require('../models/user/user')

const auth = async (req, res, next) => {

    try {

        // check if the user is authorized by checking the token in the db with the one in the headers

        // checking if the header has Auth
        const authHeader = req.header('Authorization')
        if (!authHeader)
            throw new Error("Authorization isn't set in the headers")

        const sentToken = authHeader.replace('Bearer ', '')

        // if it's not vaild it will fire an error
        const valid = jwt.verify(sentToken, process.env.JWTSECRET)

        // getting the id of the user in case of it's a valid one
        const userId = valid._id

        // searching for a user in the db 
        // searching with token also to make sure that it's the most recent token
        const userInDB = await User.findOne({_id: userId, token:sentToken})

        if (!userInDB)
            throw new Error("User not found! or Token has been expired")

        // checking the role 
        // it's always a good practice to check in the db 
        if (userInDB.role === 'user')
            throw new Error("Invalid Token: NO ADMIN")

        // setting the request
        req.user = userInDB
        req.token = sentToken

        // passing 
        next()
        
    } catch (e) {
        if (e.message == "invalid signature")
            return res.send({
                status: false,
                message: "Invalid Token",
                data: ""
            }) 
        return res.send({
            status: false,
            message: e.message,
            data: ""
        }) 

    }
}


module.exports = auth