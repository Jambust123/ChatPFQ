const express = require('express')
const { postUser, getUsers } = require('./controllers/users.controllers')
const { postMessage, getAllMessages } = require('./controllers/messages.controllers')

const app = express()

app.use(express.json())

app.get('/api/users', getUsers)

app.post('/api/users', postUser)

app.post(`/api/messages`, postMessage)

app.get('/api/messages', getAllMessages)

app.use((error, req, res, next) => {
    const { errorResponse } = error

    if (errorResponse.code === 11000) {
        res.status(400).send({
            msg: 'Username already taken'
        })
    }

    next(error)
})

module.exports = app