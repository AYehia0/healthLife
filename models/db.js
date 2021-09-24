// connection to the mongodb 
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const dbNAME = "FoodDB"
const dbURL = `mongodb://localhost:27017/${dbNAME}`

mongoose.connect(dbURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    autoIndex: true,
}).catch(e => {
    console.log(e.message)
})
