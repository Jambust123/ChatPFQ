const { createMessage } = require("../models/messages.models")

exports.postMessage = async (req, res, next) => {
    try {
        const { message } = req.body
        const createdMessage = await createMessage(message)
        res.status(201).send(createdMessage)
    } catch (error) {
        next(error)
    }
}