# ChatPFQ
AI query sorting system

## Demo

See a demo of the application by pressing the thumbnail below:
![Screenshot from demo video displaying the iPhone and web app](/demo/thumbnail.png)

## Envrionment variables

You will need the following .env files to run this application:
````
.env.test
.env.development
.env.production
````
In those env files you should have a variable named MONGODB_URI, with the connection string to your database.

For example:
````
MONGODB_URI=`mongodb://localhost:00000/?directConnection=true`
````

Instructions for connecting to a MongoDB in Node.js can be found [here](https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/).

## Seeding the prod database

The database enforces unique values for usernames by adding a username index to the users collection.

The tests will seed the test and development databases, but not the prod database.

You will need to run npm run seed-prod to set up the prod databases, with unique value enforcement, otherwise this enforcement will not work as expected.

## Accessing the API

The API is accessibile [here](https://chatpfq-api.onrender.com/api/), on the following endpoints:
- /users
- /messages
