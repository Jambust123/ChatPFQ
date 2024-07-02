const { client, close } = require('../db/connection')
const app = require('../app')
const request = require('supertest')
const { seedDB } = require('../db/seed')

beforeEach(async () => {
    await seedDB()
})

afterAll(async () => {
    await close()
})

describe('postMessage', () => {
    
});