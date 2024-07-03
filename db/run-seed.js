const { seedDB } = require("./seed");
const { connect, close, getClient } = require('./connection')

async function runSeed() {
    const client = process.env.NODE_ENV === 'production' ? await connect() : await getClient()
    await seedDB(client)
    await close(client)
}

runSeed();