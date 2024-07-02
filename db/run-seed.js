const { seedDB } = require("./seed");
const { close } = require('./connection')

async function runSeed() {
    await seedDB()
    await close()
}

runSeed();