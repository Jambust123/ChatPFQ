const { close } = require('../db/connection')
const app = require('../app')
const request = require('supertest')

beforeEach(() => {
    
})

afterAll(async () => {
    await close()
})

describe('postUser', () => {
    it('should 201 when a user is posted', async () => {
        const input = {
            username: 'matt',
            password: 'winston',
            isAdmin: false
        }

        const { body } = await request(app)
        .post('/api/users')
        .send(input)
        .expect(201)

        expect(body).toMatchObject({
            "acknowledged": true
        })
        
    });
});