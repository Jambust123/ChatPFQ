const { seedDB } = require("./seed");
const { connect, close, getClient } = require('./connection')

async function runSeed() {
    const client = getClient()
    await seedDB(client)
    await close(client)
}

runSeed();