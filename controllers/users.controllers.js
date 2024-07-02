const { createUser, fetchUsers } = require("../models/users.models")

exports.postUser = async (req, res, next) => {
    try {
        const { username, password, isAdmin } = req.body
        const createdUser = await createUser(username, password, isAdmin)
        res.status(201).send(createdUser)
    } catch (error) {
        next(error)
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        const users = await fetchUsers()
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
}

exports.getUserById = async (req, res, next) => {

}