// Authorization middleware 

const jwt = require('jsonwebtoken')
const User = require('../models/user/user')

const auth = async (req, res, next) => {

    try {

        // check if the user is authorized by checking the token in the db with the one in the headers
        const sentToken = req.header('Authorization').replace('Bearer ', '')

        // if it's not vaild it will fire an error
        const valid = jwt.verify(sentToken, process.env.JWTSECRET)

        // getting the id of the user in case of it's a valid one
        const userId = valid._id

        // searching for a user in the db 
        // searching with token also to make sure that it's the most recent token
        const userInDB = await User.findOne({_id: userId, token:sentToken})

        if (!userInDB)
            throw new Error("User not found! or Token has been expired")

        // setting the request
        req.user = userInDB
        req.token = sentToken

        // passing 
        next()
        
    } catch (e) {
        if (e.message == "invalid signature")
            return res.send("Invalid Token")
        return res.send(e.message)
    }
}


module.exports = auth