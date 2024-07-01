const { client } = require('../db/connection')

exports.createUser = async (username, password, isAdmin) => {
    try {
        const db = client.db('ChatPFQ')
        const collection = db.collection('users')
        const insertedUser = await collection.insertOne({
            username,
            password, 
            isAdmin
        })
        return insertedUser
    } catch (error) {
       console.log(error) 
    }
}