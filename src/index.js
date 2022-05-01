const express = require('express')
const connectToDb = require("../src/db/mongoose")
const userRouter = require('./router/user')
const taskRouter = require('./router/task')
const path = require('path')
const cors = require('cors')



connectToDb()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(userRouter)
app.use(taskRouter)
app.use(cors)

const viewsPath = path.join(__dirname, '../templates/views')

app.set("view engine", "ejs")
app.set('views', viewsPath)

// Setup static directory to serve






app.listen(port, () => {
    console.log('Server is online on port ' + port)
})


