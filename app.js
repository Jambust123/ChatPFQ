const express = require('express')
const { postUser } = require('./controllers/users.controllers')
const { postMessage } = require('./controllers/messages.controllers')

const app = express()

app.use(express.json())

app.post('/api/users', postUser)

app.post(`/api/messages`, postMessage)

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