const express = require("express")
const app = express()   
const db = require("./models/user")
const pages = require('./routes/pages')

app.use('/', pages)
app.use('/auth', require('./conrollers/auth'))
app.use(express.static('public'))
app.set('view engine', 'hbs')


app.listen(3200, console.log("localhost:3200"))
