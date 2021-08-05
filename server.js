require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

// connected router
const userRouter = require('./router/user')

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(morgan('dev'))

app.use('/user', userRouter)

const PORT = process.env.PORT || 7000

app.listen(PORT, console.log("connected server..."))