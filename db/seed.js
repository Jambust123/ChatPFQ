// require the necessary libraries
const { faker } = require("@faker-js/faker");
const { client, connect, close } = require('./connection')

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.seedDB = async () => {

    try {
        await connect();
        //console.log("Connected correctly to server");

        const usersCollection = client.db("ChatPFQ").collection('users');
        const messagesCollection = client.db("ChatPFQ").collection('messages');

        // The drop() command destroys all data from a collection and deletes the collection.
        // Make sure you run it against proper database and collection.

        usersCollection.drop(); //dropping all collections in ChatPFQ
        messagesCollection.drop()

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

    } catch (err) {
        console.log(err.stack);
    }
    
}
