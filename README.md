# ChatPFQ
AI query sorting sytem

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