const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const path = require('path')
const auth = require('../src/middleware/auth')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
  }))
app.use(userRouter)
app.use(taskRouter)


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templetes/views')
const partialsPath = path.join(__dirname, '../templetes/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('/', (req, res) => {
//     res.render('index', {
//         title: 'Login App',
//         name: 'Fabricio Barreto'
//     })
// })

// app.get('/users/login', (req, res) => {
//     res.render('login', {
//         title: 'Login App',
//         name: 'Fabricio Barreto'
//     })
// })

// app.get('/user', auth, (req, res) => {
//     res.render('user', {
//         title: 'Login App',
//         name: 'Fabricio Barreto'
//     })
// })

// app.get('/users/logout', auth, (req, res) => {
//     res.redirect('/');
// })


 











app.listen(port, () => {
    console.log('Server is online on port ' + port)
})


