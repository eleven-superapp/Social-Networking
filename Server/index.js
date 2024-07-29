const bodyParser = require('body-parser')
const express = require('express')
const { HomeRouter } = require('./Router/Home')
const { UserRouter } = require('./Router/User')
const dotenv = require('dotenv').config()
//Databse Connection
require('./Utils/connection')
//Configuration
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/api/social/v1/', HomeRouter)
app.use('/api/social/v1/', UserRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})