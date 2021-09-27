const app = require('./backend/app')


const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on : localhost:${PORT}`)
})


