const { client } = require('../db/connection')


exports.createMessage = async (message) => {
    try {
        const db = client.db('ChatPFQ')
        const collection = db.collection('messages')
        const insertedMessage = await collection.insertOne({
            body: message.body,
            from: message.from,
            to: message.to,
            created_at: new Date(),
            category: message.category,
            sentiment: message.sentiment,
            isClosed: message.isClosed,
            table: message.table
        })
        return insertedMessage
    } catch (error) {
        throw error
    }
}

exports.fetchAllMessages = async (username) => {
    try {
        const db = client.db('ChatPFQ')
        const collection = db.collection('messages')
        if(username){
        
        return allMessages = await collection.find({
            $or: [{ to: username }, { from: username }]
        }).toArray()

        } else {

            return allMessages = await collection.find().toArray()

        }

    } catch (error) {
        throw error
    }
}