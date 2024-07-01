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

    it('should 400 for a dupe value', async () => {
            const input = {
                username: 'matt',
                password: 'winston',
                isAdmin: false
            }

            const { body } = await request(app)
            .post('/api/users')
            .send(input)

            const res = await request(app)
            .post('/api/users')
            .send(input)
            .expect(400)
            expect(res.body.msg).toBe('Username already taken')        
    });
});