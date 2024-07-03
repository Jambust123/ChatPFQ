// require the necessary libraries
const { faker } = require("@faker-js/faker");
const { getClient } = require("./connection");

exports.seedDB = async () => {

    try {
        const client = getClient()
        const db = client.db("ChatPFQ")

        const usersCollection = db.collection('users');
        const messagesCollection = db.collection('messages');

        // The drop() command destroys all data from a collection and deletes the collection.
        // Make sure you run it against proper database and collection.

        await usersCollection.drop(); //dropping all collections in ChatPFQ
        await messagesCollection.drop()

        //Create the collections again, and add an index to the users collection to enforce unique values
        await client.db('ChatPFQ').createCollection('users')
        await usersCollection.createIndex({username: 1}, {unique: true})

        await client.db('ChatPFQ').createCollection('messages')

        function createRandomUser() {
            const user = {
                username: faker.internet.userName(),
                password: faker.internet.password(),
                isAdmin: faker.datatype.boolean()
            }

            return user
        }

        const fakeUsers = faker.helpers.multiple(createRandomUser, {count: 100})
        await usersCollection.insertMany(fakeUsers)


        function createRandomMessage() {
            const message = {
                    body: faker.lorem.sentence(),
                    from: faker.internet.userName(),
                    to: 'admin',
                    category: 'Service',
                    sentiment: 'negative',
                    isClosed: false,
                    table: faker.number.bigInt({ min: 1, max: 50 })
            }

            return message
        }

        const fakeMessages = faker.helpers.multiple(createRandomMessage, {count: 100})
        await messagesCollection.insertMany(fakeMessages)

    } catch (err) {
        console.log(err.stack);
    }
    
}
