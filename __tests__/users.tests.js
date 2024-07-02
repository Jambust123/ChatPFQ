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

describe('getUsers', () => {
    it('should 200 and return all users when requested', async () => {
        const { body } = await request(app)
        .get('/api/users')
        .expect(200)
        
        expect(body).toHaveLength(100)
        body.forEach((user) => {
            expect(user).toMatchObject({
                username: expect.any(String),
                password: expect.any(String),
                isAdmin: expect.any(Boolean)
            })
        })
    });
});

describe('getUserById', () => {
    it('should 200 and return a specific user', async () => {
        const input = {
            username: 'jake',
            password: 'liam',
            isAdmin: true
        }
    
        await request(app)
        .post('/api/users')
        .send(input)
        
        const { body } = await request(app)
        .get('/api/users?username=jake')
        .expect(200)

        expect(body).toMatchObject({
            username: 'jake',
            password: 'liam',
            isAdmin: true
        })
    });
});