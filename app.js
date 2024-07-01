const express = require('express')
const { postUser } = require('./controllers/users.controllers')

const app = express()

app.use(express.json())

app.post('/api/users', postUser)

module.exports = app