const { test, describe, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


describe('get request', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are three blogs returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, 3)
    })

    test('the id property without low dash', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body[0].hasOwnProperty('id'), true)
    })
})

after(async () => {
    await mongoose.connection.close()
})
