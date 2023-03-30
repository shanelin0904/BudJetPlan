const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../../app')

chai.use(chaiHttp)

describe('User API', () => {
    beforeAll(async () => {
        await queryInterface.bulkDelete('Users', {})
    })
    
    describe('POST /register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'testpassword'
                })
            expect(res.status).to.equal(201)
            expect(res.body.username).to.equal('testuser')
            expect(res.body.email).to.equal('testuser@example.com')
            expect(res.body.password).to.not.equal('testpassword')
        })

        it('should not register a new user with an existing username', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    username: 'testuser',
                    email: 'testuser2@example.com',
                    password: 'testpassword'
                })
            expect(res.status).to.equal(409)
            expect(res.body.message).to.equal('Username already taken')
        })

        it('should not register a new user with an existing email', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    username: 'testuser2',
                    email: 'testuser@example.com',
                    password: 'testpassword'
                })
            expect(res.status).to.equal(409)
            expect(res.body.message).to.equal('Email already taken')
        })

        it('should not register a new user without a username', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    email: 'testuser3@example.com',
                    password: 'testpassword'
                })
            expect(res.status).to.equal(400)
            expect(res.body.message).to.equal('Username is required')
        })

        it('should not register a new user without an email', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    username: 'testuser3',
                    password: 'testpassword'
                })
            expect(res.status).to.equal(400)
            expect(res.body.message).to.equal('Email is required')
        })

        it('should not register a new user without a password', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    username: 'testuser3',
                    email: 'testuser3@example.com'
                })
            expect(res.status).to.equal(400)
            expect(res.body.message).to.equal('Password is required')
        })
    })
    afterAll(async () => {
        await queryInterface.bulkDelete('Users', {})
    })
})