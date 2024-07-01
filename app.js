const express = require('express')
const { getLogin } = require('./controllers/getLogin')

const app = express()

app.use(express.json())

app.get('/api/users', getUsers)

app.post('/api/users', )