const { createUser } = require("../models/users.models")

exports.postUser = async (req, res, next) => {
    try {
        const { username, password, isAdmin } = req.body
        const createdUser = await createUser(username, password, isAdmin)
        res.status(201).send(createdUser)
    } catch (error) {
        next(error)
    }
}