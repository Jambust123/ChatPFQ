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
       throw error
    }
}

exports.fetchUsers = async () => {
    try {
        const db = client.db('ChatPFQ');
        const collection = db.collection('users');
        const results = collection.find({});
        return await results.toArray()
    } catch (error) {
       throw error
    }
}

exports.fetchUserById = async () => {
    
}